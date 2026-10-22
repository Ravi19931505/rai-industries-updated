import { useEffect, useRef, useState } from "react";
import { products } from "../data/content";
import { photos } from "../data/content";
import Reveal from "./Reveal";
import gearBlankPhoto from "../assets/photos/gear-blank.webp";
import flangeHubPhoto from "../assets/photos/flange-hub.webp";
import kingPinPhoto from "../assets/photos/king-pin.webp";
import stubAxlePhoto from "../assets/photos/stub-axle.webp";
import ptoShaftPhoto from "../assets/photos/pto-shaft.webp";
import brakeDrumPhoto from "../assets/photos/brake-drum.webp";
import wheelHubPhoto from "../assets/photos/wheel-hub.webp";

export const productPhotos: Record<string, string> = {
  "Pinion Shafts": photos.productShaft,
  "Gear Blanks": gearBlankPhoto,
  "Flange Hubs": flangeHubPhoto,
  "King Pins": kingPinPhoto,
  "Stub Axles": stubAxlePhoto,
  "PTO Shafts": ptoShaftPhoto,
  "Brake Drums": brakeDrumPhoto,
  "Wheel Hubs": wheelHubPhoto,
};

// 3D ring mechanism ported from the Tooplate "Orbital" template: continuous
// gentle auto-drift, pointer-drag with momentum, mouse-parallax tilt on the
// whole rig, plus arrow-key rotation for keyboard users. Reskinned to the
// site's design system, and extended with live depth-based scale/opacity
// per panel (front panels read larger and brighter, far ones recede) so
// the ring reads as a real 3D field rather than a flat spinning strip.
export default function ProductOrbital() {
  const stageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    const parallax = parallaxRef.current;
    const ring = ringRef.current;
    if (!stage || !parallax || !ring) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panels = Array.from(ring.querySelectorAll<HTMLElement>(".orbital-panel"));
    const count = panels.length;
    const baseAngles = panels.map((_, i) => (360 / count) * i);

    function radius() {
      const raw = getComputedStyle(stage!).getPropertyValue("--ring-radius");
      return parseFloat(raw) || 240;
    }

    let rotation = 0;
    let velocity = 0;
    const baseDrift = reduceMotion ? 0 : 0.18;
    const friction = 0.94;
    const MAX_VELOCITY = 8;
    const DRAG_SENS = 0.32;
    const WHEEL_SENS = 0.05;

    let dragging = false;
    let lastX = 0;
    let dragStartX = 0;
    let totalMovement = 0;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const rangeY = 16;
    const rangeX = 12;

    function onMouseMove(e: MouseEvent) {
      if (reduceMotion) return;
      const mx = e.clientX / window.innerWidth - 0.5;
      const my = e.clientY / window.innerHeight - 0.5;
      targetY = mx * rangeY;
      targetX = -my * rangeX;
    }
    if (!reduceMotion) window.addEventListener("mousemove", onMouseMove);

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      dragStartX = e.clientX;
      totalMovement = 0;
      velocity = 0;
      stage!.classList.add("is-dragging");
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      totalMovement += Math.abs(dx);
      const step = dx * DRAG_SENS;
      rotation += step;
      velocity = clamp(step, -MAX_VELOCITY, MAX_VELOCITY);
    }
    function selectPanel(target: HTMLElement | null) {
      if (!target) return;
      const alreadySelected = target.classList.contains("is-selected");
      panels.forEach((p) => p.classList.remove("is-selected"));
      if (!alreadySelected) target.classList.add("is-selected");
    }

    function computeFrontIndex(rot: number) {
      let idx = 0;
      let best = -2;
      baseAngles.forEach((angle, i) => {
        const factor = Math.cos(((angle + rot) * Math.PI) / 180);
        if (factor > best) {
          best = factor;
          idx = i;
        }
      });
      return idx;
    }

    function endDrag(e: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      stage!.classList.remove("is-dragging");

      // A tap/click: barely any horizontal movement during the pointer
      // session. Toggle the brass glow on the panel under the pointer.
      if (Math.abs(e.clientX - dragStartX) < 6 && totalMovement < 8) {
        const target = (e.target as HTMLElement)?.closest<HTMLElement>(".orbital-panel");
        selectPanel(target);
      }
    }
    stage.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        velocity = clamp(velocity + e.deltaX * WHEEL_SENS, -MAX_VELOCITY, MAX_VELOCITY);
      }
    }
    stage.addEventListener("wheel", onWheel, { passive: false });

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      rotation += e.key === "ArrowLeft" ? -(360 / count) : 360 / count;
      velocity = 0;
      // Keyboard navigation is a deliberate selection, same as a click —
      // glow the panel that's now front-facing.
      selectPanel(panels[computeFrontIndex(rotation)]);
    }
    stage.addEventListener("keydown", onKeyDown);

    let raf = 0;
    function frame(time: number) {
      if (!dragging) {
        rotation += baseDrift + velocity;
        velocity *= friction;
        if (Math.abs(velocity) < 0.0015) velocity = 0;
      }

      const r = radius();
      let frontIdx = 0;
      let frontFactor = -2;

      panels.forEach((panel, i) => {
        const effAngle = baseAngles[i] + rotation;
        const rad = (effAngle * Math.PI) / 180;
        const factor = Math.cos(rad); // 1 = facing camera, -1 = facing away
        const t = (factor + 1) / 2; // 0..1
        const opacity = 0.28 + t * 0.72;
        // Up/down wave: each panel bobs on a sine of its ring angle, and the
        // ring's current spin velocity adds a momentum lift — flick it and
        // the panels ride up and settle back as friction slows the spin.
        const wave = reduceMotion ? 0 : Math.sin(rad * 2 + time / 900) * r * 0.06;
        const lift = reduceMotion ? 0 : velocity * Math.sin(rad) * r * 0.035;
        const scale = 0.82 + t * 0.18;
        panel.style.transform = `translate(-50%, -50%) rotateY(${effAngle}deg) translateZ(${r}px) translateY(${(wave + lift).toFixed(1)}px) scale(${scale.toFixed(3)})`;
        panel.style.opacity = opacity.toFixed(2);
        if (factor > frontFactor) {
          frontFactor = factor;
          frontIdx = i;
        }
      });
      setActive((prev) => (prev === frontIdx ? prev : frontIdx));

      if (!reduceMotion) {
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;
        parallax!.style.transform = `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      if (!reduceMotion) window.removeEventListener("mousemove", onMouseMove);
      stage.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div>
      <div
        ref={stageRef}
        className="orbital-stage relative w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/9] select-none outline-none"
        tabIndex={0}
        role="group"
        aria-label="Product catalogue — drag, scroll, or use arrow keys to rotate"
      >
        <div className="orbital-center-text" aria-hidden="true">
          <Reveal>
            <h3 className="font-display font-extrabold uppercase text-paper leading-[0.9]">
              <span className="block text-[9vw] sm:text-[5vw] lg:text-[3.6vw]">Precision</span>
              <span className="block text-brass text-[9vw] sm:text-[5vw] lg:text-[3.6vw]">In Every Part.</span>
            </h3>
          </Reveal>
        </div>

        <div ref={parallaxRef} className="orbital-parallax">
          <div className="orbital-ring-tilt">
            <div ref={ringRef} className="orbital-ring">
              {products.map((p, i) => (
                <div key={p.name} className="orbital-panel">
                  <div className="orbital-panel-inner">
                    <img
                      src={productPhotos[p.name]}
                      alt={`${p.name} — precision machined component`}
                      className="w-full h-full object-cover pointer-events-none"
                      draggable={false}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 p-3 md:p-5 pointer-events-none">
                      <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-steel/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display font-semibold uppercase text-base md:text-2xl text-paper leading-tight">
                        {p.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-hairline">
        <div>
          <p className="font-display font-semibold uppercase text-xl text-paper">
            {products[active].name}
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-brass mt-1">
            {products[active].sector}
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel hidden sm:block">
          Drag · Scroll · Arrow keys
        </p>
      </div>
    </div>
  );
}

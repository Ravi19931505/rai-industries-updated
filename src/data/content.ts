export const company = {
  name: "R.A.I INDUSTRIES",
  legalName: "R.A.I INDUSTRIES (REGD.)",
  founded: 1979,
  yearsActive: "45+",
  location: "Sahnewal, Ludhiana, Punjab, India",
  registration: "MSME Registered",
  certification: "ISO Certified",
  addressLine: "873, Palm Garden, Sahnewal, Ludhiana — 141120",
  addressLandmark: "Near Red Mango",
  mapsUrl: "https://maps.google.com/?q=873+Palm+Garden+Sahnewal+Ludhiana+Punjab",
  phone: "+91 84470 74178",
  phoneHref: "tel:+918447074178",
  whatsappHref: "https://wa.me/918447074178",
  email: "info@raiindustries.in",
  hours: "Mon – Sat · 09:00 – 18:00 IST",
};

export const stats = [
  { value: "45+", label: "Years Active" },
  { value: "±5µm", label: "Tolerance" },
  { value: "33+", label: "Part Families" },
  { value: "ISO", label: "Certified" },
];

export const capabilities = [
  {
    id: "01",
    name: "CNC Turning",
    spec: "Precision cylindrical machining",
    desc: "High-accuracy turning of shafts, hubs and rotational components to tight diametral tolerance.",
  },
  {
    id: "02",
    name: "CNC Milling",
    spec: "Multi-axis material removal",
    desc: "Complex profiles, keyways and features machined to exacting geometric control.",
  },
  {
    id: "03",
    name: "Surface Grinding",
    spec: "Flat-face finishing",
    desc: "Fine-finish grinding for flatness, parallelism and surface quality on critical faces.",
  },
  {
    id: "04",
    name: "Cylindrical Grinding",
    spec: "Round-form finishing",
    desc: "Sub-micron roundness and diameter control on shafts and pins.",
  },
  {
    id: "05",
    name: "Honing",
    spec: "Bore finishing",
    desc: "Internal bore finishing for precise diameter, roundness and surface texture.",
  },
  {
    id: "06",
    name: "Quality Inspection",
    spec: "Dimensional verification",
    desc: "In-process and final inspection against drawing tolerance at every stage.",
  },
  {
    id: "07",
    name: "Laser Cutting",
    spec: "Sheet profiling",
    desc: "Clean, repeatable cutting of flat sheet stock to drawing profile.",
  },
  {
    id: "08",
    name: "Sheet Bending",
    spec: "Press-brake forming",
    desc: "Accurate bend angles and repeatable forming for sheet metal components.",
  },
  {
    id: "09",
    name: "Welding & Fabrication",
    spec: "Structural joining",
    desc: "Fabricated assemblies and structural joining to specification.",
  },
  {
    id: "10",
    name: "Sub-Assembly",
    spec: "Component integration",
    desc: "Multi-part assembly delivered ready for the customer's line.",
  },
];

export const process = [
  { id: "01", name: "Enquiry", detail: "Drawing Review" },
  { id: "02", name: "Quotation", detail: "Cost & Timeline" },
  { id: "03", name: "Planning", detail: "Process Sheet" },
  { id: "04", name: "Machining", detail: "CNC Production" },
  { id: "05", name: "Inspection", detail: "Quality Gate" },
  { id: "06", name: "Dispatch", detail: "Zero-Defect Delivery" },
];

export const products = [
  { name: "Pinion Shafts", sector: "Tractor / Automotive" },
  { name: "Gear Blanks", sector: "Automotive / Industrial" },
  { name: "Flange Hubs", sector: "Tractor" },
  { name: "King Pins", sector: "Automotive" },
  { name: "Stub Axles", sector: "Tractor / Automotive" },
  { name: "PTO Shafts", sector: "Tractor" },
  { name: "Brake Drums", sector: "Automotive" },
  { name: "Wheel Hubs", sector: "Tractor / Automotive" },
];

export const materials = [
  { name: "Alloy Steels", grades: ["EN24T", "EN36", "EN19", "42CrMo4", "817M40"] },
  { name: "Mild Steel", grades: ["EN8", "EN8D", "MS Bars", "IS2062", "S355"] },
  { name: "Cast Iron", grades: ["SG Iron", "Grey CI", "Meehanite", "IS210"] },
  { name: "Brass & Bronze", grades: ["CuZn37", "PB2", "Leaded Bronze", "Gunmetal"] },
];

export const shopFloor = [
  "CNC Turning Bay",
  "Precision Grinding",
  "Production Floor",
  "Finished Components",
  "Quality Inspection",
  "Dispatch & Packing",
];

export const whyRai = [
  {
    title: "45 Years, Zero Compromises",
    body: "Four and a half decades in the same discipline — precision machining held to the same standard on part one and part ten thousand.",
  },
  {
    title: "Tolerance Is Not a Suggestion",
    body: "±5µm critical tolerance work, verified at every stage rather than assumed at the end of the line.",
  },
  {
    title: "Single-Source Simplicity",
    body: "Turning, milling, grinding, honing, cutting, forming, welding and inspection under one roof — one point of contact from drawing to dispatch.",
  },
];

export const partCategories = [
  "Tractor Components",
  "Automotive Parts",
  "Industrial CNC Parts",
  "Custom / Other",
];

// Get a free access key at https://web3forms.com (enter your email, no
// signup) and paste it here. This key is meant to be public/client-side —
// Web3Forms rate-limits and spam-filters server-side, so it's not a secret
// like an API password.
export const WEB3FORMS_ACCESS_KEY = "943eb0cc-7e58-4dcd-a200-de935a2a6c0c";

// AI-generated photography (OpenArt / Kling 3 Omni), now bundled as local
// assets — same as every other photo on the site — rather than hotlinked
// to OpenArt's CDN. Swap these files for real client photography whenever
// it's supplied; every consumer just reads this map.
import heroPhoto from "../assets/photos/hero.webp";
import aboutPhoto from "../assets/photos/about.webp";
import productShaftPhoto from "../assets/photos/product-shaft.webp";

export const photos = {
  hero: heroPhoto,
  about: aboutPhoto,
  productShaft: productShaftPhoto,
};

// ── Turning & job-work (added Oct 2026) ─────────────────────────────────
export const turningServices = [
  { title: "Job Work Turning", body: "Send your drawing or a sample — we turn it on our CNC lathes and deliver to your schedule, from 50 pieces to repeat production runs." },
  { title: "Shafts & Pins", body: "Pinion shafts, PTO shafts, king pins, stub axles and spindles with stepped diameters, threads and keyways." },
  { title: "Hubs, Flanges & Bushes", body: "Flange hubs, wheel hubs, gear blanks and bushes in steel, cast iron and bronze — faced, bored and finished." },
  { title: "Reverse Engineering", body: "No drawing? We measure your sample, prepare the dimensions and machine an exact replacement." },
];

export const jobWorkTerms = [
  { value: "Drawing / Sample", label: "Accepted Input" },
  { value: "Prototype → Batch", label: "Order Size" },
  { value: "±5µm", label: "Critical Tolerance" },
  { value: "In-House", label: "Inspection Report" },
];

// Machine park — placeholder specs until the client shares the real machine
// list (models, max turning Ø / length). Photos reuse existing AI shots.
import mTurn from "../assets/photos/capabilities/cnc-turning.webp";
import mBay from "../assets/photos/shopfloor/cnc-turning-bay.webp";
import mMill from "../assets/photos/capabilities/cnc-milling.webp";
import mGrind from "../assets/photos/capabilities/cylindrical-grinding.webp";
import mHone from "../assets/photos/capabilities/honing.webp";
import mQc from "../assets/photos/shopfloor/quality-inspection.webp";
import mFab from "../assets/photos/capabilities/welding-fabrication.webp";

export const machines: { name: string; type: string; spec: string; photo?: string }[] = [
  { name: "CNC Lathe 01", type: "CNC Turning Centre", spec: "Shafts, pins and stepped components — production batches.", photo: mTurn },
  { name: "CNC Lathe 02", type: "CNC Turning Centre", spec: "Hubs, flanges and bored components.", photo: mBay },
  { name: "CNC Lathe 03 & 04", type: "CNC Turning Centres", spec: "Repeat runs and job-work capacity.", photo: mMill },
  { name: "Cylindrical Grinder", type: "Finishing", spec: "Diameter and roundness control on shafts and pins.", photo: mGrind },
  { name: "Honing Machine", type: "Bore Finishing", spec: "Precise bore size, roundness and surface texture.", photo: mHone },
  { name: "Inspection Lab", type: "Quality", spec: "In-process and final dimensional checks against drawing.", photo: mQc },
  { name: "Fabrication Bay", type: "Laser · Bending · Welding", spec: "Sheet profiling, forming and structural assemblies.", photo: mFab },
];

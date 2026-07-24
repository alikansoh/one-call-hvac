"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  Check,
  Wind,
  Wrench,
  PackageCheck,
  GitBranch,
  ShieldCheck,
  Gauge,
  Plus,
  Users,
  Banknote,
  BadgeCheck,
  Navigation,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type ServiceDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  headline: string;
  summary: string;
  paragraphs: string[];
  bullets: string[];
  stat: { value: string; label: string };
  image: string;
  imageAlt: string;
  Icon: typeof Wind;
};

const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "ac-installation",
    eyebrow: "Installation",
    title: "AC Installation",
    headline: "Air conditioning installation, sized and specified correctly the first time.",
    summary:
      "We survey, size and install air conditioning for London homes, offices and retail units, from single-room splits to commercial VRF.",
    paragraphs: [
      "A cooling system is only as good as the survey behind it. Before we quote, an engineer visits the property to measure room dimensions, glazing, insulation and orientation, then runs a heat load calculation for each space — the same method used on a commercial fit-out, applied just as rigorously to a London flat or office. That's how we avoid the two most common installation mistakes: a unit too large for the room, which short-cycles and never dehumidifies properly, or one too small, which runs constantly and still can't keep up on a hot afternoon.",
      "We install wall-mounted split systems for single rooms, multi-split systems where one outdoor unit serves several rooms across a flat or townhouse, and commercial VRF systems for offices, retail units and multi-floor buildings. Every engineer is F-Gas certified, which is a legal requirement for anyone handling refrigerant in the UK, and every install is pressure-tested, vacuum-purged and commissioned before we hand back the keys. We take care of the paperwork too — building regulations notification where it applies, and a benchmark commissioning certificate for your records.",
      "We install as often in a two-bed conversion in Clapham as we do across a full floor of offices in the City — the survey process doesn't change, but the constraints do. Period properties in Islington or Richmond usually mean working carefully around lease clauses and original features; new-build flats in Canary Wharf or Stratford tend to come with tighter routing options for pipework and condensate. Either way, the quote reflects what's actually on site, not a standard day rate.",
    ],
    bullets: [
      "Free on-site survey and heat load calculation",
      "F-Gas certified engineers on every install",
      "Wall-mounted, multi-split and commercial VRF systems",
      "Pressure-tested and fully commissioned before we leave",
    ],
    stat: { value: "48hr", label: "average install turnaround" },
    image: "/job-7.jpeg",
    imageAlt: "Engineer installing a wall-mounted air conditioning unit in a London home",
    Icon: Wind,
  },
  {
    slug: "ac-repair",
    eyebrow: "Repair",
    title: "AC Repair",
    headline: "Same-day repairs for units that have stopped cooling, started leaking, or gone silent on you.",
    summary:
      "Same-day diagnosis and repair for faulty air conditioning systems across London, on any major brand, whether or not we installed it.",
    paragraphs: [
      "Most air conditioning faults fall into a handful of categories: the unit runs but doesn't cool, it cools intermittently, it leaks water indoors, or it won't respond at all. Warm air from a system that used to run cold usually points to a refrigerant leak or a failing compressor; water dripping from an indoor unit is almost always a blocked condensate drain or a cracked drain pan; a system that won't power on at all is more often an electrical fault at the isolator or PCB than a problem with the unit itself.",
      "Our engineers carry the parts and refrigerant to diagnose and fix most of these on the first visit, on any major brand whether or not we installed it — Daikin, Mitsubishi Electric, Toshiba, LG and Samsung make up most of what we see across London homes and offices. We run a 24/7 emergency line with same-day callouts seven days a week, and diagnosis is typically complete within 60 minutes of arrival. Every callout is quoted at a fixed price before work starts, so the cost of the visit is known regardless of what we find.",
      "London engineers spend a lot of time in loft conversions above Camden shopfronts and basement offices near Holborn, both of which throw up access issues a standard repair visit doesn't account for — that's usually where the extra twenty minutes on site goes. If a unit under warranty from another installer develops a fault, we'll still attend, and where the manufacturer's cover allows it, handle the claim on your behalf rather than leaving you to chase it.",
    ],
    bullets: [
      "Same-day emergency callouts, 7 days a week",
      "Diagnosis within 60 minutes of arrival",
      "All major brands: Daikin, Mitsubishi, Toshiba, LG and more",
      "Fixed callout price, no surprise add-ons",
    ],
    stat: { value: "92%", label: "faults fixed on first visit" },
    image: "/job-1.jpeg",
    imageAlt: "HVAC technician diagnosing a faulty air conditioning unit",
    Icon: Wrench,
  },
  {
    slug: "ac-wholesale",
    eyebrow: "Wholesale",
    title: "AC Wholesale",
    headline: "Trade-priced units and parts, stocked and ready for installers and contractors.",
    summary:
      "Trade-priced air conditioning units, refrigerant and installation materials, supplied to contractors across London with next-day dispatch.",
    paragraphs: [
      "We supply air conditioning units, refrigerant and installation materials at trade prices to contractors and installers working across London and the Home Counties. The range covers wall-mounted and multi-split residential units, commercial VRF systems, and the pipework, insulation, fixings and R32 or R410A refrigerant that go with them — so a contractor can collect everything for a job in one trip rather than sourcing components from several suppliers.",
      "Trade accounts get tiered volume pricing based on annual spend, and core stock lines are dispatched next-day across Greater London. If you're specifying a system for a client and need technical guidance — capacity sizing, pipe run limits, or which unit suits a particular property type — our team has fitted the equipment we sell, not just sold it, and can talk through the specification before you commit to an order.",
      "Most of our trade accounts are installers working across two or three boroughs at once, so next-day dispatch tends to matter more than a marginally lower unit price with a week's wait. Collection is also available from our depot for contractors who'd rather pick up refrigerant and fixings on the way to site than wait on a delivery slot, and we'll hold stock against a confirmed job so a delayed delivery from a manufacturer doesn't hold up your install date.",
    ],
    bullets: [
      "Trade accounts with tiered volume pricing",
      "Split, multi-split and commercial units in stock",
      "Refrigerant, pipework and fixings supplied together",
      "Next-day dispatch across Greater London",
    ],
    stat: { value: "30+", label: "brands and models in stock" },
    image: "/job-2.jpeg",
    imageAlt: "Air conditioning units and refrigerant stock in a wholesale warehouse",
    Icon: PackageCheck,
  },
  {
    slug: "ac-pipework",
    eyebrow: "Pipework",
    title: "AC Pipework",
    headline: "Refrigerant pipework designed and pressure-tested to F-Gas standard.",
    summary:
      "Refrigerant pipework designed, installed and pressure-tested to F-Gas standard, for new installations and standalone contract work.",
    paragraphs: [
      "Refrigerant pipework is where a lot of installations go wrong after the fact — a poorly supported run, an undersized pipe diameter, or a joint that wasn't properly brazed tends to show up as a slow leak six months or two years later, not on day one. We design and install copper refrigerant pipework to F-Gas standard for both new installations and standalone contract work, from a single concealed run behind a stud wall to riser pipework serving multiple floors of a commercial building.",
      "Every run is vacuum-tested, pressure-tested with nitrogen, and leak-checked before the system is charged and commissioned, with certification supplied for your records — required documentation on commercial jobs and good practice on any residential install. We handle insulation and condensate drainage as part of the same visit, so the pipe run, the drain and the finish are done by one engineer rather than handed between trades. Concealed, surface-mounted and exposed architectural runs are all within scope, and we work directly with contractors on new-build and refurbishment programmes.",
      "A concealed run through a Victorian conversion in Hackney behaves very differently to a riser serving eight floors of an office block in Croydon, and the certification requirements differ too — domestic jobs need a pressure test and commissioning record for the homeowner's file, commercial jobs typically need the same paperwork for building management and insurers. We provide both as standard, not as a chargeable extra.",
    ],
    bullets: [
      "Concealed, surface-mounted and riser pipework",
      "Vacuum, pressure test and leak certification included",
      "Multi-floor commercial and new-build runs",
      "Insulation and condensate drainage handled together",
    ],
    stat: { value: "0", label: "callbacks for pipe-run leaks in 2025" },
    image: "/job-3.jpeg",
    imageAlt: "Copper refrigerant pipework installed inside a commercial building",
    Icon: GitBranch,
  },
];

/* One consistent, professional card shape for every service. Each keeps
   its own accent colour — carried through the top rule, the eyebrow, the
   bullet marks, the stat and the call-to-action — so the four read as a
   coherent set rather than four unrelated experiments. */
const SERVICE_THEMES = [
  {
    topRule: "border-t-blue-700",
    eyebrow: "text-blue-700",
    badgeBg: "bg-blue-700",
    bulletIconBg: "bg-blue-50",
    bulletIconText: "text-blue-700",
    statBorder: "border-blue-100 bg-blue-50/50",
    statValue: "text-blue-700",
    cta: "bg-blue-700 text-white hover:bg-blue-800",
  },
  {
    topRule: "border-t-orange-600",
    eyebrow: "text-orange-600",
    badgeBg: "bg-orange-600",
    bulletIconBg: "bg-orange-50",
    bulletIconText: "text-orange-600",
    statBorder: "border-orange-100 bg-orange-50/50",
    statValue: "text-orange-600",
    cta: "bg-orange-600 text-white hover:bg-orange-500",
  },
  {
    topRule: "border-t-slate-700",
    eyebrow: "text-slate-700",
    badgeBg: "bg-slate-700",
    bulletIconBg: "bg-slate-100",
    bulletIconText: "text-slate-700",
    statBorder: "border-slate-200 bg-slate-50",
    statValue: "text-slate-700",
    cta: "bg-slate-800 text-white hover:bg-slate-900",
  },
  {
    topRule: "border-t-teal-700",
    eyebrow: "text-teal-700",
    badgeBg: "bg-teal-700",
    bulletIconBg: "bg-teal-50",
    bulletIconText: "text-teal-700",
    statBorder: "border-teal-100 bg-teal-50/50",
    statValue: "text-teal-700",
    cta: "bg-teal-700 text-white hover:bg-teal-800",
  },
];

const PROCESS_STEPS = [
  {
    title: "Free survey & heat load calc",
    detail:
      "An engineer measures the room, checks glazing and insulation, and calculates the actual cooling load — not an estimate based on floor area alone.",
  },
  {
    title: "Request your quote",
    detail:
      "You get one fixed number covering the unit, pipework, electrical work and commissioning — confirmed before anything is booked in.",
  },
  {
    title: "We come and fix everything for you",
    detail:
      "Mounting, pipework, pressure test, vacuum and a full commissioning check — we handle it all on site so you don't have to think about it.",
  },
  {
    title: "Enjoy your AC or AC heating",
    detail:
      "Sit back with reliable cooling or heating, backed by a commissioning certificate filed for your records.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Employed engineers, not subcontractors",
    detail: "Everyone who comes to site is F-Gas certified and on our books — never a subcontractor we've never met.",
    Icon: Users,
  },
  {
    title: "Upfront pricing",
    detail: "You know the cost before we start, no hidden extras once the job's underway.",
    Icon: Banknote,
  },
  {
    title: "F-Gas certified and fully insured",
    detail: "Certification is a legal requirement for anyone handling refrigerant in the UK — we check it's current, not just that it exists.",
    Icon: BadgeCheck,
  },
  {
    title: "Fast response times",
    detail: "Most callouts and installs are booked within 48 hours, not weeks.",
    Icon: Navigation,
  },
  {
    title: "Certified work",
    detail: "Every job is documented.",
    Icon: ShieldCheck,
  },
];

const BRANDS = [
  { name: "Mitsubishi", logo: "/mitsubishi.png" },
  { name: "LG", logo: "/lg.webp" },
  { name: "Samsung", logo: "/samsung.webp" },
  { name: "Daikin", logo: "/daikin.webp" },
  { name: "Toshiba", logo: "/toshiba.png" },
  { name: "Hitachi", logo: "/hitachi.webp" },
  { name: "Carrier", logo: "/carrier.webp" },
  { name: "Bosch", logo: "/bosch.webp" },
];

const BOROUGH_GROUPS = [
  {
    region: "North London",
    boroughs: ["Barnet", "Camden", "Enfield", "Haringey", "Islington", "Harrow"],
  },
  {
    region: "East London",
    boroughs: [
      "Barking & Dagenham",
      "Hackney",
      "Havering",
      "Newham",
      "Redbridge",
      "Tower Hamlets",
      "Waltham Forest",
    ],
  },
  {
    region: "South London",
    boroughs: [
      "Bexley",
      "Bromley",
      "Croydon",
      "Greenwich",
      "Kingston upon Thames",
      "Lambeth",
      "Lewisham",
      "Merton",
      "Richmond upon Thames",
      "Southwark",
      "Sutton",
      "Wandsworth",
    ],
  },
  {
    region: "West & Central London",
    boroughs: [
      "Brent",
      "Ealing",
      "Hammersmith & Fulham",
      "Hillingdon",
      "Hounslow",
      "Kensington & Chelsea",
      "Westminster",
      "City of London",
    ],
  },
];

const FAQS = [
  {
    q: "How much does air conditioning installation cost in London?",
    a: "A single-room split system typically runs from a few hundred pounds for a small residential space, rising with unit capacity, wall/pipe run length, and any electrical work needed. We give you a fixed price after the free site survey — never a phone-estimate.",
  },
  {
    q: "How long does an AC installation take?",
    a: "Most single-split residential installs are completed in a day. Multi-split and commercial VRF systems depend on the number of indoor units and pipe run complexity — we'll give you an exact timeline after the survey, and most jobs are booked within 48 hours.",
  },
  {
    q: "Do you offer emergency AC repairs?",
    a: "Yes. We run a 24/7 emergency line for units that have stopped cooling entirely or are leaking. Same-day callouts are available seven days a week, with a fixed diagnostic fee that's credited toward the repair.",
  },
  {
    q: "What brands do you install, repair and supply?",
    a: "Daikin, Mitsubishi Electric, Toshiba, LG, Samsung and most major residential and commercial brands. If you already have a system installed by someone else, we'll still service and repair it.",
  },
  {
    q: "Can you handle pipework for a new-build or renovation?",
    a: "Yes — we design and install refrigerant pipework as part of a full installation or as a standalone service for contractors, including multi-floor riser runs, and every run is pressure-tested and certified before commissioning.",
  },
  {
    q: "Do you cover my part of London?",
    a: "We dispatch engineers across all 32 London boroughs and the City of London daily. Check the areas we cover below, or just call — we'll confirm on the spot.",
  },
  {
    q: "What size air conditioning unit do I need?",
    a: "It depends on room size, glazing, insulation and how the space is used, not a fixed number per square metre. That's exactly why we survey and calculate the heat load before quoting, rather than sizing a system over the phone.",
  },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://example.com/" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://example.com/services" },
      ],
    },
    ...SERVICE_DETAILS.map((s) => ({
      "@type": "Service",
      name: s.title,
      description: s.summary,
      serviceType: s.title,
      areaServed: BOROUGH_GROUPS.flatMap((g) => g.boroughs).map((name) => ({ "@type": "City", name })),
      provider: { "@type": "HVACBusiness", name: "One Call HVAC", telephone: "02034885727" },
      url: `https://example.com/services/${s.slug}`,
    })),
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Signature 3D piece: a wall-mounted indoor unit, running live.       */
/* ------------------------------------------------------------------ */

function AirconUnit3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || 340;
    let height = container.clientHeight || 340;
    let frameId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(2.1, 0.35, 5.5);
    camera.lookAt(0, -0.05, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const disposables: Array<{ dispose: () => void }> = [];
    function track<T extends { dispose: () => void }>(item: T): T {
      disposables.push(item);
      return item;
    }

    scene.add(new THREE.HemisphereLight(0xffffff, 0x2b3138, 1.0));
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(3.5, 4.5, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 15;
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    key.shadow.bias = -0.0015;
    key.shadow.radius = 5;
    scene.add(key);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.45);
    fillLight.position.set(-5, 1.5, -3);
    scene.add(fillLight);
    const rim = new THREE.PointLight(0x5b9dfb, 0.7, 14);
    rim.position.set(-3, 1.6, -2);
    scene.add(rim);
    const kicker = new THREE.PointLight(0xff8a3d, 0.28, 10);
    kicker.position.set(3, -0.4, 2.6);
    scene.add(kicker);

    const rig = new THREE.Group();
    scene.add(rig);

    const shadowCatcherGeometry = track(new THREE.PlaneGeometry(5, 3.4));
    const shadowCatcherMaterial = track(new THREE.ShadowMaterial({ opacity: 0.16 }));
    const shadowCatcher = new THREE.Mesh(shadowCatcherGeometry, shadowCatcherMaterial);
    shadowCatcher.position.z = -0.55;
    shadowCatcher.receiveShadow = true;
    rig.add(shadowCatcher);

    const bodyWidth = 2.7;
    const bodyHeight = 0.92;
    const bodyDepth = 0.56;
    const radius = 0.14;
    const hw = bodyWidth / 2;
    const hh = bodyHeight / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-hw + radius, -hh);
    shape.lineTo(hw - radius, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
    shape.lineTo(hw, hh - radius);
    shape.quadraticCurveTo(hw, hh, hw - radius, hh);
    shape.lineTo(-hw + radius, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
    shape.lineTo(-hw, -hh + radius);
    shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);

    const bodyGeometry = track(
      new THREE.ExtrudeGeometry(shape, {
        depth: bodyDepth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
        curveSegments: 8,
      })
    );
    bodyGeometry.translate(0, 0, -bodyDepth / 2);
    const bodyMaterial = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xf3f5f7,
        roughness: 0.28,
        metalness: 0.08,
        clearcoat: 0.6,
        clearcoatRoughness: 0.22,
      })
    );
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    rig.add(body);

    const bodyEdges = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(bodyGeometry, 30)),
      track(new THREE.LineBasicMaterial({ color: 0xc7d2e0, transparent: true, opacity: 0.4 }))
    );
    rig.add(bodyEdges);

    const trimGeometry = track(new THREE.BoxGeometry(0.52, 0.18, 0.02));
    const trimMaterial = track(
      new THREE.MeshPhysicalMaterial({ color: 0xdfe4ea, roughness: 0.35, metalness: 0.2, clearcoat: 0.4 })
    );
    const trim = new THREE.Mesh(trimGeometry, trimMaterial);
    trim.position.set(hw - 0.44, hh - 0.24, bodyDepth / 2 - 0.01);
    rig.add(trim);

    const displayCanvas = document.createElement("canvas");
    displayCanvas.width = 256;
    displayCanvas.height = 96;
    const displayCtx = displayCanvas.getContext("2d");
    const displayTexture = track(new THREE.CanvasTexture(displayCanvas));
    displayTexture.colorSpace = THREE.SRGBColorSpace;

    function drawDisplay(text: string) {
      if (!displayCtx) return;
      displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
      displayCtx.fillStyle = "#0b1f2e";
      displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);
      displayCtx.font = "700 52px 'Courier New', monospace";
      displayCtx.fillStyle = "#5fd8ff";
      displayCtx.textAlign = "center";
      displayCtx.textBaseline = "middle";
      displayCtx.shadowColor = "#5fd8ff";
      displayCtx.shadowBlur = 18;
      displayCtx.fillText(text, displayCanvas.width / 2, displayCanvas.height / 2 + 2);
      displayTexture.needsUpdate = true;
    }
    drawDisplay("18.0°");

    const displayGeometry = track(new THREE.PlaneGeometry(0.48, 0.16));
    const displayMaterial = track(new THREE.MeshBasicMaterial({ map: displayTexture, transparent: true }));
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(hw - 0.44, hh - 0.24, bodyDepth / 2 + 0.005);
    rig.add(display);

    const ventGeometry = track(new THREE.BoxGeometry(bodyWidth - 0.14, 0.14, 0.42));
    const ventMaterial = track(new THREE.MeshStandardMaterial({ color: 0x232a31, roughness: 0.55, metalness: 0.15 }));
    const vent = new THREE.Mesh(ventGeometry, ventMaterial);
    vent.position.set(0, -hh + 0.02, 0.08);
    vent.rotation.x = -0.28;
    vent.castShadow = true;
    rig.add(vent);

    const louvreGeometry = track(new THREE.BoxGeometry(bodyWidth - 0.22, 0.05, 0.3));
    const louvreMaterial = track(new THREE.MeshStandardMaterial({ color: 0xe8ecf0, roughness: 0.4, metalness: 0.1 }));
    const louvrePivot = new THREE.Group();
    louvrePivot.position.set(0, -hh - 0.02, 0.16);
    const louvre = new THREE.Mesh(louvreGeometry, louvreMaterial);
    louvre.position.z = 0.13;
    louvre.castShadow = true;
    louvrePivot.add(louvre);
    rig.add(louvrePivot);

    const ledGeometry = track(new THREE.SphereGeometry(0.026, 12, 12));
    const ledMaterial = track(
      new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x22d3ee,
        emissiveIntensity: 1,
        roughness: 0.3,
      })
    );
    const led = new THREE.Mesh(ledGeometry, ledMaterial);
    led.position.set(-hw + 0.3, -hh + 0.14, bodyDepth / 2 + 0.01);
    rig.add(led);

    type Stream = {
      geometry: THREE.BufferGeometry;
      seeds: number[];
      laneX: number[];
      laneZ: number[];
      count: number;
      speed: number;
      travel: number;
    };

    function buildStream(count: number, spread: number, size: number, opacity: number, speed: number, travel: number): Stream {
      const geometry = track(new THREE.BufferGeometry());
      const positions = new Float32Array(count * 3);
      const seeds = Array.from({ length: count }, () => Math.random());
      const laneX = Array.from({ length: count }, () => (Math.random() - 0.5) * spread);
      const laneZ = Array.from({ length: count }, () => 0.1 + Math.random() * 0.32);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = laneX[i];
        positions[i * 3 + 1] = -hh - Math.random() * travel;
        positions[i * 3 + 2] = laneZ[i];
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = track(
        new THREE.PointsMaterial({
          color: 0xbfe7ff,
          size,
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      const points = new THREE.Points(geometry, material);
      rig.add(points);
      return { geometry, seeds, laneX, laneZ, count, speed, travel };
    }

    const streamNear = buildStream(42, 1.5, 0.05, 0.55, 0.3, 1.15);
    const streamFar = buildStream(56, 1.9, 0.03, 0.28, 0.2, 1.15);

    function updateStream(stream: Stream, elapsed: number) {
      const posArray = stream.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < stream.count; i++) {
        const t = (elapsed * stream.speed + stream.seeds[i]) % 1;
        const drift = Math.sin(elapsed * 0.8 + stream.seeds[i] * 10) * 0.1;
        posArray[i * 3] = stream.laneX[i] + drift * t;
        posArray[i * 3 + 1] = -hh - t * stream.travel;
        posArray[i * 3 + 2] = stream.laneZ[i];
      }
      stream.geometry.attributes.position.needsUpdate = true;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const clock = new THREE.Clock();
    let displayTick = -1;
    const readings = ["18.0°", "17.5°", "17.0°", "17.5°"];

    const renderScene = () => {
      const elapsed = clock.getElapsedTime();

      rig.rotation.y += (mouseX * 0.3 - rig.rotation.y) * 0.04;
      rig.rotation.x += (-mouseY * 0.06 - rig.rotation.x) * 0.04;
      rig.rotation.y += reducedMotion ? 0 : 0.0006;

      body.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.55) * 0.02;
      bodyEdges.position.y = body.position.y;
      trim.position.y = hh - 0.24 + body.position.y;
      display.position.y = hh - 0.24 + body.position.y;
      vent.position.y = -hh + 0.02 + body.position.y;
      louvrePivot.position.y = -hh - 0.02 + body.position.y;
      led.position.y = -hh + 0.14 + body.position.y;

      louvrePivot.rotation.x = reducedMotion ? -0.3 : -0.3 + Math.sin(elapsed * 0.9) * 0.32;

      if (!reducedMotion) {
        updateStream(streamNear, elapsed);
        updateStream(streamFar, elapsed);
      }

      ledMaterial.emissiveIntensity = reducedMotion ? 0.8 : 0.55 + Math.sin(elapsed * 2.1) * 0.45;

      if (!reducedMotion) {
        const nextTick = Math.floor(elapsed / 1.6) % readings.length;
        if (nextTick !== displayTick) {
          displayTick = nextTick;
          drawDisplay(readings[displayTick]);
        }
      }

      renderer.render(scene, camera);
    };

    const animate = () => {
      renderScene();
      frameId = requestAnimationFrame(animate);
    };

    if (reducedMotion) {
      renderScene();
    } else {
      animate();
    }

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* FAQ accordion                                                       */
/* ------------------------------------------------------------------ */

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <div className="border-b border-slate-200 py-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-heading text-base font-bold text-slate-900 sm:text-lg">{q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-transform duration-300 ${
            open ? "rotate-45 border-blue-600 bg-blue-600 text-white" : ""
          }`}
        >
          <Plus size={16} />
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s ease",
        }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-10 text-sm leading-relaxed text-slate-600 sm:text-base">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function ServicesPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          ".svcp-mask > *, .svcp-fade, .svcp-3d, .svcp-detail, .svcp-faq, .svcp-step, .svcp-diff, .svcp-borough",
          { clearProps: "all" }
        );
        return;
      }

      gsap.fromTo(
        ".svcp-mask > *",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.85, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        ".svcp-fade",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.35 }
      );
      gsap.fromTo(
        ".svcp-3d",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      gsap.utils.toArray<HTMLElement>(".svcp-detail").forEach((section) => {
        const media = section.querySelector(".svcp-detail-media");
        const copy = section.querySelectorAll(".svcp-detail-copy > *");
        gsap.fromTo(
          media,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
        gsap.fromTo(
          copy,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 78%", once: true },
          }
        );
      });

      ScrollTrigger.batch(".svcp-step", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }),
      });

      ScrollTrigger.batch(".svcp-diff", {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }),
      });

      ScrollTrigger.batch(".svcp-borough", {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }),
      });

      ScrollTrigger.batch(".svcp-faq", {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(batch, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* Hero — dark background, no grid pattern */}
      <section className="relative overflow-hidden bg-[#03142b] pb-8 pt-20 sm:pb-10 sm:pt-24 lg:pb-12 lg:pt-28">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:gap-8">
            <div>
              <nav aria-label="Breadcrumb" className="svcp-fade mb-5 flex items-center gap-2 text-xs font-semibold text-white/50">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white/80">Services</span>
              </nav>

              <p className="svcp-mask overflow-hidden">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                  Air Conditioning Services in London
                </span>
              </p>

              <h1 className="mt-4 font-heading font-extrabold leading-[1.02] tracking-tight text-white text-[clamp(1.9rem,4.8vw,3.1rem)]">
                <span className="svcp-mask block overflow-hidden">
                  <span className="inline-block">Installation, repair, wholesale</span>
                </span>
                <span className="svcp-mask block overflow-hidden">
                  <span className="inline-block">and pipework — one call.</span>
                </span>
              </h1>

              <p className="svcp-fade mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Everything a London home, office or contractor needs from an air
                conditioning specialist, done by F-Gas certified engineers with
                upfront pricing and paperwork you can rely on.
              </p>

              <div className="svcp-fade mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:02034885727"
                  className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3.5 font-heading text-sm font-bold text-white shadow-md shadow-blue-900/30 ring-1 ring-white/10 transition-all duration-300 hover:brightness-110"
                >
                  <Phone size={17} />
                  Call 02034885727
                </a>
                <a
                  href="#quote"
                  className="flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3.5 font-heading text-sm font-bold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                >
                  Get a free quote
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="svcp-3d relative mx-auto h-56 w-full max-w-xs sm:h-64 lg:h-72">
              <AirconUnit3D />
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO intro strip */}
      <section className="border-b border-slate-100 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            We install, repair and maintain air conditioning across every London
            borough, from Victorian terraces in Wandsworth to new-build offices in Canary Wharf.
            Whatever the property, the approach doesn&apos;t change: an engineer surveys before we
            quote, and the price you&apos;re given is the price you pay.
          </p>
        </div>
      </section>

      {/* Service jump links */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 py-3 sm:px-8">
          {SERVICE_DETAILS.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Detailed service sections — each one its own distinctly styled card */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-14">
          {SERVICE_DETAILS.map((service, i) => {
            const theme = SERVICE_THEMES[i % SERVICE_THEMES.length];
            return (
              <section
                key={service.slug}
                id={service.slug}
                className={`svcp-detail scroll-mt-24 rounded-2xl border border-slate-200 border-t-4 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10 lg:p-12 ${theme.topRule}`}
              >
                <div
                  className={`flex flex-col items-center gap-10 lg:flex-row lg:gap-14 ${
                    i % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="svcp-detail-media relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 lg:w-[46%]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover"
                    />
                    <div className={`absolute left-0 top-0 flex items-center gap-2 rounded-br-lg px-3 py-1.5 ${theme.badgeBg}`}>
                      <service.Icon size={13} className="text-white" />
                      <span className="text-[11px] font-bold uppercase tracking-wide text-white">
                        {service.eyebrow}
                      </span>
                    </div>
                  </div>

                  <div className="svcp-detail-copy w-full lg:w-[54%]">
                    <p className={`text-xs font-bold uppercase tracking-[0.2em] ${theme.eyebrow}`}>{service.eyebrow}</p>

                    <h2 className="mt-3 font-heading text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                      {service.headline}
                    </h2>

                    <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                      {service.paragraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${theme.bulletIconBg} ${theme.bulletIconText}`}
                          >
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className={`inline-flex items-center gap-3 rounded-xl border px-4 py-3 ${theme.statBorder}`}>
                        <Gauge size={18} className={theme.statValue} />
                        <div>
                          <p className={`font-heading text-lg font-extrabold leading-none ${theme.statValue}`}>
                            {service.stat.value}
                          </p>
                          <p className="mt-1 text-[11px] font-medium text-slate-500">{service.stat.label}</p>
                        </div>
                      </div>

                      <a
                        href="tel:02034885727"
                        className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-heading text-sm font-bold transition ${theme.cta}`}
                      >
                        Book {service.title.toLowerCase()}
                        <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* How we work — steps shown as numbers, not icons */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">How we work</p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              From first call to commissioning certificate
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              The same four steps whether it&apos;s a single room in Fulham or a full-floor office fit-out in the City.
            </p>
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-slate-200 lg:block" aria-hidden="true" />
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="svcp-step relative">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="relative z-10"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="24" r="22" fill="white" stroke="#2563eb" strokeWidth="2.5" />
                  <text
                    x="24"
                    y="25"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="20"
                    fontWeight="800"
                    fill="#2563eb"
                    fontFamily="inherit"
                  >
                    {i + 1}
                  </text>
                </svg>
                <h3 className="mt-4 font-heading text-lg font-extrabold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us — an editorial list rather than a card grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Why people call us back</p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            What&apos;s actually different about how we do this
          </h2>

          <div className="mt-10 divide-y divide-slate-200">
            {DIFFERENTIATORS.map((item) => (
              <div key={item.title} className="svcp-diff flex items-start gap-5 py-5">
                <item.Icon size={20} className="mt-1 shrink-0 text-blue-600" />
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-base">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands strip — actual logos, matched to what we install and repair */}
      <section className="border-y border-slate-200 bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            Installed, serviced and repaired — any major brand
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm sm:h-24"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={48}
                  className="h-auto max-h-9 w-auto max-w-[80%] object-contain opacity-85 sm:max-h-10"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas we cover */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.6fr,1.4fr] lg:gap-14">
            <div className="relative order-2 mx-auto flex aspect-[4/3] w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl bg-slate-200 lg:order-1 lg:max-w-xs">
              {/* Replace with a London-specific image, e.g. /london-coverage.jpg */}
              <Image
                src="/london-map.jpg"
                alt="Map of London boroughs covered by our engineers"
                fill
                sizes="(min-width: 1024px) 20vw, 100vw"
                className="object-contain"
              />
              <div className="absolute bottom-3 left-3 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm">
                <p className="font-heading text-lg font-extrabold leading-none text-slate-900">32/32</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  London boroughs covered
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Areas we cover</p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Engineers dispatched across all 32 London boroughs
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Installation, repair, wholesale and pipework — the same standard whether you&apos;re
                in a first-floor flat in Zone 2 or a warehouse unit out past the M25 boundary.
                Coordinators route jobs to the nearest available engineer, so callouts and installs
                across Greater London are booked in days, not weeks.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Don&apos;t see your borough listed by name, or based just outside Greater London?{" "}
                <a href="tel:02034885727" className="font-semibold text-blue-600 hover:text-blue-700">
                  Call 02034885727
                </a>{" "}
                and we&apos;ll confirm coverage on the spot.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BOROUGH_GROUPS.map((group) => (
              <div
                key={group.region}
                className="svcp-borough rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-800">
                    <MapPin size={13} className="text-orange-500" />
                    {group.region}
                  </p>
                  <span className="text-[11px] font-medium text-slate-400">{group.boroughs.length}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {group.boroughs.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Common questions</p>
          <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Air conditioning FAQs
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Answers to what people usually ask before booking installation or repair.
          </p>

          <div className="mt-8">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="svcp-faq">
                <FaqItem q={faq.q} a={faq.a} defaultOpen={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="quote" className="relative overflow-hidden bg-[#03142b] py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Ready to get your air conditioning sorted?
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Call now for a free quote, or leave your details and a technician will call you back within 30 minutes.
          </p>
          <a
            href="tel:02034885727"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-800 px-7 py-3.5 font-heading text-sm font-bold text-white shadow-md shadow-blue-900/30 ring-1 ring-white/10 transition-all duration-300 hover:brightness-110"
          >
            <Phone size={17} />
            02034885727
          </a>
        </div>
      </section>
    </div>
  );
}
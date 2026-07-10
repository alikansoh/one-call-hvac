"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PhoneCall } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

type Category = "installation" | "repair" | "wholesale" | "pipework";

type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: Category;
};

const SERVICES: Service[] = [
  {
    slug: "ac-installation",
    title: "AC Installation",
    description:
      "Professional air conditioning installation for homes, offices, shops, and commercial buildings.",
    image: "/service2.png",
    imageAlt: "Professional AC installation at a London property",
    category: "installation",
  },
  {
    slug: "ac-repair",
    title: "AC Repair",
    description:
      "Fast and reliable repairs for faulty, leaking, noisy, or underperforming air conditioning systems.",
    image: "/service1.png",
    imageAlt: "HVAC technician repairing an air conditioning system",
    category: "repair",
  },
  {
    slug: "ac-wholesale",
    title: "AC Wholesale",
    description:
      "High-quality air conditioning units, components, and materials supplied at competitive prices.",
    image: "/service3.png",
    imageAlt: "Air conditioning units and HVAC materials ready for wholesale supply",
    category: "wholesale",
  },
  {
    slug: "ac-pipework",
    title: "AC Pipework",
    description:
      "Reliable refrigerant pipework design and installation for residential, commercial, and large buildings.",
    image: "/service4.png",
    imageAlt: "Professional AC pipework installation inside a commercial building",
    category: "pipework",
  },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": SERVICES.map((service) => ({
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    areaServed: {
      "@type": "City",
      name: "London",
    },
    provider: {
      "@type": "HVACBusiness",
      name: "Your HVAC Company",
      telephone: "02034885727",
    },
    url: `https://example.com/services/${service.slug}`,
  })),
};

export default function Services() {
  const rootRef = useRef<HTMLDivElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          ".svc-mask > *, .svc-fade, .svc-3d, .svc-card, .svc-card-media img, .svc-cta",
          { clearProps: "all" }
        );

        return;
      }

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      headerTl
        .fromTo(
          ".svc-mask > *",
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.1,
          }
        )
        .fromTo(
          ".svc-divider",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.5,
            transformOrigin: "left center",
          },
          "-=0.5"
        )
        .fromTo(
          ".svc-fade",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.35"
        )
        .fromTo(
          ".svc-3d",
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.4"
        );

      ScrollTrigger.batch(".svc-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            }
          );

          batch.forEach((card) => {
            const image = card.querySelector(".svc-card-media img");

            if (image) {
              gsap.fromTo(
                image,
                {
                  scale: 1.08,
                  opacity: 0,
                },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                }
              );
            }
          });
        },
      });

      gsap.fromTo(
        ".svc-cta",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".svc-cta",
            start: "top 90%",
            once: true,
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = threeContainerRef.current;
    if (!container) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 320;
    let frameId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x1e3a8a, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const blueLight = new THREE.PointLight(0x60a5fa, 2.8, 11);
    blueLight.position.set(-3, -2, 4);
    scene.add(blueLight);

    const rimLight = new THREE.PointLight(0xbfdbfe, 1.9, 10);
    rimLight.position.set(3, -3, 2);
    scene.add(rimLight);

    const acGroup = new THREE.Group();
    acGroup.position.y = 0.6;
    acGroup.rotation.x = -0.08;
    scene.add(acGroup);

    const whiteMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.28,
      metalness: 0.08,
      clearcoat: 0.35,
      clearcoatRoughness: 0.22,
    });

    const sideMaterial = new THREE.MeshStandardMaterial({
      color: 0xdbeafe,
      roughness: 0.42,
      metalness: 0.08,
    });

    const panelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.04,
      clearcoat: 0.45,
      clearcoatRoughness: 0.18,
    });

    const darkVentMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.55,
      metalness: 0.2,
    });

    const louverMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      roughness: 0.22,
      metalness: 0.12,
      clearcoat: 0.35,
    });

    const displayMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95,
    });

    const bodyGeometry = new THREE.BoxGeometry(4.45, 1.22, 0.82);
    const body = new THREE.Mesh(bodyGeometry, whiteMaterial);
    acGroup.add(body);

    const leftCapGeometry = new THREE.CylinderGeometry(0.61, 0.61, 0.82, 32);
    const leftCap = new THREE.Mesh(leftCapGeometry, sideMaterial);
    leftCap.rotation.z = Math.PI / 2;
    leftCap.position.set(-2.22, 0, 0);
    acGroup.add(leftCap);

    const rightCap = leftCap.clone();
    rightCap.position.x = 2.22;
    acGroup.add(rightCap);

    const frontPanelGeometry = new THREE.BoxGeometry(3.96, 0.63, 0.14);
    const frontPanel = new THREE.Mesh(frontPanelGeometry, panelMaterial);
    frontPanel.position.set(0, 0.12, 0.49);
    acGroup.add(frontPanel);

    const topHighlightGeometry = new THREE.BoxGeometry(3.7, 0.025, 0.02);
    const topHighlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    const topHighlight = new THREE.Mesh(topHighlightGeometry, topHighlightMaterial);
    topHighlight.position.set(0, 0.47, 0.58);
    acGroup.add(topHighlight);

    const displayGeometry = new THREE.BoxGeometry(0.38, 0.09, 0.018);
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(1.38, 0.15, 0.575);
    acGroup.add(display);

    const logoGeometry = new THREE.CircleGeometry(0.045, 24);
    const logoMaterial = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(-1.55, 0.15, 0.576);
    acGroup.add(logo);

    const ventHousingGeometry = new THREE.BoxGeometry(3.9, 0.34, 0.22);
    const ventHousing = new THREE.Mesh(ventHousingGeometry, darkVentMaterial);
    ventHousing.position.set(0, -0.38, 0.51);
    acGroup.add(ventHousing);

    const ventInteriorGeometry = new THREE.BoxGeometry(3.7, 0.16, 0.035);
    const ventInteriorMaterial = new THREE.MeshBasicMaterial({
      color: 0x020617,
    });
    const ventInterior = new THREE.Mesh(
      ventInteriorGeometry,
      ventInteriorMaterial
    );
    ventInterior.position.set(0, -0.37, 0.64);
    acGroup.add(ventInterior);

    const louverGeometry = new THREE.BoxGeometry(3.62, 0.035, 0.12);

    for (let index = 0; index < 7; index += 1) {
      const louver = new THREE.Mesh(louverGeometry, louverMaterial);
      louver.position.set(0, -0.265 - index * 0.043, 0.68);
      louver.rotation.x = -0.42;
      acGroup.add(louver);
    }

    const verticalGuideGeometry = new THREE.BoxGeometry(0.028, 0.27, 0.1);

    for (let index = 0; index < 9; index += 1) {
      const guide = new THREE.Mesh(verticalGuideGeometry, louverMaterial);
      guide.position.set(-1.7 + index * 0.425, -0.39, 0.69);
      guide.rotation.x = -0.42;
      acGroup.add(guide);
    }

    const airflowGroup = new THREE.Group();
    airflowGroup.position.set(0, -0.52, 0.6);
    acGroup.add(airflowGroup);

    const airflowTubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const airflowCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const airflowGeometries: THREE.TubeGeometry[] = [];
    const airflowMeshes: THREE.Mesh<
      THREE.TubeGeometry,
      THREE.MeshBasicMaterial
    >[] = [];
    const airflowCoreMeshes: THREE.Mesh<
      THREE.TubeGeometry,
      THREE.MeshBasicMaterial
    >[] = [];

    [-1.55, -0.95, -0.35, 0.35, 0.95, 1.55].forEach((startX, index) => {
      const drift = index % 2 === 0 ? 1 : -1;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, 0, 0),
        new THREE.Vector3(startX + 0.12 * drift, -0.38, 0.08),
        new THREE.Vector3(startX - 0.16 * drift, -0.95, 0.02),
        new THREE.Vector3(startX + 0.08 * drift, -1.65, -0.04),
        new THREE.Vector3(startX, -2.3, -0.08),
      ]);

      const outerGeometry = new THREE.TubeGeometry(curve, 64, 0.035, 12, false);
      const innerGeometry = new THREE.TubeGeometry(curve, 64, 0.018, 10, false);

      airflowGeometries.push(outerGeometry, innerGeometry);

      const airflowOuter = new THREE.Mesh(outerGeometry, airflowTubeMaterial);
      const airflowInner = new THREE.Mesh(innerGeometry, airflowCoreMaterial);

      airflowOuter.rotation.z = (index - 2.5) * 0.02;
      airflowInner.rotation.z = (index - 2.5) * 0.02;

      airflowMeshes.push(airflowOuter);
      airflowCoreMeshes.push(airflowInner);

      airflowGroup.add(airflowOuter);
      airflowGroup.add(airflowInner);
    });

    const mistCount = 180;
    const mistPositions = new Float32Array(mistCount * 3);
    const mistSeeds = Array.from({ length: mistCount }, () => ({
      x: (Math.random() - 0.5) * 3.55,
      progress: Math.random(),
      speed: 0.55 + Math.random() * 0.65,
      wobble: 0.03 + Math.random() * 0.08,
      spread: 0.4 + Math.random() * 0.8,
      offset: Math.random() * Math.PI * 2,
    }));

    const mistGeometry = new THREE.BufferGeometry();
    mistGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(mistPositions, 3)
    );

    const mistMaterial = new THREE.PointsMaterial({
      color: 0xdbeafe,
      size: 0.038,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const mistParticles = new THREE.Points(mistGeometry, mistMaterial);
    mistParticles.position.set(0, -0.5, 0.68);
    acGroup.add(mistParticles);

    const coldFlowCount = 90;
    const coldFlowPositions = new Float32Array(coldFlowCount * 3);
    const coldFlowSeeds = Array.from({ length: coldFlowCount }, () => ({
      x: (Math.random() - 0.5) * 3.3,
      progress: Math.random(),
      speed: 0.95 + Math.random() * 0.85,
      sway: 0.08 + Math.random() * 0.14,
      offset: Math.random() * Math.PI * 2,
    }));

    const coldFlowGeometry = new THREE.BufferGeometry();
    coldFlowGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(coldFlowPositions, 3)
    );

    const coldFlowMaterial = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.055,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const coldFlowParticles = new THREE.Points(
      coldFlowGeometry,
      coldFlowMaterial
    );
    coldFlowParticles.position.set(0, -0.5, 0.72);
    acGroup.add(coldFlowParticles);

    const glowGeometry = new THREE.SphereGeometry(1.9, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.scale.set(1.5, 0.9, 0.45);
    glow.position.set(0, -1.15, -0.55);
    scene.add(glow);

    const airflowAuraGeometry = new THREE.PlaneGeometry(4.8, 3.6, 1, 1);
    const airflowAuraMaterial = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const airflowAura = new THREE.Mesh(
      airflowAuraGeometry,
      airflowAuraMaterial
    );
    airflowAura.position.set(0, -1.6, 0.1);
    scene.add(airflowAura);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const clock = new THREE.Clock();

    const renderScene = () => {
      const elapsed = clock.getElapsedTime();

      acGroup.rotation.y += (mouseX * 0.16 - acGroup.rotation.y) * 0.045;
      acGroup.rotation.x +=
        (-0.08 - mouseY * 0.065 - acGroup.rotation.x) * 0.045;

      acGroup.position.y = 0.6 + Math.sin(elapsed * 0.75) * 0.045;

      glow.scale.x = 1.45 + Math.sin(elapsed * 1.1) * 0.08;
      glow.scale.y = 0.88 + Math.sin(elapsed * 1.1) * 0.04;
      glowMaterial.opacity = 0.06 + (Math.sin(elapsed * 1.6) + 1) * 0.01;

      airflowAura.scale.x = 1 + Math.sin(elapsed * 1.15) * 0.03;
      airflowAura.scale.y = 1 + Math.sin(elapsed * 1.4) * 0.04;
      airflowAuraMaterial.opacity =
        0.075 + (Math.sin(elapsed * 1.7) + 1) * 0.015;

      airflowMeshes.forEach((mesh, index) => {
        mesh.material.opacity =
          0.12 + (Math.sin(elapsed * 2.2 - index * 0.45) + 1) * 0.03;
        mesh.position.z = Math.sin(elapsed * 1.8 + index * 0.35) * 0.025;
      });

      airflowCoreMeshes.forEach((mesh, index) => {
        mesh.material.opacity =
          0.18 + (Math.sin(elapsed * 2.8 - index * 0.55) + 1) * 0.035;
        mesh.position.z = Math.cos(elapsed * 1.9 + index * 0.28) * 0.03;
      });

      const mistArray = mistGeometry.attributes.position.array as Float32Array;
      mistSeeds.forEach((particle, index) => {
        const travel = (particle.progress + elapsed * particle.speed * 0.22) % 1;
        const spread = 1 + travel * particle.spread;

        mistArray[index * 3] =
          particle.x * spread +
          Math.sin(elapsed * 2 + particle.offset) * particle.wobble;

        mistArray[index * 3 + 1] = -travel * 2.6;

        mistArray[index * 3 + 2] =
          0.02 +
          Math.cos(elapsed * 1.8 + particle.offset) * 0.06 -
          travel * 0.08;
      });
      mistGeometry.attributes.position.needsUpdate = true;

      const coldArray = coldFlowGeometry.attributes.position
        .array as Float32Array;

      coldFlowSeeds.forEach((particle, index) => {
        const travel = (particle.progress + elapsed * particle.speed * 0.34) % 1;
        const widen = 1 + travel * 0.5;

        coldArray[index * 3] =
          particle.x * widen +
          Math.sin(elapsed * 3.1 + particle.offset) * particle.sway * travel;

        coldArray[index * 3 + 1] = -travel * 2.45;

        coldArray[index * 3 + 2] =
          0.08 +
          Math.cos(elapsed * 2.2 + particle.offset) * 0.09 -
          travel * 0.1;
      });
      coldFlowGeometry.attributes.position.needsUpdate = true;

      displayMaterial.opacity = 0.82 + (Math.sin(elapsed * 2.8) + 1) * 0.07;

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

      bodyGeometry.dispose();
      leftCapGeometry.dispose();
      frontPanelGeometry.dispose();
      topHighlightGeometry.dispose();
      displayGeometry.dispose();
      logoGeometry.dispose();
      ventHousingGeometry.dispose();
      ventInteriorGeometry.dispose();
      louverGeometry.dispose();
      verticalGuideGeometry.dispose();
      mistGeometry.dispose();
      coldFlowGeometry.dispose();
      glowGeometry.dispose();
      airflowAuraGeometry.dispose();

      airflowGeometries.forEach((geometry) => geometry.dispose());

      whiteMaterial.dispose();
      sideMaterial.dispose();
      panelMaterial.dispose();
      darkVentMaterial.dispose();
      louverMaterial.dispose();
      displayMaterial.dispose();
      logoMaterial.dispose();
      topHighlightMaterial.dispose();
      ventInteriorMaterial.dispose();
      airflowTubeMaterial.dispose();
      airflowCoreMaterial.dispose();
      mistMaterial.dispose();
      coldFlowMaterial.dispose();
      glowMaterial.dispose();
      airflowAuraMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section ref={rootRef} className="bg-slate-50 py-20 sm:py-24 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SERVICE_SCHEMA),
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="svc-mask overflow-hidden">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Our Services
              </p>
            </div>

            <span className="svc-divider mt-4 block h-[3px] w-16 rounded-full bg-blue-600" />

            <h2 className="mt-5 font-heading text-[clamp(1.875rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-slate-900">
              <span className="svc-mask block overflow-hidden">
                <span className="inline-block">
                  Complete AC solutions for every building.
                </span>
              </span>
            </h2>

            <p className="svc-fade mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              From new installations and urgent repairs to wholesale supply and
              building-wide AC pipework, we provide dependable service,
              high-quality materials, and competitive prices.
            </p>
          </div>

          <div className="svc-3d relative hidden h-72 w-72 shrink-0 items-center justify-center lg:flex xl:h-80 xl:w-80">
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl" />

            <div
              ref={threeContainerRef}
              className="relative h-full w-full"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.slug}
              className="svc-card group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <div className="svc-card-media relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="svc-cta mt-12 flex flex-col items-center justify-center gap-5 rounded-xl border border-slate-200 bg-white px-6 py-5 sm:mt-14 sm:flex-row sm:justify-between sm:px-8 sm:py-6">
          <div>
            <p className="text-sm font-semibold text-slate-800 sm:text-base">
              Need help choosing the right AC service?
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Our team can recommend the best solution for your building and
              budget.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-5 py-3 font-heading text-sm font-bold text-white transition hover:bg-blue-800"
            >
              Discover more
              <ArrowRight size={16} />
            </Link>

            <a
              href="tel:02034885727"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 font-heading text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              <PhoneCall size={16} />
              Call 02034885727
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
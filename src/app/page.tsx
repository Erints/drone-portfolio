"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   UTILITY: Animated section wrapper
   ───────────────────────────────────────────── */
function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Blueprint Grid Background
   ───────────────────────────────────────────── */
function BlueprintGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Major grid lines */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2563eb 1px, transparent 1px),
            linear-gradient(to bottom, #2563eb 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Minor grid lines */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2563eb 0.5px, transparent 0.5px),
            linear-gradient(to bottom, #2563eb 0.5px, transparent 0.5px)
          `,
          backgroundSize: "16px 16px",
        }}
      />
      {/* Margin line (left) — classic notebook feel */}
      <div className="absolute top-0 bottom-0 left-[60px] w-[1.5px] bg-[#2563eb]/[0.07] hidden lg:block" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: System Status Indicator
   ───────────────────────────────────────────── */
function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2 mr-2">
      {active && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-40 animate-ping" />
      )}
      <span
        className={`relative inline-flex rounded-full h-2 w-2 ${
          active ? "bg-[#2563eb]" : "bg-[#2d3748]/30"
        }`}
      />
    </span>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Tech Stack Badge
   ───────────────────────────────────────────── */
function StackBadge({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -3,
        boxShadow: "0 6px 20px rgba(37,99,235,0.12)",
        borderColor: "#2563eb",
      }}
      className="group relative bg-white/70 backdrop-blur-sm border border-[#2563eb]/20 
                 px-4 py-2.5 text-xs font-mono font-semibold text-[#2d3748] 
                 cursor-default transition-all duration-300 select-none
                 hover:bg-[#2563eb]/[0.04]"
      style={{
        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
      }}
    >
      {/* Corner tick marks */}
      <span className="absolute top-0 left-0 w-2 h-[1px] bg-[#2563eb]/40" />
      <span className="absolute top-0 left-0 w-[1px] h-2 bg-[#2563eb]/40" />
      <span className="absolute bottom-0 right-0 w-2 h-[1px] bg-[#2563eb]/40" />
      <span className="absolute bottom-0 right-0 w-[1px] h-2 bg-[#2563eb]/40" />

      <span className="text-[#2563eb]/50 mr-1.5 group-hover:text-[#2563eb] transition-colors">
        ▸
      </span>
      {name}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Project Log Card
   ───────────────────────────────────────────── */
function ProjectCard({
  title,
  codename,
  tag,
  description,
  specs,
  index,
}: {
  title: string;
  codename: string;
  tag: string;
  description: string;
  specs: string[];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.65,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Outer frame — hand-drawn feel with double border */}
      <div className="relative bg-white/60 backdrop-blur-sm border border-[#2563eb]/20 p-0.5">
        {/* Inner frame */}
        <div className="border border-[#2563eb]/10 p-6 md:p-8 relative overflow-hidden">
          {/* Corner brackets — engineering drawing markers */}
          <svg className="absolute top-2 left-2 w-4 h-4 text-[#2563eb]/30" viewBox="0 0 16 16">
            <path d="M0 12V0h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg className="absolute top-2 right-2 w-4 h-4 text-[#2563eb]/30" viewBox="0 0 16 16">
            <path d="M16 12V0H4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg className="absolute bottom-2 left-2 w-4 h-4 text-[#2563eb]/30" viewBox="0 0 16 16">
            <path d="M0 4v12h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <svg className="absolute bottom-2 right-2 w-4 h-4 text-[#2563eb]/30" viewBox="0 0 16 16">
            <path d="M16 4v12H4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Inner grid pattern — faint */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #2563eb 0.5px, transparent 0.5px),
                linear-gradient(to bottom, #2563eb 0.5px, transparent 0.5px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Header row */}
          <div className="flex items-start justify-between mb-5 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-[#2563eb]/50 tracking-widest uppercase">
                  LOG_{String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-[1px] w-8 bg-[#2563eb]/20" />
                <span className="text-[10px] font-mono text-[#2d3748]/40 tracking-wider">
                  {tag}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#2d3748] tracking-tight leading-tight">
                {title}
              </h3>
              <span className="text-[11px] font-mono text-[#2563eb] tracking-wider mt-1 block">
                CODENAME: {codename}
              </span>
            </div>

            {/* Status indicator */}
            <motion.div
              animate={{ scale: isHovered ? 1.15 : 1 }}
              className="flex items-center gap-1.5 bg-[#2563eb]/[0.06] border border-[#2563eb]/15 px-3 py-1.5 mt-1"
            >
              <StatusDot active />
              <span className="text-[10px] font-mono text-[#2563eb] font-semibold tracking-wider">
                ACTIVE
              </span>
            </motion.div>
          </div>

          {/* Divider — technical drawing style */}
          <div className="flex items-center gap-2 mb-5">
            <div className="h-[1px] flex-1 bg-[#2563eb]/15" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#2563eb]/25" />
            <div className="h-[1px] flex-1 bg-[#2563eb]/15" />
          </div>

          {/* Description */}
          <p className="text-sm text-[#4a5568] leading-relaxed mb-6 max-w-lg relative z-10 font-[family-name:var(--font-geist-sans)]">
            {description}
          </p>

          {/* Specs row */}
          <div className="flex flex-wrap gap-2 relative z-10">
            {specs.map((spec) => (
              <span
                key={spec}
                className="text-[10px] font-mono text-[#2563eb]/70 bg-[#2563eb]/[0.04] border border-[#2563eb]/10
                           px-2.5 py-1 tracking-wider uppercase hover:bg-[#2563eb]/[0.08] transition-colors"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Hover reveal — blueprint scan line */}
          <motion.div
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#2563eb]/20 to-transparent pointer-events-none"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Minimalist Link Button
   ───────────────────────────────────────────── */
function LinkButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2, x: 2 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex items-center gap-3 bg-white/50 backdrop-blur-sm
                 border border-[#2563eb]/20 px-5 py-3.5
                 text-[#2d3748] font-mono text-xs font-semibold tracking-widest uppercase
                 transition-all duration-300
                 hover:border-[#2563eb]/50 hover:bg-[#2563eb]/[0.03] hover:shadow-[4px_4px_0px_rgba(37,99,235,0.08)]"
    >
      <span className="text-[#2563eb]/60 group-hover:text-[#2563eb] transition-colors">
        {icon}
      </span>
      {label}
      <span className="ml-auto text-[#2563eb]/30 group-hover:text-[#2563eb]/60 transition-colors text-[10px]">
        ↗
      </span>
    </motion.a>
  );
}

/* ═════════════════════════════════════════════
   PAGE: MAIN ENTRY
   ═════════════════════════════════════════════ */
export default function Home() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  /* ─── TECH STACK DATA ─── */
  const techStack = [
    "ROS 2 (Humble)",
    "YOLOv11",
    "OpenCV",
    "Embedded C++",
    "Python",
    "ESP32",
    "LiDAR Arrays",
  ];

  /* ─── PROJECT DATA ─── */
  const projects = [
    {
      title: "Project AIDAR",
      codename: "AIDAR-FLEET",
      tag: "UAV · VISION · AUTONOMOUS",
      description:
        "Multi-UAV autonomous disaster response fleet deploying real-time computer vision matrices for geospatial assessment. Integrates YOLOv11 inference on edge devices with ROS 2 coordination for synchronized aerial survey and victim detection across active disaster zones.",
      specs: ["ROS 2", "YOLOv11", "LiDAR", "PX4", "Edge Inference"],
    },
    {
      title: "Krishikaran Platform",
      codename: "KRISHI-AG",
      tag: "HARDWARE · AGRICULTURE · DRONE",
      description:
        "Precision agriculture drone platform engineered from custom hardware — automated sweep path optimization, multispectral imaging payload, and ESP32-driven flight controller integration. Designed for scalable field deployment across varied terrain conditions.",
      specs: ["ESP32", "Custom PCB", "OpenCV", "Embedded C++", "Multispectral"],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fbf9f3] text-[#2d3748] relative overflow-x-hidden">
      <BlueprintGrid />

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 01: SYSTEM HEADER
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-28"
        >
          {/* Top bar — system identifier */}
          <div className="flex items-center justify-between mb-12 pb-4 border-b border-[#2563eb]/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#2563eb]" />
              <span className="text-[10px] font-mono text-[#2563eb]/60 tracking-[0.25em] uppercase">
                Engineering Lab Notebook
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#2d3748]/30 tracking-wider">
              {timestamp || "—"}
            </span>
          </div>

          {/* Name & Title block — asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="h-[1px] w-6 bg-[#2563eb]/40" />
                <span className="text-[10px] font-mono text-[#2563eb] tracking-[0.3em] uppercase font-semibold">
                  SYS.INIT — ACTIVE
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-[#2d3748] tracking-tighter leading-[0.9] mb-5"
              >
                ARIN T S
                <span
                  className="inline-block w-[3px] h-[0.7em] bg-[#2563eb] ml-2 align-baseline"
                  style={{ animation: "cursor-blink 1s step-end infinite" }}
                />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-sm md:text-base text-[#4a5568] max-w-md leading-relaxed font-[family-name:var(--font-geist-sans)]"
              >
                Building autonomous systems at the intersection of{" "}
                <span className="text-[#2563eb] font-semibold">Robotics</span>,{" "}
                <span className="text-[#2563eb] font-semibold">Automation</span>, and{" "}
                <span className="text-[#2563eb] font-semibold">Computer Vision</span>.
              </motion.p>
            </div>

            {/* Right-side notation block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="hidden md:flex flex-col items-end gap-1 text-[10px] font-mono text-[#2d3748]/25 leading-relaxed"
            >
              <span>REV. 03</span>
              <span>FOLIO 001</span>
              <span className="w-12 h-[1px] bg-[#2563eb]/10 my-1" />
              <span>DEPT. ROBOTICS</span>
              <a href="/level-devil" className="hover:text-[#2563eb] transition-colors cursor-pointer" title="Initiate Stress Test">CLASS. OPEN</a>
            </motion.div>
          </div>
        </motion.header>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 02: CORE STACK MATRIX
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Section className="mb-20 md:mb-28" delay={0.1}>
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-mono text-[#2563eb] tracking-[0.3em] uppercase font-semibold">
              02
            </span>
            <div className="h-[1px] w-10 bg-[#2563eb]/30" />
            <span className="text-[10px] font-mono text-[#2d3748]/40 tracking-[0.2em] uppercase">
              Core Stack Matrix
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[#2d3748] tracking-tight mb-2">
            Active Firmware & Frameworks
          </h2>
          <p className="text-xs font-mono text-[#2d3748]/35 mb-8 tracking-wider">
            // Currently deployed architectures and development environments
          </p>

          {/* Badge grid */}
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <StackBadge key={tech} name={tech} index={i} />
            ))}
          </div>
        </Section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 03: PROJECT LOG
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Section className="mb-20 md:mb-28" delay={0.15}>
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-mono text-[#2563eb] tracking-[0.3em] uppercase font-semibold">
              03
            </span>
            <div className="h-[1px] w-10 bg-[#2563eb]/30" />
            <span className="text-[10px] font-mono text-[#2d3748]/40 tracking-[0.2em] uppercase">
              Project Log
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[#2d3748] tracking-tight mb-3">
            Field Deployments
          </h2>
          <p className="text-xs font-mono text-[#2d3748]/35 mb-10 tracking-wider">
            // Primary systems under active development
          </p>

          {/* Project cards — asymmetric grid for visual interest */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.codename} {...project} index={i} />
            ))}
          </div>
        </Section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 03.5: STRESS TEST PROTOCOL (LEVEL DEVIL)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Section className="mb-20 md:mb-28" delay={0.18}>
          <div className="relative bg-[#2563eb] text-white p-8 md:p-12 overflow-hidden shadow-[8px_8px_0px_rgba(37,99,235,0.2)]">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-white animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
                    Simulated Stress Environment
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase">
                  Level Devil Protocol
                </h2>
                <p className="text-sm md:text-base text-white/80 max-w-xl leading-relaxed font-[family-name:var(--font-geist-sans)]">
                  An interactive physics simulation testing resilience against sudden environmental changes. Warning: Unpredictable platform behavior detected.
                </p>
              </div>
              <div>
                <a
                  href="/level-devil"
                  className="inline-block bg-white text-[#2563eb] px-8 py-4 font-bold uppercase tracking-wider text-sm
                             hover:bg-[#fbf9f3] hover:scale-105 transition-all shadow-[4px_4px_0px_rgba(255,255,255,0.2)]"
                >
                  Initiate Test ↗
                </a>
              </div>
            </div>
            
            {/* Background graphics */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
               <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <path d="M0 100 L 50 50 L 100 100 Z" fill="white" />
                  <rect x="20" y="20" width="20" height="20" fill="white" />
               </svg>
            </div>
          </div>
        </Section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 04: OPERATIONS & COMMS
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <Section delay={0.2}>
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-mono text-[#2563eb] tracking-[0.3em] uppercase font-semibold">
              04
            </span>
            <div className="h-[1px] w-10 bg-[#2563eb]/30" />
            <span className="text-[10px] font-mono text-[#2d3748]/40 tracking-[0.2em] uppercase">
              Operations & Comms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16">
            {/* Operations block */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#2d3748] tracking-tight mb-4">
                Command Operations
              </h2>

              <div className="relative bg-white/50 backdrop-blur-sm border border-[#2563eb]/15 p-6 mb-6">
                {/* Subtle inner border */}
                <div className="absolute inset-[3px] border border-[#2563eb]/[0.06] pointer-events-none" />

                <div className="flex items-center gap-2 mb-3">
                  <StatusDot active />
                  <span className="text-[10px] font-mono text-[#2563eb] tracking-widest uppercase font-semibold">
                    Current Role
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#2d3748] mb-2">
                  IEEE Student Branch Chairperson
                </h3>
                <p className="text-sm text-[#4a5568] leading-relaxed font-[family-name:var(--font-geist-sans)]">
                  Leading technical deep-dive workshops, organizing local hackathons,
                  and coordinating inter-branch robotics collaborations.
                </p>
              </div>
            </div>

            {/* Comms datalink */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-mono text-[#2d3748]/35 tracking-[0.2em] uppercase">
                  // Comms Datalink
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <LinkButton
                  href="https://www.linkedin.com/in/arints51457"
                  label="LinkedIn"
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                />
                <LinkButton
                  href="/dossier"
                  label="Dossier (Resume)"
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 14h8v-2H8v2zm0 4h8v-2H8v2zm0-8h5V8H8v2z" />
                    </svg>
                  }
                />
                <LinkButton
                  href="https://github.com"
                  label="GitHub"
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  }
                />
                <LinkButton
                  href="https://www.instagram.com/arin__u.h"
                  label="Instagram"
                  icon={
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            FOOTER — Endmark
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 md:mt-28 pt-8 border-t border-[#2563eb]/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#2563eb]/30" />
              <span className="text-[10px] font-mono text-[#2d3748]/20 tracking-[0.2em] uppercase">
                End of Notebook
              </span>
              <div className="w-1.5 h-1.5 bg-[#2563eb]/30" />
            </div>
            <span className="text-[10px] font-mono text-[#2d3748]/15 tracking-wider">
              © {new Date().getFullYear()} ARIN T S
            </span>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
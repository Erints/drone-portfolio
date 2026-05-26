"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

function SectionHeading({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[10px] font-mono text-[#2563eb] tracking-[0.3em] uppercase font-semibold">
        {num}
      </span>
      <div className="h-[1px] flex-1 bg-[#2563eb]/20" />
      <span className="text-[10px] font-mono text-[#2d3748]/40 tracking-[0.2em] uppercase">
        {title}
      </span>
    </div>
  );
}

export default function DossierPage() {
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

  return (
    <div className="min-h-screen w-full bg-[#fbf9f3] text-[#2d3748] relative overflow-x-hidden p-6 md:p-12 lg:p-16">
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #2563eb 1px, transparent 1px), linear-gradient(to bottom, #2563eb 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `linear-gradient(to right, #2563eb 0.5px, transparent 0.5px), linear-gradient(to bottom, #2563eb 0.5px, transparent 0.5px)`,
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute top-0 bottom-0 left-[60px] w-[1.5px] bg-[#2563eb]/[0.07] hidden lg:block" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto bg-white/70 backdrop-blur-sm border border-[#2563eb]/20 shadow-[8px_8px_0px_rgba(37,99,235,0.1)] p-8 md:p-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 border-b border-[#2563eb]/20 pb-6">
          <div>
            <a href="/" className="text-[10px] font-mono text-[#2563eb] hover:underline mb-4 inline-block">
              ← RETURN TO LAB
            </a>
            <h1 className="text-4xl md:text-5xl font-black text-[#2d3748] tracking-tight uppercase mb-2">
              Arin T S
            </h1>
            <h2 className="text-sm font-mono text-[#2563eb] tracking-widest uppercase">
              Personnel Dossier
            </h2>
          </div>
          <div className="text-right text-[10px] font-mono text-[#2d3748]/50">
            <p>Generated: {timestamp}</p>
            <p>Class: CONFIDENTIAL</p>
            <p>ID: RBA2327</p>
          </div>
        </div>

        {/* Profile Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="space-y-3">
             <SectionHeading num="01" title="Identity & Contact" />
             <div className="text-sm font-[family-name:var(--font-geist-sans)] text-[#4a5568]">
               <p><strong>Email:</strong> arints.rba2327@saintgits.org</p>
               <p><strong>Phone:</strong> +91 9207179584</p>
               <p><strong>DOB:</strong> 11/12/2005</p>
               <p><strong>Location:</strong> Alappuzha, Kerala, India</p>
             </div>
          </div>
          <div className="space-y-3">
             <SectionHeading num="02" title="Academic Profile" />
             <div className="text-sm font-[family-name:var(--font-geist-sans)] text-[#4a5568]">
               <p><strong>Institution:</strong> Saintgits College of Engineering</p>
               <p><strong>Programme:</strong> B.Tech Robotics & Automation (Batch RBA)</p>
               <p><strong>Semester:</strong> 6</p>
               <p><strong>CGPA:</strong> 7.88</p>
             </div>
          </div>
        </div>

        {/* Career Objective */}
        <div className="mb-12">
           <SectionHeading num="03" title="Career Objective" />
           <p className="text-sm leading-relaxed font-[family-name:var(--font-geist-sans)] text-[#4a5568] border-l-2 border-[#2563eb]/40 pl-4 py-1 italic">
             "A Robotics and Automation Engineering student with hands-on experience in UAV systems, embedded AI, autonomous navigation, and ROS2-based control. Lead developer of AIDAR — a multi-modal UAV disaster-response platform integrating YOLOv8 real-time human detection, GPS waypoint navigation, and live AV streaming. Seeking to advance research in autonomous systems, applying sim-to-real transfer techniques and deep reinforcement learning for robust UAV control in unstructured environments."
           </p>
        </div>

        {/* Skills */}
        <div className="mb-12">
          <SectionHeading num="04" title="Skill Matrices" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <h3 className="text-xs font-bold uppercase text-[#2563eb] mb-3">Core Competencies</h3>
                <ul className="text-sm font-[family-name:var(--font-geist-sans)] text-[#4a5568] space-y-2 list-disc list-inside">
                   <li><strong>UAV Systems:</strong> Multi-modal dev, GPS navigation, obstacle avoidance, laser marking.</li>
                   <li><strong>Embedded AI:</strong> YOLOv8 inference (RPi 5), sensor fusion.</li>
                   <li><strong>Autonomous Robotics:</strong> ROS/ROS2, PID, path planning.</li>
                   <li><strong>Hardware Prototyping:</strong> 3D printing, circuit/PCB design, drone assembly.</li>
                   <li><strong>IoT:</strong> ESP32, Firebase, MQTT, Time-series modeling.</li>
                </ul>
             </div>
             <div>
                <h3 className="text-xs font-bold uppercase text-[#2563eb] mb-3">Software & Languages</h3>
                <ul className="text-sm font-[family-name:var(--font-geist-sans)] text-[#4a5568] space-y-2 list-disc list-inside">
                   <li><strong>Languages:</strong> Python, C/C++, Embedded C, MATLAB.</li>
                   <li><strong>Frameworks/Tools:</strong> ROS2, OpenCV, YOLOv8, NVIDIA Isaac Sim / Isaac Lab.</li>
                   <li><strong>Hardware IDEs:</strong> Arduino IDE, VS Code, KiCad, Fusion 360.</li>
                   <li><strong>Protocols:</strong> UART, SPI, I2C, MQTT, HTTP/REST.</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-12">
           <SectionHeading num="05" title="Field Deployments & Experience" />
           <div className="space-y-6">
              <div className="relative pl-6 border-l border-[#2563eb]/20">
                 <StatusDot active />
                 <h4 className="font-bold text-[#2d3748] text-sm">Project Intern — trizlabz Pvt Ltd <span className="text-[#2563eb]/60 font-mono text-xs font-normal ml-2">(May 2026 – Aug 2026)</span></h4>
                 <p className="text-sm text-[#4a5568] mt-2 font-[family-name:var(--font-geist-sans)]">
                   Developing RL-based manipulation skills for robotic arms using NVIDIA Isaac Sim and Isaac Lab. Training policies in simulation for sim-to-real transfer on physical hardware. Covers kinematics, motion planning with ROS 2 and MoveIt 2.
                 </p>
              </div>
              <div className="relative pl-6 border-l border-[#2563eb]/20">
                 <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#2563eb]/30" />
                 <h4 className="font-bold text-[#2d3748] text-sm">Embedded Systems & AI Intern — Evolve Robotics LLP <span className="text-[#2563eb]/60 font-mono text-xs font-normal ml-2">(Jun 2025 – Jul 2025)</span></h4>
                 <p className="text-sm text-[#4a5568] mt-2 font-[family-name:var(--font-geist-sans)]">
                   Integrated AI algorithms with embedded systems. Handled sensor interfacing, microcontroller programming, and autonomous robot control using ROS2.
                 </p>
              </div>
              <div className="relative pl-6 border-l border-[#2563eb]/20">
                 <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#2563eb]/30" />
                 <h4 className="font-bold text-[#2d3748] text-sm">Embedded C Programming Intern — Emertxe Information Technologies <span className="text-[#2563eb]/60 font-mono text-xs font-normal ml-2">(Dec 2025 – Jan 2026)</span></h4>
                 <p className="text-sm text-[#4a5568] mt-2 font-[family-name:var(--font-geist-sans)]">
                   Intensive training in embedded C, memory management, peripheral interfacing (UART/I2C/SPI), and RTOS task scheduling.
                 </p>
              </div>
              <div className="relative pl-6 border-l border-[#2563eb]/20">
                 <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#2563eb]/30" />
                 <h4 className="font-bold text-[#2d3748] text-sm">AI and Robotics Intern — STEM Robotics Internationals <span className="text-[#2563eb]/60 font-mono text-xs font-normal ml-2">(Jun 2024)</span></h4>
                 <p className="text-sm text-[#4a5568] mt-2 font-[family-name:var(--font-geist-sans)]">
                   Built autonomous systems with sensor-actuator integration and control algorithms.
                 </p>
              </div>
           </div>
        </div>

        {/* Projects & Achievements */}
        <div className="mb-12">
           <SectionHeading num="06" title="Projects & Operations" />
           <div className="space-y-4">
              <div className="bg-[#2563eb]/[0.02] border border-[#2563eb]/10 p-4">
                 <h4 className="font-bold text-[#2563eb] text-sm mb-1">Project AIDAR (Lead Developer)</h4>
                 <p className="text-sm text-[#4a5568] font-[family-name:var(--font-geist-sans)]">
                   UAV platform for disaster-zone survivor detection. Integrates YOLOv8 real-time human detection, ROS2 navigation, GPS waypoints, obstacle avoidance, and live AV streaming. <em>IEEE paper submitted to ComNet 2026.</em>
                 </p>
              </div>
              <div className="bg-[#2563eb]/[0.02] border border-[#2563eb]/10 p-4">
                 <h4 className="font-bold text-[#2563eb] text-sm mb-1">Hackathon Victories</h4>
                 <ul className="text-sm font-[family-name:var(--font-geist-sans)] text-[#4a5568] list-disc list-inside mt-2">
                    <li><strong>1st Prize:</strong> Catachem 24-Hour Hackathon (Smart CO Guard & Auto Vent)</li>
                    <li><strong>2nd Prize:</strong> MAKEit Hackathon (ResQTech Emergency Detection System)</li>
                    <li><strong>3rd Prize:</strong> Robosoccer Competition (TKM College of Engineering)</li>
                 </ul>
              </div>
              <div className="bg-[#2563eb]/[0.02] border border-[#2563eb]/10 p-4">
                 <h4 className="font-bold text-[#2563eb] text-sm mb-1">Leadership & Comms</h4>
                 <p className="text-sm text-[#4a5568] font-[family-name:var(--font-geist-sans)]">
                   <strong>IEEE Student Branch Chair</strong> (Saintgits College). Leading technical events across Kerala. Also serving as IEEE LINK Event Coordinator, TEDx Finance Member, and IEEEXtreme Campus Ambassador.
                 </p>
              </div>
           </div>
        </div>

        <div className="text-center pt-8 border-t border-[#2563eb]/20 text-xs font-mono text-[#2563eb]/60">
           *** END OF RECORD ***
        </div>

      </div>
    </div>
  );
}

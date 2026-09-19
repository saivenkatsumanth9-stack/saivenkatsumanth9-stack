import React from "react";
import { useCursorFollowingMouse } from "@/hooks/useCursorFollowingMouse";

interface WorkstationIllustrationProps {
  /** Reference to the hero container so the mouse can respond across the entire hero */
  heroContainerRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * Interactive developer workstation illustration featuring:
 * - Triple-monitor setup (Python/AI Code, Data/Analytics Dashboard, Body IQ Project)
 * - Mechanical keyboard with RGB underglow
 * - Physical desk mouse with independent physics layer smoothly tracking user's cursor
 * - Ground shadow with natural desk-anchored lag
 */
export const WorkstationIllustration: React.FC<WorkstationIllustrationProps> = ({
  heroContainerRef,
  className = "",
}) => {
  // Bind cursor-following physics to the physical mouse and shadow elements
  const { mouseRef, shadowRef } = useCursorFollowingMouse<
    HTMLElement,
    HTMLDivElement,
    HTMLDivElement
  >(heroContainerRef, {
    lerpFactor: 0.08,
    maxX: 48,
    maxY: 24,
    maxRotation: 6.5,
    rotationFactor: 0.3,
  });

  return (
    <div
      className={`relative w-full aspect-[16/10.5] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#0a0d17] border border-[var(--color-border)] select-none ${className}`}
    >
      {/* ── AMBIENT ENVIRONMENT & WALL LIGHTING ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* City skyline silhouettes */}
        <div className="absolute top-0 left-0 right-0 h-16 opacity-20 bg-[linear-gradient(to_bottom,#070a14_0%,transparent_100%)]">
          <div className="flex items-end justify-between px-6 h-full gap-2 opacity-30">
            <div className="w-4 h-8 bg-blue-900/60 rounded-t-sm"></div>
            <div className="w-6 h-12 bg-purple-900/60 rounded-t-sm"></div>
            <div className="w-3 h-6 bg-blue-900/60 rounded-t-sm"></div>
            <div className="w-5 h-10 bg-cyan-900/60 rounded-t-sm"></div>
            <div className="w-7 h-14 bg-blue-900/60 rounded-t-sm"></div>
            <div className="w-4 h-9 bg-purple-900/60 rounded-t-sm"></div>
          </div>
        </div>

        {/* Ambient radial glows behind monitors */}
        <div className="absolute top-8 left-1/4 w-48 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-64 h-36 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-8 right-1/4 w-48 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

        {/* Desk lamp golden glow on the left */}
        <div className="absolute top-10 left-2 w-28 h-40 bg-amber-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* ── WALL DECORATIONS & MOTIVATIONAL PLAQUES ── */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between text-[8px] font-mono pointer-events-none opacity-80 z-0">
        {/* Left: Discipline Note */}
        <div className="bg-[#0f1424]/80 border border-blue-500/20 px-2 py-1 rounded shadow-sm text-slate-300">
          <span className="text-amber-400 font-bold">DISCIPLINE</span> TODAY → FREEDOM
        </div>

        {/* Center: Sumanth Identity Plaque */}
        <div className="bg-[#0f1424]/90 border border-cyan-500/30 px-3 py-1 rounded shadow-md text-center">
          <div className="text-[10px] font-bold text-white tracking-widest">SUMANTH</div>
          <div className="text-[7px] text-cyan-400 font-semibold">B.Tech CSE • 2027</div>
        </div>

        {/* Right: Goals Badge */}
        <div className="bg-[#0f1424]/80 border border-purple-500/20 px-2 py-1 rounded shadow-sm text-slate-300 text-right">
          <span className="text-green-400">✓</span> AI &bull; Cloud &bull; Dev
        </div>
      </div>

      {/* ── STATIC TRIPLE MONITORS SETUP ── */}
      <div className="absolute top-[38px] left-3 right-3 bottom-[96px] grid grid-cols-12 gap-2 z-10 pointer-events-none">
        {/* MONITOR 1: AI / PYTHON CODE (Left, 4 cols) */}
        <div className="col-span-4 flex flex-col rounded-md bg-[#0d111c] border border-blue-500/30 shadow-lg overflow-hidden">
          {/* Bezel Titlebar */}
          <div className="flex items-center justify-between px-2 py-1 bg-[#141a2c] border-b border-blue-500/20 text-[7px] text-slate-400 font-mono">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/80"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/80"></span>
              <span className="ml-1 text-slate-300">model.py</span>
            </div>
            <span className="text-blue-400 text-[6px]">AI/ML</span>
          </div>

          {/* Code Window */}
          <div className="p-2 font-mono text-[7px] leading-[1.35] text-slate-300 overflow-hidden flex-1 flex flex-col justify-between">
            <div className="space-y-0.5">
              <div className="text-purple-400 font-semibold">import <span className="text-slate-200">torch</span></div>
              <div className="text-purple-400 font-semibold">import <span className="text-slate-200">numpy as np</span></div>
              <div className="pt-0.5 text-blue-400 font-medium">class <span className="text-amber-300">HealthAgent</span>:</div>
              <div className="pl-2 text-slate-400">def __init__(self, data):</div>
              <div className="pl-4 text-emerald-400">self.model = load_model()</div>
              <div className="pl-2 text-slate-400">def predict(self, x):</div>
              <div className="pl-4 text-cyan-300">return self.model(x)</div>
            </div>
            <div className="pt-1 border-t border-slate-800 text-[6.5px] text-green-400 flex items-center gap-1">
              <span>➜</span>
              <span>training epoch: 48/50</span>
              <span className="w-1.5 h-2.5 bg-green-400 inline-block animate-pulse"></span>
            </div>
          </div>
          {/* Monitor Stand */}
          <div className="w-8 h-2 bg-slate-800 mx-auto -mb-2 rounded-b"></div>
        </div>

        {/* MONITOR 2: DATA SCIENCE & DASHBOARD (Center, 4.5 cols) */}
        <div className="col-span-4 flex flex-col rounded-md bg-[#0c101d] border border-cyan-500/35 shadow-xl overflow-hidden">
          {/* Bezel Titlebar */}
          <div className="flex items-center justify-between px-2 py-1 bg-[#13192a] border-b border-cyan-500/20 text-[7px] text-slate-400 font-mono">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-200 font-bold">Data Hub</span>
            </div>
            <span className="text-cyan-400 text-[6.5px]">09:45 AM</span>
          </div>

          {/* Dashboard Canvas */}
          <div className="p-2 font-mono flex-1 flex flex-col justify-between">
            <div>
              <div className="text-[7.5px] font-bold text-white flex items-center justify-between">
                <span>Good Morning, Sumanth</span>
                <span className="text-[6px] text-cyan-400 font-normal">Active</span>
              </div>
              <div className="text-[6px] text-slate-400 italic">"Small Steps, Big Changes"</div>
            </div>

            {/* Mini Bar Chart */}
            <div className="my-1">
              <div className="text-[6px] text-slate-400 mb-0.5">Data Pipeline Throughput</div>
              <div className="flex items-end gap-1.5 h-6 bg-slate-900/60 p-1 rounded border border-slate-800">
                <div className="w-2.5 h-[60%] bg-blue-500 rounded-t-xs"></div>
                <div className="w-2.5 h-[85%] bg-cyan-400 rounded-t-xs"></div>
                <div className="w-2.5 h-[45%] bg-emerald-400 rounded-t-xs"></div>
                <div className="w-2.5 h-[95%] bg-purple-500 rounded-t-xs"></div>
                <div className="w-2.5 h-[70%] bg-amber-400 rounded-t-xs"></div>
              </div>
            </div>

            {/* Mini GitHub Squares */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-[6px] text-slate-400">Activity:</span>
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-xs bg-emerald-900"></div>
                <div className="w-1.5 h-1.5 rounded-xs bg-emerald-700"></div>
                <div className="w-1.5 h-1.5 rounded-xs bg-emerald-500"></div>
                <div className="w-1.5 h-1.5 rounded-xs bg-emerald-400"></div>
                <div className="w-1.5 h-1.5 rounded-xs bg-emerald-300"></div>
              </div>
            </div>
          </div>
          {/* Monitor Stand */}
          <div className="w-10 h-2 bg-slate-800 mx-auto -mb-2 rounded-b"></div>
        </div>

        {/* MONITOR 3: BODY IQ PROJECT (Right, 4 cols) */}
        <div className="col-span-4 flex flex-col rounded-md bg-[#0e101f] border border-purple-500/30 shadow-lg overflow-hidden">
          {/* Bezel Titlebar */}
          <div className="flex items-center justify-between px-2 py-1 bg-[#15172b] border-b border-purple-500/20 text-[7px] text-slate-400 font-mono">
            <span className="text-purple-300 font-bold">Body IQ</span>
            <span className="text-pink-400 text-[6.5px]">Health AI</span>
          </div>

          {/* Project Display */}
          <div className="p-2 font-mono flex-1 flex flex-col justify-between text-[7px]">
            <div className="text-[6px] text-slate-400 leading-tight">
              Personalized Fitness &amp; Transformation Engine
            </div>

            {/* Wireframe Silhouette & Metrics Grid */}
            <div className="grid grid-cols-2 gap-1 my-1">
              <div className="bg-purple-950/40 border border-purple-800/40 p-1 rounded text-center flex flex-col justify-center">
                <div className="text-[5.5px] text-slate-400">BMI</div>
                <div className="text-[8px] font-bold text-cyan-300">24.3</div>
              </div>
              <div className="bg-purple-950/40 border border-purple-800/40 p-1 rounded text-center flex flex-col justify-center">
                <div className="text-[5.5px] text-slate-400">BMR</div>
                <div className="text-[8px] font-bold text-emerald-300">1,780</div>
              </div>
              <div className="bg-purple-950/40 border border-purple-800/40 p-1 rounded text-center flex flex-col justify-center">
                <div className="text-[5.5px] text-slate-400">TDEE</div>
                <div className="text-[8px] font-bold text-amber-300">2,450</div>
              </div>
              <div className="bg-purple-950/40 border border-purple-800/40 p-1 rounded text-center flex flex-col justify-center">
                <div className="text-[5.5px] text-slate-400">Body Fat</div>
                <div className="text-[8px] font-bold text-purple-300">18.6%</div>
              </div>
            </div>

            <div className="text-[6px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-0.5">
              <span>Status:</span>
              <span className="text-emerald-400 font-semibold">OPTIMIZED</span>
            </div>
          </div>
          {/* Monitor Stand */}
          <div className="w-8 h-2 bg-slate-800 mx-auto -mb-2 rounded-b"></div>
        </div>
      </div>

      {/* ── STATIC DESK SURFACE ── */}
      <div className="absolute left-0 right-0 bottom-0 h-[96px] bg-[linear-gradient(to_bottom,#181410_0%,#100d0a_100%)] border-t border-slate-700/40 z-20">
        {/* Subtle desk woodgrain / specular highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none"></div>

        {/* STATIC KEYBOARD (Centered on desk) */}
        <div className="absolute left-1/2 -translate-x-[62%] sm:-translate-x-[58%] top-3.5 w-44 sm:w-56 h-18 bg-[#18181c] rounded-md border border-slate-700/50 shadow-md p-1.5 flex flex-col justify-between">
          {/* Key Rows */}
          <div className="grid grid-cols-12 gap-0.5 h-2.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-slate-800/80 rounded-xs"></div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-0.5 h-2.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-slate-800/80 rounded-xs"></div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-0.5 h-2.5">
            <div className="col-span-2 bg-slate-800/80 rounded-xs"></div>
            <div className="col-span-8 bg-slate-700/90 rounded-xs"></div>
            <div className="col-span-2 bg-slate-800/80 rounded-xs"></div>
          </div>
          {/* Animated RGB Underglow */}
          <div className="absolute -bottom-1 left-2 right-2 h-1 bg-[linear-gradient(90deg,#3b82f6,#06b6d4,#a855f7,#3b82f6)] opacity-70 blur-xs rounded-full"></div>
        </div>

        {/* STATIC MOUSEPAD ON THE RIGHT */}
        <div className="absolute right-4 sm:right-10 top-2.5 w-24 sm:w-28 h-20 bg-[#0c0e15] rounded-lg border border-cyan-500/25 shadow-inner">
          <div className="absolute top-1 right-2 text-[6px] font-mono text-cyan-400/50 uppercase tracking-wider">
            PAD://01
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              INTERACTIVE CURSOR-FOLLOWING MOUSE LAYER (PHYSICS-ENABLED)
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {/* GROUND SHADOW LAYER (Attached to desk plane, lagging slightly) */}
            <div
              ref={shadowRef}
              className="absolute w-7 h-11 bg-black/65 rounded-full blur-[3.5px] transform-gpu will-change-transform"
              style={{
                transform: "translate3d(0, 4px, 0) scale(1)",
              }}
            ></div>

            {/* PHYSICAL MOUSE ELEMENT (Interactive layer reacting to cursor) */}
            <div
              ref={mouseRef}
              className="relative w-6 h-10 bg-[linear-gradient(180deg,#27272e_0%,#18181c_50%,#121215_100%)] rounded-[12px_12px_10px_10px] border border-slate-600/60 shadow-lg transform-gpu will-change-transform transition-shadow duration-300"
              style={{
                transform: "translate3d(0, 0, 0) rotate(0deg)",
              }}
            >
              {/* Left & Right Button Seam */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-slate-900/80"></div>

              {/* Glowing Scroll Wheel */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-[#111318] rounded-full border border-cyan-400/60 flex items-center justify-center">
                <div className="w-0.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_6px_#06b6d4]"></div>
              </div>

              {/* Ergonomic Palm Arc & Logo Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500/80 shadow-[0_0_5px_#3b82f6]"></div>
            </div>
          </div>
        </div>

        {/* Small Coffee Cup on left of desk */}
        <div className="absolute left-4 sm:left-8 bottom-3 w-5 h-6 bg-slate-800 rounded-xs border border-slate-600 flex items-center justify-center text-[6px] text-slate-400">
          ☕
        </div>
      </div>
    </div>
  );
};

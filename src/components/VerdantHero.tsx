import React from 'react';
import { 
  Leaf, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  TrendingUp, 
  Database, 
  Cpu, 
  Layers, 
  Sparkles,
  ChevronRight,
  Activity
} from 'lucide-react';

interface VerdantHeroProps {
  onExploreEngine: () => void;
}

export const VerdantHero: React.FC<VerdantHeroProps> = ({ onExploreEngine }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl mb-12 bg-slate-950">
      
      {/* Background Cinematic Texture (Mossy Dark Organic Aesthetic) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-45 pointer-events-none mix-blend-luminosity scale-105 transform duration-1000"
        style={{ backgroundImage: `url('/verdant-bg.jpg')` }}
      />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-lime-500/20 via-emerald-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-lime-400/15 blur-[100px] pointer-events-none" />

      {/* Glass Navigation Bar identical to Verdant mockup */}
      <div className="relative z-10 px-6 sm:px-10 pt-6">
        <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl shadow-black/50">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lime-400 to-emerald-500 flex items-center justify-center p-0.5 shadow-lg shadow-lime-500/30">
              <div className="w-full h-full bg-black/80 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-lime-400" />
              </div>
            </div>
            <span className="font-extrabold text-white tracking-widest text-sm font-sans uppercase">
              VERDANT
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-medium text-white/70">
            <span className="text-white hover:text-white cursor-pointer transition flex items-center gap-1">
              Product <span className="w-1 h-1 rounded-full bg-lime-400 inline-block"></span>
            </span>
            <span className="hover:text-white cursor-pointer transition">Solutions</span>
            <span className="hover:text-white cursor-pointer transition">Pricing</span>
            <span className="hover:text-white cursor-pointer transition">Resources</span>
            <span className="hover:text-white cursor-pointer transition">Company</span>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onExploreEngine}
              className="text-xs text-white/80 hover:text-white font-medium px-3 py-1 cursor-pointer transition"
            >
              Log in
            </button>
            <button
              onClick={onExploreEngine}
              className="bg-gradient-to-r from-lime-300 to-lime-400 hover:from-lime-200 hover:to-lime-300 text-slate-950 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg shadow-lime-500/25 transition cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Hero Header */}
      <div className="relative z-10 px-6 sm:px-10 pt-16 pb-12 text-center max-w-4xl mx-auto">
        
        {/* Version Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-[11px] font-medium text-white/80 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-lime-400"></span>
          <span className="text-lime-300 font-semibold">New</span>
          <span>Aemeth 10.0-PROD Vision Engine is now available</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/50" />
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans tracking-tight text-white font-light leading-[1.08] mb-6">
          Intelligence that <br />
          <span className="font-serif italic font-normal text-lime-300">grows</span> with you.
        </h1>

        <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
          The all-in-one financial vision platform for traders who want clarity, speed, and sustainable growth without repaint bias.
        </p>

        {/* Call to action */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onExploreEngine}
            className="bg-gradient-to-r from-lime-200 via-lime-300 to-lime-400 hover:brightness-110 text-slate-950 font-bold text-sm px-8 py-3.5 rounded-full flex items-center gap-2 shadow-xl shadow-lime-400/25 transition transform hover:scale-[1.02] cursor-pointer"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Micro badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/60">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-lime-400" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-lime-400" /> 14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-lime-400" /> Cancel anytime
            </span>
          </div>
        </div>

      </div>

      {/* 3 Iconic Glass Bento Feature Cards (Persis seperti screenshot Verdant) */}
      <div className="relative z-10 px-6 sm:px-10 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Unify your data */}
          <div className="group rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between hover:border-lime-500/40 transition-all shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-xl bg-lime-950/40 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Unify your data</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Connect all your sources and turn scattered chart data into a single source of truth.
              </p>
            </div>

            {/* Visual Node Diagram like screenshot */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between px-2">
              <div className="space-y-2">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/70">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/70">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/70">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Connecting curve */}
              <div className="h-14 w-16 border-r-2 border-dashed border-lime-400/40 rounded-r-2xl mr-2"></div>

              {/* Central Leaf Node */}
              <div className="w-12 h-12 rounded-xl bg-lime-400/20 border border-lime-400 flex items-center justify-center text-lime-300 shadow-lg shadow-lime-500/30">
                <Leaf className="w-6 h-6 text-lime-300" />
              </div>
            </div>
          </div>

          {/* Card 2: Surface what matters */}
          <div className="group rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between hover:border-lime-500/40 transition-all shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-xl bg-lime-950/40 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Surface what matters</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                AI that cuts through market noise and highlights the fixed Candle 1 insights that drive impact.
              </p>
            </div>

            {/* Glowing Chart Visual identical to mockup */}
            <div className="mt-6 pt-4 border-t border-white/5 relative h-28 flex items-end">
              <div className="absolute top-1 right-12 px-2 py-0.5 rounded-full bg-lime-400/20 border border-lime-400/60 text-[10px] text-lime-300 font-mono flex items-center gap-0.5">
                <span>↑ 32%</span>
              </div>
              
              {/* SVG Glowing Waves */}
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 80" fill="none">
                <path 
                  d="M0 65 Q 30 50, 60 60 T 120 40 T 160 15 T 200 35" 
                  stroke="#a3e635" 
                  strokeWidth="2" 
                  className="drop-shadow-[0_0_8px_rgba(163,230,53,0.8)]" 
                />
                <path 
                  d="M0 72 Q 40 60, 80 70 T 140 55 T 200 45" 
                  stroke="#65a30d" 
                  strokeWidth="1.5" 
                  opacity="0.6" 
                />
                <circle cx="160" cy="15" r="4" fill="#d9f99d" className="animate-ping" />
                <circle cx="160" cy="15" r="3.5" fill="#a3e635" />
              </svg>
            </div>
          </div>

          {/* Card 3: Act with confidence */}
          <div className="group rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between hover:border-lime-500/40 transition-all shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-xl bg-lime-950/40 border border-lime-500/30 flex items-center justify-center text-lime-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Act with confidence</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Built-in strict anti-repaint protocols and verified risk-reward math so your team executes without hesitation.
              </p>
            </div>

            {/* Radar / Orbital Shield Visual identical to mockup */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center py-2">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Orbital rings */}
                <div className="absolute inset-0 rounded-full border border-lime-500/20"></div>
                <div className="absolute inset-3 rounded-full border border-lime-500/30"></div>
                <div className="absolute inset-6 rounded-full border border-lime-400/40"></div>
                
                {/* Orbit dots */}
                <div className="absolute top-1 right-4 w-2 h-2 rounded-full bg-lime-400 shadow-sm shadow-lime-400"></div>
                <div className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-lime-300"></div>
                <div className="absolute top-6 left-1 w-1.5 h-1.5 rounded-full bg-lime-500"></div>

                {/* Center shield badge */}
                <div className="w-10 h-10 rounded-full bg-lime-500/20 border border-lime-400/80 flex items-center justify-center text-lime-300 shadow-lg shadow-lime-500/40">
                  <ShieldCheck className="w-5 h-5 text-lime-400" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Partner Logos Bar at bottom identical to mockup */}
        <div className="mt-14 pt-8 border-t border-white/10 text-center">
          <p className="text-[11px] uppercase tracking-widest text-white/40 font-mono mb-6">
            TRUSTED BY INNOVATIVE TEAMS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-white/50 text-sm font-semibold tracking-wider">
            <span className="flex items-center gap-1.5 hover:text-white transition">▲ Acme</span>
            <span className="flex items-center gap-1.5 hover:text-white transition">✱ LUMEN</span>
            <span className="flex items-center gap-1.5 hover:text-white transition">⋈ Nova</span>
            <span className="flex items-center gap-1.5 hover:text-white transition">◎ PULSE</span>
            <span className="flex items-center gap-1.5 hover:text-white transition">⁘ atelier</span>
          </div>
        </div>

      </div>

    </div>
  );
};

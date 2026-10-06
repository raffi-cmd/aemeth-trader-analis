import React from 'react';
import { Cpu, ShieldCheck, Zap, Activity, Database, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
  activeModelName: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, activeModelName }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Engine Version */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 font-mono">
                AEMETH-TRADER-ANALIS
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono">
                v10.0-PROD
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
              <span>VisionAlpha UltraTech Engine</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" /> NO-REPAINT ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Status Indicators & Model Pill */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>BAR-1 LOCK:</span>
              <span className="text-emerald-400 font-bold">100% FIXED</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>MARKETS:</span>
              <span className="text-sky-300">FX • CRYPTO • XAU • IDX/US</span>
            </div>
          </div>

          {/* Active Model Selector Button */}
          <button
            onClick={onOpenSettings}
            className="group flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 border border-cyan-500/30 hover:border-cyan-400 rounded-lg text-xs transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <div className="text-left font-mono">
              <div className="text-[9px] text-slate-400 leading-none">LLM ENGINE:</div>
              <div className="text-cyan-300 font-semibold leading-tight">{activeModelName}</div>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};

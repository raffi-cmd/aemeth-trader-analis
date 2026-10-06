import React from 'react';
import { 
  Crown, 
  Search, 
  Zap, 
  ArrowRight, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Lock, 
  Sliders, 
  TrendingUp,
  Cpu,
  Check,
  ChevronRight,
  Database,
  Globe,
  Radio,
  FileCode2,
  LineChart
} from 'lucide-react';

interface VictoryFinanceHeroProps {
  onStartAnalysis: () => void;
  onOpenSettings: () => void;
  activeModel: string;
}

export const VictoryFinanceHero: React.FC<VictoryFinanceHeroProps> = ({ 
  onStartAnalysis, 
  onOpenSettings,
  activeModel 
}) => {
  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 mb-10 font-sans transition-all">
      
      {/* 1. Header Navigation Bar (Clean Editorial Tech Style) */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/70 px-6 sm:px-10 py-4 flex items-center justify-between sticky top-0 z-30">
        
        {/* Brand Logo with Crown Aesthetic */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
            <Crown className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-widest uppercase font-mono">
                AEMETH TRADER
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 font-mono border border-slate-300">
                10.0-PROD
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono leading-none">
              VisionAlpha UltraTech Financial Engine
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider text-slate-600 uppercase font-mono">
          <span className="text-black border-b-2 border-black pb-1 cursor-pointer">ENGINE</span>
          <span className="hover:text-black cursor-pointer transition">VISION OCR</span>
          <span className="hover:text-black cursor-pointer transition">NO-REPAINT</span>
          <span className="hover:text-black cursor-pointer transition">RISK/REWARD</span>
          <span className="hover:text-black cursor-pointer transition">SPECIFICATION</span>
        </nav>

        {/* Model Handshake CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-semibold border border-slate-200 transition cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline text-slate-500">LLM:</span>
            <span className="font-bold text-black">{activeModel}</span>
          </button>

          <button
            onClick={onStartAnalysis}
            className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 tracking-wider font-mono transition cursor-pointer shadow-md"
          >
            <span>AUDIT CHART</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Hero Section: "BUILT FOR TRADERS - VISION ENGINE" */}
      <section className="relative px-6 sm:px-12 pt-12 pb-16 bg-gradient-to-b from-white via-slate-50 to-slate-100 overflow-hidden">
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-bold tracking-wider uppercase border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>NO-REPAINT CORE • FIXED BAR 1 ANALYSIS</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-black uppercase leading-none font-sans">
              BUILT FOR <br />
              <span className="tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-black via-slate-800 to-blue-700">
                VICTORY
              </span>
            </h1>

            <p className="text-sm text-slate-600 max-w-md font-medium leading-relaxed">
              Full-Stack Financial AI Vision Engine. Ekstrak pola chart TradingView/MetaTrader, hitung rasio Risk-Reward probabilistik, dan kunci sinyal eksekusi presisi tanpa bias repaint.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onStartAnalysis}
                className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-8 py-3.5 rounded-none flex items-center gap-3 tracking-widest uppercase transition transform hover:scale-[1.02] cursor-pointer shadow-xl font-mono"
              >
                <span>UPLOAD CHART NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSettings}
                className="border border-slate-300 hover:border-black bg-white text-slate-800 font-bold text-xs px-5 py-3.5 tracking-wider uppercase transition cursor-pointer font-mono"
              >
                <span>CONFIG LLM</span>
              </button>
            </div>

            {/* 4 Feature Badges Under Hero */}
            <div className="grid grid-cols-4 gap-3 pt-6 border-t border-slate-300 max-w-lg text-center font-mono">
              <div className="space-y-1">
                <Zap className="w-5 h-5 mx-auto text-black" />
                <div className="text-[9px] font-black uppercase text-slate-900 leading-tight">ULTRA LOW LATENCY</div>
                <div className="text-[9px] text-blue-600 font-bold">&lt; 1.2S VISION</div>
              </div>

              <div className="space-y-1">
                <Layers className="w-5 h-5 mx-auto text-black" />
                <div className="text-[9px] font-black uppercase text-slate-900 leading-tight">DUAL ENGINE</div>
                <div className="text-[9px] text-slate-600 font-bold">TEXT + JSON PAYLOAD</div>
              </div>

              <div className="space-y-1">
                <Lock className="w-5 h-5 mx-auto text-black" />
                <div className="text-[9px] font-black uppercase text-slate-900 leading-tight">ANTI-REPAINT</div>
                <div className="text-[9px] text-emerald-600 font-bold">CANDLE 1 LOCKED</div>
              </div>

              <div className="space-y-1">
                <Globe className="w-5 h-5 mx-auto text-black" />
                <div className="text-[9px] font-black uppercase text-slate-900 leading-tight">ALL MARKETS</div>
                <div className="text-[9px] text-slate-600 font-bold">FX • CRYPTO • IDX</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-End Visual Mockup (Futuristic Terminal Hub) */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80">
              
              {/* Header card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="font-bold text-slate-700 ml-1">VISION_ALPHA_TERMINAL</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                  ONLINE
                </span>
              </div>

              {/* Chart Graphic Preview */}
              <div className="py-4 space-y-3 font-mono">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-black text-black">XAUUSD • H1</div>
                    <div className="text-[11px] text-emerald-600 font-bold">GOLD / US DOLLAR SPOT</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">2,658.45</div>
                    <div className="text-[10px] text-emerald-600 font-bold">+0.84% (CANDLE 1 CLOSED)</div>
                  </div>
                </div>

                {/* SVG Visual Candlestick simulation */}
                <div className="h-32 bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-end justify-between relative overflow-hidden">
                  <div className="absolute inset-x-0 top-1/3 border-b border-dashed border-slate-300"></div>
                  <div className="absolute inset-x-0 top-2/3 border-b border-dashed border-slate-200"></div>
                  
                  {/* Candlestick visual bars */}
                  {[
                    { h: 40, up: true },
                    { h: 65, up: false },
                    { h: 50, up: true },
                    { h: 80, up: true },
                    { h: 45, up: false },
                    { h: 90, up: true },
                    { h: 70, up: true },
                    { h: 95, up: true }
                  ].map((c, i) => (
                    <div key={i} className="flex flex-col items-center z-10 w-4">
                      <div className={`w-0.5 ${c.up ? 'bg-emerald-500' : 'bg-rose-400'}`} style={{ height: `${c.h + 15}px` }}></div>
                      <div className={`w-3 rounded-sm ${c.up ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ height: `${c.h}px` }}></div>
                    </div>
                  ))}

                  {/* Target line banner */}
                  <div className="absolute top-2 right-2 bg-black text-white text-[9px] px-2 py-0.5 rounded font-bold shadow">
                    TP2: 2,685.00 (+2.4 RR)
                  </div>
                </div>

                {/* Status Box */}
                <div className="bg-slate-900 text-white p-3 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>EXECUTION ROUTE:</span>
                    <span className="text-emerald-400 font-bold">BUY LIMIT (OB RETEST)</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>ESTIMATED WINRATE:</span>
                    <span className="text-cyan-400 font-bold">68% (+5% CONFLUENCE)</span>
                  </div>
                </div>
              </div>

              {/* Bottom crown logo watermark */}
              <div className="pt-2 text-center text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                <Crown className="w-3.5 h-3.5 text-black" />
                <span>POWERED BY AEMETH 10.0-PROD VISION ARCHITECTURE</span>
              </div>

            </div>
          </div>

        </div>

        {/* 3. Technical Specifications Strip */}
        <div className="max-w-6xl mx-auto mt-12 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden font-mono">
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Header Badge */}
            <div className="md:col-span-3 bg-black text-white p-5 flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                FINANCIAL ENGINE
              </span>
              <span className="text-sm font-black uppercase tracking-wide">
                SPECIFICATIONS
              </span>
              <div className="w-8 h-0.5 bg-blue-500 mt-2" />
            </div>

            {/* Spec 1 */}
            <div className="md:col-span-2 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">ENGINE LATENCY</div>
              <div className="text-xs font-black text-black">40MS OCR PIPELINE</div>
              <div className="text-[10px] text-slate-500">Fast Vision Extraction</div>
            </div>

            {/* Spec 2 */}
            <div className="md:col-span-2 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">BAR CONSTRAINTS</div>
              <div className="text-xs font-black text-emerald-600">CANDLE 1 LOCKED</div>
              <div className="text-[10px] text-slate-500">100% Anti-Repaint</div>
            </div>

            {/* Spec 3 */}
            <div className="md:col-span-2 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">ORDER ROUTING</div>
              <div className="text-xs font-black text-black">4 PRECISE TYPES</div>
              <div className="text-[10px] text-slate-500">Market / Limit / Stop / W&S</div>
            </div>

            {/* Spec 4 */}
            <div className="md:col-span-2 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">PROBABILITY MATH</div>
              <div className="text-xs font-black text-black">RR ASYMMETRIC</div>
              <div className="text-[10px] text-slate-500">+5% Confluence Factor</div>
            </div>

            {/* Spec 5 */}
            <div className="md:col-span-1 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">OUTPUT</div>
              <div className="text-xs font-black text-blue-600">JSON + UI</div>
              <div className="text-[10px] text-slate-500">Dual Pipeline</div>
            </div>

          </div>
        </div>

      </section>

      {/* 4. Section: 40MS ULTRA-LOW LATENCY VISION */}
      <section className="px-6 sm:px-12 py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-4xl font-black text-black tracking-tight uppercase leading-none font-sans">
              40MS <br />
              ULTRA-LOW <br />
              LATENCY VISION
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Ekstrak instan pair, timeframe, dan struktur chart dalam hitungan milidetik. Dapatkan keunggulan eksekusi presisi sebelum pasar bergerak ke level target berikutnya.
            </p>
            <div>
              <button 
                onClick={onStartAnalysis}
                className="border border-black hover:bg-black hover:text-white text-black font-bold text-xs px-5 py-2.5 flex items-center gap-2 uppercase tracking-wider transition cursor-pointer font-mono"
              >
                <span>TEST VISION OCR</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center items-center relative">
            <div className="relative w-80 h-80 flex items-center justify-center">
              
              {/* Concentric radar rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-slate-300"></div>
              <div className="absolute inset-8 rounded-full border border-slate-200"></div>
              <div className="absolute inset-16 rounded-full border border-slate-300"></div>

              {/* Center Radar Scanner Hub */}
              <div className="relative z-10 w-32 h-52 bg-gradient-to-b from-white via-slate-50 to-slate-200 rounded-3xl shadow-2xl border border-slate-300 flex flex-col items-center justify-between p-4">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-center font-mono">
                  <div className="text-xs font-black text-black">NO-REPAINT</div>
                  <div className="text-[9px] text-slate-500">SCANNER</div>
                </div>
                <div className="w-1.5 h-16 bg-blue-500 rounded-full mb-1 shadow" />
              </div>

              {/* Callout box right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl shadow-xl border border-slate-200 z-20 font-mono">
                <div className="text-2xl font-black text-black leading-none">40MS</div>
                <div className="text-[8px] font-bold uppercase tracking-wider text-slate-500">VISION PIPELINE</div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. 4 Feature Grid Cards: Sesuai Fungsi Trading Engine */}
      <section className="px-6 sm:px-12 py-14 bg-[#fafbfc] border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          
          {/* Card 1: Multi-Timeframe Confluence */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="h-28 flex items-center justify-center">
              <div className="flex items-center -space-x-2">
                <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">M15</div>
                <div className="w-10 h-10 rounded-full border-4 border-slate-600 bg-slate-700 flex items-center justify-center text-white text-[9px] font-bold">H1</div>
                <div className="w-8 h-8 rounded-full border-2 border-slate-400 bg-white flex items-center justify-center text-black text-[8px] font-bold">H4</div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-black mb-1">MULTI-TF ALIGNMENT</h4>
              <p className="text-[11px] text-slate-500 leading-normal font-sans">
                Sinkronisasi tren M15, H1, dan H4 untuk mengonfirmasi validitas Orderblock & FVG.
              </p>
            </div>
          </div>

          {/* Card 2: AI Vision Auto-Extraction */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="h-28 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center shadow-inner">
                <Sliders className="w-8 h-8 text-black" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-black mb-1">INSTANT VISION OCR</h4>
              <p className="text-[11px] text-slate-500 leading-normal font-sans">
                Otomatis membaca Ticker, Timeframe, dan Kategori langsung dari screenshot chart.
              </p>
            </div>
          </div>

          {/* Card 3: Anti-Repaint Strict Guarantee */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="h-28 flex items-center justify-center">
              <div className="w-24 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-slate-800 shadow-inner">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-black mb-1">ANTI-REPAINT PROMISE</h4>
              <p className="text-[11px] text-slate-500 leading-normal font-sans">
                Kalkulasi sinyal hanya pada Candle 1 (Fixed Bar), bebas dari fluktuasi intraday bar 0.
              </p>
            </div>
          </div>

          {/* Card 4: Multi-Asset Compatibility */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="h-28 flex items-center justify-center gap-3 text-slate-800">
              <Globe className="w-6 h-6" />
              <TrendingUp className="w-6 h-6" />
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-black mb-1">ALL-MARKET SUPPORT</h4>
              <p className="text-[11px] text-slate-500 leading-normal font-sans">
                Dukungan menyeluruh untuk Forex, Crypto, Komoditas Emas (XAUUSD), serta Saham IDX & US.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Section: CRAFTED FOR TRADERS */}
      <section className="bg-white font-mono">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Black Banner Left */}
          <div className="lg:col-span-5 bg-black text-white p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              PREMIUM TRADING INFRASTRUCTURE
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight font-sans">
              CRAFTED FOR <br />
              TRADERS
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans">
              Direkayasa secara presisi dengan arsitektur multi-model LLM untuk memberikan akurasi rasio Risk-Reward tertinggi.
            </p>

            <ul className="space-y-2 text-xs font-bold text-slate-200 pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Fixed Closed Bar 1 Locking
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> 4 Dynamic Order Routing Options
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Dual Output (Interactive UI + Clean JSON)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" /> Compatible with All LLM Providers
              </li>
            </ul>
          </div>

          {/* Product Gallery Grid Right */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-2 bg-slate-100 p-3 relative">
            <div className="bg-white p-5 flex flex-col items-center justify-center rounded-xl border border-slate-200/60 shadow-sm text-center">
              <LineChart className="w-10 h-10 text-black mb-2" />
              <span className="text-[11px] font-black uppercase text-slate-800">CANDLE VISION</span>
            </div>
            <div className="bg-white p-5 flex flex-col items-center justify-center rounded-xl border border-slate-200/60 shadow-sm text-center">
              <FileCode2 className="w-10 h-10 text-blue-600 mb-2" />
              <span className="text-[11px] font-black uppercase text-slate-800">JSON PAYLOAD</span>
            </div>
            <div className="bg-white p-5 flex flex-col items-center justify-center rounded-xl border border-slate-200/60 shadow-sm text-center">
              <Lock className="w-10 h-10 text-emerald-600 mb-2" />
              <span className="text-[11px] font-black uppercase text-slate-800">NO-REPAINT</span>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Bottom Value Proposition Bar */}
      <footer className="bg-[#f8f9fa] border-t border-slate-200 px-6 sm:px-12 py-6 font-mono">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase text-black">NO REPAINT GUARANTEE</div>
              <div className="text-[10px] text-slate-500 font-sans">Candle 1 Fixed Bar</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase text-black">INSTANT VISION OCR</div>
              <div className="text-[10px] text-slate-500 font-sans">Auto extract metadata</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FileCode2 className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase text-black">JSON 10.0-PROD</div>
              <div className="text-[10px] text-slate-500 font-sans">Standard machine payload</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase text-black">CROSS PLATFORM LLM</div>
              <div className="text-[10px] text-slate-500 font-sans">Gemini • Claude • OpenAI</div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

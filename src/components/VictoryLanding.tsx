import React from 'react';
import { 
  Crown, 
  Search, 
  User, 
  ShoppingBag, 
  ArrowRight, 
  Volume2, 
  Disc, 
  BatteryCharging, 
  Mic2, 
  ChevronRight,
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  Check, 
  ArrowLeft,
  Zap,
  Gamepad2,
  Apple
} from 'lucide-react';

interface VictoryLandingProps {
  onExploreEngine: () => void;
}

export const VictoryLanding: React.FC<VictoryLandingProps> = ({ onExploreEngine }) => {
  return (
    <div className="w-full bg-[#f8f9fa] text-[#0f172a] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 mb-12 font-sans">
      
      {/* 1. Header Navigation Bar */}
      <header className="bg-white border-b border-slate-100 px-6 sm:px-12 py-4 flex items-center justify-between">
        {/* Crown Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={onExploreEngine}>
          <Crown className="w-7 h-7 text-black fill-black" />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider text-slate-700 uppercase">
          <span className="text-black border-b-2 border-black pb-1 cursor-pointer">HOME</span>
          <span className="hover:text-black cursor-pointer transition">PRODUCTS</span>
          <span className="hover:text-black cursor-pointer transition">TECHNOLOGY</span>
          <span className="hover:text-black cursor-pointer transition">ABOUT US</span>
          <span className="hover:text-black cursor-pointer transition">SUPPORT</span>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-5 text-slate-800">
          <Search className="w-4 h-4 cursor-pointer hover:text-black transition" />
          <User className="w-4 h-4 cursor-pointer hover:text-black transition" />
          <div className="relative cursor-pointer hover:text-black transition" onClick={onExploreEngine}>
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </div>
        </div>
      </header>

      {/* 2. Hero Section: BUILT FOR VICTORY */}
      <section className="relative px-6 sm:px-12 pt-12 pb-16 bg-gradient-to-b from-[#ffffff] via-[#f1f4f8] to-[#e8edf2] overflow-hidden">
        
        {/* Background Subtle Water/Ice Texture effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-black tracking-widest text-slate-500 uppercase">
              TRUE WIRELESS
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-black uppercase leading-none">
              BUILT FOR <br />
              <span className="tracking-tighter">VICTORY</span>
            </h1>

            <p className="text-sm text-slate-600 max-w-md font-medium leading-relaxed">
              Elite Gaming Earbuds engineered for unmatched performance and precision.
            </p>

            <div>
              <button
                onClick={onExploreEngine}
                className="bg-black hover:bg-slate-800 text-white font-bold text-xs px-7 py-3 rounded-none flex items-center gap-3 tracking-widest uppercase transition transform hover:scale-[1.02] cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Feature Icons Under Hero Button */}
            <div className="grid grid-cols-4 gap-2 pt-6 border-t border-slate-300/60 max-w-lg text-center">
              <div className="space-y-1">
                <Volume2 className="w-5 h-5 mx-auto text-black" />
                <div className="text-[9px] font-extrabold uppercase text-slate-900 leading-tight">ULTRA LOW LATENCY</div>
                <div className="text-[9px] text-slate-500 font-bold">40MS</div>
              </div>

              <div className="space-y-1">
                <Disc className="w-5 h-5 mx-auto text-black" />
                <div className="text-[9px] font-extrabold uppercase text-slate-900 leading-tight">DUAL DRIVERS</div>
                <div className="text-[9px] text-slate-500 font-bold">HYBRID TECH<br />10MM + 6MM</div>
              </div>

              <div className="space-y-1">
                <BatteryCharging className="w-5 h-5 mx-auto text-black" />
                <div className="text-[9px] font-extrabold uppercase text-slate-900 leading-tight">EXTENDED PLAY</div>
                <div className="text-[9px] text-slate-500 font-bold">UP TO<br />35 HOURS</div>
              </div>

              <div className="space-y-1">
                <Mic2 className="w-5 h-5 mx-auto text-black" />
                <div className="text-[9px] font-extrabold uppercase text-slate-900 leading-tight">AI ENC MIC</div>
                <div className="text-[9px] text-slate-500 font-bold">CLEAR<br />COMMUNICATION</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Product Visual (White Victory Earbuds + Case) */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="relative group max-w-md w-full">
              {/* Product render visual mockup representation */}
              <div className="relative z-10 p-6 flex flex-col items-center justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                  
                  {/* Floating Earbud Left */}
                  <div className="absolute -top-4 left-6 w-20 h-36 bg-gradient-to-b from-white to-slate-200 rounded-3xl shadow-2xl border border-white flex flex-col items-center justify-between p-2 rotate-[-12deg] z-20">
                    <Crown className="w-4 h-4 text-black" />
                    <div className="w-1.5 h-12 bg-slate-300 rounded-full" />
                  </div>

                  {/* Floating Earbud Right */}
                  <div className="absolute -top-8 right-10 w-20 h-36 bg-gradient-to-b from-white to-slate-200 rounded-3xl shadow-2xl border border-white flex flex-col items-center justify-between p-2 rotate-[16deg] z-20">
                    <Crown className="w-4 h-4 text-black" />
                    <div className="w-1.5 h-12 bg-slate-300 rounded-full" />
                  </div>

                  {/* Modern Angular Charging Case */}
                  <div className="absolute bottom-2 w-64 h-48 bg-gradient-to-b from-white via-slate-100 to-slate-300 rounded-[2.5rem] shadow-2xl border-2 border-white flex flex-col items-center justify-between p-4 z-10">
                    <div className="text-[9px] font-mono tracking-widest text-slate-400 uppercase pt-2">
                      — VICTORY —
                    </div>
                    <div className="my-auto">
                      <Crown className="w-8 h-8 text-black fill-black" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mb-2 shadow" />
                  </div>

                  {/* Water splash / glow aura beneath */}
                  <div className="absolute -bottom-6 w-80 h-16 bg-gradient-to-r from-cyan-200/40 via-white to-blue-200/40 rounded-full blur-xl pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Technical Specifications Banner */}
        <div className="max-w-6xl mx-auto mt-12 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Header Badge */}
            <div className="md:col-span-3 bg-black text-white p-5 flex flex-col justify-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-300">
                TECHNICAL
              </span>
              <span className="text-sm font-black uppercase tracking-wide">
                SPECIFICATIONS
              </span>
              <div className="w-8 h-0.5 bg-slate-500 mt-2" />
            </div>

            {/* Spec 1 */}
            <div className="md:col-span-2 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">CONNECTION</div>
              <div className="text-xs font-black text-black">Bluetooth 5.3</div>
              <div className="text-[10px] text-slate-500">Low Power | Stable</div>
            </div>

            {/* Spec 2 */}
            <div className="md:col-span-2 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">LATENCY</div>
              <div className="text-xs font-black text-black">40MS</div>
              <div className="text-[10px] text-slate-500">Ultra Low Latency</div>
            </div>

            {/* Spec 3 */}
            <div className="md:col-span-2 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">DRIVERS</div>
              <div className="text-xs font-black text-black">10MM + 6MM</div>
              <div className="text-[10px] text-slate-500">Hybrid Dual Drivers</div>
            </div>

            {/* Spec 4 */}
            <div className="md:col-span-2 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">FREQUENCY RESPONSE</div>
              <div className="text-xs font-black text-black">20Hz - 40kHz</div>
              <div className="text-[10px] text-slate-500">Hi-Res Audio</div>
            </div>

            {/* Spec 5 */}
            <div className="md:col-span-1 p-4 text-center md:text-left">
              <div className="text-[9px] font-bold text-slate-400 uppercase">IMPEDANCE</div>
              <div className="text-xs font-black text-black">32Ω</div>
              <div className="text-[10px] text-slate-500">High Perf</div>
            </div>

          </div>
        </div>

      </section>

      {/* 4. Section: 40MS ULTRA-LOW LATENCY */}
      <section className="px-6 sm:px-12 py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-4xl font-black text-black tracking-tight uppercase leading-none">
              40MS <br />
              ULTRA-LOW <br />
              LATENCY
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Stay ahead of the game with ultra-low latency performance. Hear every detail in real-time and react faster than your opponents.
            </p>
            <div>
              <button 
                onClick={onExploreEngine}
                className="border border-black hover:bg-black hover:text-white text-black font-bold text-xs px-5 py-2 flex items-center gap-2 uppercase tracking-wider transition cursor-pointer"
              >
                <span>LEARN MORE</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center items-center relative">
            <div className="relative w-80 h-80 flex items-center justify-center">
              
              {/* Concentric radar rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-slate-300"></div>
              <div className="absolute inset-6 rounded-full border border-slate-200"></div>
              <div className="absolute inset-16 rounded-full border border-slate-300"></div>

              {/* Center Earbud */}
              <div className="relative z-10 w-28 h-48 bg-gradient-to-b from-white to-slate-200 rounded-full shadow-2xl border border-white flex flex-col items-center justify-between p-3 rotate-[10deg]">
                <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <Crown className="w-4 h-4 text-black" />
                <div className="w-1.5 h-16 bg-slate-300 rounded-full mb-1" />
              </div>

              {/* Callout box right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-slate-100 z-20">
                <div className="text-2xl font-black text-black leading-none">40MS</div>
                <div className="text-[8px] font-bold uppercase tracking-wider text-slate-500">ULTRA-LOW LATENCY</div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. 4 Feature Grid Cards */}
      <section className="px-6 sm:px-12 py-14 bg-[#fafbfc] border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Hybrid Dual Drivers */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="h-28 flex items-center justify-center">
              {/* Driver rings visual */}
              <div className="flex items-center -space-x-2">
                <div className="w-12 h-12 rounded-full border-4 border-slate-800 bg-slate-900" />
                <div className="w-10 h-10 rounded-full border-4 border-slate-600 bg-slate-700" />
                <div className="w-8 h-8 rounded-full border-2 border-slate-400 bg-white" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-black mb-1">HYBRID DUAL DRIVERS</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                10mm dynamic driver for powerful bass and 6mm balanced armature for crystal-clear highs.
              </p>
            </div>
          </div>

          {/* Card 2: AI ENC Microphone */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="h-28 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-16 bg-slate-100 rounded-full border border-slate-300 flex items-center justify-center">
                  <Mic2 className="w-4 h-4 text-black" />
                </div>
                {/* Audio wave lines */}
                <div className="flex items-center gap-0.5">
                  <div className="w-0.5 h-4 bg-slate-400"></div>
                  <div className="w-0.5 h-8 bg-black"></div>
                  <div className="w-0.5 h-6 bg-slate-400"></div>
                  <div className="w-0.5 h-2 bg-slate-300"></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-black mb-1">AI ENC MICROPHONE</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Advanced AI Environmental Noise Cancellation for flawless team communication.
              </p>
            </div>
          </div>

          {/* Card 3: Up to 35 Hours Battery */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="h-28 flex items-center justify-center">
              <div className="w-24 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-slate-800 shadow-inner">
                <div className="w-12 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-black mb-1">UP TO 35 HOURS BATTERY LIFE</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                7 hours on a single charge. Up to 35 hours with the charging case.
              </p>
            </div>
          </div>

          {/* Card 4: Multi-Platform Compatibility */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="h-28 flex items-center justify-center gap-4 text-slate-700">
              <Gamepad2 className="w-6 h-6" />
              <Apple className="w-6 h-6" />
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-black mb-1">MULTI-PLATFORM COMPATIBILITY</h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Seamless connection across all your devices and gaming platforms.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Section: CRAFTED FOR GAMERS */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Black Banner Left */}
          <div className="lg:col-span-5 bg-black text-white p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              PREMIUM DESIGN
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight">
              CRAFTED FOR <br />
              GAMERS
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Precision-engineered with a futuristic design, built for comfort, and made to dominate.
            </p>

            <ul className="space-y-2 text-xs font-bold text-slate-200 pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" /> Ergonomic In-Ear Fit
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" /> Lightweight & Durable Build
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" /> Touch Controls
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" /> IPX5 Sweat & Water Resistant
              </li>
            </ul>
          </div>

          {/* Product Gallery Grid Right */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-1 bg-slate-100 p-2 relative">
            <div className="bg-white p-4 flex items-center justify-center rounded">
              <div className="w-24 h-24 bg-slate-200 rounded-2xl flex items-center justify-center shadow">
                <Crown className="w-8 h-8 text-black" />
              </div>
            </div>
            <div className="bg-white p-4 flex items-center justify-center rounded">
              <div className="flex gap-2">
                <div className="w-10 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-black" />
                </div>
                <div className="w-10 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-black" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 flex items-center justify-center rounded relative">
              <div className="w-12 h-24 bg-slate-200 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-black" />
              </div>
              <div className="absolute bottom-2 right-2 flex gap-1">
                <button className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-black">
                  <ArrowLeft className="w-3 h-3" />
                </button>
                <button className="w-6 h-6 rounded-full bg-black hover:bg-slate-800 flex items-center justify-center text-white">
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Bottom Value Proposition Bar */}
      <footer className="bg-[#f8f9fa] border-t border-slate-200 px-6 sm:px-12 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase text-black">1 YEAR WARRANTY</div>
              <div className="text-[10px] text-slate-500">Hassle-free coverage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase text-black">FREE SHIPPING</div>
              <div className="text-[10px] text-slate-500">On all orders</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase text-black">EASY RETURNS</div>
              <div className="text-[10px] text-slate-500">30-day return policy</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Headphones className="w-6 h-6 text-black shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase text-black">SUPPORT 24/7</div>
              <div className="text-[10px] text-slate-500">We're here to help</div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

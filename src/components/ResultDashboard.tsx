import React, { useState } from 'react';

// ─── Smart price formatter: Rp for IDX, $ for everything else ───
function formatPrice(price: number, assetClass: string): string {
  const isIDX = assetClass === 'Saham IDX';
  const isCrypto = assetClass === 'Crypto';
  const isForex = assetClass === 'Forex';

  if (isIDX) {
    // Indonesian stocks: integer, comma thousands, Rp prefix
    return `Rp ${Math.round(price).toLocaleString('id-ID')}`;
  }
  if (isForex) {
    // Forex: up to 5 decimal places
    return `$${price.toFixed(5)}`;
  }
  if (isCrypto && price < 1) {
    return `$${price.toFixed(4)}`;
  }
  if (isCrypto && price < 10) {
    return `$${price.toFixed(3)}`;
  }
  // Default: 2 decimals, no thousands separator for crypto small prices
  const formatted = price >= 1000
    ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price.toFixed(2);
  return `$${formatted}`;
}

function formatPriceRange(min: number, max: number, assetClass: string): string {
  return `${formatPrice(min, assetClass)} – ${formatPrice(max, assetClass)}`;
}

import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  ShieldAlert, 
  BarChart2, 
  Globe2, 
  FileCode2, 
  Copy, 
  Check, 
  Lock,
  Sparkles,
  Layers,
  ArrowDownCircle,
  ArrowUpCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { AnalysisResult } from '../types/trading';

interface ResultDashboardProps {
  analysis: AnalysisResult;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ analysis }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'ui' | 'json'>('ui');

  const copyJson = () => {
    navigator.clipboard.writeText(analysis.jsonPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBuy = analysis.decision === 'BUY';
  const isSell = analysis.decision === 'SELL';
  const isWait = analysis.decision === 'WAIT & SEE';

  const badgeColor = isBuy 
    ? 'bg-emerald-950 text-emerald-400 border-emerald-600' 
    : isSell 
    ? 'bg-rose-950 text-rose-400 border-rose-600' 
    : 'bg-amber-950 text-amber-400 border-amber-600';

  const decisionBg = isBuy
    ? 'from-emerald-950/60 via-slate-900/90 to-[#071318] border-emerald-500/50'
    : isSell
    ? 'from-rose-950/60 via-slate-900/90 to-[#071318] border-rose-500/50'
    : 'from-amber-950/60 via-slate-900/90 to-[#071318] border-amber-500/50';

  return (
    <div className="space-y-6">
      
      {/* 1. Top Banner Card: Core Decision & Execution Type */}
      <div className={`p-6 rounded-2xl border bg-gradient-to-br ${decisionBg} backdrop-blur-md shadow-2xl relative overflow-hidden`}>
        {/* Anti-Repaint Watermark */}
        <div className="absolute right-4 top-4 opacity-20 pointer-events-none font-mono text-xs text-right hidden sm:block">
          <div>ENGINE: {analysis.engineVersion}</div>
          <div>CANDLE 1 LOCKED • NO-REPAINT</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                {analysis.assetClass}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                TF: {analysis.timeframe}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                {analysis.tradingMethod}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                ID: {analysis.id} • {analysis.timestamp}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <h1 className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                {analysis.ticker}
              </h1>

              <div className={`px-4 py-2 rounded-xl border text-xl sm:text-2xl font-black font-mono flex items-center gap-2 shadow-lg ${badgeColor}`}>
                {isBuy && <TrendingUp className="w-7 h-7" />}
                {isSell && <TrendingDown className="w-7 h-7" />}
                {isWait && <Clock className="w-7 h-7" />}
                <span>{analysis.decision}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
              <span className="text-slate-400">TIPE EKSEKUSI PRESISI:</span>
              <span className="font-extrabold text-cyan-300 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-700/60 shadow">
                {analysis.executionType}
              </span>
            </div>
          </div>

          {/* Winrate Probability Meter */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 min-w-[300px] shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>ESTIMASI WINRATE</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +5% KONFLUENSI
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <div className="text-4xl font-black text-white font-mono">
                {analysis.probability.winratePercent}%
              </div>
              <div className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                {analysis.probability.confidenceLevel} CONFIDENCE
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-500 rounded-full transition-all duration-1000 shadow"
                style={{ width: `${analysis.probability.winratePercent}%` }}
              ></div>
            </div>

            <div className="text-xs text-slate-400 font-mono flex justify-between">
              <span>Risk:Reward Ratio:</span>
              <span className="text-cyan-300 font-black">{analysis.priceLevels.riskRewardRatio}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Visual Chart Preview With DIRECT LABELS Beneath */}
      {analysis.chartImageUrl && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" /> GRAFIK CHART YANG DIANALISIS (CANDLE 1 LOCKED)
            </h3>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-xs font-mono border border-emerald-800">
              MATCHED WITH VISION OCR
            </span>
          </div>

          {/* Chart Image */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center p-2 mb-4">
            <img 
              src={analysis.chartImageUrl} 
              alt="Uploaded Chart" 
              className="max-h-96 w-auto object-contain rounded-lg" 
            />
          </div>

          {/* HIGH-VISIBILITY LABELS DIRECTLY UNDER CHART (Sesuai Permintaan User) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            
            {/* Entry Box */}
            <div className="bg-[#0b1329] border-2 border-cyan-500/80 rounded-xl p-3.5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-bold mb-1">
                <span>AREA ENTRY</span>
                <ArrowDownCircle className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {formatPriceRange(analysis.priceLevels.entryMin, analysis.priceLevels.entryMax, analysis.assetClass)}
              </div>
              <div className="text-[10px] text-cyan-300/80 mt-1">
                Optimal Re-test / Breakout Zone
              </div>
            </div>

            {/* Take Profit 1 */}
            <div className="bg-[#071f16] border-2 border-emerald-500/80 rounded-xl p-3.5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-1">
                <span>TAKE PROFIT 1</span>
                <ArrowUpCircle className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                {formatPrice(analysis.priceLevels.tp1, analysis.assetClass)}
              </div>
              <div className="text-[10px] text-emerald-300/80 mt-1">
                Amankan Profit 50% & Move SL+
              </div>
            </div>

            {/* Take Profit 2 */}
            <div className="bg-[#062414] border-2 border-emerald-400 rounded-xl p-3.5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-emerald-300 font-bold mb-1">
                <span>TAKE PROFIT 2 (FULL)</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300">
                {formatPrice(analysis.priceLevels.tp2, analysis.assetClass)}
              </div>
              <div className="text-[10px] text-emerald-200 mt-1">
                Target Major Runner (RR {analysis.priceLevels.riskRewardRatio})
              </div>
            </div>

            {/* Stop Loss (Strict) */}
            <div className="bg-[#240b12] border-2 border-rose-500/80 rounded-xl p-3.5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-rose-400 font-bold mb-1">
                <span>STOP LOSS (STRICT)</span>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-rose-400">
                {formatPrice(analysis.priceLevels.sl, analysis.assetClass)}
              </div>
              <div className="text-[10px] text-rose-300/80 mt-1">
                Cut Loss Jika Bar-1 Closed Tembus
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tabs Selector: Dual-Mode (UI View vs Machine JSON Payload) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ui')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'ui'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" /> RINCIAN ANALISIS TEKNIKAL LENGKAP
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'json'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FileCode2 className="w-4 h-4" /> MACHINE JSON PAYLOAD (10.0-PROD)
          </button>
        </div>

        {activeTab === 'json' && (
          <button
            onClick={copyJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono border border-slate-700 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
          </button>
        )}
      </div>

      {/* Tab 1: Detailed Comprehensive Technical Analysis */}
      {activeTab === 'ui' ? (
        <div className="space-y-6">

          {/* Detailed Technical Analysis Deep-Dive */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" /> [2. ANALISIS TEKNIKAL VISUAL MENDALAM (CANDLE 1 LOCKED)]
              </h3>
              <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-mono font-bold">
                NO-REPAINT GUARANTEE ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 space-y-1.5">
                <span className="text-cyan-400 font-bold block text-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Market Structure & Trend Phase:
                </span>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {analysis.technical.marketStructure}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 space-y-1.5">
                <span className="text-cyan-400 font-bold block text-sm flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> Chart & Candlestick Pattern:
                </span>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {analysis.technical.chartAndCandlePattern}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 space-y-1.5 md:col-span-2">
                <span className="text-cyan-400 font-bold block text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Key Level Area & Liquidity Zones:
                </span>
                <p className="text-emerald-300 font-semibold leading-relaxed text-xs">
                  {analysis.technical.keyLevelArea}
                </p>
              </div>

            </div>

            {/* Comprehensive Indicator Matrix */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono">
              <span className="text-cyan-400 font-bold block text-sm mb-3">
                • Komprehensif Indikator Readout (Candle 1 Locked):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                
                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                  <span className="text-blue-400 font-black block mb-1">RSI (14) MOMENTUM:</span>
                  <span className="text-slate-300 leading-relaxed">{analysis.technical.indicatorReadout.rsi}</span>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                  <span className="text-indigo-400 font-black block mb-1">MACD HISTOGRAM:</span>
                  <span className="text-slate-300 leading-relaxed">{analysis.technical.indicatorReadout.macd}</span>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-black block mb-1">EMA DYNAMIC CLUSTER:</span>
                  <span className="text-slate-300 leading-relaxed">{analysis.technical.indicatorReadout.maPosition}</span>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-black block mb-1">VOLUME PROFILE & MA:</span>
                  <span className="text-slate-300 leading-relaxed">{analysis.technical.indicatorReadout.volume}</span>
                </div>

              </div>
            </div>

            {/* Detailed Confluence Factor Breakdown */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono">
              <span className="text-cyan-400 font-bold block text-sm mb-2">
                • Akumulasi 5 Faktor Konfluensi (+5% Winrate Bonus):
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {analysis.probability.factors.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Section 3 & 4: Fundamental Catalyst + Actionable Guideline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Section 3 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-sky-400" /> [3. FUNDAMENTAL & SENTIMEN KATALIS]
              </h3>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">• Sentimen Utama: </span>
                  <span className={`font-bold px-2 py-0.5 rounded ${
                    analysis.fundamental.sentiment === 'Bullish' 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    {analysis.fundamental.sentiment}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">• Katalis & Makro:</span>
                  <p className="text-slate-300 leading-relaxed">
                    {analysis.fundamental.catalystAndMacro}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> [4. INSTRUKSI TUNGGU / KONFIRMASI (ACTIONABLE)]
              </h3>
              <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/50 font-mono text-xs text-amber-200 leading-relaxed">
                <span className="text-amber-400 font-bold block mb-1.5">• Syarat Konfirmasi Eksekusi Disiplin:</span>
                <p>{analysis.confirmationRule}</p>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Tab 2: Machine-Readable JSON Payload */
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
            <span>[5. MACHINE-READABLE JSON PAYLOAD (FOR WEBSITE ENGINE)]</span>
            <span>STANDARD COMPLIANCE: 10.0-PROD</span>
          </div>
          <pre className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto text-xs font-mono text-cyan-300 leading-relaxed">
            <code>{analysis.jsonPayload}</code>
          </pre>
        </div>
      )}

    </div>
  );
};

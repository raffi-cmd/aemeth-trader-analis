import React, { useState } from 'react';
import { 
  CheckCircle2, 
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
  Maximize2,
  Lock,
  Layers,
  Sparkles
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
    ? 'bg-emerald-950 text-emerald-400 border-emerald-700/60' 
    : isSell 
    ? 'bg-rose-950 text-rose-400 border-rose-700/60' 
    : 'bg-amber-950 text-amber-400 border-amber-700/60';

  const decisionBg = isBuy
    ? 'from-emerald-900/40 via-emerald-950/20 to-slate-900/60 border-emerald-500/40'
    : isSell
    ? 'from-rose-900/40 via-rose-950/20 to-slate-900/60 border-rose-500/40'
    : 'from-amber-900/40 via-amber-950/20 to-slate-900/60 border-amber-500/40';

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card: Core Decision & Execution Type */}
      <div className={`p-6 rounded-2xl border bg-gradient-to-br ${decisionBg} backdrop-blur-md shadow-2xl relative overflow-hidden`}>
        {/* Anti-Repaint Watermark */}
        <div className="absolute right-3 top-3 opacity-15 pointer-events-none font-mono text-xs text-right">
          <div>ENGINE: {analysis.engineVersion}</div>
          <div>CANDLE 1 LOCKED • NO-REPAINT</div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {analysis.assetClass}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
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
              <h1 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {analysis.ticker}
              </h1>

              <div className={`px-4 py-1.5 rounded-xl border text-xl font-black font-mono flex items-center gap-2 ${badgeColor}`}>
                {isBuy && <TrendingUp className="w-6 h-6" />}
                {isSell && <TrendingDown className="w-6 h-6" />}
                {isWait && <Clock className="w-6 h-6" />}
                <span>{analysis.decision}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-mono text-slate-300">
              <span className="text-slate-400">TIPE EKSEKUSI:</span>
              <span className="font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                {analysis.executionType}
              </span>
            </div>
          </div>

          {/* Winrate Probability Meter */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>ESTIMASI WINRATE</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +5% KONFLUENSI
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <div className="text-3xl font-black text-white font-mono">
                {analysis.probability.winratePercent}%
              </div>
              <div className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                {analysis.probability.confidenceLevel} CONFIDENCE
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: `${analysis.probability.winratePercent}%` }}
              ></div>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">
              Risk:Reward: <span className="text-cyan-300 font-bold">{analysis.priceLevels.riskRewardRatio}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Selector: Dual-Mode (UI View vs Machine JSON Payload) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ui')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 ${
              activeTab === 'ui'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-4 h-4" /> VISUAL ANALYSIS REPORT
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition flex items-center gap-2 ${
              activeTab === 'json'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FileCode2 className="w-4 h-4" /> MACHINE JSON PAYLOAD
          </button>
        </div>

        {activeTab === 'json' && (
          <button
            onClick={copyJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
          </button>
        )}
      </div>

      {/* Tab 1: Visual UI View */}
      {activeTab === 'ui' ? (
        <div className="space-y-6">

          {/* Section 1: Precision Price Levels */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" /> [1. PARAMETER HARGA & EKSEKUSI PRESISI]
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">AREA ENTRY (HARGA)</span>
                <span className="text-base font-black font-mono text-cyan-300">
                  {analysis.priceLevels.entryMin} - {analysis.priceLevels.entryMax}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Optimal Entry Zone</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/40">
                <span className="text-[11px] font-mono text-emerald-400 block mb-1">TAKE PROFIT 1 (TP1)</span>
                <span className="text-base font-black font-mono text-emerald-300">
                  {analysis.priceLevels.tp1}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Scale Out 50%</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-800/60">
                <span className="text-[11px] font-mono text-emerald-400 block mb-1">TAKE PROFIT 2 (TP2)</span>
                <span className="text-base font-black font-mono text-emerald-400">
                  {analysis.priceLevels.tp2}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Full Target Runner</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-rose-900/50">
                <span className="text-[11px] font-mono text-rose-400 block mb-1">STOP LOSS (SL)</span>
                <span className="text-base font-black font-mono text-rose-400">
                  {analysis.priceLevels.sl}
                </span>
                <span className="text-[10px] text-rose-500 block mt-0.5 font-semibold">Strict Cut Loss</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">RISK TO REWARD</span>
                <span className="text-base font-black font-mono text-blue-400">
                  {analysis.priceLevels.riskRewardRatio}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Asymmetric Edge</span>
              </div>

            </div>
          </div>

          {/* Section 2: Visual Technical Analysis (Candle 1 Locked) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" /> [2. ANALISIS TEKNIKAL VISUAL (CANDLE 1 LOCKED)]
              </h3>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-mono">
                NO-REPAINT GUARANTEE
              </span>
            </div>

            {analysis.chartImageUrl && (
              <div className="mb-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex justify-center">
                <img 
                  src={analysis.chartImageUrl} 
                  alt="Chart Analysis" 
                  className="max-h-72 object-contain" 
                />
              </div>
            )}

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-semibold mb-1">• Market Structure:</span>
                <p className="text-slate-200">{analysis.technical.marketStructure}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-semibold mb-1">• Chart & Candle Pattern:</span>
                <p className="text-slate-200">{analysis.technical.chartAndCandlePattern}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-semibold mb-1">• Key Level Area:</span>
                <p className="text-cyan-300">{analysis.technical.keyLevelArea}</p>
              </div>

              {/* Indicator Readout Grid */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block font-semibold mb-2">• Indikator Readout:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-blue-400 font-bold block mb-0.5">RSI:</span>
                    <span>{analysis.technical.indicatorReadout.rsi}</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-indigo-400 font-bold block mb-0.5">MACD:</span>
                    <span>{analysis.technical.indicatorReadout.macd}</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-0.5">Moving Average:</span>
                    <span>{analysis.technical.indicatorReadout.maPosition}</span>
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-0.5">Volume Readout:</span>
                    <span>{analysis.technical.indicatorReadout.volume}</span>
                  </div>
                </div>
              </div>

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
                      ? 'bg-emerald-950 text-emerald-400' 
                      : analysis.fundamental.sentiment === 'Bearish'
                      ? 'bg-rose-950 text-rose-400'
                      : 'bg-slate-800 text-slate-300'
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
              <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/40 font-mono text-xs text-amber-200 leading-relaxed">
                <span className="text-amber-400 font-bold block mb-1.5">• Syarat Konfirmasi Eksekusi:</span>
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

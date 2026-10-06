import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, X, AlertCircle, ArrowRight, CheckCircle2, Wand2 } from 'lucide-react';
import { AssetClass, Timeframe, TradingMethod } from '../types/trading';
import { detectChartMetadataFromImage } from '../utils/chartVisionDetector';

interface AnalysisInputProps {
  onAnalyze: (data: {
    ticker: string;
    assetClass: AssetClass;
    timeframe: Timeframe;
    method: TradingMethod;
    imageUrl?: string;
  }) => void;
  isAnalyzing: boolean;
}

export const AnalysisInput: React.FC<AnalysisInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [ticker, setTicker] = useState('XAUUSD');
  const [assetClass, setAssetClass] = useState<AssetClass>('Commodity');
  const [timeframe, setTimeframe] = useState<Timeframe>('M15');
  const [method, setMethod] = useState<TradingMethod>('Scalping');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [autoDetectedBadge, setAutoDetectedBadge] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImageFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);

      // Otomatis Deteksi Meta Data dari Gambar (Pair, Timeframe, Kategori, Metode)
      const detected = await detectChartMetadataFromImage(file);
      setTicker(detected.ticker);
      setAssetClass(detected.assetClass);
      setTimeframe(detected.timeframe);
      setMethod(detected.method);
      setAutoDetectedBadge(detected.detectionDetails);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setAutoDetectedBadge(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({
      ticker: ticker.toUpperCase().trim() || 'XAUUSD',
      assetClass,
      timeframe,
      method,
      imageUrl: imagePreview || undefined
    });
  };

  const setQuickPair = (sym: string, cls: AssetClass, tf: Timeframe, m: TradingMethod) => {
    setTicker(sym);
    setAssetClass(cls);
    setTimeframe(tf);
    setMethod(m);
    setAutoDetectedBadge(null);
  };

  return (
    <div className="bg-[#0b101d]/90 border border-slate-800/90 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              AI VISION & TICKER SCREENER ENGINE
            </h2>
            <p className="text-xs text-slate-400">
              Input Screenshot Chart TradingView/MetaTrader atau Request Ticker Langsung
            </p>
          </div>
        </div>

        {/* Quick presets */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono">
          <span className="text-[11px] text-slate-500 mr-1">Quick:</span>
          <button
            type="button"
            onClick={() => setQuickPair('XAUUSD', 'Commodity', 'M15', 'Scalping')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/20 text-xs transition"
          >
            Gold (XAU)
          </button>
          <button
            type="button"
            onClick={() => setQuickPair('BTCUSDT', 'Crypto', 'M15', 'Scalping')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-orange-400 border border-orange-500/20 text-xs transition"
          >
            Bitcoin (BTC)
          </button>
          <button
            type="button"
            onClick={() => setQuickPair('BBCA.JK', 'Saham IDX', 'Daily', 'Swing Trade')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-blue-400 border border-blue-500/20 text-xs transition"
          >
            BBCA (IDX)
          </button>
          <button
            type="button"
            onClick={() => setQuickPair('NVDA', 'Saham US', 'H1', 'Day Trade')}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/20 text-xs transition"
          >
            NVDA (US)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload Screenshot / Vision Chart Section */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !imagePreview && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
            dragOver
              ? 'border-cyan-400 bg-cyan-950/20'
              : imagePreview
              ? 'border-cyan-500/40 bg-slate-950/70'
              : 'border-slate-800 hover:border-cyan-500/50 bg-slate-950/40 hover:bg-slate-950/60'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative group max-h-64 flex flex-col items-center justify-center overflow-hidden rounded-lg">
              <img
                src={imagePreview}
                alt="Uploaded Chart"
                className="max-h-60 object-contain rounded-lg border border-slate-800 shadow-xl"
              />
              <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg"
                >
                  Ganti Gambar
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); clearImage(); }}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-lg"
                >
                  <X className="w-4 h-4" /> Hapus
                </button>
              </div>

              {/* Badges on bottom */}
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-md bg-emerald-950/90 text-emerald-400 text-[11px] font-mono border border-emerald-600/50 flex items-center gap-1.5 shadow">
                  <ImageIcon className="w-3.5 h-3.5" /> Chart Vision Ready
                </div>
                {autoDetectedBadge && (
                  <div className="px-2.5 py-1 rounded-md bg-cyan-950/90 text-cyan-300 text-[11px] font-mono border border-cyan-500/50 flex items-center gap-1.5 shadow">
                    <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Auto-Identified from Chart</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center text-slate-400">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-2">
                <UploadCloud className="w-6 h-6 animate-bounce" />
              </div>
              <p className="text-sm font-semibold text-slate-200">
                Tarik & Lepaskan Screenshot Chart (TradingView / MT4/MT5 / Saham)
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-lg">
                💡 <strong>AI Otomatis Mendeteksi</strong> pair, timeframe, dan kategori pasar langsung dari gambar tanpa perlu input manual satu per satu!
              </p>
            </div>
          )}
        </div>

        {/* Automatic Input Synchronized Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Ticker Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-mono text-slate-300 uppercase">
                TICKER / PAIR
              </label>
              {autoDetectedBadge && (
                <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Auto
                </span>
              )}
            </div>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="XAUUSD"
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-sm text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-500 shadow-inner"
              required
            />
          </div>

          {/* Market Category */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-mono text-slate-300 uppercase">
                KATEGORI PASAR
              </label>
              {autoDetectedBadge && (
                <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Auto
                </span>
              )}
            </div>
            <select
              value={assetClass}
              onChange={(e) => setAssetClass(e.target.value as AssetClass)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500 shadow-inner"
            >
              <option value="Commodity">Commodity (XAUUSD/Oil)</option>
              <option value="Crypto">Cryptocurrency (BTC/ETH)</option>
              <option value="Forex">Forex (EUR/GBP/JPY)</option>
              <option value="Saham IDX">Saham IDX (Indonesia)</option>
              <option value="Saham US">Saham US (Wall Street)</option>
            </select>
          </div>

          {/* Timeframe */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-mono text-slate-300 uppercase">
                TIMEFRAME DETECTED
              </label>
              {autoDetectedBadge && (
                <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Auto
                </span>
              )}
            </div>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as Timeframe)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500 shadow-inner"
            >
              <option value="M5">M5 (5 Menit)</option>
              <option value="M15">M15 (15 Menit)</option>
              <option value="H1">H1 (1 Jam)</option>
              <option value="H4">H4 (4 Jam)</option>
              <option value="Daily">Daily (Harian)</option>
              <option value="Weekly">Weekly (Mingguan)</option>
            </select>
          </div>

          {/* Trading Method */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-mono text-slate-300 uppercase">
                METODE TRADING
              </label>
              {autoDetectedBadge && (
                <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Auto
                </span>
              )}
            </div>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as TradingMethod)}
              className="w-full bg-[#070b14] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500 shadow-inner"
            >
              <option value="Scalping">Scalping (M5 - M15)</option>
              <option value="Day Trade">Day Trade (M15 - H1)</option>
              <option value="Swing Trade">Swing Trade (H4 - Daily)</option>
            </select>
          </div>

        </div>

        {/* Action Button & Anti-Repaint Alert */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-amber-300/90 font-mono">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Anti-Repaint Guarantee: Kalkulasi dikunci HANYA pada Candle 1 (Closed Bar).</span>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>MENGANALISIS CANDLE 1...</span>
              </>
            ) : (
              <>
                <span>JALANKAN ANALISIS FULL-STACK</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

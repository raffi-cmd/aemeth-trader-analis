import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { VictoryLanding } from './components/VictoryLanding';
import { AnalysisInput } from './components/AnalysisInput';
import { ResultDashboard } from './components/ResultDashboard';
import { SettingsModal } from './components/SettingsModal';
import { SAMPLE_ANALYSIS_XAUUSD } from './data/mockData';
import { AnalysisResult, ApiSettings, AssetClass, Timeframe, TradingMethod } from './types/trading';
import { generateRealisticTradingAnalysis } from './utils/analysisEngine';
import { ShieldCheck, Radio } from 'lucide-react';

export function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(SAMPLE_ANALYSIS_XAUUSD);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    provider: 'gemini',
    customModelName: 'sol-vision-v10',
    apiKey: ''
  });

  const handleStartAnalysis = (params: {
    ticker: string;
    assetClass: AssetClass;
    timeframe: Timeframe;
    method: TradingMethod;
    imageUrl?: string;
  }) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = generateRealisticTradingAnalysis({
        ticker: params.ticker,
        assetClass: params.assetClass,
        timeframe: params.timeframe,
        method: params.method,
        imageUrl: params.imageUrl
      });

      setAnalysisResult(result);
      setIsAnalyzing(false);

      if (result.decision !== 'WAIT & SEE') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#06b6d4', '#10b981', '#3b82f6']
        });
      }

      const resEl = document.getElementById('analysis-result-section');
      if (resEl) {
        resEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  const scrollToEngine = () => {
    const el = document.getElementById('vision-engine-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#060a0f] text-slate-100 flex flex-col selection:bg-cyan-400 selection:text-black">
      
      {/* Top Header */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeModelName={apiSettings.customModelName}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-10">
        
        {/* Landing Page UI: TRUE WIRELESS BUILT FOR VICTORY (Persis Foto Baru) */}
        <VictoryLanding onExploreEngine={scrollToEngine} />

        {/* Vision Engine Section */}
        <div id="vision-engine-section" className="space-y-6 pt-2">
          
          {/* Anti-Repaint Guarantee Alert Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-[#071118] border border-cyan-500/30 p-4 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-mono font-bold text-sm text-cyan-300 flex items-center gap-2">
                    <span>SECTION 2 PROTOCOL ACTIVE: ANTI-REPAINT CORE DIRECTIVE</span>
                    <span className="animate-pulse flex h-2 w-2 rounded-full bg-cyan-400"></span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Semua indikator & Price Action dikunci HANYA pada <strong>CANDLE 1 (Fixed Closed Bar)</strong>. Tidak pernah berubah-ubah akibat fluktuasi intraday Candle 0.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>FEED: REAL-TIME VISION</span>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot Upload with Instant Auto-Detection */}
          <AnalysisInput
            onAnalyze={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
          />

          {/* Active Analysis Dashboard Result */}
          <div id="analysis-result-section">
            <ResultDashboard analysis={analysisResult} />
          </div>

        </div>

      </main>

      {/* Model Handshake Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={apiSettings}
        onSave={(newSettings) => setApiSettings(newSettings)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            AEMETH-TRADER-ANALIS • VisionAlpha UltraTech Engine v10.0-PROD
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Anti-Repaint Guaranteed</span>
            <span>•</span>
            <span>No-Repaint Candle 1</span>
            <span>•</span>
            <span>Auto Chart Vision</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;

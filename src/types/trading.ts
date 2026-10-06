export type AssetClass = 'Forex' | 'Commodity' | 'Crypto' | 'Saham IDX' | 'Saham US';

export type Timeframe = 'M5' | 'M15' | 'H1' | 'H4' | 'Daily' | 'Weekly';

export type TradingMethod = 'Scalping' | 'Day Trade' | 'Swing Trade';

export type DecisionType = 'BUY' | 'SELL' | 'WAIT & SEE';

export type ExecutionType = 
  | 'Market Order' 
  | 'Buy Limit' 
  | 'Sell Limit' 
  | 'Buy Stop' 
  | 'Sell Stop'
  | 'Wait & See';

export interface PriceLevels {
  entryMin: number;
  entryMax: number;
  tp1: number;
  tp2: number;
  sl: number;
  riskRewardRatio: string;
}

export interface ProbabilityMetric {
  winratePercent: number;
  confidenceLevel: 'VERY HIGH' | 'HIGH' | 'MODERATE' | 'LOW';
  confluenceBonus: boolean;
  factors: string[];
}

export interface TechnicalDetails {
  marketStructure: string;
  chartAndCandlePattern: string;
  keyLevelArea: string;
  indicatorReadout: {
    rsi: string;
    macd: string;
    maPosition: string;
    volume: string;
  };
}

export interface FundamentalDetails {
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  catalystAndMacro: string;
}

export interface AnalysisResult {
  engineVersion: string;
  id: string;
  timestamp: string;
  ticker: string;
  assetClass: AssetClass;
  timeframe: Timeframe;
  tradingMethod: TradingMethod;
  decision: DecisionType;
  executionType: ExecutionType;
  priceLevels: PriceLevels;
  probability: ProbabilityMetric;
  technical: TechnicalDetails;
  fundamental: FundamentalDetails;
  confirmationRule: string;
  jsonPayload: string;
  chartImageUrl?: string;
}

export interface ScreenerItem {
  ticker: string;
  name: string;
  assetClass: AssetClass;
  timeframe: Timeframe;
  currentPrice: number;
  change24h: number;
  method: TradingMethod;
  decision: DecisionType;
  executionType: ExecutionType;
  winrate: number;
  rr: string;
  status: 'READY' | 'TRIGGERED' | 'WAITING_BAR1';
}

export interface ApiSettings {
  provider: 'gemini' | 'openai' | 'claude' | 'openrouter' | 'custom';
  customModelName: string;
  apiKey: string;
}

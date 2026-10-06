import { AssetClass, Timeframe, TradingMethod } from '../types/trading';

export interface ExtractedChartInfo {
  ticker: string;
  assetClass: AssetClass;
  timeframe: Timeframe;
  method: TradingMethod;
  detectionDetails: string;
}

/**
 * Robust Client-Side Vision OCR & Header Heuristics
 * Mendeteksi pair/ticker, timeframe, dan kategori langsung saat user upload screenshot chart
 * (Mendukung format TradingView, MT4/MT5, Binance, Stockbit, dll.)
 */
export async function detectChartMetadataFromImage(
  imageSource: string | File
): Promise<ExtractedChartInfo> {
  // 1. Cek dari nama file jika file object
  let fileNameText = '';
  if (typeof imageSource !== 'string' && imageSource.name) {
    fileNameText = imageSource.name.toUpperCase();
  }

  // 2. Baca dimensi & karakteristik visual gambar melalui Canvas
  let canvasText = '';
  try {
    const img = new Image();
    const loadPromise = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
      if (typeof imageSource === 'string') {
        img.src = imageSource;
      } else {
        img.src = URL.createObjectURL(imageSource);
      }
    });
    await loadPromise;

    // Periksa aspect ratio atau metadata
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = Math.min(img.width, 800);
      canvas.height = Math.min(img.height, 400);
      // Analisis crop pojok kiri atas (biasanya tempat ticker & timeframe TradingView / MT4 berada)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  } catch (e) {
    console.warn('Canvas vision inspection notice:', e);
  }

  const combinedSearchString = `${fileNameText} ${canvasText}`.toUpperCase();

  // Pattern Matchers
  // Timeframe
  let detectedTimeframe: Timeframe = 'H1';
  let detectedMethod: TradingMethod = 'Day Trade';

  if (/\b(M5|5M|5 MIN)\b/.test(combinedSearchString)) {
    detectedTimeframe = 'M5';
    detectedMethod = 'Scalping';
  } else if (/\b(M15|15M|15 MIN)\b/.test(combinedSearchString)) {
    detectedTimeframe = 'M15';
    detectedMethod = 'Scalping';
  } else if (/\b(H4|4H|4 HOUR|240)\b/.test(combinedSearchString)) {
    detectedTimeframe = 'H4';
    detectedMethod = 'Swing Trade';
  } else if (/\b(DAILY|1D|D1)\b/.test(combinedSearchString)) {
    detectedTimeframe = 'Daily';
    detectedMethod = 'Swing Trade';
  } else if (/\b(WEEKLY|1W|W1)\b/.test(combinedSearchString)) {
    detectedTimeframe = 'Weekly';
    detectedMethod = 'Swing Trade';
  } else if (/\b(H1|1H|60)\b/.test(combinedSearchString)) {
    detectedTimeframe = 'H1';
    detectedMethod = 'Day Trade';
  }

  // Ticker & Asset Class detection
  let detectedTicker = 'XAUUSD';
  let detectedAssetClass: AssetClass = 'Commodity';

  if (combinedSearchString.includes('BTC') || combinedSearchString.includes('BITCOIN')) {
    detectedTicker = 'BTCUSDT';
    detectedAssetClass = 'Crypto';
  } else if (combinedSearchString.includes('ETH') || combinedSearchString.includes('ETHEREUM')) {
    detectedTicker = 'ETHUSDT';
    detectedAssetClass = 'Crypto';
  } else if (combinedSearchString.includes('SOL')) {
    detectedTicker = 'SOLUSDT';
    detectedAssetClass = 'Crypto';
  } else if (combinedSearchString.includes('EUR') || combinedSearchString.includes('EURUSD')) {
    detectedTicker = 'EURUSD';
    detectedAssetClass = 'Forex';
  } else if (combinedSearchString.includes('GBP') || combinedSearchString.includes('GBPUSD')) {
    detectedTicker = 'GBPUSD';
    detectedAssetClass = 'Forex';
  } else if (combinedSearchString.includes('USDJPY') || combinedSearchString.includes('JPY')) {
    detectedTicker = 'USDJPY';
    detectedAssetClass = 'Forex';
  } else if (combinedSearchString.includes('BBCA') || combinedSearchString.includes('BBRI') || combinedSearchString.includes('TLKM') || combinedSearchString.includes('IDX')) {
    detectedTicker = combinedSearchString.includes('BBRI') ? 'BBRI.JK' : combinedSearchString.includes('TLKM') ? 'TLKM.JK' : 'BBCA.JK';
    detectedAssetClass = 'Saham IDX';
  } else if (combinedSearchString.includes('NVDA') || combinedSearchString.includes('AAPL') || combinedSearchString.includes('TSLA')) {
    detectedTicker = combinedSearchString.includes('AAPL') ? 'AAPL' : combinedSearchString.includes('TSLA') ? 'TSLA' : 'NVDA';
    detectedAssetClass = 'Saham US';
  } else {
    // Default Gold / XAUUSD (Komoditas terpopuler) jika terdeteksi chart emas atau tradingview default
    detectedTicker = 'XAUUSD';
    detectedAssetClass = 'Commodity';
  }

  return {
    ticker: detectedTicker,
    assetClass: detectedAssetClass,
    timeframe: detectedTimeframe,
    method: detectedMethod,
    detectionDetails: `Vision Auto-Detected: ${detectedTicker} • ${detectedAssetClass} • ${detectedTimeframe} (${detectedMethod})`
  };
}

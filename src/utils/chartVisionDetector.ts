import { createWorker } from 'tesseract.js';
import { AssetClass, Timeframe, TradingMethod } from '../types/trading';

export interface ExtractedChartInfo {
  ticker: string;
  assetClass: AssetClass;
  timeframe: Timeframe;
  method: TradingMethod;
  detectionDetails: string;
  extractedPrice: number;
  marketDirection: 'BUY' | 'SELL';
  supportLevel?: number;
  resistanceLevel?: number;
}

export function getTradingMethodFromTimeframe(tf: Timeframe): TradingMethod {
  if (tf === 'M1' || tf === 'M5' || tf === 'M15') return 'Scalping';
  if (tf === 'H1') return 'Day Trade';
  return 'Swing Trade';
}

// ────────────────────────────────────────────────────────────────
// PRICE-RANGE → TICKER FALLBACK TABLE
// Jika OCR gagal baca ticker, gunakan harga untuk tebak coin
// ────────────────────────────────────────────────────────────────
interface RangeGuess { ticker: string; assetClass: AssetClass; }
const PRICE_RANGE_TABLE: Array<{ min: number; max: number; candidates: RangeGuess[] }> = [
  { min: 0.000001, max: 0.0005,  candidates: [{ ticker:'SHIBUSDT', assetClass:'Crypto' }] },
  { min: 0.0005,   max: 0.005,   candidates: [{ ticker:'FLOKIUSDT', assetClass:'Crypto' }] },
  { min: 0.005,    max: 0.05,    candidates: [{ ticker:'DOGEUSDT', assetClass:'Crypto' }, { ticker:'TRXUSDT', assetClass:'Crypto' }] },
  { min: 0.05,     max: 0.3,     candidates: [{ ticker:'XRPUSDT', assetClass:'Crypto' }, { ticker:'ADAUSDT', assetClass:'Crypto' }] },
  { min: 0.3,      max: 1.0,     candidates: [{ ticker:'MATICUSDT', assetClass:'Crypto' }, { ticker:'ARBUSDT', assetClass:'Crypto' }] },
  { min: 1.0,      max: 3.5,     candidates: [{ ticker:'PENDLEUSDT', assetClass:'Crypto' }, { ticker:'SEIUSDT', assetClass:'Crypto' }, { ticker:'OPUSDT', assetClass:'Crypto' }] },
  { min: 3.5,      max: 10,      candidates: [{ ticker:'NEARUSDT', assetClass:'Crypto' }, { ticker:'DOTUSDT', assetClass:'Crypto' }, { ticker:'FILUSDT', assetClass:'Crypto' }] },
  { min: 10,       max: 30,      candidates: [{ ticker:'LINKUSDT', assetClass:'Crypto' }, { ticker:'UNIUSDT', assetClass:'Crypto' }, { ticker:'ATOMUSDT', assetClass:'Crypto' }] },
  { min: 30,       max: 60,      candidates: [{ ticker:'ZECUSDT', assetClass:'Crypto' }, { ticker:'AVAXUSDT', assetClass:'Crypto' }] },
  { min: 60,       max: 110,     candidates: [{ ticker:'LTCUSDT', assetClass:'Crypto' }] },
  { min: 110,      max: 200,     candidates: [{ ticker:'SOLUSDT', assetClass:'Crypto' }, { ticker:'NVDA', assetClass:'Saham US' }] },
  { min: 200,      max: 700,     candidates: [{ ticker:'BNBUSDT', assetClass:'Crypto' }, { ticker:'TSLA', assetClass:'Saham US' }] },
  { min: 700,      max: 4000,    candidates: [{ ticker:'ETHUSDT', assetClass:'Crypto' }, { ticker:'AAPL', assetClass:'Saham US' }] },
  { min: 4000,     max: 10000,   candidates: [{ ticker:'XAUUSD', assetClass:'Commodity' }] },
  { min: 10000,    max: 100000,  candidates: [{ ticker:'BTCUSDT', assetClass:'Crypto' }] },
];

function guessTickerFromPrice(price: number): RangeGuess {
  for (const row of PRICE_RANGE_TABLE) {
    if (price >= row.min && price < row.max && row.candidates.length > 0) {
      return row.candidates[0];
    }
  }
  return { ticker: 'DETECTED_CRYPTO', assetClass: 'Crypto' };
}

// ────────────────────────────────────────────────────────────────
// TICKER KEYWORD MAP – cek dari teks OCR
// ────────────────────────────────────────────────────────────────
interface TickerEntry { keywords: string[]; ticker: string; assetClass: AssetClass; defaultPrice: number; }
const TICKER_MAP: TickerEntry[] = [
  // Crypto
  { keywords:['PENDLE','PENDL'], ticker:'PENDLEUSDT', assetClass:'Crypto', defaultPrice:2.100 },
  { keywords:['ZEC','ZCASH'], ticker:'ZECUSDT', assetClass:'Crypto', defaultPrice:36.50 },
  { keywords:['BTC','BITCOIN'], ticker:'BTCUSDT', assetClass:'Crypto', defaultPrice:63840 },
  { keywords:['ETH','ETHEREUM'], ticker:'ETHUSDT', assetClass:'Crypto', defaultPrice:2515 },
  { keywords:['SOL','SOLANA'], ticker:'SOLUSDT', assetClass:'Crypto', defaultPrice:148.50 },
  { keywords:['BNB'], ticker:'BNBUSDT', assetClass:'Crypto', defaultPrice:580 },
  { keywords:['XRP','RIPPLE'], ticker:'XRPUSDT', assetClass:'Crypto', defaultPrice:0.52 },
  { keywords:['DOGE','DOGECOIN'], ticker:'DOGEUSDT', assetClass:'Crypto', defaultPrice:0.165 },
  { keywords:['ADA','CARDANO'], ticker:'ADAUSDT', assetClass:'Crypto', defaultPrice:0.48 },
  { keywords:['MATIC','POLYGON'], ticker:'MATICUSDT', assetClass:'Crypto', defaultPrice:0.72 },
  { keywords:['AVAX','AVALANCHE'], ticker:'AVAXUSDT', assetClass:'Crypto', defaultPrice:36.80 },
  { keywords:['LINK','CHAINLINK'], ticker:'LINKUSDT', assetClass:'Crypto', defaultPrice:14.20 },
  { keywords:['DOT','POLKADOT'], ticker:'DOTUSDT', assetClass:'Crypto', defaultPrice:7.10 },
  { keywords:['ATOM','COSMOS'], ticker:'ATOMUSDT', assetClass:'Crypto', defaultPrice:8.40 },
  { keywords:['UNI','UNISWAP'], ticker:'UNIUSDT', assetClass:'Crypto', defaultPrice:9.80 },
  { keywords:['AAVE'], ticker:'AAVEUSDT', assetClass:'Crypto', defaultPrice:178 },
  { keywords:['LTC','LITECOIN'], ticker:'LTCUSDT', assetClass:'Crypto', defaultPrice:85.30 },
  { keywords:['TRX','TRON'], ticker:'TRXUSDT', assetClass:'Crypto', defaultPrice:0.145 },
  { keywords:['NEAR'], ticker:'NEARUSDT', assetClass:'Crypto', defaultPrice:5.60 },
  { keywords:['SUI'], ticker:'SUIUSDT', assetClass:'Crypto', defaultPrice:1.42 },
  { keywords:['APT','APTOS'], ticker:'APTUSDT', assetClass:'Crypto', defaultPrice:8.80 },
  { keywords:['ARB','ARBITRUM'], ticker:'ARBUSDT', assetClass:'Crypto', defaultPrice:0.78 },
  { keywords:['OP','OPTIMISM'], ticker:'OPUSDT', assetClass:'Crypto', defaultPrice:1.65 },
  { keywords:['INJ','INJECTIVE'], ticker:'INJUSDT', assetClass:'Crypto', defaultPrice:22.40 },
  { keywords:['SEI'], ticker:'SEIUSDT', assetClass:'Crypto', defaultPrice:0.44 },
  { keywords:['JUP','JUPITER'], ticker:'JUPUSDT', assetClass:'Crypto', defaultPrice:0.72 },
  { keywords:['FIL','FILECOIN'], ticker:'FILUSDT', assetClass:'Crypto', defaultPrice:5.10 },
  { keywords:['SHIB','SHIBA'], ticker:'SHIBUSDT', assetClass:'Crypto', defaultPrice:0.00002 },
  { keywords:['FLOKI'], ticker:'FLOKIUSDT', assetClass:'Crypto', defaultPrice:0.0002 },
  // Commodity
  { keywords:['XAU','GOLD','OANDA:XAU','XAUUSD'], ticker:'XAUUSD', assetClass:'Commodity', defaultPrice:4194.65 },
  { keywords:['XAG','SILVER'], ticker:'XAGUSD', assetClass:'Commodity', defaultPrice:28.50 },
  { keywords:['WTI','CRUDE','OIL'], ticker:'WTIUSD', assetClass:'Commodity', defaultPrice:78.20 },
  // Forex
  { keywords:['EURUSD','EUR/USD'], ticker:'EURUSD', assetClass:'Forex', defaultPrice:1.0842 },
  { keywords:['GBPUSD','GBP/USD'], ticker:'GBPUSD', assetClass:'Forex', defaultPrice:1.3090 },
  { keywords:['USDJPY','USD/JPY'], ticker:'USDJPY', assetClass:'Forex', defaultPrice:149.80 },
  // Saham US
  { keywords:['ORCL','ORACLE'], ticker:'ORCL', assetClass:'Saham US', defaultPrice:172.50 },
  { keywords:['NVDA','NVIDIA'], ticker:'NVDA', assetClass:'Saham US', defaultPrice:132.80 },
  { keywords:['AAPL','APPLE'], ticker:'AAPL', assetClass:'Saham US', defaultPrice:185.50 },
  { keywords:['TSLA','TESLA'], ticker:'TSLA', assetClass:'Saham US', defaultPrice:248.20 },
  { keywords:['MSFT','MICROSOFT'], ticker:'MSFT', assetClass:'Saham US', defaultPrice:425.30 },
  { keywords:['AMZN','AMAZON'], ticker:'AMZN', assetClass:'Saham US', defaultPrice:195.40 },
  { keywords:['META'], ticker:'META', assetClass:'Saham US', defaultPrice:530.80 },
  // Saham IDX
  { keywords:['BBCA'], ticker:'BBCA.JK', assetClass:'Saham IDX', defaultPrice:10450 },
  { keywords:['BBRI'], ticker:'BBRI.JK', assetClass:'Saham IDX', defaultPrice:5200 },
  { keywords:['BMRI'], ticker:'BMRI.JK', assetClass:'Saham IDX', defaultPrice:7100 },
  { keywords:['GOTO'], ticker:'GOTO.JK', assetClass:'Saham IDX', defaultPrice:66 },
];

// ────────────────────────────────────────────────────────────────
// CANVAS HELPER: buat offscreen canvas dari Image element
// ────────────────────────────────────────────────────────────────
function cropCanvas(
  img: HTMLImageElement,
  x: number, y: number, w: number, h: number,
  scale = 1
): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = Math.floor(w * scale);
  c.height = Math.floor(h * scale);
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, x, y, w, h, 0, 0, c.width, c.height);
  return c;
}

function invertAndContrastCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = canvas.getContext('2d')!;
  const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    const lum = d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114;
    // Binarise: pixel terang (>70) → putih, gelap → hitam, lalu invert untuk OCR
    const val = lum > 70 ? 0 : 255;
    d[i] = d[i+1] = d[i+2] = val;
  }
  ctx.putImageData(id, 0, 0);
  return canvas;
}

async function canvasToBlob(c: HTMLCanvasElement): Promise<Blob> {
  return new Promise(res => c.toBlob(b => res(b!), 'image/png'));
}

// ────────────────────────────────────────────────────────────────
// MAIN DETECTOR
// ────────────────────────────────────────────────────────────────
export async function detectChartMetadataFromImage(
  imageSource: string | File
): Promise<ExtractedChartInfo> {

  // ── 1. Load image element ──────────────────────────────────────
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    if (typeof imageSource === 'string') {
      img.src = imageSource;
    } else {
      img.src = URL.createObjectURL(imageSource);
    }
  });

  const W = img.width;
  const H = img.height;

  // ── 2. Tiga-region OCR ────────────────────────────────────────
  const worker = await createWorker('eng');

  // 2a. Full-image OCR
  let fullText = '';
  try {
    const { data } = await worker.recognize(img.src ?? imageSource as any);
    fullText = (data.text || '').toUpperCase();
  } catch (_) {}

  // 2b. Top-left region (0..45% width, 0..12% height) — area ticker TradingView
  let titleText = '';
  try {
    const titleCanvas = invertAndContrastCanvas(
      cropCanvas(img, 0, 0, Math.floor(W * 0.50), Math.floor(H * 0.14), 4)
    );
    const blob1 = await canvasToBlob(titleCanvas);
    const { data } = await worker.recognize(blob1);
    titleText = (data.text || '').toUpperCase();
  } catch (_) {}

  // 2c. Right-axis region (80%..100% width, 5%..95% height) — label Long/Short tool
  let axisText = '';
  try {
    const axisCanvas = invertAndContrastCanvas(
      cropCanvas(img,
        Math.floor(W * 0.78), Math.floor(H * 0.05),
        Math.floor(W * 0.22), Math.floor(H * 0.90),
        4
      )
    );
    const blob2 = await canvasToBlob(axisCanvas);
    const { data } = await worker.recognize(blob2);
    axisText = (data.text || '').toUpperCase();
  } catch (_) {}

  await worker.terminate();

  // File name juga bisa mengandung clue
  const fileName = typeof imageSource !== 'string'
    ? ((imageSource as File).name || '').toUpperCase()
    : '';

  // Gabung semua teks
  const allText = `${fileName} ${titleText} ${fullText} ${axisText}`;

  // ── 3. Deteksi Ticker dari OCR ────────────────────────────────
  let ticker = '';
  let assetClass: AssetClass = 'Crypto';
  let knownDefaultPrice = 0;

  for (const entry of TICKER_MAP) {
    if (entry.keywords.some(kw => allText.includes(kw))) {
      ticker = entry.ticker;
      assetClass = entry.assetClass;
      knownDefaultPrice = entry.defaultPrice;
      break;
    }
  }

  // Jika belum ketemu, coba pola "XXX / TETHERUS" atau "XXXUSDT"
  if (!ticker) {
    const patterns = [
      allText.match(/([A-Z]{2,8})\s*[\/\|•·]\s*TETHERUS/),
      allText.match(/([A-Z]{2,8})\s*[\/\|•·]\s*USDT/),
      allText.match(/([A-Z]{2,8})USDT\b/),
    ];
    const SKIP = new Set(['THE','AND','FOR','USD','TF','MA','EMA','RSI','ATR','VOL','SMA','ADX','BAR','FIX','BUY','SEL','MID','DAY','LOW','TOP','ALL','ALT','COI','NET','PRO']);
    for (const m of patterns) {
      if (m && m[1] && m[1].length >= 2 && !SKIP.has(m[1])) {
        ticker = m[1] + 'USDT';
        assetClass = 'Crypto';
        break;
      }
    }
  }

  // ── 4. Ekstrak harga dari teks OCR ────────────────────────────
  // Prioritas: axis teks (paling dekat dengan angka Long/Short tool),
  // kemudian full text dan title text.
  let extractedPrice = 0;

  const extractNumbers = (txt: string): number[] => {
    // Pola: angka ribuan seperti 4,194.65 atau 63,840
    const big = txt.match(/\b([1-9]\d{0,2}[,\.]\d{3}(?:[,\.]\d+)?)\b/g) || [];
    // Pola: angka desimal biasa seperti 2.100 atau 36.50
    const small = txt.match(/\b([0-9]{1,5}\.[0-9]{2,6})\b/g) || [];
    // Pola: integer murni > 100
    const ints = txt.match(/\b([1-9]\d{3,})\b/g) || [];

    const all = [...big, ...small, ...ints]
      .map(s => parseFloat(s.replace(/,/g, '')))
      .filter(n => !isNaN(n) && n > 0.0001 && n < 200000);
    return all;
  };

  // Prioritaskan angka dari axis area (kemungkinan besar harga chart)
  const axisNums = extractNumbers(axisText);
  const fullNums = extractNumbers(fullText);
  const allNums = [...axisNums, ...fullNums];

  if (allNums.length > 0) {
    // Filter: buang timestamp (kurang dari 100 kalau bukan detik-jam) dan angka yang tidak masuk akal
    const filtered = allNums.filter(n => {
      if (n > 0 && n < 0.001) return false; // terlalu kecil
      if (n > 99999) return false; // terlalu besar kecuali BTC
      return true;
    });
    if (filtered.length > 0) {
      filtered.sort((a, b) => a - b);
      // Ambil nilai median — lebih stabil dari max/min
      extractedPrice = filtered[Math.floor(filtered.length / 2)];
    }
  }

  // ── 5. Jika ticker tidak ditemukan, tebak dari harga ─────────
  if (!ticker && extractedPrice > 0) {
    const guess = guessTickerFromPrice(extractedPrice);
    ticker = guess.ticker;
    assetClass = guess.assetClass;
  }

  // Fallback akhir
  if (!ticker) {
    ticker = 'DETECTED_CRYPTO';
    assetClass = 'Crypto';
  }

  // ── 6. Harga final ────────────────────────────────────────────
  const finalPrice = extractedPrice > 0 ? extractedPrice : knownDefaultPrice || 1.00;

  // ── 7. Deteksi Timeframe dari OCR ────────────────────────────
  let timeframe: Timeframe = 'M5';
  // Urutan penting: cek lebih spesifik dulu
  if (/\b(15M|M15|15MIN|• 15 |· 15)\b/.test(allText)) { timeframe = 'M15'; }
  else if (/\b(WEEKLY|1W|W1)\b/.test(allText)) { timeframe = 'Weekly'; }
  else if (/\b(DAILY|1D|D1)\b/.test(allText)) { timeframe = 'Daily'; }
  else if (/\b(4H|H4|240M?)\b/.test(allText)) { timeframe = 'H4'; }
  else if (/\b(1H|H1|60M?)\b/.test(allText)) { timeframe = 'H1'; }
  else if (/[•·,\s]5[•·,\s]|5M\b|\bM5\b/.test(allText)) { timeframe = 'M5'; }
  else if (/[•·,\s]1[•·,\s]|1M\b|\bM1\b/.test(allText)) { timeframe = 'M1'; }

  // ── 8. Deteksi Arah (BUY/SELL) via Pixel Analysis ───────────
  // Pendekatan: hue-based warm vs cool di area KANAN chart (axis zone)
  // Axis zone tidak mengandung candle, hanya label & tool boxes
  let direction: 'BUY' | 'SELL' = 'BUY';

  try {
    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = W;
    mainCanvas.height = H;
    const ctx = mainCanvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    // Scan area: rightmost 20% width, middle 70% height (exclude top/bottom UI bars)
    const scanX0 = Math.floor(W * 0.78);
    const scanX1 = W;
    const scanY0 = Math.floor(H * 0.08);
    const scanY1 = Math.floor(H * 0.88);

    const id = ctx.getImageData(scanX0, scanY0, scanX1 - scanX0, scanY1 - scanY0);
    const d = id.data;
    const scanW = scanX1 - scanX0;
    const scanH = scanY1 - scanY0;

    let warmSumY = 0, warmCount = 0; // WARM = red/orange/yellow (hue 0-80°)
    let coolSumY = 0, coolCount = 0; // COOL = green/teal/blue/purple (hue 80-300°)

    for (let py = 0; py < scanH; py++) {
      for (let px = 0; px < scanW; px++) {
        const i = (py * scanW + px) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];

        // Skip very dark pixels (background) and very bright (white text)
        const lum = r * 0.299 + g * 0.587 + b * 0.114;
        if (lum < 35 || lum > 220) continue;

        // Compute saturation to skip grey pixels
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        if (sat < 0.25) continue; // Skip unsaturated grey

        // Classify hue
        // Warm: dominant red or orange (r highest, b very low relative to r)
        const isWarm = r > g && r > b && r > 120 && (r - b) > 80;
        // Cool: dominant green/blue/teal/purple (g or b higher than r, or b very high)
        const isCool = (g > r || b > r) && (g + b) > r + 60 && Math.max(g, b) > 80;

        if (isWarm) { warmSumY += py; warmCount++; }
        if (isCool) { coolSumY += py; coolCount++; }
      }
    }

    if (warmCount > 50 && coolCount > 50) {
      const avgWarmY = warmSumY / warmCount;
      const avgCoolY = coolSumY / coolCount;
      // Long Position Tool: TP (cool/green/teal) ABOVE Entry, SL (warm/red) BELOW
      // → avgCoolY < avgWarmY → BUY
      // Short Position Tool: SL (warm/red) ABOVE Entry, TP (cool/green/teal) BELOW
      // → avgCoolY > avgWarmY → SELL
      direction = avgCoolY < avgWarmY ? 'BUY' : 'SELL';
    } else if (warmCount > 50 && coolCount <= 50) {
      // Only warm found (red dominant): probably bearish chart → SELL
      direction = 'SELL';
    } else {
      // Only cool or nothing: assume BUY (bullish)
      direction = 'BUY';
    }
  } catch (e) {
    console.warn('Pixel direction scan error:', e);
  }

  // ── 9. Validasi Harga untuk Aset Tertentu ────────────────────
  if (assetClass === 'Commodity' && (finalPrice < 500 || finalPrice > 15000)) {
    knownDefaultPrice = 4194.65; // Gold fallback
  }
  if (assetClass === 'Forex' && (finalPrice < 0.5 || finalPrice > 200)) {
    knownDefaultPrice = 1.08;
  }
  const validatedPrice = (assetClass === 'Commodity' && (finalPrice < 500 || finalPrice > 15000))
    ? (knownDefaultPrice || 4194.65)
    : finalPrice;

  const method = getTradingMethodFromTimeframe(timeframe);

  return {
    ticker,
    assetClass,
    timeframe,
    method,
    detectionDetails: `Vision OCR: ${ticker} • ${assetClass} • ${timeframe} (${method}) • ${direction} @ $${validatedPrice.toLocaleString('en-US', { maximumFractionDigits: 4 })}`,
    extractedPrice: validatedPrice,
    marketDirection: direction,
    supportLevel: validatedPrice * 0.985,
    resistanceLevel: validatedPrice * 1.015,
  };
}

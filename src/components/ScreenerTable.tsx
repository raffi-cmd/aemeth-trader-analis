import React, { useState } from 'react';
import { ScreenerItem, AssetClass, TradingMethod } from '../types/trading';
import { Filter, ArrowUpRight, ArrowDownRight, Clock, Zap, CheckCircle2 } from 'lucide-react';

interface ScreenerTableProps {
  items: ScreenerItem[];
  onSelectTicker: (item: ScreenerItem) => void;
}

export const ScreenerTable: React.FC<ScreenerTableProps> = ({ items, onSelectTicker }) => {
  const [filterAsset, setFilterAsset] = useState<string>('ALL');
  const [filterMethod, setFilterMethod] = useState<string>('ALL');

  const filteredItems = items.filter(item => {
    if (filterAsset !== 'ALL' && item.assetClass !== filterAsset) return false;
    if (filterMethod !== 'ALL' && item.method !== filterMethod) return false;
    return true;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" /> REAL-TIME NO-REPAINT SCREENER
          </h2>
          <p className="text-xs text-slate-400">
            Sinyal terkonfirmasi Candle 1 (Fixed Bar) lintas Forex, Crypto, Komoditas & Saham
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterAsset}
              onChange={(e) => setFilterAsset(e.target.value)}
              className="bg-transparent focus:outline-none text-cyan-300"
            >
              <option value="ALL">All Asset Classes</option>
              <option value="Commodity">Commodity</option>
              <option value="Crypto">Crypto</option>
              <option value="Forex">Forex</option>
              <option value="Saham IDX">Saham IDX</option>
              <option value="Saham US">Saham US</option>
            </select>
          </div>

          <div className="bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-slate-300">
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="bg-transparent focus:outline-none text-cyan-300"
            >
              <option value="ALL">All Methods</option>
              <option value="Scalping">Scalping (M5-M15)</option>
              <option value="Day Trade">Day Trade (M15-H1)</option>
              <option value="Swing Trade">Swing Trade (H4-D)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2.5 px-3">TICKER / ASSET</th>
              <th className="py-2.5 px-3">TF & METODE</th>
              <th className="py-2.5 px-3 text-right">HARGA / 24H</th>
              <th className="py-2.5 px-3 text-center">DECISION</th>
              <th className="py-2.5 px-3">ORDER TYPE</th>
              <th className="py-2.5 px-3 text-center">WINRATE</th>
              <th className="py-2.5 px-3 text-center">RR</th>
              <th className="py-2.5 px-3 text-center">BAR-1 STATUS</th>
              <th className="py-2.5 px-3 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredItems.map((item) => {
              const isUp = item.change24h >= 0;
              const isBuy = item.decision === 'BUY';
              const isSell = item.decision === 'SELL';

              return (
                <tr 
                  key={item.ticker}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectTicker(item)}
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.ticker}
                    </div>
                    <div className="text-[10px] text-slate-400">{item.name}</div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] mr-1.5 border border-slate-700">
                      {item.timeframe}
                    </span>
                    <span className="text-slate-400 text-[11px]">{item.method}</span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="text-white font-bold">{item.currentPrice.toLocaleString('id-ID')}</div>
                    <div className={`text-[10px] flex items-center justify-end gap-0.5 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      <span>{isUp ? `+${item.change24h}%` : `${item.change24h}%`}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md font-bold text-[11px] border ${
                      isBuy 
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60' 
                        : isSell 
                        ? 'bg-rose-950/80 text-rose-400 border-rose-800/60' 
                        : 'bg-amber-950/80 text-amber-400 border-amber-800/60'
                    }`}>
                      {item.decision}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="text-slate-200 font-semibold">{item.executionType}</span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className="text-cyan-300 font-bold">{item.winrate}%</span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className="text-blue-400 font-bold">{item.rr}</span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'READY'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : item.status === 'TRIGGERED'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.status === 'READY' && <CheckCircle2 className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTicker(item);
                      }}
                      className="px-2.5 py-1 rounded bg-cyan-900/40 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-700/50 text-[11px] font-semibold transition"
                    >
                      Audit Chart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

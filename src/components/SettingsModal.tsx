import React, { useState } from 'react';
import { X, Key, Cpu, Shield, Check, Info } from 'lucide-react';
import { ApiSettings } from '../types/trading';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [provider, setProvider] = useState(settings.provider);
  const [customModelName, setCustomModelName] = useState(settings.customModelName);
  const [apiKey, setApiKey] = useState(settings.apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      provider,
      customModelName: customModelName.trim() || 'gpt-5.6-turbo',
      apiKey: apiKey.trim()
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleSelectPreset = (modelId: string, prov: ApiSettings['provider']) => {
    setProvider(prov);
    setCustomModelName(modelId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              SECTION 1: API & MODEL HANDSHAKE CONFIG
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Handshake compliance notice */}
          <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-3 text-xs font-mono text-cyan-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-cyan-200 mb-0.5">Custom Model Handshake Protocol:</span>
              Sistem menerima identifier custom model ('sol-vision', 'luna-core', 'gpt-5.6', dll.) tanpa penolakan, memproses visi grafik secara penuh.
            </div>
          </div>

          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              LLM Provider Gateway
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
            >
              <option value="gemini">Google Gemini 2.0 / 3.8 Flash (Vision Engine)</option>
              <option value="openai">OpenAI (GPT-4o / GPT-5.6-Turbo)</option>
              <option value="claude">Anthropic Claude 3.7 Sonnet (Vision)</option>
              <option value="openrouter">OpenRouter Multi-Provider Router</option>
              <option value="custom">Custom Fine-Tuned / Self-Hosted Endpoint</option>
            </select>
          </div>

          {/* Model Identifier */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
              Model Identifier (Bisa Custom String)
            </label>
            <input
              type="text"
              value={customModelName}
              onChange={(e) => setCustomModelName(e.target.value)}
              placeholder="e.g. sol-vision, luna-core, gpt-5.6-turbo"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
              required
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-slate-500 font-mono">Quick Preset:</span>
              {['sol-vision-v2', 'luna-core-alpha', 'gpt-5.6-turbo', 'gemini-2.5-flash', 'claude-3.7-sonnet'].map(m => (
                <button
                  type="button"
                  key={m}
                  onClick={() => handleSelectPreset(m, m.includes('gemini') ? 'gemini' : m.includes('claude') ? 'claude' : 'custom')}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Optional API Key */}
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1 flex items-center justify-between">
              <span>API Key (Optional / Private Client Key)</span>
              <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-normal">
                <Shield className="w-3 h-3" /> Stored locally in browser
              </span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-ant-... / AIzaSy... (Opsional jika pakai default)"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
              />
              <Key className="w-4 h-4 text-slate-600 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl font-bold font-mono text-sm tracking-wide transition flex items-center justify-center gap-2 ${
                savedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" /> HANDSHAKE BERHASIL DISIMPAN!
                </>
              ) : (
                'SIMPAN & AKTIFKAN MODEL HANDSHAKE'
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

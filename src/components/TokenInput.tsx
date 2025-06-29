import React from 'react';
import { Hash, Info, Type, Calculator } from 'lucide-react';

interface TokenInputProps {
  tokens: string;
  onTokensChange: (tokens: string) => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({ tokens, onTokensChange }) => {
  const [inputMode, setInputMode] = React.useState<'manual' | 'prompt'>('manual');
  const [promptText, setPromptText] = React.useState('');

  const estimateTokensFromPrompt = (text: string) => {
    // 1 token ≈ 4 characters
    const estimatedTokens = Math.ceil(text.length / 4);
    return estimatedTokens.toString();
  };

  const handlePromptChange = (text: string) => {
    setPromptText(text);
    const estimatedTokens = estimateTokensFromPrompt(text);
    onTokensChange(estimatedTokens);
  };

  const handleModeToggle = (mode: 'manual' | 'prompt') => {
    setInputMode(mode);
    if (mode === 'manual') {
      setPromptText('');
      onTokensChange('');
    } else {
      // If switching to prompt mode and there's existing token count, clear it
      onTokensChange('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Token Usage</h3>
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-500 cursor-help hover:text-green-600 transition-colors" />
          <div className="invisible group-hover:visible absolute bottom-6 left-0 bg-white text-gray-900 text-sm p-3 rounded-lg w-72 shadow-xl border border-green-200 z-20">
            <div className="text-green-600 font-medium mb-1">Token Usage</div>
            <p className="text-gray-700">Tokens are how AI models process text. Think of them as word pieces - roughly 4 characters = 1 token. More tokens = more processing = higher carbon emissions. A short email might use 100 tokens, while a long document could use thousands.</p>
          </div>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex mb-4 bg-gray-100 rounded-lg p-1 border border-gray-200">
        <button
          onClick={() => handleModeToggle('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            inputMode === 'manual'
              ? 'bg-green-600 text-white shadow-sm font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Manual Count
        </button>
        <button
          onClick={() => handleModeToggle('prompt')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
            inputMode === 'prompt'
              ? 'bg-green-600 text-white shadow-sm font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white'
          }`}
        >
          <Type className="w-4 h-4" />
          Paste Prompt
        </button>
      </div>

      {inputMode === 'manual' ? (
        <>
          <input
            type="number"
            value={tokens}
            onChange={(e) => onTokensChange(e.target.value)}
            placeholder="Enter number of tokens"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all shadow-sm hover:shadow-md"
            min="0"
          />
          <div className="mt-3 text-sm text-gray-600">
            <p>Example: A typical conversation ≈ 500-2,000 tokens</p>
          </div>
        </>
      ) : (
        <>
          <textarea
            value={promptText}
            onChange={(e) => handlePromptChange(e.target.value)}
            placeholder="Paste your full prompt here..."
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all resize-none shadow-sm hover:shadow-md"
            rows={4}
          />
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>Characters: {promptText.length}</p>
            <p>Estimated tokens: {promptText ? estimateTokensFromPrompt(promptText) : '0'}</p>
            <p className="text-xs">Using 1 token ≈ 4 characters estimation</p>
          </div>
        </>
      )}
    </div>
  );
};
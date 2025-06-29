import React from 'react';
import { Brain, Info } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { id: 'gpt-4', name: 'GPT-4', power: 0.0047 }, // kWh per 1k tokens
  { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', power: 0.0016 },
  { id: 'claude-3', name: 'Claude 3 Opus', power: 0.0042 },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', power: 0.0031 },
  { id: 'gemini-pro', name: 'Gemini Pro', power: 0.0035 },
  { id: 'llama-2', name: 'LLaMA 2 70B', power: 0.0029 },
];

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Model</h3>
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-500 cursor-help hover:text-green-600 transition-colors" />
          <div className="invisible group-hover:visible absolute bottom-6 left-0 bg-white text-gray-900 text-sm p-3 rounded-lg w-72 shadow-xl border border-green-200 z-20">
            <div className="text-green-600 font-medium mb-1">AI Model</div>
            <p className="text-gray-700">Different AI models consume varying amounts of energy. GPT-4 uses more power than GPT-3.5, and larger models like Claude 3 Opus require more computational resources than smaller ones. This directly affects your carbon footprint.</p>
          </div>
        </div>
      </div>
      
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all shadow-sm hover:shadow-md"
      >
        <option value="" className="bg-white text-gray-900">Select an AI model</option>
        {models.map((model) => (
          <option key={model.id} value={model.id} className="bg-white text-gray-900">
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { models };
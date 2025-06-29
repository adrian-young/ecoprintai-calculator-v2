import React from 'react';
import { TreePine, RotateCcw } from 'lucide-react';
import { EmissionGauge } from './EmissionGauge';

interface ResultsSectionProps {
  emissions: number;
  tokens: number;
  modelName: string;
  onReset: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ emissions, tokens, modelName, onReset }) => {
  const treesEquivalent = emissions / 21000; // Average tree absorbs ~21kg CO2 per year
  const drivingEquivalent = emissions / 404; // Average car emits ~404g CO2 per km

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TreePine className="w-6 h-6 text-green-600" />
          Your AI Carbon Footprint
        </h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 rounded-lg transition-all shadow-sm hover:shadow-md border border-gray-300 hover:border-green-600"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <EmissionGauge emissions={emissions} />
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Model Used</h4>
            <p className="text-lg text-gray-900">{modelName}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Tokens Processed</h4>
            <p className="text-lg text-gray-900">{tokens.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Equivalent Impact</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">
                🌳 {treesEquivalent.toFixed(4)} trees for 1 year
              </p>
              <p className="text-sm text-gray-700">
                🚗 {drivingEquivalent.toFixed(2)} km of driving
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="text-sm font-medium text-green-600 mb-2">How is this calculated?</h4>
        <p className="text-sm text-gray-700">
          We estimate energy consumption based on model size and computational requirements, 
          then convert to CO₂ emissions using regional electricity grid carbon intensity factors. 
          This provides a reasonable approximation for AI usage environmental impact.
        </p>
      </div>
    </div>
  );
};
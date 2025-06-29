import React from 'react';
import { Scale, Info } from 'lucide-react';

interface UnitSelectorProps {
  selectedUnit: string;
  onUnitChange: (unit: string) => void;
}

const units = [
  { id: 'grams', name: 'Grams (gCO₂e)', factor: 1 },
  { id: 'kilograms', name: 'Kilograms (kgCO₂e)', factor: 0.001 },
  { id: 'metric-tons', name: 'Metric Tons (tCO₂e)', factor: 0.000001 },
];

export const UnitSelector: React.FC<UnitSelectorProps> = ({ selectedUnit, onUnitChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Scale className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Units</h3>
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-500 cursor-help hover:text-green-600 transition-colors" />
          <div className="invisible group-hover:visible absolute bottom-6 left-0 bg-white text-gray-900 text-sm p-3 rounded-lg w-72 shadow-xl border border-green-200 z-20">
            <div className="text-green-600 font-medium mb-1">Measurement Units</div>
            <p className="text-gray-700">Choose how to display your carbon footprint. Grams work well for individual queries, kilograms for daily usage, and metric tons for large-scale operations. "CO₂e" means "carbon dioxide equivalent" - a standard way to measure all greenhouse gas emissions.</p>
          </div>
        </div>
      </div>
      
      <select
        value={selectedUnit}
        onChange={(e) => onUnitChange(e.target.value)}
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all shadow-sm hover:shadow-md"
      >
        {units.map((unit) => (
          <option key={unit.id} value={unit.id} className="bg-white text-gray-900">
            {unit.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { units };
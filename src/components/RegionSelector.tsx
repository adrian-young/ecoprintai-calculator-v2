import React from 'react';
import { Globe, Info } from 'lucide-react';

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = [
  { id: 'us-average', name: 'United States (Average)', co2Factor: 0.386 }, // kg CO2 per kWh
  { id: 'europe', name: 'Europe (Average)', co2Factor: 0.276 },
  { id: 'china', name: 'China', co2Factor: 0.555 },
  { id: 'india', name: 'India', co2Factor: 0.708 },
  { id: 'australia', name: 'Australia', co2Factor: 0.634 },
  { id: 'canada', name: 'Canada', co2Factor: 0.129 },
  { id: 'nordic', name: 'Nordic Countries', co2Factor: 0.045 },
];

export const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onRegionChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Electricity Grid</h3>
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-500 cursor-help hover:text-green-600 transition-colors" />
          <div className="invisible group-hover:visible absolute bottom-6 left-0 bg-white text-gray-900 text-sm p-3 rounded-lg w-72 shadow-xl border border-green-200 z-20">
            <div className="text-green-600 font-medium mb-1">Electricity Grid</div>
            <p className="text-gray-700">AI servers run on electricity from different power grids. Nordic countries use mostly clean hydroelectric power, while some regions rely more on coal or gas. The cleaner the grid, the lower your carbon footprint for the same AI usage.</p>
          </div>
        </div>
      </div>
      
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all shadow-sm hover:shadow-md"
      >
        <option value="" className="bg-white text-gray-900">Select your region</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id} className="bg-white text-gray-900">
            {region.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { regions };
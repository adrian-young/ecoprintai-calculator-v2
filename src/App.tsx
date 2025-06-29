import React from 'react';
import { Info } from 'lucide-react';
import { Header } from './components/Header';
import { ModelSelector } from './components/ModelSelector';
import { TokenInput } from './components/TokenInput';
import { RegionSelector } from './components/RegionSelector';
import { UnitSelector } from './components/UnitSelector';
import { ResultsSection } from './components/ResultsSection';
import { Footer } from './components/Footer';
import { useCarbonCalculator } from './hooks/useCarbonCalculator';

function App() {
  const {
    selectedModel,
    setSelectedModel,
    tokens,
    setTokens,
    selectedRegion,
    setSelectedRegion,
    selectedUnit,
    setSelectedUnit,
    emissions,
    reset,
    getSelectedModelName,
    hasResults,
    getFormattedEmissions,
    getUnitLabel
  } = useCarbonCalculator();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        {/* Token Usage - Full Width Row */}
        <div className="mb-8">
          <TokenInput 
            tokens={tokens}
            onTokensChange={setTokens}
          />
        </div>

        {/* Other Controls - Three Column Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ModelSelector 
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
          
          <RegionSelector 
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
          />
          
          <UnitSelector 
            selectedUnit={selectedUnit}
            onUnitChange={setSelectedUnit}
          />
        </div>

        {/* Static Carbon Footprint Display Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mt-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">🌍 Your AI Carbon Footprint</h2>
            <div className="group relative">
              <Info className="w-4 h-4 text-gray-500 cursor-help hover:text-green-600 transition-colors" />
              <div className="invisible group-hover:visible absolute bottom-6 left-0 bg-white text-gray-900 text-sm p-3 rounded-lg w-72 shadow-xl border border-green-200 z-20">
                <div className="text-green-600 font-medium mb-1">Your AI Carbon Footprint</div>
                <p className="text-gray-700">This shows the estimated CO₂ emissions from your AI usage. We calculate this by multiplying the energy your chosen AI model consumes per token by your token usage, then converting to emissions based on your region's electricity grid carbon intensity.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div id="carbon-value" className="text-3xl font-bold text-green-600 mb-2">
              {hasResults ? `${getFormattedEmissions()} ${getUnitLabel()}` : `0 ${getUnitLabel()}`}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="bg-gray-100 rounded-full h-4 w-full overflow-hidden border border-gray-200">
              <div 
                id="carbon-progress-bar"
                className="bg-green-600 h-full rounded-full transition-all duration-500"
                style={{ width: hasResults ? `${Math.min((emissions / 100) * 100, 100)}%` : '0%' }}
              ></div>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">
            Based on selected AI model and token usage.
          </p>
        </div>

        {hasResults && (
          <div className="animate-in fade-in duration-500">
            <ResultsSection
              emissions={emissions}
              tokens={parseInt(tokens) || 0}
              modelName={getSelectedModelName()}
              onReset={reset}
            />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { models } from '../components/ModelSelector';
import { regions } from '../components/RegionSelector';
import { units } from '../components/UnitSelector';

export const useCarbonCalculator = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [tokens, setTokens] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('us-average');
  const [selectedUnit, setSelectedUnit] = useState('grams');
  const [emissions, setEmissions] = useState(0);

  const calculateEmissions = () => {
    if (!selectedModel || !tokens || !selectedRegion) {
      setEmissions(0);
      return;
    }

    const model = models.find(m => m.id === selectedModel);
    const region = regions.find(r => r.id === selectedRegion);
    
    if (!model || !region) {
      setEmissions(0);
      return;
    }

    const tokenCount = parseInt(tokens);
    if (isNaN(tokenCount) || tokenCount <= 0) {
      setEmissions(0);
      return;
    }

    // Energy consumption per token (kWh)
    const energyPerToken = model.power / 1000; // Convert from per 1k tokens to per token
    
    // Total energy consumption (kWh)
    const totalEnergy = energyPerToken * tokenCount;
    
    // CO2 emissions (kg CO2e)
    const co2Kg = totalEnergy * region.co2Factor;
    
    // Convert to grams
    const co2Grams = co2Kg * 1000;
    
    setEmissions(co2Grams);
  };

  useEffect(() => {
    calculateEmissions();
  }, [selectedModel, tokens, selectedRegion, selectedUnit]);

  const reset = () => {
    setSelectedModel('');
    setTokens('');
    setSelectedRegion('us-average');
    setSelectedUnit('grams');
    setEmissions(0);
  };

  const getSelectedModelName = () => {
    const model = models.find(m => m.id === selectedModel);
    return model ? model.name : '';
  };

  const getFormattedEmissions = () => {
    const unit = units.find(u => u.id === selectedUnit);
    if (!unit) return '0';
    
    const convertedValue = emissions * unit.factor;
    
    // Format based on unit type
    if (selectedUnit === 'grams') {
      return convertedValue.toFixed(1);
    } else if (selectedUnit === 'kilograms') {
      return convertedValue.toFixed(3);
    } else { // metric-tons
      return convertedValue.toFixed(6);
    }
  };

  const getUnitLabel = () => {
    const unit = units.find(u => u.id === selectedUnit);
    if (!unit) return '';
    
    if (selectedUnit === 'grams') return 'gCO₂e';
    if (selectedUnit === 'kilograms') return 'kgCO₂e';
    return 'tCO₂e';
  };

  return {
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
    hasResults: selectedModel && tokens && parseFloat(tokens) > 0,
    getFormattedEmissions,
    getUnitLabel
  };
};
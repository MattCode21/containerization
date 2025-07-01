import React, { useState } from 'react';
import { Truck, Plus, Trash2, Zap } from 'lucide-react';
import LoadingAnimation from './LoadingAnimation';
import OptimizationResults from './OptimizationResults';

interface Props {
  darkMode: boolean;
}

interface CartonSize {
  id: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
}

interface FormData {
  palletLength: number;
  palletWidth: number;
  palletHeight: number;
  maxPalletWeight: number;
  unit: 'cm' | 'inch' | 'mm';
  cartonSizes: CartonSize[];
}

const PalletLoadingTab: React.FC<Props> = ({ darkMode }) => {
  const [formData, setFormData] = useState<FormData>({
    palletLength: 120,
    palletWidth: 80,
    palletHeight: 150,
    maxPalletWeight: 1000,
    unit: 'cm',
    cartonSizes: [{
      id: '1',
      length: 30,
      width: 20,
      height: 15,
      weight: 2.5,
      quantity: 10
    }]
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const addCartonSize = () => {
    const newCarton: CartonSize = {
      id: Date.now().toString(),
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      quantity: 1
    };
    setFormData(prev => ({
      ...prev,
      cartonSizes: [...prev.cartonSizes, newCarton]
    }));
  };

  const removeCartonSize = (id: string) => {
    setFormData(prev => ({
      ...prev,
      cartonSizes: prev.cartonSizes.filter(carton => carton.id !== id)
    }));
  };

  const updateCartonSize = (id: string, field: keyof CartonSize, value: any) => {
    setFormData(prev => ({
      ...prev,
      cartonSizes: prev.cartonSizes.map(carton =>
        carton.id === id ? { ...carton, [field]: value } : carton
      )
    }));
  };

  const handleOptimize = async () => {
    if (!formData.palletLength || !formData.palletWidth || !formData.palletHeight) {
      alert('Please fill in all pallet dimensions');
      return;
    }

    setIsProcessing(true);
    setShowAnimation(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 4000);
  };

  const cardClass = `backdrop-blur-lg border transition-all duration-300 rounded-2xl p-6 ${
    darkMode 
      ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
      : 'bg-white/70 border-gray-200 hover:bg-white/90'
  } shadow-xl hover:shadow-2xl`;

  return (
    <div className="space-y-6">
      {/* Pallet Specifications */}
      <div className={cardClass}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Pallet Specifications
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value as any }))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
              } focus:ring-2 focus:ring-orange-500/20`}
            >
              <option value="cm">Centimeters (cm)</option>
              <option value="inch">Inches (in)</option>
              <option value="mm">Millimeters (mm)</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Length ({formData.unit})
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.palletLength || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, palletLength: parseFloat(e.target.value) }))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
              } focus:ring-2 focus:ring-orange-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Width ({formData.unit})
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.palletWidth || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, palletWidth: parseFloat(e.target.value) }))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
              } focus:ring-2 focus:ring-orange-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Height ({formData.unit})
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.palletHeight || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, palletHeight: parseFloat(e.target.value) }))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
              } focus:ring-2 focus:ring-orange-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Max Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.maxPalletWeight || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, maxPalletWeight: parseFloat(e.target.value) }))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
              } focus:ring-2 focus:ring-orange-500/20`}
            />
          </div>
        </div>
      </div>

      {/* Master Carton Sizes */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Master Carton Sizes
          </h2>
          <button
            onClick={addCartonSize}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Add Size</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.cartonSizes.map((carton, index) => (
            <div key={carton.id} className={`p-4 rounded-xl border ${
              darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Carton Size {index + 1}
                </h3>
                {formData.cartonSizes.length > 1 && (
                  <button
                    onClick={() => removeCartonSize(carton.id)}
                    className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-6 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Length ({formData.unit})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={carton.length || ''}
                    onChange={(e) => updateCartonSize(carton.id, 'length', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Width ({formData.unit})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={carton.width || ''}
                    onChange={(e) => updateCartonSize(carton.id, 'width', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Height ({formData.unit})
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={carton.height || ''}
                    onChange={(e) => updateCartonSize(carton.id, 'height', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={carton.weight || ''}
                    onChange={(e) => updateCartonSize(carton.id, 'weight', parseFloat(e.target.value))}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={carton.quantity || ''}
                    onChange={(e) => updateCartonSize(carton.id, 'quantity', parseInt(e.target.value))}
                    className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimize Button */}
      <button
        onClick={handleOptimize}
        disabled={isProcessing}
        className={`w-full py-4 px-6 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl'
        } text-white flex items-center justify-center space-x-2`}
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Optimizing Pallet Loading...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            <span>Optimize Pallet Loading</span>
          </>
        )}
      </button>

      {/* Loading Animation */}
      {showAnimation && (
        <LoadingAnimation 
          darkMode={darkMode} 
          type="pallet"
          onComplete={() => setShowAnimation(false)}
        />
      )}

      {/* Results */}
      {showResults && (
        <OptimizationResults 
          darkMode={darkMode} 
          type="pallet"
          data={formData}
        />
      )}
    </div>
  );
};

export default PalletLoadingTab;
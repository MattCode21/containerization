import React, { useState } from 'react';
import { Container, Plus, Trash2, Zap } from 'lucide-react';
import LoadingAnimation from './LoadingAnimation';
import OptimizationResults from './OptimizationResults';

interface Props {
  darkMode: boolean;
  productType: 'tiles' | 'tools' | null;
}

interface PalletSize {
  id: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
}

interface FormData {
  containerType: '20ft' | '40ft';
  unit: 'cm' | 'inch' | 'mm';
  palletSizes: PalletSize[];
}

const containerSpecs = {
  '20ft': {
    length: 589,
    width: 235,
    height: 239,
    maxWeight: 28230,
    unit: 'cm'
  },
  '40ft': {
    length: 1201,
    width: 235,
    height: 239,
    maxWeight: 28790,
    unit: 'cm'
  }
};

const ContainerLoadingTab: React.FC<Props> = ({ darkMode, productType }) => {
  const [formData, setFormData] = useState<FormData>({
    containerType: '20ft',
    unit: 'cm',
    palletSizes: [{
      id: '1',
      length: 120,
      width: 80,
      height: 150,
      weight: 500,
      quantity: 5
    }]
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const addPalletSize = () => {
    const newPallet: PalletSize = {
      id: Date.now().toString(),
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      quantity: 1
    };
    setFormData(prev => ({
      ...prev,
      palletSizes: [...prev.palletSizes, newPallet]
    }));
  };

  const removePalletSize = (id: string) => {
    setFormData(prev => ({
      ...prev,
      palletSizes: prev.palletSizes.filter(pallet => pallet.id !== id)
    }));
  };

  const updatePalletSize = (id: string, field: keyof PalletSize, value: any) => {
    setFormData(prev => ({
      ...prev,
      palletSizes: prev.palletSizes.map(pallet =>
        pallet.id === id ? { ...pallet, [field]: value } : pallet
      )
    }));
  };

  const handleOptimize = async () => {
    if (formData.palletSizes.length === 0) {
      alert('Please add at least one pallet size');
      return;
    }

    setIsProcessing(true);
    setShowAnimation(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 4000);
  };

  const containerSpec = containerSpecs[formData.containerType];

  const cardClass = `backdrop-blur-lg border transition-all duration-300 rounded-2xl p-6 ${
    darkMode 
      ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
      : 'bg-white/70 border-gray-200 hover:bg-white/90'
  } shadow-xl hover:shadow-2xl`;

  return (
    <div className="space-y-6">
      {/* Container Specifications */}
      <div className={cardClass}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-500 rounded-lg">
            <Container className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Container Specifications
          </h2>
          {productType && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              productType === 'tiles' 
                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
            }`}>
              {productType.toUpperCase()} MODE
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Container Type
            </label>
            <select
              value={formData.containerType}
              onChange={(e) => setFormData(prev => ({ ...prev, containerType: e.target.value as any }))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
              } focus:ring-2 focus:ring-purple-500/20`}
            >
              <option value="20ft">20ft Container</option>
              <option value="40ft">40ft Container</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Measurement Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value as any }))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
              } focus:ring-2 focus:ring-purple-500/20`}
            >
              <option value="cm">Centimeters (cm)</option>
              <option value="inch">Inches (in)</option>
              <option value="mm">Millimeters (mm)</option>
            </select>
          </div>
        </div>

        {/* Container Info Display */}
        <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
          <h3 className={`font-medium mb-3 ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>
            {formData.containerType} Container Dimensions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Length:</span>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {containerSpec.length} cm
              </div>
            </div>
            <div>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Width:</span>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {containerSpec.width} cm
              </div>
            </div>
            <div>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Height:</span>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {containerSpec.height} cm
              </div>
            </div>
            <div>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Max Weight:</span>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {containerSpec.maxWeight.toLocaleString()} kg
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pallet Sizes */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Pallet Specifications
          </h2>
          <button
            onClick={addPalletSize}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pallet</span>
          </button>
        </div>

        <div className="space-y-4">
          {formData.palletSizes.map((pallet, index) => (
            <div key={pallet.id} className={`p-4 rounded-xl border ${
              darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Pallet Type {index + 1}
                </h3>
                {formData.palletSizes.length > 1 && (
                  <button
                    onClick={() => removePalletSize(pallet.id)}
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
                    value={pallet.length || ''}
                    onChange={(e) => updatePalletSize(pallet.id, 'length', parseFloat(e.target.value))}
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
                    value={pallet.width || ''}
                    onChange={(e) => updatePalletSize(pallet.id, 'width', parseFloat(e.target.value))}
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
                    value={pallet.height || ''}
                    onChange={(e) => updatePalletSize(pallet.id, 'height', parseFloat(e.target.value))}
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
                    step="0.1"
                    value={pallet.weight || ''}
                    onChange={(e) => updatePalletSize(pallet.id, 'weight', parseFloat(e.target.value))}
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
                    value={pallet.quantity || ''}
                    onChange={(e) => updatePalletSize(pallet.id, 'quantity', parseInt(e.target.value))}
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
            : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
        } text-white flex items-center justify-center space-x-2`}
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Optimizing Container Loading...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            <span>Optimize Container Loading</span>
          </>
        )}
      </button>

      {/* Loading Animation */}
      {showAnimation && (
        <LoadingAnimation 
          darkMode={darkMode} 
          type="container"
          productType={productType}
          onComplete={() => setShowAnimation(false)}
        />
      )}

      {/* Results */}
      {showResults && (
        <OptimizationResults 
          darkMode={darkMode} 
          type="container"
        productType={productType}
          data={formData}
        />
      )}
    </div>
  );
};

export default ContainerLoadingTab;
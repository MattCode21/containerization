import React, { useState, useRef } from 'react';
import { Upload, Package, Weight, Ruler, Play, BarChart3, Zap } from 'lucide-react';
import ImageUpload from './ImageUpload';
import LoadingAnimation from './LoadingAnimation';
import OptimizationResults from './OptimizationResults';

interface Props {
  darkMode: boolean;
  productType: 'tiles' | 'tools' | null;
}

interface FormData {
  productImage: File | null;
  cartonLength: number;
  cartonWidth: number;
  cartonHeight: number;
  productWeight: number;
  maxCartonWeight: number;
  unit: 'cm' | 'inch' | 'mm';
}

const MasterCartonTab: React.FC<Props> = ({ darkMode, productType }) => {
  const [formData, setFormData] = useState<FormData>({
    productImage: null,
    cartonLength: 0,
    cartonWidth: 0,
    cartonHeight: 0,
    productWeight: 0,
    maxCartonWeight: 0,
    unit: 'cm'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptimize = async () => {
    if (!formData.productImage || !formData.cartonLength || !formData.cartonWidth || !formData.cartonHeight) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    setShowAnimation(true);
    
    // Simulate processing time
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
      {/* Product Image Upload */}
      <div className={cardClass}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Product Image Upload
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
        <ImageUpload 
          darkMode={darkMode} 
          onImageSelect={(file) => handleInputChange('productImage', file)}
          productType={productType}
        />
      </div>

      {/* Master Carton Specifications */}
      <div className={cardClass}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-500 rounded-lg">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Master Carton Specifications
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20`}
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
              value={formData.cartonLength || ''}
              onChange={(e) => handleInputChange('cartonLength', parseFloat(e.target.value))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Enter length"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Width ({formData.unit})
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.cartonWidth || ''}
              onChange={(e) => handleInputChange('cartonWidth', parseFloat(e.target.value))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Enter width"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Height ({formData.unit})
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.cartonHeight || ''}
              onChange={(e) => handleInputChange('cartonHeight', parseFloat(e.target.value))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Enter height"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Product Weight (kg)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.productWeight || ''}
              onChange={(e) => handleInputChange('productWeight', parseFloat(e.target.value))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Enter product weight"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Maximum Carton Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.maxCartonWeight || ''}
              onChange={(e) => handleInputChange('maxCartonWeight', parseFloat(e.target.value))}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-500/20`}
              placeholder="Enter max weight"
            />
          </div>
        </div>
      </div>

      {/* Optimize Button */}
      <button
        onClick={handleOptimize}
        disabled={isProcessing}
        className={`w-full py-4 px-6 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
        } text-white flex items-center justify-center space-x-2`}
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Optimizing...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            <span>Start 3D Optimization</span>
          </>
        )}
      </button>

      {/* Loading Animation */}
      {showAnimation && (
        <LoadingAnimation 
          darkMode={darkMode} 
          type="master-carton"
          productType={productType}
          onComplete={() => setShowAnimation(false)}
        />
      )}

      {/* Results */}
      {showResults && (
        <OptimizationResults 
          darkMode={darkMode} 
          type="master-carton"
          productType={productType}
          data={formData}
        />
      )}
    </div>
  );
};

export default MasterCartonTab;
import React from 'react';
import { BarChart3, Package, TrendingUp, Lightbulb, Download, Share2 } from 'lucide-react';

interface Props {
  darkMode: boolean;
  type: 'master-carton' | 'pallet' | 'container';
  data: any;
}

const OptimizationResults: React.FC<Props> = ({ darkMode, type, data }) => {
  const results = {
    'master-carton': {
      itemsLoaded: 48,
      spaceUtilized: 92,
      weightEfficiency: 87,
      volume: 15.6,
      recommendations: [
        'Consider rotating products 90° for 3% better space utilization',
        'Current arrangement optimizes both space and weight constraints',
        'Alternative stacking pattern could fit 2 additional items'
      ]
    },
    'pallet': {
      itemsLoaded: 24,
      spaceUtilized: 89,
      weightEfficiency: 91,
      volume: 85.2,
      recommendations: [
        'Mixed orientation stacking increases efficiency by 8%',
        'Add 2 more cartons in vertical space for optimal loading',
        'Weight distribution is excellent across pallet surface'
      ]
    },
    'container': {
      itemsLoaded: 18,
      spaceUtilized: 94,
      weightEfficiency: 88,
      volume: 156.8,
      recommendations: [
        'Near-optimal loading achieved with current configuration',
        'Consider smaller pallets to fill remaining 6% space',
        'Loading sequence optimized for easy unloading access'
      ]
    }
  };

  const result = results[type];

  const cardClass = `backdrop-blur-lg border transition-all duration-300 rounded-2xl p-6 ${
    darkMode 
      ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
      : 'bg-white/70 border-gray-200 hover:bg-white/90'
  } shadow-xl hover:shadow-2xl`;

  return (
    <div className="space-y-6">
      {/* Final 3D Visualization */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Final 3D Layout
          </h3>
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded-lg transition-all duration-300 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <Download className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>
            <button className={`p-2 rounded-lg transition-all duration-300 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              <Share2 className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            </button>
          </div>
        </div>

        {/* 3D Result Visualization */}
        <div className={`relative rounded-xl overflow-hidden ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        } h-96 mb-6`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-60 transform-gpu">
              {/* Container */}
              <div className={`absolute inset-0 border-2 ${
                darkMode ? 'border-gray-600' : 'border-gray-400'
              } transform perspective-1000 rotateX-15 rotateY-15 shadow-2xl`} />
              
              {/* Optimally placed items */}
              {Array.from({ length: result.itemsLoaded }).map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const layer = Math.floor(i / 32);
                
                return (
                  <div
                    key={i}
                    className={`absolute rounded-sm shadow-lg transition-all duration-300 hover:scale-110 ${
                      type === 'master-carton' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                      type === 'pallet' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                      'bg-gradient-to-br from-purple-400 to-purple-600'
                    }`}
                    style={{
                      width: `${Math.max(6, 12 - layer)}px`,
                      height: `${Math.max(6, 12 - layer)}px`,
                      left: `${col * 9 + 10 + layer * 2}%`,
                      top: `${row * 12 + 15 + layer * 3}%`,
                      transform: `translateZ(${layer * 8}px) scale(${1 - layer * 0.1})`,
                      opacity: 0.9 - layer * 0.1
                    }}
                  />
                );
              })}
              
              {/* Axis labels */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                Length
              </div>
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500">
                Width
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <div className={`text-2xl font-bold ${
              type === 'master-carton' ? 'text-blue-500' :
              type === 'pallet' ? 'text-orange-500' : 'text-purple-500'
            }`}>
              {result.itemsLoaded}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Items Loaded
            </div>
          </div>

          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <div className="text-2xl font-bold text-green-500">
              {result.spaceUtilized}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Space Utilized
            </div>
          </div>

          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <div className="text-2xl font-bold text-yellow-500">
              {result.weightEfficiency}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Weight Efficiency
            </div>
          </div>

          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {result.volume}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Volume
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Utilization Chart */}
        <div className={cardClass}>
          <div className="flex items-center space-x-3 mb-6">
            <div className={`p-2 rounded-lg ${
              type === 'master-carton' ? 'bg-blue-500' :
              type === 'pallet' ? 'bg-orange-500' : 'bg-purple-500'
            }`}>
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Utilization Analysis
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Space Utilization
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {result.spaceUtilized}%
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-600"
                  style={{ width: `${result.spaceUtilized}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Weight Efficiency
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {result.weightEfficiency}%
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600"
                  style={{ width: `${result.weightEfficiency}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Overall Optimization
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {Math.round((result.spaceUtilized + result.weightEfficiency) / 2)}%
                </span>
              </div>
              <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className={`h-2 rounded-full ${
                    type === 'master-carton' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                    type === 'pallet' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    'bg-gradient-to-r from-purple-500 to-purple-600'
                  }`}
                  style={{ width: `${Math.round((result.spaceUtilized + result.weightEfficiency) / 2)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className={cardClass}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Optimization Tips
            </h3>
          </div>

          <div className="space-y-3">
            {result.recommendations.map((tip, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                darkMode 
                  ? 'bg-purple-500/10 border-purple-400' 
                  : 'bg-purple-50 border-purple-500'
              }`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {tip}
                </p>
              </div>
            ))}
          </div>

          <div className={`mt-6 p-4 rounded-xl ${
            darkMode ? 'bg-green-500/20' : 'bg-green-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                Optimization Score
              </span>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {Math.round((result.spaceUtilized + result.weightEfficiency) / 2)}/100
            </p>
            <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
              Excellent optimization achieved!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationResults;
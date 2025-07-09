import React, { useState } from 'react';
import { BarChart3, Package, TrendingUp, Lightbulb, Download, Share2, Image, RotateCcw } from 'lucide-react';

interface Props {
  darkMode: boolean;
  type: 'master-carton' | 'pallet' | 'container';
  productType?: 'tiles' | 'tools' | null;
  data: any;
}

const OptimizationResults: React.FC<Props> = ({ darkMode, type, productType, data }) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [viewAngle, setViewAngle] = useState({ rotateX: 15, rotateY: 15 });

  // Aesthetic background images from Pexels
  const backgroundImages = [
    'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  ];

  const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  };

  const rotateView = () => {
    setViewAngle(prev => ({
      rotateX: (prev.rotateX + 30) % 360,
      rotateY: (prev.rotateY + 45) % 360
    }));
  };

  const results = {
    'master-carton': {
      itemsLoaded: productType === 'tiles' ? 36 : 48,
      spaceUtilized: productType === 'tiles' ? 88 : 92,
      weightEfficiency: productType === 'tiles' ? 91 : 87,
      volume: 15.6,
      recommendations: [
        productType === 'tiles' 
          ? 'Vertical stacking optimized for tile stability and protection'
          : 'Consider rotating products 90° for 3% better space utilization',
        `Current arrangement optimizes both space and weight constraints for ${productType || 'products'}`,
        productType === 'tiles'
          ? 'Tile arrangement prevents damage during transport'
          : 'Alternative stacking pattern could fit 2 additional items'
      ]
    },
    'pallet': {
      itemsLoaded: productType === 'tiles' ? 20 : 24,
      spaceUtilized: productType === 'tiles' ? 85 : 89,
      weightEfficiency: productType === 'tiles' ? 94 : 91,
      volume: 85.2,
      recommendations: [
        productType === 'tiles'
          ? 'Vertical-only stacking ensures tile integrity during transport'
          : 'Mixed orientation stacking increases efficiency by 8%',
        productType === 'tiles'
          ? 'Optimal vertical arrangement achieved within height constraints'
          : 'Add 2 more cartons in vertical space for optimal loading',
        `Weight distribution is excellent across pallet surface for ${productType || 'products'}`
      ]
    },
    'container': {
      itemsLoaded: productType === 'tiles' ? 16 : 18,
      spaceUtilized: productType === 'tiles' ? 91 : 94,
      weightEfficiency: productType === 'tiles' ? 89 : 88,
      volume: 156.8,
      recommendations: [
        productType === 'tiles'
          ? 'Vertical stacking maximizes container utilization for tiles'
          : 'Near-optimal loading achieved with current configuration',
        productType === 'tiles'
          ? 'Tile protection maintained throughout loading process'
          : 'Consider smaller pallets to fill remaining 6% space',
        `Loading sequence optimized for easy unloading access for ${productType || 'products'}`
      ]
    }
  };

  const result = results[type];

  // Generate realistic box positions for final layout
  const generateBoxes = () => {
    const boxes = [];
    const totalBoxes = result.itemsLoaded;
    
    for (let i = 0; i < totalBoxes; i++) {
      const layer = Math.floor(i / 16);
      const row = Math.floor((i % 16) / 4);
      const col = i % 4;
      
      // Different arrangements for tiles vs tools
      if (productType === 'tiles') {
        // Tiles: More uniform, vertical arrangement
        boxes.push({
          id: i,
          x: col * 18 + 15,
          y: row * 20 + 25,
          z: layer * 12 + 5,
          width: 15,
          height: 18,
          depth: 12,
          color: '#F97316',
          rotation: 0
        });
      } else {
        // Tools: Mixed orientations and sizes
        const orientations = [0, 90, 180];
        const rotation = orientations[i % 3];
        boxes.push({
          id: i,
          x: col * 16 + 12 + (Math.random() - 0.5) * 4,
          y: row * 18 + 20 + (Math.random() - 0.5) * 4,
          z: layer * 10 + 3,
          width: 12 + Math.random() * 6,
          height: 14 + Math.random() * 8,
          depth: 10 + Math.random() * 4,
          color: '#10B981',
          rotation
        });
      }
    }
    return boxes;
  };

  const boxes = generateBoxes();

  const cardClass = `backdrop-blur-lg border transition-all duration-300 rounded-2xl p-6 ${
    darkMode 
      ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
      : 'bg-white/70 border-gray-200 hover:bg-white/90'
  } shadow-xl hover:shadow-2xl`;

  return (
    <div className="space-y-6">
      {/* Enhanced Final 3D Visualization */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Final 3D Layout - {productType?.toUpperCase() || 'OPTIMIZED'} MODE
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={getRandomBackground}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-purple-500 hover:bg-purple-600'
              } text-white`}
              title="Change Background"
            >
              <Image className="w-4 h-4" />
            </button>
            <button
              onClick={rotateView}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
              title="Rotate View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
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

        {/* Enhanced 3D Result Visualization */}
        <div className={`relative rounded-xl overflow-hidden ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        } h-[500px] mb-6`}>
          {/* Background Image */}
          {backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-96 h-80" style={{ perspective: '1200px' }}>
              {/* Enhanced Container with realistic depth */}
              <div 
                className={`absolute border-3 ${
                  darkMode ? 'border-gray-400' : 'border-gray-600'
                } bg-gradient-to-br ${
                  darkMode ? 'from-gray-800/10 to-gray-700/10' : 'from-gray-100/10 to-gray-200/10'
                } shadow-2xl`}
                style={{
                  width: '320px',
                  height: '240px',
                  left: '20px',
                  top: '20px',
                  transform: `rotateX(${viewAngle.rotateX}deg) rotateY(${viewAngle.rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {/* Container floor with grid pattern */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-3 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-400'
                  } opacity-60`}
                  style={{ 
                    transform: 'rotateX(90deg) translateZ(1.5px)',
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)'
                  }}
                />
                
                {/* Container back wall */}
                <div 
                  className={`absolute top-0 bottom-0 right-0 w-3 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-400'
                  } opacity-40`}
                  style={{ transform: 'rotateY(90deg) translateZ(1.5px)' }}
                />
                
                {/* Container left wall */}
                <div 
                  className={`absolute top-0 bottom-0 left-0 w-3 ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-400'
                  } opacity-30`}
                  style={{ transform: 'rotateY(-90deg) translateZ(1.5px)' }}
                />
              </div>
              
              {/* Realistic 3D Boxes with enhanced details */}
              {boxes.map((box, index) => (
                <div
                  key={box.id}
                  className="absolute transition-all duration-700 ease-out hover:scale-110 cursor-pointer"
                  style={{
                    left: `${box.x}px`,
                    top: `${box.y}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                    transform: `rotateX(${viewAngle.rotateX}deg) rotateY(${viewAngle.rotateY + box.rotation}deg) translateZ(${box.z}px)`,
                    transformStyle: 'preserve-3d',
                    opacity: 0.9,
                    animation: `boxFinalAppear 0.8s ease-out ${index * 0.05}s both`,
                    transition: 'transform 0.5s ease-in-out'
                  }}
                >
                  {/* Box Front Face with enhanced styling */}
                  <div
                    className="absolute inset-0 border border-gray-800/30 shadow-xl"
                    style={{
                      backgroundColor: box.color,
                      background: `linear-gradient(135deg, ${box.color} 0%, ${box.color}dd 50%, ${box.color}bb 100%)`,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                    }}
                  />
                  
                  {/* Box Top Face with lighting effect */}
                  <div
                    className="absolute border border-gray-800/30"
                    style={{
                      width: `${box.width}px`,
                      height: `${box.depth}px`,
                      backgroundColor: box.color,
                      background: `linear-gradient(45deg, ${box.color}ee 0%, ${box.color}cc 50%, ${box.color}aa 100%)`,
                      transform: `rotateX(90deg) translateZ(${box.height}px)`,
                      transformOrigin: 'top',
                      boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1)'
                    }}
                  />
                  
                  {/* Box Right Face with shadow */}
                  <div
                    className="absolute border border-gray-800/30"
                    style={{
                      width: `${box.depth}px`,
                      height: `${box.height}px`,
                      backgroundColor: box.color,
                      background: `linear-gradient(45deg, ${box.color}cc 0%, ${box.color}99 50%, ${box.color}77 100%)`,
                      transform: `rotateY(90deg) translateZ(${box.width}px)`,
                      transformOrigin: 'right'
                    }}
                  />
                  
                  {/* Enhanced Box Label/Texture */}
                  <div 
                    className="absolute inset-1 flex flex-col items-center justify-center text-white text-xs font-bold opacity-90"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                  >
                    <div className="text-lg mb-1">
                      {productType === 'tiles' ? '🔲' : productType === 'tools' ? '🔧' : '📦'}
                    </div>
                    <div className="text-[8px] opacity-75">
                      {box.id + 1}
                    </div>
                  </div>
                  
                  {/* Box edge highlights */}
                  <div 
                    className="absolute inset-0 border border-white/20 pointer-events-none"
                    style={{ 
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)'
                    }}
                  />
                </div>
              ))}
              
              {/* Ambient lighting effect */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  transform: `rotateX(${viewAngle.rotateX}deg) rotateY(${viewAngle.rotateY}deg)`
                }}
              />
            </div>
          </div>
          
          {/* View controls overlay */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              productType === 'tiles' 
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : productType === 'tools'
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}>
              {result.itemsLoaded} items loaded
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              darkMode ? 'bg-gray-700/80 text-gray-300' : 'bg-white/80 text-gray-700'
            }`}>
              {result.spaceUtilized}% space utilized
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          } hover:scale-105 transition-transform`}>
            <div className={`text-3xl font-bold ${
              type === 'master-carton' ? 'text-blue-500' :
              type === 'pallet' ? 'text-orange-500' : 'text-purple-500'
            }`}>
              {result.itemsLoaded}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Items Loaded
            </div>
            {productType && (
              <div className={`text-xs mt-1 ${
                productType === 'tiles' ? 'text-orange-400' : 'text-green-400'
              }`}>
                {productType} mode
              </div>
            )}
          </div>

          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          } hover:scale-105 transition-transform`}>
            <div className="text-3xl font-bold text-green-500">
              {result.spaceUtilized}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Space Utilized
            </div>
          </div>

          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          } hover:scale-105 transition-transform`}>
            <div className="text-3xl font-bold text-yellow-500">
              {result.weightEfficiency}%
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Weight Efficiency
            </div>
          </div>

          <div className={`text-center p-4 rounded-xl ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
          } hover:scale-105 transition-transform`}>
            <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
              <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000 shadow-lg"
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
              <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all duration-1000 shadow-lg"
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
              <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <div
                  className={`h-3 rounded-full transition-all duration-1000 shadow-lg ${
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
              <div key={index} className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:scale-[1.02] ${
                darkMode 
                  ? 'bg-purple-500/10 border-purple-400 hover:bg-purple-500/20' 
                  : 'bg-purple-50 border-purple-500 hover:bg-purple-100'
              }`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {tip}
                </p>
              </div>
            ))}
          </div>

          <div className={`mt-6 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
            darkMode ? 'bg-green-500/20' : 'bg-green-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                Optimization Score
              </span>
            </div>
            <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {Math.round((result.spaceUtilized + result.weightEfficiency) / 2)}/100
            </p>
            <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
              {productType === 'tiles' ? 'Excellent tile protection achieved!' : 
               productType === 'tools' ? 'Optimal mixed-orientation packing!' : 
               'Excellent optimization achieved!'}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes boxFinalAppear {
          0% {
            opacity: 0;
            transform: rotateX(${viewAngle.rotateX}deg) rotateY(${viewAngle.rotateY}deg) translateZ(0px) scale(0.5);
          }
          100% {
            opacity: 0.9;
            transform: rotateX(${viewAngle.rotateX}deg) rotateY(${viewAngle.rotateY}deg) translateZ(var(--z)) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizationResults;
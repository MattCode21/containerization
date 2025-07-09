import React, { useState } from 'react';
import { BarChart3, Package, TrendingUp, Lightbulb, Download, Share2, Image, RotateCcw } from 'lucide-react';

interface Props {
  darkMode: boolean;
  type: 'master-carton' | 'pallet' | 'container';
  productType?: 'tiles' | 'tools' | null;
  data: any;
}

interface Box {
  id: number;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  opacity: number;
}

const OptimizationResults: React.FC<Props> = ({ darkMode, type, productType, data }) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [viewAngle, setViewAngle] = useState({ rotateX: 20, rotateY: 45 });

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
          ? 'Grid-based vertical stacking optimized for tile stability'
          : 'Mixed orientation packing achieved 92% space utilization',
        `Current arrangement optimizes both space and weight constraints for ${productType || 'products'}`,
        productType === 'tiles'
          ? 'Uniform grid pattern prevents damage during transport'
          : 'Alternative orientations could fit 2 additional items'
      ]
    },
    'pallet': {
      itemsLoaded: productType === 'tiles' ? 20 : 24,
      spaceUtilized: productType === 'tiles' ? 85 : 89,
      weightEfficiency: productType === 'tiles' ? 94 : 91,
      volume: 85.2,
      recommendations: [
        productType === 'tiles'
          ? 'Grid-based stacking ensures tile integrity during transport'
          : 'Mixed orientation stacking increases efficiency by 8%',
        productType === 'tiles'
          ? 'Optimal grid arrangement achieved within height constraints'
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
          ? 'Grid stacking maximizes container utilization for tiles'
          : 'Near-optimal bin packing achieved with current configuration',
        productType === 'tiles'
          ? 'Tile protection maintained throughout loading process'
          : 'Consider smaller pallets to fill remaining 6% space',
        `Loading sequence optimized for easy unloading access for ${productType || 'products'}`
      ]
    }
  };

  const result = results[type];

  // Generate final optimized layout
  const generateFinalLayout = (): Box[] => {
    const boxes: Box[] = [];
    const containerWidth = 320;
    const containerHeight = 240;
    const containerDepth = 180;
    
    if (productType === 'tiles') {
      // Grid-based final layout for tiles
      const boxWidth = 20;
      const boxHeight = 25;
      const boxDepth = 15;
      
      const cols = Math.floor(containerWidth / boxWidth);
      const rows = Math.floor(containerDepth / boxDepth);
      const layers = Math.floor(containerHeight / boxHeight);
      
      let id = 0;
      for (let layer = 0; layer < layers && id < result.itemsLoaded; layer++) {
        for (let row = 0; row < rows && id < result.itemsLoaded; row++) {
          for (let col = 0; col < cols && id < result.itemsLoaded; col++) {
            boxes.push({
              id: id++,
              x: col * boxWidth,
              y: layer * boxHeight,
              z: row * boxDepth,
              width: boxWidth,
              height: boxHeight,
              depth: boxDepth,
              color: '#F97316',
              opacity: 0.8
            });
          }
        }
      }
    } else {
      // Mixed orientation final layout for tools
      const orientations = [
        { w: 18, h: 22, d: 12, color: '#10B981' },
        { w: 22, h: 18, d: 12, color: '#3B82F6' },
        { w: 15, h: 20, d: 18, color: '#8B5CF6' },
        { w: 20, h: 15, d: 18, color: '#F59E0B' },
        { w: 25, h: 16, d: 10, color: '#EF4444' }
      ];
      
      let id = 0;
      let x = 0, y = 0, z = 0;
      
      while (id < result.itemsLoaded) {
        const orientation = orientations[id % orientations.length];
        
        if (x + orientation.w <= containerWidth && 
            y + orientation.h <= containerHeight && 
            z + orientation.d <= containerDepth) {
          
          boxes.push({
            id: id++,
            x: x,
            y: y,
            z: z,
            width: orientation.w,
            height: orientation.h,
            depth: orientation.d,
            color: orientation.color,
            opacity: 0.8
          });
          
          x += orientation.w;
          if (x >= containerWidth - 15) {
            x = 0;
            z += orientation.d;
            if (z >= containerDepth - 15) {
              z = 0;
              y += orientation.h;
              if (y >= containerHeight - 15) break;
            }
          }
        } else {
          x = 0;
          z += 15;
          if (z >= containerDepth - 15) {
            z = 0;
            y += 20;
            if (y >= containerHeight - 15) break;
          }
        }
      }
    }
    
    return boxes;
  };

  const finalBoxes = generateFinalLayout();

  const cardClass = `backdrop-blur-lg border transition-all duration-300 rounded-2xl p-6 ${
    darkMode 
      ? 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50' 
      : 'bg-white/70 border-gray-200 hover:bg-white/90'
  } shadow-xl hover:shadow-2xl`;

  return (
    <div className="space-y-6">
      {/* Final 3D Bin Packing Visualization */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Final 3D Bin Packing Result - {productType?.toUpperCase() || 'OPTIMIZED'} MODE
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

        {/* 3D Bin Packing Result Visualization */}
        <div className={`relative rounded-xl overflow-hidden ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        } h-[600px] mb-6`}>
          {/* Background Image */}
          {backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `rotateX(${viewAngle.rotateX}deg) rotateY(${viewAngle.rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {/* Container wireframe */}
                <div className="relative" style={{ 
                  width: '320px', 
                  height: '240px',
                  transformStyle: 'preserve-3d'
                }}>
                  {/* Container edges */}
                  {[
                    // Bottom rectangle
                    { from: [0, 240, 0], to: [320, 240, 0] },
                    { from: [0, 240, 0], to: [0, 240, 180] },
                    { from: [320, 240, 0], to: [320, 240, 180] },
                    { from: [0, 240, 180], to: [320, 240, 180] },
                    // Top rectangle
                    { from: [0, 0, 0], to: [320, 0, 0] },
                    { from: [0, 0, 0], to: [0, 0, 180] },
                    { from: [320, 0, 0], to: [320, 0, 180] },
                    { from: [0, 0, 180], to: [320, 0, 180] },
                    // Vertical edges
                    { from: [0, 0, 0], to: [0, 240, 0] },
                    { from: [320, 0, 0], to: [320, 240, 0] },
                    { from: [0, 0, 180], to: [0, 240, 180] },
                    { from: [320, 0, 180], to: [320, 240, 180] }
                  ].map((edge, i) => (
                    <div
                      key={i}
                      className={`absolute ${darkMode ? 'bg-gray-300' : 'bg-gray-700'}`}
                      style={{
                        width: Math.sqrt(
                          Math.pow(edge.to[0] - edge.from[0], 2) + 
                          Math.pow(edge.to[1] - edge.from[1], 2) + 
                          Math.pow(edge.to[2] - edge.from[2], 2)
                        ) + 'px',
                        height: '3px',
                        left: edge.from[0] + 'px',
                        top: edge.from[1] + 'px',
                        transform: `translateZ(${edge.from[2]}px) rotateY(${
                          Math.atan2(edge.to[2] - edge.from[2], edge.to[0] - edge.from[0]) * 180 / Math.PI
                        }deg) rotateX(${
                          -Math.atan2(edge.to[1] - edge.from[1], 
                          Math.sqrt(Math.pow(edge.to[0] - edge.from[0], 2) + Math.pow(edge.to[2] - edge.from[2], 2))) * 180 / Math.PI
                        }deg)`,
                        transformOrigin: 'left center',
                        opacity: 0.8
                      }}
                    />
                  ))}

                  {/* Individual boxes with proper wireframes */}
                  {finalBoxes.map((box, index) => (
                    <div
                      key={box.id}
                      className="absolute hover:scale-105 transition-transform cursor-pointer"
                      style={{
                        left: `${box.x}px`,
                        top: `${box.y}px`,
                        width: `${box.width}px`,
                        height: `${box.height}px`,
                        transform: `translateZ(${box.z}px)`,
                        transformStyle: 'preserve-3d',
                        animation: `boxFinalAppear 0.8s ease-out ${index * 0.02}s both`
                      }}
                    >
                      {/* Box faces with proper coloring */}
                      {/* Front face */}
                      <div
                        className="absolute inset-0 border-2 border-gray-900"
                        style={{
                          backgroundColor: box.color,
                          opacity: box.opacity,
                          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                        }}
                      />
                      
                      {/* Top face */}
                      <div
                        className="absolute border-2 border-gray-900"
                        style={{
                          width: `${box.width}px`,
                          height: `${box.depth}px`,
                          backgroundColor: box.color,
                          opacity: box.opacity * 0.9,
                          transform: `rotateX(90deg) translateZ(${box.height}px)`,
                          transformOrigin: 'top',
                          filter: 'brightness(1.1)'
                        }}
                      />
                      
                      {/* Right face */}
                      <div
                        className="absolute border-2 border-gray-900"
                        style={{
                          width: `${box.depth}px`,
                          height: `${box.height}px`,
                          backgroundColor: box.color,
                          opacity: box.opacity * 0.7,
                          transform: `rotateY(90deg) translateZ(${box.width}px)`,
                          transformOrigin: 'right',
                          filter: 'brightness(0.8)'
                        }}
                      />

                      {/* Box label */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold pointer-events-none"
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
                      >
                        <div className="text-center">
                          <div className="text-sm mb-1">
                            {productType === 'tiles' ? '🔲' : '🔧'}
                          </div>
                          <div className="text-[10px] opacity-75">
                            {box.id + 1}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Info overlay */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              productType === 'tiles' 
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : productType === 'tools'
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}>
              {result.itemsLoaded} boxes packed
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              darkMode ? 'bg-gray-700/80 text-gray-300' : 'bg-white/80 text-gray-700'
            }`}>
              {result.spaceUtilized}% space utilized
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              darkMode ? 'bg-gray-700/80 text-gray-300' : 'bg-white/80 text-gray-700'
            }`}>
              {productType === 'tiles' ? 'Grid Method' : 'Mixed Orientation'}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
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
              Bin Packing Analysis
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
              AI Optimization Analysis
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
                Bin Packing Score
              </span>
            </div>
            <p className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {Math.round((result.spaceUtilized + result.weightEfficiency) / 2)}/100
            </p>
            <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
              {productType === 'tiles' ? 'Excellent grid-based packing achieved!' : 
               productType === 'tools' ? 'Optimal mixed-orientation bin packing!' : 
               'Excellent 3D bin packing optimization!'}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes boxFinalAppear {
          0% {
            opacity: 0;
            transform: translateZ(0px) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translateZ(var(--z)) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizationResults;
import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Image } from 'lucide-react';

interface Props {
  darkMode: boolean;
  type: 'master-carton' | 'pallet' | 'container';
  productType?: 'tiles' | 'tools' | null;
  onComplete: () => void;
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

const LoadingAnimation: React.FC<Props> = ({ darkMode, type, productType, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [placedBoxes, setPlacedBoxes] = useState<Box[]>([]);
  const [viewAngle, setViewAngle] = useState({ rotateX: 20, rotateY: 45 });

  // Aesthetic background images from Pexels
  const backgroundImages = [
    'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
  ];

  const steps = {
    'master-carton': [
      `Analyzing ${productType || 'product'} dimensions...`,
      `Calculating optimal ${productType || 'product'} arrangement...`,
      `Simulating 3D stacking patterns${productType === 'tiles' ? ' (vertical only)' : productType === 'tools' ? ' (mixed orientations)' : ''}...`,
      'Validating weight constraints...',
      'Generating final layout...'
    ],
    'pallet': [
      'Processing carton specifications...',
      `Optimizing pallet space utilization${productType === 'tiles' ? ' (vertical constraints)' : ''}...`,
      `Testing ${productType === 'tiles' ? 'vertical' : 'multiple'} arrangement patterns...`,
      'Calculating weight distribution...',
      'Finalizing optimal configuration...'
    ],
    'container': [
      'Analyzing pallet configurations...',
      'Optimizing container space usage...',
      'Simulating loading sequences...',
      'Validating weight limits...',
      'Generating loading plan...'
    ]
  };

  // Generate realistic 3D bin packing layout
  const generateBinPackingLayout = () => {
    const boxes: Box[] = [];
    const containerWidth = 280;
    const containerHeight = 200;
    const containerDepth = 160;
    
    // Different packing strategies based on product type
    if (productType === 'tiles') {
      // Grid-based packing for tiles (vertical only)
      const boxWidth = 20;
      const boxHeight = 25;
      const boxDepth = 15;
      
      const cols = Math.floor(containerWidth / boxWidth);
      const rows = Math.floor(containerDepth / boxDepth);
      const layers = Math.floor(containerHeight / boxHeight);
      
      let id = 0;
      for (let layer = 0; layer < layers && id < 50; layer++) {
        for (let row = 0; row < rows && id < 50; row++) {
          for (let col = 0; col < cols && id < 50; col++) {
            boxes.push({
              id: id++,
              x: col * boxWidth,
              y: layer * boxHeight,
              z: row * boxDepth,
              width: boxWidth,
              height: boxHeight,
              depth: boxDepth,
              color: '#F97316',
              opacity: 0.7
            });
          }
        }
      }
    } else {
      // Mixed orientation packing for tools
      const orientations = [
        { w: 18, h: 22, d: 12 },
        { w: 22, h: 18, d: 12 },
        { w: 15, h: 20, d: 18 },
        { w: 20, h: 15, d: 18 },
        { w: 25, h: 16, d: 10 }
      ];
      
      let id = 0;
      let x = 0, y = 0, z = 0;
      
      // Simulate bin packing algorithm
      while (id < 60) {
        const orientation = orientations[id % orientations.length];
        
        // Check if box fits in current position
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
            color: '#10B981',
            opacity: 0.7
          });
          
          // Move to next position
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
          // Try next layer
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

  const allBoxes = generateBinPackingLayout();

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

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        const newStep = Math.floor(newProgress / 20);
        setStep(Math.min(newStep, steps[type].length - 1));
        
        // Add boxes progressively
        const boxesToShow = Math.floor((newProgress / 100) * allBoxes.length);
        setPlacedBoxes(allBoxes.slice(0, boxesToShow));
        
        if (newProgress >= 100) {
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, onComplete, type, allBoxes.length]);

  const cardClass = `backdrop-blur-lg border transition-all duration-300 rounded-2xl p-6 ${
    darkMode 
      ? 'bg-gray-800/30 border-gray-700' 
      : 'bg-white/70 border-gray-200'
  } shadow-xl`;

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          3D Bin Packing Optimization
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
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {isPlaying ? (
              <Pause className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            ) : (
              <Play className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            )}
          </button>
        </div>
      </div>

      {/* 3D Bin Packing Visualization */}
      <div className={`relative mb-6 rounded-xl overflow-hidden h-[500px] ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {/* Background Image */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
            {/* 3D Container */}
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
                width: '280px', 
                height: '200px',
                transformStyle: 'preserve-3d'
              }}>
                {/* Container edges */}
                {[
                  // Bottom edges
                  { from: [0, 200, 0], to: [280, 200, 0] },
                  { from: [0, 200, 0], to: [0, 200, 160] },
                  { from: [280, 200, 0], to: [280, 200, 160] },
                  { from: [0, 200, 160], to: [280, 200, 160] },
                  // Top edges
                  { from: [0, 0, 0], to: [280, 0, 0] },
                  { from: [0, 0, 0], to: [0, 0, 160] },
                  { from: [280, 0, 0], to: [280, 0, 160] },
                  { from: [0, 0, 160], to: [280, 0, 160] },
                  // Vertical edges
                  { from: [0, 0, 0], to: [0, 200, 0] },
                  { from: [280, 0, 0], to: [280, 200, 0] },
                  { from: [0, 0, 160], to: [0, 200, 160] },
                  { from: [280, 0, 160], to: [280, 200, 160] }
                ].map((edge, i) => (
                  <div
                    key={i}
                    className={`absolute ${darkMode ? 'bg-gray-400' : 'bg-gray-600'}`}
                    style={{
                      width: Math.sqrt(
                        Math.pow(edge.to[0] - edge.from[0], 2) + 
                        Math.pow(edge.to[1] - edge.from[1], 2) + 
                        Math.pow(edge.to[2] - edge.from[2], 2)
                      ) + 'px',
                      height: '2px',
                      left: edge.from[0] + 'px',
                      top: edge.from[1] + 'px',
                      transform: `translateZ(${edge.from[2]}px) rotateY(${
                        Math.atan2(edge.to[2] - edge.from[2], edge.to[0] - edge.from[0]) * 180 / Math.PI
                      }deg) rotateX(${
                        -Math.atan2(edge.to[1] - edge.from[1], 
                        Math.sqrt(Math.pow(edge.to[0] - edge.from[0], 2) + Math.pow(edge.to[2] - edge.from[2], 2))) * 180 / Math.PI
                      }deg)`,
                      transformOrigin: 'left center',
                      opacity: 0.6
                    }}
                  />
                ))}

                {/* Individual boxes with wireframes */}
                {placedBoxes.map((box, index) => (
                  <div
                    key={box.id}
                    className="absolute"
                    style={{
                      left: `${box.x}px`,
                      top: `${box.y}px`,
                      width: `${box.width}px`,
                      height: `${box.height}px`,
                      transform: `translateZ(${box.z}px)`,
                      transformStyle: 'preserve-3d',
                      animation: `boxAppear 0.5s ease-out ${index * 0.05}s both`
                    }}
                  >
                    {/* Box faces */}
                    {/* Front face */}
                    <div
                      className="absolute inset-0 border-2 border-gray-800"
                      style={{
                        backgroundColor: box.color,
                        opacity: box.opacity
                      }}
                    />
                    
                    {/* Top face */}
                    <div
                      className="absolute border-2 border-gray-800"
                      style={{
                        width: `${box.width}px`,
                        height: `${box.depth}px`,
                        backgroundColor: box.color,
                        opacity: box.opacity * 0.8,
                        transform: `rotateX(90deg) translateZ(${box.height}px)`,
                        transformOrigin: 'top'
                      }}
                    />
                    
                    {/* Right face */}
                    <div
                      className="absolute border-2 border-gray-800"
                      style={{
                        width: `${box.depth}px`,
                        height: `${box.height}px`,
                        backgroundColor: box.color,
                        opacity: box.opacity * 0.6,
                        transform: `rotateY(90deg) translateZ(${box.width}px)`,
                        transformOrigin: 'right'
                      }}
                    />

                    {/* Box wireframe edges */}
                    {[
                      // Front face edges
                      { from: [0, 0], to: [box.width, 0] },
                      { from: [0, 0], to: [0, box.height] },
                      { from: [box.width, 0], to: [box.width, box.height] },
                      { from: [0, box.height], to: [box.width, box.height] },
                      // Back face edges (translated in Z)
                      { from: [0, 0], to: [box.width, 0], z: box.depth },
                      { from: [0, 0], to: [0, box.height], z: box.depth },
                      { from: [box.width, 0], to: [box.width, box.height], z: box.depth },
                      { from: [0, box.height], to: [box.width, box.height], z: box.depth },
                      // Connecting edges
                      { from: [0, 0], to: [0, 0], z: box.depth, isZ: true },
                      { from: [box.width, 0], to: [box.width, 0], z: box.depth, isZ: true },
                      { from: [0, box.height], to: [0, box.height], z: box.depth, isZ: true },
                      { from: [box.width, box.height], to: [box.width, box.height], z: box.depth, isZ: true }
                    ].map((edge, i) => (
                      <div
                        key={i}
                        className="absolute bg-gray-900"
                        style={{
                          width: edge.isZ ? '1px' : Math.abs(edge.to[0] - edge.from[0]) || '1px',
                          height: edge.isZ ? '1px' : Math.abs(edge.to[1] - edge.from[1]) || '1px',
                          left: edge.from[0] + 'px',
                          top: edge.from[1] + 'px',
                          transform: edge.isZ ? `translateZ(0px) rotateY(0deg)` : 'none',
                          opacity: 0.8
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
            <div
              className={`h-full transition-all duration-300 ${
                type === 'master-carton' ? 'bg-blue-500' :
                type === 'pallet' ? 'bg-orange-500' : 'bg-purple-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Progress
          </span>
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {progress.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Current Step */}
      <div className={`p-4 rounded-xl ${
        darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
      } mb-4`}>
        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {steps[type][step]}
        </p>
        {productType && (
          <p className={`text-xs mt-1 ${
            productType === 'tiles' ? 'text-orange-500' : 'text-green-500'
          }`}>
            {productType === 'tiles' ? 'Grid-based vertical stacking' : 'Mixed orientation bin packing'}
          </p>
        )}
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            type === 'master-carton' ? 'text-blue-500' :
            type === 'pallet' ? 'text-orange-500' : 'text-purple-500'
          }`}>
            {placedBoxes.length}
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Boxes Packed
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
            {Math.min(85 + Math.floor(progress / 10), 95)}%
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Space Utilized
          </div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>
            {productType === 'tiles' ? 'Grid' : 'Mixed'}
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Packing Method
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes boxAppear {
          0% {
            opacity: 0;
            transform: translateZ(0px) scale(0.8);
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

export default LoadingAnimation;
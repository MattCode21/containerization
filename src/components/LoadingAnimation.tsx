import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Image } from 'lucide-react';

interface Props {
  darkMode: boolean;
  type: 'master-carton' | 'pallet' | 'container';
  productType?: 'tiles' | 'tools' | null;
  onComplete: () => void;
}

const LoadingAnimation: React.FC<Props> = ({ darkMode, type, productType, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [placedBoxes, setPlacedBoxes] = useState<Array<{
    id: number;
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    depth: number;
    color: string;
    opacity: number;
  }>>([]);

  // Aesthetic background images from Pexels
  const backgroundImages = [
    'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1366942/pexels-photo-1366942.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
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

  const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5;
        const newStep = Math.floor(newProgress / 20);
        setStep(Math.min(newStep, steps[type].length - 1));
        
        // Add new boxes as progress increases
        if (newProgress % 8 === 0 && newProgress < 96) {
          const boxCount = Math.floor(newProgress / 8);
          const newBox = {
            id: boxCount,
            x: (boxCount % 8) * 12 + 10,
            y: Math.floor(boxCount / 8) * 15 + 20,
            z: Math.floor(boxCount / 16) * 10 + 5,
            width: 8 + Math.random() * 4,
            height: 6 + Math.random() * 8,
            depth: 6 + Math.random() * 4,
            color: type === 'master-carton' ? '#3B82F6' : 
                   type === 'pallet' ? '#F97316' : '#8B5CF6',
            opacity: 0.8 + Math.random() * 0.2
          };
          
          setPlacedBoxes(prev => [...prev, newBox]);
        }
        
        if (newProgress >= 100) {
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, onComplete, type]);

  const cardClass = `backdrop-blur-lg border transition-all duration-300 rounded-2xl p-6 ${
    darkMode 
      ? 'bg-gray-800/30 border-gray-700' 
      : 'bg-white/70 border-gray-200'
  } shadow-xl`;

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          3D Optimization in Progress
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

      {/* Enhanced 3D Visualization Container */}
      <div className={`relative mb-6 rounded-xl overflow-hidden h-96 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {/* Background Image */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 3D Container Visualization */}
          <div className="relative w-80 h-64" style={{ perspective: '1000px' }}>
            {/* Container Outline with 3D effect */}
            <div 
              className={`absolute border-2 ${
                darkMode ? 'border-gray-400' : 'border-gray-600'
              } bg-gradient-to-br ${
                darkMode ? 'from-gray-800/20 to-gray-700/20' : 'from-gray-100/20 to-gray-200/20'
              }`}
              style={{
                width: '280px',
                height: '200px',
                left: '20px',
                top: '20px',
                transform: 'rotateX(15deg) rotateY(15deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Container floor */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-2 ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-400'
                } opacity-50`}
                style={{ transform: 'rotateX(90deg) translateZ(1px)' }}
              />
              
              {/* Container back wall */}
              <div 
                className={`absolute top-0 bottom-0 right-0 w-2 ${
                  darkMode ? 'bg-gray-600' : 'bg-gray-400'
                } opacity-30`}
                style={{ transform: 'rotateY(90deg) translateZ(1px)' }}
              />
            </div>
            
            {/* Realistic 3D Boxes */}
            {placedBoxes.map((box, index) => (
              <div
                key={box.id}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  left: `${box.x}px`,
                  top: `${box.y}px`,
                  width: `${box.width}px`,
                  height: `${box.height}px`,
                  transform: `rotateX(15deg) rotateY(15deg) translateZ(${box.z}px)`,
                  transformStyle: 'preserve-3d',
                  opacity: box.opacity,
                  animation: `boxAppear 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Box Front Face */}
                <div
                  className="absolute inset-0 border border-gray-800/20 shadow-lg"
                  style={{
                    backgroundColor: box.color,
                    background: `linear-gradient(135deg, ${box.color} 0%, ${box.color}dd 100%)`,
                  }}
                />
                
                {/* Box Top Face */}
                <div
                  className="absolute border border-gray-800/20"
                  style={{
                    width: `${box.width}px`,
                    height: `${box.depth}px`,
                    backgroundColor: box.color,
                    background: `linear-gradient(45deg, ${box.color}cc 0%, ${box.color}aa 100%)`,
                    transform: `rotateX(90deg) translateZ(${box.height}px)`,
                    transformOrigin: 'top'
                  }}
                />
                
                {/* Box Right Face */}
                <div
                  className="absolute border border-gray-800/20"
                  style={{
                    width: `${box.depth}px`,
                    height: `${box.height}px`,
                    backgroundColor: box.color,
                    background: `linear-gradient(45deg, ${box.color}bb 0%, ${box.color}88 100%)`,
                    transform: `rotateY(90deg) translateZ(${box.width}px)`,
                    transformOrigin: 'right'
                  }}
                />
                
                {/* Box Label/Texture */}
                <div 
                  className="absolute inset-2 flex items-center justify-center text-white text-xs font-bold opacity-80"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {productType === 'tiles' ? '🔲' : productType === 'tools' ? '🔧' : '📦'}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isPlaying && (
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg" />
              </div>
            )}
            
            {/* Progress indicator on container */}
            <div 
              className="absolute bottom-2 left-6 right-6 h-1 bg-gray-300 rounded-full overflow-hidden"
              style={{ transform: 'rotateX(15deg) rotateY(15deg)' }}
            >
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
        <div className={`w-full rounded-full h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              type === 'master-carton' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
              type === 'pallet' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
              'bg-gradient-to-r from-purple-500 to-purple-600'
            } shadow-lg`}
            style={{ width: `${progress}%` }}
          />
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
            {productType === 'tiles' ? 'Vertical stacking constraints applied' : 'Mixed orientation optimization enabled'}
          </p>
        )}
      </div>

      {/* Enhanced Stats Display */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            type === 'master-carton' ? 'text-blue-500' :
            type === 'pallet' ? 'text-orange-500' : 'text-purple-500'
          }`}>
            {placedBoxes.length}
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Items Placed
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
            {Math.min(78 + Math.floor(progress / 8), 92)}%
          </div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Weight Efficiency
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes boxAppear {
          0% {
            opacity: 0;
            transform: rotateX(15deg) rotateY(15deg) translateZ(0px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: rotateX(15deg) rotateY(15deg) translateZ(var(--z)) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
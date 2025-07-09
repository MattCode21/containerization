import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

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

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        const newStep = Math.floor(newProgress / 20);
        setStep(Math.min(newStep, steps[type].length - 1));
        
        if (newProgress >= 100) {
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 80);

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

      {/* 3D Visualization Container */}
      <div className={`relative mb-6 rounded-xl overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      } h-80`}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simulated 3D Container */}
          <div className="relative w-64 h-48 transform-gpu">
            {/* Container outline */}
            <div className={`absolute inset-0 border-2 ${
              darkMode ? 'border-gray-600' : 'border-gray-400'
            } transform perspective-1000 rotateX-12 rotateY-12`} />
            
            {/* Animated boxes being placed */}
            {Array.from({ length: Math.floor(progress / 10) }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-8 h-8 ${
                  type === 'master-carton' ? 'bg-blue-500' : 
                  type === 'pallet' ? 'bg-orange-500' : 'bg-purple-500'
                } opacity-80 transform transition-all duration-500`}
                style={{
                  left: `${(i % 6) * 10 + 20}%`,
                  top: `${Math.floor(i / 6) * 15 + 30}%`,
                  transform: `scale(${1 - i * 0.05}) translateZ(${i * 2}px)`,
                  animationDelay: `${i * 200}ms`
                }}
              />
            ))}
            
            {/* Loading indicator */}
            {isPlaying && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
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
        <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              type === 'master-carton' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
              type === 'pallet' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
              'bg-gradient-to-r from-purple-500 to-purple-600'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className={`p-4 rounded-xl ${
        darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
      }`}>
        <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {steps[type][step]}
        </p>
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            type === 'master-carton' ? 'text-blue-500' :
            type === 'pallet' ? 'text-orange-500' : 'text-purple-500'
          }`}>
            {Math.floor(progress / 4)}
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
    </div>
  );
};

export default LoadingAnimation;
import React, { useState, useEffect } from 'react';
import { Package, Wrench, Plus, ArrowRight, Sun, Moon } from 'lucide-react';

interface Props {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onProductTypeSelect: (type: 'tiles' | 'tools') => void;
  onNewProduct: () => void;
}

const HomePage: React.FC<Props> = ({ darkMode, setDarkMode, onProductTypeSelect, onNewProduct }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Sky Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 transition-all duration-1000 ${
          darkMode 
            ? 'bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900'
            : 'bg-gradient-to-b from-blue-400 via-blue-300 to-blue-100'
        }`}>
          {/* Animated Clouds */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 ${
                darkMode ? 'bg-white' : 'bg-white'
              }`}
              style={{
                width: `${100 + i * 50}px`,
                height: `${50 + i * 20}px`,
                top: `${10 + i * 15}%`,
                left: `${-10 + i * 20}%`,
                transform: `translateX(${scrollY * 0.1 * (i + 1)}px)`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className={`absolute w-1 h-1 rounded-full ${
                darkMode ? 'bg-blue-300' : 'bg-blue-600'
              } opacity-30 animate-pulse`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${
                darkMode ? 'bg-blue-600' : 'bg-blue-500'
              } shadow-lg transform hover:scale-105 transition-transform`}>
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  J&J GLOBAL SOURCING
                </h1>
                <p className={`text-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  LOADABILITY APPLICATION
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-yellow-500 text-gray-900 shadow-yellow-500/25' 
                  : 'bg-gray-800 text-white shadow-gray-800/25'
              } shadow-lg hover:shadow-xl`}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div 
            className="transform transition-all duration-1000"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h2 className={`text-6xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Optimize Your Loading
            </h2>
            <p className={`text-xl mb-12 max-w-3xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Advanced 3D loading optimization for master cartons, pallets, and containers. 
              Maximize space utilization and minimize shipping costs with AI-powered algorithms.
            </p>
          </div>
        </section>

        {/* Product Type Selection */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tiles Loadability */}
            <div 
              className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/80'
              } backdrop-blur-lg border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
              onClick={() => onProductTypeSelect('tiles')}
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              {/* Tiles Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-6 gap-1 h-full p-4">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-orange-500 rounded-sm transform transition-transform group-hover:scale-110"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Tiles Loadability
                </h3>
                <p className={`text-sm mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Specialized optimization for tiles with vertical inner carton constraints
                </p>
                <div className="flex items-center justify-center space-x-2 text-orange-500 font-medium group-hover:text-orange-400 transition-colors">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Tools Loadability */}
            <div 
              className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/80'
              } backdrop-blur-lg border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
              onClick={() => onProductTypeSelect('tools')}
              style={{ transform: `translateY(${scrollY * 0.03}px)` }}
            >
              {/* Tools Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="flex flex-wrap gap-2 h-full p-4">
                  {[...Array(12)].map((_, i) => (
                    <Wrench
                      key={i}
                      className="w-6 h-6 text-green-500 transform transition-transform group-hover:rotate-12"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Wrench className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Tools Loadability
                </h3>
                <p className={`text-sm mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Flexible optimization for tools and general products with mixed orientations
                </p>
                <div className="flex items-center justify-center space-x-2 text-green-500 font-medium group-hover:text-green-400 transition-colors">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Add New Product Type */}
            <div 
              className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/80'
              } backdrop-blur-lg border-2 border-dashed ${
                darkMode ? 'border-gray-600 hover:border-purple-500' : 'border-gray-300 hover:border-purple-500'
              }`}
              onClick={onNewProduct}
              style={{ transform: `translateY(${scrollY * 0.07}px)` }}
            >
              <div className="relative p-8 text-center">
                <div className="mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all ${
                    darkMode 
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 group-hover:from-purple-500 group-hover:to-pink-500' 
                      : 'bg-gradient-to-br from-purple-500 to-pink-600 group-hover:from-purple-400 group-hover:to-pink-500'
                  }`}>
                    <Plus className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Add New Type
                </h3>
                <p className={`text-sm mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Create custom optimization rules for new product categories
                </p>
                <div className="flex items-center justify-center space-x-2 text-purple-500 font-medium group-hover:text-purple-400 transition-colors">
                  <span>Create New</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div 
            className="text-center mb-16"
            style={{ transform: `translateY(${scrollY * 0.02}px)` }}
          >
            <h2 className={`text-4xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Advanced Features
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Powered by cutting-edge algorithms and AI optimization
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '3D Visualization',
                description: 'Real-time 3D rendering of optimal loading arrangements',
                color: 'from-blue-500 to-cyan-600',
                delay: 0
              },
              {
                title: 'AI Optimization',
                description: 'Machine learning algorithms for maximum space utilization',
                color: 'from-purple-500 to-pink-600',
                delay: 0.2
              },
              {
                title: 'Multi-Unit Support',
                description: 'Seamless conversion between different measurement units',
                color: 'from-green-500 to-emerald-600',
                delay: 0.4
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl backdrop-blur-lg transition-all duration-500 hover:scale-105 ${
                  darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-gray-200'
                } shadow-xl hover:shadow-2xl`}
                style={{ 
                  transform: `translateY(${scrollY * 0.01 * (index + 1)}px)`,
                  animationDelay: `${feature.delay}s`
                }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
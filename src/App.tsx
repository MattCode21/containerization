import React, { useState, useEffect } from 'react';
import { Package, Truck, Container, Moon, Sun, Bot, Plus, ArrowRight } from 'lucide-react';
import HomePage from './components/HomePage';
import MasterCartonTab from './components/MasterCartonTab';
import PalletLoadingTab from './components/PalletLoadingTab';
import ContainerLoadingTab from './components/ContainerLoadingTab';
import AIOptimizer from './components/AIOptimizer';

type Page = 'home' | 'tiles' | 'tools' | 'new-product';
type Tab = 'master-carton' | 'pallet' | 'container';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeTab, setActiveTab] = useState<Tab>('master-carton');
  const [darkMode, setDarkMode] = useState(false);
  const [productType, setProductType] = useState<'tiles' | 'tools' | null>(null);

  const tabs = [
    { id: 'master-carton', label: 'Master Carton Loading', icon: Package },
    { id: 'pallet', label: 'Pallet Loading', icon: Truck },
    { id: 'container', label: 'Container Loading', icon: Container },
  ];

  const handleProductTypeSelect = (type: 'tiles' | 'tools') => {
    setProductType(type);
    setCurrentPage(type);
  };

  if (currentPage === 'home') {
    return (
      <HomePage 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        onProductTypeSelect={handleProductTypeSelect}
        onNewProduct={() => setCurrentPage('new-product')}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className={`p-2 rounded-xl ${
                  darkMode ? 'bg-blue-600' : 'bg-blue-500'
                } shadow-lg`}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    J&J GLOBAL SOURCING
                  </h1>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    LOADABILITY APPLICATION
                  </p>
                </div>
              </button>
              
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
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-yellow-500 text-gray-900 shadow-yellow-500/25' 
                  : 'bg-gray-800 text-white shadow-gray-800/25'
              } shadow-lg hover:shadow-xl`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex space-x-1 p-1 rounded-2xl backdrop-blur-lg bg-white/20 dark:bg-gray-800/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl transition-all duration-300 font-medium ${
                  activeTab === tab.id
                    ? darkMode
                      ? 'bg-blue-600 text-white shadow-blue-500/50 shadow-lg'
                      : 'bg-white text-blue-600 shadow-blue-500/20 shadow-lg'
                    : darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Tab Content */}
          <div className="xl:col-span-3">
            {activeTab === 'master-carton' && (
              <MasterCartonTab 
                darkMode={darkMode} 
                productType={productType}
              />
            )}
            {activeTab === 'pallet' && (
              <PalletLoadingTab 
                darkMode={darkMode} 
                productType={productType}
              />
            )}
            {activeTab === 'container' && (
              <ContainerLoadingTab 
                darkMode={darkMode} 
                productType={productType}
              />
            )}
          </div>
          
          {/* AI Optimizer Sidebar */}
          <div className="xl:col-span-1">
            <AIOptimizer 
              darkMode={darkMode} 
              activeTab={activeTab} 
              productType={productType}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
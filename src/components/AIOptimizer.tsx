import React, { useState, useEffect } from 'react';
import { Bot, Send, Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

interface Props {
  darkMode: boolean;
  activeTab: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIOptimizer: React.FC<Props> = ({ darkMode, activeTab }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with a welcome message based on active tab
  useEffect(() => {
    const welcomeMessages = {
      'master-carton': 'Hi! I\'m your AI optimization assistant. I can help you maximize space utilization in master carton loading. Upload your product image and dimensions to get started!',
      'pallet': 'Hello! I\'m here to help optimize your pallet loading efficiency. Share your carton and pallet specifications, and I\'ll provide real-time optimization suggestions.',
      'container': 'Welcome! I specialize in container loading optimization. Tell me about your pallet configurations and container type for personalized loading strategies.'
    };

    setMessages([{
      id: '1',
      type: 'ai',
      content: welcomeMessages[activeTab as keyof typeof welcomeMessages] || welcomeMessages['master-carton'],
      timestamp: new Date()
    }]);
  }, [activeTab]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        'Based on your input, I recommend optimizing the arrangement by rotating items 45 degrees. This could improve space utilization by 12%.',
        'I notice you could benefit from a mixed stacking pattern. This approach typically increases efficiency by 8-15% in similar configurations.',
        'Your current weight distribution looks good, but consider consolidating heavier items toward the center for better stability.',
        'The dimensions you provided suggest using a grid-based arrangement with 3x4 layout would be optimal for your requirements.',
        'I recommend testing both vertical and horizontal orientations. Your product shape suggests horizontal stacking might yield better results.'
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const cardClass = `backdrop-blur-lg border transition-all duration-300 rounded-2xl ${
    darkMode 
      ? 'bg-gray-800/30 border-gray-700' 
      : 'bg-white/70 border-gray-200'
  } shadow-xl`;

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <div className={cardClass}>
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Optimization Assistant
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Real-time loading optimization
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-80 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 opacity-70 ${
                  message.type === 'user' ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className={`p-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about optimization strategies..."
              className={`flex-1 px-4 py-2 rounded-xl border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
              } focus:ring-2 focus:ring-purple-500/20`}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className={cardClass + ' p-6'}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-yellow-500 rounded-lg">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Insights
          </h3>
        </div>

        <div className="space-y-3">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className={`w-3 h-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                Optimization Tip
              </span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-green-200' : 'text-green-600'}`}>
              Mixed orientation stacking can improve efficiency by up to 15%
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle className={`w-3 h-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                Weight Distribution
              </span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-blue-200' : 'text-blue-600'}`}>
              Keep heavier items at the bottom for stability
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-500/20' : 'bg-purple-50'}`}>
            <div className="flex items-center space-x-2 mb-1">
              <Bot className={`w-3 h-3 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                AI Suggestion
              </span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
              Test multiple configurations for optimal results
            </p>
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className={cardClass + ' p-6'}>
        <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Live Performance
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Current Efficiency
              </span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                87%
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: '87%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                AI Confidence
              </span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                94%
              </span>
            </div>
            <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" style={{ width: '94%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIOptimizer;
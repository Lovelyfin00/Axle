import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Edit3, ChevronDown, Sparkles, Send } from 'lucide-react';
import Footer from '../component/Footer';
import Chat from '../component/Chat';

const Home = () => {
  const [selectedModel, setSelectedModel] = useState('Chat');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isPluginDropdownOpen, setIsPluginDropdownOpen] = useState(false);

  const models = ['Chat', 'Image Generator'];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-gray-900">{selectedModel}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {isModelDropdownOpen && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                  {models.map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelDropdownOpen(false);
                      }}
                      className={` cursor-pointer w-full text-left px-3 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                        selectedModel === model ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Plugins Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsPluginDropdownOpen(!isPluginDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <span className="text-sm">No plugins enabled</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <Chat selectedModel={selectedModel} />

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;
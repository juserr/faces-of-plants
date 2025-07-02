'use client';

import React from 'react';
import { useMode, getBackgroundGradient, getTextColors } from '../../context/ModeContext';
import { MagnifyingGlass, Database, Globe } from '@phosphor-icons/react';

const SearchPage = () => {
  const { mode, theme } = useMode();
  const isCitizen = mode === 'citizen';
  const textColors = getTextColors(theme);

  // Mode-aware accent colors
  const accentColorClass = theme === "light" 
    ? (isCitizen ? "text-green-600" : "text-blue-600")
    : (isCitizen ? "text-green-500" : "text-blue-500");

  // Card backgrounds for different themes
  const sectionBg = theme === "light"
    ? "bg-white/70 border-gray-200/50"
    : "bg-gray-900/50 border-gray-700/20";

  const innerCardBg = theme === "light"
    ? "bg-gray-50/80 border-gray-200/40"
    : "bg-gray-900/70 border-gray-700/30";

  // Mode-aware border colors for inner cards
  const innerCardBorder = theme === "light"
    ? (isCitizen ? "border-green-200/60" : "border-blue-200/60")
    : (isCitizen ? "border-green-700/30" : "border-blue-700/30");

  const listTextColor = theme === "light" ? "text-gray-700" : "text-gray-300";

  return (
    <div className={`min-h-screen ${getBackgroundGradient(mode, theme)}`}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold ${textColors.primary} mb-6`}>
            Advanced Multi-Database Search
          </h1>
          <p className={`text-xl ${textColors.secondary} max-w-3xl mx-auto mb-8`}>
            Search across multiple biodiversity databases with advanced filtering.
          </p>
        </div>

        {/* Federated Search Architecture */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <Database size={24} /> Federated Search Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>GBIF Integration</h4>
              <p className={`${listTextColor} text-sm`}>Primary occurrence and taxonomic data with 1.5B+ records</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>iNaturalist</h4>
              <p className={`${listTextColor} text-sm`}>Citizen science observations with photo verification</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>PlantNet</h4>
              <p className={`${listTextColor} text-sm`}>AI-powered plant identification and image recognition</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>EOL (Encyclopedia of Life)</h4>
              <p className={`${listTextColor} text-sm`}>Comprehensive species information and media resources</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Regional Databases</h4>
              <p className={`${listTextColor} text-sm`}>Local herbarium collections and specialized regional datasets</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Environmental APIs</h4>
              <p className={`${listTextColor} text-sm`}>Climate data, soil information, and habitat characteristics</p>
            </div>
          </div>
        </div>

        {/* Search Result Aggregation */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <MagnifyingGlass size={24} /> Search Result Aggregation
          </h2>
          <div className={`${theme === "light" ? "bg-gray-100/80 border-gray-200/40" : "bg-gray-900/80 border-gray-600/20"} rounded-lg p-6 my-6 border backdrop-blur-sm`}>
            <h4 className={`${accentColorClass} mb-4`}>Unified Results Interface</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className={`${theme === "light" ? "bg-green-50/80 border-l-4 border-green-500" : "bg-green-900/30 border-l-4 border-green-500"} p-4 rounded-lg`}>
                <strong className={textColors.primary}>GBIF Match</strong><br/>
                <span className={textColors.secondary}>Confidence: 98%</span><br/>
                <span className={textColors.secondary}>Records: 15,420</span>
              </div>
              <div className={`${theme === "light" ? "bg-blue-50/80 border-l-4 border-blue-500" : "bg-blue-900/30 border-l-4 border-blue-500"} p-4 rounded-lg`}>
                <strong className={textColors.primary}>iNaturalist</strong><br/>
                <span className={textColors.secondary}>Confidence: 92%</span><br/>
                <span className={textColors.secondary}>Photos: 1,247</span>
              </div>
              <div className={`${theme === "light" ? "bg-purple-50/80 border-l-4 border-purple-500" : "bg-purple-900/30 border-l-4 border-purple-500"} p-4 rounded-lg`}>
                <strong className={textColors.primary}>Local Herbarium</strong><br/>
                <span className={textColors.secondary}>Confidence: 89%</span><br/>
                <span className={textColors.secondary}>Specimens: 45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Navigation Pattern */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <Globe size={24} /> Search Navigation Pattern
          </h2>
          <div className="flex items-center gap-4 my-4 flex-wrap">
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Query Input</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Source Selection</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Parallel Search</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Result Synthesis</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Confidence Ranking</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Export/Save</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;

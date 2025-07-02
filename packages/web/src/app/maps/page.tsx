'use client';

import React from 'react';
import { useMode, getBackgroundGradient, getTextColors } from '../../context/ModeContext';
import { MapPin } from '@phosphor-icons/react';

const MapsPage = () => {
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
            Interactive Geospatial Maps
          </h1>
          <p className={`text-xl ${textColors.secondary} max-w-3xl mx-auto mb-8`}>
            Explore species occurrences and distributions across the globe.
          </p>
        </div>

        {/* Data Types & Visualizations */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <MapPin size={24} /> Data Types & Visualizations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Occurrence Density</h4>
              <p className={`${listTextColor} text-sm`}>Heat maps showing species concentration across geographic regions with dynamic zoom levels</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Species Distribution</h4>
              <p className={`${listTextColor} text-sm`}>Choropleth maps with species richness, endemic species, and biodiversity hotspots</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Temporal Migration</h4>
              <p className={`${listTextColor} text-sm`}>Animated flow maps showing species movement patterns over time periods</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Collection Points</h4>
              <p className={`${listTextColor} text-sm`}>Clustered markers with specimen collection metadata and quality indicators</p>
            </div>
          </div>
        </div>

        {/* Interactive Map Demo Concept */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            Interactive Map Demo Concept
          </h2>
          <div className={`${theme === "light" ? "bg-gray-100/80 border-gray-200/40" : "bg-gray-900/80 border-gray-600/20"} rounded-lg p-6 my-6 border backdrop-blur-sm`}>
            <h4 className={`${accentColorClass} mb-4`}>Interactive Map Demo Concept</h4>
            <div className={`w-full h-72 ${theme === "light" ? "bg-gradient-to-br from-green-100 to-green-200" : "bg-gradient-to-br from-green-900 to-green-800"} rounded-lg relative overflow-hidden`}>
              <div className={`absolute top-5 left-5 ${theme === "light" ? "bg-white/90" : "bg-black/70"} p-3 rounded-md border ${theme === "light" ? "border-gray-200" : ""}`}>
                <div className={`${accentColorClass} font-bold`}>Quercus robur</div>
                <div className={`text-sm ${textColors.secondary}`}>1,247 occurrences</div>
                <div className={`text-xs ${textColors.secondary}`}>Last updated: 2025</div>
              </div>
              <div className="absolute bottom-5 right-5">
                <button className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium mr-2`}>Layer Controls</button>
                <button className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Time Slider</button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Flow */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            Navigation Flow
          </h2>
          <div className="flex items-center gap-4 my-4 flex-wrap">
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Map Overview</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Region Zoom</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Cluster Expand</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Specimen Detail</div>
            <div className={`${accentColorClass} text-2xl`}>→</div>
            <div className={`${theme === "light" ? "bg-gradient-to-br from-green-400 to-green-500" : "bg-gradient-to-br from-green-500 to-green-600"} text-white px-4 py-2 rounded-lg font-medium`}>Collection Save</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapsPage;

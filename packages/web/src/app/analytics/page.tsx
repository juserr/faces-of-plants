'use client';

import React from 'react';
import { useMode, getBackgroundGradient, getTextColors } from '../../context/ModeContext';
import { BarChart2, TrendingUp, PieChart } from 'lucide-react';

const AnalyticsPage = () => {
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
            Data Visualization & Analytics
          </h1>
          <p className={`text-xl ${textColors.secondary} max-w-3xl mx-auto mb-8`}>
            Analyze trends, correlations, and biodiversity metrics.
          </p>
        </div>

        {/* Chart Types & Correlations */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <BarChart2 size={24} /> Chart Types & Correlations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Species Abundance Timeline</h4>
              <div className={`w-full h-48 ${theme === "light" ? "bg-gray-200" : "bg-gray-800"} rounded-md flex items-center justify-center ${theme === "light" ? "text-gray-600" : "text-gray-500"} text-sm`}>
                [Timeline Chart Placeholder]
              </div>
              <p className={`${listTextColor} text-sm mt-2`}>Interactive time series with brushing and filtering capabilities</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Taxonomic Sunburst</h4>
              <div className={`w-full h-48 ${theme === "light" ? "bg-gray-200" : "bg-gray-800"} rounded-md flex items-center justify-center ${theme === "light" ? "text-gray-600" : "text-gray-500"} text-sm`}>
                [Sunburst Chart Placeholder]
              </div>
              <p className={`${listTextColor} text-sm mt-2`}>Hierarchical taxonomy with drill-down navigation</p>
            </div>
          </div>
        </div>

        {/* Correlation Matrix */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <TrendingUp size={24} /> Correlation Matrix
          </h2>
          <p className={`${listTextColor} mb-4`}>Environmental factors vs. species occurrence patterns:</p>
          <div className="grid grid-cols-4 gap-2 my-4">
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-red-700">Temperature</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-green-700">Rainfall</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-yellow-700">Elevation</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-purple-700">Soil pH</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-green-700">0.85</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-red-700">-0.23</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-purple-700">0.67</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-yellow-700">0.34</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-purple-700">0.67</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-red-700">-0.45</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-green-700">0.78</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-yellow-700">0.12</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-yellow-700">0.34</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-purple-700">0.56</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-red-700">-0.21</div>
            <div className="aspect-square rounded-md flex items-center justify-center text-white text-xs bg-green-700">0.89</div>
          </div>
        </div>

        {/* Advanced Analytics Dashboard */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <PieChart size={24} /> Advanced Analytics Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Biodiversity Indices</h4>
              <p className={`${listTextColor} text-sm`}>Shannon-Weaver, Simpson&apos;s, and custom diversity metrics with comparative analysis</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Trend Analysis</h4>
              <p className={`${listTextColor} text-sm`}>Seasonal patterns, population trends, and statistical significance testing</p>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2`}>Predictive Models</h4>
              <p className={`${listTextColor} text-sm`}>Species distribution modeling and climate change impact projections</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;

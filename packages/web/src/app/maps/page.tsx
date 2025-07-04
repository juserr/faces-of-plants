'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useMode, getBackgroundGradient, getTextColors } from '../../context/ModeContext';
import { MapPin, MagnifyingGlass, Leaf, Globe, ChartBar, Funnel, CirclesFour } from '@phosphor-icons/react';
import dynamic from 'next/dynamic';
import { useMapSearch } from '../../components/hooks/useMapSearch';
import AdvancedFilters, { FilterState } from '../../components/AdvancedFilters';
import TemporalSlider from '../../components/TemporalSlider';

// Dynamically import the map component to avoid SSR issues
const InteractiveMap = dynamic(
  () => import('../../components/InteractiveMap'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-gray-600">Loading map...</div>
      </div>
    ),
  }
);

const MapsPage = () => {
  const { mode, theme } = useMode();
  const isCitizen = mode === 'citizen';
  const textColors = getTextColors(theme);
  const { occurrences, loading, error, searchOccurrences, searchInBounds, searchWithFilters } = useMapSearch();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showTemporalSlider, setShowTemporalSlider] = useState(false);
  const [enableClustering, setEnableClustering] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    selectedHabitats: [],
    basisOfRecord: [],
    countries: []
  });

  // Handle temporal filtering
  const handleTimeRangeChange = useCallback((startYear: number, endYear: number) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        start: `${startYear}-01-01`,
        end: `${endYear}-12-31`
      }
    }));
  }, []); // Empty dependency array since setFilters is stable

  // Re-search when filters change
  useEffect(() => {
    if ((searchQuery || selectedExample) && searchWithFilters) {
      const query = selectedExample || searchQuery;
      console.log('[MapsPage] Filters changed, re-searching with:', query, filters);
      searchWithFilters(query, filters);
    }
  }, [filters]); // Only trigger on filter changes

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return; // Don't trigger on input fields
      
      switch (e.key.toLowerCase()) {
        case 'c':
          setEnableClustering(prev => !prev);
          break;
        case 'h':
          setShowHeatmap(prev => !prev);
          break;
        case 't':
          setShowTemporalSlider(prev => !prev);
          break;
        case 'f':
          setShowAdvancedFilters(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Mode-aware accent colors
  const accentColorClass = theme === "light" 
    ? (isCitizen ? "text-green-600" : "text-blue-600")
    : (isCitizen ? "text-green-500" : "text-blue-500");

  // Card backgrounds for different themes
  const sectionBg = theme === "light"
    ? "bg-white/70 border-gray-200/50"
    : "bg-gray-900/50 border-gray-700/20";

  // Example searches by mode
  const examples = {
    citizen: [
      'Rose flowers',
      'Oak trees',
      'Sunflowers',
      'Pine trees',
      'Cherry blossoms'
    ],
    researcher: [
      'Quercus robur',
      'Rosa canina',
      'Helianthus annuus',
      'Pinus sylvestris',
      'Betula pendula',
      'Acer pseudoplatanus'
    ]
  };

  // Load default data on mount
  useEffect(() => {
    const defaultQuery = isCitizen ? 'Oak trees' : 'Quercus robur';
    console.log('[MapsPage] Loading default data for:', defaultQuery);
    if (searchWithFilters) {
      searchWithFilters(defaultQuery, filters);
    }
  }, [mode, isCitizen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !searchWithFilters) return;
    
    setSelectedExample(null);
    await searchWithFilters(searchQuery.trim(), filters);
  };

  const handleExampleClick = async (example: string) => {
    if (!searchWithFilters) return;
    setSearchQuery(example);
    setSelectedExample(example);
    await searchWithFilters(example, filters);
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient(mode, theme)}`}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold ${textColors.primary} mb-6`}>
            Interactive Species Map
          </h1>
          <p className={`text-xl ${textColors.secondary} max-w-3xl mx-auto mb-8`}>
            Explore biodiversity data with advanced filtering, clustering, and temporal analysis
          </p>
        </div>

        {/* Search Section */}
        <div className={`${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-8`}>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isCitizen ? "Search for plants (e.g., oak tree, rose)" : "Search species (e.g., Quercus robur)"}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  loading || !searchQuery.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `${theme === "light" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`
                }`}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {/* Example Searches */}
          <div className="mb-6">
            <h3 className={`text-sm font-medium ${textColors.secondary} mb-3`}>Quick Examples:</h3>
            <div className="flex flex-wrap gap-2">
              {examples[mode].map((example) => (
                <button
                  key={example}
                  onClick={() => handleExampleClick(example)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedExample === example
                      ? `${accentColorClass} border-current bg-current/10`
                      : `${textColors.secondary} border-gray-300 hover:border-gray-400`
                  }`}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => setShowAdvancedFilters(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                Object.keys(filters).some(key => {
                  const value = filters[key as keyof FilterState];
                  return Array.isArray(value) ? value.length > 0 : value !== undefined;
                })
                  ? `${theme === "light" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-blue-900/50 text-blue-300 border-blue-700"} border`
                  : `${theme === "light" ? "bg-gray-100 border-gray-300 hover:bg-gray-200" : "bg-gray-700 border-gray-600 hover:bg-gray-600"} border ${textColors.primary}`
              }`}
            >
              <Funnel className="w-4 h-4" />
              <span>Advanced Filters (F)</span>
            </button>

            <button
              onClick={() => setShowTemporalSlider(prev => !prev)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                showTemporalSlider
                  ? `${theme === "light" ? "bg-green-100 text-green-700 border-green-200" : "bg-green-900/50 text-green-300 border-green-700"} border`
                  : `${theme === "light" ? "bg-gray-100 border-gray-300 hover:bg-gray-200" : "bg-gray-700 border-gray-600 hover:bg-gray-600"} border ${textColors.primary}`
              }`}
            >
              <span>Time Explorer (T)</span>
            </button>

            <button
              onClick={() => setEnableClustering(prev => !prev)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                enableClustering
                  ? `${theme === "light" ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-purple-900/50 text-purple-300 border-purple-700"} border`
                  : `${theme === "light" ? "bg-gray-100 border-gray-300 hover:bg-gray-200" : "bg-gray-700 border-gray-600 hover:bg-gray-600"} border ${textColors.primary}`
              }`}
            >
              <CirclesFour className="w-4 h-4" />
              <span>Clustering (C)</span>
            </button>

            <button
              onClick={() => setShowHeatmap(prev => {
                const newValue = !prev;
                // If enabling heatmap, optionally disable clustering for better performance
                // if (newValue) setEnableClustering(false);
                return newValue;
              })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                showHeatmap
                  ? `${theme === "light" ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-orange-900/50 text-orange-300 border-orange-700"} border`
                  : `${theme === "light" ? "bg-gray-100 border-gray-300 hover:bg-gray-200" : "bg-gray-700 border-gray-600 hover:bg-gray-600"} border ${textColors.primary}`
              }`}
            >
              <ChartBar className="w-4 h-4" />
              <span>Heatmap (H)</span>
            </button>
          </div>

          {/* Help Text */}
          <div className={`text-xs ${textColors.secondary} mb-4`}>
            💡 Use keyboard shortcuts: F (filters), T (time), C (clustering), H (heatmap)
          </div>
        </div>
        
        <InteractiveMap
          occurrences={occurrences}
          dateRange={filters.dateRange}
          enableClustering={enableClustering}
          showHeatmap={showHeatmap}
        />

        {/* Temporal Slider */}
        {showTemporalSlider && (
          <div className="mt-6">
            <TemporalSlider
              occurrences={occurrences}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </div>
        )}
      </section>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onFiltersChange={setFilters}
        currentFilters={filters}
      />

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default MapsPage;

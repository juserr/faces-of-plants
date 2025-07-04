'use client';

import React, { useState } from 'react';
import { useMode, getTextColors } from '../context/ModeContext';
import { Calendar, Mountains, Tree, Funnel, X, Check } from '@phosphor-icons/react';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  dateRange?: { start: string; end: string };
  elevationRange?: { min?: number; max?: number };
  selectedHabitats: string[];
  basisOfRecord: string[];
  countries: string[];
}

const HABITAT_OPTIONS = [
  'native',
  'introduced',
  'managed',
  'naturalised',
  'invasive',
  'unknown'
];

const BASIS_OF_RECORD_OPTIONS = [
  'HUMAN_OBSERVATION',
  'MACHINE_OBSERVATION', 
  'PRESERVED_SPECIMEN',
  'FOSSIL_SPECIMEN',
  'LIVING_SPECIMEN',
  'MATERIAL_SAMPLE'
];

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onClose,
  onFiltersChange,
  currentFilters
}) => {
  const { mode, theme } = useMode();
  const textColors = getTextColors(theme);
  const isCitizen = mode === 'citizen';

  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      selectedHabitats: [],
      basisOfRecord: [],
      countries: []
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const toggleHabitat = (habitat: string) => {
    setLocalFilters(prev => ({
      ...prev,
      selectedHabitats: prev.selectedHabitats.includes(habitat)
        ? prev.selectedHabitats.filter(h => h !== habitat)
        : [...prev.selectedHabitats, habitat]
    }));
  };

  const toggleBasisOfRecord = (basis: string) => {
    setLocalFilters(prev => ({
      ...prev,
      basisOfRecord: prev.basisOfRecord.includes(basis)
        ? prev.basisOfRecord.filter(b => b !== basis)
        : [...prev.basisOfRecord, basis]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className={`${theme === "light" ? "bg-white" : "bg-gray-900"} rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${textColors.primary} flex items-center gap-2`}>
            <Funnel className="w-6 h-6" />
            Advanced Filters
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"} transition-colors`}
          >
            <X className={`w-5 h-5 ${textColors.primary}`} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Date Range Filter */}
          <div className={`p-4 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-800 border-gray-700"}`}>
            <h3 className={`font-semibold ${textColors.primary} mb-3 flex items-center gap-2`}>
              <Calendar className="w-5 h-5" />
              Date Range
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${textColors.secondary} mb-1`}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={localFilters.dateRange?.start || ''}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value, end: prev.dateRange?.end || '' }
                  }))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === "light" 
                      ? "bg-white border-gray-300 text-gray-900" 
                      : "bg-gray-700 border-gray-600 text-white"
                  } focus:ring-2 focus:ring-offset-2 ${
                    isCitizen ? "focus:ring-green-500" : "focus:ring-blue-500"
                  } focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textColors.secondary} mb-1`}>
                  End Date
                </label>
                <input
                  type="date"
                  value={localFilters.dateRange?.end || ''}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value, start: prev.dateRange?.start || '' }
                  }))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === "light" 
                      ? "bg-white border-gray-300 text-gray-900" 
                      : "bg-gray-700 border-gray-600 text-white"
                  } focus:ring-2 focus:ring-offset-2 ${
                    isCitizen ? "focus:ring-green-500" : "focus:ring-blue-500"
                  } focus:border-transparent`}
                />
              </div>
            </div>
          </div>

          {/* Elevation Range Filter */}
          <div className={`p-4 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-800 border-gray-700"}`}>
            <h3 className={`font-semibold ${textColors.primary} mb-3 flex items-center gap-2`}>
              <Mountains className="w-5 h-5" />
              Elevation Range (meters)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${textColors.secondary} mb-1`}>
                  Min Elevation
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={localFilters.elevationRange?.min || ''}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    elevationRange: { 
                      ...prev.elevationRange, 
                      min: e.target.value ? parseInt(e.target.value) : undefined, 
                      max: prev.elevationRange?.max 
                    }
                  } as FilterState))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === "light" 
                      ? "bg-white border-gray-300 text-gray-900" 
                      : "bg-gray-700 border-gray-600 text-white"
                  } focus:ring-2 focus:ring-offset-2 ${
                    isCitizen ? "focus:ring-green-500" : "focus:ring-blue-500"
                  } focus:border-transparent`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${textColors.secondary} mb-1`}>
                  Max Elevation
                </label>
                <input
                  type="number"
                  placeholder="9000"
                  value={localFilters.elevationRange?.max || ''}
                  onChange={(e) => setLocalFilters(prev => ({
                    ...prev,
                    elevationRange: { 
                      ...prev.elevationRange, 
                      max: e.target.value ? parseInt(e.target.value) : undefined, 
                      min: prev.elevationRange?.min 
                    }
                  } as FilterState))}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === "light" 
                      ? "bg-white border-gray-300 text-gray-900" 
                      : "bg-gray-700 border-gray-600 text-white"
                  } focus:ring-2 focus:ring-offset-2 ${
                    isCitizen ? "focus:ring-green-500" : "focus:ring-blue-500"
                  } focus:border-transparent`}
                />
              </div>
            </div>
          </div>

          {/* Habitat/Establishment Means Filter */}
          <div className={`p-4 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-800 border-gray-700"}`}>
            <h3 className={`font-semibold ${textColors.primary} mb-3 flex items-center gap-2`}>
              <Tree className="w-5 h-5" />
              Establishment Status
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {HABITAT_OPTIONS.map(habitat => (
                <button
                  key={habitat}
                  onClick={() => toggleHabitat(habitat)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    localFilters.selectedHabitats.includes(habitat)
                      ? `${theme === "light" ? "bg-green-100 border-green-300 text-green-700" : "bg-green-900/50 border-green-600 text-green-300"} border`
                      : `${theme === "light" ? "bg-white border-gray-300 hover:bg-gray-50" : "bg-gray-700 border-gray-600 hover:bg-gray-600"} border ${textColors.primary}`
                  }`}
                >
                  {localFilters.selectedHabitats.includes(habitat) && (
                    <Check className="w-3 h-3" />
                  )}
                  {habitat.charAt(0).toUpperCase() + habitat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Basis of Record Filter */}
          <div className={`p-4 rounded-lg border ${theme === "light" ? "bg-gray-50 border-gray-200" : "bg-gray-800 border-gray-700"}`}>
            <h3 className={`font-semibold ${textColors.primary} mb-3`}>
              Observation Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {BASIS_OF_RECORD_OPTIONS.map(basis => (
                <button
                  key={basis}
                  onClick={() => toggleBasisOfRecord(basis)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    localFilters.basisOfRecord.includes(basis)
                      ? `${theme === "light" ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-blue-900/50 border-blue-600 text-blue-300"} border`
                      : `${theme === "light" ? "bg-white border-gray-300 hover:bg-gray-50" : "bg-gray-700 border-gray-600 hover:bg-gray-600"} border ${textColors.primary}`
                  }`}
                >
                  {localFilters.basisOfRecord.includes(basis) && (
                    <Check className="w-3 h-3" />
                  )}
                  {basis.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleResetFilters}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              theme === "light" 
                ? "bg-gray-200 hover:bg-gray-300 text-gray-700" 
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
          >
            Reset All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                theme === "light" 
                  ? "bg-gray-200 hover:bg-gray-300 text-gray-700" 
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
                theme === "light"
                  ? (isCitizen ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700")
                  : (isCitizen ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600")
              }`}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;

'use client';

import React from 'react';
import { useMode, getBackgroundGradient, getTextColors } from '../../context/ModeContext';
import { User, Gear, Heart } from '@phosphor-icons/react';

export default function ProfilePage() {
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
          <h1 className={`text-5xl font-bold ${textColors.primary} mb-6 flex items-center justify-center gap-4`}>
            <User size={48} className={accentColorClass} />
            Profile
          </h1>
          <p className={`text-xl ${textColors.secondary} max-w-3xl mx-auto mb-8`}>
            Manage your preferences, saved searches, and mode settings. Customize your biodiversity exploration experience.
          </p>
        </div>

        {/* User Settings */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <Gear size={24} /> User Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-4`}>Interface Preferences</h4>
              <div className={`${listTextColor} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span>Current Mode:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme === "light" ? "bg-green-100 text-green-800" : "bg-green-900/50 text-green-300"}`}>
                    {isCitizen ? "Citizen Scientist" : "Researcher"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Theme:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme === "light" ? "bg-blue-100 text-blue-800" : "bg-blue-900/50 text-blue-300"}`}>
                    {theme === "light" ? "Light Mode" : "Dark Mode"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Language:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-900/50 text-gray-300"}`}>
                    English
                  </span>
                </div>
              </div>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-4`}>Data Preferences</h4>
              <div className={`${listTextColor} space-y-3`}>
                <div className="flex items-center justify-between">
                  <span>Default Database:</span>
                  <span className="text-sm">GBIF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Result Limit:</span>
                  <span className="text-sm">50 per page</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto-save Searches:</span>
                  <span className="text-sm">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Collections */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <Heart size={24} /> Saved Collections
          </h2>
          <div className={`${theme === "light" ? "bg-gray-100/80 border-gray-200/40" : "bg-gray-900/80 border-gray-600/20"} rounded-lg p-6 my-6 border backdrop-blur-sm`}>
            <p className={`${listTextColor} text-center py-8`}>
              No saved collections yet. Start exploring and save your favorite species and searches!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

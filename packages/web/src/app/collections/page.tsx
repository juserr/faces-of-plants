'use client';
import { useMode, getBackgroundGradient, getTextColors } from '../../context/ModeContext';
import { Users, SquaresFour, Leaf, Microscope, Plant, ClipboardText, Globe, MapPin, MagnifyingGlass, ChartBar, FloppyDisk, Tree, Mountains } from '@phosphor-icons/react';

export default function CollectionsPage() {
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
            Collections
          </h1>
          <p className={`text-xl ${textColors.secondary} max-w-3xl mx-auto mb-8`}>
            Save and organize your favorite specimens and records. Easily revisit, share, and manage your biodiversity discoveries.
          </p>
        </div>

        {/* User-Centric Design Patterns */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <Users size={24} /> User-Centric Design Patterns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2 flex items-center`}>
                <Leaf className="w-4 h-4 mr-2" /> Citizen Scientist Interface
              </h4>
              <ul className={`list-none mt-4 space-y-2 ${listTextColor}`}>
                <li>Simple, visual search results with photos</li>
                <li>Guided identification workflows</li>
                <li>Gamified discovery elements</li>
                <li>Social sharing and community features</li>
                <li>Mobile-first responsive design</li>
                <li>Educational content integration</li>
              </ul>
            </div>
            <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
              <h4 className={`${accentColorClass} mb-2 flex items-center`}>
                <Microscope className="w-4 h-4 mr-2" /> Researcher Interface
              </h4>
              <ul className={`list-none mt-4 space-y-2 ${listTextColor}`}>
                <li>Advanced filtering and query builders</li>
                <li>Bulk data export capabilities</li>
                <li>Statistical analysis tools</li>
                <li>Citation and reference management</li>
                <li>API access and documentation</li>
                <li>Collaborative workspace features</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Flow & Navigation Architecture */}
        <div className={`section ${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-16`}>
          <h2 className={`text-2xl font-semibold ${accentColorClass} mb-6 flex items-center gap-2`}>
            <SquaresFour size={24} /> Data Flow & Navigation Architecture
          </h2>
          <h3 className={`text-xl font-semibold ${theme === "light" ? (isCitizen ? "text-green-500" : "text-blue-500") : (isCitizen ? "text-green-400" : "text-blue-400")} mb-4`}>
            Information Architecture
          </h3>
          <div className={`font-mono ${listTextColor} leading-relaxed`}>
            <div className="text-red-400 flex items-center">
              <Globe className="w-4 h-4 mr-1" /> Global View
            </div>
            <div className="ml-4">
              <div className="text-orange-400 flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> Regional Maps
              </div>
              <div className="ml-4">
                <div className="text-yellow-400 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> Local Areas
                </div>
                <div className="ml-4">
                  <div className="text-green-400 flex items-center">
                    <Mountains className="w-4 h-4 mr-1" /> Habitats
                  </div>
                  <div className="ml-4">
                    <div className="text-cyan-400 flex items-center">
                      <Plant className="w-4 h-4 mr-1" /> Species Groups
                    </div>
                    <div className="ml-4">
                      <div className="text-purple-400 flex items-center">
                        <MagnifyingGlass className="w-4 h-4 mr-1" /> Individual Species
                      </div>
                      <div className="ml-4">
                        <div className="text-pink-400 flex items-center">
                          <ClipboardText className="w-4 h-4 mr-1" /> Specimen Records
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className={`text-xl font-semibold ${theme === "light" ? (isCitizen ? "text-green-500" : "text-blue-500") : (isCitizen ? "text-green-400" : "text-blue-400")} mt-8 mb-4`}>
            Cross-Feature Integration
          </h3>
          <div className={`${theme === "light" ? "bg-gray-100/80 border-gray-200/40" : "bg-gray-900/80 border-gray-600/20"} rounded-lg p-6 my-6 border backdrop-blur-sm`}>
            <h4 className={`${accentColorClass} mb-4`}>Unified Data Experience</h4>
            <p className={`${listTextColor} mb-4`}>How features interconnect to create seamless user workflows:</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`text-center p-4 ${theme === "light" ? "bg-green-50/80 border border-green-200/50" : "bg-green-900/30 border border-green-700/30"} rounded-lg backdrop-blur-sm`}>
                <div className="flex justify-center mb-2">
                  <MagnifyingGlass className="w-12 h-12 text-green-600" />
                </div>
                <strong className={textColors.primary}>Search</strong><br/>
                <small className={textColors.secondary}>Natural language query</small>
              </div>
              <div className={`text-center p-4 ${theme === "light" ? "bg-blue-50/80 border border-blue-200/50" : "bg-blue-900/30 border border-blue-700/30"} rounded-lg backdrop-blur-sm`}>
                <div className="flex justify-center mb-2">
                  <MapPin className="w-12 h-12 text-blue-600" />
                </div>
                <strong className={textColors.primary}>Map</strong><br/>
                <small className={textColors.secondary}>Geographic context</small>
              </div>
              <div className={`text-center p-4 ${theme === "light" ? "bg-purple-50/80 border border-purple-200/50" : "bg-purple-900/30 border border-purple-700/30"} rounded-lg backdrop-blur-sm`}>
                <div className="flex justify-center mb-2">
                  <ChartBar className="w-12 h-12 text-purple-600" />
                </div>
                <strong className={textColors.primary}>Charts</strong><br/>
                <small className={textColors.secondary}>Data analysis</small>
              </div>
              <div className={`text-center p-4 ${theme === "light" ? "bg-green-50/80 border border-green-200/50" : "bg-green-900/30 border border-green-700/30"} rounded-lg backdrop-blur-sm`}>
                <div className="flex justify-center mb-2">
                  <FloppyDisk className="w-12 h-12 text-green-600" />
                </div>
                <strong className={textColors.primary}>Collections</strong><br/>
                <small className={textColors.secondary}>Save & organize</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


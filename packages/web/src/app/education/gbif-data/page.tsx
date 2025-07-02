'use client';

import React, { useState } from 'react';
import { useMode, getBackgroundGradient, getTextColors } from '../../../context/ModeContext';
import { Database, ArrowLeft, ArrowRight, BookOpen, Info, Target, CheckCircle, Globe, Users, Microscope } from '@phosphor-icons/react';
import Link from 'next/link';

export default function GBIFDataPage() {
  const { mode, theme } = useMode();
  const textColors = getTextColors(theme);
  const [currentSection, setCurrentSection] = useState(0);

  const accentColorClass = theme === "light" 
    ? (mode === 'citizen' ? "text-green-600" : "text-blue-600")
    : (mode === 'citizen' ? "text-green-500" : "text-blue-500");

  const sectionBg = theme === "light"
    ? "bg-white/70 border-gray-200/50"
    : "bg-gray-900/50 border-gray-700/20";

  const innerCardBg = theme === "light"
    ? "bg-gray-50/80 border-gray-200/40"
    : "bg-gray-900/70 border-gray-700/30";

  const innerCardBorder = theme === "light"
    ? (mode === 'citizen' ? "border-green-200/60" : "border-blue-200/60")
    : (mode === 'citizen' ? "border-green-700/30" : "border-blue-700/30");

  const sections = [
    {
      id: 'what-is-gbif',
      title: 'What is GBIF?',
      content: {
        overview: 'GBIF (Global Biodiversity Information Facility) is the world\'s largest network of biodiversity data. It provides free access to over 1.5 billion species occurrence records from around the globe.',
        keyPoints: [
          'Free and open access to biodiversity data worldwide',
          'Over 1.5 billion species occurrence records',
          'Data from 1,700+ participating institutions',
          'Covers specimens, observations, and scientific literature',
          'Supports research, conservation, and policy decisions'
        ],
        statistics: {
          records: '1.5+ billion',
          species: '1.6+ million',
          countries: '100+',
          institutions: '1,700+'
        }
      }
    },
    {
      id: 'data-types',
      title: 'Types of Data in GBIF',
      content: {
        overview: 'GBIF contains different types of biodiversity data, each with its own characteristics and uses. Understanding these types helps you interpret and use the data effectively.',
        dataTypes: [
          {
            type: 'Specimen Records',
            icon: '🏛️',
            description: 'Physical specimens in museums and herbaria',
            example: 'A pressed plant in a herbarium with collection date and location',
            reliability: 'High - verified by experts',
            use: 'Taxonomic studies, historical distributions'
          },
          {
            type: 'Observation Records',
            icon: '👁️',
            description: 'Species sightings without physical specimens',
            example: 'Bird watching records, plant photos with GPS coordinates',
            reliability: 'Variable - depends on observer expertise',
            use: 'Real-time monitoring, citizen science'
          },
          {
            type: 'Literature Records',
            icon: '📚',
            description: 'Species occurrences mentioned in scientific papers',
            example: 'Species distribution from published research',
            reliability: 'High - peer-reviewed',
            use: 'Historical data, comprehensive reviews'
          },
          {
            type: 'Living Collections',
            icon: '🌱',
            description: 'Species in botanical gardens and zoos',
            example: 'Plants in botanical gardens, animals in zoos',
            reliability: 'High - maintained by institutions',
            use: 'Conservation, education, research'
          }
        ]
      }
    },
    {
      id: 'data-quality',
      title: 'Understanding Data Quality',
      content: {
        overview: 'Not all data in GBIF is perfect. Understanding data quality helps you make informed decisions about which records to trust and use in your research.',
        qualityFactors: [
          {
            factor: 'Taxonomic Accuracy',
            description: 'Is the species correctly identified?',
            indicators: ['Expert verification', 'Clear photos/descriptions', 'Consistent with known range'],
            issues: ['Misidentifications', 'Outdated taxonomy', 'Common name confusion']
          },
          {
            factor: 'Geographic Precision',
            description: 'How accurate is the location information?',
            indicators: ['GPS coordinates', 'Detailed locality', 'Appropriate habitat'],
            issues: ['Vague locations', 'Coordinate errors', 'Historical approximations']
          },
          {
            factor: 'Temporal Accuracy',
            description: 'When was the specimen collected or observed?',
            indicators: ['Specific dates', 'Reasonable timeframes', 'Consistent with life cycles'],
            issues: ['Missing dates', 'Estimated dates', 'Data entry errors']
          }
        ],
        flags: [
          '🟢 No known issues - high confidence',
          '🟡 Minor issues - proceed with caution',
          '🔴 Major issues - verify before use',
          '⚫ Insufficient information - limited use'
        ]
      }
    },
    {
      id: 'using-data',
      title: 'How to Use GBIF Data',
      content: {
        overview: 'GBIF data can be used for many purposes, from basic species research to complex conservation planning. Here\'s how to make the most of this valuable resource.',
        applications: [
          {
            category: 'Research Applications',
            icon: '🔬',
            uses: [
              'Species distribution modeling',
              'Biodiversity hotspot identification',
              'Climate change impact studies',
              'Invasive species tracking'
            ]
          },
          {
            category: 'Conservation Planning',
            icon: '🌿',
            uses: [
              'Protected area design',
              'Endangered species monitoring',
              'Habitat restoration planning',
              'Environmental impact assessment'
            ]
          },
          {
            category: 'Education & Outreach',
            icon: '🎓',
            uses: [
              'Student research projects',
              'Nature identification apps',
              'Citizen science programs',
              'Environmental awareness campaigns'
            ]
          }
        ],
        bestPractices: [
          'Always check data quality indicators',
          'Filter data based on your needs',
          'Combine multiple data sources when possible',
          'Document your methodology clearly',
          'Cite GBIF and data publishers appropriately',
          'Share your findings with the community'
        ]
      }
    }
  ];

  const currentSectionData = sections[currentSection];

  return (
    <div className={`min-h-screen ${getBackgroundGradient(mode, theme)}`}>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/education" className={`inline-flex items-center ${accentColorClass} hover:underline mb-4`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Education Hub
          </Link>
          <div className="flex items-center justify-center mb-6">
            <Database className={`w-12 h-12 ${accentColorClass} mr-4`} />
            <h1 className={`text-5xl font-bold ${textColors.primary}`}>
              Understanding GBIF Data
            </h1>
          </div>
          <p className={`text-lg ${textColors.secondary} max-w-3xl mx-auto`}>
            Learn about the world&apos;s largest biodiversity database and how to interpret and use global species occurrence data.
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`${sectionBg} rounded-lg p-6 border backdrop-blur-md mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-medium ${textColors.primary}`}>
              Section {currentSection + 1} of {sections.length}
            </span>
            <span className={`text-sm ${textColors.secondary}`}>
              {Math.round(((currentSection + 1) / sections.length) * 100)}% Complete
            </span>
          </div>
          <div className={`w-full ${theme === "light" ? "bg-gray-200" : "bg-gray-700"} rounded-full h-3`}>
            <div 
              className={`h-3 rounded-full ${theme === "light" ? "bg-gradient-to-r from-blue-400 to-cyan-500" : "bg-gradient-to-r from-blue-500 to-cyan-600"} transition-all duration-500`}
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-4">
            {sections.map((section, index) => (
              <div key={section.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  index <= currentSection 
                    ? `${theme === "light" ? "bg-blue-500" : "bg-blue-600"} text-white` 
                    : `${theme === "light" ? "bg-gray-200" : "bg-gray-700"} ${textColors.secondary}`
                }`}>
                  {index < currentSection ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`text-xs mt-1 ${textColors.secondary} text-center max-w-20`}>
                  {section.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={`${sectionBg} rounded-2xl p-8 border backdrop-blur-md mb-8`}>
          <h2 className={`text-3xl font-bold ${textColors.primary} mb-6 flex items-center`}>
            <Target className={`w-8 h-8 ${accentColorClass} mr-3`} />
            {currentSectionData.title}
          </h2>

          <div className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder} mb-8`}>
            <div className="flex items-start">
              <Info className={`w-6 h-6 ${accentColorClass} mr-3 mt-1 flex-shrink-0`} />
              <p className={`text-lg ${textColors.primary} leading-relaxed`}>
                {currentSectionData.content.overview}
              </p>
            </div>
          </div>

          {/* Section-specific content */}
          {currentSection === 0 && currentSectionData.content.keyPoints && currentSectionData.content.statistics && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-semibold ${textColors.primary} mb-4`}>🌍 Key Features:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSectionData.content.keyPoints.map((point, index) => (
                    <div key={index} className={`${innerCardBg} rounded-lg p-4 border ${innerCardBorder}`}>
                      <div className="flex items-start">
                        <div className={`w-3 h-3 rounded-full ${theme === "light" ? "bg-blue-500" : "bg-blue-400"} mr-3 mt-2 flex-shrink-0`} />
                        <span className={textColors.primary}>{point}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"} rounded-lg p-6 border ${theme === "light" ? "border-blue-200" : "border-blue-700/30"}`}>
                <h4 className={`font-semibold ${textColors.primary} mb-4`}>
                  📊 GBIF by the Numbers
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${accentColorClass}`}>{currentSectionData.content.statistics.records}</div>
                    <div className={`text-sm ${textColors.secondary}`}>Occurrence Records</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${accentColorClass}`}>{currentSectionData.content.statistics.species}</div>
                    <div className={`text-sm ${textColors.secondary}`}>Species</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${accentColorClass}`}>{currentSectionData.content.statistics.countries}</div>
                    <div className={`text-sm ${textColors.secondary}`}>Countries</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${accentColorClass}`}>{currentSectionData.content.statistics.institutions}</div>
                    <div className={`text-sm ${textColors.secondary}`}>Institutions</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSection === 1 && currentSectionData.content.dataTypes && (
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold ${textColors.primary} mb-4`}>📋 Data Types:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentSectionData.content.dataTypes.map((dataType, index) => (
                  <div key={index} className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{dataType.icon}</span>
                      <h4 className={`font-semibold ${accentColorClass} text-lg`}>{dataType.type}</h4>
                    </div>
                    <p className={`${textColors.secondary} mb-4 text-sm`}>{dataType.description}</p>
                    <div className="space-y-3">
                      <div>
                        <span className={`text-xs font-semibold ${textColors.primary} uppercase tracking-wide`}>Example:</span>
                        <p className={`text-sm ${textColors.secondary} mt-1`}>{dataType.example}</p>
                      </div>
                      <div>
                        <span className={`text-xs font-semibold ${textColors.primary} uppercase tracking-wide`}>Reliability:</span>
                        <p className={`text-sm ${textColors.secondary} mt-1`}>{dataType.reliability}</p>
                      </div>
                      <div>
                        <span className={`text-xs font-semibold ${textColors.primary} uppercase tracking-wide`}>Best Used For:</span>
                        <p className={`text-sm ${textColors.secondary} mt-1`}>{dataType.use}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSection === 2 && currentSectionData.content.qualityFactors && currentSectionData.content.flags && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-semibold ${textColors.primary} mb-4`}>🎯 Quality Factors:</h3>
                <div className="space-y-4">
                  {currentSectionData.content.qualityFactors.map((factor, index) => (
                    <div key={index} className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
                      <h4 className={`font-semibold ${accentColorClass} text-lg mb-2`}>{factor.factor}</h4>
                      <p className={`${textColors.secondary} mb-4`}>{factor.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className={`text-sm font-semibold ${textColors.primary} mb-2`}>✅ Good Indicators:</h5>
                          <ul className={`text-sm ${textColors.secondary} space-y-1`}>
                            {factor.indicators.map((indicator, idx) => (
                              <li key={idx}>• {indicator}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className={`text-sm font-semibold ${textColors.primary} mb-2`}>⚠️ Common Issues:</h5>
                          <ul className={`text-sm ${textColors.secondary} space-y-1`}>
                            {factor.issues.map((issue, idx) => (
                              <li key={idx}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${theme === "light" ? "bg-yellow-50" : "bg-yellow-900/20"} rounded-lg p-6 border ${theme === "light" ? "border-yellow-200" : "border-yellow-700/30"}`}>
                <h4 className={`font-semibold ${textColors.primary} mb-3`}>
                  🚦 Quality Flags:
                </h4>
                <div className="space-y-2">
                  {currentSectionData.content.flags.map((flag, index) => (
                    <div key={index} className={`text-sm ${textColors.primary}`}>
                      {flag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentSection === 3 && currentSectionData.content.applications && currentSectionData.content.bestPractices && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-semibold ${textColors.primary} mb-4`}>🎯 Applications:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentSectionData.content.applications.map((app, index) => (
                    <div key={index} className={`${innerCardBg} rounded-lg p-6 border ${innerCardBorder}`}>
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">{app.icon}</span>
                        <h4 className={`font-semibold ${accentColorClass}`}>{app.category}</h4>
                      </div>
                      <ul className={`space-y-2 text-sm ${textColors.secondary}`}>
                        {app.uses.map((use, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className={`w-2 h-2 rounded-full ${theme === "light" ? "bg-blue-400" : "bg-blue-500"} mr-2 mt-2 flex-shrink-0`} />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`text-xl font-semibold ${textColors.primary} mb-4`}>✅ Best Practices:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSectionData.content.bestPractices.map((practice, index) => (
                    <div key={index} className={`${innerCardBg} rounded-lg p-4 border ${innerCardBorder}`}>
                      <div className="flex items-start">
                        <div className={`w-6 h-6 rounded-full ${theme === "light" ? "bg-green-500" : "bg-green-400"} text-white text-xs flex items-center justify-center mr-3 mt-1 flex-shrink-0 font-bold`}>
                          {index + 1}
                        </div>
                        <span className={`text-sm ${textColors.primary}`}>{practice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentSection === 0
                ? `${theme === "light" ? "bg-gray-200 text-gray-400" : "bg-gray-700 text-gray-500"} cursor-not-allowed`
                : `${theme === "light" ? "bg-white hover:bg-gray-50" : "bg-gray-800 hover:bg-gray-700"} ${textColors.primary} border ${innerCardBorder}`
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSection
                    ? `${theme === "light" ? "bg-blue-500" : "bg-blue-400"}`
                    : `${theme === "light" ? "bg-gray-300" : "bg-gray-600"}`
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentSection === sections.length - 1
                ? `${theme === "light" ? "bg-gray-200 text-gray-400" : "bg-gray-700 text-gray-500"} cursor-not-allowed`
                : `${theme === "light" ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600" : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"} text-white`
            }`}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Completion Message */}
        {currentSection === sections.length - 1 && (
          <div className={`mt-8 ${theme === "light" ? "bg-blue-50" : "bg-blue-900/20"} rounded-lg p-6 border ${theme === "light" ? "border-blue-200" : "border-blue-700/30"} text-center`}>
            <CheckCircle className={`w-12 h-12 ${theme === "light" ? "text-blue-600" : "text-blue-400"} mx-auto mb-4`} />
            <h3 className={`text-xl font-bold ${textColors.primary} mb-2`}>
              🎉 Well Done!
            </h3>
            <p className={`${textColors.secondary} mb-4`}>
              You now understand how GBIF data works and how to use it effectively in your research!
            </p>
            <Link href="/education" className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${theme === "light" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-700 hover:bg-blue-800"} text-white transition-all`}>
              <BookOpen className="w-4 h-4 mr-2" />
              Continue Learning
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

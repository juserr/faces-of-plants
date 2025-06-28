"use client";

import React, { useState } from 'react';
import { Search, Leaf, Users, Database, Globe, BookOpen, Zap } from 'lucide-react';

interface SearchState {
  query: string;
  userType: 'citizen' | 'researcher';
  isLoading: boolean;
}

const FacesOfPlantsLanding = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    userType: 'citizen',
    isLoading: false
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchState.query.trim()) return;

    setSearchState(prev => ({ ...prev, isLoading: true }));
    
    // TODO: Replace with actual API call to backend
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchState.query,
          userType: searchState.userType,
          filters: {}
        }),
      });
      
      if (response.ok) {
        const results = await response.json();
        console.log('Search results:', results);
        // TODO: Handle results display
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const exampleQueries = {
    citizen: [
      "Show me colorful flowers in my area",
      "What plants bloom in spring?",
      "Trees with red leaves in autumn",
      "Medicinal plants in rainforests"
    ],
    researcher: [
      "Quercus species distribution in North America 2020-2024",
      "Endemic flora of Madagascar with coordinates",
      "Climate change impact on alpine vegetation",
      "Invasive species spread patterns Europe"
    ]
  };

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Natural Language Search",
      description: "Ask questions about plants in plain English and get precise scientific data."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Access millions of plant observations from around the world through GBIF."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dual Interface",
      description: "Tailored experiences for both curious citizens and professional researchers."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educational Content",
      description: "Learn about biodiversity with context-rich explanations and visualizations."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Research Tools",
      description: "Advanced filtering, data export, and analysis tools for scientific research."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Smart query interpretation and personalized recommendations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Faces of Plants
                </h1>
                <p className="text-sm text-gray-600">Powered by GBIF</p>
              </div>
            </div>
            
            {/* User Type Toggle */}
            <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full p-1 border border-white/30">
              <button
                onClick={() => setSearchState(prev => ({ ...prev, userType: 'citizen' }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  searchState.userType === 'citizen'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                🌱 Citizen
              </button>
              <button
                onClick={() => setSearchState(prev => ({ ...prev, userType: 'researcher' }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  searchState.userType === 'researcher'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                🔬 Researcher
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Discover the World&apos;s
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Plant Diversity
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore millions of plant observations from around the globe using natural language. 
            Whether you&apos;re a curious citizen or a professional researcher, unlock the secrets of biodiversity with AI-powered search.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative">
            <div className="backdrop-blur-sm bg-white/80 rounded-2xl border border-white/30 shadow-xl p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchState.query}
                    onChange={(e) => setSearchState(prev => ({ ...prev, query: e.target.value }))}
                    placeholder={
                      searchState.userType === 'citizen'
                        ? "Ask about plants... e.g., &apos;Show me colorful flowers in my area&apos;"
                        : "Research query... e.g., &apos;Endemic flora of Madagascar with coordinates&apos;"
                    }
                    className="w-full bg-transparent border-none outline-none text-lg placeholder-gray-500"
                    disabled={searchState.isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={searchState.isLoading || !searchState.query.trim()}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {searchState.isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Example Queries */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">
              {searchState.userType === 'citizen' ? '🌱 Try asking:' : '🔬 Example queries:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries[searchState.userType].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSearchState(prev => ({ ...prev, query: example }))}
                  className="text-sm bg-white/60 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-gray-700 hover:bg-white/80 transition-all duration-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-white/60 rounded-xl border border-white/30 p-6 hover:bg-white/80 transition-all duration-200"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center backdrop-blur-sm bg-white/60 rounded-2xl border border-white/30 p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Start Exploring Biodiversity
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers and nature enthusiasts discovering the incredible diversity of plant life on Earth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200">
              Start as Citizen Scientist
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
              Access Research Tools
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 backdrop-blur-sm bg-white/40 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
                <span className="text-xl font-bold text-gray-900">Faces of Plants</span>
              </div>
              <p className="text-gray-600 mb-4">
                Making biodiversity data accessible through AI-powered natural language search. 
                Powered by GBIF&apos;s global network of scientific institutions.
              </p>
              <div className="flex space-x-4">
                <span className="text-sm text-gray-500">Powered by GBIF</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Open Science</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For Citizens</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Plant Identification</li>
                <li>Local Flora Discovery</li>
                <li>Nature Education</li>
                <li>Conservation Awareness</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">For Researchers</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Data Analysis Tools</li>
                <li>Species Distribution</li>
                <li>Research Datasets</li>
                <li>API Access</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 Faces of Plants. Built with ♥ for biodiversity research and education.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FacesOfPlantsLanding;

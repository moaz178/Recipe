import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Clock, Search, Heart } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useRecipeContext } from '../hooks/useRecipeContext';
import RecipeCard from '../components/RecipeCard';

const SummaryPage = () => {
  const { searchHistory, clearHistory, favorites, searchRecipes } = useRecipeContext();
  const [activeTab, setActiveTab] = useState('history');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleSearchClick = (query) => {
    searchRecipes(query);
    window.location.href = '/recipes';
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Your Culinary Journey
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your recipe discoveries and save your favorites
          </p>
        </AnimatedSection>

        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-full shadow-md p-1 flex">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Clock className="h-4 w-4 inline-block mr-2" />
              Search History
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'favorites'
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-4 w-4 inline-block mr-2" />
              Favorites
            </button>
          </div>
        </div>

        {activeTab === 'history' ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Searches</h2>
              {searchHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear History
                </button>
              )}
            </div>

            {searchHistory.length === 0 ? (
              <div className="text-center py-10">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your search history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchHistory.map((item) => (
                  <AnimatedSection key={item.id} delay={0.1}>
                    <motion.div
                      className="bg-orange-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center">
                            <Search className="h-4 w-4 text-orange-500 mr-2" />
                            <span className="font-medium text-gray-800">{item.query}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            <Clock className="h-3 w-3 inline-block mr-1" />
                            {formatDate(item.timestamp)}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-3">
                            {item.results} results
                          </span>
                          <button
                            onClick={() => handleSearchClick(item.query)}
                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200"
                          >
                            Search Again
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Favorite Recipes</h2>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl shadow-lg p-6">
                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your favorite recipes will appear here</p>
                <button
                  onClick={() => window.location.href = '/recipes'}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full"
                >
                  Discover Recipes
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((recipe, index) => (
                  <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
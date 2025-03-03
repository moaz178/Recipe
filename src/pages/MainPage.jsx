import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import AnimatedSection from '../components/AnimatedSection';
import { useRecipeContext } from '../hooks/useRecipeContext';

const MainPage = () => {
  const { recipes, loading, error, searchRecipes } = useRecipeContext();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Load initial recipes
    searchRecipes('');
  }, [searchRecipes]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Find Your Perfect Recipe
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Search from our collection of delicious recipes for any occasion
          </p>
        </AnimatedSection>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="mb-8">
          {/* <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center mx-auto px-4 py-2 bg-white rounded-full shadow text-gray-700 hover:shadow-md transition-shadow"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {filtersOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </button> */}

          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-lg shadow-md p-6 mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meal Type
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">All Types</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="dessert">Dessert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cooking Time
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Any Time</option>
                      <option value="15">Under 15 minutes</option>
                      <option value="30">Under 30 minutes</option>
                      <option value="60">Under 1 hour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diet
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">All Diets</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="gluten-free">Gluten Free</option>
                      <option value="keto">Keto</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => searchRecipes('')}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div ref={ref}>
            {recipes.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
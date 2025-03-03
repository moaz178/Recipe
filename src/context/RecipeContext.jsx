import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Safe parsing for localStorage data
  const parseLocalStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (err) {
      console.error(`Error parsing ${key} from localStorage`, err);
      return defaultValue;
    }
  };

  const [searchHistory, setSearchHistory] = useState(() => parseLocalStorage('searchHistory', []));
  const [favorites, setFavorites] = useState(() => parseLocalStorage('favorites', []));

  // Update localStorage when searchHistory or favorites change
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Memoized search function using TheMealDB API as open source data
  const searchRecipes = useCallback(async (query, filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch recipes from TheMealDB API.
      // When query is empty, the API returns a default set of meals.
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query || ''}`);
      const meals = response.data.meals;

      // Transform the API data to fit the internal recipe format
      const transformedRecipes = meals
        ? meals.map(meal => {
            // Extract ingredients from meal data (up to 20 ingredients are provided)
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
              const ingredient = meal[`strIngredient${i}`];
              if (ingredient && ingredient.trim()) {
                ingredients.push(ingredient);
              }
            }
            return {
              id: meal.idMeal,
              title: meal.strMeal,
              image: meal.strMealThumb,
              ingredients,
              time: "N/A",       // TheMealDB does not provide time info
              calories: "N/A",   // TheMealDB does not provide calorie info
              servings: "N/A"    // TheMealDB does not provide serving info
            };
          })
        : [];

      setRecipes(transformedRecipes);

      // Update search history if a query is provided
      if (query) {
        const newSearch = {
          id: Date.now(),
          query,
          timestamp: new Date().toISOString(),
          results: transformedRecipes.length
        };
        setSearchHistory(prev => [newSearch, ...prev.slice(0, 9)]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle favorite status for a recipe
  const toggleFavorite = useCallback(recipe => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === recipe.id);
      return exists ? prev.filter(fav => fav.id !== recipe.id) : [...prev, recipe];
    });
  }, []);

  const isFavorite = useCallback(
    id => favorites.some(fav => fav.id === id),
    [favorites]
  );

  const clearHistory = () => setSearchHistory([]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        error,
        searchRecipes,
        searchHistory,
        clearHistory,
        favorites,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

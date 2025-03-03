import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useRecipeContext } from '../hooks/useRecipeContext';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const { searchRecipes } = useRecipeContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchRecipes(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    searchRecipes('');
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <form 
        onSubmit={handleSubmit}
        className={`relative flex items-center transition-all duration-300 ${
          expanded ? 'bg-white shadow-xl' : 'bg-white/80 shadow-lg'
        } rounded-full overflow-hidden`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          placeholder="Search for recipes, ingredients..."
          className="w-full py-3 px-6 outline-none bg-transparent text-gray-700"
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <button
          type="submit"
          className="h-full px-4 bg-gradient-to-r from-orange-400 to-red-500 text-white flex items-center justify-center"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
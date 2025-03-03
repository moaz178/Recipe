import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Heart } from 'lucide-react';
import { useRecipeContext } from '../hooks/useRecipeContext';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe, index }) => {
  const { toggleFavorite, isFavorite } = useRecipeContext();
  const favorite = isFavorite(recipe.id);

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <button
          onClick={() => toggleFavorite(recipe)}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
        >
          <Heart 
            className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
          />
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
        
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-orange-500" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-orange-500" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-1">Ingredients:</div>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
              <span 
                key={i} 
                className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <Link 
            to={`/recipe/${recipe.id}`}
            className="block w-full text-center py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium rounded-lg hover:from-orange-500 hover:to-red-600 transition-colors"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;

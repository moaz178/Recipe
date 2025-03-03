import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const meals = response.data.meals;
        if (meals && meals.length > 0) {
          setRecipe(meals[0]);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleBack = () => {
    // If there's history, go back; otherwise, navigate to the recipes page.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/recipes');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex justify-center items-center bg-gradient-to-br from-amber-50 to-orange-100">
        <p className="text-lg text-gray-700">Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 to-orange-100">
        <p className="text-lg text-red-500">{error}</p>
        <button
          onClick={() => navigate('/recipes')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  if (!recipe) return null;

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {recipe.strMeal}
        </h1>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full rounded mb-4 object-cover"
        />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Ingredients
        </h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          {ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Instructions
        </h2>
        <p className="mb-4 whitespace-pre-line text-gray-700">
          {recipe.strInstructions}
        </p>
        {recipe.strYoutube && (
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Video Tutorial
            </h2>
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;

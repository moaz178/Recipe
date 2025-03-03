import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import SummaryPage from './pages/SummaryPage';
import RecipeDetails from './pages/RecipeDetails'; // New RecipeDetails page
import Navbar from './components/Navbar';
import { RecipeProvider } from './context/RecipeContext';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/recipes" element={<MainPage />} />
              <Route path="/history" element={<SummaryPage />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* Added route for recipe details */}
            </Routes>
          </motion.div>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;

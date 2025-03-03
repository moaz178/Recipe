import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UtensilsCrossed, History, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Moaz's CulinaryQuest
            </span>
          </Link>
          
          <div className="flex space-x-1">
            <NavLink to="/Recipe" active={location.pathname === '/'}>
              <Home className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </NavLink>
            
            <NavLink to="/recipes" active={location.pathname === '/recipes'}>
              <UtensilsCrossed className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Recipes</span>
            </NavLink>
            
            <NavLink to="/history" active={location.pathname === '/history'}>
              <History className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">History</span>
            </NavLink>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 rounded-full flex items-center transition-all ${
        active 
          ? 'text-white' 
          : 'text-gray-700 hover:text-orange-500'
      }`}
    >
      {active && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
          layoutId="navBackground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
      <span className={`relative z-10 flex items-center ${active ? 'font-medium' : ''}`}>
        {children}
      </span>
    </Link>
  );
};

export default Navbar;
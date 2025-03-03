import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, ChefHat, Clock, Search } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const LandingPage = () => {
  const navigate = useNavigate();

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="hero-image absolute inset-0 bg-black/40">
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Cooking background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <UtensilsCrossed className="h-16 w-16 mx-auto mb-4 text-orange-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          >
            <span className="block">Discover</span>
            <span className="text-orange-400">Culinary Magic</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-100"
          >
            Find the perfect recipe for any occasion, ingredient, or craving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              onClick={() => navigate('/recipes')}
              className="px-8 py-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Exploring
              <Search className="inline-block ml-2 h-5 w-5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-10 left-0 right-0 flex justify-center"
          >
            <div className="animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1">
                <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Why Choose <span className="text-orange-500">CulinaryQuest</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-10">
            <AnimatedSection delay={0.2}>
              <div className="bg-orange-50 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Smart Search</h3>
                <p className="text-gray-600">
                  Find recipes based on ingredients you already have at home.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-orange-50 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ChefHat className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Expert Curated</h3>
                <p className="text-gray-600">
                  Recipes tested and approved by professional chefs.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="bg-orange-50 rounded-xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Save Time</h3>
                <p className="text-gray-600">
                  Quick recipes for busy days, detailed instructions for special occasions.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to discover your next favorite meal?
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className="text-xl max-w-2xl mx-auto mb-10">
              Join thousands of food enthusiasts who have transformed their cooking experience.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4}>
            <button
              onClick={() => navigate('/recipes')}
              className="px-8 py-4 bg-white text-orange-500 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Recipes
            </button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
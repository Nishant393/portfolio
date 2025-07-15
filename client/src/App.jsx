import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"
import { pages } from './data/navigationData';
import { personalInfo } from './data/personalData';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard'
import { Menu, X, User, Code, Briefcase, FileText, Mail, Github, Linkedin, ArrowRight, Coffee, Shield } from 'lucide-react';
import NotFound from './pages/NotFound';

// Navigation component that uses React Router
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to get current page ID from pathname
  const getCurrentPageId = () => {
    switch (location.pathname) {
      case '/':
        return 'home';
      case '/about':
        return 'about';
      case '/skills':
        return 'skills';
      case '/projects':
        return 'projects';
      case '/contact':
        return 'contact';
      case '/a':
        return 'admin';
      default:
        return 'home';
    }
  };

  const getCurrentPath = () => {
    return location.pathname;
  };

  const currentPageId = getCurrentPageId();

  // Add admin page to pages array for navigation
  const allPages = [
    ...pages,
    { id: 'admin', label: 'Admin', path: '/a', icon: Shield }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Path */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {personalInfo.name.split(' ').map(name => name[0]).join('')}
              </div>
              <Link to="/" className="text-lg font-bold text-slate-800 hover:text-slate-600 transition-colors">
                {personalInfo.name}
              </Link>
            </div>
            <div className="hidden sm:block">
              <span className="text-slate-500 text-sm font-mono bg-slate-100 px-3 py-1 rounded-full">
                ~{getCurrentPath()}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {pages.map((page) => (
              <Link
                key={page.id}
                to={page.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  currentPageId === page.id
                    ? 'text-white bg-slate-800 shadow-lg'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <page.icon size={16} />
                <span className="font-medium">{page.label}</span>
              </Link>
            ))}
            
            {/* Admin Link - Hidden by default, you can show it conditionally */}
            <Link
              to="/a"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                currentPageId === 'admin'
                  ? 'text-white bg-slate-800 shadow-lg'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Shield size={16} />
              <span className="font-medium">Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white">
            <div className="space-y-2">
              {allPages.map((page) => (
                <Link
                  key={page.id}
                  to={page.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentPageId === page.id
                      ? 'text-white bg-slate-800'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <page.icon size={18} />
                  <span className="font-medium">{page.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Main App component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="font-sans">
        <Navigation />

        {/* Main Content */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/a" element={<AdminDashboard />} />
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-white text-slate-900 rounded-lg flex items-center justify-center font-bold text-sm">
                    {personalInfo.name.split(' ').map(name => name[0]).join('')}
                  </div>
                  <span className="text-lg font-semibold">{personalInfo.name}</span>
                </div>
                <p className="text-slate-400">Building digital experiences, one line at a time.</p>
              </div>
              
              <div className="flex items-center space-x-6">
                <a 
                  href={personalInfo.github} 
                  className="text-slate-400 hover:text-white transition-colors transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a 
                  href={personalInfo.linkedin} 
                  className="text-slate-400 hover:text-white transition-colors transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
            
            <div className="border-t border-slate-700 mt-8 pt-6 text-center">
              <p className="text-slate-400 text-sm">
                © 2025 {personalInfo.name}. Crafted with care and probably too much coffee.
              </p>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes fade-in {
            from { 
              opacity: 0; 
              transform: translateY(30px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          @keyframes bounce-slow {
            0%, 20%, 50%, 80%, 100% { 
              transform: translateY(0); 
            }
            40% { 
              transform: translateY(-8px); 
            }
            60% { 
              transform: translateY(-4px); 
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </Router>
  );
};

export default App;
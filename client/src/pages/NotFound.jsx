import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Search, Github, Linkedin, Coffee, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [glitchText, setGlitchText] = useState('404');

    useEffect(() => {
        setIsVisible(true);
        
        // Glitch effect for 404 text
        const glitchChars = ['4', '0', '4', '?', '#', '@', '!'];
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 3);
            const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            
            setGlitchText(prev => {
                const chars = prev.split('');
                chars[randomIndex] = randomChar;
                return chars.join('');
            });
            
            setTimeout(() => setGlitchText('404'), 100);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="container mx-auto px-6 py-16 lg:py-12">
                <div className="max-w-4xl mx-auto text-center">
                    
                    {/* Main 404 Content */}
                    <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                        
                        {/* Error Code with Glitch Effect */}
                        <div className="relative">
                            <div className="text-8xl pt-sans-bold lg:text-9xl font-bold text-slate-200 select-none">
                                404
                            </div>
                            <div className="absolute inset-0 text-8xl lg:text-9xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent animate-pulse">
                                {glitchText}
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-3 text-slate-600 mb-4">
                                <AlertCircle size={24} />
                                <span className="text-lg font-medium">Page Not Found</span>
                            </div>
                            
                            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                                Oops! This page seems to have{' '}
                                <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                                    wandered off
                                </span>
                            </h1>
                            
                            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                                The page you're looking for doesn't exist or has been moved. 
                                Don't worry though – let's get you back on track to explore my work and projects.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center pt-8">
                            <Link to="/">
                                <button className="group bg-slate-800 text-white px-7 py-3 rounded-xl hover:bg-slate-900 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    <Home size={18} />
                                    Back to Home
                                </button>
                            </Link>
                            
                            <Link to="/projects">
                                <button className="border-2 border-slate-300 text-slate-700 px-7 py-3 rounded-xl hover:border-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    <Search size={18} className="inline mr-2" />
                                    View Projects
                                </button>
                            </Link>
                            
                            <button 
                                onClick={() => window.history.back()}
                                className="border-2 border-slate-300 text-slate-700 px-7 py-3 rounded-xl hover:border-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <ArrowLeft size={18} className="inline mr-2" />
                                Go Back
                            </button>
                        </div>
                    </div>

                    {/* Helpful Links Section */}
                    <div className={`mt-16 ${isVisible ? 'animate-fade-in-delay' : 'opacity-0'}`}>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                You might be looking for
                            </h2>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                <Link to="/projects" className="group">
                                    <div className="bg-slate-50 hover:bg-slate-100 rounded-xl p-6 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-md">
                                        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Search size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">My Projects</h3>
                                        <p className="text-slate-600 text-sm">Explore my latest work and side projects</p>
                                    </div>
                                </Link>
                                
                                <Link to="/contact" className="group">
                                    <div className="bg-slate-50 hover:bg-slate-100 rounded-xl p-6 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-md">
                                        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Coffee size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Let's Chat</h3>
                                        <p className="text-slate-600 text-sm">Get in touch for collaboration opportunities</p>
                                    </div>
                                </Link>
                                
                                <Link to="/about" className="group">
                                    <div className="bg-slate-50 hover:bg-slate-100 rounded-xl p-6 transition-all duration-300 border border-slate-200 hover:border-slate-300 hover:shadow-md">
                                        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <AlertCircle size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">About Me</h3>
                                        <p className="text-slate-600 text-sm">Learn more about my journey and skills</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className={`mt-12 ${isVisible ? 'animate-fade-in-delay-2' : 'opacity-0'}`}>
                        <p className="text-slate-600 mb-4">Or connect with me on social media</p>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://github.com/Nishant393"
                                className="text-slate-600 hover:text-slate-900 transition-colors transform hover:scale-110"
                                aria-label="GitHub Profile"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href="https://linkedin.com/in/nishant-pawar-44b4162bb"
                                className="text-slate-600 hover:text-slate-900 transition-colors transform hover:scale-110"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
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
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                
                .animate-fade-in-delay {
                    animation: fade-in 0.8s ease-out forwards;
                    animation-delay: 0.2s;
                }
                
                .animate-fade-in-delay-2 {
                    animation: fade-in 0.8s ease-out forwards;
                    animation-delay: 0.4s;
                }
                
                @keyframes glitch {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-2px); }
                    40% { transform: translateX(2px); }
                    60% { transform: translateX(-1px); }
                    80% { transform: translateX(1px); }
                }
                
                .glitch {
                    animation: glitch 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default NotFound;
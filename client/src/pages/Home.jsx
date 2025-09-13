import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, LucideKey, LucideMove3D, StarHalf } from 'lucide-react';
import { Menu, X, User, Code, Briefcase, FileText, Mail, Coffee } from 'lucide-react';
import image from "../../src/components/download.png"
import axios from 'axios';
import { server } from '../components/server';
import { Link } from 'react-router-dom';

const Home = () => {
    const [currentOccupation, setCurrentOccupation] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        occupation: [],
        email: "",
        mobile: "",
        github: "",
        linkedin: "",
        bio: "",
        goal: ""
    });

    const getProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${server}me`);
            
            const data = response.data[0];
            
            // Parse occupation if it's a stringified JSON array
            let parsedOccupation = data.occupation;
            if (typeof data.occupation === 'string') {
                try {
                    parsedOccupation = JSON.parse(data.occupation);
                } catch (parseError) {
                    console.error("Error parsing occupation:", parseError);
                    // If parsing fails, fallback to splitting by comma or default array
                    parsedOccupation = data.occupation.includes(',') 
                        ? data.occupation.split(',').map(item => item.trim())
                        : [data.occupation];
                }
            }
            
            setPersonalInfo({
                ...data,
                occupation: parsedOccupation
            });
            
        } catch (error) {
            console.error("Error fetching data:", error);
            // Fallback to default data if API fails
            setPersonalInfo({
                name: "Nishant Pawar",
                occupation: ["Full Stack Developer", "Open Source Contributor"],
                email: "nishantpawar393@gmail.com",
                mobile: "+91 9881921001",
                github: "https://github.com/Nishant393",
                linkedin: "https://linkedin.com/in/nishant-pawar-44b4162bb",
                bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love creating intuitive user experiences and robust backend systems. When I'm not coding, you'll find me contributing to open source projects or writing technical blogs to share knowledge with the developer community.",
                goal: "My goal is to leverage cutting-edge technologies to solve real-world problems and make a positive impact through code. I'm constantly learning and adapting to new technologies while maintaining a strong foundation in software engineering principles."
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsVisible(true);
        getProjects();
    }, []);

    useEffect(() => {
        if (!loading && personalInfo.occupation.length > 0) {
            const interval = setInterval(() => {
                setCurrentOccupation((prev) => (prev + 1) % personalInfo.occupation.length);
            }, 3500);
            return () => clearInterval(interval);
        }
    }, [loading, personalInfo.occupation.length]);

    // Loading Component
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    {/* Loading Spinner */}
                    <div className="relative mb-8">
                        <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-slate-600 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    </div>
                    
                    {/* Loading Messages */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-800">Loading Portfolio</h2>
                        <p className="text-slate-600 animate-pulse">Fetching the latest information...</p>
                    </div>
                    
                    {/* Loading Dots */}
                    <div className="flex justify-center space-x-2 mt-6">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="container mx-auto px-6 py-16 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600 mb-2">
                                <LucideKey className='animate-bounce-slow' size={20} />
                                <span className="text-sm font-medium tracking-wide">Learning never exhausts the mind</span>
                            </div>

                            <h1 className="text-4xl pt-sans-bold hover:scale-105 cursor-pointer transition-all duration-500 lg:text-6xl font-bold text-slate-900 leading-tight">
                                Hey there! I'm{' '}
                                <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                                    {personalInfo.name}
                                </span>
                            </h1>

                            <div className="h-16 flex items-center">
                                <div className="text-xl lg:text-2xl font-semibold text-slate-600 transition-all duration-500">
                                    <span className="border-r-2 pt-sans-regular-italic border-slate-400 pr-2 animate-pulse">
                                        {personalInfo.occupation[currentOccupation]}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                            {personalInfo.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to={"./projects"}>
                                <button
                                    className="group bg-slate-800 text-white px-7 py-3 rounded-xl hover:bg-slate-900 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Explore My Work
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <Link to="./contact">
                                <button
                                    className="border-2 border-slate-300 text-slate-700 px-7 py-3 rounded-xl hover:border-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    Let's Chat
                                </button>
                            </Link>
                        </div>

                        <div className="flex gap-6 pt-6">
                            <a
                                href={personalInfo.github}
                                className="text-slate-600 hover:text-slate-900 transition-colors transform hover:scale-110"
                                aria-label="GitHub Profile"
                            >
                                <Github size={24} />
                            </a>
                            <a
                                href={personalInfo.linkedin}
                                className="text-slate-600 hover:text-slate-900 transition-colors transform hover:scale-110"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl transform rotate-6 opacity-30"></div>
                            <div className="absolute -inset-2 bg-gradient-to-r from-slate-300 to-slate-400 rounded-3xl transform -rotate-3 opacity-20"></div>

                            {/* Main avatar */}
                            <div className="relative w-72 h-72 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-3xl flex flex-col items-center justify-center text-white shadow-2xl transform hover:scale-105 transition-all duration-500 hover:animate-bounce">
                                <img src={image} alt="Profile" className="w-full  h-full object-cover rounded-3xl" />
                            </div>
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
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, User, Target, Heart, Coffee, Shield, Star, Code, Mail, Phone } from 'lucide-react';
import { personalInfo as fallbackPersonalInfo } from '../data/personalData';
import { skills as fallbackSkills } from '../data/skillsData';
import axios from 'axios';
import { server } from '../components/server';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);
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
  const [skills, setSkills] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${server}me`);
      console.log("About data received:", response.data[0]);
      setPersonalInfo(response.data[0]);
      
      // If you have a separate skills endpoint, you can fetch it here
      // For now, using fallback skills
      setSkills(fallbackSkills);
    } catch (error) {
      console.error("Error fetching about data:", error);
      // Fallback to imported data if API fails
      setPersonalInfo(fallbackPersonalInfo);
      setSkills(fallbackSkills);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    fetchData();
  }, []);

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
            <h2 className="text-2xl font-bold text-slate-800">Loading About Me</h2>
            <p className="text-slate-600 animate-pulse">Getting to know me better...</p>
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
      <div className="container mx-auto px-6 py-16 lg:py-24">
        
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div className="h-px w-16 bg-slate-300"></div>
            <Coffee className="text-slate-400" size={20} />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            About Me
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Passionate about creating meaningful digital experiences through code,
            innovation, and continuous learning.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Who I Am Section */}
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Who I Am</h2>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">My Story</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail size={18} className="text-slate-400" />
                      <span>{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone size={18} className="text-slate-400" />
                      <span>{personalInfo.mobile}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Code size={18} className="text-slate-400" />
                      <span>{JSON.parse(personalInfo.occupation).join(" • ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Goal Section */}
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                <Target className="text-white" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">My Goal</h2>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <p className="text-slate-600 leading-relaxed text-lg">
                {personalInfo.goal}
              </p>
            </div>
          </div>

          {/* Technologies Section */}
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                <Code className="text-white" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Technologies I Love</h2>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((tech, index) => (
                <div
                  key={tech.name}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 p-6"
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                        <Code className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {tech.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {tech.description}
                    </p>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-slate-300 to-slate-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '800ms' }}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Let's Connect</h2>
              <div className="flex justify-center gap-6">
                <a 
                  href={personalInfo.github}
                  className="group flex items-center gap-3 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 px-8 py-4 border border-slate-200"
                >
                  <Github size={24} className="text-slate-600 group-hover:text-slate-900 transition-colors" />
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors font-medium">GitHub</span>
                </a>
                <a 
                  href={personalInfo.linkedin}
                  className="group flex items-center gap-3 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 px-8 py-4 border border-slate-200"
                >
                  <Linkedin size={24} className="text-slate-600 group-hover:text-slate-900 transition-colors" />
                  <span className="text-slate-600 group-hover:text-slate-900 transition-colors font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-100 px-6 py-3 rounded-full">
            <Heart size={16} className="text-red-400" />
            <span>Always coding, always creating...</span>
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

export default About;
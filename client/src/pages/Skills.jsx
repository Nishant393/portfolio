import React, { useState, useEffect } from 'react';
import { Code, Zap, Shield, Star, Clock, Coffee, Heart, Award, Target, TrendingUp, Loader2 } from 'lucide-react';
import axios from 'axios';
import { server } from '../components/server';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    setLoading(true);
    
    axios.get(`${server}skills`)
      .then((data) => {
        setSkills(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
        setLoading(false);
      });
  }, []);

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-4">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-slate-600 text-lg">Loading skills...</p>
      </div>
    </div>
  );

  // No skills component
  const NoSkills = () => (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-200 rounded-full mb-4">
        <Star className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">No Skills Found</h3>
      <p className="text-slate-500">There are no skills to display at the moment.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-6 py-16 lg:py-12">

        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl pt-sans-bold font-bold text-slate-900 mb-4">
            Skills & Expertise
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
           Skills don't die;<br/> only people do
          </p>
        </div>

        {/* Skills Categories */}
        <div className="max-w-6xl mx-auto space-y-12">
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                <Star className="w-4 text-white h-4" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Skills & Tools</h2>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Loading State */}
            {loading && <LoadingSpinner />}

            {/* No Skills State */}
            {!loading && skills.length === 0 && <NoSkills />}

            {/* Skills Grid */}
            {!loading && skills.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skillList, categoryIndex) => {
                  return (
                    <div
                      key={skillList.name}
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 p-6"
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        {/* Skill Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                              {skillList.name}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {skillList.description}
                        </p>

                        {/* Hover effect indicator */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-slate-300 to-slate-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-100 px-6 py-3 rounded-full">
            <Heart size={16} className="text-red-400" />
            <span>Always learning, always growing...</span>
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
  );
};

export default Skills;
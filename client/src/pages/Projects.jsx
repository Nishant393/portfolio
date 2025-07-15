import { Github, ExternalLink } from 'lucide-react';
// import { projects } from '../data/projectsData';
import React, { useState, useEffect } from 'react';
import { Calendar, Tag, Code, Zap, Users, Shield, Star, Clock, Coffee, Heart, Loader2, FolderOpen } from 'lucide-react';
import { server } from '../components/server';
import axios from 'axios';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    setLoading(true);
    
    axios.get(`${server}projects`)
      .then((data) => {
        setProjects(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const getProjectIcon = (title) => {
    if (title.toLowerCase().includes('course')) return Users;
    if (title.toLowerCase().includes('smart')) return Zap;
    return Code;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Loader Component
  const LoaderComponent = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6">
        <Loader2 className="w-12 h-12 text-slate-400 animate-spin" />
        <div className="absolute inset-0 w-12 h-12 border-2 border-slate-200 rounded-full animate-pulse"></div>
      </div>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">Loading Projects</h3>
      <p className="text-slate-500 text-center max-w-md">
        Fetching my latest work... This won't take long!
      </p>
      <div className="flex gap-1 mt-4">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <FolderOpen className="w-12 h-12 text-slate-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-700 mb-3">No Projects Yet</h3>
      <p className="text-slate-500 text-center max-w-md mb-6">
        I'm currently working on some exciting projects! Check back soon to see what I'm building.
      </p>
      <div className="flex items-center gap-2 text-slate-600 bg-slate-100 px-6 py-3 rounded-full">
        <Coffee size={16} />
        <span>Stay tuned for updates...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
              <Code className="text-white" size={24} />
            </div>
            <div className="h-px w-16 bg-slate-300"></div>
            <Coffee className="text-slate-400" size={20} />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Things I've Built
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Each project tells a story of problem-solving, late-night debugging sessions, 
            and the occasional "aha!" moment. Here's what keeps me busy.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <LoaderComponent />
          ) : projects.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Projects Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project, index) => {
                  const IconComponent = getProjectIcon(project.title);
                  
                  return (
                    <div
                      key={index}
                      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 ${
                        isVisible ? 'animate-fade-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${index * 200}ms` }}
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative p-8">
                        {/* Project Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-all duration-300">
                              <IconComponent size={20} />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                {project.title}
                              </h3>
                              <div className="flex items-center gap-2 text-slate-500 text-sm">
                                <Clock size={14} />
                                <span>Recently updated</span>
                              </div>
                            </div>
                          </div>
                          
                          {hoveredProject === index && (
                            <div className="animate-bounce-slow">
                              <Star className="text-slate-400" size={18} />
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <Zap size={16} />
                            What it does:
                          </h4>
                          <div className="space-y-2">
                            {JSON.parse(project.features).map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-slate-600">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-8">
                          <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                            <Shield size={16} />
                            Built with:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {JSON.parse(project.techStack).map((tech, idx) => (
                              <span
                                key={idx}
                                className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors duration-200 cursor-default"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4 border-t border-slate-100">
                          <a
                            href={project.github}
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group-hover:scale-105 transform duration-200"
                          >
                            <Github size={18} />
                            <span className="font-medium">Source</span>
                          </a>
                          
                          <a
                            href={project.website}
                            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-all duration-200 transform hover:scale-105 shadow-lg"
                          >
                            <ExternalLink size={16} />
                            <span className="font-medium">View Live</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-16">
                <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-100 px-6 py-3 rounded-full">
                  <Heart size={16} className="text-red-400" />
                  <span>More projects coming soon...</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CSS Styles */}
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

export default Projects;
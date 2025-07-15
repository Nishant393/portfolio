import React, { useState, useEffect } from 'react';
import { Home, User, Code, Briefcase, BookOpen, Mail, Github, Linkedin, ExternalLink, Calendar, Tag, ArrowRight, Menu, X, MapPin, Phone } from 'lucide-react';

// Data
const personalInfo = {
  name: "Aryan Mehta",
  occupation: ["Full Stack Developer", "Open Source Contributor", "Tech Blogger"],
  email: "aryanmehta.dev@example.com",
  mobile: "+91 9876543210",
  github: "https://github.com/aryanmehta-dev",
  linkedin: "https://linkedin.com/in/aryanmehta-dev",
  bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love creating intuitive user experiences and robust backend systems. When I'm not coding, you'll find me contributing to open source projects or writing technical blogs to share knowledge with the developer community.",
  goal: "My goal is to leverage cutting-edge technologies to solve real-world problems and make a positive impact through code. I'm constantly learning and adapting to new technologies while maintaining a strong foundation in software engineering principles."
};

const projects = [
  {
    title: "CourseHub",
    description: "An online course management platform for teachers and students.",
    features: [
      "Role-based access (admin, student, teacher)",
      "Course creation, uploading videos, notes",
      "Secure login with JWT"
    ],
    techStack: ["React", "Node.js", "MongoDB", "TailwindCSS"],
    github: "https://github.com/aryanmehta-dev/coursehub",
    website: "https://coursehub.example.com",
    demoVideo: "https://youtu.be/coursehubdemo"
  },
  {
    title: "SmartCart",
    description: "A smart e-commerce app with AI-based recommendations.",
    features: [
      "Shopping cart with live offers",
      "Voice search product lookup",
      "Recommendation engine using collaborative filtering"
    ],
    techStack: ["Vue", "Firebase", "TensorFlow.js"],
    github: "https://github.com/aryanmehta-dev/smartcart",
    website: "https://smartcart.example.com"
  }
];


const skills = {
  Frontend: [
    { name: "React", level: 90 },
    { name: "Vue", level: 85 },
    { name: "HTML5", level: 95 },
    { name: "TailwindCSS", level: 90 }
  ],
  Backend: [
    { name: "Node.js", level: 88 },
    { name: "Express", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "Firebase", level: 75 }
  ],
  Tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 70 },
    { name: "Postman", level: 85 },
    { name: "VSCode", level: 95 }
  ]
};

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentOccupation, setCurrentOccupation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const pages = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'about', label: 'About', icon: User, path: '/about' },
    { id: 'skills', label: 'Skills', icon: Code, path: '/skills' },
    { id: 'projects', label: 'Projects', icon: Briefcase, path: '/projects' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOccupation((prev) => (prev + 1) % personalInfo.occupation.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1000);
  };

  const getCurrentPath = () => {
    const currentPageData = pages.find(page => page.id === currentPage);
    return currentPageData ? currentPageData.path : '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-6 py-20">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
                    Hi, I'm <span className="text-blue-600">{personalInfo.name}</span>
                  </h1>
                  <div className="text-2xl lg:text-3xl text-gray-600 mb-6 h-12">
                    <span className="animate-pulse">
                      {personalInfo.occupation[currentOccupation]}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setCurrentPage('projects')}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      View Projects <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={() => setCurrentPage('contact')}
                      className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      Contact Me
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-80 h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl animate-bounce-slow">
                    AM
                  </div>
                </div>
              </div>
            </div>
            <footer className="bg-gray-800 text-white py-8">
              <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                  <a href={personalInfo.github} className="hover:text-blue-400 transition-colors">
                    <Github size={24} />
                  </a>
                  <a href={personalInfo.linkedin} className="hover:text-blue-400 transition-colors">
                    <Linkedin size={24} />
                  </a>
                </div>
                <p>&copy; 2025 {personalInfo.name}. All rights reserved.</p>
              </div>
            </footer>
          </div>
        );

      case 'about':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Me</h1>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Who I Am</h2>
                      <p className="text-gray-600 mb-6">{personalInfo.bio}</p>
                      <h3 className="text-xl font-semibold text-blue-600 mb-3">My Goal</h3>
                      <p className="text-gray-600">{personalInfo.goal}</p>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Technologies I Love</h2>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>React & Vue.js for dynamic UIs</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>Node.js for scalable backends</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>MongoDB & Firebase for data</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>TailwindCSS for beautiful designs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-blue-600 mb-6">Connect With Me</h2>
                  <div className="flex justify-center space-x-6">
                    <a href={personalInfo.github} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Github size={24} />
                      <span>GitHub</span>
                    </a>
                    <a href={personalInfo.linkedin} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Linkedin size={24} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20">
            <div className="container mx-auto px">
              <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">Skills & Expertise</h1>
                
              <div className="max-w-6xl mx-auto">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category} className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6">{category}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {skillList.map((skill) => (
                        <div key={skill.name} className="bg-white rounded-lg p-6 shadow-lg">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-gray-800">{skill.name}</span>
                            <span className="text-blue-600 font-semibold">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20">
            <div className="container mx-auto px-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">My Projects</h1>
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {project.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <a href={project.github} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Github size={20} />
                          <span>Code</span>
                        </a>
                        <a href={project.website} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <ExternalLink size={20} />
                          <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20">
            <div className="container mx-auto px-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">Get In Touch</h1>
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-semibold text-blue-600 mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-blue-600" size={20} />
                      <span>{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-blue-600" size={20} />
                      <span>{personalInfo.mobile}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Github className="text-blue-600" size={20} />
                      <a href={personalInfo.github} className="hover:text-blue-600 transition-colors">
                        GitHub Profile
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Linkedin className="text-blue-600" size={20} />
                      <a href={personalInfo.linkedin} className="hover:text-blue-600 transition-colors">
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-semibold text-blue-600 mb-6">Send Message</h2>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your Message"
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      ></textarea>
                    </div>
                    <button
                      onClick={handleFormSubmit}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={formStatus === 'sending'}
                    >
                      {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                  {formStatus === 'success' && (
                    <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-blue-600">{personalInfo.name}</h1>
              <span className="text-gray-500 text-sm">localhost:3000{getCurrentPath()}</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === page.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <page.icon size={18} />
                  <span>{page.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setCurrentPage(page.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg transition-colors mb-2 ${
                    currentPage === page.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <page.icon size={18} />
                  <span>{page.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {renderPage()}
      </main>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
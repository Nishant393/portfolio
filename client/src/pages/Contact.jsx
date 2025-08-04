import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Send, MessageCircle, Coffee, Heart, Star, Clock, CheckCircle, User, AtSign, Loader2 } from 'lucide-react';
import axios from 'axios';
import { server } from '../components/server';

// // // Mock personal info for demo
// const personalInfo = {
//     email: "john.doe@example.com",
//     mobile: "+1 (555) 123-4567",
//     github: "https://github.com/johndoe",
//     linkedin: "https://linkedin.com/in/johndoe"
// };

const Contact = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isPageLoading, setIsPageLoading] = useState(true)
    const [Loading, setLoading] = useState(true)
    const [personalInfo, setPersonalInfo] = useState({
        email: "john.doe@example.com",
        mobile: "+1 (555) 123-4567",
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe"
    })


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${server}me`);
              setPersonalInfo(response.data[0]);

        } catch (error) {
            console.error("Error fetching about data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Simulate page loading
        fetchData()
        const timer = setTimeout(() => {
            setIsPageLoading(false);
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleFormSubmit = async () => {
        if (!contactForm.name || !contactForm.email || !contactForm.message) {
            alert('Please fill in all fields');
            return;
        }

        setFormStatus('sending');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setFormStatus('success');
            setContactForm({ name: '', email: '', message: '' });

            setTimeout(() => setFormStatus(''), 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('error');
            setTimeout(() => setFormStatus(''), 3000);
        }
    };

    const contactMethods = [
        {
            icon: Mail,
            label: 'Email',
            value: personalInfo.email,
            link: `mailto:${personalInfo.email}`,
            description: 'Drop me an email anytime',
            color: 'text-blue-600'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: personalInfo.mobile,
            link: `tel:${personalInfo.mobile}`,
            description: 'Give me a call',
            color: 'text-green-600'
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'GitHub Profile',
            link: personalInfo.github,
            description: 'Check out my code',
            color: 'text-gray-700'
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'LinkedIn Profile',
            link: personalInfo.linkedin,
            description: 'Connect professionally',
            color: 'text-blue-700'
        }
    ];

    // Page Loading Component
    const PageLoader = () => (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <MessageCircle className="text-slate-400" size={20} />
                    </div>
                </div>
                <p className="mt-4 text-slate-600 font-medium">Loading Contact...</p>
                <div className="mt-2 flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );

    // Enhanced Form Submit Button with Loader
    const SubmitButton = () => (
        <button
            type="button"
            onClick={handleFormSubmit}
            className="w-full bg-slate-800 text-white py-4 rounded-xl hover:bg-slate-900 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={formStatus === 'sending'}
        >
            {formStatus === 'sending' ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Sending Message...</span>
                    <div className="ml-2 flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </>
            ) : (
                <>
                    <Send size={18} />
                    Send Message
                </>
            )}
        </button>
    );

    if (isPageLoading) {
        return <PageLoader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="container mx-auto px-6 py-16 lg:py-12">

                {/* Header Section */}
                <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
                            <MessageCircle className="text-white" size={24} />
                        </div>
                    </div>

                    <h1 className="text-4xl lg:text-5xl pt-sans-bold font-bold text-slate-900 mb-4">
                        Let's Connect
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Have a project in mind? Want to collaborate? Or just want to say hi?
                        I'd love to hear from you. Choose your preferred way to reach out.
                    </p>
                </div>

                {/* Contact Content */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact Information */}
                        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                                        <User size={20} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">Get In Touch</h2>
                                </div>

                                <div className="space-y-4">
                                    {contactMethods.map((method, index) => {
                                        const IconComponent = method.icon;
                                        return (
                                            <div
                                                key={method.label}
                                                className="group relative bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-all duration-300 hover:shadow-md"
                                                onMouseEnter={() => setHoveredItem(index)}
                                                onMouseLeave={() => setHoveredItem(null)}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                                                            <IconComponent size={18} className={method.color} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-slate-900">{method.label}</h3>
                                                            <p className="text-sm text-slate-600">{method.description}</p>
                                                        </div>
                                                    </div>

                                                    
                                                </div>

                                                <div className="mt-3 ml-14">
                                                    <a
                                                        href={method.link}
                                                        className="text-slate-700 hover:text-slate-900 transition-colors duration-200 font-medium"
                                                        target={method.link.startsWith('http') ? '_blank' : '_self'}
                                                        rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                                    >
                                                        {method.value}
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border-l-4 border-slate-800">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Clock size={16} />
                                        <span className="font-medium">Response Time</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1">
                                        I typically respond within 24 hours during weekdays
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                                        <Send size={20} className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">Send Message</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                                            value={contactForm.name}
                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                            required
                                            disabled={formStatus === 'sending'}
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                                            <AtSign size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                                            value={contactForm.email}
                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                            required
                                            disabled={formStatus === 'sending'}
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3 top-4 text-slate-400">
                                            <MessageCircle size={18} />
                                        </div>
                                        <textarea
                                            placeholder="Your Message"
                                            rows="5"
                                            className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none"
                                            value={contactForm.message}
                                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                            required
                                            disabled={formStatus === 'sending'}
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-center">
                                        <SubmitButton />
                                    </div>
                                </div>

                                {/* Success Message */}
                                {formStatus === 'success' && (
                                    <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-3 animate-fade-in">
                                        <CheckCircle size={20} className="text-green-600" />
                                        <div>
                                            <p className="font-medium">Message sent successfully!</p>
                                            <p className="text-sm text-green-600">I'll get back to you soon.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {formStatus === 'error' && (
                                    <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3 animate-fade-in">
                                        <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center">
                                            <span className="text-red-600 text-sm">!</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Failed to send message</p>
                                            <p className="text-sm text-red-600">Please try again later.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-2 text-slate-600 bg-slate-100 px-6 py-3 rounded-full">
                        <Heart size={16} className="text-red-400" />
                        <span>Looking forward to hearing from you...</span>
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

export default Contact;
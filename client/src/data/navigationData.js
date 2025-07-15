import { Home, User, Code, Briefcase, BookOpen, Mail } from 'lucide-react';

export const pages = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'about', label: 'About', icon: User, path: '/about' },
  { id: 'skills', label: 'Skills', icon: Code, path: '/skills' },
  { id: 'projects', label: 'Projects', icon: Briefcase, path: '/projects' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' }
];
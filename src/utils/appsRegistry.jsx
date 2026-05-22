import React from 'react';
import { User, Code2, FolderKanban, Phone, Settings } from 'lucide-react';
import BrowserApp from '../apps/BrowserApp';
import ContactApp from '../apps/ContactApp';

export const appsRegistry = [
  {
    id: 'about',
    title: 'Sobre mi',
    icon: <User size={40} className="text-blue-500 dark:text-blue-400" />,
    component: <BrowserApp initialTab="about" />,
    defaultSize: { width: 800, height: 550 },
  },
  {
    id: 'projects',
    title: 'Proyectos',
    icon: <FolderKanban size={40} className="text-amber-500 dark:text-amber-400" />,
    component: <BrowserApp initialTab="projects" />,
    defaultSize: { width: 850, height: 580 },
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: <Code2 size={40} className="text-teal-500 dark:text-teal-400" />,
    component: <BrowserApp initialTab="skills" />,
    defaultSize: { width: 800, height: 550 },
  },
  {
    id: 'contact',
    title: 'Contacto',
    icon: <Phone size={40} className="text-green-500 dark:text-green-400" />,
    component: <ContactApp />,
    defaultSize: { width: 320, height: 440 },
  },
  {
    id: 'settings',
    title: 'Configuración',
    icon: <Settings size={40} className="text-indigo-500 dark:text-indigo-400" />,
    component: null,
    defaultSize: { width: 400, height: 300 },
  }
];

export const desktopApps = appsRegistry.filter(app => app.id !== 'settings');

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ArrowLeft, ArrowRight, RotateCw, Plus, X, 
  User, Code2, FolderKanban, Server, Database, Sparkles, 
  Layers, Lock, Cpu, Globe2, BookOpen, ExternalLink,
  ChevronRight, Calendar, Users, MessageSquare, LineChart, CheckCircle2
} from 'lucide-react';

const BrowserApp = ({ initialTab = 'about' }) => {
  const [activePage, setActivePage] = useState(initialTab); // 'about' | 'skills' | 'projects'
  const [selectedProject, setSelectedProject] = useState(null); // null | 'zoion' | 'eunoia'

  useEffect(() => {
    setActivePage(initialTab);
  }, [initialTab]);

  const getUrl = () => {
    if (activePage === 'about') return 'http://johnnyrondon.dev/sobre-mi';
    if (activePage === 'skills') return 'http://johnnyrondon.dev/sobre-mi#skills';
    if (activePage === 'projects') return 'http://johnnyrondon.dev/proyectos';
    return 'http://johnnyrondon.dev/';
  };

  const skillsData = {
    backend: [
      { name: 'Laravel 13 / Slim / Symfony', detail: 'Patrones avanzados, inyección de dependencias, colas con Redis', icon: <Server className="text-orange-500 w-4 h-4" /> },
      { name: 'PHP 8.3+', detail: 'Tipado estricto, atributos, constructores y optimizaciones de memoria', icon: <Server className="text-indigo-500 w-4 h-4" /> }
    ],
    frontend: [
      { name: 'React 19 (TypeScript / JS)', detail: 'Concurrent features, hook transitions, estados reactivos complejos', icon: <Code2 className="text-sky-500 w-4 h-4" /> },
      { name: 'Tailwind CSS 4 & CSS', detail: 'Diseños modernos, animaciones, variables CSS nativas, fluid layouts', icon: <Code2 className="text-teal-500 w-4 h-4" /> },
      { name: 'Vite', detail: 'HMR instantáneo y empaquetamiento optimizado de módulos SPA/Inertia', icon: <Code2 className="text-purple-500 w-4 h-4" /> }
    ],
    databases: [
      { name: 'PostgreSQL', detail: 'Optimización de consultas complejas, índices compuestos y triggers automáticos', icon: <Database className="text-blue-600 w-4 h-4" /> },
      { name: 'MySQL / SQLite', detail: 'Estructuración de datos e integridad referencial sólida', icon: <Database className="text-blue-500 w-4 h-4" /> },
      { name: 'Redis', detail: 'Bloqueos atómicos (Atomic Locks) y gestión rápida de colas/caché en memoria', icon: <Database className="text-red-500 w-4 h-4" /> }
    ],
    devops: [
      { name: 'Docker / Docker Compose', detail: 'Contenerización de entornos de desarrollo y despliegues', icon: <Cpu className="text-blue-400 w-4 h-4" /> },
      { name: 'Git & GitHub Actions', detail: 'Flujos de trabajo GitFlow, control de versiones e integración continua', icon: <Cpu className="text-gray-800 w-4 h-4" /> },
      { name: 'Nginx / Apache / Ubuntu Server', detail: 'Configuración de servidores seguros y administración de sistemas Unix', icon: <Cpu className="text-green-600 w-4 h-4" /> }
    ]
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 select-none font-sans text-gray-800">
      {/* Tab bar (simplified) */}
      <div className="flex items-center bg-slate-950 px-2 pt-2 pb-2 gap-1 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-1.5 px-2 text-white/40">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        
        {/* Navigation Tabs removed to make instances independent */}
      </div>

      {/* URL / Controls bar */}
      <div className="flex items-center bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-3 py-2 gap-3 flex-shrink-0 transition-colors">
        <div className="flex items-center gap-2 text-gray-400 dark:text-slate-500">
          <ArrowLeft size={16} className="cursor-not-allowed" />
          <ArrowRight size={16} className="cursor-not-allowed" />
          <RotateCw size={15} className="hover:text-gray-600 dark:hover:text-slate-300 cursor-pointer transition-colors" />
        </div>
        <div className="flex-1 flex items-center bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full px-3 py-1 text-xs text-gray-600 gap-2">
          <Globe size={13} className="text-gray-400 dark:text-slate-500" />
          <input 
            type="text" 
            readOnly 
            value={getUrl()}
            className="bg-transparent border-none outline-none w-full font-mono text-[11px] pointer-events-none text-gray-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Browser main content window */}
      <div className="flex-1 bg-white dark:bg-slate-900 overflow-y-auto p-6 md:p-8 relative transition-colors text-gray-800 dark:text-slate-200">
        <AnimatePresence mode="wait">
          {activePage === 'about' && (
            <motion.div 
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Header Profile Area */}
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-gray-100 pb-8">
                <div className="relative w-28 h-28 rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg border border-white/50 flex-shrink-0 flex items-center justify-center">
                  <img 
                    src="/johnny.jpg" 
                    alt="Johnny Rondón" 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-white font-bold text-3xl">
                    JR
                  </div>
                </div>
                <div className="text-center md:text-left space-y-2">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Johnny Rondón</h1>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full">Ingeniero en Informática</span>
                  </div>
                  <h2 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    Full Stack (orientado a Backend & Arquitectura de Software)
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                    Apasionado por el desarrollo de software premium y de alto rendimiento. Mi filosofía de desarrollo gira en torno a la planificación minuciosa, la arquitectura limpia (Clean Architecture) y una implacable atención al detalle. Me especializo en diseñar e implementar sistemas administrativos robustos, flujos de trabajo en tiempo real, arquitecturas reactivas avanzadas y optimización profunda de bases de datos relacionales.
                  </p>
                </div>
              </div>

              {/* Engineering Principles */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Principios de Ingeniería</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl flex gap-4 hover:border-blue-100 dark:hover:border-blue-900 hover:bg-blue-50/5 dark:hover:bg-blue-900/20 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400"><Layers size={20} /></div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wide">Planificación y Estructura</h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">Antes de escribir una sola línea de código, diseño la arquitectura, el modelo de datos y defino la robustez estructural necesaria.</p>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl flex gap-4 hover:border-indigo-100 dark:hover:border-indigo-900 hover:bg-indigo-50/5 dark:hover:bg-indigo-900/20 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400"><Lock size={20} /></div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wide">Robustez y Seguridad</h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">Implementación de mecanismos de control de concurrencia avanzados (como bloqueos atómicos en Redis) para garantizar la integridad absoluta de los datos.</p>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl flex gap-4 hover:border-teal-100 dark:hover:border-teal-900 hover:bg-teal-50/5 dark:hover:bg-teal-900/20 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400"><Cpu size={20} /></div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wide">Eficiencia Algorítmica</h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">Optimización profunda de recursos y costos (por ejemplo, mediante algoritmos FIFO para valuación de inventarios comerciales).</p>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl flex gap-4 hover:border-purple-100 dark:hover:border-purple-900 hover:bg-purple-50/5 dark:hover:bg-purple-900/20 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400"><Sparkles size={20} /></div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wide">Estética de Vanguardia</h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">Creo interfaces altamente refinadas, intuitivas y responsivas que aseguran una gran experiencia visual e interactiva.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'skills' && (
            <motion.div 
              key="skills"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4">
                <h1 className="text-xl font-black text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
                  <Code2 className="text-teal-500" /> Stack Tecnológico y Habilidades
                </h1>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Especialización técnica y herramientas utilizadas en entornos de producción real.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Backend */}
                <div className="border border-gray-100 dark:border-slate-800 rounded-2xl p-5 bg-gradient-to-b from-slate-50/80 dark:from-slate-800/80 to-transparent">
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="text-orange-500 w-5 h-5" />
                    <h3 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">Backend & API</h3>
                  </div>
                  <div className="space-y-3">
                    {skillsData.backend.map((skill, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="mt-1">{skill.icon}</div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800">{skill.name}</h4>
                          <p className="text-[10px] text-gray-500">{skill.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frontend */}
                <div className="border border-gray-100 dark:border-slate-800 rounded-2xl p-5 bg-gradient-to-b from-slate-50/80 dark:from-slate-800/80 to-transparent">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="text-sky-500 w-5 h-5" />
                    <h3 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">Frontend & UI</h3>
                  </div>
                  <div className="space-y-3">
                    {skillsData.frontend.map((skill, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="mt-1">{skill.icon}</div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800">{skill.name}</h4>
                          <p className="text-[10px] text-gray-500">{skill.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                <div className="border border-gray-100 dark:border-slate-800 rounded-2xl p-5 bg-gradient-to-b from-slate-50/80 dark:from-slate-800/80 to-transparent">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="text-blue-500 w-5 h-5" />
                    <h3 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">Bases de Datos & Caché</h3>
                  </div>
                  <div className="space-y-3">
                    {skillsData.databases.map((skill, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="mt-1">{skill.icon}</div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800">{skill.name}</h4>
                          <p className="text-[10px] text-gray-500">{skill.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DevOps */}
                <div className="border border-gray-100 dark:border-slate-800 rounded-2xl p-5 bg-gradient-to-b from-slate-50/80 dark:from-slate-800/80 to-transparent">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="text-purple-500 w-5 h-5" />
                    <h3 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">DevOps & Sistemas</h3>
                  </div>
                  <div className="space-y-3">
                    {skillsData.devops.map((skill, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="mt-1">{skill.icon}</div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-800">{skill.name}</h4>
                          <p className="text-[10px] text-gray-500">{skill.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {selectedProject === null ? (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 dark:border-slate-800 pb-4">
                    <h1 className="text-xl font-black text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
                      <FolderKanban className="text-amber-500" /> Proyectos Destacados
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Explora las soluciones que he diseñado y programado, junto con sus especificaciones técnicas de alto nivel.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project 1: Zoion */}
                    <div className="border border-gray-150 dark:border-slate-800 rounded-3xl p-6 bg-white dark:bg-slate-850 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-0.5 rounded-full">Clínico / ERP</span>
                        </div>
                        <h2 className="text-lg font-black text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">Zoion — Gestión Veterinaria</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Plataforma integral diseñada para optimizar la gestión operativa de clínicas veterinarias. Ofrece control de acceso basado en roles (RBAC) y un diseño totalmente responsivo enfocado en mobile-first.
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">Laravel 13</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">React 19</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">Inertia.js</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">PostgreSQL</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">Redis</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedProject('zoion')}
                        className="mt-6 w-full flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/10 cursor-pointer transition-all duration-200"
                      >
                        <span>Ver Detalles del Proyecto</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>

                    {/* Project 2: Eunoia */}
                    <div className="border border-gray-150 dark:border-slate-800 rounded-3xl p-6 bg-white dark:bg-slate-850 shadow-sm hover:shadow-md hover:border-pink-200 dark:hover:border-pink-800 transition-all duration-300 flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-2.5 py-0.5 rounded-full">Finanzas / ERP</span>
                        </div>
                        <h2 className="text-lg font-black text-gray-800 dark:text-white group-hover:text-pink-600 transition-colors">Eunoia Cosmetics — ERP Administrativo</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Solución ERP sofisticada dirigida a empresas comerciales y de retail para llevar a cabo la contabilidad general, administración de sucursales y control exhaustivo de existencias.
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">Laravel 13</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">React</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">Tailwind CSS</span>
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-gray-600">PostgreSQL</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setSelectedProject('eunoia')}
                        className="mt-6 w-full flex items-center justify-center gap-1.5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-pink-500/10 cursor-pointer transition-all duration-200"
                      >
                        <span>Ver Detalles del Proyecto</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Detailed view header */}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-bold transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>Volver a la lista de proyectos</span>
                  </button>

                  {selectedProject === 'zoion' ? (
                    <motion.div 
                      key="zoion-detail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                          <h1 className="text-xl font-black text-gray-800">Zoion — Sistema de Gestión Veterinaria</h1>
                        </div>
                        <p className="text-xs text-indigo-600 font-semibold mt-1">Laravel 13, React 19, TypeScript 6, PostgreSQL y Redis</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Features Column */}
                        <div className="lg:col-span-2 space-y-5">
                          <div className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Descripción del Proyecto</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Zoion Vet es una plataforma ERP integral diseñada para clínicas veterinarias que gestionan grandes volúmenes de consultas, historiales médicos y control de farmacia. Cuenta con portal público, portal de médicos, portal de clientes y de administración.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lógica de Negocio Avanzada</h3>
                            <div className="space-y-3">
                              <div className="p-3 border border-gray-100 bg-slate-50/50 rounded-xl flex gap-3">
                                <CheckCircle2 className="text-green-500 w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="text-xs font-semibold text-gray-800">Asignación Round-Robin para Médicos</h4>
                                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">Motor que equilibra la carga delegando de forma automática y equitativa la cita al médico disponible con menos consultas activas en el día, utilizando colas de Redis en memoria.</p>
                                </div>
                              </div>
                              <div className="p-3 border border-gray-100 bg-slate-50/50 rounded-xl flex gap-3">
                                <CheckCircle2 className="text-green-500 w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="text-xs font-semibold text-gray-800">Bloqueos Atómicos (Atomic Locks)</h4>
                                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">Evita la duplicidad o superposición en la reserva de recursos críticos (como quirófanos o doctores) en la misma milésima de segundo, asegurando integridad concurrente transaccional.</p>
                                </div>
                              </div>
                              <div className="p-3 border border-gray-100 bg-slate-50/50 rounded-xl flex gap-3">
                                <CheckCircle2 className="text-green-500 w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="text-xs font-semibold text-gray-800">Validaciones de Booking Tipo Wizard</h4>
                                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">Un asistente intuitivo de agendamiento para clientes en 3 pasos con validación estricta de solapamientos e intervalos de seguridad de 2 horas.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Capture space & Details */}
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Capturas de Pantalla</h3>
                          <div className="space-y-3">
                            <div className="aspect-video w-full rounded-2xl bg-gray-100 border border-gray-200 border-dashed flex flex-col items-center justify-center p-4 text-center">
                              <BookOpen size={24} className="text-gray-300" />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">Panel del Administrador</span>
                            </div>
                            <div className="aspect-video w-full rounded-2xl bg-gray-100 border border-gray-200 border-dashed flex flex-col items-center justify-center p-4 text-center">
                              <BookOpen size={24} className="text-gray-300" />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">Portal de Clientes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="eunoia-detail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                          <h1 className="text-xl font-black text-gray-800">Eunoia Cosmetics — ERP Administrativo</h1>
                        </div>
                        <p className="text-xs text-pink-600 font-semibold mt-1">Laravel 13, React, Tailwind CSS 4 y PostgreSQL</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Features Column */}
                        <div className="lg:col-span-2 space-y-5">
                          <div className="space-y-2">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Descripción del Proyecto</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              Eunoia es un sistema ERP de vanguardia enfocado en retail para gestionar inventarios, ventas multimoneda, facturación con tasas del Banco Central de Venezuela (BCV), rentabilidad y balances de cuentas de sucursales.
                            </p>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Características Técnicas Clave</h3>
                            <div className="space-y-3">
                              <div className="p-3 border border-gray-100 bg-slate-50/50 rounded-xl flex gap-3">
                                <CheckCircle2 className="text-pink-500 w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="text-xs font-semibold text-gray-800">Valuación de Inventarios FIFO (PEPS)</h4>
                                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">Implementa el método First-In, First-Out para deducir el stock de forma atómica de los lotes más antiguos del almacén y calcular con precisión milimétrica el costo real de ventas en BD.</p>
                                </div>
                              </div>
                              <div className="p-3 border border-gray-100 bg-slate-50/50 rounded-xl flex gap-3">
                                <CheckCircle2 className="text-pink-500 w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="text-xs font-semibold text-gray-800">Optimización de Consultas Relacionales</h4>
                                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">Configuración detallada de índices compuestos PostgreSQL con condiciones parciales para reportes financieros y acumulados en tiempo real con tiempos de respuesta menores a 5ms.</p>
                                </div>
                              </div>
                              <div className="p-3 border border-gray-100 bg-slate-50/50 rounded-xl flex gap-3">
                                <CheckCircle2 className="text-pink-500 w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="text-xs font-semibold text-gray-800">Multi-Moneda & Tasa BCV Dinámica</h4>
                                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">Mapeo dinámico y registro del cambio de tasas Dólar/Bolívar, recalculando de forma reactiva los montos e importes en los carritos de venta.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Capture space & Details */}
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Capturas de Pantalla</h3>
                          <div className="space-y-3">
                            <div className="aspect-video w-full rounded-2xl bg-gray-100 border border-gray-200 border-dashed flex flex-col items-center justify-center p-4 text-center">
                              <BookOpen size={24} className="text-gray-300" />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">Módulo de Ventas</span>
                            </div>
                            <div className="aspect-video w-full rounded-2xl bg-gray-100 border border-gray-200 border-dashed flex flex-col items-center justify-center p-4 text-center">
                              <BookOpen size={24} className="text-gray-300" />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">Módulo de Balances</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrowserApp;

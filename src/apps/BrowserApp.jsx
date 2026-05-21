import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  Globe, ArrowLeft, ArrowRight, RotateCw,
  Code2, FolderKanban, Server, Database,
  Layers, Cpu, BookOpen, ExternalLink,
  ChevronRight, MapPin, CheckCircle2, Zap, Shield, Palette
} from 'lucide-react';

/* ─── 3D Tilt card ─── */
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-default ${className}`}
    >
      {/* Glow highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{
          background: useTransform([glowX, glowY], ([gx, gy]) =>
            `radial-gradient(circle at ${gx} ${gy}, rgba(99,102,241,0.12), transparent 60%)`
          )
        }}
      />
      {children}
    </motion.div>
  );
};

/* ─── Animated name ─── */
const AnimatedName = () => {
  const name = "Johnny Rondón";
  return (
    <h1 className="text-3xl font-black text-white tracking-tight flex flex-wrap">
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
};

/* ─── About page ─── */
const AboutPage = () => {
  const principles = [
    {
      icon: <Layers size={22} />,
      title: 'Planificación y Estructura',
      desc: 'Diseño la arquitectura y el modelo de datos antes de escribir una sola línea de código. El orden evita el caos.',
      color: 'from-blue-500/10 to-indigo-500/5 border-blue-100 dark:border-blue-900/50',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
      accent: 'group-hover:border-blue-300 dark:group-hover:border-blue-700',
    },
    {
      icon: <Shield size={22} />,
      title: 'Robustez y Seguridad',
      desc: 'Bloqueos atómicos en Redis, transacciones ACID y RBAC para garantizar integridad en cada operación.',
      color: 'from-indigo-500/10 to-purple-500/5 border-indigo-100 dark:border-indigo-900/50',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400',
      accent: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-700',
    },
    {
      icon: <Zap size={22} />,
      title: 'Eficiencia Algorítmica',
      desc: 'Algoritmos FIFO para inventarios, índices compuestos en PostgreSQL y tiempos de respuesta bajo 5ms.',
      color: 'from-teal-500/10 to-cyan-500/5 border-teal-100 dark:border-teal-900/50',
      iconBg: 'bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400',
      accent: 'group-hover:border-teal-300 dark:group-hover:border-teal-700',
    },
    {
      icon: <Palette size={22} />,
      title: 'Estética de Vanguardia',
      desc: 'Interfaces refinadas y animadas que hacen que la tecnología se sienta intuitiva y humana.',
      color: 'from-purple-500/10 to-pink-500/5 border-purple-100 dark:border-purple-900/50',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
      accent: 'group-hover:border-purple-300 dark:group-hover:border-purple-700',
    },
    {
      icon: <Server size={22} />,
      title: 'Backend como columna vertebral',
      desc: 'Laravel es mi herramienta principal. Servicios desacoplados, colas, caché y APIs bien estructuradas.',
      color: 'from-orange-500/10 to-amber-500/5 border-orange-100 dark:border-orange-900/50',
      iconBg: 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400',
      accent: 'group-hover:border-orange-300 dark:group-hover:border-orange-700',
    },
    {
      icon: <Database size={22} />,
      title: 'Datos bien modelados',
      desc: 'Esquemas normalizados, migraciones limpias y relaciones que hacen sentido mucho más allá del MVP.',
      color: 'from-cyan-500/10 to-blue-500/5 border-cyan-100 dark:border-cyan-900/50',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400',
      accent: 'group-hover:border-cyan-300 dark:group-hover:border-cyan-700',
    },
  ];

  const stack = ['Laravel 13', 'React 19', 'TypeScript', 'PostgreSQL', 'Redis', 'Inertia.js', 'Tailwind CSS', 'Docker'];

  return (
    <div className="space-y-10">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 p-8 text-white shadow-xl">
        <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-purple-400/20 blur-2xl" />

        <div className="relative flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-24 h-24 rounded-3xl overflow-hidden bg-white/20 border-2 border-white/30 flex-shrink-0 flex items-center justify-center shadow-2xl"
          >
            <img
              src="/johnny.jpg"
              alt="Johnny Rondón"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div className="hidden w-full h-full items-center justify-center text-white font-bold text-3xl">JR</div>
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full shadow" />
          </motion.div>

          <div className="text-left space-y-2 flex-1">
            <AnimatedName />

            {/* Rol y ubicación alineados debajo del nombre */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex flex-col gap-0.5"
            >
              <span className="text-white/80 text-sm font-semibold">Ingeniero en Informática</span>
              <span className="text-white/60 text-xs flex items-center gap-1">
                <MapPin size={10} /> Caracas, VE
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-sm text-white/85 leading-relaxed max-w-xl text-left"
            >
              Soy desarrollador Full Stack con orientación al backend, especializado en Laravel y React. Me gusta construir sistemas complejos que realmente funcionen: desde la arquitectura de base de datos hasta la interfaz de usuario. He trabajado en sistemas de gestión veterinaria con agendamiento en tiempo real y ERPs para retail con lógica multimoneda. Lo que más me importa es que el código sea limpio, predecible y fácil de mantener.
            </motion.p>

            {/* Stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="flex flex-wrap gap-1.5"
            >
              {stack.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.04 }}
                  className="text-[10px] font-semibold px-2 py-0.5 bg-white/15 border border-white/20 rounded-full text-white/90"
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Principles — 3D tilt cards ── */}
      <div className="space-y-4">
        <motion.h3
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest"
        >
          Principios de Ingeniería
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className={`group p-5 rounded-2xl border bg-gradient-to-br ${p.color} ${p.accent} transition-all duration-300`}>
                <div className="flex gap-4 items-start" style={{ transform: 'translateZ(20px)' }}>
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${p.iconBg} shadow-sm`}>
                    {p.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-800 dark:text-slate-100 uppercase tracking-wide">{p.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed text-left">{p.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   BROWSER APP (shell — sin cambios funcionales)
═══════════════════════════════════════════════ */
const BrowserApp = ({ initialTab = 'about' }) => {
  const [activePage, setActivePage] = useState(initialTab);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => { setActivePage(initialTab); }, [initialTab]);

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
      {/* Tab dots */}
      <div className="flex items-center bg-slate-950 px-2 pt-2 pb-2 gap-1 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-1.5 px-2 text-white/40">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
      </div>

      {/* URL bar */}
      <div className="flex items-center bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-3 py-2 gap-3 flex-shrink-0 transition-colors">
        <div className="flex items-center gap-2 text-gray-400 dark:text-slate-500">
          <ArrowLeft size={16} className="cursor-not-allowed" />
          <ArrowRight size={16} className="cursor-not-allowed" />
          <RotateCw size={15} className="hover:text-gray-600 dark:hover:text-slate-300 cursor-pointer transition-colors" />
        </div>
        <div className="flex-1 flex items-center bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full px-3 py-1 text-xs text-gray-600 gap-2">
          <Globe size={13} className="text-gray-400 dark:text-slate-500" />
          <input type="text" readOnly value={getUrl()} className="bg-transparent border-none outline-none w-full font-mono text-[11px] pointer-events-none text-gray-800 dark:text-slate-200" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white dark:bg-slate-900 overflow-y-auto p-6 md:p-8 relative transition-colors text-gray-800 dark:text-slate-200">
        <AnimatePresence mode="wait">

          {activePage === 'about' && (
            <motion.div key="about" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
              <AboutPage />
            </motion.div>
          )}

          {activePage === 'skills' && (
            <motion.div key="skills" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4">
                <h1 className="text-xl font-black text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
                  <Code2 className="text-teal-500" /> Stack Tecnológico y Habilidades
                </h1>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Especialización técnica y herramientas utilizadas en entornos de producción real.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Backend & API', icon: <Server className="text-orange-500 w-5 h-5" />, data: skillsData.backend },
                  { title: 'Frontend & UI', icon: <Code2 className="text-sky-500 w-5 h-5" />, data: skillsData.frontend },
                  { title: 'Bases de Datos & Caché', icon: <Database className="text-blue-500 w-5 h-5" />, data: skillsData.databases },
                  { title: 'DevOps & Sistemas', icon: <Cpu className="text-purple-500 w-5 h-5" />, data: skillsData.devops },
                ].map((cat) => (
                  <div key={cat.title} className="border border-gray-100 dark:border-slate-800 rounded-2xl p-5 bg-gradient-to-b from-slate-50/80 dark:from-slate-800/80 to-transparent">
                    <div className="flex items-center gap-2 mb-4">{cat.icon}<h3 className="text-xs font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider">{cat.title}</h3></div>
                    <div className="space-y-3">
                      {cat.data.map((skill, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="mt-1">{skill.icon}</div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-800 dark:text-slate-200">{skill.name}</h4>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400">{skill.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activePage === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
              {selectedProject === null ? (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 dark:border-slate-800 pb-4">
                    <h1 className="text-xl font-black text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
                      <FolderKanban className="text-amber-500" /> Proyectos Destacados
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Explora las soluciones que he diseñado y programado.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-150 dark:border-slate-800 rounded-3xl p-6 bg-white dark:bg-slate-850 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col justify-between group">
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-0.5 rounded-full">Clínico / ERP</span>
                        <h2 className="text-lg font-black text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">Zoion — Gestión Veterinaria</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">Plataforma integral para clínicas veterinarias con control de acceso basado en roles (RBAC) y diseño mobile-first.</p>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {['Laravel 13','React 19','Inertia.js','PostgreSQL','Redis'].map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[9px] font-bold text-gray-600 dark:text-slate-300">{t}</span>)}
                        </div>
                      </div>
                      <button onClick={() => setSelectedProject('zoion')} className="mt-6 w-full flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all duration-200">
                        Ver Detalles <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="border border-gray-150 dark:border-slate-800 rounded-3xl p-6 bg-white dark:bg-slate-850 shadow-sm hover:shadow-md hover:border-pink-200 dark:hover:border-pink-800 transition-all duration-300 flex flex-col justify-between group">
                      <div className="space-y-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-2.5 py-0.5 rounded-full">Finanzas / ERP</span>
                        <h2 className="text-lg font-black text-gray-800 dark:text-white group-hover:text-pink-600 transition-colors">Eunoia — ERP Administrativo</h2>
                        <p className="text-xs text-gray-500 leading-relaxed">ERP para retail con contabilidad, inventario FIFO, multimoneda y tasas BCV en tiempo real.</p>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {['Laravel 13','React','Tailwind CSS','PostgreSQL'].map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[9px] font-bold text-gray-600 dark:text-slate-300">{t}</span>)}
                        </div>
                      </div>
                      <button onClick={() => setSelectedProject('eunoia')} className="mt-6 w-full flex items-center justify-center gap-1.5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold cursor-pointer transition-all duration-200">
                        Ver Detalles <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <button onClick={() => setSelectedProject(null)} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-bold transition-colors cursor-pointer">
                    <ArrowLeft size={14} /> Volver a proyectos
                  </button>
                  {selectedProject === 'zoion' ? (
                    <motion.div key="zoion-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-b border-gray-100 pb-4">
                        <h1 className="text-xl font-black text-gray-800 dark:text-white">Zoion — Sistema de Gestión Veterinaria</h1>
                        <p className="text-xs text-indigo-600 font-semibold mt-1">Laravel 13, React 19, TypeScript 6, PostgreSQL y Redis</p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-5">
                          <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">Plataforma ERP integral para clínicas veterinarias con portal público, médicos, clientes y administración.</p>
                          <div className="space-y-3">
                            {[
                              { t: 'Asignación Round-Robin', d: 'Equilibra la carga delegando la cita al médico con menos consultas activas usando colas Redis.' },
                              { t: 'Bloqueos Atómicos', d: 'Evita duplicidad en reservas críticas garantizando integridad concurrente transaccional.' },
                              { t: 'Booking Wizard 3 pasos', d: 'Validación estricta de solapamientos e intervalos de seguridad de 2 horas.' },
                            ].map(({ t, d }) => (
                              <div key={t} className="p-3 border border-gray-100 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl flex gap-3">
                                <CheckCircle2 className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div><h4 className="text-xs font-semibold text-gray-800 dark:text-slate-200">{t}</h4><p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">{d}</p></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          {['Panel del Administrador', 'Portal de Clientes'].map(l => (
                            <div key={l} className="aspect-video w-full rounded-2xl bg-gray-100 dark:bg-slate-800 border border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center">
                              <BookOpen size={24} className="text-gray-300" />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">{l}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="eunoia-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="border-b border-gray-100 pb-4">
                        <h1 className="text-xl font-black text-gray-800 dark:text-white">Eunoia — ERP Administrativo</h1>
                        <p className="text-xs text-pink-600 font-semibold mt-1">Laravel 13, React, Tailwind CSS 4 y PostgreSQL</p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-5">
                          <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">ERP de vanguardia para retail: inventarios, ventas multimoneda, facturación con tasa BCV y balances de sucursales.</p>
                          <div className="space-y-3">
                            {[
                              { t: 'Valuación FIFO (PEPS)', d: 'Deduce stock de lotes más antiguos y calcula el costo real de ventas con precisión milimétrica.' },
                              { t: 'Índices Compuestos PostgreSQL', d: 'Condiciones parciales para reportes financieros con tiempos de respuesta bajo 5ms.' },
                              { t: 'Multi-Moneda & Tasa BCV', d: 'Mapeo dinámico Dólar/Bolívar recalculando reactivamente los montos en el carrito.' },
                            ].map(({ t, d }) => (
                              <div key={t} className="p-3 border border-gray-100 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl flex gap-3">
                                <CheckCircle2 className="text-pink-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div><h4 className="text-xs font-semibold text-gray-800 dark:text-slate-200">{t}</h4><p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">{d}</p></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          {['Módulo de Ventas', 'Módulo de Balances'].map(l => (
                            <div key={l} className="aspect-video w-full rounded-2xl bg-gray-100 dark:bg-slate-800 border border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center">
                              <BookOpen size={24} className="text-gray-300" />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2">{l}</span>
                            </div>
                          ))}
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
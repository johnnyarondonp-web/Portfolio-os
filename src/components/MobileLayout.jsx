import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FolderKanban, Code2, Phone, Sun, Moon, ChevronRight, MapPin, CheckCircle2, Layers, Shield, Zap, Palette, Server, Database, ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import { appsRegistry } from '../utils/appsRegistry';
import heroImg from '../assets/hero.png';
import zoionPreview from '../assets/zoion-preview.png';
import eunoiaPreview from '../assets/eunoia-preview.png';
import zoionAdmin from '../assets/zoion-admin.png';
import zoionMobile1 from '../assets/zoion-mobile-1.webp';
import zoionMobile2 from '../assets/zoion-mobile-2.webp';
import eunoiaBalance from '../assets/eunoia-balance.png';
import eunoiaVentas from '../assets/eunoia-ventas.png';

const GithubIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const MailIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ─── HOME TAB ─── */
const HomeTab = ({ isDarkMode }) => (
  <div className="flex flex-col gap-5 pb-4">
    {/* Hero card */}
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 p-6 text-white shadow-2xl">
      <div className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-purple-400/20 blur-2xl" />
      <div className="relative flex gap-4 items-center">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/20 border-2 border-white/30 flex-shrink-0 shadow-xl">
          <img src={heroImg} alt="Johnny Rondón" className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div className="hidden w-full h-full items-center justify-center text-white font-bold text-2xl">JR</div>
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-black text-white leading-tight">Johnny Rondón</h1>
          <p className="text-white/80 text-xs font-semibold mt-0.5">Ingeniero en Informática</p>
          <div className="flex items-center gap-1 text-white/60 text-xs mt-1">
            <MapPin size={10} /> Caracas, VE
          </div>
        </div>
      </div>
      <div className="relative mt-4 bg-white/15 border border-white/20 rounded-2xl px-4 py-2.5 text-center">
        <p className="text-xs font-bold text-white">Full Stack Engineer · Laravel & TypeScript</p>
      </div>
      <p className="relative mt-3 text-xs text-white/85 leading-relaxed">
        Soy desarrollador Full Stack con orientación al backend, especializado en Laravel y React. Me gusta construir sistemas complejos que realmente funcionen: desde la arquitectura de base de datos hasta la interfaz de usuario. He trabajado en sistemas de gestión veterinaria con agendamiento en tiempo real y ERPs para retail con lógica multimoneda. Lo que más me importa es que el código sea limpio, predecible y fácil de mantener.
      </p>
      <div className="relative flex gap-3 mt-4 pt-3 border-t border-white/20 justify-center">
        <a href="https://github.com/johnnyarondonp-web/" target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all">
          <GithubIcon size={18} />
        </a>
        <a href="https://www.linkedin.com/in/johnny-rond%C3%B3n-9064962b8/" target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all">
          <LinkedinIcon size={18} />
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=johnnyarondonp@gmail.com" target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all">
          <MailIcon size={18} />
        </a>
      </div>
    </div>

    {/* Stack tags */}
    <div className={`rounded-2xl border p-4 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'} shadow-sm`}>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>Stack principal</p>
      <div className="flex flex-wrap gap-2">
        {['Laravel 13','React 19','TypeScript','PostgreSQL','Redis','Inertia.js','Tailwind CSS','Docker'].map(s => (
          <span key={s} className="text-[11px] font-bold px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 rounded-full text-indigo-600 dark:text-indigo-400">{s}</span>
        ))}
      </div>
    </div>

    {/* Principles */}
    <div className="space-y-3">
      <p className={`text-[10px] font-black uppercase tracking-widest px-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>Principios de ingeniería</p>
      {[
        { icon: <Layers size={16}/>, title: 'Planificación y estructura', desc: 'Arquitectura y modelo de datos antes del código.', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
        { icon: <Shield size={16}/>, title: 'Robustez y seguridad', desc: 'Bloqueos Redis, transacciones ACID y RBAC.', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
        { icon: <Zap size={16}/>, title: 'Eficiencia algorítmica', desc: 'FIFO, índices compuestos, respuestas bajo 5ms.', color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/30' },
        { icon: <Palette size={16}/>, title: 'Estética de vanguardia', desc: 'Interfaces refinadas que se sienten intuitivas.', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30' },
        { icon: <Server size={16}/>, title: 'Backend como columna', desc: 'Servicios desacoplados, colas, caché y APIs.', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/30' },
        { icon: <Database size={16}/>, title: 'Datos bien modelados', desc: 'Esquemas normalizados y relaciones que duran.', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/30' },
      ].map((p, i) => (
        <motion.div key={p.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
          className={`flex gap-3 items-start p-3.5 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'} shadow-sm`}>
          <div className={`w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center ${p.bg} ${p.color}`}>{p.icon}</div>
          <div className="min-w-0">
            <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{p.title}</p>
            <p className={`text-[11px] mt-0.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{p.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ─── PROJECTS TAB ─── */
const ProjectsTab = ({ isDarkMode }) => {
  const [selected, setSelected] = useState(null);

  const zoionFeatures = [
    { title: 'Round-Robin automático', desc: 'El médico con menos consultas activas recibe la nueva cita.' },
    { title: 'Bloqueos atómicos Redis', desc: 'Cache::lock() previene double-booking simultáneo.' },
    { title: 'Booking wizard 3 pasos', desc: 'Validación de solapamientos e intervalos de 2h.' },
    { title: 'RBAC de 4 roles', desc: 'Admin, recepcionista, médico y cliente.' },
  ];
  const eunoiaFeatures = [
    { title: 'Valuación FIFO (PEPS)', desc: 'lockForUpdate() evita race conditions en inventario.' },
    { title: 'Tasa BCV automática', desc: 'API BCV cada 30 min con caché y cálculo reactivo.' },
    { title: 'Transacciones atómicas', desc: 'DB::transaction() mantiene stock exacto sin borrar historial.' },
    { title: 'Índices compuestos', desc: 'Consultas financieras bajo 5ms en tablas críticas.' },
  ];

  if (selected === 'zoion') return (
    <div className="pb-4">
      <button onClick={() => setSelected(null)} className={`flex items-center gap-1.5 text-xs font-bold mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
        <ArrowLeft size={14}/> Volver
      </button>
      <div className={`rounded-2xl overflow-hidden border mb-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <img src={zoionPreview} alt="Zoion" className="w-full h-auto block"/>
      </div>
      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full">Clínico / ERP</span>
      <h1 className={`text-xl font-black mt-2 mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Zoion — Gestión Veterinaria</h1>
      <p className={`text-xs mb-3 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>ERP para clínicas veterinarias con agendamiento Round-Robin, bloqueos Redis y RBAC multinivel.</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {['Laravel 13','React 19','TypeScript','PostgreSQL','Redis'].map(t=>(
          <span key={t} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{t}</span>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        {zoionFeatures.map(f=>(
          <div key={f.title} className={`flex gap-2.5 p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
            <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={14}/>
            <div>
              <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{f.title}</p>
              <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[['Controladores','20+'],['Tests Auto','22'],['Páginas React','30+'],['Roles','4']].map(([k,v])=>(
          <div key={k} className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
            <div className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{k}</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{v}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Capturas</p>
        <div className="grid grid-cols-2 gap-2">
          <img src={zoionMobile1} alt="" className="rounded-xl w-full h-auto border border-gray-200 dark:border-slate-700"/>
          <img src={zoionMobile2} alt="" className="rounded-xl w-full h-auto border border-gray-200 dark:border-slate-700"/>
        </div>
        <img src={zoionAdmin} alt="" className="rounded-xl w-full h-auto border border-gray-200 dark:border-slate-700"/>
      </div>
      <a href="https://github.com/johnnyarondonp-web/Zoion-sistema" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-4 py-3 rounded-2xl bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors">
        <GithubIcon size={16}/> Ver en GitHub
      </a>
    </div>
  );

  if (selected === 'eunoia') return (
    <div className="pb-4">
      <button onClick={() => setSelected(null)} className={`flex items-center gap-1.5 text-xs font-bold mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
        <ArrowLeft size={14}/> Volver
      </button>
      <div className={`rounded-2xl overflow-hidden border mb-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <img src={eunoiaPreview} alt="Eunoia" className="w-full h-auto block"/>
      </div>
      <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 bg-pink-50 dark:bg-pink-900/30 px-2.5 py-1 rounded-full">Finanzas / ERP</span>
      <h1 className={`text-xl font-black mt-2 mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Eunoia — ERP Administrativo</h1>
      <p className={`text-xs mb-3 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>ERP retail con inventario FIFO, contabilidad multimoneda, tasa BCV en tiempo real e índices PostgreSQL.</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {['Laravel 13','PHP 8.3','Alpine.js','MySQL','Tailwind CSS'].map(t=>(
          <span key={t} className="px-2 py-0.5 bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 rounded-full text-[10px] font-bold text-pink-700 dark:text-pink-400">{t}</span>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        {eunoiaFeatures.map(f=>(
          <div key={f.title} className={`flex gap-2.5 p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
            <CheckCircle2 className="text-pink-500 flex-shrink-0 mt-0.5" size={14}/>
            <div>
              <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{f.title}</p>
              <p className={`text-[11px] mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[['Controladores','4+'],['Tests','12'],['Servicios','2'],['Migraciones','17']].map(([k,v])=>(
          <div key={k} className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
            <div className={`text-[10px] uppercase font-bold ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{k}</div>
            <div className="text-2xl font-black text-pink-600 dark:text-pink-400">{v}</div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Capturas</p>
        <img src={eunoiaBalance} alt="" className="rounded-xl w-full h-auto border border-gray-200 dark:border-slate-700"/>
        <img src={eunoiaVentas} alt="" className="rounded-xl w-full h-auto border border-gray-200 dark:border-slate-700"/>
      </div>
      <a href="https://github.com/johnnyarondonp-web/eunoia-sistema" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-4 py-3 rounded-2xl bg-pink-500 text-white text-sm font-bold shadow-lg shadow-pink-500/30 hover:bg-pink-600 transition-colors">
        <GithubIcon size={16}/> Ver en GitHub
      </a>
    </div>
  );

  return (
    <div className="space-y-4 pb-4">
      <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>Proyectos destacados</p>
      {[
        { id: 'zoion', badge: 'Clínico / ERP', title: 'Zoion — Gestión Veterinaria', desc: 'ERP veterinario con agendamiento Round-Robin y bloqueos Redis.', tags: ['Laravel 13','React 19','TypeScript','PostgreSQL'], color: 'emerald', img: zoionPreview },
        { id: 'eunoia', badge: 'Finanzas / ERP', title: 'Eunoia — ERP Administrativo', desc: 'ERP retail con FIFO, multimoneda y tasa BCV en tiempo real.', tags: ['Laravel 13','PHP 8.3','Alpine.js','MySQL'], color: 'pink', img: eunoiaPreview },
      ].map((p, i) => (
        <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
          onClick={() => setSelected(p.id)}
          className={`rounded-2xl overflow-hidden border cursor-pointer active:scale-[0.98] transition-transform ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'} shadow-sm`}>
          <div className="relative overflow-hidden" style={{ height: 160 }}>
            <img src={p.img} alt={p.title} className="w-full h-auto object-top object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
          </div>
          <div className="p-4 space-y-2">
            <span className={`text-[10px] font-black uppercase tracking-wider text-${p.color}-600 bg-${p.color}-50 dark:bg-${p.color}-900/30 px-2 py-0.5 rounded-full`}>{p.badge}</span>
            <h2 className={`text-sm font-black leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{p.title}</h2>
            <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{p.desc}</p>
            <div className="flex flex-wrap gap-1">
              {p.tags.map(t => (
                <span key={t} className={`px-1.5 py-0.5 text-[9px] font-bold rounded border text-${p.color}-600 dark:text-${p.color}-400 bg-${p.color}-50 dark:bg-${p.color}-900/20 border-${p.color}-100 dark:border-${p.color}-900/50`}>{t}</span>
              ))}
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold text-${p.color}-600 dark:text-${p.color}-400 pt-1`}>
              Ver detalles <ChevronRight size={12}/>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── TECH ICON (mobile) ─── */
const MobileTechIcon = ({ name, size = 18 }) => {
  const icons = {
    laravel: <svg viewBox="0 0 24 24" width={size} height={size} fill="#FF2D20"><path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"/></svg>,
    php: <svg viewBox="0 0 24 24" width={size} height={size} fill="#777BB4"><path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z"/></svg>,
    react: <svg viewBox="0 0 24 24" width={size} height={size} fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>,
    typescript: <svg viewBox="0 0 24 24" width={size} height={size} fill="#3178C6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>,
    tailwind: <svg viewBox="0 0 24 24" width={size} height={size} fill="#06B6D4"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>,
    vite: <svg viewBox="0 0 24 24" width={size} height={size} fill="#9135FF"><path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z"/></svg>,
    inertia: <svg viewBox="0 0 24 24" width={size} height={size} fill="#9553E9"><path d="M6.901 5.331H0L6.669 12 0 18.669h6.901L13.571 12 6.9 5.331zm10.43 0H10.43L17.099 12l-6.67 6.669h6.902L24 12l-6.669-6.669z"/></svg>,
    alpinejs: <svg viewBox="0 0 24 24" width={size} height={size} fill="#8BC0D0"><path d="m24 12-5.72 5.746-5.724-5.741 5.724-5.75L24 12zM5.72 6.254 0 12l5.72 5.746h11.44L5.72 6.254z"/></svg>,
    postgresql: <svg viewBox="0 0 24 24" width={size} height={size} fill="#4169E1"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.318.52 9.42 1.098L9.3 1.019A9.748 9.748 0 0 0 6.538.082C3.602.082 0 2.455 0 8.386c0 3.897 1.504 9.022 4.744 9.628.522.099.906-.2 1.242-.536.43-.43.848-1.42.61-1.955a9.334 9.334 0 0 1-.532-1.753c.224-.043.44-.116.63-.234a6.838 6.838 0 0 0 1.39-.97c.017.162.04.324.07.485.22 1.17.582 2.147 1.355 2.732l.146.08c.27.123.55.181.837.174.52-.014 1.038-.271 1.573-.601.39-.242.76-.566 1.103-.91l.235-.235c.367.15.781.22 1.217.196a3.646 3.646 0 0 0 1.495-.407l.068-.04a3.61 3.61 0 0 0 1.23-1.248 9.527 9.527 0 0 1 .256.49c.397.801.76 1.386 1.245 1.675.406.24.824.295 1.227.11 1.21-.556 1.855-2.105 2.198-3.855.267-1.373.37-2.898.373-4.539C24 3.076 21.102 0 17.128 0z"/></svg>,
    mysql: <svg viewBox="0 0 24 24" width={size} height={size} fill="#4479A1"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5z"/></svg>,
    redis: <svg viewBox="0 0 24 24" width={size} height={size} fill="#FF4438"><path d="M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73z"/></svg>,
    docker: <svg viewBox="0 0 24 24" width={size} height={size} fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>,
    github: <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
    framer: <svg viewBox="0 0 24 24" width={size} height={size} fill="#0055FF"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/></svg>,
    axios: <svg viewBox="0 0 24 24" width={size} height={size} fill="#5A29E4"><path d="M11.0683 2.89968V22.2973l-2.11399 1.70265V7.8638H4.975l6.0933-4.96412zM14.93426 0v15.76724H19.025l-6.20044 5.08865V1.4689L14.93426 0z"/></svg>,
    shadcn: <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M22.219 11.784 11.784 22.219c-.407.407-.407 1.068 0 1.476.407.407 1.068.407 1.476 0L23.695 13.26c.407-.408.407-1.069 0-1.476-.408-.407-1.069-.407-1.476 0ZM20.132.305.305 20.132c-.407.407-.407 1.068 0 1.476.408.407 1.069.407 1.476 0L21.608 1.781c.407-.407.407-1.068 0-1.476-.408-.407-1.069-.407-1.476 0Z"/></svg>,
    rhf: <svg viewBox="0 0 24 24" width={size} height={size} fill="#EC5990"><path d="M10.7754 17.3477H5.8065a.2815.2815 0 1 0 0 .563h4.9689a.2815.2815 0 1 0 0-.563zm7.3195 0h-4.9688a.2815.2815 0 1 0 0 .563h4.9688a.2815.2815 0 0 0 0-.563zm-7.3336-6.475H5.8065a.2815.2815 0 1 0 0 .563h4.9548a.2815.2815 0 1 0 0-.563zm7.3195 0h-4.9547a.2815.2815 0 1 0 0 .563h4.9547a.2815.2815 0 0 0 0-.563zM5.3674 1.6726h2.4802v1.844c0 .7774.6302 1.4076 1.4076 1.4076h5.4896c.7774 0 1.4076-.6302 1.4076-1.4076v-1.844h2.4802c1.3993 0 2.5337 1.1344 2.5337 2.5337v16.134c0 1.3993-1.1344 2.5337-2.5337 2.5337H5.3674c-1.3993 0-2.5337-1.1344-2.5337-2.5337V4.2063c0-1.3993 1.1344-2.5337 2.5337-2.5337z"/></svg>,
    zustand: <svg viewBox="0 0 24 24" width={size} height={size}><circle cx="12" cy="12" r="12" fill="#433626"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Z</text></svg>,
    recharts: <svg viewBox="0 0 24 24" width={size} height={size}><circle cx="12" cy="12" r="12" fill="#22B5BF"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">R</text></svg>,
    lucide: <svg viewBox="0 0 24 24" width={size} height={size} fill="#F56565"><path d="M18.483 1.123a1.09 1.09 0 0 0-.752.362 1.09 1.09 0 0 0 .088 1.54 11.956 11.956 0 0 1 4 8.946 7.62 7.62 0 0 1-7.637 7.636 7.62 7.62 0 0 1-7.637-7.636 3.255 3.255 0 0 1 3.273-3.273c1.82 0 3.273 1.45 3.273 3.273a1.09 1.09 0 0 0 1.09 1.09 1.09 1.09 0 0 0 1.092-1.09c0-3-2.455-5.455-5.455-5.455s-5.454 2.455-5.454 5.455c0 5.408 4.408 9.818 9.818 9.818 5.41 0 9.818-4.41 9.818-9.818A14.16 14.16 0 0 0 19.272 1.4a1.09 1.09 0 0 0-.789-.277ZM9.818 2.15C4.408 2.151 0 6.561 0 11.97a14.16 14.16 0 0 0 4.8 10.637 1.09 1.09 0 0 0 1.54-.096 1.09 1.09 0 0 0-.095-1.54 11.957 11.957 0 0 1-4.063-9 7.62 7.62 0 0 1 7.636-7.637 7.62 7.62 0 0 1 7.637 7.636 3.256 3.256 0 0 1-3.273 3.273 3.256 3.256 0 0 1-3.273-3.273 1.09 1.09 0 0 0-1.09-1.09 1.09 1.09 0 0 0-1.092 1.09c0 3 2.455 5.455 5.455 5.455s5.454-2.455 5.454-5.455c0-5.408-4.408-9.818-9.818-9.818z"/></svg>,
    phpunit: <svg viewBox="0 0 24 24" width={size} height={size}><circle cx="12" cy="12" r="12" fill="#3178C6"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">P</text></svg>,
    rtl: <svg viewBox="0 0 24 24" width={size} height={size} fill="#E33332"><circle cx="12" cy="12" r="12" fill="#E33332"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">RTL</text></svg>,
  };
  return icons[name] || <Server size={size} className="text-gray-400" />;
};

/* ─── SKILLS TAB ─── */
const SkillsTab = ({ isDarkMode }) => {
  const skillGroups = [
    {
      title: 'Backend & Bases de Datos',
      headerColor: isDarkMode ? '#fb923c' : '#ea580c',
      cardBg: isDarkMode ? 'rgba(234,88,12,0.08)' : 'rgba(255,237,213,0.6)',
      cardBorder: isDarkMode ? 'rgba(194,65,12,0.3)' : 'rgba(254,215,170,0.8)',
      skills: [
        { name: 'Laravel 13', icon: 'laravel' },
        { name: 'PHP 8.3+', icon: 'php' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'MySQL · SQLite', icon: 'mysql' },
        { name: 'Redis', icon: 'redis' },
        { name: 'RESTful APIs · Axios', icon: 'axios' },
      ],
    },
    {
      title: 'Frontend & Reactividad',
      headerColor: isDarkMode ? '#38bdf8' : '#0284c7',
      cardBg: isDarkMode ? 'rgba(14,165,233,0.08)' : 'rgba(224,242,254,0.6)',
      cardBorder: isDarkMode ? 'rgba(2,132,199,0.3)' : 'rgba(186,230,253,0.8)',
      skills: [
        { name: 'React 19', icon: 'react' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Inertia.js', icon: 'inertia' },
        { name: 'Alpine.js · Blade', icon: 'alpinejs' },
        { name: 'Tailwind CSS 4', icon: 'tailwind' },
        { name: 'Vite · npm', icon: 'vite' },
      ],
    },
    {
      title: 'Librerías UI',
      headerColor: isDarkMode ? '#c084fc' : '#9333ea',
      cardBg: isDarkMode ? 'rgba(147,51,234,0.08)' : 'rgba(243,232,255,0.6)',
      cardBorder: isDarkMode ? 'rgba(126,34,206,0.3)' : 'rgba(233,213,255,0.8)',
      skills: [
        { name: 'Zustand', icon: 'zustand' },
        { name: 'React Hook Form', icon: 'rhf' },
        { name: 'Framer Motion', icon: 'framer' },
        { name: 'shadcn/ui · Radix', icon: 'shadcn' },
        { name: 'Recharts', icon: 'recharts' },
        { name: 'Lucide Icons', icon: 'lucide' },
      ],
    },
    {
      title: 'Pruebas & DevOps',
      headerColor: isDarkMode ? '#34d399' : '#059669',
      cardBg: isDarkMode ? 'rgba(5,150,105,0.08)' : 'rgba(209,250,229,0.6)',
      cardBorder: isDarkMode ? 'rgba(4,120,87,0.3)' : 'rgba(167,243,208,0.8)',
      skills: [
        { name: 'PHPUnit · Vitest', icon: 'phpunit' },
        { name: 'React Testing Library', icon: 'rtl' },
        { name: 'Docker · Compose', icon: 'docker' },
        { name: 'Git & GitHub Actions', icon: 'github' },
      ],
    },
  ];

  return (
    <div className="space-y-4 pb-4">
      <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>Stack tecnológico</p>
      {skillGroups.map((g, i) => (
        <motion.div
          key={g.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          style={{ background: g.cardBg, borderColor: g.cardBorder }}
          className="rounded-2xl border p-4 shadow-sm"
        >
          <p style={{ color: g.headerColor }} className="text-[10px] font-black uppercase tracking-widest mb-3">{g.title}</p>
          <div className="grid grid-cols-2 gap-2">
            {g.skills.map((s, idx) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 + idx * 0.04 }}
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border shadow-sm ${isDarkMode ? 'bg-slate-900/80 border-slate-700/60' : 'bg-white/80 border-white/90'}`}
              >
                <div className={`w-7 h-7 flex items-center justify-center flex-shrink-0 rounded-lg shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
                  <MobileTechIcon name={s.icon} size={16} />
                </div>
                <p className={`text-[11px] font-bold leading-tight truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{s.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── CONTACT TAB ─── */
const ContactTab = ({ isDarkMode }) => {
  const links = [
    { label: 'Gmail', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=johnnyarondonp@gmail.com', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', color: 'red' },
    { label: 'WhatsApp', url: 'https://wa.me/58464101968', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', color: 'green' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/johnny-rond%C3%B3n-9064962b8/', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png', color: 'blue' },
    { label: 'GitHub', url: 'https://github.com/johnnyarondonp-web/', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg', color: 'slate', invert: true },
  ];

  return (
    <div className="flex flex-col justify-center gap-4 py-8">
      <div className="text-center mb-2">
        <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Contacto</h2>
        <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Hablemos sobre tu próximo proyecto</p>
      </div>
      {links.map((l, i) => (
        <motion.a key={l.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
          href={l.url} target="_blank" rel="noopener noreferrer"
          className={`flex items-center gap-4 px-5 py-4 rounded-2xl border shadow-sm active:scale-[0.98] transition-transform ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
          <img src={l.iconUrl} alt={l.label} className={`w-7 h-7 object-contain flex-shrink-0 ${l.invert && isDarkMode ? 'invert' : ''}`}/>
          <span className={`flex-1 font-extrabold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{l.label}</span>
          <ExternalLink size={14} className={isDarkMode ? 'text-slate-500' : 'text-gray-400'}/>
        </motion.a>
      ))}
    </div>
  );
};

/* ─── MOBILE LAYOUT ─── */
const MobileLayout = ({ isDarkMode, setIsDarkMode }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { id: 'home', icon: <User size={20}/>, label: 'Perfil' },
    { id: 'projects', icon: <FolderKanban size={20}/>, label: 'Proyectos' },
    { id: 'skills', icon: <Code2 size={20}/>, label: 'Skills' },
    { id: 'contact', icon: <Phone size={20}/>, label: 'Contacto' },
  ];

  const bg = isDarkMode ? 'bg-slate-950' : 'bg-gray-50';
  const statusBg = isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-gray-200';
  const navBg = isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-gray-200';

  return (
    <div
      className={`flex flex-col w-full ${bg}`}
      style={{ height: '100dvh', overflow: 'hidden' }}
    >
      {/* Status Bar */}
      <div className={`flex-shrink-0 flex items-center justify-between px-5 py-2 ${statusBg} border-b backdrop-blur-xl z-50`}>
        <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span />
        <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'text-yellow-400' : 'text-gray-600'}`}>
          {isDarkMode ? <Sun size={14}/> : <Moon size={14}/>}
        </button>
      </div>

      {/* Content Area — padding-bottom keeps content above the fixed nav */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 pt-4"
        style={{ paddingBottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && <HomeTab isDarkMode={isDarkMode}/>}
            {activeTab === 'projects' && <ProjectsTab isDarkMode={isDarkMode}/>}
            {activeTab === 'skills' && <SkillsTab isDarkMode={isDarkMode}/>}
            {activeTab === 'contact' && <ContactTab isDarkMode={isDarkMode}/>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation — fixed to bottom with safe-area support */}
      <div
        className={`flex-shrink-0 flex items-center justify-around px-2 ${navBg} border-t backdrop-blur-xl z-50`}
        style={{
          paddingTop: '8px',
          paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all duration-200 min-w-0 flex-1 ${
                active
                  ? 'bg-blue-500/10 text-blue-500'
                  : isDarkMode ? 'text-slate-500' : 'text-gray-400'
              }`}
            >
              <div className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>{tab.icon}</div>
              <span className={`text-[10px] font-bold transition-all duration-200 truncate w-full text-center ${active ? 'opacity-100' : 'opacity-60'}`}>{tab.label}</span>
              {active && <div className="w-4 h-0.5 bg-blue-500 rounded-full mt-0.5"/>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileLayout;
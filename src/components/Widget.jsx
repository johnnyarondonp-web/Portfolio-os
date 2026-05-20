import React from 'react';
import { useWindows } from '../context/WindowContext';
import { appsRegistry } from '../utils/appsRegistry';
import { User, Code2, MapPin, Briefcase, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Gmail "M" envelope icon — official shape in white
const GmailIcon = ({ size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
  </svg>
);

const Widget = () => {
  const { openWindow } = useWindows();

  const handleOpenApp = (appId) => {
    const app = appsRegistry.find(a => a.id === appId);
    if (app) openWindow(app);
  };

  return (
    <div className="absolute top-8 right-8 w-90 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl rounded-3xl p-5 border border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.4)] hidden lg:block select-none transition-all duration-300 hover:bg-white/50 dark:hover:bg-slate-950/50 z-20">

      {/* Header — sin label "PERFIL HUD", solo icono sutil */}
      <div className="flex items-center gap-2 mb-4 border-b border-black/10 dark:border-white/10 pb-3">
        <User size={14} className="text-white/70" />
        <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest drop-shadow-sm">Perfil</span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Header info */}
        <div className="flex gap-4">
          <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 shadow-md border border-white/50 dark:border-white/10 flex-shrink-0 flex items-center justify-center">
            <img
              src="/johnny.jpg"
              alt="Johnny Rondón"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full items-center justify-center text-white font-bold text-xl">
              JR
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full shadow-sm"></span>
          </div>

          <div className="space-y-1 py-0.5">
            <h3 className="font-black text-gray-900 dark:text-white text-base leading-none">
              Johnny Rondón
            </h3>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">Ingeniero en Informática</p>
            <div className="flex items-center gap-1 text-[10px] text-gray-600 dark:text-gray-400 mt-0.5 font-medium">
              <MapPin size={10} className="text-gray-400" />
              Caracas, VE
            </div>
          </div>
        </div>

        {/* Specialization badge — fondo sólido para máximo contraste */}
        <div className="bg-blue-600 dark:bg-blue-600/80 px-3 py-2 rounded-xl text-center">
          <p className="text-[11px] font-bold text-white leading-tight">
            Full Stack Engineer · Laravel & TypeScript
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-800 dark:text-slate-100 leading-relaxed bg-white/60 dark:bg-slate-900/50 p-3 rounded-xl border border-white/50 dark:border-white/10">
          Construyo sistemas de gestión robustos con Laravel y React — arquitecturas multi-rol, lógica financiera e interfaces modernas. Enfocado en integridad de datos y código mantenible.
        </p>

 

        {/* Social icons */}
        <div className="flex justify-center items-center gap-2.5 pt-2 border-t border-black/10 dark:border-white/10">
          <a
            href="https://github.com/johnnyarondonp-web/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white/60 hover:bg-white dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-white/50 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            title="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/johnny-rond%C3%B3n-9064962b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white/60 hover:bg-white dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-white/50 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            title="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=johnnyarondonp@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white/60 hover:bg-white dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-white/50 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            title="Gmail"
          >
            <GmailIcon size={16} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Widget;
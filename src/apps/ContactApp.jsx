import React from 'react';

const ContactApp = () => {
  const contactLinks = [
    {
      id: 'gmail',
      label: 'Gmail',
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-6 h-6 object-contain" />,
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=johnnyarondonp@gmail.com',
      hoverStyle: 'hover:border-red-500/30 hover:bg-red-500/5 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] text-red-600 dark:text-red-400',
    },
    {
      id: 'phone',
      label: 'WhatsApp',
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 object-contain" />,
      url: 'https://wa.me/58464101968',
      hoverStyle: 'hover:border-green-500/30 hover:bg-green-500/5 hover:shadow-[0_0_15px_rgba(37,211,102,0.15)] text-green-600 dark:text-green-400',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-6 h-6 object-contain" />,
      url: 'https://www.linkedin.com/in/johnny-rond%C3%B3n-9064962b8/',
      hoverStyle: 'hover:border-blue-500/30 hover:bg-blue-500/5 hover:shadow-[0_0_15px_rgba(10,102,194,0.15)] text-blue-600 dark:text-blue-400',
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" className="w-6 h-6 object-contain dark:invert" />,
      url: 'https://github.com/johnnyarondonp-web/',
      hoverStyle: 'hover:border-slate-500/30 hover:bg-slate-500/5 hover:shadow-[0_0_15px_rgba(100,116,139,0.15)] text-slate-700 dark:text-slate-300',
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 p-8 select-none justify-center items-center text-center font-sans transition-colors duration-300">
      <div className="w-full max-w-sm space-y-4">
        {contactLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center gap-4 px-6 py-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-lg text-sm font-bold transition-all duration-300 group cursor-pointer ${link.hoverStyle}`}
          >
            <div className="flex-shrink-0 scale-125 group-hover:scale-150 transition-transform duration-300">{link.icon}</div>
            <span className="flex-1 text-left font-extrabold text-gray-700 dark:text-slate-200">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactApp;

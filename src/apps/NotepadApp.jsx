import React, { useState } from 'react';

const NotepadApp = ({ fileContent, fileTitle }) => {
  const [content, setContent] = useState(
    fileContent || 
`Hola, soy Johnny Rondón, ingeniero en informática y desarrollador full-stack.

Me especializo en diseñar e implementar arquitecturas limpias y robustas, combinando la potencia de Laravel en el backend con la reactividad y dinamismo de React en el frontend, respaldado por bases de datos PostgreSQL bien optimizadas.

Te invito a explorar el sistema de archivos de mis proyectos (Zoion-sistema, eunoia-sistema) o a abrir la Terminal para interactuar con la línea de comandos.

Contacto:
- Email: johnnyarondonp@gmail.com
- GitHub: github.com/johnnyarondonp-web
- LinkedIn: linkedin.com/in/johnny-rondón-9064962b8
`
  );

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      <div className="flex border-b border-gray-200 bg-gray-50 text-sm text-gray-700 select-none">
        <button className="px-3 py-1 hover:bg-blue-100 focus:bg-blue-200">Archivo</button>
        <button className="px-3 py-1 hover:bg-blue-100 focus:bg-blue-200">Edición</button>
        <button className="px-3 py-1 hover:bg-blue-100 focus:bg-blue-200">Formato</button>
        <button className="px-3 py-1 hover:bg-blue-100 focus:bg-blue-200">Ver</button>
        <button className="px-3 py-1 hover:bg-blue-100 focus:bg-blue-200">Ayuda</button>
      </div>
      <textarea
        className="flex-1 w-full p-2 border-none outline-none resize-none font-sans text-gray-800 text-sm bg-white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
};

export default NotepadApp;

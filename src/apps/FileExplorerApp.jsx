import React, { useState } from 'react';
import { Folder, FileText, Image, ChevronRight } from 'lucide-react';

const FolderIcon = ({ color = '#ffd700' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill={color} stroke="#c8a800" strokeWidth="1.2"/>
  </svg>
);

const FileIcon = ({ color = '#fff' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill={color} stroke="#ccc" strokeWidth="1.2"/>
    <path d="M14 2v6h6" fill="none" stroke="#ccc" strokeWidth="1.2"/>
  </svg>
);

const folders = [
  { name: 'Documentos', icon: <FolderIcon color="#ffd700" />, items: ['CV.pdf', 'Carta_presentacion.doc', 'Notas_reunion.txt'] },
  { name: 'Imágenes', icon: <FolderIcon color="#ffb347" />, items: ['foto_perfil.jpg', 'captura_pantalla.png', 'banner.gif'] },
  { name: 'Música', icon: <FolderIcon color="#7cc8ff" />, items: ['playlist.m3u', 'album_favorito.mp3'] },
  { name: 'Videos', icon: <FolderIcon color="#c8a0ff" />, items: ['demo_proyecto.mp4', 'tutorial.avi'] },
  { name: 'Proyectos', icon: <FolderIcon color="#90ee90" />, items: ['portfolio.zip', 'fuentes.tar.gz', 'README.md'] },
  { name: 'Descargas', icon: <FolderIcon color="#ff9999" />, items: ['instalar.exe', 'libro.pdf', 'plugin.dll'] },
];

const sideLinks = ['Escritorio', 'Mis Documentos', 'Mi PC', 'Panel de control'];

const FileExplorerApp = () => {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [addrText, setAddrText] = useState('C:\\Documentos');

  const handleFolderOpen = (folder) => {
    setCurrentFolder(folder);
    setAddrText(`C:\\${folder.name}`);
    setSelectedFolder(null);
    setSelectedItem(null);
  };

  const handleBack = () => {
    setCurrentFolder(null);
    setAddrText('C:\\');
    setSelectedFolder(null);
    setSelectedItem(null);
  };

  const handleRefresh = () => {
    setSelectedItem(null);
    setSelectedFolder(null);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      fontFamily: 'Tahoma,Arial,sans-serif', fontSize: 11, color: '#000',
      backgroundColor: '#ece9d8', userSelect: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 6px',
        background: 'linear-gradient(180deg, #f0efe0 0%, #ddd8c8 100%)',
        borderBottom: '1px solid #aca899' }}>
        <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '2px 6px',
          border: '1px solid #aca899', borderRadius: 3, background: '#f0efe0', cursor: 'pointer', fontSize: 11,
          boxShadow: 'inset 0 1px 0 #fff' }}>
          <ChevronRight size={10} /> Atrás
        </button>
        <button onClick={handleRefresh} style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '2px 6px',
          border: '1px solid #aca899', borderRadius: 3, background: '#f0efe0', cursor: 'pointer', fontSize: 11,
          boxShadow: 'inset 0 1px 0 #fff' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M17 1l4 4-4 4" stroke="currentColor" strokeWidth="2"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" stroke="currentColor" strokeWidth="2"/><path d="M21 13v2a4 4 0 01-4 4H3" stroke="currentColor" strokeWidth="2"/></svg>
          Actualizar
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 6px',
        borderBottom: '1px solid #aca899', background: '#f0efe0' }}>
        <span style={{ fontWeight: 700, color: '#666', minWidth: 40 }}>Dirección:</span>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <input readOnly value={addrText}
            style={{ flex: 1, border: '1px solid #aca899', padding: '2px 4px', fontSize: 11,
              background: '#fff', fontFamily: 'Tahoma,Arial,sans-serif', outline: 'none' }} />
        </div>
        <button style={{ padding: '2px 10px', border: '1px solid #aca899', borderRadius: 3,
          background: '#f0efe0', cursor: 'pointer', fontSize: 11,
          boxShadow: 'inset 0 1px 0 #fff' }}>Ir</button>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 160, borderRight: '1px solid #aca899', background: '#f0efe0',
          padding: 4, overflow: 'auto', flexShrink: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 11, padding: '2px 4px', color: '#666', marginBottom: 4 }}>Carpetas</div>
          {sideLinks.map(link => (
            <div key={link} onClick={handleBack}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 6px', cursor: 'pointer',
                borderRadius: 3, border: '1px solid transparent', fontSize: 11 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#2a6ac8'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#1a5ab0'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = 'transparent'; }}>
              <FolderIcon color="#ffd700" />
              <span>{link}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: 'auto', background: '#fff', padding: 8 }}>
          {currentFolder ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div style={{ padding: '2px 4px', fontWeight: 700, fontSize: 11,
                background: '#f0efe0', borderBottom: '1px solid #aca899', marginBottom: 4 }}>
                {currentFolder.name}
              </div>
              {currentFolder.items.map((item, i) => (
                <div key={i} onClick={() => setSelectedItem(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 6px', cursor: 'pointer',
                    borderRadius: 3, fontSize: 11,
                    background: selectedItem === i ? '#2a6ac8' : 'transparent',
                    color: selectedItem === i ? 'white' : '#000',
                    border: selectedItem === i ? '1px solid #1a5ab0' : '1px solid transparent' }}>
                  <FileIcon color="#fff" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {folders.map((folder, i) => (
                <div key={folder.name} onClick={() => handleFolderOpen(folder)}
                  onDoubleClick={() => handleFolderOpen(folder)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: 8, cursor: 'pointer', borderRadius: 4,
                    background: selectedFolder === i ? '#2a6ac8' : 'transparent',
                    color: selectedFolder === i ? 'white' : '#000',
                    border: selectedFolder === i ? '1px solid #1a5ab0' : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => { if (selectedFolder !== i) { e.currentTarget.style.background = '#e8e8e8'; } }}
                  onMouseLeave={(e) => { if (selectedFolder !== i) { e.currentTarget.style.background = 'transparent'; } }}>
                  <div style={{ transform: 'scale(2)', marginBottom: 4 }}>{folder.icon}</div>
                  <span style={{ fontSize: 11, textAlign: 'center', lineHeight: 1.2 }}>{folder.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ height: 20, background: 'linear-gradient(180deg, #f0efe0 0%, #ddd8c8 100%)',
        borderTop: '1px solid #aca899', display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: 10, color: '#666' }}>
        {currentFolder ? `${currentFolder.items.length} elemento(s)` : `${folders.length} elemento(s)`}
      </div>
    </div>
  );
};

export default FileExplorerApp;

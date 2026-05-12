'use client';

import { useState, useEffect } from 'react';
import Player from '../components/Player';
import PasswordGate from '../components/PasswordGate';
import embedChannels from '../channels.json';

const Home = () => {
  const [authed, setAuthed] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('authed') === '1') setAuthed(true);
  }, []);

  const handleSelectEmbed = (url, channelName) => {
    setSelectedUrl(url);
    setSelectedChannel(channelName || 'Canal');
  };

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="h-screen bg-[#1a1a1a] flex overflow-hidden">
      {/* Player Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📺</span>
            <h1 className="text-lg font-semibold text-white">Netox Player</h1>
          </div>
        </header>

        {/* Player Area */}
        <div className="flex-1 p-4 flex flex-col min-h-0">
          <div className="flex-1 bg-black rounded-xl overflow-hidden flex items-center justify-center min-h-0">
            {selectedUrl ? (
              <Player videoUrl={selectedUrl} isEmbed={true} />
            ) : (
              <div className="text-center text-white/40">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-lg">Selecione um canal para assistir</p>
              </div>
            )}
          </div>

          {selectedChannel && (
            <div className="mt-4 text-center shrink-0">
              <span className="text-cyan-400 text-lg font-medium">
                ▶ {selectedChannel}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar com Lista de Canais */}
      <aside className="w-80 bg-[#222222] border-l border-white/10 flex flex-col shrink-0">
        <div className="p-3 border-b-2 border-cyan-400 shrink-0">
          <h2 className="text-sm font-semibold text-cyan-400">Canais</h2>
        </div>
        {/* Lista com scroll próprio */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {embedChannels.map((ch, index) => (
              <button
                key={index}
                onClick={() => handleSelectEmbed(ch.url, ch.channel)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm ${
                  selectedUrl === ch.url
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg">📺</span>
                <span className="truncate">{ch.channel}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;

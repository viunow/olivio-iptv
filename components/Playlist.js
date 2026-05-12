import React from 'react';

const Playlist = ({ playlists, selectPlaylist, activeUrl }) => {
  return (
    <ul className="space-y-1">
      {playlists.map((playlist, index) => (
        <li key={index}>
          <button
            onClick={() => selectPlaylist(playlist.url)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm ${
              activeUrl === playlist.url
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-lg">📺</span>
            <span className="truncate">{playlist.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Playlist;

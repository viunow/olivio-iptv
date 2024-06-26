import React from "react";

const Playlist = ({ playlists, selectPlaylist }) => {
  return (
    <div className="playlist-container h-[600px] overflow-y-scroll text-white w-full">
      {/* <h2 className="text-xl font-bold mb-4 h-[40px] fixed">Playlists</h2> */}
      <ul className="space-y-2">
        {playlists.map((playlist, index) => (
          <li
            key={index}
            className="cursor-pointer hover:text-blue-500"
            onClick={() => selectPlaylist(playlist.url)}
          >
            {playlist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;

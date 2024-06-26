import React from "react";

const Playlist = ({ playlists, selectPlaylist }) => {
  return (
    <div className="playlist-container h-[300px] lg:h-[600px] overflow-y-scroll text-white w-full">
      <ul className="space-y-2">
        {playlists.map((playlist, index) => (
          <li
            key={index}
            className="cursor-pointer hover:text-cyan-500"
            onClick={() => selectPlaylist(playlist.url)}
          >
            &#9199;{` ${playlist.name}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;

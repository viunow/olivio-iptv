"use client";

import { useState, useEffect } from "react";
import Playlist from "../components/Playlist";
import Player from "../components/Player";
import { fetchPlaylist } from "@/utils/fetchPlayer";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlaylist(
        "https://iptv-org.github.io/iptv/languages/por.m3u"
      );
      setPlaylists(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="w-full flex flex-col lg:flex-row gap-2">
        <div className="text-center font-bold text-white py-2 text-xl">
          &#127916; Olivio Player
        </div>
        <div className="w-full lg:w-1/2 border-2 border-white/20 rounded-xl p-4">
          <h1 className="font-bold text-white text-2xl py-2">List</h1>
          <Playlist playlists={playlists} selectPlaylist={setSelectedUrl} />
        </div>
        <div className="w-full lg:w-1/2">
          {selectedUrl && <Player videoUrl={selectedUrl} />}
        </div>
      </div>
    </div>
  );
};

export default Home;

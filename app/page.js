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
        "https://iptv-org.github.io/iptv/countries/br.m3u"
      );
      setPlaylists(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="w-full flex flex-row gap-2">
        <div className="w-1/2 border-2 border-white rounded-xl p-4">
          <h1 className="font-bold text-white text-xl py-2">Playlists</h1>
          <Playlist playlists={playlists} selectPlaylist={setSelectedUrl} />
        </div>
        <div className="w-1/2">
          {selectedUrl && <Player videoUrl={selectedUrl} />}
        </div>
      </div>
    </div>
  );
};

export default Home;

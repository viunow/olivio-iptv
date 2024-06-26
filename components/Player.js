import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const Player = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoUrl;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    }
  }, [videoUrl]);

  return (
    <div className="player-container border-2 border-white rounded-xl">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full h-full rounded-xl"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Player;

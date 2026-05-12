import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const Player = ({ videoUrl, isEmbed }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isEmbed) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
      return () => hls.destroy();
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }
  }, [videoUrl, isEmbed]);

  if (isEmbed) {
    return (
      <div className="w-full h-full">
        <iframe
          src={videoUrl}
          className="w-full h-full rounded-lg"
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen"
          sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full h-full object-contain"
      >
        Seu navegador não suporta vídeo.
      </video>
    </div>
  );
};

export default Player;

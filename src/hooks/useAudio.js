// src/hooks/useAudio.js
import { useState, useRef } from 'react';

const useAudio = (songUrl) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const audioRef = useRef(null);

  const handleStartInteraction = () => {
    const audio = audioRef.current;
    if (audio && !hasPlayed) {
      audio.play()
        .then(() => {
          console.log('Audio iniciado tras interacción explícita');
          setHasPlayed(true);
          setShowOverlay(false);
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
            setHasPlayed(false);
          }, 60 * 1000);
        })
        .catch((error) => {
          console.error('Error al reproducir el audio tras interacción:', error);
        });
    }
  };

  return { hasPlayed, showOverlay, audioRef, handleStartInteraction };
};

export default useAudio;
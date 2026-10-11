import React, { useEffect, useRef } from 'react';
import LilacDuskCanopy from './LilacDuskCanopy';
import { VIDEO_FONDO_HOME } from '../config/constants';

/**
 * Componente: BackgroundGlow
 * Optimizado:
 * 1. Video en bucle con preload="metadata" y pausa automática en segundo plano (ahorra batería/GPU).
 * 2. Sombras de follaje WebGL interactiva y eficiente (Lilac Dusk Canopy).
 * 3. Luces ambientales nativas por degradado radial GPU (sin filtros blur pesados).
 */
export default function BackgroundGlow() {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden bg-[#4f4366]">
      {/* 1. Capa de Video de fondo animado en bucle continuo */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 transform-gpu">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onEnded={(e) => {
            e.target.currentTime = 0;
            e.target.play().catch(() => {});
          }}
          className="absolute inset-0 w-full h-full object-cover object-[50%_25%] sm:object-center scale-100 sm:scale-105 will-change-transform"
        >
          <source src={VIDEO_FONDO_HOME} type="video/mp4" />
        </video>
        {/* Oscurecimiento armónico Lilac Dusk equilibrado para que el video se distinga nítido */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4f4366]/40 via-[#6e5f86]/35 to-[#3a2d4c]/55 sm:from-[#4f4366]/60 sm:via-[#6e5f86]/50 sm:to-[#3a2d4c]/70 mix-blend-multiply" />
      </div>

      {/* 2. Capa WebGL de Lilac Dusk Canopy optimizada (más sutil en móviles para destacar el video) */}
      <div className="absolute inset-0 w-full h-full opacity-45 sm:opacity-65 mix-blend-screen pointer-events-auto z-[1]">
        <LilacDuskCanopy
          preset="lilac-dusk"
          height="100%"
          interactive={true}
          speed={0.75}
        />
      </div>

      {/* 3. Luces radiales ambientales GPU-nativas (sin coste de blur) */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: `
            radial-gradient(circle 420px at 50% -5%, rgba(244, 168, 162, 0.22) 0%, transparent 70%),
            radial-gradient(circle 350px at 100% 100%, rgba(154, 111, 146, 0.26) 0%, transparent 70%),
            radial-gradient(circle 280px at 0% 35%, rgba(110, 95, 134, 0.32) 0%, transparent 70%)
          `,
        }}
      />
    </div>
  );
}

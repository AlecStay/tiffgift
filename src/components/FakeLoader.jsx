import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente SVG para Corazón de Minecraft Pixel Art
 */
const MinecraftHeart = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 9 8"
    className={className}
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="0" width="2" height="1" fill="#000000" />
    <rect x="5" y="0" width="2" height="1" fill="#000000" />

    <rect x="0" y="1" width="1" height="1" fill="#000000" />
    <rect x="1" y="1" width="2" height="1" fill="#E21E1E" />
    <rect x="3" y="1" width="2" height="1" fill="#000000" />
    <rect x="5" y="1" width="2" height="1" fill="#8D0A0A" />
    <rect x="7" y="1" width="1" height="1" fill="#000000" />

    <rect x="0" y="2" width="1" height="1" fill="#000000" />
    <rect x="1" y="2" width="1" height="1" fill="#FFFFFF" />
    <rect x="2" y="2" width="2" height="1" fill="#E21E1E" />
    <rect x="4" y="2" width="4" height="1" fill="#8D0A0A" />
    <rect x="8" y="2" width="1" height="1" fill="#000000" />

    <rect x="0" y="3" width="1" height="1" fill="#000000" />
    <rect x="1" y="3" width="3" height="1" fill="#E21E1E" />
    <rect x="4" y="3" width="4" height="1" fill="#8D0A0A" />
    <rect x="8" y="3" width="1" height="1" fill="#000000" />

    <rect x="1" y="4" width="1" height="1" fill="#000000" />
    <rect x="2" y="4" width="2" height="1" fill="#E21E1E" />
    <rect x="4" y="4" width="3" height="1" fill="#8D0A0A" />
    <rect x="7" y="4" width="1" height="1" fill="#000000" />

    <rect x="2" y="5" width="1" height="1" fill="#000000" />
    <rect x="3" y="5" width="1" height="1" fill="#E21E1E" />
    <rect x="4" y="5" width="2" height="1" fill="#8D0A0A" />
    <rect x="6" y="5" width="1" height="1" fill="#000000" />

    <rect x="3" y="6" width="1" height="1" fill="#000000" />
    <rect x="4" y="6" width="1" height="1" fill="#8D0A0A" />
    <rect x="5" y="6" width="1" height="1" fill="#000000" />

    <rect x="4" y="7" width="1" height="1" fill="#000000" />
  </svg>
);

/**
 * Componente: FakeLoader
 * Simula una pantalla de carga por varios segundos con barra de progreso y mensajes románticos.
 */
export default function FakeLoader({ onComplete, durationMs = 3200 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalTime = 30;
    const totalSteps = durationMs / intervalTime;
    const stepIncrement = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [durationMs, onComplete]);

  // Texto dinámico según el porcentaje
  let statusText = "Verificando nuestra fecha especial...";
  if (progress > 35 && progress <= 75) {
    statusText = "Cargando razones por las que me gustas...";
  } else if (progress > 75) {
    statusText = "¡Sorpresa lista para ti!";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="relative w-full max-w-md p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#5e4e75]/90 to-[#3a2d4c]/95 backdrop-blur-2xl border-2 border-[#f4a8a2]/50 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(244,168,162,0.4)] text-center z-10 overflow-hidden"
    >
      {/* Luz Ambiental de fondo */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#f4a8a2]/25 rounded-full blur-2xl pointer-events-none" />

      {/* Corazones de Minecraft pulsantes */}
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
        className="inline-flex items-center justify-center gap-3 px-6 py-3.5 mb-8 bg-[#3a2d4c]/90 border-2 border-[#f4a8a2]/40 rounded-2xl shadow-[0_0_25px_rgba(244,168,162,0.4)] backdrop-blur-md"
      >
        <MinecraftHeart className="w-8 h-8" />
        <MinecraftHeart className="w-8 h-8" />
        <MinecraftHeart className="w-8 h-8" />
      </motion.div>

      <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-white mb-2 tracking-tight">
        Abriendo Tu Sorpresa
      </h2>

      <p className="text-xs md:text-sm text-[#ffd2b8] font-medium mb-6 min-h-[22px] transition-all">
        {statusText}
      </p>

      {/* Barra de progreso animada */}
      <div className="w-full h-3 bg-[#3a2d4c] rounded-full overflow-hidden p-0.5 border border-[#f4a8a2]/30 shadow-inner mb-3">
        <motion.div
          style={{ width: `${Math.min(progress, 100)}%` }}
          className="h-full bg-gradient-to-r from-[#9a6f92] via-[#ea8571] to-[#ffd2b8] rounded-full shadow-[0_0_12px_#f4a8a2]"
        />
      </div>

      <div className="text-right text-xs font-bold text-[#ffd2b8]">
        {Math.round(Math.min(progress, 100))}%
      </div>
    </motion.div>
  );
}

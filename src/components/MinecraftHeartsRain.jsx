import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Componente SVG para Corazón de Minecraft Pixel Art (Optimizado en 4 paths consolidados)
 */
export const MinecraftHeart = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 9 8"
    className={className}
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Negro: bordes */}
    <path fill="#000000" d="M1 0h2v1H1zm4 0h2v1H5zM0 1h1v3H0zm3 1h2v1H3zm4-1h1v3H7zM8 2h1v2H8zm-7 2h1v1H1zm6 0h1v1H7zm-5 1h1v1H2zm4 0h1v1H6zm-3 1h1v1H3zm2 0h1v1H5zm-1 1h1v1H4z" />
    {/* Blanco: brillo pixel art */}
    <path fill="#FFFFFF" d="M1 2h1v1H1z" />
    {/* Rojo: cuerpo */}
    <path fill="#E21E1E" d="M1 1h2v1H1zm1 1h2v1H2zm-1 1h3v1H1zm1 1h2v1H2zm1 1h1v1H3z" />
    {/* Rojo oscuro: sombra */}
    <path fill="#8D0A0A" d="M5 1h2v1H5zm-1 1h4v1H4zm0 1h4v1H4zm0 1h3v1H4zm0 1h2v1H4zm0 1h1v1H4z" />
  </svg>
);

/**
 * Componente: MinecraftHeartsRain
 * Genera una explosión/lluvia de corazones de Minecraft por toda la pantalla de forma fluida y optimizada.
 */
export default function MinecraftHeartsRain({ count = 30 }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      startX: Math.random() * 100, // 0..100vw
      startY: 105, // empieza abajo de la pantalla
      targetX: (Math.random() - 0.5) * 60, // deriva horizontal suave
      targetY: -20 - Math.random() * 30, // vuela hacia arriba fuera de pantalla
      scale: Math.random() * 0.7 + 0.7,
      rotation: (Math.random() - 0.5) * 60,
      duration: Math.random() * 1.2 + 2.0, // 2.0s a 3.2s
      delay: Math.random() * 0.5,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden transform-gpu">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{
            left: `${h.startX}%`,
            top: `${h.startY}%`,
            scale: 0.2,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            top: `${h.targetY}%`,
            x: `${h.targetX}vw`,
            scale: h.scale,
            opacity: [0, 1, 1, 0],
            rotate: h.rotation,
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: 'easeOut',
          }}
          className="absolute will-change-transform"
        >
          <MinecraftHeart className="w-10 h-10 filter drop-shadow-[0_0_10px_rgba(226,30,30,0.65)]" />
        </motion.div>
      ))}
    </div>
  );
}

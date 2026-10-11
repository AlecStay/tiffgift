import React, { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MinecraftHeart } from './MinecraftHeartsRain';

/**
 * Componente: MinecraftCardHeartsBurst
 * Dispara una ráfaga de corazones pixelados de Minecraft flotando hacia arriba
 * exactamente desde la tarjeta que se acaba de voltear.
 */
export default function MinecraftCardHeartsBurst({ active, count = 8 }) {
  const uid = useId();

  // Partículas con ángulos, trayectorias y escalas aleatorias
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 55 + 50; // distancia de dispersión
      return {
        id: `${uid}-${i}`,
        targetX: Math.cos(angle) * distance,
        targetY: -Math.abs(Math.sin(angle) * distance) - (Math.random() * 40 + 30), // siempre suben
        scale: Math.random() * 0.4 + 0.7, // tamaño variado
        rotate: (Math.random() - 0.5) * 45,
        duration: Math.random() * 0.35 + 0.75, // 0.75s a 1.1s
        delay: Math.random() * 0.08,
      };
    });
  }, [count, uid]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-visible">
      <AnimatePresence>
        {active &&
          particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0.2,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: p.targetX,
                y: p.targetY,
                scale: p.scale,
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: [0.22, 1, 0.36, 1], // ease-out enérgico
              }}
              className="absolute will-change-transform"
            >
              <MinecraftHeart className="w-6 h-6 sm:w-7 sm:h-7 filter drop-shadow-[0_0_8px_rgba(226,30,30,0.75)]" />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

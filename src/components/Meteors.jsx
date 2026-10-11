import React, { useMemo } from 'react';

/**
 * Componente: Meteors
 * Inspiración: Aceternity UI / Magic UI (Meteors Background Effect)
 * Adaptado a la paleta exclusiva de azules (#4FA3E0, #2F6FDE, #BFE3FF)
 */
export default function Meteors({ number = 20 }) {
  const meteors = useMemo(() => {
    return Array.from({ length: number }).map((_, i) => ({
      id: i,
      top: -10,
      left: Math.floor(Math.random() * 120) - 10,
      delay: Math.random() * 5,
      duration: Math.floor(Math.random() * 6 + 4),
    }));
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute top-0 left-1/2 h-0.5 w-0.5 rounded-full bg-[#4FA3E0] shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor"
          style={{
            top: `${meteor.top}%`,
            left: `${meteor.left}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        >
          {/* Cola brillante del meteoro */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[60px] -translate-y-1/2 bg-gradient-to-r from-[#4FA3E0] via-[#2F6FDE] to-transparent" />
        </span>
      ))}
    </div>
  );
}

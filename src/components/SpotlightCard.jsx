import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import MinecraftCardHeartsBurst from './MinecraftCardHeartsBurst';

/**
 * Componente: SpotlightCard
 * Inspiración: 21st.dev / Aceternity UI (Spotlight Glass Card & 3D Flip)
 * Dispara una ráfaga de corazones de Minecraft al girar la tarjeta.
 */
function SpotlightCardComponent({ index, razon, isFlipped, onClick, onToggle }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const [burstKey, setBurstKey] = useState(0);

  // Disparar explosión de corazones de Minecraft cada vez que se voltea hacia la cara trasera
  useEffect(() => {
    if (isFlipped) {
      setBurstKey((prev) => prev + 1);
    }
  }, [isFlipped]);

  const handleCardClick = () => {
    if (onToggle) {
      onToggle(index);
    } else if (onClick) {
      onClick();
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(244, 168, 162, 0.25), transparent 80%)`;
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="h-52 sm:h-60 perspective-1000 cursor-pointer group relative touch-manipulation"
    >
      <div
        className={`relative w-full h-full duration-500 ease-out transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARA FRONTAL */}
        <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-[#5e4e75]/90 to-[#3a2d4c]/90 backdrop-blur-xl border border-[#f4a8a2]/30 group-hover:border-[#f4a8a2] shadow-[0_10px_25px_rgba(0,0,0,0.35)] group-hover:shadow-[0_15px_35px_rgba(244,168,162,0.4)] transition-all duration-300 backface-hidden flex flex-col items-center justify-center text-center overflow-hidden">
          
          {/* Spotlight Effect que sigue al cursor (actualización directa sin re-renders) */}
          <div
            ref={spotlightRef}
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          />

          <span className="absolute top-3 left-3.5 sm:top-4 sm:left-5 text-[11px] sm:text-xs font-bold text-[#ffd2b8]/80 tracking-widest bg-[#f4a8a2]/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#f4a8a2]/20">
            #{index + 1}
          </span>
          
          <div className="relative w-13 h-13 sm:w-16 sm:h-16 mb-2.5 sm:mb-3 rounded-full bg-[#9a6f92]/20 border border-[#f4a8a2]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(244,168,162,0.3)]">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#f4a8a2] group-hover:fill-[#f4a8a2] transition-colors duration-300" />
          </div>

          <span className="text-xs sm:text-sm text-[#ffd2b8] font-medium tracking-wide">
            Toca para descubrir
          </span>
        </div>

        {/* CARA TRASERA */}
        <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-[#6e5f86] via-[#5e4e75] to-[#3a2d4c] border border-[#f4a8a2] sm:border-2 shadow-[0_12px_35px_rgba(234,133,113,0.45)] rotate-y-180 backface-hidden flex flex-col justify-between text-center overflow-hidden">
          
          {/* Resplandor superior en cara trasera con degradado nativo sin blur pesado */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-24 bg-[radial-gradient(ellipse_at_center,rgba(244,168,162,0.25)_0%,transparent_70%)] pointer-events-none" />

          <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#ffd2b8]/80 border-b border-[#f4a8a2]/30 pb-1.5 sm:pb-2">
            <span className="font-bold tracking-wide">Razón #{index + 1}</span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f4a8a2] animate-pulse" />
          </div>

          <p className="text-white text-sm sm:text-base md:text-lg font-sans font-medium leading-snug sm:leading-relaxed my-auto flex items-center justify-center px-1 sm:px-2">
            "{razon}"
          </p>

          <span className="text-[10px] sm:text-[11px] text-[#ffd2b8]/60 uppercase tracking-widest font-sans">
            Toca para voltear
          </span>
        </div>
      </div>

      {/* Ráfaga de corazones de Minecraft al girar la tarjeta */}
      <MinecraftCardHeartsBurst key={burstKey} active={burstKey > 0} count={9} />
    </div>
  );
}

export default React.memo(SpotlightCardComponent);

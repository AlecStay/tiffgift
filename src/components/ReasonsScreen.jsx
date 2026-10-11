import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowLeft } from 'lucide-react';
import { triggerBlueConfetti } from '../utils/confetti';
import { RAZONES } from '../config/constants';
import SpotlightCard from './SpotlightCard';
import EnvelopeLetterModal from './EnvelopeLetterModal';

/**
 * Componente: ReasonsScreen
 * Incluye tarjetas Spotlight, botón de volver al inicio, sobre de amor animado y barra de progreso.
 * Optimizado con memoización para mantener 60 FPS estables.
 */
export default function ReasonsScreen({ onBackToStart }) {
  const [flippedCards, setFlippedCards] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const total = RAZONES.length;

  const handleCardClick = useCallback((index) => {
    setFlippedCards((prev) => {
      const willFlipOpen = !prev[index];
      const nextState = { ...prev, [index]: willFlipOpen };

      const count = Object.values(nextState).filter(Boolean).length;

      // Si se descubren todas las tarjetas
      if (count === total) {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 700);
      }

      return nextState;
    });
  }, [total]);

  const flippedCount = useMemo(() => {
    return Object.values(flippedCards).filter(Boolean).length;
  }, [flippedCards]);

  const progressPercent = useMemo(() => {
    return Math.round((flippedCount / total) * 100);
  }, [flippedCount, total]);

  // Variantes de animación en cascada
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  return (
    <div className="w-full max-w-5xl px-2 sm:px-4 py-4 sm:py-8 mx-auto z-10 flex flex-col items-center">
      {/* Botón Volver al inicio */}
      {onBackToStart && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBackToStart}
          className="self-start mb-4 sm:mb-6 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#5e4e75]/80 hover:bg-[#6e5f86] border border-[#f4a8a2]/40 text-[#ffd2b8] text-[11px] sm:text-xs font-semibold tracking-wide transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(244,168,162,0.3)] active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f4a8a2]" />
          <span>Volver al inicio</span>
        </motion.button>
      )}

      {/* Header con Badge de Lilac Dusk */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 sm:mb-6 px-2"
      >
        <h1 className="font-sans font-extrabold tracking-tight text-2xl sm:text-3xl md:text-5xl text-white mb-2 leading-tight">
          Razones por las cuáles te adoro!
        </h1>
        <p className="text-[#ffd2b8]/80 text-xs sm:text-sm md:text-base font-light max-w-sm sm:max-w-md mx-auto">
          Toca cada tarjeta para descubrir lo que siento por ti
        </p>
      </motion.div>

      {/* Barra de Progreso Neón */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sticky top-2 sm:top-4 z-20 mb-6 sm:mb-8 w-full max-w-sm sm:max-w-md p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#5e4e75]/95 backdrop-blur-xl border border-[#f4a8a2]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(244,168,162,0.25)] flex flex-col gap-1.5 sm:gap-2"
      >
        <div className="flex items-center justify-between text-xs sm:text-sm text-white font-medium px-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f4a8a2] fill-[#f4a8a2]" />
            <span className="text-xs sm:text-sm">
              <strong className="text-[#f4a8a2]">{flippedCount}</strong> de {total} razones
            </span>
          </div>
          <span className="text-[#ffd2b8] font-bold text-xs sm:text-sm">{progressPercent}%</span>
        </div>

        {/* Línea de Relleno de Progreso */}
        <div className="w-full h-2 sm:h-2.5 bg-[#3a2d4c] rounded-full overflow-hidden p-0.5 border border-[#f4a8a2]/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#9a6f92] via-[#ea8571] to-[#ffd2b8] rounded-full shadow-[0_0_10px_#f4a8a2]"
          />
        </div>
      </motion.div>

      {/* Cuadrícula de Tarjetas Spotlight con entrada en cascada */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mb-8 sm:mb-10 px-1"
      >
        {RAZONES.map((razon, index) => (
          <motion.div key={index} variants={itemVariants}>
            <SpotlightCard
              index={index}
              razon={razon}
              isFlipped={!!flippedCards[index]}
              onToggle={handleCardClick}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Botón flotante para reabrir la carta si se ha completado */}
      {flippedCount === total && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsModalOpen(true)}
          className="mb-8 sm:mb-12 py-3 sm:py-3.5 px-6 sm:px-8 rounded-full bg-gradient-to-r from-[#9a6f92] to-[#ea8571] border border-[#f4a8a2] text-white text-sm sm:text-base font-semibold shadow-[0_8px_25px_rgba(234,133,113,0.6)] hover:shadow-[0_12px_30px_rgba(234,133,113,0.8)] transition-all flex items-center gap-2 transform active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span>Abrir Carta Secreta</span>
        </motion.button>
      )}

      {/* Modal interactivo con Sobre de Amor */}
      <EnvelopeLetterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X } from 'lucide-react';
import { MENSAJE_FINAL } from '../config/constants';

/**
 * Componente: FinalModal
 * Inspiración: shadcn/ui Dialog / Framer Motion Scale Modal
 * Por qué se usó: Presenta el mensaje final de amor como una carta elegante, legible y flotante al completar todas las tarjetas.
 */
export default function FinalModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d223c]/85 backdrop-blur-md">
          {/* Fondo oscuro interactivo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Tarjeta de Carta Sorpresa */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto p-6 md:p-10 rounded-3xl bg-gradient-to-b from-[#5e4e75] to-[#3a2d4c] border border-[#f4a8a2] shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(244,168,162,0.4)] z-10 text-center"
          >
            {/* Botón de Cierre */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-[#ffd2b8]/70 hover:text-white hover:bg-[#f4a8a2]/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Ícono de Corazón Resplandeciente */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#9a6f92]/20 border border-[#f4a8a2]/40 flex items-center justify-center shadow-[0_0_20px_rgba(244,168,162,0.4)]">
              <Heart className="w-8 h-8 text-[#f4a8a2] fill-[#f4a8a2] animate-pulse" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#f4a8a2]" />
              <h2 className="font-sans font-bold tracking-tight text-2xl md:text-3xl text-white">
                El Primer Mes de Muchos
              </h2>
              <Sparkles className="w-5 h-5 text-[#f4a8a2]" />
            </div>

            {/* Cuerpo del Mensaje */}
            <div className="p-5 md:p-6 mb-6 rounded-2xl bg-[#3a2d4c]/80 border border-[#f4a8a2]/20 text-left text-[#ffd2b8] text-base leading-relaxed whitespace-pre-line font-sans">
              {MENSAJE_FINAL}
            </div>

            <button
              onClick={onClose}
              className="py-3.5 px-8 text-base font-semibold text-white bg-gradient-to-r from-[#9a6f92] to-[#ea8571] hover:from-[#ea8571] hover:to-[#9a6f92] rounded-full shadow-[0_6px_20px_rgba(234,133,113,0.6)] hover:shadow-[0_10px_25px_rgba(234,133,113,0.8)] transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              Volver a ver las razones
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

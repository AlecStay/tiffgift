import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Mail, BookOpen } from 'lucide-react';
import { MENSAJE_FINAL } from '../config/constants';

/**
 * Componente: EnvelopeLetterModal
 * Diseño premium estilo 21st.dev / Craft UI:
 * - Bloqueo de scroll en el fondo (body scroll lock y overscroll-contain).
 * - Tarjeta panorámica más ancha para lectura cómoda en PC y adaptada a móvil.
 * - Estética limpia sin emojis con degradados lilas/coral y tipografía editorial.
 */
export default function EnvelopeLetterModal({ isOpen, onClose }) {
  const [isOpenLetter, setIsOpenLetter] = useState(false);

  // Bloqueo estricto del scroll de la página de fondo mientras la carta está abierta
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsOpenLetter(true), 350);
      return () => {
        document.body.style.overflow = originalStyle;
        clearTimeout(timer);
      };
    } else {
      setIsOpenLetter(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#241a33]/85 backdrop-blur-2xl overscroll-none select-text"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Fondo oscuro clicable para cerrar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Envoltorio de la Carta: Ancho panorámico más espacioso */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-3xl md:max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#55466d]/95 via-[#433558]/95 to-[#2e233d]/98 border border-[#f4a8a2]/50 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(244,168,162,0.25)] z-10 overflow-hidden"
          >
            {/* Resplandor ambiental superior integrado */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[radial-gradient(ellipse_at_center,rgba(244,168,162,0.2)_0%,transparent_70%)] pointer-events-none" />

            {/* Cabecera de la Carta */}
            <div className="relative flex items-center justify-between pb-4 sm:pb-5 border-b border-[#f4a8a2]/25 mb-4 sm:mb-6">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#f4a8a2]/15 border border-[#f4a8a2]/35 flex items-center justify-center shadow-[0_0_15px_rgba(244,168,162,0.2)]">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#f4a8a2]" />
                </div>
                <div className="text-left">
                  <h2 className="font-serif font-bold text-lg sm:text-2xl text-white tracking-wide leading-tight">
                    Carta para Tiffany
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#ffd2b8]/70 tracking-widest uppercase font-sans">
                    Nuestra historia juntos
                  </p>
                </div>
              </div>

              {/* Botón de cierre elegante */}
              <button
                onClick={onClose}
                aria-label="Cerrar carta"
                className="p-2 sm:p-2.5 rounded-full text-[#ffd2b8]/75 hover:text-white hover:bg-[#f4a8a2]/20 border border-transparent hover:border-[#f4a8a2]/30 transition-all cursor-pointer"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Contenedor Interior de la Carta: Scroll independiente exclusivo sin afectar el fondo */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isOpenLetter ? 1 : 0, y: isOpenLetter ? 0 : 15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex-1 overflow-y-auto overscroll-contain pr-2 sm:pr-4 rounded-2xl bg-[#342747]/70 border border-[#f4a8a2]/25 p-5 sm:p-8 md:p-10 shadow-inner"
              style={{
                scrollbarGutter: 'stable',
              }}
            >
              {/* Saludo inicial con icono */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f4a8a2]/15 text-[#f4a8a2]">
                <Heart className="w-4 h-4 fill-[#f4a8a2]" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#ffd2b8] uppercase">
                  De Ariel para el amor de mi vida
                </span>
              </div>

              {/* Cuerpo del Mensaje: Tipografía editorial espaciosa y legible */}
              <div className="text-[#ffd2b8] text-base sm:text-lg md:text-[19px] leading-relaxed sm:leading-loose font-serif font-normal text-left tracking-normal whitespace-pre-line selection:bg-[#f4a8a2]/30">
                {MENSAJE_FINAL}
              </div>

              {/* Sello de cierre de la carta */}
              <div className="mt-8 pt-4 border-t border-[#f4a8a2]/15 flex items-center justify-between text-xs text-[#ffd2b8]/60 font-sans">
                <span>Con todo mi cariño y devoción</span>
                <Sparkles className="w-4 h-4 text-[#f4a8a2]" />
              </div>
            </motion.div>

            {/* Barra inferior de acciones */}
            <div className="mt-4 sm:mt-6 pt-2 flex items-center justify-center">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#9a6f92] via-[#ea8571] to-[#9a6f92] hover:from-[#ea8571] hover:to-[#9a6f92] rounded-xl sm:rounded-2xl border border-[#f4a8a2]/40 shadow-[0_8px_25px_rgba(234,133,113,0.5)] hover:shadow-[0_12px_32px_rgba(234,133,113,0.7)] transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-white fill-white" />
                <span>Guardar en el corazón</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

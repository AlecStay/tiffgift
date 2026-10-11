import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, KeyRound } from 'lucide-react';
import { CODIGO_ESPECIAL, MENSAJE_ERROR_TEXTO } from '../config/constants';
import ShimmerButton from './ShimmerButton';
import MinecraftHeartsRain, { MinecraftHeart } from './MinecraftHeartsRain';
import AmourSunrisePreloader from './AmourSunrisePreloader';

/**
 * Componente: LockScreen
 * Incluye tarjeta de cristal, 3 corazones rojos estilo Minecraft, explosión de corazones y Amour Sunrise Preloader.
 */
export default function LockScreen({ onUnlocked }) {
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = inputCode.trim().toLowerCase();
    const targetCode = CODIGO_ESPECIAL.trim().toLowerCase();

    if (cleanInput === targetCode) {
      setErrorMsg('');
      setIsUnlocked(true);
      setShowLoader(true);
    } else {
      setErrorMsg(MENSAJE_ERROR_TEXTO);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleInputChange = (e) => {
    setInputCode(e.target.value);
    if (errorMsg) {
      setErrorMsg('');
    }
  };

  return (
    <>
      {/* Explosión/Lluvia de corazones de Minecraft por toda la pantalla al desbloquear */}
      {isUnlocked && <MinecraftHeartsRain count={50} />}

      <AnimatePresence mode="wait">
        {showLoader ? (
          <motion.div
            key="preloader-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#4f4366]"
          >
            <AmourSunrisePreloader
              durationMs={3800}
              word="TIFFANY"
              caption="Cargando con amor"
              hintText="Haz clic para entrar"
              palette={{
                paper: "#4f4366",
                ink: "#ffd2b8",
                sun: "#5e4e75",
                core: "#3a2d4c",
                glow: "#f4a8a2",
              }}
              onComplete={onUnlocked}
            />
          </motion.div>
        ) : (
          <motion.div
            key="lock-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: isShaking ? [1, 1.02, 0.98, 1] : 1,
              y: 0,
              x: isShaking ? [-10, 10, -8, 8, -4, 4, 0] : 0
            }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-full max-w-sm sm:max-w-md p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#5e4e75]/80 to-[#3a2d4c]/90 sm:from-[#5e4e75]/85 sm:to-[#3a2d4c]/95 backdrop-blur-xl sm:backdrop-blur-2xl border border-[#f4a8a2]/40 sm:border-2 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(244,168,162,0.3)] text-center z-10 overflow-hidden mx-auto"
          >
            {/* Luz Ambiental de fondo de la tarjeta (GPU nativa) */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-44 sm:w-56 h-44 sm:h-56 bg-[radial-gradient(circle_at_center,rgba(244,168,162,0.22)_0%,transparent_70%)] pointer-events-none" />

            <h1 className="font-sans font-extrabold tracking-tight text-2xl sm:text-3xl md:text-4xl text-white mb-5 sm:mb-6 leading-tight">
              Quiero estar contigo por siempre!
            </h1>

            {/* Tarjeta con 3 corazones de Minecraft exactos */}
            <div className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3.5 mb-6 sm:mb-8 bg-[#3a2d4c]/90 border border-[#f4a8a2]/40 sm:border-2 rounded-xl sm:rounded-2xl shadow-[0_0_20px_rgba(244,168,162,0.25)] backdrop-blur-md">
              <MinecraftHeart className="w-6 h-6 sm:w-8 sm:h-8" />
              <MinecraftHeart className="w-6 h-6 sm:w-8 sm:h-8" />
              <MinecraftHeart className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            {/* Formulario con Campo de Entrada Estilizado */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="relative">
                <KeyRound className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#f4a8a2]" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={handleInputChange}
                  placeholder="Ingresa contraseña..."
                  className="w-full pl-10 pr-4 sm:px-12 py-3.5 sm:py-4 text-center text-base sm:text-lg tracking-widest text-white bg-[#3a2d4c]/90 border border-[#f4a8a2]/40 sm:border-2 rounded-xl sm:rounded-2xl outline-none transition-all duration-300 focus:border-[#f4a8a2] focus:ring-4 focus:ring-[#9a6f92]/40 shadow-[inner_0_2px_4px_rgba(0,0,0,0.5)] placeholder:text-[#ffd2b8]/40 placeholder:text-xs sm:placeholder:text-sm placeholder:tracking-normal font-sans"
                  autoFocus
                />
              </div>

              {/* Botón Shimmer de 21st.dev */}
              <ShimmerButton type="submit" className="w-full">
                <span className="text-sm sm:text-base">Sorpresa</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </ShimmerButton>
            </form>

            {/* Reemplazo dinámico: Muestra el error o la pista en la misma posición */}
            <div className="mt-4 sm:mt-5 min-h-[40px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {errorMsg ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-full text-xs sm:text-sm font-medium text-[#ffd2b8] bg-[#9a6f92]/35 border border-[#f4a8a2]/40 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl shadow-[0_0_15px_rgba(244,168,162,0.2)]"
                  >
                    <span>{errorMsg}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="hint"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-full text-[11px] sm:text-xs font-medium text-[#ffd2b8] tracking-wide flex items-center justify-center gap-1.5 bg-[#f4a8a2]/15 border border-[#f4a8a2]/30 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl shadow-[0_0_15px_rgba(244,168,162,0.15)]"
                  >
                    <span>La contraseña es nuestra fecha &lt;3 </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useState, Suspense, lazy, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundGlow from './components/BackgroundGlow';
import LockScreen from './components/LockScreen';

const ReasonsScreen = lazy(() => import('./components/ReasonsScreen'));

/**
 * Componente Principal App
 * Administra el estado entre la Parte 1 (Candado) y la Parte 2 (Tarjetas de razones)
 * Optimizado con code-splitting y prefetch progresivo.
 */
export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  // Prefetch de ReasonsScreen en segundo plano para que esté listo al instante al desbloquear
  useEffect(() => {
    const prefetchTimer = setTimeout(() => {
      import('./components/ReasonsScreen');
    }, 1200);
    return () => clearTimeout(prefetchTimer);
  }, []);

  return (
    <main className="relative min-h-[100dvh] w-full flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-x-hidden selection:bg-[#9a6f92] selection:text-white">
      {/* Fondo Lilac Dusk con WebGL y Video */}
      <BackgroundGlow />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <LockScreen key="lock" onUnlocked={() => setUnlocked(true)} />
        ) : (
          <Suspense fallback={null}>
            <ReasonsScreen key="reasons" onBackToStart={() => setUnlocked(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </main>
  );
}

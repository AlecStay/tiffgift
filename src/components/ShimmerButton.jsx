import React from 'react';

/**
 * Componente: ShimmerButton
 * Inspiración: 21st.dev / Magic UI (Shimmer & Glowing Gradient Button)
 * Adaptado a la paleta exclusiva de azul eléctrico (#2F6FDE) y azul cielo (#4FA3E0).
 */
export default function ShimmerButton({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-2xl font-semibold text-white group focus:outline-none focus:ring-4 focus:ring-[#ea8571]/40 active:scale-98 transition-all duration-300 ${className}`}
    >
      {/* Borde con degradado en movimiento continuo */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#f4a8a2] via-[#ea8571] to-[#ffd2b8] rounded-2xl animate-pulse group-hover:opacity-100 transition-opacity" />
      
      {/* Resplandor ambiental trasero */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#9a6f92] to-[#ea8571] rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Relleno del Botón */}
      <span className="relative w-full px-6 py-4 transition-all duration-300 ease-out bg-gradient-to-r from-[#5e4e75] via-[#3a2d4c] to-[#5e4e75] group-hover:bg-gradient-to-r group-hover:from-[#9a6f92] group-hover:to-[#ea8571] rounded-[14px] flex items-center justify-center gap-2 text-base tracking-wide shadow-lg">
        {children}
      </span>
    </button>
  );
}

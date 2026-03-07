"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Shirt, Music, Instagram, Gift, Star, Heart } from 'lucide-react';

// Componente del Contador Regresivo
const Contador = () => {
  const [tiempo, setTiempo] = useState({ días: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const meta = new Date("2026-12-19T18:00:00").getTime();
    const interval = setInterval(() => {
      const ahora = new Date().getTime();
      const diff = meta - ahora;
      if (diff > 0) {
        setTiempo({
          días: Math.floor(diff / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seg: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-[#d1b06b]/20">
      {Object.entries(tiempo).map(([label, valor]) => (
        <div key={label} className="text-center">
          <div className="text-3xl md:text-5xl font-serif text-[#d1b06b]">{valor}</div>
          <span className="text-[10px] uppercase tracking-widest text-stone-400">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function InvitacionBoda() {
  // Lista de iconos corregida para evitar el error de tipado ts(2769)
  const infoGrid = [
    { icon: <Clock size={28} />, title: "18:00 HRS", desc: "Ceremonia" },
    { icon: <MapPin size={28} />, title: "LUNA AZUL", desc: "Rita de Pococí" },
    { icon: <Shirt size={28} />, title: "FORMAL", desc: "Código de Vestimenta" },
    { icon: <Gift size={28} />, title: "SOBRES", desc: "Lluvia de Sobres" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <span className="text-[#d1b06b] tracking-[0.5em] text-xs uppercase mb-4 block">Nuestra Boda</span>
          <h1 className="font-cursive text-7xl md:text-9xl text-[#d1b06b] mb-4">Carlos & Joselyn</h1>
          <p className="font-serif italic text-xl md:text-2xl text-stone-300">19 de Diciembre, 2026</p>
          
          <div className="mt-12">
            <Contador />
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 animate-bounce">
          <Heart className="text-[#d1b06b]/40" size={30} />
        </div>
      </section>

      {/* Grid de Información */}
      <section className="py-24 max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {infoGrid.map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/10"
          >
            <div className="text-[#d1b06b] mb-4">{item.icon}</div>
            <h4 className="font-bold text-sm tracking-widest text-[#d1b06b] uppercase mb-1">{item.title}</h4>
            <p className="text-[10px] text-stone-400 uppercase tracking-tighter">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer / RSVP */}
      <footer className="py-32 text-center bg-[#05100a]">
        <h2 className="font-cursive text-5xl text-[#d1b06b] mb-8 italic">¿Nos acompañas?</h2>
        <button className="px-12 py-4 bg-[#d1b06b] text-[#06140d] rounded-full font-bold tracking-widest text-xs hover:bg-[#f7f5f0] transition-colors duration-500 shadow-xl">
          CONFIRMAR ASISTENCIA
        </button>
      </footer>
    </div>
  );
}
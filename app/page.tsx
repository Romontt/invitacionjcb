"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Shirt, Gift, Heart, Volume2, Camera, ChevronDown } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spriycerzcurnhoznzzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcml5Y2VyemN1cm5ob3puenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDIwODcsImV4cCI6MjA4ODQ3ODA4N30.90778vaPGPxLdjmcvQFf7_xcnhqi_ukW9fJtG5BlkDc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ días: 0, hs: 0, min: 0, seg: 0 });

  useEffect(() => {
    const target = new Date("December 19, 2026 18:00:00").getTime();
    const interval = setInterval(() => {
      const distance = target - new Date().getTime();
      setTimeLeft({
        días: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hs: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 justify-center mt-8 scale-90 md:scale-100">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="text-[#d1b06b] text-3xl md:text-4xl font-light mb-1">{value}</div>
          <div className="text-[10px] uppercase tracking-widest text-stone-400">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default function InvitacionPremium() {
  const [paso, setPaso] = useState('landing'); 
  const [invitado, setInvitado] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      supabase.from('invitados').select('*').eq('id', id).single().then(({ data }) => setInvitado(data));
    }
  }, []);

  const entrar = (music: boolean) => {
    setPaso('invitacion');
    if (music && audioRef.current) audioRef.current.play().catch(() => {});
  };

  return (
    <main className="min-h-screen bg-[#06140d] text-[#f7f5f0]">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {paso === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0 }} className="h-screen flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] text-center p-6">
            <div className="space-y-8 border border-[#d1b06b]/20 p-12 rounded-2xl bg-[#06140d]/80 backdrop-blur-md">
              <h1 className="font-cursive text-7xl text-[#d1b06b]">Carlos & Joselyn</h1>
              <button onClick={() => entrar(true)} className="flex items-center gap-3 px-10 py-4 bg-[#d1b06b] text-[#06140d] rounded-full mx-auto font-bold tracking-widest uppercase text-xs">
                <Volume2 size={16} /> Abrir Invitación
              </button>
            </div>
          </motion.div>
        )}

        {paso === 'invitacion' && (
          <motion.div key="invitacion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
            
            {/* NUEVO HEADER VINTAGE */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
               {/* Imagen de Fondo con Overlay */}
               <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-40" alt="Boda" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#06140d]" />
               </div>

               <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className="relative z-10 px-6">
                  <span className="text-[#d1b06b] tracking-[0.4em] text-[10px] uppercase mb-6 block">19 . 12 . 2026</span>
                  <h2 className="font-serif text-6xl md:text-9xl mb-4 font-light">Carlos <span className="text-[#d1b06b]">&</span> Joselyn</h2>
                  <div className="w-16 h-[1px] bg-[#d1b06b]/40 mx-auto my-8" />
                  <p className="font-serif italic text-stone-300 text-lg md:text-2xl max-w-lg mx-auto leading-relaxed">
                    "Todos somos mortales, hasta el primer beso y la segunda copa de vino"
                  </p>
                  <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-12 text-[#d1b06b]/50">
                     <ChevronDown size={32} className="mx-auto" />
                  </motion.div>
               </motion.div>
            </section>

            {/* CUENTA REGRESIVA CON FONDOS ONDULADOS */}
            <section className="py-20 bg-white/5 relative">
               <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                  <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                     <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120c6.4,0,12.79,0,19.19,0C158.59,120,223.43,83.43,321.39,56.44Z" fill="#06140d"></path>
                  </svg>
               </div>
               <div className="text-center py-10">
                  <h3 className="font-serif text-4xl italic mb-4">Falta</h3>
                  <Countdown />
                  <Heart fill="#d1b06b" className="text-[#d1b06b] mx-auto mt-8 opacity-40" size={20} />
               </div>
            </section>

            {/* INVITADOS PERSONALIZADOS */}
            <section className="py-20 text-center px-6">
                <div className="bg-[#d1b06b] text-[#06140d] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-2xl">
                   {invitado?.pases || "?"}
                </div>
                <h3 className="uppercase tracking-[0.3em] text-[11px] font-bold text-[#d1b06b] mb-4">Invitados</h3>
                <p className="font-serif italic text-3xl md:text-5xl text-stone-200 whitespace-pre-line leading-snug">
                   {invitado?.nombre_completo?.replace(' y ', ' \n & \n ') || "Nuestra Familia"}
                </p>
                <p className="text-[#d1b06b] mt-8 font-serif italic italic opacity-70">Tu presencia es lo más importante. ¡No faltes!</p>
            </section>

            {/* CARRUSEL DE FOTOS VINTAGE */}
            <section className="py-24">
               <div className="text-center mb-16 px-6">
                  <Camera className="mx-auto text-[#d1b06b] mb-4 opacity-50" size={30} />
                  <h3 className="font-serif text-5xl italic mb-2">Retratos de Nuestro Amor</h3>
                  <p className="text-stone-500 text-sm">Un minuto, un segundo, un instante que queda en la eternidad</p>
               </div>
               <div className="flex gap-6 overflow-x-auto px-6 no-scrollbar snap-x snap-mandatory">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="min-w-[280px] md:min-w-[400px] aspect-[3/4] bg-stone-900 rounded-lg snap-center overflow-hidden border-8 border-white/5 shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700">
                       <div className="absolute inset-0 flex items-center justify-center text-stone-700 italic">Foto {i}</div>
                    </div>
                  ))}
               </div>
            </section>

            {/* SECCIÓN REGALOS (ESTILO BOTÓN) */}
            <section className="max-w-4xl mx-auto px-6 py-20">
               <div className="text-center p-12 border border-[#d1b06b]/20 rounded-[3rem] bg-white/5">
                  <h3 className="font-serif text-4xl mb-4 italic">Regalos</h3>
                  <p className="text-stone-400 font-serif italic text-lg mb-8 max-w-md mx-auto">
                    Si deseas regalarnos algo más que tu hermosa presencia...
                  </p>
                  <div className="mx-auto w-16 h-16 border border-[#d1b06b]/30 rounded-full flex items-center justify-center mb-8">
                     <Gift className="text-[#d1b06b]" size={24} />
                  </div>
                  <button className="px-12 py-4 border border-[#d1b06b] text-[#d1b06b] rounded-full text-xs tracking-widest uppercase font-bold hover:bg-[#d1b06b] hover:text-[#06140d] transition-all">
                     Ver más
                  </button>
               </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Shirt, Music, Instagram, Gift, Heart, Volume2, VolumeX } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN SUPABASE ---
// Reemplaza con tus datos reales de la consola de Supabase
const supabaseUrl = 'https://spriycerzcurnhoznzzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcml5Y2VyemN1cm5ob3puenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDIwODcsImV4cCI6MjA4ODQ3ODA4N30.90778vaPGPxLdjmcvQFf7_xcnhqi_ukW9fJtG5BlkDc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function InvitacionPremium() {
  const [paso, setPaso] = useState('landing'); // landing | invitacion
  const [conMusica, setConMusica] = useState(false);
  const [nombre, setNombre] = useState('');
  const [enviando, setEnviando] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Función para entrar a la invitación
  const entrar = (playMusic: boolean) => {
    setConMusica(playMusic);
    setPaso('invitacion');
    if (playMusic && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio bloqueado"));
    }
  };

  // Función para confirmar asistencia
  const confirmarAsistencia = async () => {
    if (!nombre.trim()) return alert("Por favor, ingresa tu nombre");
    setEnviando(true);
    
    const { error } = await supabase
      .from('asistencias')
      .insert([{ nombre, confirmado: true }]);

    setEnviando(false);
    if (error) alert("Error al confirmar: " + error.message);
    else alert("¡Gracias por confirmar, " + nombre + "!");
  };

  return (
    <main className="min-h-screen bg-[#06140d] text-[#f7f5f0]">
      {/* Elemento de Audio Oculto */}
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {/* --- PASO 1: LANDING PAGE --- */}
        {paso === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="h-screen flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] text-center p-6"
          >
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-8">
              <span className="text-[#d1b06b] tracking-[0.4em] text-[10px] uppercase">Estás invitado a</span>
              <h1 className="font-cursive text-7xl md:text-8xl text-[#d1b06b]">Carlos & Joselyn</h1>
              <div className="w-16 h-[1px] bg-[#d1b06b]/30 mx-auto" />
              <p className="font-serif italic text-stone-400">¿Deseas activar la música para esta experiencia?</p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => entrar(true)}
                  className="flex items-center gap-3 px-8 py-3 border border-[#d1b06b] text-[#d1b06b] rounded-full hover:bg-[#d1b06b] hover:text-[#06140d] transition-all duration-500 text-xs tracking-widest"
                >
                  <Volume2 size={16} /> ENTRAR CON MÚSICA
                </button>
                <button 
                  onClick={() => entrar(false)}
                  className="flex items-center gap-3 px-8 py-3 text-stone-500 hover:text-white transition-all text-[10px] tracking-widest"
                >
                  <VolumeX size={14} /> ENTRAR SIN MÚSICA
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* --- PASO 2: INVITACIÓN --- */}
        {paso === 'invitacion' && (
          <motion.div 
            key="invitacion"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="pb-20"
          >
            {/* Hero */}
            <section className="h-screen flex flex-col items-center justify-center text-center relative px-6">
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }}>
                 <h2 className="font-cursive text-8xl md:text-[10rem] text-[#d1b06b] leading-none mb-6">C&J</h2>
                 <p className="font-serif text-2xl md:text-3xl italic tracking-widest text-stone-200">19 . 12 . 2026</p>
               </motion.div>
               <div className="absolute bottom-10 animate-pulse text-[#d1b06b]/40 uppercase text-[9px] tracking-[0.5em]">Desliza para ver más</div>
            </section>

            {/* Grid de Información Corregido (Sin cloneElement) */}
            <section className="py-24 max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Clock size={28} />, t: "18:00 HRS", d: "CEREMONIA" },
                { icon: <MapPin size={28} />, t: "LUNA AZUL", d: "UBICACIÓN" },
                { icon: <Shirt size={28} />, t: "FORMAL", d: "DRESS CODE" },
                { icon: <Gift size={28} />, t: "SOBRES", d: "REGALOS" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-[#d1b06b]/10">
                  <div className="text-[#d1b06b] mb-4">{item.icon}</div>
                  <span className="text-xs font-bold tracking-widest text-[#d1b06b]">{item.t}</span>
                  <span className="text-[9px] text-stone-500 mt-1 uppercase">{item.d}</span>
                </div>
              ))}
            </section>

            {/* Formulario RSVP */}
            <section className="max-w-md mx-auto px-6 py-20 bg-[#05100a] rounded-3xl border border-white/5 shadow-2xl">
              <div className="text-center mb-10">
                <Heart className="mx-auto text-[#d1b06b] mb-4" fill="#d1b06b" size={24} />
                <h3 className="font-serif text-3xl">Confirma tu Asistencia</h3>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Tu Nombre Completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-[#d1b06b] outline-none transition-all text-sm"
                />
                <button 
                  onClick={confirmarAsistencia}
                  disabled={enviando}
                  className="w-full bg-[#d1b06b] text-[#06140d] font-bold py-4 rounded-xl tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50"
                >
                  {enviando ? 'ENVIANDO...' : 'CONFIRMAR ASISTENCIA'}
                </button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
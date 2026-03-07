"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Shirt, Music, Instagram, Gift, Heart, Volume2, VolumeX, Star, ChevronDown } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN SUPABASE ---
const supabaseUrl = 'https://spriycerzcurnhoznzzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcml5Y2VyemN1cm5ob3puenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDIwODcsImV4cCI6MjA4ODQ3ODA4N30.90778vaPGPxLdjmcvQFf7_xcnhqi_ukW9fJtG5BlkDc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function InvitacionPremium() {
  const [paso, setPaso] = useState('landing'); 
  const [conMusica, setConMusica] = useState(false);
  const [invitado, setInvitado] = useState<{id: string, nombre_completo: string, pases: number} | null>(null);
  const [enviando, setEnviando] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cargar datos del invitado desde la URL (?id=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      const fetchInvitado = async () => {
        const { data } = await supabase.from('invitados').select('*').eq('id', id).single();
        if (data) setInvitado(data);
      };
      fetchInvitado();
    }
  }, []);

  const entrar = (playMusic: boolean) => {
    setConMusica(playMusic);
    setPaso('invitacion');
    if (playMusic && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio bloqueado"));
    }
  };

  const confirmarAsistencia = async () => {
    if (!invitado) return alert("Error: No se encontró el registro del invitado.");
    setEnviando(true);
    
    const { error } = await supabase
      .from('invitados')
      .update({ confirmado: true })
      .eq('id', invitado.id);

    setEnviando(false);
    if (error) alert("Error al confirmar: " + error.message);
    else alert(`¡Gracias por confirmar, ${invitado.nombre_completo}!`);
  };

  return (
    <main className="min-h-screen bg-[#06140d] text-[#f7f5f0]">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {/* --- PASO 1: LANDING PAGE (ESTILO SOBRE) --- */}
        {paso === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -100 }}
            className="h-screen flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] text-center p-6"
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-8 border border-[#d1b06b]/20 p-12 rounded-lg">
              <span className="text-[#d1b06b] tracking-[0.4em] text-[10px] uppercase">Invitación Exclusiva</span>
              <h1 className="font-cursive text-7xl md:text-8xl text-[#d1b06b]">Carlos & Joselyn</h1>
              <p className="font-serif italic text-stone-400">¿Deseas activar la música para esta experiencia?</p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button onClick={() => entrar(true)} className="flex items-center gap-3 px-8 py-3 border border-[#d1b06b] text-[#d1b06b] rounded-full hover:bg-[#d1b06b] hover:text-[#06140d] transition-all text-xs tracking-widest uppercase font-bold">
                  <Volume2 size={16} /> Entrar con Música
                </button>
                <button onClick={() => entrar(false)} className="text-stone-500 hover:text-white transition-all text-[10px] tracking-widest uppercase">
                  Entrar sin Música
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* --- PASO 2: INVITACIÓN (ESTILO FIXDATE) --- */}
        {paso === 'invitacion' && (
          <motion.div key="invitacion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
            {/* Hero Principal */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5 }}>
                <span className="text-[#d1b06b] tracking-[0.5em] text-[10px] uppercase mb-4 block">Nuestra Boda</span>
                <h2 className="font-cursive text-7xl md:text-9xl text-[#d1b06b] mb-2">Carlos & Joselyn</h2>
                <div className="w-24 h-[1px] bg-[#d1b06b]/30 mx-auto mb-6" />
                <p className="font-serif text-xl md:text-2xl italic tracking-widest text-stone-300 uppercase">19 . 12 . 2026</p>
                
                {/* Contador de Pases Estilo Fixdate */}
                <div className="mt-16 p-8 bg-white/5 border-y border-[#d1b06b]/20 w-full max-w-lg mx-auto">
                   <div className="bg-[#d1b06b] text-[#06140d] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-lg">
                      {invitado?.pases || "?"}
                   </div>
                   <h3 className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#d1b06b] mb-2">Pases Asignados</h3>
                   <p className="font-serif italic text-stone-300 text-lg">Familia {invitado?.nombre_completo || "Amigos y Familia"}</p>
                </div>
              </motion.div>
              <div className="absolute bottom-10 animate-bounce text-[#d1b06b]/40"><ChevronDown size={30}/></div>
            </section>

            {/* Grid de Información Interactivo */}
            <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Clock size={28} />, t: "18:00 HRS", d: "CEREMONIA" },
                { icon: <MapPin size={28} />, t: "LUNA AZUL", d: "UBICACIÓN" },
                { icon: <Shirt size={28} />, t: "FORMAL", d: "DRESS CODE" },
                { icon: <Gift size={28} />, t: "SOBRES", d: "REGALOS" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-8 bg-white/5 rounded-2xl border border-white/5 hover:border-[#d1b06b]/30 transition-all">
                  <div className="text-[#d1b06b] mb-4">{item.icon}</div>
                  <span className="text-xs font-bold tracking-widest text-[#d1b06b]">{item.t}</span>
                  <span className="text-[9px] text-stone-500 mt-1 uppercase tracking-tighter">{item.d}</span>
                </div>
              ))}
            </section>

            {/* Confirmación RSVP Personalizada */}
            <section className="max-w-md mx-auto px-6 py-16 bg-[#05100a] rounded-3xl border border-[#d1b06b]/10 shadow-2xl mb-20 text-center">
              <Heart className="mx-auto text-[#d1b06b] mb-4" fill="#d1b06b" size={24} />
              <h3 className="font-serif text-3xl italic mb-2">¿Nos acompañas?</h3>
              <p className="text-stone-400 text-xs mb-8">Por favor confirma tu asistencia antes del 01/12</p>
              
              <div className="space-y-6">
                <div className="py-4 border-b border-white/10 font-serif italic text-xl">
                   {invitado?.nombre_completo || "Invitado"}
                </div>
                <button 
                  onClick={confirmarAsistencia}
                  disabled={enviando || !invitado}
                  className="w-full bg-[#d1b06b] text-[#06140d] font-bold py-4 rounded-xl tracking-widest text-xs hover:bg-white transition-all disabled:opacity-50"
                >
                  {enviando ? 'CONFIRMANDO...' : 'CONFIRMAR ASISTENCIA'}
                </button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
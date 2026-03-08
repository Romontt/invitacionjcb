"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Users, Shirt, Music, Instagram, Gift, Heart, Volume2, VolumeX, Star, ChevronDown, Camera } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spriycerzcurnhoznzzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcml5Y2VyemN1cm5ob3puenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDIwODcsImV4cCI6MjA4ODQ3ODA4N30.90778vaPGPxLdjmcvQFf7_xcnhqi_ukW9fJtG5BlkDc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- COMPONENTE CUENTA REGRESIVA ---
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const target = new Date("December 19, 2026 18:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center mt-10">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-14 h-14 md:w-20 md:h-20 border border-[#d1b06b]/40 rounded-full flex items-center justify-center text-[#d1b06b] text-xl md:text-3xl font-serif bg-white/5 backdrop-blur-sm">
            {value}
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase mt-2 text-stone-500">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function InvitacionPremium() {
  const [paso, setPaso] = useState('landing'); 
  const [invitado, setInvitado] = useState<{id: string, nombre_completo: string, pases: number} | null>(null);
  const [enviando, setEnviando] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    setPaso('invitacion');
    if (playMusic && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const confirmarAsistencia = async () => {
    if (!invitado) return alert("No se encontró el invitado.");
    setEnviando(true);
    const { error } = await supabase.from('invitados').update({ confirmado: true }).eq('id', invitado.id);
    setEnviando(false);
    if (error) alert("Error: " + error.message);
    else alert(`¡Confirmado! Gracias ${invitado.nombre_completo}`);
  };

  return (
    <main className="min-h-screen bg-[#06140d] text-[#f7f5f0] selection:bg-[#d1b06b]/30">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {paso === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="h-screen flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] text-center p-6"
          >
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-8 border border-[#d1b06b]/20 p-12 rounded-2xl bg-[#06140d]/80 backdrop-blur-md">
              <span className="text-[#d1b06b] tracking-[0.4em] text-[10px] uppercase">Invitación Exclusiva</span>
              <h1 className="font-cursive text-7xl md:text-8xl text-[#d1b06b]">Carlos & Joselyn</h1>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
                <button onClick={() => entrar(true)} className="flex items-center gap-3 px-10 py-4 bg-[#d1b06b] text-[#06140d] rounded-full hover:bg-white transition-all text-xs tracking-widest uppercase font-bold shadow-xl shadow-[#d1b06b]/10">
                  <Volume2 size={16} /> Entrar con Música
                </button>
                <button onClick={() => entrar(false)} className="text-stone-500 hover:text-white transition-all text-[10px] tracking-widest uppercase">
                  Entrar sin Música
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {paso === 'invitacion' && (
          <motion.div key="invitacion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-20">
            
            {/* HEADER DINÁMICO CON CUENTA REGRESIVA */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06140d]" />
              
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="relative z-10">
                <Heart className="mx-auto text-[#d1b06b] mb-6 opacity-50" size={30} />
                <h2 className="font-cursive text-7xl md:text-[10rem] text-[#d1b06b] leading-tight">Carlos & Joselyn</h2>
                <p className="font-serif text-lg md:text-2xl italic tracking-[0.3em] text-stone-300 mt-4 uppercase">19 de Diciembre, 2026</p>
                
                <Countdown />

                <div className="mt-20 p-8 border border-[#d1b06b]/20 rounded-2xl bg-white/5 backdrop-blur-sm max-w-lg mx-auto">
                   <div className="bg-[#d1b06b] text-[#06140d] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                      {invitado?.pases || "?"}
                   </div>
                   <h3 className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#d1b06b] mb-2">Pases para:</h3>
                   <p className="font-serif italic text-stone-200 text-2xl whitespace-pre-line leading-relaxed">
                      {invitado?.nombre_completo?.replace(' y ', ' \n & \n ') || "Nuestra Familia"}
                   </p>
                </div>
              </motion.div>
              
              <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 text-[#d1b06b]/40">
                <ChevronDown size={30}/>
              </motion.div>
            </section>

            {/* GALERÍA DE FOTOS (CARRUSEL) */}
            <section className="py-24 overflow-hidden">
               <div className="flex flex-col items-center mb-12">
                  <Camera className="text-[#d1b06b] mb-4 opacity-50" size={24} />
                  <h3 className="font-serif text-4xl italic">Nuestra Historia</h3>
               </div>
               <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar snap-x pb-10">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="min-w-[300px] h-[450px] bg-stone-900 rounded-2xl snap-center overflow-hidden border border-white/10 shadow-2xl relative"
                    >
                      {/* Aquí irán tus fotos: <img src={`/foto${i}.jpg`} className="w-full h-full object-cover" /> */}
                      <div className="absolute inset-0 flex items-center justify-center text-stone-800 italic text-sm">Espacio para Foto {i}</div>
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* SECCIÓN REGALOS (SOBRES) */}
            <section className="max-w-4xl mx-auto px-6 py-20">
               <div className="bg-white/5 border border-[#d1b06b]/10 p-12 rounded-[3rem] text-center relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#d1b06b]/5 rounded-full blur-3xl group-hover:bg-[#d1b06b]/10 transition-all" />
                  <Gift className="mx-auto text-[#d1b06b] mb-6" size={40} />
                  <h3 className="font-serif text-4xl mb-6 italic text-[#d1b06b]">Lluvia de Sobres</h3>
                  <p className="text-stone-400 font-serif text-lg leading-relaxed max-w-xl mx-auto italic">
                    "Vuestra presencia es nuestro mejor regalo, pero si deseáis tener un detalle con nosotros, contaremos con una lluvia de sobres el día del evento."
                  </p>
               </div>
            </section>

            {/* INFO GRID */}
            <section className="max-w-5xl mx-auto px-6 py-24 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Clock size={28} />, t: "18:00 HRS", d: "CEREMONIA" },
                { icon: <MapPin size={28} />, t: "LUNA AZUL", d: "UBICACIÓN" },
                { icon: <Shirt size={28} />, t: "FORMAL", d: "DRESS CODE" },
                { icon: <Star size={28} />, t: "AGENDA", d: "CALENDARIO" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-[#d1b06b]/30 transition-all hover:-translate-y-2 duration-500">
                  <div className="text-[#d1b06b] mb-4">{item.icon}</div>
                  <span className="text-xs font-bold tracking-[0.2em] text-[#d1b06b]">{item.t}</span>
                  <span className="text-[9px] text-stone-500 mt-2 uppercase">{item.d}</span>
                </div>
              ))}
            </section>

            {/* RSVP */}
            <section className="max-w-md mx-auto px-6 py-20">
              <div className="bg-[#05100a] p-10 rounded-[3rem] border border-[#d1b06b]/10 shadow-2xl text-center">
                <Heart className="mx-auto text-[#d1b06b] mb-6" fill="#d1b06b" size={30} />
                <h3 className="font-serif text-4xl mb-2 italic">Confirmar Asistencia</h3>
                <p className="text-stone-500 text-[10px] tracking-widest uppercase mb-10">Favor confirmar antes del 01/12</p>
                <div className="space-y-6">
                  <div className="py-4 border-b border-white/10 font-serif italic text-2xl text-[#d1b06b]">
                     {invitado?.nombre_completo || "Invitado Especial"}
                  </div>
                  <button 
                    onClick={confirmarAsistencia}
                    disabled={enviando || !invitado}
                    className="w-full bg-[#d1b06b] text-[#06140d] font-bold py-5 rounded-2xl tracking-[0.2em] text-[10px] hover:bg-white transition-all disabled:opacity-50 shadow-lg shadow-[#d1b06b]/10"
                  >
                    {enviando ? 'PROCESANDO...' : 'CONFIRMAR MI ASISTENCIA'}
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
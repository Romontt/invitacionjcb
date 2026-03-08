"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Shirt, Gift, Heart, Volume2, Camera, ChevronDown, Calendar, CheckCircle2 } from 'lucide-react';
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
      if (distance < 0) return clearInterval(interval);
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
    <div className="flex gap-4 md:gap-8 justify-center mt-8">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center group">
          <motion.div 
            initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            className="text-[#d1b06b] text-4xl md:text-5xl font-light mb-1 drop-shadow-md"
          >
            {value}
          </motion.div>
          <div className="text-[9px] uppercase tracking-[0.3em] text-stone-400 group-hover:text-[#d1b06b] transition-colors uppercase font-bold">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function InvitacionPremium() {
  const [paso, setPaso] = useState('landing'); 
  const [invitado, setInvitado] = useState<any>(null);
  const [confirmado, setConfirmado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      supabase.from('invitados').select('*').eq('id', id).single().then(({ data }) => {
        setInvitado(data);
        if (data?.confirmado) setConfirmado(true);
      });
    }
  }, []);

  const entrar = (music: boolean) => {
    setPaso('invitacion');
    if (music && audioRef.current) audioRef.current.play().catch(() => {});
  };

  const handleConfirmar = async () => {
    if (!invitado) return;
    setCargando(true);
    const { error } = await supabase.from('invitados').update({ confirmado: true }).eq('id', invitado.id);
    if (!error) {
      setConfirmado(true);
    }
    setCargando(false);
  };

  return (
    <main className="min-h-screen bg-[#06140d] text-[#f7f5f0] selection:bg-[#722f37]/50 overflow-x-hidden">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {paso === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0, scale: 1.1 }} className="h-screen flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] text-center p-6 relative">
            <div className="absolute inset-0 bg-black/50" />
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="relative z-10 space-y-10 border border-[#d1b06b]/30 p-12 md:p-16 rounded-[2rem] bg-[#06140d]/80 backdrop-blur-xl shadow-2xl"
            >
              <div className="space-y-4">
                <span className="text-[#d1b06b] tracking-[0.5em] text-[10px] uppercase block">Reserva la Fecha</span>
                <h1 className="font-cursive text-7xl md:text-8xl text-[#d1b06b] drop-shadow-lg">Carlos & Joselyn</h1>
              </div>
              <button onClick={() => entrar(true)} className="flex items-center gap-4 px-12 py-5 bg-[#722f37] text-white rounded-full mx-auto font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-[#d1b06b] hover:text-[#06140d] transition-all shadow-xl shadow-black/40 border border-white/10">
                <Volume2 size={16} /> Abrir Invitación
              </button>
            </motion.div>
          </motion.div>
        )}

        {paso === 'invitacion' && (
          <motion.div key="invitacion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32">
            
            {/* HERO VINTAGE VINO Y DORADO */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
               <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-30" alt="Boda" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#722f37]/40 via-transparent to-[#06140d]" />
               </div>

               <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }} className="relative z-10">
                  <span className="text-[#d1b06b] tracking-[0.6em] text-[11px] uppercase mb-8 block">19 . 12 . 2026</span>
                  <h2 className="font-serif text-6xl md:text-[10rem] mb-6 font-light leading-none">
                    Carlos <span className="text-[#722f37] italic block md:inline md:mx-4 drop-shadow-sm">&</span> Joselyn
                  </h2>
                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d1b06b] to-transparent mx-auto my-10" />
                  <p className="font-serif italic text-stone-200 text-xl md:text-3xl max-w-2xl mx-auto leading-relaxed px-4 italic">
                    "Todos somos mortales, hasta el primer beso y la segunda copa de vino"
                  </p>
                  <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="mt-20 text-[#d1b06b]/50">
                     <ChevronDown size={32} className="mx-auto" />
                  </motion.div>
               </motion.div>
            </section>

            {/* SECCIÓN CUENTA REGRESIVA - CARD VINO */}
            <section className="py-24 px-6 relative flex justify-center">
               <div className="w-full max-w-4xl bg-[#722f37]/10 border border-[#d1b06b]/20 rounded-[3rem] p-12 md:p-20 text-center backdrop-blur-md relative">
                  <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#d1b06b]/10 rounded-[2.5rem] pointer-events-none" />
                  <h3 className="font-serif text-5xl italic mb-10 text-[#d1b06b]">Solo faltan...</h3>
                  <Countdown />
                  <div className="mt-16 flex justify-center">
                    <button className="flex items-center gap-3 px-8 py-3 bg-[#722f37] text-white rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#722f37] transition-all shadow-lg font-bold">
                      <Calendar size={14} /> Agendar Evento
                    </button>
                  </div>
               </div>
            </section>

            {/* INVITADOS PERSONALIZADOS */}
            <section className="py-24 text-center px-6 max-w-3xl mx-auto">
                <div className="bg-[#722f37] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold border border-[#d1b06b]/50 shadow-2xl">
                  {invitado?.pases || "?"}
                </div>
                <h3 className="uppercase tracking-[0.4em] text-[11px] font-bold text-[#d1b06b] mb-6">Invitados de Honor</h3>
                <p className="font-serif italic text-4xl md:text-6xl text-stone-100 whitespace-pre-line leading-tight">
                  {invitado?.nombre_completo?.replace(' y ', ' \n & \n ') || "Nuestra Familia"}
                </p>
            </section>

            {/* INFO GRID - ACENTOS VINO */}
            <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { icon: <MapPin />, title: "Ubicación", desc: "Luna Azul, Pococí", action: "Ver Mapa" },
                 { icon: <Clock />, title: "Hora", desc: "18:00 HRS", action: "Agendar" },
                 { icon: <Shirt />, title: "Dresscode", desc: "Formal - Guayabera", action: "Ver más" },
                 { icon: <Gift />, title: "Regalos", desc: "Lluvia de Sobres", action: "Ver más" }
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] text-center group hover:bg-[#722f37]/10 transition-all duration-500">
                    <div className="text-[#d1b06b] flex justify-center mb-6 group-hover:scale-110 transition-transform">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                    </div>
                    <h4 className="font-serif text-2xl italic mb-2 text-white">{item.title}</h4>
                    <p className="text-stone-400 text-sm mb-8 font-serif italic">{item.desc}</p>
                    <button className="text-[10px] uppercase tracking-widest text-[#d1b06b] border-b border-[#d1b06b]/30 pb-1 hover:text-white hover:border-white transition-all font-bold">
                       {item.action}
                    </button>
                 </div>
               ))}
            </section>

            {/* RSVP - VINO PROFUNDO */}
            <section className="max-w-lg mx-auto px-6 py-20">
               <div className="bg-[#05100a] p-12 rounded-[4rem] border border-[#722f37] shadow-[0_30px_60px_rgba(0,0,0,0.6)] text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#722f37]" />
                  <Heart className="mx-auto text-[#722f37] mb-8" fill="#722f37" size={40} />
                  <h3 className="font-serif text-5xl mb-4 italic text-[#d1b06b]">¿Nos acompañas?</h3>
                  <p className="text-stone-500 text-[9px] tracking-[0.4em] uppercase mb-12">Confirmar antes del 01.12</p>
                  
                  <div className="space-y-8">
                    <div className="py-6 border-y border-white/5 font-serif italic text-3xl text-stone-200">
                       {invitado?.nombre_completo || "Invitado Especial"}
                    </div>
                    
                    <button 
                      onClick={handleConfirmar}
                      disabled={cargando || confirmado || !invitado}
                      className={`w-full py-5 rounded-full font-bold tracking-[0.2em] text-[10px] uppercase transition-all ${
                        confirmado 
                        ? 'bg-green-900/40 text-green-400 border border-green-500/30' 
                        : 'bg-[#722f37] text-white hover:bg-[#d1b06b] hover:text-[#06140d] shadow-xl'
                      }`}
                    >
                      {cargando ? 'Enviando...' : confirmado ? '¡Confirmado!' : 'Confirmar Asistencia'}
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
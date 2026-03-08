"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Shirt, Gift, Heart, Volume2, Camera, ChevronDown, Calendar, CheckCircle2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spriycerzcurnhoznzzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6InNwcml5Y2VyemN1cm5ob3puenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDIwODcsImV4cCI6MjA4ODQ3ODA4N30.90778vaPGPxLdjmcvQFf7_xcnhqi_ukW9fJtG5BlkDc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- ELEMENTOS DECORATIVOS PREMIUM ---
const FloralDivider = () => (
  <div className="flex justify-center my-6 opacity-60">
    <svg width="240" height="44" viewBox="0 0 240 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M120 38C120 38 132 20 156 20C180 20 192 32 216 32M120 38C120 38 108 20 84 20C60 20 48 32 24 32" stroke="#722f37" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="120" cy="20" r="4" fill="#722f37"/>
      <path d="M110 10L120 20L130 10" stroke="#d1b06b" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ días: 0, hs: 0, min: 0, seg: 0 });

  useEffect(() => {
    const target = new Date("December 19, 2026 16:00:00").getTime();
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
    <div className="flex gap-4 md:gap-10 justify-center">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center group">
          <div className="text-[#722f37] text-5xl font-serif mb-1 transition-transform group-hover:scale-110 duration-500">{value}</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#8c6d31] font-bold">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default function InvitacionPremium() {
  const [paso, setPaso] = useState('landing'); 
  const [invitado, setInvitado] = useState<any>(null);
  const [confirmado, setConfirmado] = useState(false);
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

  const entrar = () => {
    setPaso('invitacion');
    if (audioRef.current) audioRef.current.play().catch(() => {});
  };

  return (
    <main className="min-h-screen bg-[#06140d] selection:bg-[#722f37]/50 overflow-x-hidden">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {paso === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0, scale: 1.1 }} className="h-screen flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-[#06140d] relative">
             <div className="absolute inset-0 bg-black/40" />
             <motion.div 
               initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
               className="relative z-10 text-center border-2 border-[#d1b06b]/20 p-16 rounded-[3rem] bg-[#06140d]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
             >
                <span className="text-[#d1b06b] tracking-[0.6em] text-[10px] uppercase mb-6 block">Bienvenido a la Boda de</span>
                <h1 className="font-cursive text-8xl text-[#d1b06b] mb-10 drop-shadow-lg">Carlos & Joselyn</h1>
                <button onClick={entrar} className="flex items-center gap-4 px-14 py-5 bg-[#722f37] text-white rounded-full mx-auto font-bold tracking-[0.2em] uppercase text-[11px] hover:bg-[#d1b06b] hover:text-[#06140d] transition-all shadow-2xl border border-white/10">
                  <Volume2 size={18} /> Entrar a la Invitación
                </button>
             </motion.div>
          </motion.div>
        )}

        {paso === 'invitacion' && (
          <motion.div key="invitacion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#e2c792] text-[#06140d] relative">
            {/* TEXTURA GLOBAL DORADA */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/gold-dust.png')]" />
            
            {/* HERO - IMPACTO VINTAGE */}
            <section className="relative h-[110vh] overflow-hidden">
               <div className="absolute inset-0 bg-[#06140d]">
                  <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622" className="w-full h-full object-cover opacity-40 scale-105" alt="Boda" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#e2c792]" />
               </div>
               
               <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5 }}>
                    <span className="text-[#d1b06b] tracking-[0.7em] text-xs uppercase mb-8 block font-black drop-shadow-md">Nuestra Historia Comienza</span>
                    <h2 className="font-serif text-[6rem] md:text-[11rem] leading-none mb-4 text-white drop-shadow-2xl">
                      Carlos <span className="text-[#d1b06b] italic">&</span> Joselyn
                    </h2>
                    <FloralDivider />
                    <p className="font-serif italic text-3xl text-stone-100 drop-shadow-md mt-6">19 de Diciembre · 2026</p>
                    <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="mt-24 text-[#d1b06b]/60 flex flex-col items-center gap-2">
                       <span className="text-[9px] uppercase tracking-[0.4em]">Desliza</span>
                       <ChevronDown size={32} />
                    </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* SECCIÓN CUENTA REGRESIVA - DISEÑO LUXE */}
            <section className="relative -mt-32 z-20 px-6 max-w-5xl mx-auto">
               <div className="bg-[#fcf8f1] p-16 rounded-[4rem] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-[#d1b06b]/40 text-center relative overflow-hidden">
                  <div className="absolute inset-4 border border-[#d1b06b]/10 rounded-[3.5rem] pointer-events-none" />
                  <h3 className="font-serif text-5xl italic mb-12 text-[#722f37]">Faltan muy pocos días</h3>
                  <Countdown />
               </div>
            </section>

            {/* UBICACIÓN Y CRONOGRAMA - TARJETAS CON FONDO DORADO OSCURO */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
               <div className="grid md:grid-cols-2 gap-10">
                  <div className="bg-[#d4b57a] p-14 rounded-[3.5rem] shadow-xl border border-white/20 text-center group hover:-translate-y-2 transition-all duration-700">
                     <div className="bg-[#722f37] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <MapPin className="text-white" size={36} />
                     </div>
                     <h4 className="font-serif text-4xl italic mb-4 text-[#06140d]">La Ceremonia</h4>
                     <p className="text-[#722f37] text-2xl font-serif mb-1">4:00 PM</p>
                     <p className="text-[#06140d]/60 italic mb-10 text-xl font-serif">Luna Azul, Pococí</p>
                     <a href="https://maps.app.goo.gl/YVPrqBwXVg5Cidzp9" target="_blank" className="inline-block px-12 py-4 bg-[#722f37] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#06140d] transition-all shadow-xl">
                        ¿Cómo llegar?
                     </a>
                  </div>

                  <div className="bg-[#d4b57a] p-14 rounded-[3.5rem] shadow-xl border border-white/20 text-center group hover:-translate-y-2 transition-all duration-700">
                     <div className="bg-[#06140d] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                        <Clock className="text-[#d1b06b]" size={36} />
                     </div>
                     <h4 className="font-serif text-4xl italic mb-4 text-[#06140d]">La Recepción</h4>
                     <p className="text-[#722f37] text-2xl font-serif mb-1">5:00 PM</p>
                     <p className="text-[#06140d]/60 italic mb-10 text-xl font-serif">En el mismo lugar</p>
                     <span className="text-[11px] text-[#06140d]/40 uppercase tracking-[0.4em] font-bold">¡Los esperamos!</span>
                  </div>
               </div>
            </section>

            {/* DRESSCODE - SECCIÓN VINO Y DORADO */}
            <section className="py-24 bg-[#722f37] text-white relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="grid grid-cols-4 h-full">
                     {[...Array(8)].map((_, i) => <div key={i} className="border-r border-white/20 h-full" />)}
                  </div>
               </div>
               <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                  <Shirt className="mx-auto text-[#d1b06b] mb-8" size={50} />
                  <h3 className="font-serif text-6xl italic mb-10 text-[#d1b06b]">Código de Vestimenta</h3>
                  <div className="bg-white/5 backdrop-blur-md p-14 rounded-[4rem] border border-white/10 shadow-inner">
                     <p className="text-4xl font-serif mb-4 italic text-white tracking-wide">Formal</p>
                     <p className="text-stone-300 text-xl font-serif italic mb-2">Caballeros: Guayabera o traje formal</p>
                     <p className="text-stone-300 text-xl font-serif italic">Damas: Vestido de gala</p>
                  </div>
               </div>
            </section>

            {/* REGALOS - ESTILO VINTAGE MINIMAL */}
            <section className="py-32 px-6 text-center">
               <div className="max-w-4xl mx-auto bg-[#fcf8f1]/50 p-20 rounded-[5rem] border-2 border-dashed border-[#d1b06b]/30 relative">
                  <Gift className="mx-auto text-[#722f37] mb-8" size={60} />
                  <h3 className="font-serif text-5xl italic mb-8 text-[#06140d]">Lluvia de Sobres</h3>
                  <p className="text-[#722f37]/80 font-serif italic text-2xl leading-relaxed max-w-2xl mx-auto">
                    "Vuestra presencia es nuestro mejor regalo, pero si deseáis tener un detalle, contaremos con una lluvia de sobres el día del evento."
                  </p>
               </div>
            </section>

            {/* RSVP - CIERRE EN DORADO OSCURO */}
            <section className="py-40 bg-[#d4b57a]/30 px-6">
               <div className="max-w-xl mx-auto bg-[#fcf8f1] p-16 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border-t-[12px] border-[#722f37] text-center relative">
                  <Heart className="mx-auto text-[#722f37] mb-10" fill="#722f37" size={44} />
                  <h3 className="font-serif text-6xl italic mb-6 text-[#06140d]">¿Nos acompañas?</h3>
                  <p className="text-[#8c6d31] text-[10px] tracking-[0.5em] uppercase font-bold mb-14">Confirmar antes del 1 de Diciembre</p>
                  
                  <div className="space-y-10">
                    <div className="py-8 border-y border-[#d1b06b]/20 font-serif italic text-4xl text-[#722f37]">
                       {invitado?.nombre_completo || "Familia y Amigos"}
                    </div>
                    
                    <button 
                      onClick={() => setConfirmado(true)}
                      className={`w-full py-6 rounded-full font-bold tracking-[0.3em] text-[12px] uppercase transition-all shadow-2xl ${
                        confirmado 
                        ? 'bg-green-700 text-white cursor-default' 
                        : 'bg-[#722f37] text-white hover:bg-[#06140d] active:scale-95'
                      }`}
                    >
                      {confirmado ? 'Asistencia Confirmada' : 'Confirmar mi Asistencia'}
                    </button>
                  </div>
               </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 text-center text-[#8c6d31] font-serif italic text-lg border-t border-[#d1b06b]/20">
               Hecho con amor · Carlos & Joselyn 2026
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
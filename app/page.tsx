"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Shirt, Gift, Heart, Volume2, Camera, ChevronDown, Calendar, CheckCircle2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spriycerzcurnhoznzzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcml5Y2VyemN1cm5ob3puenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDIwODcsImV4cCI6MjA4ODQ3ODA4N30.90778vaPGPxLdjmcvQFf7_xcnhqi_ukW9fJtG5BlkDc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- COMPONENTES DE DECORACIÓN (SVG) ---
const FloralDivider = () => (
  <div className="flex justify-center my-6 opacity-40">
    <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 35C100 35 110 20 130 20C150 20 160 30 180 30M100 35C100 35 90 20 70 20C50 20 40 30 20 30" stroke="#d1b06b" strokeWidth="1"/>
      <circle cx="100" cy="20" r="3" fill="#d1b06b"/>
    </svg>
  </div>
);

const WaveDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
    <svg className="relative block w-full h-[60px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120c6.4,0,12.79,0,19.19,0C158.59,120,223.43,83.43,321.39,56.44Z" fill="#f7f5f0"></path>
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
    <div className="flex gap-4 md:gap-8 justify-center">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="text-[#722f37] text-4xl font-serif">{value}</div>
          <div className="text-[9px] uppercase tracking-widest text-[#d1b06b] font-bold">{label}</div>
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
    <main className="min-h-screen bg-[#06140d] selection:bg-[#722f37]/50">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {paso === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0 }} className="h-screen flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-[#06140d]">
             <div className="absolute inset-0 bg-[#06140d]/60" />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
               className="relative z-10 text-center border border-[#d1b06b]/30 p-12 rounded-[2rem] bg-[#06140d]/80 backdrop-blur-md shadow-2xl"
             >
                <h1 className="font-cursive text-7xl text-[#d1b06b] mb-8">Carlos & Joselyn</h1>
                <button onClick={entrar} className="flex items-center gap-3 px-10 py-4 bg-[#722f37] text-white rounded-full mx-auto font-bold tracking-widest uppercase text-xs hover:bg-[#d1b06b] hover:text-[#06140d] transition-all">
                  <Volume2 size={16} /> Abrir Invitación
                </button>
             </motion.div>
          </motion.div>
        )}

        {paso === 'invitacion' && (
          <motion.div key="invitacion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#f7f5f0] text-[#06140d] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]">
            
            {/* HERO SECTION - TIPO PORTADA DE REVISTA */}
            <section className="relative h-[110vh] overflow-hidden">
               <div className="absolute inset-0 bg-[#06140d]">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552" className="w-full h-full object-cover opacity-50" alt="Boda" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f7f5f0]" />
               </div>
               
               <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                  <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                    <span className="text-[#d1b06b] tracking-[0.5em] text-xs uppercase mb-6 block font-bold">Reserva la Fecha</span>
                    <h2 className="font-serif text-[5rem] md:text-[10rem] leading-none mb-4 text-white drop-shadow-2xl">
                      Carlos <span className="text-[#d1b06b] italic">&</span> Joselyn
                    </h2>
                    <FloralDivider />
                    <p className="font-serif italic text-2xl text-stone-200 drop-shadow-md">19 de Diciembre de 2026</p>
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-20 text-white/50">
                       <ChevronDown size={40} className="mx-auto" />
                    </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* SECCIÓN CUENTA REGRESIVA - EFECTO PAPEL APILADO */}
            <section className="relative -mt-20 z-20 px-6 max-w-4xl mx-auto">
               <div className="bg-white p-12 rounded-3xl shadow-2xl border-t-4 border-[#722f37] text-center">
                  <h3 className="font-serif text-4xl italic mb-8 text-[#06140d]">Estamos contando los días...</h3>
                  <Countdown />
                  <div className="mt-10 pt-8 border-t border-stone-100">
                    <button className="px-8 py-3 bg-[#d1b06b]/10 text-[#d1b06b] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#d1b06b]/20 hover:bg-[#d1b06b] hover:text-white transition-all">
                      <Calendar className="inline mr-2" size={14} /> Agendar Evento
                    </button>
                  </div>
               </div>
            </section>

            {/* CRONOGRAMA - TARJETAS FLOTANTES */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
               <div className="text-center mb-16">
                  <h3 className="font-serif text-5xl italic text-[#722f37]">¿Dónde y Cuándo?</h3>
                  <div className="w-12 h-1 bg-[#d1b06b] mx-auto mt-4" />
               </div>
               
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-10 rounded-[2rem] shadow-xl border-b-8 border-[#722f37]/20 hover:border-[#722f37] transition-all group">
                     <MapPin className="text-[#d1b06b] mb-6 group-hover:scale-110 transition-transform" size={40} />
                     <h4 className="font-serif text-3xl italic mb-4">La Ceremonia</h4>
                     <p className="text-stone-500 mb-2 uppercase tracking-widest text-xs font-bold">Sábado 19 de Diciembre</p>
                     <p className="text-[#722f37] text-2xl font-serif mb-6">4:00 PM</p>
                     <p className="text-stone-400 italic mb-8 text-lg">Luna Azul, Pococí</p>
                     <a href="https://maps.app.goo.gl/YVPrqBwXVg5Cidzp9" target="_blank" className="inline-block px-8 py-3 bg-[#06140d] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#722f37] transition-colors">Ver Mapa</a>
                  </div>

                  <div className="bg-white p-10 rounded-[2rem] shadow-xl border-b-8 border-[#d1b06b]/20 hover:border-[#d1b06b] transition-all group">
                     <Clock className="text-[#722f37] mb-6 group-hover:scale-110 transition-transform" size={40} />
                     <h4 className="font-serif text-3xl italic mb-4">La Recepción</h4>
                     <p className="text-stone-500 mb-2 uppercase tracking-widest text-xs font-bold">Inmediatamente después</p>
                     <p className="text-[#d1b06b] text-2xl font-serif mb-6">5:00 PM</p>
                     <p className="text-stone-400 italic mb-8 text-lg">En el mismo lugar</p>
                     <span className="text-[10px] text-stone-300 uppercase tracking-widest">¡A celebrar con los novios!</span>
                  </div>
               </div>
            </section>

            {/* DRESSCODE - DISEÑO MINIMALISTA */}
            <section className="py-20 bg-[#06140d] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none text-[#d1b06b]">
                  <Shirt size={200} />
               </div>
               <div className="max-w-4xl mx-auto px-6 text-center">
                  <h3 className="font-serif text-5xl italic mb-8 text-[#d1b06b]">Código de Vestimenta</h3>
                  <div className="border-2 border-dashed border-[#d1b06b]/30 p-12 rounded-[3rem]">
                     <p className="text-3xl font-serif mb-4 italic">Formal</p>
                     <p className="text-stone-400 max-w-md mx-auto italic">Caballeros: Guayabera o traje formal.</p>
                     <p className="text-stone-400 max-w-md mx-auto italic">Damas: Vestido de gala.</p>
                  </div>
               </div>
            </section>

            {/* SECCIÓN REGALOS (LLUVIA DE SOBRES) */}
            <section className="py-32 px-6 text-center">
               <div className="max-w-3xl mx-auto bg-white p-16 rounded-[4rem] shadow-inner border border-stone-100">
                  <Gift className="mx-auto text-[#722f37] mb-8" size={50} />
                  <h3 className="font-serif text-4xl italic mb-6">Lluvia de Sobres</h3>
                  <p className="text-stone-500 font-serif italic text-xl leading-relaxed mb-8 px-4">
                    "Vuestra presencia es nuestro mejor regalo, pero si deseáis tener un detalle con nosotros, contaremos con una lluvia de sobres el día del evento."
                  </p>
                  <div className="h-[1px] w-32 bg-[#d1b06b] mx-auto opacity-30" />
               </div>
            </section>

            {/* RSVP - CIERRE PREMIUM */}
            <WaveDivider />
            <section className="py-32 bg-[#f7f5f0] px-6">
               <div className="max-w-lg mx-auto bg-white p-12 rounded-[3.5rem] shadow-2xl border-t-8 border-[#722f37] text-center">
                  <Heart className="mx-auto text-[#722f37] mb-6" fill="#722f37" size={32} />
                  <h3 className="font-serif text-5xl italic mb-10 text-[#06140d]">¿Nos acompañas?</h3>
                  
                  <div className="space-y-8">
                    <div className="py-6 border-b border-stone-100 font-serif italic text-4xl text-[#722f37]">
                       {invitado?.nombre_completo || "Familia y Amigos"}
                    </div>
                    
                    <button 
                      onClick={() => setConfirmado(true)}
                      className={`w-full py-5 rounded-full font-bold tracking-[0.2em] text-[10px] uppercase transition-all shadow-xl ${
                        confirmado 
                        ? 'bg-green-600 text-white cursor-default' 
                        : 'bg-[#722f37] text-white hover:bg-[#06140d]'
                      }`}
                    >
                      {confirmado ? '¡Confirmado!' : 'Confirmar Asistencia'}
                    </button>
                    <p className="text-[10px] text-stone-400 italic uppercase tracking-widest">Confirmar antes del 1 de Diciembre</p>
                  </div>
               </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
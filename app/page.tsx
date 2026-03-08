"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Shirt, Gift, Heart, Volume2, ChevronDown, CheckCircle2, Users } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://spriycerzcurnhoznzzr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6InNwcml5Y2VyemN1cm5ob3puenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDIwODcsImV4cCI6MjA4ODQ3ODA4N30.90778vaPGPxLdjmcvQFf7_xcnhqi_ukW9fJtG5BlkDc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- ELEMENTOS DECORATIVOS ---

const CornerDecoration = ({ className = "" }: { className?: string }) => (
  <div className={`absolute w-12 h-12 pointer-events-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 2C60 2 2 60 2 100M2 100V70M2 100H32" stroke="#d1b06b" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 2C50 2 2 50 2 80" stroke="#722f37" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  </div>
);

const FloralDivider = () => (
  <div className="flex justify-center my-6 opacity-70">
    <svg width="280" height="50" viewBox="0 0 280 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M140 45C140 45 155 10 190 10C225 10 240 30 270 30M140 45C140 45 125 10 90 10C55 10 40 30 10 30" stroke="#722f37" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="140" cy="15" r="5" fill="#722f37"/>
      <path d="M130 5L140 15L150 5" stroke="#d1b06b" strokeWidth="2" strokeLinecap="round"/>
      <path d="M100 40Q140 35 180 40" stroke="#d1b06b" strokeWidth="0.5" strokeDasharray="2 4"/>
    </svg>
  </div>
);

const WaveEdge = ({ color = "#e2c792", flip = false }: { color?: string, flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ marginBottom: flip ? '0' : '-1px', marginTop: flip ? '-1px' : '0' }}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px]">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,41.41V0Z" fill={color} opacity="1"></path>
    </svg>
  </div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ días: 0, hs: 0, min: 0, seg: 0 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    console.log("ID detectado en URL:", id); // Para ver si el ID está llegando

    if (id) {
      supabase
        .from('invitados')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error("Error de Supabase:", error.message);
            return;
          }
          if (data) {
            console.log("Datos del invitado cargados:", data);
            setInvitado(data);
            if (data.confirmado) setConfirmado(true);
          }
        });
    }
  }, []);

  return (
    <div className="flex gap-4 md:gap-10 justify-center relative">
      <div className="absolute -top-6 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d1b06b]/40 to-transparent" />
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="text-center group">
          <div className="text-[#722f37] text-5xl font-serif mb-1 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm">{value}</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#8c6d31] font-bold">{label}</div>
        </div>
      ))}
      <div className="absolute -bottom-6 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d1b06b]/40 to-transparent" />
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
        if (data) {
          setInvitado(data);
          if (data.confirmado) setConfirmado(true);
        }
      });
    }
  }, []);

  const confirmarAsistencia = async () => {
    if (!invitado) return;
    const { error } = await supabase
      .from('invitados')
      .update({ confirmado: true })
      .eq('id', invitado.id);
    
    if (!error) setConfirmado(true);
  };

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
                <CornerDecoration className="top-4 left-4" />
                <CornerDecoration className="bottom-4 right-4 rotate-180" />
                <span className="text-[#d1b06b] tracking-[0.6em] text-[10px] uppercase mb-6 block">Bienvenido a la Boda de</span>
                <h1 className="font-cursive text-8xl text-[#d1b06b] mb-10 drop-shadow-lg">Carlos & Joselyn</h1>
                <button onClick={entrar} className="flex items-center gap-4 px-14 py-5 bg-[#722f37] text-white rounded-full mx-auto font-bold tracking-[0.2em] uppercase text-[11px] hover:bg-[#d1b06b] hover:text-[#06140d] transition-all shadow-2xl border border-white/10 relative overflow-hidden group">
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                  <Volume2 size={18} className="relative z-10" /> <span className="relative z-10">Entrar a la Invitación</span>
                </button>
             </motion.div>
          </motion.div>
        )}

        {paso === 'invitacion' && (
          <motion.div key="invitacion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#e2c792] text-[#06140d] relative">
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/gold-dust.png')]" />
            
            {/* HERO */}
            <section className="relative h-[110vh] overflow-hidden">
               <div className="absolute inset-0 bg-[#06140d]">
                  <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622" className="w-full h-full object-cover opacity-40 scale-105" alt="Boda" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#e2c792]" />
               </div>
               
               <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5 }}>
                    <div className="mb-6 flex items-center justify-center gap-4">
                       <div className="h-[1px] w-12 bg-[#d1b06b]" />
                       <span className="text-[#d1b06b] tracking-[0.7em] text-xs uppercase font-black drop-shadow-md">Nuestra Historia</span>
                       <div className="h-[1px] w-12 bg-[#d1b06b]" />
                    </div>
                    <h2 className="font-serif text-[6rem] md:text-[11rem] leading-none mb-4 text-white drop-shadow-2xl">
                      Carlos <span className="text-[#d1b06b] italic">&</span> Joselyn
                    </h2>
                    <FloralDivider />
                    <p className="font-serif italic text-3xl text-stone-100 drop-shadow-md mt-6">19 de Diciembre · 2026</p>
                    <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="mt-24 text-[#d1b06b]/60 flex flex-col items-center gap-2">
                       <ChevronDown size={32} />
                    </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* COUNTDOWN CON MARCO DOBLE */}
            <section className="relative -mt-32 z-20 px-6 max-w-5xl mx-auto">
               <div className="bg-[#fcf8f1] p-16 rounded-[4rem] shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-[#d1b06b]/40 text-center relative overflow-hidden">
                  <div className="absolute inset-4 border border-[#d1b06b]/10 rounded-[3.5rem] pointer-events-none" />
                  <div className="absolute inset-2 border-2 border-[#722f37]/5 rounded-[3.8rem] pointer-events-none" />
                  <h3 className="font-serif text-5xl italic mb-12 text-[#722f37]">Faltan muy pocos días</h3>
                  <Countdown />
               </div>
            </section>

            {/* CRONOGRAMA */}
            <section className="py-32 px-6 max-w-7xl mx-auto relative">
               <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-[1px] bg-[#722f37]/20 z-0" />
               <div className="grid md:grid-cols-2 gap-10 relative z-10">
                  <div className="bg-[#d4b57a] p-14 rounded-[3.5rem] shadow-xl border-t border-l border-white/40 text-center group relative overflow-hidden transition-all duration-700 hover:shadow-2xl">
                     <CornerDecoration className="top-4 right-4 rotate-90 opacity-40" />
                     <div className="bg-[#722f37] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative z-10">
                        <MapPin className="text-white" size={36} />
                     </div>
                     <h4 className="font-serif text-4xl italic mb-4 text-[#06140d]">La Ceremonia</h4>
                     <div className="h-[2px] w-12 bg-[#722f37]/30 mx-auto mb-4" />
                     <p className="text-[#722f37] text-2xl font-serif mb-1 uppercase tracking-tight">4:00 PM</p>
                     <p className="text-[#06140d]/70 italic mb-10 text-xl font-serif">Luna Azul, Pococí</p>
                     <a href="https://maps.google.com" target="_blank" className="relative z-10 inline-block px-12 py-4 bg-[#722f37] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#06140d] transition-all shadow-xl">
                        Ver Ubicación
                     </a>
                  </div>

                  <div className="bg-[#d4b57a] p-14 rounded-[3.5rem] shadow-xl border-t border-l border-white/40 text-center group relative overflow-hidden transition-all duration-700 hover:shadow-2xl">
                     <CornerDecoration className="bottom-4 left-4 -rotate-90 opacity-40" />
                     <div className="bg-[#06140d] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative z-10">
                        <Clock className="text-[#d1b06b]" size={36} />
                     </div>
                     <h4 className="font-serif text-4xl italic mb-4 text-[#06140d]">La Recepción</h4>
                     <div className="h-[2px] w-12 bg-[#06140d]/30 mx-auto mb-4" />
                     <p className="text-[#722f37] text-2xl font-serif mb-1 uppercase tracking-tight">5:00 PM</p>
                     <p className="text-[#06140d]/70 italic mb-10 text-xl font-serif">En el mismo lugar</p>
                     <span className="text-[11px] text-[#06140d]/50 uppercase tracking-[0.4em] font-bold">Protocolo & Fiesta</span>
                  </div>
               </div>
            </section>

            {/* DRESSCODE */}
            <WaveEdge color="#722f37" />
            <section className="py-24 bg-[#722f37] text-white relative">
               <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                  <h3 className="font-serif text-6xl italic mb-10 text-[#d1b06b]">Código de Vestimenta</h3>
                  <div className="relative p-14 rounded-[4rem] border-2 border-[#d1b06b]/20 overflow-hidden">
                     <p className="text-4xl font-serif mb-4 italic text-white tracking-wide">Formal</p>
                     <p className="text-stone-300 text-xl font-serif italic mb-4">Caballeros: Guayabera o traje formal</p>
                     <div className="w-8 h-[1px] bg-[#d1b06b]/50 mx-auto mb-4" />
                     <p className="text-stone-300 text-xl font-serif italic">Damas: Vestido de gala</p>
                  </div>
               </div>
            </section>
            <WaveEdge color="#722f37" flip />

            {/* REGALOS */}
            <section className="py-32 px-6 text-center">
               <div className="max-w-4xl mx-auto bg-[#fcf8f1]/50 p-20 rounded-[5rem] border-2 border-dashed border-[#d1b06b]/40 relative group shadow-sm">
                  <Gift className="mx-auto text-[#722f37] mb-8" size={60} />
                  <h3 className="font-serif text-5xl italic mb-8 text-[#06140d]">Lluvia de Sobres</h3>
                  <p className="text-[#722f37]/80 font-serif italic text-2xl leading-relaxed max-w-2xl mx-auto">
                    "Vuestra presencia es nuestro mejor regalo, pero si deseáis tener un detalle, contaremos con una lluvia de sobres el día del evento."
                  </p>
               </div>
            </section>

            {/* RSVP - PERSONALIZADO (NOMBRES ARRIBA) */}
            <section className="py-40 bg-[#d4b57a]/30 px-6 relative">
               <div className="max-w-2xl mx-auto bg-[#fcf8f1] p-12 md:p-20 rounded-[4rem] shadow-2xl border-t-[12px] border-[#722f37] text-center relative overflow-hidden">
                  <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#d1b06b]/10 rounded-[3.5rem] pointer-events-none" />
                  
                  {/* Encabezado de la invitación personalizada */}
                  <motion.div 
                     initial={{ y: 20, opacity: 0 }} 
                     whileInView={{ y: 0, opacity: 1 }}
                     className="mb-12"
                  >
                     <Heart className="mx-auto text-[#722f37] mb-6" fill="#722f37" size={32} />
                     <span className="text-[#8c6d31] text-[10px] tracking-[0.5em] uppercase font-bold mb-6 block">Invitado(s) Especial(es)</span>
                     
                     <div className="relative inline-block px-8 py-4">
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#d1b06b]/40" />
                        <h2 className="font-serif italic text-5xl md:text-7xl text-[#06140d] leading-tight">
                           {invitado?.nombre_completo || "Familia y Amigos"}
                        </h2>
                        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-[#d1b06b]/40" />
                     </div>

                     <div className="mt-8 flex items-center justify-center gap-4">
                        <div className="h-[1px] w-8 bg-[#d1b06b]/30" />
                        <div className="flex items-center gap-2 text-[#722f37]">
                           <Users size={18} />
                           <span className="font-serif italic text-2xl">
                              {invitado?.pases || 0} {invitado?.pases === 1 ? 'Pase Personal' : 'Lugares Reservados'}
                           </span>
                        </div>
                        <div className="h-[1px] w-8 bg-[#d1b06b]/30" />
                     </div>
                  </motion.div>

                  <FloralDivider />

                  <div className="mt-12">
                     <h3 className="font-serif text-4xl italic mb-3 text-[#06140d]">¿Nos acompañas?</h3>
                     <p className="text-[#8c6d31] text-[9px] tracking-[0.4em] uppercase font-bold mb-12">Por favor confirma antes del 1 de Diciembre</p>
                     
                     <button 
                       onClick={confirmarAsistencia}
                       disabled={confirmado}
                       className={`w-full py-6 rounded-full font-bold tracking-[0.3em] text-[11px] uppercase transition-all shadow-xl relative overflow-hidden group ${
                         confirmado 
                         ? 'bg-green-700 text-white cursor-default' 
                         : 'bg-[#722f37] text-white hover:bg-[#06140d] active:scale-95'
                       }`}
                     >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                           {confirmado && <CheckCircle2 size={18} />}
                           {confirmado ? 'Asistencia Confirmada' : 'Confirmar mi Asistencia'}
                        </span>
                     </button>
                  </div>
               </div>
            </section>

            {/* FOOTER */}
            <footer className="py-16 text-center relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#d1b06b]/40 to-transparent" />
               <p className="text-[#8c6d31] font-serif italic text-xl mb-2">Hecho con amor</p>
               <p className="text-[#722f37] font-serif font-bold tracking-widest text-sm uppercase">Carlos & Joselyn 2026</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
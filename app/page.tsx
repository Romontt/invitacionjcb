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
          <div className="text-[9px] uppercase tracking-[0.3em] text-stone-400 group-hover:text-[#d1b06b] transition-colors">
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
      alert("¡Gracias por confirmar! Te esperamos.");
    }
    setCargando(false);
  };

  return (
    <main className="min-h-screen bg-[#06140d] text-[#f7f5f0] selection:bg-[#d1b06b]/30 overflow-x-hidden">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {paso === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0, scale: 1.1 }} className="h-screen flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] text-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/40" />
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              className="relative z-10 space-y-10 border border-[#d1b06b]/20 p-16 rounded-[2rem] bg-[#06140d]/60 backdrop-blur-xl shadow-2xl"
            >
              <div className="space-y-2">
                <span className="text-[#d1b06b] tracking-[0.5em] text-[10px] uppercase block mb-4">Estás invitado a</span>
                <h1 className="font-cursive text-7xl md:text-8xl text-[#d1b06b]">Carlos & Joselyn</h1>
              </div>
              <button onClick={() => entrar(true)} className="flex items-center gap-4 px-12 py-5 bg-[#d1b06b] text-[#06140d] rounded-full mx-auto font-bold tracking-[0.2em] uppercase text-xs hover:bg-white hover:scale-105 transition-all shadow-lg shadow-[#d1b06b]/20">
                <Volume2 size={18} /> Abrir Experiencia
              </button>
            </motion.div>
          </motion.div>
        )}

        {paso === 'invitacion' && (
          <motion.div key="invitacion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-32">
            
            {/* HERO VINTAGE MEJORADO */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
               <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-40 scale-105" alt="Boda" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#06140d]" />
               </div>

               <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.5 }} className="relative z-10">
                  <span className="text-[#d1b06b] tracking-[0.6em] text-[11px] uppercase mb-8 block">19 de Diciembre · 2026</span>
                  <h2 className="font-serif text-7xl md:text-[11rem] mb-6 font-light leading-none">
                    Carlos <span className="text-[#d1b06b] italic block md:inline md:mx-4">&</span> Joselyn
                  </h2>
                  <div className="w-24 h-[1px] bg-[#d1b06b]/50 mx-auto my-10" />
                  <p className="font-serif italic text-stone-200 text-xl md:text-3xl max-w-2xl mx-auto leading-relaxed px-4 drop-shadow-lg">
                    "Donde hay amor, hay vida."
                  </p>
                  <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="mt-20 text-[#d1b06b]/40 flex flex-col items-center gap-2">
                     <span className="text-[9px] tracking-[0.3em] uppercase">Desliza</span>
                     <ChevronDown size={28} />
                  </motion.div>
               </motion.div>
            </section>

            {/* SECCIÓN CUENTA REGRESIVA ESTILO CARD */}
            <section className="py-32 px-6 relative flex justify-center">
               <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-[3rem] p-16 text-center backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#d1b06b]/5 rounded-full blur-3xl" />
                  <h3 className="font-serif text-5xl italic mb-10 text-[#d1b06b]">Solo faltan...</h3>
                  <Countdown />
                  <div className="mt-16 flex justify-center">
                    <button className="flex items-center gap-3 px-8 py-3 border border-[#d1b06b]/30 text-[#d1b06b] rounded-full text-[10px] uppercase tracking-widest hover:bg-[#d1b06b] hover:text-[#06140d] transition-all">
                      <Calendar size={14} /> Agendar en mi calendario
                    </button>
                  </div>
               </div>
            </section>

            {/* INVITADOS PERSONALIZADOS - DISEÑO FIXDATE */}
            <section className="py-24 text-center px-6 max-w-3xl mx-auto">
                <motion.div whileInView={{ opacity: [0, 1], y: [20, 0] }}>
                  <div className="bg-[#d1b06b] text-[#06140d] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold shadow-[0_0_30px_rgba(209,176,107,0.3)]">
                    {invitado?.pases || "?"}
                  </div>
                  <h3 className="uppercase tracking-[0.4em] text-[12px] font-bold text-[#d1b06b] mb-6">Pases reservados para</h3>
                  <p className="font-serif italic text-4xl md:text-6xl text-stone-100 whitespace-pre-line leading-[1.1] mb-10">
                    {invitado?.nombre_completo?.replace(' y ', ' \n & \n ') || "Familia y Amigos"}
                  </p>
                  <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-[#d1b06b]/40 to-transparent mx-auto" />
                </motion.div>
            </section>

            {/* GALERÍA VINTAGE */}
            <section className="py-32">
               <div className="text-center mb-20 px-6">
                  <Camera className="mx-auto text-[#d1b06b] mb-6 opacity-40" size={32} />
                  <h3 className="font-serif text-6xl italic mb-4">Nuestra Historia</h3>
                  <p className="text-stone-500 tracking-widest text-xs uppercase">Capturando momentos eternos</p>
               </div>
               <div className="flex gap-8 overflow-x-auto px-8 no-scrollbar snap-x snap-mandatory">
                  {[1, 2, 3, 4].map(i => (
                    <motion.div 
                      key={i} 
                      whileHover={{ rotate: 0, scale: 1.02 }}
                      className="min-w-[300px] md:min-w-[420px] aspect-[4/5] bg-stone-900 rounded-2xl snap-center overflow-hidden border-[12px] border-white shadow-2xl relative rotate-2 transition-all duration-500"
                    >
                       <div className="absolute inset-0 bg-stone-800 flex items-center justify-center text-stone-600 font-serif italic">Tu Foto Aquí</div>
                       <div className="absolute bottom-4 right-4 text-black/20 font-serif italic text-sm">#Carlos&Joselyn</div>
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* UBICACIÓN - DISEÑO FIXDATE */}
            <section className="max-w-5xl mx-auto px-6 py-24">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] text-center hover:border-[#d1b06b]/50 transition-colors">
                     <MapPin className="mx-auto text-[#d1b06b] mb-6" size={32} />
                     <h4 className="font-serif text-4xl italic mb-4">Ubicación</h4>
                     <p className="text-stone-400 text-lg mb-8 font-serif">Luna Azul, Rita de Pococí, Limón.</p>
                     <a 
                        href="https://maps.google.com" target="_blank"
                        className="inline-block px-10 py-4 bg-[#d1b06b] text-[#06140d] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                     >
                        Ver en el Mapa
                     </a>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] text-center hover:border-[#d1b06b]/50 transition-colors">
                     <Shirt className="mx-auto text-[#d1b06b] mb-6" size={32} />
                     <h4 className="font-serif text-4xl italic mb-4">Código de Vestimenta</h4>
                     <p className="text-[#d1b06b] font-bold tracking-[0.2em] text-xs uppercase mb-2">Formal - Guayabera</p>
                     <p className="text-stone-400 font-serif italic">Nos encantaría verte lucir tus mejores galas.</p>
                  </div>
               </div>
            </section>

            {/* SECCIÓN REGALOS */}
            <section className="max-w-4xl mx-auto px-6 py-20">
               <div className="text-center p-16 border-2 border-dashed border-[#d1b06b]/20 rounded-[4rem] relative overflow-hidden">
                  <Gift className="mx-auto text-[#d1b06b] mb-8" size={40} />
                  <h3 className="font-serif text-5xl mb-6 italic">Lluvia de Sobres</h3>
                  <p className="text-stone-400 font-serif italic text-xl leading-relaxed max-w-lg mx-auto mb-10">
                    "Vuestra presencia es nuestro mejor regalo, pero si deseáis tener un detalle con nosotros, contaremos con una lluvia de sobres el día del evento."
                  </p>
                  <div className="w-12 h-[1px] bg-[#d1b06b]/30 mx-auto" />
               </div>
            </section>

            {/* RSVP - CONFIRMACIÓN INTERACTIVA */}
            <section className="max-w-lg mx-auto px-6 py-32">
               <div className="bg-[#05100a] p-12 rounded-[3.5rem] border border-[#d1b06b]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative">
                  {confirmado && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-6 -right-6 bg-green-500 text-white p-4 rounded-full shadow-xl">
                      <CheckCircle2 size={32} />
                    </motion.div>
                  )}
                  <Heart className="mx-auto text-[#d1b06b] mb-8" fill="#d1b06b" size={32} />
                  <h3 className="font-serif text-5xl mb-4 italic">¿Nos acompañas?</h3>
                  <p className="text-stone-500 text-[10px] tracking-[0.3em] uppercase mb-12">Confirmar antes del 1 de Diciembre</p>
                  
                  <div className="space-y-8">
                    <div className="py-6 border-b border-white/10 font-serif italic text-3xl text-stone-200">
                       {invitado?.nombre_completo || "Invitado Especial"}
                    </div>
                    
                    <button 
                      onClick={handleConfirmar}
                      disabled={cargando || confirmado || !invitado}
                      className={`w-full py-5 rounded-2xl font-bold tracking-[0.2em] text-[11px] uppercase transition-all shadow-xl ${
                        confirmado 
                        ? 'bg-green-600/20 text-green-400 border border-green-600/50 cursor-default' 
                        : 'bg-[#d1b06b] text-[#06140d] hover:bg-white active:scale-95 shadow-[#d1b06b]/10'
                      }`}
                    >
                      {cargando ? 'Procesando...' : confirmado ? 'Asistencia Confirmada' : 'Confirmar mi Asistencia'}
                    </button>
                    {!invitado && <p className="text-[10px] text-red-400/60 italic uppercase tracking-widest">Enlace de invitado no detectado</p>}
                  </div>
               </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
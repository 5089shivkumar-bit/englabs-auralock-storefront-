"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Target, Lock, ArrowDown, Award, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const team = [
    { name: "Vikram R.", role: "Chief Visionary Officer", bio: "Former defense architect specializing in biometric encryption protocols." },
    { name: "Ananya S.", role: "Head of Industrial Design", bio: "Bridging the gap between brutalist security and minimalist aesthetics." },
    { name: "Marcus Chen", role: "Lead Systems Engineer", bio: "Leading the transition from traditional mechanical locking to autonomous AI access." }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-orange-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[500] px-6 py-6 md:px-12 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(234,88,12,0.5)]">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">Aura<span className="text-orange-600">Lock</span></span>
        </Link>
        <Link href="/" className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
          Return To Ecosystem
        </Link>
      </nav>

      <main className="pt-32 pb-24">
        
        {/* Phase 2: The Conflict (Hero) */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[10px] font-black tracking-widest uppercase mb-8">
              The Security Crisis
            </div>
            <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.9] uppercase italic mb-12">
              Keys are <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">Dead Concepts.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
              In a world of instant connectivity, your physical security is still trapped in the 19th century. 
              Traditional keys are lost, duplicated, and easily compromised. It's time for the mechanical era to end.
            </p>
          </motion.div>
        </section>

        {/* Documentary Video Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
           <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-gray-900 group">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s]"
              >
                <source src="https://www.shutterstock.com/shutterstock/videos/1075654514/preview/stock-footage-modern-automated-assembly-line-factory-industrial-robotic-arm-working-on-a-production-line-at.webm" type="video/webm" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 z-10">
                 <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-4">Live Footage</p>
                 <h2 className="text-3xl font-black italic tracking-tighter uppercase uppercase">Precision Fabrication <br/>at ENG-LABS Delhi</h2>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white animate-pulse" />
                 </div>
              </div>
           </div>
        </section>

        {/* The Human Connection (Team) */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-500 text-[10px] font-black tracking-widest uppercase mb-6">
                The Architects
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[1.1]">
                Human Intelligence Behind <span className="text-orange-600">Autonomous Defense.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group p-10 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] hover:border-orange-600/50 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-8 group-hover:bg-orange-600/20 group-hover:text-orange-500 transition-colors">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">{member.name}</h3>
                <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-6">{member.role}</p>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust Signals (Certifications) */}
        <section className="bg-white/5 border-y border-white/5 py-24 mb-32">
          <div className="max-w-7xl mx-auto px-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
                <div className="flex flex-col items-center gap-4">
                   <Award className="w-12 h-12 text-orange-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">ISO 27001 Certified</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                   <Shield className="w-12 h-12 text-cyan-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">FIPS 140-2 Grade Hardware</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                   <Globe className="w-12 h-12 text-blue-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">GDPR Compliant Data</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                   <Target className="w-12 h-12 text-red-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest">MIL-SPEC Resilience</span>
                </div>
             </div>
          </div>
        </section>

        {/* The Beliefs (Manifesto) */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-32">
           <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-orange-600 to-transparent mx-auto mb-16" />
           <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12">The AuraLock <span className="text-orange-600">Manifesto.</span></h2>
           <div className="space-y-12 text-xl md:text-2xl font-medium text-gray-300 leading-relaxed italic">
              <p>"We believe that security should be felt, but never managed."</p>
              <p>"We believe that biometrics are more than data; they are the ultimate physical signature."</p>
              <p>"We believe that the future belongs to those who eliminate the friction of entry."</p>
           </div>
           <div className="mt-20">
             <Link href="/" className="px-12 py-5 bg-orange-600 text-white font-black uppercase italic tracking-tighter text-2xl rounded-2xl hover:bg-orange-500 transition shadow-[0_20px_50px_rgba(234,88,12,0.3)]">
                Secure Your Future
             </Link>
           </div>
        </section>

      </main>

      <footer className="py-12 border-t border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-3xl font-black tracking-tighter uppercase italic mb-8">Aura<span className="text-orange-600">Lock</span></div>
          <div className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">&copy; 2026 ENG-LABS Technologies. All Rights Protocolized.</div>
        </div>
      </footer>
    </div>
  );
}

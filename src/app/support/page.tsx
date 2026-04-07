"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  MapPin, 
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Clock,
  Wrench,
  Dumbbell,
  Book,
  Building2,
  Factory
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I reset my AuraLock device?",
      answer: "To reset your AuraLock, locate the small reset button on the interior panel. Press and hold it for 10 seconds. Note: This will wipe all stored biometric data and settings."
    },
    {
      question: "Does AuraLock work without an internet connection?",
      answer: "Yes. AuraLock stores biometric templates locally on a specialized AI chip. Basic entry functions work 100% offline. Remote monitoring and cloud reports require a Wi-Fi connection."
    },
    {
      question: "How many users can the system support?",
      answer: "The AuraLock S1 supports up to 500 face profiles and 1,000 fingerprint profiles. For enterprise needs, our cloud-managed systems can handle unlimited users across multiple locations."
    },
    {
      question: "What happens during a power outage?",
      answer: "AuraLock is equipped with an internal backup battery that lasts up to 12 months with normal use. It also features an emergency USB-C port for external jump-starting and a manual high-security physical key backup."
    },
    {
      question: "Is professional installation required?",
      answer: "While many customers install it themselves in under 60 minutes, we recommend our certified partners for enterprise setups. You can book an installation during checkout."
    }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Support request submitted:", formData);
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", phone: "", message: "" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/30 overflow-x-hidden font-sans pb-12">
      
      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[500] px-6 py-6 md:px-12 flex justify-between items-center bg-white/90 backdrop-blur-2xl border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center overflow-hidden transition-all duration-300">
            <img src="/logo.png" alt="Englabs" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-widest uppercase font-mono">Auralock</span>
            <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase ml-0.5">by Englabs</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-widest text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <Link href="/#products" className="hover:text-slate-900 transition">Products</Link>
          <Link href="/support" className="text-purple-500">Support</Link>
          <Link href="/legal" className="hover:text-slate-900 transition">Legal</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block px-6 py-3 text-[11px] font-bold tracking-widest text-slate-600 hover:text-slate-900 transition-colors">
            Login
          </Link>
          <button 
            onClick={() => window.open('https://wa.me/919878407934', '_blank')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-[11px] font-black tracking-widest text-slate-900 shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_50px_rgba(147,51,234,0.7)] transition-all duration-300 flex items-center gap-3 border border-white/20"
          >
            Sales
          </button>
        </div>
      </nav>

      <main className="pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Compact Upgrade Box Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-purple-600/30 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-2xl text-center"
            >
              <div className="absolute inset-0 bg-purple-600/[0.03] blur-[80px] pointer-events-none" />
              
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-mono mb-4 text-slate-900 relative z-10 drop-shadow-sm">
                READY TO <span className="text-purple-600">UPGRADE</span><br />
                YOUR ACCESS CONTROL?
              </h1>
              
              <p className="text-xs md:text-sm text-slate-600 font-bold mb-8 max-w-xl mx-auto leading-relaxed relative z-10">
                Get a custom solution for your gym, library, office, or facility. Our team designs the perfect biometric door management system for you.
              </p>
  
              {/* Verticals Icons - Larger */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl mx-auto mb-12 relative z-10">
                {[
                  { image: "/images/gym.png", label: "Gyms" },
                  { image: "/images/library.png", label: "Libraries" },
                  { image: "/images/office.png", label: "Offices" },
                  { image: "/images/facility.png", label: "Facilities" }
                ].map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 group/icon">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden group-hover/icon:border-purple-600/50 group-hover/icon:scale-105 transition-all duration-500 shadow-sm">
                      <img src={v.image} alt={v.label} className="w-full h-full object-cover opacity-80 group-hover/icon:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-500 group-hover/icon:text-slate-900 transition-colors">{v.label}</span>
                  </div>
                ))}
              </div>
  
              <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://wa.me/919878407934?text=Hi, I want to upgrade my access control system.', '_blank')}
                  className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:border-purple-600/30 text-slate-900 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full border border-green-500/50 flex items-center justify-center bg-white shadow-sm">
                    <MessageCircle className="w-3 h-3 text-green-500" />
                  </div>
                  WHATSAPP SALES
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('mailto:barrydeveloperindia@gmail.com?subject=Custom Biometric Solution Quote', '_blank')}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-purple-600/30 text-slate-900 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group shadow-sm"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  EMAIL FOR QUOTE
                </motion.button>
              </div>
            </motion.div>
          </div>
          

          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-6 font-mono">
              Help Center
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-mono mb-6 leading-[0.9]">
              Need Help with<br />
              <span className="text-purple-600 drop-shadow-[0_0_30px_rgba(147,51,234,0.4)]">AuraLock?</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
              Our technical engineering team is ready to assist you 24/7 with hardware installation, software configuration, or general inquiries.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24"
          >
            {[
              { 
                icon: Phone, 
                title: "Call Us", 
                desc: "Talk to an engineer", 
                action: "tel:+919878407934",
                color: "from-blue-600 to-indigo-700",
                borderConic: "bg-[conic-gradient(from_0deg,transparent_75%,#2563eb_85%,#4f46e5_100%)]"
              },
              { 
                icon: MessageCircle, 
                title: "WhatsApp", 
                desc: "Live technical support", 
                action: "https://wa.me/919878407934",
                color: "from-emerald-500 to-teal-600",
                borderConic: "bg-[conic-gradient(from_0deg,transparent_75%,#10b981_85%,#0d9488_100%)]"
              }
            ].map((btn, i) => (
              <motion.a
                key={i}
                href={btn.action}
                target={btn.action.startsWith('http') ? '_blank' : undefined}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-[2.5rem] overflow-hidden transition-all duration-300 shadow-2xl bg-white"
              >
                {/* Spinning Border */}
                <div className="absolute inset-0 z-0 pointer-events-none rounded-[2.5rem] overflow-hidden">
                  <div className={`absolute left-1/2 top-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] ${btn.borderConic} opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute inset-[1px] rounded-[calc(2.5rem-1px)] bg-white group-hover:bg-slate-50 transition-colors" />
                </div>
                
                <div className="relative z-10 p-8 h-full">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${btn.color} opacity-10 blur-[50px] transition-opacity group-hover:opacity-20 z-0`} />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${btn.color} flex items-center justify-center text-slate-900 mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                      <btn.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-widest mb-2 font-mono">{btn.title}</h3>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{btn.desc}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form Section */}
            <motion.div 
              id="contact"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-slate-200 p-10 md:p-12 rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-cyan-500" />
              
              <div className="mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 font-mono">Send a Message</h2>
                <p className="text-slate-500 font-medium">Response time typically under 60 minutes.</p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4 font-mono">Request Received</h3>
                  <p className="text-slate-500">An AuraLock engineer will contact you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-purple-500 text-sm font-bold uppercase tracking-widest hover:text-purple-400 transition"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Full Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 shadow-sm rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-600 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      placeholder="e.g. John Wick"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      className="w-full bg-slate-50 border border-slate-200 shadow-sm rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-600 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 shadow-sm rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-600 transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-lg hover:shadow-purple-600/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-slate-900"
                  >
                    {isSubmitting ? "Processing..." : (
                      <>
                        <Send className="w-4 h-4" />
                        Initialize Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 font-mono flex items-center gap-4">
                  <HelpCircle className="text-purple-500 w-8 h-8" />
                  Common Inquiries
                </h2>
                <p className="text-slate-500 font-medium">Quick answers for immediate support.</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className={`border border-slate-200 rounded-3xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'bg-slate-50 border-purple-600/30 shadow-xl' : 'bg-transparent hover:border-slate-300'}`}
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left group"
                    >
                      <span className={`text-sm font-black uppercase tracking-widest ${openFaq === i ? 'text-purple-600' : 'text-slate-900'} transition-colors`}>
                        {faq.question}
                      </span>
                      {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-slate-900 transition-colors" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-8 pb-8 text-slate-500 text-sm leading-relaxed font-medium">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Business Info Under FAQ */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1">Global HQ</h4>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">
                      MDC Sector 4 Panchkula<br />Haryana, India - 134114
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1">Digital Protocol</h4>
                    <p className="text-xs text-slate-500 font-bold">barrydeveloperindia@gmail.com</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">24/7 Inbound Monitoring</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Trust bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 pt-16 border-t border-slate-200 flex flex-wrap justify-between items-center gap-12"
          >
            <div className="flex gap-12 items-center flex-wrap">
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-purple-500 opacity-50" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">End-to-End Encryption</span>
               </div>
               <div className="flex items-center gap-3">
                 <Clock className="w-5 h-5 text-purple-500 opacity-50" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Emergency Deployment</span>
               </div>
               <div className="flex items-center gap-3">
                 <Lock className="w-5 h-5 text-purple-500 opacity-50" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Architectural Security</span>
               </div>
            </div>
            
            <Link href="/" className="group flex items-center gap-2 text-[10px] font-black text-purple-500 uppercase tracking-widest hover:gap-4 transition-all">
              Return to Control Center
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </main>

      {/* Basic Footer */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-50 border border-slate-200 flex items-center justify-center">
              <Lock className="w-3 h-3 text-purple-600" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 font-mono">Auralock Ecosystem</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            © 2026 AuraLock Security Systems. All Rights Protocolized.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900 transition">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

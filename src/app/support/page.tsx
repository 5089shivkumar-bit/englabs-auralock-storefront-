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
    <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-500/30 overflow-x-hidden font-sans pb-12">
      
      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[500] px-6 py-6 md:px-12 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-widest uppercase font-mono">Auralock</span>
            <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase ml-0.5">by Englabs</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/#products" className="hover:text-white transition">Products</Link>
          <Link href="/support" className="text-purple-500">Support</Link>
          <Link href="/legal" className="hover:text-white transition">Legal</Link>
        </div>

        <button 
          onClick={() => window.open('https://wa.me/919878407934', '_blank')}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_50px_rgba(147,51,234,0.7)] transition-all duration-300 flex items-center gap-3 border border-white/20"
        >
          SALES
        </button>
      </nav>

      <main className="pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Compact Upgrade Box Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0c0c0c] border-2 border-purple-600 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-[0_0_50px_rgba(147,51,234,0.2)] text-center"
            >
              <div className="absolute inset-0 bg-purple-600/10 blur-[80px] pointer-events-none" />
              
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-mono mb-4 text-white relative z-10">
                READY TO <span className="text-purple-600">UPGRADE</span><br />
                YOUR ACCESS CONTROL?
              </h1>
              
              <p className="text-xs md:text-sm text-gray-400 font-bold mb-8 max-w-xl mx-auto leading-relaxed relative z-10">
                Get a custom solution for your facility. Our team designs the perfect biometric door management system for you.
              </p>
  
              {/* Verticals Icons - Small */}
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-10 relative z-10">
                {[
                  { icon: Dumbbell, label: "Gyms" },
                  { icon: Book, label: "Libraries" },
                  { icon: Building2, label: "Offices" },
                  { icon: Factory, label: "Facilities" }
                ].map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group/icon">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover/icon:bg-purple-600/20 group-hover/icon:border-purple-600/30 group-hover/icon:text-purple-500 transition-all duration-300">
                      <v.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-600 group-hover/icon:text-white transition-colors">{v.label}</span>
                  </div>
                ))}
              </div>
  
              <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://wa.me/919878407934?text=Hi, I want to upgrade my access control system.', '_blank')}
                  className="flex items-center justify-center gap-2 bg-[#0c0c0c] border border-white/10 hover:border-white/30 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group"
                >
                  <div className="w-5 h-5 rounded-full border border-green-500/50 flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 text-green-500" />
                  </div>
                  WHATSAPP SALES
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('mailto:barrydeveloperindia@gmail.com?subject=Custom Biometric Solution Quote', '_blank')}
                  className="flex items-center justify-center gap-2 bg-transparent border border-white/10 hover:border-white/30 text-white px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all group"
                >
                  <Mail className="w-4 h-4 text-gray-400" />
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
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
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
                className="group relative rounded-[2.5rem] overflow-hidden transition-all duration-300 shadow-2xl bg-[#0a0a0a]"
              >
                {/* Spinning Border */}
                <div className="absolute inset-0 z-0 pointer-events-none rounded-[2.5rem] overflow-hidden">
                  <div className={`absolute left-1/2 top-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] ${btn.borderConic} opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute inset-[1px] rounded-[calc(2.5rem-1px)] bg-[#0a0a0a] group-hover:bg-[#0c0c0c] transition-colors" />
                </div>
                
                <div className="relative z-10 p-8 h-full">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${btn.color} opacity-10 blur-[50px] transition-opacity group-hover:opacity-20 z-0`} />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${btn.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                      <btn.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-widest mb-2 font-mono">{btn.title}</h3>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{btn.desc}</p>
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
              className="bg-[#0a0a0a] border border-white/5 p-10 md:p-12 rounded-[3.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-cyan-500" />
              
              <div className="mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 font-mono">Send a Message</h2>
                <p className="text-gray-500 font-medium">Response time typically under 60 minutes.</p>
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
                  <p className="text-gray-400">An AuraLock engineer will contact you shortly.</p>
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
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Full Name</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-600 transition-all font-medium text-white placeholder:text-gray-700"
                      placeholder="e.g. John Wick"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-600 transition-all font-medium text-white placeholder:text-gray-700"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-2">Message</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-purple-600 transition-all font-medium text-white placeholder:text-gray-700 resize-none"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-lg hover:shadow-purple-600/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-white"
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
                <p className="text-gray-500 font-medium">Quick answers for immediate support.</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className={`border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'bg-white/5 border-white/10 shadow-xl' : 'bg-transparent hover:border-white/10'}`}
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left group"
                    >
                      <span className={`text-sm font-black uppercase tracking-widest ${openFaq === i ? 'text-purple-500' : 'text-gray-300'} transition-colors`}>
                        {faq.question}
                      </span>
                      {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-8 pb-8 text-gray-400 text-sm leading-relaxed font-medium">
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
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1">Global HQ</h4>
                    <p className="text-xs text-gray-400 font-bold leading-relaxed">
                      MDC Sector 4 Panchkula<br />Haryana, India - 134114
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1">Digital Protocol</h4>
                    <p className="text-xs text-gray-400 font-bold">barrydeveloperindia@gmail.com</p>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest mt-1">24/7 Inbound Monitoring</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Trust bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 pt-16 border-t border-white/5 flex flex-wrap justify-between items-center gap-12"
          >
            <div className="flex gap-12 items-center flex-wrap">
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-purple-500 opacity-50" />
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">End-to-End Encryption</span>
               </div>
               <div className="flex items-center gap-3">
                 <Clock className="w-5 h-5 text-purple-500 opacity-50" />
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Emergency Deployment</span>
               </div>
               <div className="flex items-center gap-3">
                 <Lock className="w-5 h-5 text-purple-500 opacity-50" />
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Architectural Security</span>
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
      <footer className="py-12 bg-black/80 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center">
              <Lock className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-500 font-mono">Auralock Ecosystem</span>
          </div>
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
            © 2026 AuraLock Security Systems. All Rights Protocolized.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

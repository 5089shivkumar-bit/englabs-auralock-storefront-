"use client";

import React from "react";
import Link from "next/link";
import { 
  Lock, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Globe,
  Gavel
} from "lucide-react";
import { motion } from "framer-motion";

export default function LegalPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/30 overflow-x-hidden font-sans pb-24">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[500] px-6 py-6 md:px-12 flex justify-between items-center bg-white/90 backdrop-blur-2xl border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
            <Lock className="w-5 h-5 text-slate-900" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-widest  font-mono">Auralock</span>
            <span className="text-[10px] font-black tracking-[0.4em] text-purple-500  ml-0.5">by Englabs</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold  tracking-widest text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <Link href="/#products" className="hover:text-slate-900 transition">Products</Link>
          <Link href="/support" className="hover:text-slate-900 transition">Support</Link>
          <Link href="/legal" className="text-purple-500">Legal</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block px-6 py-3 text-[11px] font-bold tracking-widest text-slate-600 hover:text-slate-900 transition-colors">
            Login
          </Link>
          <button 
            onClick={() => window.open('https://wa.me/919878407934', '_blank')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-[11px] font-black tracking-widest text-slate-900 shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_50px_rgba(147,51,234,0.7)] transition-all duration-300 border border-white/20"
          >
            Sales
          </button>
        </div>
      </nav>

      <main className="pt-40">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter  font-mono mb-6 leading-tight">
              Legal & <span className="text-purple-600">Privacy</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
              Our commitment to transparency, security, and the integrity of your access control data.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            
            {/* Product Disclaimer */}
            <motion.section variants={itemVariants} className="bg-white border border-purple-600/30 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] pointer-events-none" />
              <div className="flex items-center gap-4 mb-8">
                <AlertTriangle className="text-purple-500 w-8 h-8" />
                <h2 className="text-3xl font-black  tracking-tighter font-mono">Product Disclaimer</h2>
              </div>
              
              <div className="space-y-6 text-slate-500 font-medium leading-relaxed">
                <p className="text-lg text-slate-900 font-bold">
                  AURALOCK is a proprietary smart access solution designed and developed by the R&D division of ENGLABS INDIA PRIVATE LIMITED.
                </p>
                <ul className="space-y-4">
                  {[
                    "This is a custom-built R&D product, not a mass-manufactured item.",
                    "All components are sourced from certified distributors.",
                    "Cloud platform, firmware, and dashboard are developed by ENGLABS.",
                    "AURALOCK is a solution offered as a service + device bundle.",
                    "Each unit is assembled on demand for each customer requirement."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <ShieldCheck className="w-5 h-5 text-purple-500 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Privacy Policy */}
            <motion.section variants={itemVariants} className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14">
              <div className="flex items-center gap-4 mb-10">
                <FileText className="text-purple-500 w-8 h-8" />
                <h2 className="text-3xl font-black  tracking-tighter font-mono">Privacy Policy</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <p className="text-slate-500 font-bold leading-relaxed">
                    At ENGLABS INDIA PRIVATE LIMITED, we prioritize the security and privacy of your data. The AURALOCK system collects only necessary operational data such as access logs, device status, and user authentication records.
                  </p>
                  <div>
                    <h4 className="text-slate-900 font-black  tracking-widest text-sm mb-3">Data Usage</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      Data collected is used strictly for the functionality of the access control system, generating reports for the administrator, and system health monitoring. We do not sell or share your data with third parties.
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-[2rem] p-8 border border-slate-200">
                  <h4 className="text-purple-500 font-black  tracking-widest text-sm mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Cloud Security
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-bold">
                    All communication between AURALOCK devices and our cloud servers is encrypted. We employ industry-standard security measures to protect against unauthorized access.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Terms & Conditions */}
            <motion.section variants={itemVariants} className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14">
              <div className="flex items-center gap-4 mb-8">
                <Gavel className="text-purple-500 w-8 h-8" />
                <h2 className="text-3xl font-black  tracking-tighter font-mono">Terms & Conditions</h2>
              </div>
              
              <p className="text-slate-500 mb-10 font-bold">
                By purchasing and using AURALOCK products, you agree to the following terms:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Intended Use",
                    content: "The device is intended for access control purposes only."
                  },
                  {
                    title: "Liability",
                    content: "ENGLABS is not liable for any misuse of the system or unauthorized access due to compromised user credentials."
                  },
                  {
                    title: "Warranty",
                    content: "Warranty covers manufacturing defects in the custom assembly but does not cover physical damage or water damage unless specified in the specific model's IP rating."
                  },
                  {
                    title: "Service",
                    content: "Service and support are provided as per the service agreement selected at the time of purchase."
                  }
                ].map((term, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-1.5 h-full bg-purple-600/30 rounded-full" />
                    <div>
                      <h5 className="text-slate-900 text-xs font-black  tracking-widest mb-2">{term.title}</h5>
                      <p className="text-gray-500 text-sm leading-relaxed font-medium">{term.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Corporate Information */}
            <motion.section variants={itemVariants} className="bg-white border border-slate-200 rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-cyan-500" />
               
               <h2 className="text-3xl font-black  tracking-tighter font-mono mb-12">Corporate Information</h2>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  <div>
                    <h3 className="text-xl font-black  tracking-widest text-slate-900 mb-4 font-mono">ENGLABS INDIA PRIVATE LIMITED</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                        <Building2 className="w-5 h-5 text-purple-500 shrink-0 mt-1" />
                        <div>
                          <p className="text-slate-500 text-sm font-bold leading-relaxed  tracking-widest">
                            R&D & Software Development Division<br />
                            MDC Sector 4 Panchkula<br />
                            Haryana, India - 134114
                          </p>
                        </div>
                      </div>
                      <Link href="https://www.englabs.co" className="inline-flex items-center gap-2 text-purple-500 text-sm font-black  tracking-[0.2em] hover:gap-4 transition-all group">
                        <Globe className="w-4 h-4" />
                        www.englabs.co
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex gap-6 items-center">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black  tracking-widest text-purple-500 mb-1">Sales & Orders</h4>
                        <p className="text-slate-900 text-sm font-bold underline font-mono">barrydeveloperindia@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black  tracking-widest text-purple-500 mb-1">Sales WhatsApp</h4>
                        <p className="text-slate-900 text-sm font-bold font-mono">+91 9878407934</p>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.section>

          </motion.div>

          {/* Footer Navigation */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 pt-16 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-12"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center">
                <Lock className="w-3 h-3 text-slate-900" />
              </div>
              <span className="text-xs font-black  tracking-widest text-gray-500 font-mono">Legal Repository</span>
            </div>
            
            <div className="flex gap-12 items-center flex-wrap justify-center">
              <Link href="/support" className="text-[10px] font-black text-gray-500  tracking-widest hover:text-slate-900 transition">Support Center</Link>
              <Link href="/#products" className="text-[10px] font-black text-gray-500  tracking-widest hover:text-slate-900 transition">Inventory</Link>
              <Link href="/" className="group flex items-center gap-2 text-[10px] font-black text-purple-500  tracking-widest hover:gap-4 transition-all">
                Return to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Corporate Copyright */}
      <footer className="mt-24 text-center px-6">
        <p className="text-[10px] font-bold text-slate-400  tracking-[0.4em]">
          © 2026 ENGLABS INDIA PRIVATE LIMITED. All Rights Protocolized.
        </p>
      </footer>
    </div>
  );
}

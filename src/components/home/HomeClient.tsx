"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Search,
  X,
  ShieldCheck,
  Fingerprint,
  ScanFace,
  KeyRound,
  Battery,
  Settings,
  Bell,
  Lock,
  Smartphone,
  Cpu,
  ChevronRight,
  ChevronLeft,
  Grip,
  ChevronDown,
  Video,
  Mic,
  Unlock,
  ChevronsRight,
  Key,
  Zap,
  Cloud,
  Wrench,
  Target,
  WifiOff,
  Grid3X3,
  Home as HomeIcon,
  Navigation,
  Volume2,
  Scan,
  Dumbbell,
  Building2,
  Users,
  Calendar,
  BarChart3,
  MessageCircle,
  Plus,
  RefreshCcw,
  Save,
  Clock,
  FileText,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "@/components/auth/LoginModal";
interface HomeClientProps {
  initialProducts: any[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const splashPlayed = sessionStorage.getItem('auralock_splash_played');
    if (splashPlayed) {
      setShowSplash(false);
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('auralock_splash_played', 'true');
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  // if (!mounted) return <div className="min-h-screen bg-black" />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-purple-500/30 overflow-x-hidden">
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      
      {/* Cinematic Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <Lock className="w-16 h-16 text-purple-600 animate-pulse mx-auto" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-purple-600/30 blur-2xl rounded-full" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-widest uppercase font-mono">
                Aura<span className="text-purple-600">Lock</span>
              </h1>
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto mt-4" />
              <p className="mt-6 text-[10px] tracking-[0.4em] text-purple-500 uppercase font-mono font-medium animate-pulse">Initializing Secure Protocol... Access Granted.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[500] px-6 py-6 md:px-12 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-widest uppercase font-mono">Auralock</span>
            <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase ml-0.5">by Englabs</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => setActiveTab('home')} className={`hover:text-white transition ${activeTab === 'home' ? 'text-purple-500' : ''}`}>Home</button>
          <button onClick={() => setActiveTab('products')} className={`hover:text-white transition ${activeTab === 'products' ? 'text-purple-500' : ''}`}>Products</button>
          <Link href="/support" className="hover:text-white transition">Support</Link>
          <Link href="/legal" className="hover:text-white transition">Legal</Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="hidden md:block px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
          >
            LOGIN
          </button>
          <button 
            onClick={() => window.open('https://wa.me/919878407934?text=Hi, I am interested in Auralock products.', '_blank')}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_50px_rgba(147,51,234,0.7)] transition-all duration-300 flex items-center gap-3 border border-white/20 group"
          >
            <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
               <MessageCircle className="w-3 h-3" />
            </div>
            SALES
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-10">
        
        {activeTab === 'home' && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto px-6"
          >
            {/* Elite Hero Redesign */}
            <div className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden mb-12 shadow-[inset_0_100px_150px_-20px_rgba(147,51,234,0.15)]">
               
               {/* Background Ambient Glows */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

               {/* Top Badge Overlay */}
               <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.5 }}
                 className="z-10 mb-8"
               >
                 <div className="px-6 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase flex items-center gap-3 shadow-2xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    Englabs IoT Project • R&D Division
                 </div>
               </motion.div>

               {/* The AuraBox - Main Hero Element */}
               <div className="relative z-10 w-full max-w-xl px-6">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1.2, ease: "easeOut" }}
                   className="relative rounded-[3.5rem] text-center aura-box-animated shadow-[0_0_80px_rgba(147,51,234,0.3)] group transition-all duration-700"
                 >
                    <div className="relative bg-black/80 backdrop-blur-3xl rounded-[3.5rem] p-16 md:p-24 z-20">
                    
                    <div className="relative z-20">
                      <h1 className="text-5xl md:text-[90px] font-black tracking-tighter uppercase font-mono mb-8 leading-none">
                         <span className="relative inline-block">
                            <span className="absolute -inset-1 blur-3xl bg-purple-600/20 opacity-50 z-0" />
                            <span className="relative z-10 bg-gradient-to-br from-white via-white/80 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                               AuraLock
                            </span>
                         </span>
                         <br/>
                         <span className="text-3xl md:text-6xl bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent animate-shimmer italic tracking-widest">
                            S1
                         </span>
                      </h1>
                      
                      <div className="flex flex-col gap-2 relative">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-purple-500 to-transparent mx-auto mb-4" />
                        <p className="text-xs md:text-sm text-gray-300 font-black tracking-[0.6em] uppercase flex items-center justify-center gap-3">
                          Smart Access Series
                        </p>
                        <p className="text-[9px] md:text-[10px] text-purple-500 font-extrabold tracking-[0.4em] uppercase opacity-90 mt-1">
                          BY ENGLABS
                        </p>
                      </div>
                    </div>
                  </div>
                 </motion.div>
                 
                 {/* Terminal-Style Access Granted Line */}
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 1.5 }}
                    className="mt-16 text-center"
                 >
                    <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#9333ea] opacity-80 flex items-center justify-center gap-2">
                       Initializing Secure Protocol... <span className="text-[#c084fc] font-bold animate-pulse">Access Granted.</span>
                    </p>
                 </motion.div>
               </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               {[
                 { 
                   icon: ScanFace, 
                   title: "Smart Face Recognition", 
                   desc: "Secure, contactless entry powered by AI.", 
                   image: "/feature-faceauth.png" 
                 },
                 { 
                   icon: Cpu, 
                   title: "Always Active", 
                   desc: "Works even without internet connection.", 
                   image: "/feature-alwaysactive.png" 
                 },
                 { 
                   icon: Smartphone, 
                   title: "Real-Time Monitoring", 
                   desc: "Track access and activity instantly.", 
                   image: "/feature-monitoring.png" 
                 }
               ].map((feat, i) => (
                 <motion.div 
                   key={i}
                   variants={itemVariants}
                   whileHover={{ y: -8 }}
                   className="group relative p-8 bg-[#0a0a0a] border border-white/5 rounded-[2rem] transition duration-500 overflow-hidden shadow-xl aura-box"
                 >
                   {/* Background Image */}
                   <div className="absolute inset-0 z-0">
                     <img 
                       src={feat.image}
                       alt={feat.title}
                       className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" />
                     <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay z-10" />
                   </div>

                   {/* Content overlay */}
                   <div className="relative z-20">
                     <div className="w-14 h-14 rounded-2xl bg-purple-600/20 backdrop-blur-md flex items-center justify-center text-purple-500 mb-6 border border-purple-600/30 shadow-[0_0_20px_rgba(147,51,234,0.15)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-shadow duration-500">
                       <feat.icon className="w-7 h-7" />
                     </div>
                     <h3 className="text-xl font-black uppercase font-mono tracking-widest mb-4 text-white drop-shadow-lg">{feat.title}</h3>
                     <p className="text-sm text-gray-300 leading-relaxed font-medium drop-shadow-md">{feat.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>

            {/* Target Use Cases Section */}
            <motion.div variants={itemVariants} className="mb-12 mt-12 text-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-600/10 border border-cyan-600/20 text-cyan-500 text-[10px] font-black tracking-widest uppercase mb-6">
                 Who is this for?
               </div>
               <h2 className="text-4xl md:text-5xl font-black tracking-widest uppercase font-mono leading-[1.1] mb-12">
                 Transform Any <span className="text-cyan-500">Space.</span>
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                 {[
                   { icon: Dumbbell, title: "Gyms", desc: "24/7 autonomous access without staff members.", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", glow: "group-hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]", image: "/usecase-gym.png" },
                   { icon: HomeIcon, title: "Airbnbs", desc: "Seamless remote self check-in for guests.", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]", image: "/usecase-airbnb.png" },
                   { icon: Building2, title: "Offices", desc: "Enterprise-grade secure entry tracking.", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]", image: "/usecase-office.png" }
                 ].map((useCase: any, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ y: -8 }}
                     className={`group relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#020202] p-8 rounded-[2rem] border border-white/5 transition-all duration-300 hover:border-white/20 shadow-xl aura-box ${useCase.glow}`}
                   >
                      <div className={`absolute top-0 right-0 w-32 h-32 ${useCase.bg} blur-[40px] rounded-full group-hover:opacity-100 transition-opacity opacity-20 z-0`} />
                      
                      {useCase.image && (
                         <div className="absolute inset-0 z-0 overflow-hidden">
                           <img 
                             src={useCase.image}
                             alt={useCase.title}
                             className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out mix-blend-screen"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-transparent z-10" />
                         </div>
                      )}

                      <div className={`w-14 h-14 rounded-2xl ${useCase.bg} flex items-center justify-center ${useCase.color} mb-6 border ${useCase.border} relative z-10 shadow-lg`}>
                        <useCase.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2 z-10 relative text-white drop-shadow-lg">{useCase.title}</h3>
                      <p className="text-sm text-gray-300 font-medium z-10 relative drop-shadow-md">{useCase.desc}</p>
                   </motion.div>
                 ))}
               </div>
            </motion.div>

             {/* Why Choose AuraLock Section */}
             <motion.div variants={itemVariants} className="mb-24 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto px-6">
                   <div>
                      <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-8">
                        Key Benefits
                      </motion.div>
                      <h2 className="text-5xl md:text-7xl font-black tracking-widest uppercase font-mono leading-[1] mb-8">
                        Why Choose<br/>
                        <span className="text-purple-600">AURALOCK</span>
                      </h2>
                      <p className="text-gray-400 font-medium text-lg leading-relaxed mb-12">
                         Designed for modern businesses that need reliable, fast, and secure biometric door lock systems with cloud management.
                      </p>

                      <div className="flex gap-4">
                         <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl text-center flex-1 shadow-xl">
                            <p className="text-3xl font-black text-white italic">500+</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Users</p>
                         </div>
                         <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl text-center flex-1 shadow-xl">
                            <p className="text-3xl font-black text-purple-500 italic">&lt;1ms</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Lookup</p>
                         </div>
                         <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl text-center flex-1 shadow-xl">
                            <p className="text-3xl font-black text-white italic">24/7</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Cloud</p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      {[
                        { icon: Zap, title: "Instant Access", desc: "<500ms response. From scan to unlock in under half a second." },
                        { icon: Cloud, title: "Cloud Management", desc: "Real-time monitoring, reports, and remote user management from anywhere." },
                        { icon: Wrench, title: "Custom Built", desc: "Tailored to your specific needs. On-demand features and integrations." }
                      ].map((pkg, i) => (
                        <motion.div 
                          key={i}
                          whileHover={{ x: 10 }}
                          className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] flex items-center gap-8 hover:border-purple-600/30 transition-all duration-300 shadow-2xl"
                        >
                           <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-500 flex-shrink-0">
                              <pkg.icon className="w-7 h-7" />
                           </div>
                           <div>
                              <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-white">{pkg.title}</h3>
                              <p className="text-sm text-gray-500 font-medium leading-relaxed">{pkg.desc}</p>
                           </div>
                        </motion.div>
                      ))}
                   </div>
                </div>
             </motion.div>

             {/* Partition Divider Line */}
             <div className="w-full max-w-7xl mx-auto px-6 mb-8">
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-purple-600 via-cyan-400 via-pink-500 to-transparent opacity-100 shadow-[0_0_40px_rgba(147,51,234,0.6)]" />
             </div>

             {/* Powerful Text Section - Cinematic Brand Statement */}
             <motion.div 
               variants={itemVariants} 
               className="mb-24 py-12 relative overflow-hidden"
             >
                {/* Background Text Elements */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-[0.03] select-none pointer-events-none -space-y-24">
                   <p className="text-[200px] font-black uppercase tracking-[0.2em] font-mono whitespace-nowrap">AURALOCK</p>
                   <p className="text-[200px] font-black uppercase tracking-[0.2em] font-mono whitespace-nowrap">ENGLABS</p>
                </div>
                
                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                   <h2 className="text-6xl md:text-[100px] font-black tracking-tighter uppercase leading-[0.9] italic text-white mb-16">
                      The New Standard In<br/>
                      <span className="text-purple-600">Architectural</span> Intelligence
                   </h2>
                   
                   <div className="max-w-4xl mx-auto">
                      <p className="text-xl md:text-3xl text-gray-400 font-bold leading-relaxed mb-8">
                         AuraLock by Englabs isn't just a lock. It's a statement of absolute control and sophisticated engineering. 
                         <span className="text-white"> Designed in India, built for the world's most high-security environments.</span>
                      </p>
                      
                      <div className="h-0.5 w-32 bg-purple-600 mx-auto mt-12 mb-8" />
                      
                      <p className="text-[10px] font-bold text-purple-500 tracking-[0.5em] uppercase">
                         Pioneering Biometric Innovation • Englabs IoT Systems
                      </p>
                   </div>
                </div>
             </motion.div>

             {/* Partition Divider Line */}
             <div className="w-full max-w-7xl mx-auto px-6 mb-12 mt-4">
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-purple-600 via-cyan-400 via-pink-600 to-transparent opacity-100 shadow-[0_0_40px_rgba(147,51,234,0.6)]" />
             </div>

            {/* How It Works Section */}
            <motion.div variants={itemVariants} className="mb-24 mt-12">
               <div className="text-center mb-16">
                 <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-6">
                   How It Works
                 </motion.div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase font-mono leading-[1.1] mb-6">
                   Access <span className="text-purple-600">Flow</span>
                 </h2>
                 <p className="text-gray-400 font-medium max-w-2xl mx-auto">
                   From app launch to door unlock in seconds. Secure, autonomous, and lightning fast.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {[
                    { icon: Smartphone, title: "1. Open App", desc: "Open the app on your phone" },
                    { icon: ScanFace, title: "2. Biometrics", desc: "Scan your face or finger" },
                    { icon: ShieldCheck, title: "3. Cloud Verify", desc: "Cloud verify" },
                    { icon: Unlock, title: "4. Access", desc: "Further access will be granted" }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="group relative bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-300 shadow-2xl aura-box"
                    >
                       <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                          <step.icon className="w-8 h-8" />
                       </div>
                       <h3 className="text-xl font-black uppercase tracking-widest mb-3">{step.title}</h3>
                       <p className="text-xs text-gray-500 font-bold leading-relaxed">{step.desc}</p>
                       
                       {i < 3 && (
                         <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                            <ChevronsRight className="w-6 h-6 text-purple-600 opacity-20" />
                         </div>
                       )}
                    </motion.div>
                  ))}
               </div>
            </motion.div>

            {/* The Challenge Section (Problem vs Solution) */}
            <motion.div variants={itemVariants} className="mb-24 mt-12 overflow-hidden">
               <div className="text-center mb-16">
                 <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-6">
                   The Challenge
                 </motion.div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase font-mono leading-[1.1] mb-6">
                   Tired of Old-School<br/>
                   <span className="text-purple-600">Access Control?</span>
                 </h2>
                 <p className="text-gray-400 font-medium max-w-2xl mx-auto">
                   Manual keys get lost. Traditional tags are slow. Traditional systems can't scale. There had to be a better way.
                 </p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* The Problem Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-[#0a0a0a] border border-red-900/20 p-10 rounded-[2.5rem] shadow-2xl transition-all duration-300 aura-box"
                  >
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[9px] font-black tracking-widest uppercase mb-8">
                       <X className="w-3 h-3" /> The Problem
                     </div>
                     <h3 className="text-3xl font-black uppercase tracking-tight mb-8">Outdated Systems<br/><span className="text-red-900/80">Hold You Back</span></h3>
                     
                     <div className="space-y-6">
                        {[
                          { title: "Slow Authentication", desc: "3+ seconds per scan. Members wait in line." },
                          { title: "Limited Capacity", desc: "Only 50-100 users. Can't scale with your business." },
                          { title: "No Cloud Management", desc: "Manual updates. No remote access. No analytics." },
                          { title: "Expensive & Inflexible", desc: "Locked into vendor solutions. Can't customize." }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 items-start">
                             <div className="mt-1 text-red-600">
                                <X className="w-5 h-5 opacity-40" />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-gray-200">{item.title}</h4>
                                <p className="text-xs text-gray-500 font-medium mt-1">{item.desc}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </motion.div>

                  {/* The Solution Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-[#0a0a0a] border border-purple-600/30 p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(147,51,234,0.1)] transition-all duration-300 overflow-hidden aura-box"
                  >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full" />
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-400 text-[9px] font-black tracking-widest uppercase mb-8">
                       <ShieldCheck className="w-3 h-3" /> The Solution
                     </div>
                     <h3 className="text-3xl font-black uppercase tracking-tight mb-8 font-mono">AURALOCK<br/><span className="text-purple-600">Changes Everything</span></h3>
                     
                     <div className="space-y-6">
                        {[
                          { title: "Lightning Fast", desc: "300-500ms detection. Members never wait." },
                          { title: "Scales to 500+ Users", desc: "Hash-map lookup. Grows with your business." },
                          { title: "Full Cloud Control", desc: "Real-time monitoring. Remote management. Analytics." },
                          { title: "Custom-Built for You", desc: "Designed in-house. Tailored features. Your way." }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 items-start">
                             <div className="mt-1 text-green-500">
                                <Check className="w-5 h-5 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                                <p className="text-xs text-gray-400 font-medium mt-1">{item.desc}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </motion.div>
               </div>
            </motion.div>
            {/* Membership Access Management Section (Replaces Digital Experience Showcase) */}
            <motion.div variants={itemVariants} className="mb-24 mt-12 overflow-hidden">
               <div className="text-center mb-16">
                 <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-6">
                   <Users className="w-3 h-3" /> Membership Access Management
                 </motion.div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase font-mono leading-[1.1] mb-6">
                   Complete Control Over<br/>
                   <span className="text-purple-600">Member Access</span>
                 </h2>
                 <p className="text-gray-400 font-medium max-w-2xl mx-auto">
                   Manage who can access your facility, when they can access it, and track every entry—all from one cloud dashboard.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8 px-4">
                  {[
                    { icon: Plus, title: "Add & Remove Members", desc: "Instantly grant or revoke access. Add new members via cloud dashboard. Changes sync in seconds." },
                    { icon: Calendar, title: "Set Expiry Dates", desc: "Automatic access expiration. Memberships expire automatically. No physical keys or tags needed." },
                    { icon: BarChart3, title: "Access Analytics", desc: "Track every entry. See who accessed when. Generate reports. Monitor facility usage patterns." }
                  ].map((feat, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] transition-all duration-300 shadow-2xl aura-box"
                    >
                       <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-500 mb-8">
                          <feat.icon className="w-7 h-7" />
                       </div>
                       <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">{feat.title}</h3>
                       <p className="text-sm text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
                    </motion.div>
                  ))}
               </div>

               {/* Real-Time Access Control Wide Card */}
               <div className="max-w-6xl mx-auto px-4 mb-16">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="relative bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-purple-600/20 p-10 rounded-[2.5rem] shadow-2xl overflow-hidden group"
                  >
                     <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-purple-600/10 transition-colors" />
                     
                     <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-600/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                           <Zap className="w-8 h-8" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-black uppercase mb-4 text-white font-mono tracking-wider">Real-Time Access Control</h3>
                           <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed max-w-4xl">
                              When a member's access expires, access is denied instantly—no waiting, no manual intervention. Add a new member? They get access within 8 seconds. Remove someone? Access is revoked immediately. All managed through your cloud dashboard, accessible from anywhere.
                           </p>
                        </div>
                     </div>
                  </motion.div>
               </div>


            </motion.div>

            {/* Powerful Features - Built for Performance Section */}
            <motion.div variants={itemVariants} className="mb-12 mt-12">
               <div className="text-center mb-16 px-6">
                 <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-6">
                   Powerful Features
                 </motion.div>
                 <h2 className="text-4xl md:text-7xl font-black tracking-widest uppercase font-mono leading-[1.1] mb-6">
                   Built for <span className="text-purple-600">Performance</span>
                 </h2>
                 <p className="text-gray-400 font-medium max-w-2xl mx-auto">
                   Every feature engineered for speed, reliability, and scale. See what makes AURALOCK different.
                 </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
                  {[
                    { icon: Zap, title: "Sub-Second Response", desc: "Face/Finger detection in 300-500ms. Biometric lookup in <1ms. Unlock happens instantly." },
                    { icon: TrendingUp, title: "500+ User Capacity", desc: "Enterprise-grade scalability. O(1) constant-time lookup. Syncs 500 profiles in just 8 seconds." },
                    { icon: Cloud, title: "Cloud-Powered", desc: "Real-time sync. Remote management. Access logs. Health monitoring. All from the cloud." },
                    { icon: Lock, title: "Offline Mode", desc: "100-profile flash cache. Works even when WiFi drops. Automatic sync when connection returns." },
                    { icon: Wrench, title: "Custom Integration", desc: "Built in-house. Tailored to your needs. API access. Custom features on demand." },
                    { icon: Grid3X3, title: "Smart Monitoring", desc: "Access logs. Health reports. Uptime tracking. Real-time alerts. All in one dashboard." }
                  ].map((feat, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -8, border: "rgba(147, 51, 234, 0.4) 1px solid" }}
                      className="group bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] transition-all duration-300 shadow-xl aura-box"
                    >
                       <div className="w-14 h-14 rounded-2xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 transition-transform shadow-inner">
                          <feat.icon className="w-7 h-7" />
                       </div>
                       <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">{feat.title}</h3>
                       <p className="text-sm text-gray-500 font-bold leading-relaxed mb-6">{feat.desc}</p>
                       <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 group/btn">
                          Learn More <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                       </button>
                    </motion.div>
                  ))}
               </div>
            </motion.div>

            {/* Everything You Need Section */}
            <motion.div variants={itemVariants} className="mb-24 py-12 bg-[#050505] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-6">
                            <CheckCircle2 className="w-3 h-3" /> Complete Product Features
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase font-mono leading-[1.1] mb-6">
                            Everything You Need to <span className="text-purple-600">Manage Access</span>
                        </h2>
                        <p className="text-gray-400 font-medium max-w-2xl mx-auto">
                            Check out all the powerful features that make AURALOCK the perfect solution for your facility.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {[
                            { icon: Lock, title: "Secure Biometric Encryption", desc: "Facial and fingerprint data uses AES-256 encrypted arrays. Unauthorized duplication is impossible. Your facility stays secure." },
                            { icon: FileText, title: "Detailed Access Logs", desc: "Every biometric scan is logged with timestamp. Track member activity. Generate reports. Export data for analysis." },
                            { icon: Clock, title: "Time-Based Access", desc: "Set access hours for different members. Day passes, night access, weekend-only—all configurable from cloud." },
                            { icon: Bell, title: "Instant Alerts", desc: "Get notified of denied access attempts. Unknown face/finger detected? Instant alert. Expired membership? Automatic denial." },
                            { icon: RefreshCcw, title: "Auto-Sync Technology", desc: "Changes sync automatically. Add member? Syncs profiles in 8 seconds. Revoke access? Instant update across all devices." },
                            { icon: Save, title: "Data Backup & Recovery", desc: "All member data stored in cloud. Automatic backups. Easy recovery. Never lose access control data." }
                        ].map((feat, i) => (
                            <motion.div 
                                key={i}
                                className="flex gap-6 bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-white/10 transition-colors shadow-lg aura-box"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-500 flex-shrink-0">
                                    <feat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black uppercase mb-2 text-white">{feat.title}</h4>
                                    <p className="text-sm text-gray-400 font-medium leading-relaxed">{feat.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-purple-600/20 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group aura-box">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl group-hover:bg-purple-600/10 transition-colors" />
                           <div className="flex items-center gap-3 mb-6">
                               <CheckCircle2 className="w-5 h-5 text-purple-500" />
                               <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-200">Membership-Only Access</span>
                           </div>
                           <p className="text-sm text-gray-400 leading-relaxed mb-8">
                               AURALOCK ensures only active members can access your facility. Expired memberships are automatically denied. No manual checking needed. The system verifies membership status in real-time before granting access.
                           </p>
                           <ul className="space-y-3">
                                {[
                                    "Active members: Access granted instantly",
                                    "Expired members: Access denied automatically",
                                    "Unknown profiles: Alert sent, quick sync triggered"
                                ].map((item, idX) => (
                                    <li key={idX} className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                        <div className="w-1 h-1 rounded-full bg-purple-600" /> {item}
                                    </li>
                                ))}
                           </ul>
                        </div>

                        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-purple-600/20 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group aura-box">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 blur-3xl group-hover:bg-cyan-600/10 transition-colors" />
                           <div className="flex items-center gap-3 mb-6">
                               <Zap className="w-5 h-5 text-cyan-400" />
                               <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-200">Real-Time Verification</span>
                           </div>
                           <p className="text-sm text-gray-400 leading-relaxed mb-8">
                               Every recognition attempt is verified against the cloud database in real-time. Membership status, expiry dates, and access permissions are checked instantly before unlocking the door.
                           </p>
                           <ul className="space-y-3">
                                {[
                                    "Cloud verification in <500ms",
                                    "Offline cache for WiFi drops",
                                    "Automatic sync when connection returns"
                                ].map((item, idX) => (
                                    <li key={idX} className="flex items-center gap-3 text-xs font-bold text-gray-300">
                                        <div className="w-1 h-1 rounded-full bg-cyan-500" /> {item}
                                    </li>
                                ))}
                           </ul>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* The Story Section */}
            <motion.div variants={itemVariants} className="mb-24 mt-24 overflow-hidden px-6">
                <div className="text-center mb-16">
                  <motion.div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-8">
                    THE STORY
                  </motion.div>
                  <h2 className="text-4xl md:text-7xl font-black tracking-widest uppercase font-mono leading-[1] mb-8">
                    Built from <span className="text-purple-600 italic">Scratch</span>
                  </h2>
                  <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-3xl mx-auto mb-16">
                    From concept to production. Every line of code, every component, every feature—designed and built by our R&D team.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                   {[
                     { date: "October 2025", title: "First Prototype", desc: "Initial R&D build. Basic biometric reading. Cloud integration. First successful door unlock test.", icon: Cpu },
                     { date: "December 2025", title: "Recognition Engine", desc: "Optimized face and finger recognition. Achieved sub-second response time with high-precision arrays.", icon: ScanFace },
                     { date: "February 2026", title: "Cloud Scale Sync", desc: "Integrated enterprise-grade cloud lookup. Real-time telemetry and management portal finalized.", icon: RefreshCcw },
                     { date: "R&D Driven", title: "In-House Excellence", desc: "Every feature is tested, optimized, and built by our R&D team. No 3rd party black-boxes.", icon: Settings }
                   ].map((item, i) => (
                     <motion.div 
                       key={i}
                       className="relative bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] flex flex-col gap-8 aura-box group"
                     >
                        <div className="flex justify-between items-start">
                           <div className="w-16 h-16 rounded-3xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(147,51,234,0.1)]">
                              <item.icon className="w-8 h-8" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600 opacity-50 px-4 py-1.5 rounded-full border border-purple-600/20 bg-purple-600/5">{item.date}</span>
                        </div>
                        <div>
                           <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white leading-none">{item.title}</h3>
                           <p className="text-sm text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                        </div>
                     </motion.div>
                   ))}
                </div>
            </motion.div>

            {/* Technical Excellence Section */}
            <motion.div variants={itemVariants} className="mb-12 py-12 bg-[#050505] border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-600/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-600/50 to-transparent" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                   <div className="text-center mb-20">
                      <motion.div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-8">
                        TECHNICAL EXCELLENCE
                      </motion.div>
                      <h2 className="text-4xl md:text-7xl font-black tracking-widest uppercase font-mono leading-[1] mb-8">
                        Engineered for <span className="text-purple-600">Scale</span>
                      </h2>
                      <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-3xl mx-auto">
                        Behind the scenes: the technology that makes AURALOCK fast, reliable, and scalable. Built on the power of DUAL-CORE MCU architecture.
                      </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                      {[
                        { title: "ESP32", sub: "DUAL-CORE MCU", desc: "WiFi + Cloud Ready. 240MHz high-speed processing core.", icon: Cpu },
                        { title: "600KG", sub: "MAGNETIC SECURE", desc: "High-intensity electromagnetic locking system. Grade-A security.", icon: Lock },
                        { title: "O(1)", sub: "HASH MAP", desc: "Constant time lookup. Recognition in <1ms across 500+ users.", icon: Target },
                        { title: "FLASH", sub: "OFFLINE CACHE", desc: "Local database sync. Works 24/7 even without internet.", icon: WifiOff }
                      ].map((spec, i) => (
                        <motion.div 
                          key={i}
                          className="relative bg-black/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center text-center aura-box group"
                        >
                           <div className="w-12 h-12 rounded-2xl bg-purple-600/5 border border-purple-600/10 flex items-center justify-center text-purple-500/50 mb-6 group-hover:scale-110 transition-transform">
                              <spec.icon className="w-6 h-6" />
                           </div>
                           <h3 className="text-4xl font-black italic text-white mb-2">{spec.title}</h3>
                           <p className="text-[10px] font-black tracking-[0.2em] text-purple-500 uppercase mb-4">{spec.sub}</p>
                           <p className="text-xs text-gray-500 font-bold leading-relaxed">{spec.desc}</p>
                        </motion.div>
                      ))}
                   </div>

                   {/* Performance Benchmarks */}
                   <div className="bg-[#0a0a0a] border border-white/5 p-12 md:p-20 rounded-[4rem] text-center aura-box relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent pointer-events-none" />
                      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 relative">Performance <span className="text-purple-600">Benchmarks</span></h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                         <div className="space-y-4">
                            <p className="text-5xl md:text-7xl font-black text-purple-600 tracking-tighter">&lt;1ms</p>
                            <div>
                               <p className="text-xl font-black uppercase text-white">Recognition Lookup</p>
                               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Hash-map O(1) access</p>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <p className="text-5xl md:text-7xl font-black text-white tracking-tighter">300-500ms</p>
                            <div>
                               <p className="text-xl font-black uppercase text-white">Detection Time</p>
                               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">From scan to authenticate</p>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <p className="text-5xl md:text-7xl font-black text-purple-600 tracking-tighter">~8s</p>
                            <div>
                               <p className="text-xl font-black uppercase text-white">Cloud Sync</p>
                               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">500+ member full sync</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            </motion.div>
            {/* Made in India Pride Section */}
            <motion.div variants={itemVariants} className="mb-8 py-12 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                   <div className="relative z-10">
                      <motion.div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-xs font-black tracking-[0.2em] uppercase mb-10 shadow-[0_0_30px_rgba(217,119,6,0.1)]">
                        <CheckCircle2 className="w-4 h-4" /> Made in India
                      </motion.div>
                      
                      <h2 className="text-4xl md:text-[64px] font-black tracking-tighter uppercase leading-[0.9] mb-8 max-w-2xl">
                         Secure. Reliable.<br/>
                         <span className="text-amber-600 italic">Built in Chandigarh.</span>
                      </h2>
                      
                      <p className="text-gray-400 font-medium text-lg leading-relaxed mb-12 max-w-xl">
                         We don't just assemble; we engineer. From PCB design to firmware coding, every aspect of AURALOCK is developed in-house by <span className="text-white">Englabs' R&D team.</span>
                      </p>
                      
                      <ul className="space-y-6">
                         {[
                           "100% In-House R&D",
                           "Custom-Built to Your Needs",
                           "Engineered with Pride in Chandigarh"
                         ].map((point, pIdx) => (
                           <li key={pIdx} className="flex items-center gap-4 text-sm font-bold text-gray-200">
                             <div className="w-2 h-2 rounded-full bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.5)]" />
                             {point}
                           </li>
                         ))}
                      </ul>
                   </div>
                   
                   <div className="relative">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-[#0a0a0a] to-[#020202] border border-amber-600/20 p-16 rounded-[4rem] text-center aura-box shadow-2xl relative group overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 w-48 h-48 bg-amber-600/5 blur-[60px] group-hover:bg-amber-600/10 transition-colors" />
                         <div className="relative z-10">
                            <p className="text-[120px] font-black text-white leading-none tracking-tighter mb-4">IN</p>
                            <p className="text-6xl font-black text-amber-600 leading-none mb-4">100%</p>
                            <p className="text-lg font-bold text-gray-400 uppercase tracking-[0.2em]">In-House R&D</p>
                         </div>
                      </motion.div>
                      
                      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-600/10 blur-3xl rounded-full" />
                      <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-600/10 blur-3xl rounded-full" />
                   </div>
                </div>
            </motion.div>
            {/* Limited Availability CTA Section */}
            <motion.div variants={itemVariants} className="mb-12 py-12 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent pointer-events-none" />
                
                <div className="max-w-4xl mx-auto relative z-10">
                   <motion.div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-10">
                      LIMITED AVAILABILITY
                   </motion.div>
                   
                   <h2 className="text-5xl md:text-8xl font-black tracking-widest uppercase font-mono leading-[1] mb-10">
                      Transform Your <span className="text-purple-600">Access Control</span> Today
                   </h2>
                   
                   <p className="text-gray-400 font-medium text-lg leading-relaxed mb-16 max-w-2xl mx-auto">
                      Join forward-thinking businesses using AURALOCK. Get a custom solution designed for your needs. <br/>
                      <span className="text-gray-500 text-sm mt-4 block uppercase font-black tracking-widest">Fast setup. Expert support. Built in India. Ready to deploy.</span>
                   </p>
                   
                   <div className="flex flex-col md:flex-row gap-6 justify-center mb-24">
                      <motion.a 
                        href="https://wa.me/919878407934?text=Hi, I am interested in AuraLock biometric solutions for my facility."
                        target="_blank"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-10 py-6 rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)] group"
                      >
                         <MessageCircle className="w-5 h-5" /> Get Started on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </motion.a>
                      
                      <motion.a 
                        href="mailto:barrydeveloperindia@gmail.com?subject=AuraLock Inquiry&body=Hi, I would like to request a quote for my facility."
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-3 bg-transparent border border-white/10 hover:border-white/30 text-white px-10 py-6 rounded-full text-sm font-black uppercase tracking-widest transition-all"
                      >
                         <FileText className="w-5 h-5" /> Request a Quote
                      </motion.a>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: "Custom Built", desc: "Tailored to Your Needs", icon: CheckCircle2 },
                        { title: "Fast Setup", desc: "Deploy in Days", icon: Zap },
                        { title: "Expert Support", desc: "Always Available", icon: MessageCircle }
                      ].map((item, idX) => (
                        <div key={idX} className="bg-black/20 border border-white/5 p-8 rounded-[2rem] aura-box flex flex-col items-center group">
                           <div className="w-12 h-12 rounded-2xl bg-purple-600/5 flex items-center justify-center text-purple-600/50 mb-6 group-hover:scale-110 transition-transform">
                              <item.icon className="w-6 h-6" />
                           </div>
                           <h4 className="text-xl font-black uppercase text-white mb-2">{item.title}</h4>
                           <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{item.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
            </motion.div>

            {/* Final Contact Hub Section */}
            <motion.div variants={itemVariants} className="py-12 px-6 border-t border-white/5 bg-[#020202]">
                <div className="max-w-4xl mx-auto text-center mb-24">
                   <h2 className="text-4xl md:text-7xl font-black tracking-widest uppercase font-mono leading-[1] mb-10">
                      Ready to <span className="text-purple-600">Upgrade</span> Your Access Control?
                   </h2>
                   
                   <p className="text-gray-400 font-medium text-lg leading-relaxed mb-16 max-w-2xl mx-auto">
                      Get a custom solution for your gym, library, office, or facility. Our team designs the perfect biometric door management system for you.
                   </p>
                   
                   <div className="flex flex-col md:flex-row gap-6 justify-center">
                      <motion.a 
                        href="https://wa.me/919878407934?text=Hi, I want a custom biometric access solution for my facility."
                        target="_blank"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-3 bg-[#111111] border border-white/10 hover:border-purple-600/50 text-white px-10 py-6 rounded-full text-sm font-black uppercase tracking-widest transition-all group"
                      >
                         <MessageCircle className="w-5 h-5 text-[#25D366]" /> WhatsApp Sales <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </motion.a>
                      
                      <motion.a 
                        href="mailto:barrydeveloperindia@gmail.com?subject=Quote Request&body=Hi, I am interested in a biometric solution for my facility."
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-3 bg-transparent border border-white/10 hover:border-white/30 text-white px-10 py-6 rounded-full text-sm font-black uppercase tracking-widest transition-all"
                      >
                         <FileText className="w-5 h-5 text-gray-400" /> Email for Quote
                      </motion.a>
                   </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                   {[
                     { label: "SALES & ORDERS", value: "barrydeveloperindia@gmail.com", href: "mailto:barrydeveloperindia@gmail.com" },
                     { label: "SUPPORT ONLY", value: "support@englabs.co.in", href: "mailto:support@englabs.co.in" },
                     { label: "WHATSAPP", value: "+91 98784 07934", href: "https://wa.me/919878407934" }
                   ].map((contact, cIdx) => (
                     <div key={cIdx} className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[2.5rem] aura-box group">
                        <p className="text-[10px] font-black tracking-[0.3em] text-purple-600 mb-4">{contact.label}</p>
                        <a href={contact.href} target="_blank" className="text-sm sm:text-base lg:text-lg font-bold text-white group-hover:text-purple-400 transition-colors break-all">{contact.value}</a>
                     </div>
                   ))}
                </div>
            </motion.div>

          </motion.div>
        )}

        {/* Product Catalog Tab */}
        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-5xl font-black tracking-widest uppercase font-mono leading-none mb-6">Hardware <span className="text-purple-600">Inventory</span></h2>
                <p className="text-gray-400 font-medium">Select your grade of security deployment.</p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="SEARCH SECURITY SKUs..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-purple-600 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => { setSelectedProduct(product); setCurrentGalleryIndex(0); }}
                  className="group relative bg-[#0a0a0a] rounded-[2rem] hover:shadow-[0_0_50px_rgba(147,51,234,0.3)] transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl"
                >
                  {/* The Running Coloured Border */}
                  <div className="absolute inset-0 z-0 pointer-events-none rounded-[2rem] overflow-hidden">
                    <div className="absolute left-1/2 top-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_75%,#8b5cf6_85%,#06b6d4_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-[#0a0a0a] group-hover:bg-black transition-colors" />
                  </div>

                  <div className="relative z-10 w-full h-full p-6 flex flex-col">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 blur-[30px] rounded-full group-hover:bg-purple-600/10 transition z-0" />
                    
                    <div className="h-44 mb-6 flex items-center justify-center relative z-20">
                      {product.image || product.images?.[0] ? (
                        <img src={product.image || product.images[0]} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition duration-700 drop-shadow-[0_20px_40px_rgba(147,51,234,0.2)]" />
                      ) : (
                        <Lock className="w-16 h-16 text-gray-800" />
                      )}
                    </div>
                    
                    <div className="relative z-20 mt-auto">
                      <div className="flex justify-between items-start mb-3">
                         <div>
                           <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Aura SKU: {product.id.slice(-4).toUpperCase()}</p>
                           <h3 className="text-xl font-black italic uppercase tracking-tighter">{product.name}</h3>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-6">
                         <span className="text-2xl font-black text-purple-500">₹{Number(product.price).toLocaleString('en-IN')}</span>
                      </div>

                      <button className="w-full py-3 text-sm bg-white text-black font-black uppercase font-mono tracking-widest rounded-xl hover:bg-purple-600 hover:text-white transition duration-500 relative z-30">
                        View Specifications
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-[#0a0a0a] border border-white/10 rounded-[3.5rem] p-12 text-center relative overflow-hidden"
            >
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full" />
               
               <div className="relative z-10">
                 <div className="w-20 h-20 rounded-3xl bg-purple-600/20 border border-purple-600/30 flex items-center justify-center text-purple-600 mx-auto mb-10">
                   <Settings className="w-10 h-10 animate-spin-slow" />
                 </div>
                 
                 <h2 className="text-5xl font-black tracking-widest uppercase font-mono leading-none mb-8">Intelligence <span className="text-purple-600">Support</span></h2>
                 
                 <p className="text-gray-400 font-medium leading-relaxed max-w-xl mx-auto mb-16">
                   Establish a secure connection with our engineering team for deployment queries, bulk provisioning, or technical architectural support.
                 </p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16">
                    <div className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:border-purple-600/50 transition duration-500">
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Technical Gateway</p>
                       <p className="text-2xl font-black italic uppercase">support@auralock.io</p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:border-purple-600/50 transition duration-500">
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Secure Line</p>
                       <p className="text-2xl font-black italic uppercase">+91 94000 00000</p>
                    </div>
                 </div>

                 <button className="px-12 py-5 bg-white text-black font-black uppercase font-mono tracking-widest text-2xl rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-500">
                   Initialize Handshake
                 </button>
               </div>
            </motion.div>
          </div>
        )}

      </main>

      {/* Product Detail Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl max-h-[90vh] md:h-[85vh] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="w-full md:w-1/2 p-6 md:p-12 bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative group min-h-[250px]">
                {(() => {
                   const mediaLinks = [];
                   if (selectedProduct.video) mediaLinks.push({ url: selectedProduct.video, type: 'video' });
                   if (selectedProduct.images?.length > 0) {
                     mediaLinks.push(...selectedProduct.images.map((img: string) => ({ url: img, type: 'image' })));
                   } else if (selectedProduct.image) {
                     mediaLinks.push({ url: selectedProduct.image, type: 'image' });
                   }

                   if (mediaLinks.length === 0) return <Lock className="w-32 h-32 text-gray-800" />;

                   const current = mediaLinks[currentGalleryIndex] || mediaLinks[0];

                   return (
                     <>
                       {current.type === 'video' ? (
                         <video src={current.url} autoPlay loop muted playsInline className="max-w-full max-h-[40vh] md:max-h-[50vh] object-contain drop-shadow-[0_20px_50px_rgba(147,51,234,0.3)] rounded-2xl" />
                       ) : (
                         <img src={current.url} alt={selectedProduct.name} className="max-h-[40vh] md:max-h-[50vh] object-contain drop-shadow-[0_20px_50px_rgba(147,51,234,0.3)]" />
                       )}

                       {mediaLinks.length > 1 && (
                         <>
                           <button onClick={(e) => { e.stopPropagation(); setCurrentGalleryIndex((prev) => (prev - 1 + mediaLinks.length) % mediaLinks.length); }} className="absolute left-6 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-all opacity-0 group-hover:opacity-100 z-50">
                             <ChevronLeft className="w-6 h-6" />
                           </button>
                           <button onClick={(e) => { e.stopPropagation(); setCurrentGalleryIndex((prev) => (prev + 1) % mediaLinks.length); }} className="absolute right-6 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-all opacity-0 group-hover:opacity-100 z-50">
                             <ChevronRight className="w-6 h-6" />
                           </button>
                         </>
                       )}
                     </>
                   );
                })()}
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col h-full max-h-[90vh] md:max-h-[85vh]">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[9px] font-black tracking-widest uppercase mb-4 w-fit">
                     Precision Engineering
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-widest uppercase font-mono leading-none mb-6">{selectedProduct.name}</h2>
                </div>
                
                <div className="flex-1 min-h-[50px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                   <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
                     {selectedProduct.description || "Hardware designed for high-security environments. Features autonomous AI verification, AES-encrypted communication paths."}
                   </p>
                   <div className="space-y-3 pb-4">
                      {selectedProduct.features && Array.isArray(selectedProduct.features) && selectedProduct.features.length > 0 ? selectedProduct.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 text-xs md:text-sm font-bold text-gray-300">
                           <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" /> <span className="flex-1">{f}</span>
                        </div>
                      )) : (
                        <div className="flex items-start gap-3 text-xs md:text-sm font-bold text-gray-300">
                           <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" /> <span className="flex-1">Industrial grade durability and AES encryption.</span>
                        </div>
                      )}
                   </div>
                </div>
                
                <div className="flex-shrink-0 pt-6 border-t border-white/5 mt-4">
                   <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fixed MSRP</p>
                        <p className="text-4xl font-black text-white">₹{Number(selectedProduct.price).toLocaleString('en-IN')}</p>
                      </div>
                   </div>
                   <Link href={`/checkout?productId=${selectedProduct.id}&name=${encodeURIComponent(selectedProduct.name)}&price=${selectedProduct.price}`} className="w-full py-5 bg-purple-600 text-white font-black uppercase font-mono tracking-widest text-xl rounded-2xl flex items-center justify-center gap-3 hover:bg-purple-500 transition shadow-[0_10px_30px_rgba(147,51,234,0.3)]">
                      Order Unit Now <ArrowRight className="w-6 h-6" />
                   </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-8 border-t border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-3xl font-black tracking-widest uppercase font-mono mb-8">Aura<span className="text-purple-600">Lock</span></div>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.5em] mb-12">Building the future of architectural security</p>
          <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
             <Link href="/admin" className="hover:text-purple-600 transition">Control Center</Link>
             <Link href="/track" className="hover:text-purple-600 transition">Telemetry</Link>
             <button onClick={() => setActiveTab('contact')} className="hover:text-purple-600 transition">Direct Line</button>
          </div>
          <div className="mt-20 text-[10px] font-bold text-gray-800 uppercase tracking-widest">&copy; 2026 AuraLock Security Systems. All Rights Protocolized.</div>
        </div>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        
        .aura-glow {
          background: conic-gradient(from 0deg at 50% 50%, #8b5cf6, #ec4899, #06b6d4, #10b981, #8b5cf6);
          filter: blur(40px);
          animation: rotate-aura 6s linear infinite;
        }

        @keyframes rotate-aura {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .aura-box {
          position: relative;
        }

        .aura-box::before {
          content: '';
          position: absolute;
          inset: -1px;
          padding: 1px;
          border-radius: inherit;
          background: linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #10b981, #8b5cf6);
          background-size: 200% auto;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.1;
          transition: opacity 0.5s;
          animation: shimmer 4s linear infinite;
        }

        .aura-box:hover::before {
          opacity: 1;
        }

        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.8s ease-out forwards; }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

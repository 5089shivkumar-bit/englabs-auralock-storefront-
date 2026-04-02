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
  Grid3X3,
  Home as HomeIcon,
  Navigation,
  Volume2,
  Scan,
  Dumbbell,
  Building2,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  if (!mounted) return <div className="min-h-screen bg-black" />;

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
            <span className="text-[7px] font-bold tracking-[0.2em] text-gray-500 uppercase ml-0.5">by Code4uTech</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <button onClick={() => setActiveTab('home')} className={`hover:text-white transition ${activeTab === 'home' ? 'text-purple-500' : ''}`}>Home</button>
          <button onClick={() => setActiveTab('products')} className={`hover:text-white transition ${activeTab === 'products' ? 'text-purple-500' : ''}`}>X1 Series</button>
          <Link href="/developers" className="hover:text-white transition">Developers</Link>
          <Link href="/legal" className="hover:text-white transition">Legal</Link>
        </div>

        <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] transition-all duration-300 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white">
             <Volume2 className="w-2.5 h-2.5" />
          </div>
          Sales
        </button>
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
                    Code4uTech IoT Project • R&D Division
                 </div>
               </motion.div>

               {/* The AuraBox - Main Hero Element */}
               <div className="relative z-10 w-full max-w-2xl px-6">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1.2, ease: "easeOut" }}
                   className="relative rounded-[2.5rem] p-[1px] text-center overflow-hidden group shadow-2xl"
                 >
                    {/* Animated Gradient Border Layer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-green-400 to-cyan-500 opacity-40 group-hover:opacity-80 transition-opacity duration-1000 animate-pulse" />
                    <div className="relative bg-black/80 backdrop-blur-3xl rounded-[2.5rem] p-16 md:p-24 z-20">
                    
                    <div className="relative z-20">
                      <h1 className="text-5xl md:text-8xl font-black tracking-widest uppercase font-mono text-white mb-6 drop-shadow-2xl">
                        AuraLock S1
                      </h1>
                      
                      <div className="flex flex-col gap-1">
                        <p className="text-lg md:text-xl text-gray-400 font-bold tracking-tight uppercase">
                          Smart Access Series
                        </p>
                        <p className="text-[10px] md:text-xs text-indigo-400 font-black tracking-[0.4em] uppercase opacity-70">
                          by Code4uTech
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
                   className="group relative p-8 bg-[#0a0a0a] border border-white/5 rounded-[2rem] hover:border-purple-600/50 transition duration-500 overflow-hidden shadow-xl"
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
                     className={`group relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#020202] p-8 rounded-[2rem] border border-white/5 transition-all duration-300 hover:border-white/20 shadow-xl ${useCase.glow}`}
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

            {/* Digital Experience Showcase */}
            <motion.div variants={itemVariants} className="mb-10">
               <div className="text-center mb-16">
                 <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[10px] font-black tracking-widest uppercase mb-6">
                   Digital Interface
                 </motion.div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase font-mono leading-[1.1] mb-6">
                   Control Every Entry.<br/>
                   <span className="text-purple-600">In Real Time.</span>
                 </h2>
                 <p className="text-gray-400 font-medium max-w-2xl mx-auto">
                   Monitor access, manage users, and track activity — all from your phone.
                 </p>
               </div>

               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  
                  {/* App Screen 1: Splash */}
                  <motion.div whileHover={{ y: -10 }} className="relative bg-gradient-to-br from-[#f0f9ff] via-[#ffffff] to-[#e0f2fe] rounded-[2.5rem] p-6 h-[600px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-gray-800">
                    <div className="absolute top-6 right-6 flex gap-2">
                       <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                       <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <h3 className="text-4xl font-black text-black leading-tight mt-10 mb-10 tracking-tighter">
                      Smart <br/> Door Lock <br/> System
                    </h3>
                    
                    <div className="relative w-full h-80 bg-gradient-to-b from-gray-100 to-gray-300 rounded-3xl overflow-hidden flex items-center justify-center border border-gray-200">
                       <div className="flex gap-4">
                          <div className="w-16 h-48 bg-black rounded-xl border border-gray-700 relative shadow-2xl flex flex-col items-center mt-10">
                             <div className="w-full h-1/2 border-b border-gray-800 flex items-center justify-center opacity-50" />
                          </div>
                          <div className="w-20 h-56 bg-[#1a1a1a] rounded-xl border border-gray-700 relative shadow-2xl flex flex-col items-center">
                             <div className="w-full h-1/3 border-b border-gray-800 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full border border-gray-700 bg-gray-900" />
                             </div>
                             <div className="w-full h-2/3 flex items-center justify-center">
                                <Lock className="w-6 h-6 text-gray-500" />
                             </div>
                          </div>
                       </div>

                       <div className="absolute right-2 top-1/3 bg-[#0d3b66]/100 text-white text-[9px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-md">
                          <Volume2 className="w-3 h-3" /> Sound Detected
                       </div>
                       <div className="absolute left-2 bottom-10 bg-[#0d3b66]/100 text-white text-[9px] font-bold px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg backdrop-blur-md">
                          <Scan className="w-3 h-3" /> Human Motion
                       </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 h-16 bg-gray-200/50 backdrop-blur-xl border border-white/50 rounded-full flex items-center p-1 shadow-lg">
                       <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                          <ChevronRight className="w-6 h-6 text-black" />
                       </div>
                       <span className="flex-1 text-center font-bold text-gray-800 text-xs">Get Started <span className="opacity-50">&gt;&gt;&gt;</span></span>
                    </div>
                  </motion.div>

                  {/* App Screen 2: Dashboard */}
                  <motion.div whileHover={{ y: -10 }} className="relative bg-[#111315] rounded-[3rem] p-6 h-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-8 border-gray-700 flex flex-col">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl shadow-inner z-20" />
                     
                     <div className="flex justify-between items-center mb-6 mt-3">
                       <div className="w-10 h-10 bg-[#1c2125] rounded-full flex items-center justify-center shadow-inner border border-white/5">
                         <Grip className="w-4 h-4 text-gray-300" />
                       </div>
                       <div className="px-4 py-2 bg-white rounded-full text-black text-[10px] font-bold flex items-center gap-2 shadow-sm">
                         Ground <ChevronDown className="w-3 h-3" />
                       </div>
                     </div>

                     <div className="flex gap-2 mb-2">
                       <div className="px-3 py-1.5 bg-[#1c2125] text-gray-300 text-[9px] font-bold rounded-full border border-white/5 flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-cyan-400" /> Wi-Fi Connected
                       </div>
                     </div>
                     <div className="flex gap-2 mb-6">
                       <div className="px-3 py-1.5 bg-[#1c2125] text-gray-300 text-[9px] font-bold rounded-full border border-white/5 flex items-center gap-2 max-w-fit">
                         <Battery className="w-3 h-3 text-cyan-400" /> 80%
                       </div>
                     </div>

                     <div className="flex justify-between items-start mb-6">
                        <div className="mt-2">
                          <h3 className="text-3xl font-black text-white leading-none mb-2 tracking-tighter">Main <br/>Door Lock</h3>
                          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2">185 G Gate</p>
                          
                          <div className="flex gap-3 mt-6">
                             <div className="w-10 h-10 rounded-full bg-[#1c2125] flex items-center justify-center text-gray-300 shadow-inner border border-white/5">
                                <Video className="w-4 h-4" />
                             </div>
                             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-sm">
                                <Mic className="w-4 h-4" />
                             </div>
                          </div>
                        </div>

                        <div className="w-16 h-48 bg-[#1a1a1a] rounded-xl border border-gray-700 shadow-2xl flex flex-col items-center py-2 relative overflow-hidden -mt-16">
                          <div className="absolute inset-y-0 right-0 w-1/3 bg-white/5 border-l border-white/10" />
                          <div className="w-12 h-10 border border-gray-800 rounded bg-gray-900 mb-1 z-10" />
                          <div className="w-12 h-24 border border-gray-800 rounded bg-gray-900 flex flex-col items-center justify-center p-1 gap-2 z-10">
                            <div className="grid grid-cols-3 gap-1">
                               {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-gray-600 rounded-full" />)}
                            </div>
                            <div className="w-3.5 h-3.5 border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] rounded-full mt-2" />
                          </div>
                        </div>
                     </div>

                     <div className="h-14 bg-[#1c2125] border border-white/5 rounded-full flex items-center justify-between p-1.5 shadow-inner mb-6 relative">
                        <div className="w-11 h-11 bg-[#0dcaf0] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(13,202,240,0.5)] z-10 text-black">
                           <Unlock className="w-4 h-4" />
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center text-gray-600 font-black tracking-[0.2em] text-[10px]">
                           &gt;&gt;&gt;
                        </div>
                        <div className="w-11 h-11 bg-transparent rounded-full flex items-center justify-center z-10 text-gray-500">
                           <Lock className="w-4 h-4" />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-[#1c2125] border border-white/5 rounded-[1.5rem] p-4 flex flex-col justify-between h-24 shadow-inner">
                           <Key className="w-5 h-5 text-gray-300" />
                           <span className="text-[10px] font-bold text-gray-400 mt-2">Send Key</span>
                        </div>
                        <div className="bg-[#1c2125] border border-white/5 rounded-[1.5rem] p-4 flex flex-col justify-between h-24 shadow-inner">
                           <Grid3X3 className="w-5 h-5 text-gray-300" />
                           <span className="text-[10px] font-bold text-gray-400 mt-2">Send Code</span>
                        </div>
                     </div>

                     <div className="absolute bottom-6 left-6 right-6 h-14 bg-[#1a1f24] border border-white/5 rounded-full flex items-center justify-around px-4 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
                        <div className="w-9 h-9 bg-[#0dcaf0] rounded-full flex items-center justify-center text-black shadow-[0_0_10px_rgba(13,202,240,0.4)]">
                          <HomeIcon className="w-4 h-4" />
                        </div>
                        <Navigation className="w-5 h-5 text-gray-500" />
                        <Bell className="w-5 h-5 text-gray-500" />
                        <Settings className="w-5 h-5 text-gray-500" />
                     </div>
                  </motion.div>

                  {/* App Screen 3: Floor Plan */}
                  <motion.div whileHover={{ y: -10 }} className="relative bg-gray-900 rounded-[2.5rem] h-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-gray-800 overflow-hidden flex flex-col p-6">
                     <div className="absolute inset-0 bg-[#0f172a] mix-blend-multiply opacity-50" />
                     <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                        <div className="absolute top-[20%] left-[10%] w-[40%] h-[30%] border-[3px] border-gray-700 bg-gray-800/40 backdrop-blur-sm rounded" />
                        <div className="absolute top-[20%] right-[10%] w-[35%] h-[40%] border-[3px] border-gray-700 bg-gray-800/40 backdrop-blur-sm rounded" />
                        <div className="absolute bottom-[25%] left-[20%] w-[60%] h-[30%] border-[3px] border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded" />
                        <div className="absolute bottom-[25%] left-[60%] w-10 h-10 border-2 border-purple-600 rounded-full opacity-50" />
                     </div>

                     <div className="relative z-10 flex justify-between items-center mb-6">
                       <h3 className="text-3xl font-black text-white tracking-tighter">All Locks</h3>
                       <div className="px-4 py-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-bold flex items-center gap-2 shadow-sm">
                         Ground <ChevronDown className="w-4 h-4" />
                       </div>
                     </div>

                     <div className="relative z-10 flex-1">
                        <div className="absolute top-10 left-10 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                           <Lock className="w-6 h-6 text-gray-800" />
                        </div>
                        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                           <Lock className="w-6 h-6 text-gray-800" />
                        </div>

                        <div className="absolute top-1/4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl flex items-center gap-3 shadow-xl">
                           <div className="w-8 h-12 bg-black rounded-lg border border-gray-700" />
                           <div>
                              <p className="text-[10px] font-bold text-white leading-tight">Bedroom<br/>Door Lock</p>
                              <p className="text-[8px] text-gray-300 mt-1">Battery: 82%</p>
                           </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-40 bg-gray-500/30 backdrop-blur-xl border border-white/20 rounded-[2rem] flex flex-col items-center justify-between p-2 shadow-2xl">
                           <div className="w-12 h-12 bg-[#0ea5e9] rounded-full flex items-center justify-center shadow-md shadow-sky-500/50">
                              <Unlock className="w-5 h-5 text-white" />
                           </div>
                           <div className="flex flex-col items-center text-white/50 -my-2 space-y-[-6px]">
                               <ChevronDown className="w-5 h-5" />
                               <ChevronDown className="w-5 h-5" />
                           </div>
                           <div className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center">
                               <Lock className="w-5 h-5 text-white/70" />
                           </div>
                        </div>
                     </div>

                     <div className="relative z-10 h-16 bg-gray-900/60 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-around px-4 mt-auto">
                        <HomeIcon className="w-6 h-6 text-gray-400" />
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0ea5e9] shadow-lg">
                          <Navigation className="w-6 h-6" />
                        </div>
                        <Bell className="w-6 h-6 text-gray-400" />
                        <Settings className="w-6 h-6 text-gray-400" />
                     </div>
                  </motion.div>
                  
               </div>
            </motion.div>

            {/* TRUST INDICATORS */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="relative overflow-hidden py-24 mt-12 w-full"
            >
               <div className="absolute inset-0 bg-[#020202]/10 z-0"></div>
               <div className="absolute inset-y-0 w-1/4 left-0 bg-gradient-to-r from-[#020202]/80 to-transparent z-0"></div>
               <div className="absolute inset-y-0 w-1/4 right-0 bg-gradient-to-l from-[#020202]/80 to-transparent z-0"></div>
               <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent z-0"></div>
               <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#020202]/90 to-transparent z-0"></div>

               <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                  <div className="px-8 py-4 flex flex-col items-center justify-center group">
                     <h4 className="text-xl font-black text-white uppercase tracking-widest mb-3 shadow-black drop-shadow-lg">Made in India</h4>
                     <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">Engineered and manufactured domestically for uncompromised quality and scale.</p>
                  </div>
                  <div className="px-8 py-4 flex flex-col items-center justify-center group">
                     <div className="w-16 h-16 bg-purple-600/10 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-purple-600/30 group-hover:-translate-y-2 transition-transform duration-500 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
                        <ShieldCheck className="w-8 h-8 text-purple-500" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-widest mb-3 shadow-black drop-shadow-lg">Secure Biometrics</h4>
                     <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">AES-256 encrypted facial recognition and structural fingerprint data arrays.</p>
                  </div>
                  <div className="px-8 py-4 flex flex-col items-center justify-center group">
                     <div className="w-16 h-16 bg-sky-500/10 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-sky-500/30 group-hover:-translate-y-2 transition-transform duration-500 shadow-[0_0_30px_rgba(14,165,233,0.2)]">
                        <Users className="w-8 h-8 text-sky-500" />
                     </div>
                     <h4 className="text-xl font-black text-white uppercase tracking-widest mb-3 shadow-black drop-shadow-lg">10,000+ Deployments</h4>
                     <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">Trusted by elite enterprises, boutique gyms, and architectural homeowners.</p>
                  </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => { setSelectedProduct(product); setCurrentGalleryIndex(0); }}
                  className="group relative bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] hover:border-purple-600/50 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-[40px] rounded-full group-hover:bg-purple-600/10 transition" />
                  
                  <div className="h-64 mb-8 flex items-center justify-center">
                    {product.image || product.images?.[0] ? (
                      <img src={product.image || product.images[0]} alt={product.name} className="max-h-full object-contain group-hover:scale-110 transition duration-700 drop-shadow-[0_20px_40px_rgba(147,51,234,0.2)]" />
                    ) : (
                      <Lock className="w-20 h-20 text-gray-800" />
                    )}
                  </div>
                  
                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Aura SKU: {product.id.slice(-4).toUpperCase()}</p>
                         <h3 className="text-2xl font-black italic uppercase tracking-tighter">{product.name}</h3>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-8">
                       <span className="text-3xl font-black text-purple-500">₹{Number(product.price).toLocaleString('en-IN')}</span>
                    </div>

                    <button className="w-full py-4 bg-white text-black font-black uppercase font-mono tracking-widest rounded-xl group-hover:bg-purple-600 group-hover:text-white transition duration-500">
                      View Specifications
                    </button>
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
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl h-[90vh] md:h-auto rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 p-12 bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative group">
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
                         <video src={current.url} autoPlay loop muted playsInline className="max-w-full max-h-[50vh] object-contain drop-shadow-[0_20px_50px_rgba(147,51,234,0.3)] rounded-2xl" />
                       ) : (
                         <img src={current.url} alt={selectedProduct.name} className="max-h-[50vh] object-contain drop-shadow-[0_20px_50px_rgba(147,51,234,0.3)]" />
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

              <div className="w-full md:w-1/2 p-12 flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-500 text-[9px] font-black tracking-widest uppercase mb-6 w-fit">
                   Precision Engineering
                </div>
                <h2 className="text-5xl font-black tracking-widest uppercase font-mono leading-none mb-8">{selectedProduct.name}</h2>
                <div className="flex-1 space-y-6 overflow-y-auto pr-4 mb-8 custom-scrollbar">
                   <p className="text-gray-400 font-medium leading-relaxed">Hardware designed for high-security environments. Features autonomous AI verification, AES-encrypted communication paths.</p>
                   <div className="space-y-3">
                      {selectedProduct.features?.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                           <Check className="w-4 h-4 text-purple-600" /> {f}
                        </div>
                      ))}
                   </div>
                </div>
                <div className="pt-8 border-t border-white/5">
                   <div className="flex justify-between items-center mb-10">
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

      <footer className="py-12 border-t border-white/5 bg-[#020202]">
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

        .aura-box::before {
          content: '';
          position: absolute;
          inset: -3px;
          padding: 3px;
          border-radius: 2.5rem;
          background: linear-gradient(to right, #8b5cf6, #ec4899, #06b6d4, #10b981);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.3;
          transition: opacity 0.5s;
        }

        .aura-box:hover::before {
          opacity: 0.8;
        }

        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

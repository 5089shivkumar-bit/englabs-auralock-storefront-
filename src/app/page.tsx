"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  PlayCircle, 
  BrainCircuit, 
  SmartphoneNfc, 
  ThumbsUp, 
  Wrench, 
  Mail, 
  MapPin, 
  Phone,
  Search,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [settings, setSettings] = useState({ phone: '+91 98765 43210', email: 'support@englabs.in' });
  
  // Tab-based navigation so sections don't bleed into each other
  const [activeTab, setActiveTab] = useState("products");

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    // Check if splash has already been played in this browser session
    const splashPlayed = sessionStorage.getItem('englabs_splash_played');
    
    if (splashPlayed) {
      setShowSplash(false);
    } else {
      // 3 second cinematic delay before revealing the true home page for the first time
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('englabs_splash_played', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
      
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] bg-[#020202] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-6xl font-black tracking-tight mb-6 flex items-center gap-3">
                 <span className="text-blue-500">Englabs</span>
                 <span className="text-white">Products</span>
              </div>
              <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ delay: 0.3, duration: 1.8, ease: "easeInOut" }}
                 className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full shadow-[0_0_20px_rgba(59,130,246,0.8)] mb-6"
              />
              <motion.p
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8, duration: 1 }}
                 className="text-gray-400 font-medium tracking-[0.3em] uppercase text-xs sm:text-sm"
               >
                 Initializing Secure Environment...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-600 selection:text-white transition-opacity duration-1000 flex flex-col ${showSplash ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
      
      {/* 1. Header Navigation */}
      <nav className="w-full p-6 lg:px-12 flex flex-col md:flex-row justify-between items-center border-b border-gray-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tight mb-4 md:mb-0 cursor-pointer" onClick={() => setActiveTab('home')}>
          <span className="text-blue-500">Englabs</span> Products
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400">
          <button onClick={() => setActiveTab('home')} className={`hover:text-white transition ${activeTab === 'home' ? 'text-blue-500 font-bold' : ''}`}>Home</button>
          <button onClick={() => setActiveTab('products')} className={`hover:text-white transition ${activeTab === 'products' ? 'text-blue-500 font-bold' : ''}`}>Products</button>
          <button onClick={() => setActiveTab('about')} className={`hover:text-white transition ${activeTab === 'about' ? 'text-blue-500 font-bold' : ''}`}>About</button>
          <Link href="/track" className="hover:text-white transition">Track Order</Link>
          <button onClick={() => setActiveTab('contact')} className={`hover:text-white transition ${activeTab === 'contact' ? 'text-blue-500 font-bold' : ''}`}>Contact</button>
        </div>
      </nav>

      {/* Conditionally Rendered Main Content Area */}
      <main className="flex-1 flex flex-col bg-black">

        {/* HOME & PRODUCTS TAB: Products Grid is now the foundational Hero */}
        {(activeTab === 'home' || activeTab === 'products') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col w-full flex-1 pb-10">
            <section className="pt-8 pb-24 bg-black flex-1 w-full max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology</h2>
                  <p className="text-gray-400 max-w-2xl">Discover the engineering marvels that protect your most valuable assets.</p>
                </div>
                <div className="relative w-full md:w-80">
                   <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                   <input 
                     type="text" 
                     placeholder="Search products..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                   />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.length === 0 ? (
                   <div className="col-span-full text-center py-20 text-gray-500 border border-gray-800 rounded-2xl bg-gray-900/30">
                     No products found matching your search.
                   </div>
                ) : (
                   filteredProducts.map((product) => (
                     <motion.div whileHover={{ y: -5 }} key={product.id} onClick={() => setSelectedProduct(product)} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col group hover:border-blue-500/50 transition cursor-pointer">
                       <div className="w-full h-64 bg-black relative flex items-center justify-center p-4">
                         {product.image || product.images?.[0] ? (
                           <img src={product.image || product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition duration-500" />
                         ) : (
                           <div className="text-gray-600 font-medium">No Image</div>
                         )}
                       </div>
                       <div className="p-6 flex flex-col flex-1">
                         <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                         <p className="text-sm text-gray-400 mb-6 flex-1 line-clamp-2">{product.features?.[0] || 'Next-generation smart security hardware.'}</p>
                         <div className="flex justify-between items-center mt-auto">
                           <span className="text-2xl font-bold text-blue-400">₹{Number(product.price).toLocaleString('en-IN')}</span>
                           <div className="flex gap-2">
                             <button className="bg-white text-black hover:bg-gray-200 px-4 py-2.5 rounded-lg font-bold text-sm transition shadow-[0_4px_14px_0_rgba(255,255,255,0.1)]">
                               Details
                             </button>
                             <Link href={`/product/${product.id}`} onClick={(e) => e.stopPropagation()} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-[0_4px_14px_0_rgba(59,130,246,0.3)]">
                               Buy Now
                             </Link>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   ))
                )}
              </div>
            </section>
          </motion.div>
        )}

        {/* ABOUT (Why Choose Us) TAB */}
        {(activeTab === 'home' || activeTab === 'about') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col pb-10 border-t border-gray-900 pt-24 mt-12">
            <section className="bg-transparent w-full max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-16">Why Choose Englabs?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
                <motion.div whileHover={{ y: -5 }} className="bg-black border border-gray-800 p-8 rounded-2xl">
                   <div className="bg-blue-600/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                     <BrainCircuit className="w-7 h-7 text-blue-500" />
                   </div>
                   <h3 className="text-xl font-bold mb-3">AI-Powered Security</h3>
                   <p className="text-gray-400 leading-relaxed text-sm">Our deeply integrated Gemini neural networks verify true human liveness, making photograph and 3D mask spoofing mathematically impossible.</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-black border border-gray-800 p-8 rounded-2xl">
                   <div className="bg-blue-600/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                     <SmartphoneNfc className="w-7 h-7 text-blue-500" />
                   </div>
                   <h3 className="text-xl font-bold mb-3">Instant Access & Monitoring</h3>
                   <p className="text-gray-400 leading-relaxed text-sm">Control your physical spaces globally. Generate OTPs, monitor battery levels, and receive realtime access telemetry straight from our secure cloud.</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-black border border-gray-800 p-8 rounded-2xl">
                   <div className="bg-blue-600/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                     <ThumbsUp className="w-7 h-7 text-blue-500" />
                   </div>
                   <h3 className="text-xl font-bold mb-3">Trusted by Thousands</h3>
                   <p className="text-gray-400 leading-relaxed text-sm">From luxury residential homes to robust enterprise startup hubs throughout India, Englabs represents absolute reliability.</p>
                </motion.div>

                <motion.div whileHover={{ y: -5 }} className="bg-black border border-gray-800 p-8 rounded-2xl">
                   <div className="bg-blue-600/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                     <Wrench className="w-7 h-7 text-blue-500" />
                   </div>
                   <h3 className="text-xl font-bold mb-3">Easy Installation & Support</h3>
                   <p className="text-gray-400 leading-relaxed text-sm">Designed for immediate retrofit. Our hardware drops cleanly into existing door frames, backed by responsive nationwide mechanical support.</p>
                </motion.div>
              </div>

              {/* FAQ Section */}
              <div className="mt-32 border-t border-gray-900 pt-20 max-w-4xl mx-auto text-left">
                <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="bg-black border border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-blue-500/50 transition">
                     <h4 className="text-lg font-bold mb-2">How long does the battery last?</h4>
                     <p className="text-gray-400 text-sm leading-relaxed">Englabs hardware operates on ultra-efficient power protocols. A standard set of AA batteries provides up to 12 months of constant usage. You will receive mobile app alerts when battery life drops below 20%.</p>
                  </div>
                  <div className="bg-black border border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-blue-500/50 transition">
                     <h4 className="text-lg font-bold mb-2">Can it be installed on existing doors?</h4>
                     <p className="text-gray-400 text-sm leading-relaxed">Yes. Our locks are meticulously engineered to retrofit seamlessly into 95% of standard Indian door frames without requiring any major carpentry or permanent structural modifications.</p>
                  </div>
                  <div className="bg-black border border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-blue-500/50 transition">
                     <h4 className="text-lg font-bold mb-2">What happens during a power or WiFi outage?</h4>
                     <p className="text-gray-400 text-sm leading-relaxed">Your secure environment remains completely operational. The lock operates entirely offline via AES-encrypted Bluetooth tokens and physical mechanical backup keys. WiFi is only required for remote IoT provisioning.</p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

      </main>

      {/* CONTACT FORM TAB */}
      {activeTab === 'contact' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col pb-24 pt-24 mt-4 flex-1 items-center justify-center">
          <section className="bg-transparent w-full max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Get in Touch</h2>
            <p className="text-gray-400 text-center mb-6 leading-relaxed">Have technical questions or need enterprise bulk pricing? Contact our engineering team directly.</p>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 text-gray-300 font-medium">
               <span className="flex items-center gap-2"><Phone className="w-5 h-5 text-blue-500"/> {settings.phone}</span>
               <span className="flex items-center gap-2"><Mail className="w-5 h-5 text-blue-500"/> {settings.email}</span>
            </div>
            
            <form className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-6 shadow-2xl" onSubmit={(e) => { e.preventDefault(); alert('Message successfully transmitted to the Englabs secure engineering team over TLS!'); }}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
                   <input required type="text" placeholder="Your Full Name" className="w-full bg-black border border-gray-800 p-4 rounded-xl mt-1 focus:border-blue-500 focus:outline-none transition text-white" />
                 </div>
                 <div>
                   <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                   <input required type="email" placeholder="Your Email Gateway" className="w-full bg-black border border-gray-800 p-4 rounded-xl mt-1 focus:border-blue-500 focus:outline-none transition text-white" />
                 </div>
               </div>
               <div>
                 <label className="text-sm font-medium text-gray-400 ml-1">Secure Message</label>
                 <textarea required rows={5} placeholder="How can our hardware solve your needs?" className="w-full bg-black border border-gray-800 p-4 rounded-xl mt-1 focus:border-blue-500 focus:outline-none transition text-white"></textarea>
               </div>
               <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                 Transmit Secure Message
               </button>
            </form>
          </section>
        </motion.div>
      )}

      {/* 5. Footer (Only if not purely inspecting Products) */}
      {(activeTab === 'home' || activeTab === 'contact') && (
        <footer className="border-t border-gray-900 bg-black pt-20 pb-10 mt-auto">
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                 <div className="text-2xl font-bold tracking-tight mb-4">
                   <span className="text-blue-500">Englabs</span> Products
                 </div>
                 <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
                   Engineering the future of access control and smart living. We merge premium hardware materials with bleeding-edge artificial intelligence.
                 </p>
                 <div className="flex gap-4">
                   <a href="#" className="font-bold text-gray-500 hover:text-blue-500 transition w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-sm">X</a>
                   <a href="#" className="font-bold text-gray-500 hover:text-blue-500 transition w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-sm">IG</a>
                   <a href="#" className="font-bold text-gray-500 hover:text-blue-500 transition w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-sm">FB</a>
                   <a href="#" className="font-bold text-gray-500 hover:text-blue-500 transition w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-sm">IN</a>
                 </div>
              </div>
              <div>
                 <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                 <ul className="space-y-3 text-gray-400">
                   <li><button onClick={() => setActiveTab('products')} className="hover:text-blue-400 transition">Our Products</button></li>
                   <li><Link href="/track" className="hover:text-blue-400 transition">Track Your Order</Link></li>
                   <li><Link href="/admin" className="hover:text-blue-400 transition">Partner Portal</Link></li>
                 </ul>
              </div>
              <div>
                 <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                 <ul className="space-y-4 text-gray-400">
                   <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-gray-600" /> Technology Park, India</li>
                   <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-gray-600" /> {settings.phone}</li>
                   <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-gray-600" /> {settings.email}</li>
                 </ul>
              </div>
           </div>
           <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-900 text-center text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Englabs India Pvt Ltd. All rights reserved. 
           </div>
        </footer>
      )}

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProduct(null)}
          >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               onClick={(e) => e.stopPropagation()}
               className="bg-[#0a0a0a] border border-gray-800 w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] shadow-2xl relative"
             >
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-[100] bg-black/80 hover:bg-black p-2 rounded-full border border-gray-800 text-gray-400 hover:text-white transition">
                   <X className="w-5 h-5" />
                </button>

                {/* Left: Image Gallery */}
                <div className="w-full md:w-1/2 bg-black flex flex-col items-center justify-start p-8 border-b md:border-b-0 md:border-r border-gray-800 relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                   {selectedProduct.images?.length > 0 || selectedProduct.image ? (
                     <div className="flex flex-col gap-6 w-full mt-8">
                       <img src={selectedProduct.images?.[0] || selectedProduct.image} alt="Main" className="w-full h-80 object-contain drop-shadow-2xl" />
                       {selectedProduct.images?.length > 1 && (
                          <div className="grid grid-cols-2 gap-4 w-full">
                            {selectedProduct.images.slice(1).map((img: string, i: number) => (
                              <img key={i} src={img} alt={`Gallery ${i}`} className="w-full h-32 object-cover rounded-xl border border-gray-800 bg-gray-900" />
                            ))}
                          </div>
                       )}
                     </div>
                   ) : (
                      <div className="text-gray-600 mt-20">No Image Available</div>
                   )}
                </div>

                {/* Right: Details & Checkout */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
                   <div className="uppercase tracking-widest text-blue-500 text-xs font-bold mb-4">Englabs Hardware</div>
                   <h2 className="text-4xl font-bold mb-4">{selectedProduct.name}</h2>
                   <p className="text-gray-400 leading-relaxed mb-8">
                     {selectedProduct.description || "The ultimate architectural smart lock. Engineered with multi-vector AI recognition to secure what matters most."}
                   </p>

                   <div className="space-y-4 mb-10 flex-1">
                     <h4 className="font-bold text-lg mb-2 border-b border-gray-800 pb-2">Technical Features</h4>
                     {selectedProduct.features && selectedProduct.features.length > 0 ? (
                       <ul className="space-y-3">
                         {selectedProduct.features.map((feature: string, idx: number) => (
                           <li key={idx} className="flex gap-3 text-gray-300 items-start">
                             <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                             <span>{feature.trim()}</span>
                           </li>
                         ))}
                       </ul>
                     ) : (
                       <p className="text-gray-500">No specific technical features listed.</p>
                     )}
                   </div>

                   <div className="border-t border-gray-800 pt-6 mt-auto">
                     <div className="text-sm text-gray-400 font-medium mb-1">Direct from Manufacturer</div>
                     <div className="text-4xl font-bold text-white mb-6">₹{Number(selectedProduct.price).toLocaleString('en-IN')}</div>
                     <div className="flex gap-4">
                       <Link href={`/checkout?productId=${selectedProduct.id}&name=${encodeURIComponent(selectedProduct.name)}&price=${selectedProduct.price}`} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-center py-4 rounded-xl font-bold text-lg transition shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                         Proceed to Checkout
                       </Link>
                     </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
    </>
  );
}

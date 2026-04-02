"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Phone, ShieldCheck } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Identity Verified. System Online. How can I assist with your deployment today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Simulated AI Intelligence for AuraLock
    setTimeout(() => {
      let response = "I'm analyzing your request against our security protocols. For specific deployment issues, please contact our Level 4 support team at support@auralock.io.";
      
      const lower = userMessage.toLowerCase();
      if (lower.includes("price") || lower.includes("cost")) {
        response = "AuraLock systems start at ₹14,500 for the Prime series. Prices vary based on architectural requirements and encryption mesh density.";
      } else if (lower.includes("track") || lower.includes("order")) {
        response = "To track your hardware, please provide your ORD-2026-XXXX identifier or visit the Telemetry section in the footer.";
      } else if (lower.includes("face") || lower.includes("lock")) {
        response = "Our systems use Liveness Detection technology to ensure spoof-proof entry. It works 24/7 even in zero-light environments.";
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[1000] w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_rgba(234,88,12,0.4)] border border-purple-500/50"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
            className="fixed bottom-28 right-8 z-[1000] w-[90vw] md:w-[400px] h-[600px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-600 to-orange-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase italic tracking-tighter text-white">Aura Intelligence</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest">Protocol 12 Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
            >
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    m.role === 'assistant' 
                      ? 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none' 
                      : 'bg-purple-600 text-white rounded-tr-none shadow-lg shadow-purple-600/20'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-black/40 border-t border-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Aura anything..."
                  className="w-full bg-[#111] border border-white/10 rounded-xl pl-5 pr-14 py-4 text-xs font-bold text-white focus:outline-none focus:border-purple-600 focus:shadow-[0_0_20px_rgba(234,88,12,0.1)] transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-500 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all">
                 <ShieldCheck className="w-4 h-4 text-white" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-white">Encrypted Handshake</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}} />
    </>
  );
}

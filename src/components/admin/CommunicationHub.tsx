"use client";
import React from "react";
import { MessageSquare, Send, PhoneCall, Check } from "lucide-react";

export default function CommunicationHub() {
  const messages = [
    { customer: "Aman V.", channel: "WhatsApp", message: "Deployment code received", status: "Delivered", time: "2m ago" },
    { customer: "Sarah K.", channel: "SMS", message: "OTP Verification Required", status: "Sent", time: "10m ago" },
    { customer: "John D.", channel: "WhatsApp", message: "Installation Scheduled", status: "Opened", time: "1h ago" }
  ];

  return (
    <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-xl">
       <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black italic uppercase italic tracking-tighter">Command <span className="text-orange-600">Hub</span></h3>
          <div className="px-4 py-2 bg-sky-600/10 border border-sky-600/20 text-sky-500 text-[10px] font-black uppercase tracking-widest rounded-full">
             Comm-Gateway: Active
          </div>
       </div>

       <div className="space-y-4">
          {messages.map((m, i) => (
             <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-sky-600/20 rounded-xl flex items-center justify-center text-sky-500">
                      <MessageSquare className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{m.customer} • {m.channel}</p>
                      <h4 className="text-sm font-black italic uppercase italic text-gray-200">{m.message}</h4>
                   </div>
                </div>
                
                <div className="text-right">
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{m.time}</p>
                   <div className="flex items-center gap-1 text-[10px] font-bold text-sky-400">
                      <Check className="w-3 h-3" /> {m.status}
                   </div>
                </div>
             </div>
          ))}
       </div>

       <button className="w-full mt-10 py-5 bg-white text-black font-black uppercase italic tracking-tighter text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-600 hover:text-white transition shadow-xl">
          Broadcast Alert <Send className="w-5 h-5" />
       </button>
    </div>
  );
}

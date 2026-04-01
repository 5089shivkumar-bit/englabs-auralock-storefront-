"use client";
import React from "react";
import { DollarSign, ArrowUp, ArrowDown, Activity } from "lucide-react";

export default function BillingSummary() {
  const metrics = [
    { label: "Gross Revenue", value: "₹4,12,000", trend: "+12.4%", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Net Margin", value: "₹2,84,000", trend: "+8.1%", color: "text-sky-500", bg: "bg-sky-500/10" },
    { label: "Avg Ticket", value: "₹18,500", trend: "-2.3%", color: "text-orange-500", bg: "bg-orange-500/10" }
  ];

  return (
    <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-xl">
       <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black italic uppercase italic tracking-tighter">Billing <span className="text-orange-600">Protocol</span></h3>
          <Activity className="w-6 h-6 text-orange-600 animate-pulse" />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
             <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 flex flex-col justify-center text-center group hover:bg-orange-600/5 transition duration-500">
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-4">{m.label}</p>
                <p className="text-3xl font-black italic uppercase italic text-white mb-2">{m.value}</p>
                <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${m.bg} ${m.color} w-fit mx-auto`}>
                   {m.trend}
                </div>
             </div>
          ))}
       </div>

       <div className="mt-12 h-24 bg-gradient-to-r from-orange-600/20 via-sky-600/20 to-orange-600/20 border border-white/5 rounded-3xl flex items-center justify-center p-4">
          <div className="w-full h-1/2 flex items-end gap-1 px-4">
             {[4,7,3,9,5,8,4,6,9,3,7,5,8,4,9,6].map((h, i) => (
                <div key={i} className="flex-1 bg-orange-600/40 rounded-t-sm" style={{ height: `${h*10}%` }} />
             ))}
          </div>
       </div>
    </div>
  );
}

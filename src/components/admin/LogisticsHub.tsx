"use client";
import React from "react";
import { MapPin, Truck, Package, Clock } from "lucide-react";

export default function LogisticsHub() {
  const shipments = [
    { id: "AL-8921", status: "In Transit", origin: "Delhi Depot", destination: "Mumbai West", eta: "14:00" },
    { id: "AL-9201", status: "Processing", origin: "Chennai Hub", destination: "Bangalore SEZ", eta: "Tomorrow" },
    { id: "AL-1029", status: "Delivered", origin: "Delhi Depot", destination: "Gurgaon City", eta: "Delivered" }
  ];

  return (
    <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] shadow-xl">
       <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-black italic uppercase italic tracking-tighter">Logistics <span className="text-orange-600">Lanes</span></h3>
          <div className="px-4 py-2 bg-orange-600/10 border border-orange-600/20 text-orange-500 text-[10px] font-black uppercase tracking-widest rounded-full">
             Real-Time Tracking Active
          </div>
       </div>

       <div className="space-y-6">
          {shipments.map((ship, idx) => (
             <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-orange-600/20 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
                      <Truck className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Consignment ID</p>
                      <h4 className="text-lg font-black italic uppercase italic">{ship.id}</h4>
                   </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center gap-4 px-10 text-gray-600">
                   <MapPin className="w-4 h-4" />
                   <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-600 to-gray-800 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-600 rounded-full blur-[4px]" />
                   </div>
                   <MapPin className="w-4 h-4 text-orange-600" />
                </div>

                <div className="text-right">
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Est. Delivery</p>
                   <p className="font-black italic uppercase italic text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" /> {ship.eta}
                   </p>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

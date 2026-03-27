"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Package, MapPin, Phone, User, Mail, CreditCard } from "lucide-react";

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setErrorMsg("");
    setOrder(null);

    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      
      // Look deeply for matching robust ID or Phone
      const foundOrder = data.find((o: any) => 
         o.id === query.trim().toUpperCase() || 
         o.phone === query.trim() || 
         (o.orderId && o.orderId === query.trim())
      );

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setErrorMsg(`We couldn't find any order associated with "${query}". Please check your Order ID string or registered Phone Number and try again.`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to connect to tracking servers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col pb-10">
      
      {/* Tracker Header Node */}
      <nav className="w-full p-6 lg:px-12 flex justify-between items-center border-b border-gray-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold tracking-tight mb-4 md:mb-0">
          <span className="text-blue-500">Englabs</span> Tracking
        </Link>
        <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white flex items-center gap-2 font-medium text-sm transition">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col w-full flex-1 items-center">
        
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">Track Your Hardware</h1>
        <p className="text-gray-400 mb-10 text-center max-w-xl">
          Enter your 10-digit registered phone number or the secure Order ID listed on your receipt to view real-time production and dispatch status.
        </p>

        {/* Action Form Element */}
        <form onSubmit={handleTrack} className="w-full max-w-2xl relative mb-12">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
           <input 
             type="text" 
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="e.g. ORD-1718293029 or 9876543210" 
             className="w-full bg-gray-900 border border-gray-800 rounded-full py-5 pl-16 pr-44 text-lg text-white focus:border-blue-500 focus:outline-none transition shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
             required
           />
           <button 
             type="submit" 
             disabled={loading}
             className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-full font-bold transition flex items-center justify-center gap-2"
           >
             {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Track"}
           </button>
        </form>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center leading-relaxed font-medium">
            {errorMsg}
          </div>
        )}

        {/* Live Result Output Frame */}
        {order && (
          <div className="w-full bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-500">
             
             {/* Dynamic Status Badges Matrix */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray-800 pb-8">
               <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Englabs Order</div>
                  <div className="text-2xl font-mono text-white">{order.id}</div>
               </div>
               <div className="flex gap-4">
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${order.paymentStatus === 'Completed' || order.paymentStatus === 'Paid' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'}`}>
                    <CreditCard className="w-4 h-4" /> {order.paymentStatus || 'Pending'}
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border ${
                     order.dispatchStatus === 'Delivered' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                     order.dispatchStatus === 'Shipped' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                     order.dispatchStatus === 'Processing' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                     'bg-orange-500/20 text-orange-400 border-orange-500/30'
                  }`}>
                    <Package className="w-4 h-4" /> {order.dispatchStatus || 'Pending'}
                  </div>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Left Half: Specifications & Recipient Information */}
               <div>
                 <h3 className="text-lg font-bold mb-4 text-white">Hardware Specification</h3>
                 <div className="bg-black border border-gray-800 rounded-2xl p-6">
                    <div className="font-bold text-xl mb-1 text-blue-400">{order.productName || order.tier || "Custom Configuration"}</div>
                    <div className="text-gray-400 font-medium mb-4">Total: ₹{Number(order.price || order.amount || 0).toLocaleString('en-IN')}</div>
                    
                    <div className="space-y-3 pt-4 border-t border-gray-900">
                       <p className="flex items-center gap-3 text-sm text-gray-300">
                         <User className="w-4 h-4 text-gray-500 flex-shrink-0" /> {order.name || order.customerName || "Customer Record"}
                       </p>
                       <p className="flex items-center gap-3 text-sm text-gray-300">
                         <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" /> +91 {order.phone || order.customerPhone}
                       </p>
                       <p className="flex items-center gap-3 text-sm text-gray-300">
                         <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" /> {order.email || order.customerEmail || "No Email Provided"}
                       </p>
                    </div>
                 </div>
               </div>
               
               {/* Right Half: Live Delivery Vectoring */}
               <div>
                 <h3 className="text-lg font-bold mb-4 text-white">Fulfillment Destination</h3>
                 <div className="bg-black border border-gray-800 rounded-2xl p-6 h-[calc(100%-2.5rem)] flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {order.address || "Address parsing error. Please contact logistics personnel immediately."}
                    </p>
                 </div>
               </div>
             </div>

          </div>
        )}

      </main>
    </div>
  );
}

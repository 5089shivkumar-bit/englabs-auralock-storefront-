"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ShieldCheck, User, LogOut, Loader2, Package, Clock, CheckCircle2, XCircle, Truck, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserDataAndOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
        return;
      }
      
      setUser(session.user);

      // Fetch orders for this user by user_id
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (ordersData) {
        setOrders(ordersData);
      }
      
      setLoading(false);
    };

    fetchUserDataAndOrders();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          router.push("/login");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    
    setCancellingId(orderId);
    setSuccessMessage("");
    
    try {
      const { error } = await supabase
        .from('orders')
        .update({ dispatchStatus: 'Cancelled' })
        .eq('id', orderId)
        .eq('user_id', user.id); // extra safety mapping

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, dispatchStatus: 'Cancelled' } : order
      ));
      
      setSuccessMessage(`Order #${orderId.toString().slice(0,8)}... has been cancelled successfully.`);
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      alert("Failed to cancel the order. Please contact support.");
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusIconAndColor = (status: string) => {
    const s = (status || "Pending").toLowerCase();
    if (s === "pending") return { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    if (s === "processing") return { icon: RefreshCcw, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    if (s === "shipped") return { icon: Truck, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" };
    if (s === "delivered") return { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (s === "cancelled") return { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
    return { icon: Package, color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 selection:bg-purple-600/30">
      <div className="max-w-6xl mx-auto pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.15)]">
                <ShieldCheck className="w-8 h-8 text-purple-600" />
             </div>
             <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-1">
                  Secure <span className="text-purple-600">Access</span>
                </h1>
                <p className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-500 uppercase">
                  <User className="w-3 h-3" /> {user.phone || user.email || user.id}
                </p>
             </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Terminate Session
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Package className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Your <span className="text-purple-600">Hardware</span></h2>
          </div>

          <AnimatePresence>
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-bold w-full"
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-16 text-center shadow-2xl flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <Package className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">No Active Deployments</h3>
              <p className="text-gray-500 text-sm font-medium mb-8 max-w-sm">You haven't secured any AuraLock devices yet. Equip your perimeter today.</p>
              <Link
                href="/#products"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl text-white font-black uppercase italic tracking-tighter shadow-[0_10px_30px_rgba(147,51,234,0.2)] hover:shadow-[0_10px_40px_rgba(147,51,234,0.4)] transition-all flex items-center gap-2 w-fit mx-auto"
              >
                Initiate Purchase
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((order, i) => {
                const status = (order.dispatchStatus || "Pending");
                const { icon: StatusIcon, color, bg, border } = getStatusIconAndColor(status);
                const canCancel = status.toLowerCase() === "pending" || status.toLowerCase() === "processing";

                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={order.id}
                    className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group hover:border-purple-600/30 transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div>
                        <span className="text-[10px] font-black tracking-widest text-gray-600 uppercase">ID: {order.id.toString().slice(0, 8)}...</span>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter mt-1">{order.productName || order.tier || "AuraLock Unit"}</h3>
                        <p className="text-xs font-medium text-gray-400 mt-1">
                          {new Date(order.created_at || order.date || Date.now()).toLocaleDateString('en-US', { 
                            year: 'numeric', month: 'long', day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className={`px-4 py-2 flex items-center gap-2 rounded-full ${bg} ${border} border`}>
                        <StatusIcon className={`w-3 h-3 ${color}`} />
                        <span className={`text-[9px] font-black uppercase tracking-widest ${color}`}>{status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 bg-black/50 p-4 rounded-xl border border-white/5 relative z-10">
                      <div>
                         <p className="text-[9px] font-black tracking-widest text-gray-500 uppercase mb-1">Financial Value</p>
                         <p className="text-lg font-black italic text-white uppercase">₹{Number(order.price || order.amount || 0).toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                         <p className="text-[9px] font-black tracking-widest text-gray-500 uppercase mb-1">Quantity Stack</p>
                         <p className="text-lg font-black italic text-white uppercase">{order.quantity || 1} UNIT(S)</p>
                      </div>
                    </div>

                    {canCancel && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingId === order.id}
                        className="relative z-10 w-full py-4 bg-red-950/10 border border-red-900/30 rounded-xl text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-950/40 hover:border-red-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {cancellingId === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                        {cancellingId === order.id ? "Terminating..." : "Cancel Deployment"}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

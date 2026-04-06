"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Plus, Trash2, Edit2, Check, X, ShoppingCart, CreditCard, Clock, Truck, BarChart3, ShieldCheck, Image as ImageIcon, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogisticsHub from '@/components/admin/LogisticsHub';
import CommunicationHub from '@/components/admin/CommunicationHub';
import BillingSummary from '@/components/admin/BillingSummary';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export default function AdminPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [settings, setSettings] = useState({ email: '', phone: '' });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'settings' | 'analytics'>('dashboard');

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setNotification({ message: "Payload too large. Max 2MB allowed.", type: 'error' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingProduct({ ...editingProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
       setIsAuthenticated(true);
       // Also set a temporary cookie for middleware consistency
       document.cookie = "auralock_admin_token=4c7e50ee-9621-408c-80ff-bc299ee3a299; path=/";
    }
    else alert("Incorrect password");
  };

  const loadData = () => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
    fetch('/api/orders').then(res => res.json()).then(setOrders);
    fetch('/api/settings').then(res => res.json()).then(setSettings);
  };

  useEffect(() => {
    if (isAuthenticated || document.cookie.includes('auralock_admin_token')) {
       setIsAuthenticated(true);
       loadData();
    }
  }, [isAuthenticated]);

  const updateOrderStatus = async (id: string, newStatus: string) => {
    await fetch('/api/orders', {
      method: 'PUT',
      body: JSON.stringify({ id, dispatchStatus: newStatus }),
      headers: { 'Content-Type': 'application/json' }
    });
    setOrders(orders.map((o: any) => o.id === id ? { ...o, dispatchStatus: newStatus } : o));
  };

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct.id ? 'PUT' : 'POST';
    await fetch('/api/products', {
      method,
      body: JSON.stringify(editingProduct),
      headers: { 'Content-Type': 'application/json' }
    });
    setEditingProduct(null);
    loadData();
  };

  const deleteProduct = async (id: string) => {
    if(confirm("Are you sure you want to delete this specific product?")) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/settings', {
      method: 'POST',
      body: JSON.stringify(settings),
      headers: { 'Content-Type': 'application/json' }
    });
    setNotification({ message: "System Nodes Synchronized Successfully", type: 'success' });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.name || order.customerName || "").toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      (order.phone || order.customerPhone || "").includes(orderSearchQuery) ||
      (order.email || order.customerEmail || "").toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      (order.id || "").toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === "All" || order.dispatchStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white p-6">
      <form onSubmit={login} className="p-10 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 border-t-4 border-t-orange-600 space-y-8 shadow-2xl max-w-md w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-[50px] rounded-full" />
        <div className="flex justify-center mb-4">
           <div className="w-20 h-20 bg-orange-600/10 border border-orange-600/20 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.2)]">
              <ShieldCheck className="w-12 h-12 text-orange-600" />
           </div>
        </div>
        <div className="text-center">
           <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Internal <span className="text-orange-600">Access</span></h1>
           <p className="text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">Security Level 4 Authorization Required</p>
        </div>
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          className="w-full bg-black border border-white/5 p-5 rounded-2xl focus:outline-none focus:border-orange-600 transition font-mono text-center tracking-widest md:text-xl" 
          placeholder="••••••••" 
        />
        <button className="w-full py-5 bg-orange-600 text-white font-black uppercase italic tracking-tighter text-xl rounded-2xl hover:bg-orange-500 transition shadow-[0_10px_30px_rgba(234,88,12,0.3)]">
          Initialize Uplink
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 selection:bg-orange-600/30">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.5)]">
                <ShieldCheck className="w-6 h-6 text-white" />
             </div>
             <h1 className="text-3xl font-black tracking-tighter uppercase italic">Aura<span className="text-orange-600">Lock</span> Control</h1>
          </div>
          <div className="flex bg-[#0a0a0a] rounded-2xl p-1.5 border border-white/5 shadow-xl">
            {['dashboard', 'orders', 'products', 'settings', 'analytics'].map(tab => (
              <button key={tab} 
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </header>

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-12">
             {/* Key Metrics */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "text-white", border: "border-white/20" },
                  { label: "Total Revenue", value: `₹${orders.reduce((sum, o) => sum + Number(o.price || o.amount || 0), 0).toLocaleString('en-IN')}`, icon: CreditCard, color: "text-orange-500", border: "border-orange-500/20" },
                  { label: "Active Pending", value: orders.filter(o => o.dispatchStatus !== 'Delivered' && o.dispatchStatus !== 'Cancelled').length, icon: Clock, color: "text-sky-500", border: "border-sky-500/20" },
                  { label: "Growth Signal", value: "+18.4%", icon: BarChart3, color: "text-emerald-500", border: "border-emerald-500/20" }
                ].map((stat, i) => ( stat && (
                  <div key={i} className={`p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] relative overflow-hidden group hover:border-white/20 transition-all duration-500`}>
                     <div className={`absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity`} />
                     <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl bg-white/5 border ${stat.border} flex items-center justify-center ${stat.color} shadow-inner`}>
                           <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                           <p className="text-3xl font-black italic uppercase italic">{stat.value}</p>
                        </div>
                     </div>
                  </div>
                )))}
             </div>

             {/* Power Dashboard Sections */}
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <BillingSummary />
                <CommunicationHub />
             </div>

             <LogisticsHub />
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
               <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Order <span className="text-orange-600">Telemetry</span></h2>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Tracking deployment pipeline</p>
               </div>
               <div className="flex gap-4 w-full md:w-auto">
                  <input 
                    type="text" 
                    placeholder="PROTOCOL_SEARCH..." 
                    value={orderSearchQuery}
                    onChange={e => setOrderSearchQuery(e.target.value)}
                    className="w-full md:w-64 bg-black border border-white/5 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:border-orange-600 focus:outline-none"
                  />
                  <select 
                    value={orderStatusFilter}
                    onChange={e => setOrderStatusFilter(e.target.value)}
                    className="bg-black border border-white/5 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:border-orange-600 cursor-pointer"
                  >
                    <option value="All">ALL_STATUS</option>
                    <option value="Pending">PENDING</option>
                    <option value="Shipped">SHIPPED</option>
                    <option value="Delivered">DELIVERED</option>
                  </select>
               </div>
            </div>
            
            <div className="space-y-4">
              {filteredOrders.map((order: any) => (
                <div key={order.id} className="p-8 bg-black border border-white/5 rounded-[2rem] hover:border-orange-600/30 transition-all duration-300 group">
                   <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="flex-1">
                         <div className="flex items-center gap-4 mb-4">
                            <span className="text-[10px] font-black text-gray-600 tracking-widest uppercase">ID: {order.id}</span>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${order.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                               {order.paymentStatus}
                            </span>
                         </div>
                         <h3 className="text-2xl font-black italic uppercase italic tracking-tighter mb-2">{order.name} <span className="text-gray-700 text-sm italic ml-4">({order.phone})</span></h3>
                         <p className="text-gray-500 text-xs font-medium max-w-xl">{order.address}</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-4 min-w-[200px]">
                         <select 
                           value={order.dispatchStatus} 
                           onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                           className="w-full bg-[#0a0a0a] border border-white/10 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-orange-500 focus:border-orange-600 cursor-pointer"
                         >
                           <option value="Pending">PENDING</option>
                           <option value="Processing">PROCESSING</option>
                           <option value="Shipped">SHIPPED</option>
                           <option value="Delivered">DELIVERED</option>
                         </select>
                         <button onClick={() => setSelectedOrder(order)} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition">
                            View Deep Details
                         </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-12">
            <div className="space-y-6">
               <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter">Hardware <span className="text-orange-600">Inventory</span></h2>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Managing corporate hardware assets</p>
                  </div>
                  <button onClick={() => setEditingProduct({ name: '', price: 0, features: [], image: '', description: '', quantity: 0 })} className="px-10 py-4 bg-orange-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:bg-orange-500 transition-all hover:scale-105 active:scale-95">
                     Deploy SKU
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-orange-600/30 transition-all duration-500 shadow-xl">
                       <div className="flex items-center gap-8">
                          <div className="w-24 h-24 bg-black rounded-[2rem] p-4 border border-white/5 group-hover:border-orange-600/20 transition relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                             <img src={product.image || product.images?.[0]} className="w-full h-full object-contain drop-shadow-2xl relative z-10" alt="" />
                          </div>
                          <div>
                             <h3 className="text-2xl font-black italic uppercase italic tracking-tighter mb-1">{product.name}</h3>
                             <p className="text-orange-500 font-black italic mb-2 tracking-tighter">
                               ₹{Number(product.price).toLocaleString('en-IN')} 
                               <span className="text-gray-500 text-[10px] ml-3 opacity-50 tracking-widest uppercase italic font-mono">// STOCK: {product.quantity || 0}</span>
                             </p>
                             <div className="flex gap-2 flex-wrap">
                                {product.features?.slice(0, 3).map((f: any, i: any) => (
                                  <span key={i} className="text-[8px] font-black uppercase tracking-widest text-gray-400 bg-white/5 border border-white/5 px-3 py-1 rounded-full">{f}</span>
                                ))}
                             </div>
                          </div>
                       </div>
                       <div className="flex gap-3">
                          <button onClick={() => setEditingProduct(product)} className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-gray-400 hover:text-white border border-white/5 flex items-center justify-center">
                             <Edit2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="w-12 h-12 bg-red-600/10 hover:bg-red-600/20 rounded-2xl transition-all text-red-500 border border-red-600/20 flex items-center justify-center">
                             <Trash2 className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-[#0a0a0a] border border-white/5 p-12 rounded-[3rem] max-w-2xl mx-auto shadow-2xl">
             <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-10">System <span className="text-orange-600">Nodes</span></h2>
             <form onSubmit={saveSettings} className="space-y-8">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Encryption Relay Email</label>
                   <input required type="email" value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="w-full bg-black border border-white/5 p-5 rounded-2xl text-sm font-bold focus:border-orange-600 focus:outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Contact Protocol Phone</label>
                   <input required type="tel" value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className="w-full bg-black border border-white/5 p-5 rounded-2xl text-sm font-bold focus:border-orange-600 focus:outline-none" />
                </div>
                <button type="submit" className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter text-xl rounded-2xl hover:bg-orange-600 hover:text-white transition shadow-xl">
                   Push System Sync
                </button>
             </form>
          </div>
        )}

      </div>

      {/* PRODUCT EDIT MODAL */}
      <AnimatePresence>
        {editingProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
            onClick={() => setEditingProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#050505] border border-white/10 w-full max-w-6xl min-h-[85vh] rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(234,88,12,0.15)] relative mb-auto mt-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setEditingProduct(null)}
                className="absolute top-8 right-8 z-[1100] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/20 hover:border-red-600/40 transition-all active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>

              {/* LEFT: Visual Preview */}
              <div className="w-full md:w-5/12 bg-black flex flex-col p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0%,transparent_70%)]" />
                
                <div className="relative group w-full aspect-square max-w-[400px] mb-12">
                   {/* Aura Box Effect */}
                   <div className="absolute inset-0 z-0 pointer-events-none rounded-[3rem] overflow-hidden">
                      <div className="absolute left-1/2 top-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_75%,#ea3a0c_85%,#fb923c_100%)] opacity-40 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute inset-[2px] rounded-[calc(3rem-2px)] bg-black" />
                   </div>
                   
                   <div className="relative z-10 w-full h-full p-10 flex items-center justify-center">
                      {(editingProduct.image || editingProduct.images?.length > 0) ? (
                        <img src={editingProduct.image || editingProduct.images?.[0]} className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(234,88,12,0.4)]" alt="Preview" />
                      ) : (
                        <div className="flex flex-col items-center gap-4 text-gray-700">
                           <ImageIcon className="w-24 h-24" />
                           <p className="text-[10px] font-black uppercase tracking-widest">Image Matrix Offline</p>
                        </div>
                      )}
                   </div>
                </div>

                <div className="w-full space-y-6 relative z-10">
                   <div className="space-y-2">
                      <div className="flex justify-between items-end mb-1">
                        <label className="text-[9px] font-black text-orange-600/60 uppercase tracking-[0.3em] font-mono">Image Asset URL</label>
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 group/btn px-3 py-1 rounded-lg bg-orange-600/10 border border-orange-600/20 hover:bg-orange-600 hover:border-orange-600 transition-all"
                        >
                           <Upload className="w-3 h-3 text-orange-600 group-hover/btn:text-white transition-colors" />
                           <span className="text-[8px] font-black uppercase tracking-widest text-orange-600 group-hover/btn:text-white transition-colors">Upload Asset</span>
                        </button>
                      </div>
                      <input 
                        type="text" 
                        value={editingProduct.image || editingProduct.images?.[0] || ''} 
                        onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-[10px] font-bold text-gray-400 focus:text-white focus:border-orange-600 focus:outline-none transition-all placeholder:text-gray-800"
                        placeholder="PROTOCOL://RESOURCE.PATH/IMAGE.PNG"
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                   </div>
                   <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest text-center italic">Supported Formats: PNG, WEBP, SVG (Transparent preferred)</p>
                </div>
              </div>

              {/* RIGHT: Configuration Matrix */}
              <form onSubmit={saveProduct} className="flex-1 flex flex-col h-[85vh] md:h-auto">
                <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar space-y-10">
                  <div className="flex justify-between items-start gap-8">
                     <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-600 text-[9px] font-black tracking-widest uppercase mb-4">
                           SKU: {editingProduct.id || "NEW_DEPLOYMENT"}
                        </div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">System <span className="text-orange-600">Configuration</span></h2>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Hardware Descriptor</label>
                        <input 
                          type="text" 
                          required
                          value={editingProduct.name} 
                          onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} 
                          className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-lg font-black uppercase italic italic focus:border-orange-600 focus:bg-black transition-all outline-none" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Base MSP (INR)</label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-600 font-black text-lg">₹</span>
                          <input 
                            type="number" 
                            required
                            value={editingProduct.price} 
                            onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} 
                            className="w-full bg-black/40 border border-white/10 pl-10 pr-5 py-5 rounded-2xl text-2xl font-black focus:border-orange-600 focus:bg-black transition-all outline-none" 
                          />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Technical Brief (Description)</label>
                     <textarea 
                        rows={3} 
                        value={editingProduct.description || ''} 
                        onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} 
                        className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-sm font-medium leading-relaxed focus:border-orange-600 focus:bg-black transition-all outline-none"
                        placeholder="Provide detailed hardware specifications and environmental operational requirements..."
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Inventory Reservoir (Stock)</label>
                        <input 
                          type="number" 
                          value={editingProduct.quantity || 0} 
                          onChange={e => setEditingProduct({...editingProduct, quantity: Number(e.target.value)})} 
                          className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-xl font-mono focus:border-orange-600 focus:bg-black transition-all outline-none" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Video Relay URL (Optional)</label>
                        <input 
                          type="text" 
                          value={editingProduct.video || ''} 
                          onChange={e => setEditingProduct({...editingProduct, video: e.target.value})} 
                          className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-xs font-mono focus:border-orange-600 focus:bg-black transition-all outline-none" 
                          placeholder="HTTPS://..."
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Capabilities Matrix (Features - Comma Separated)</label>
                     <textarea 
                        rows={4} 
                        value={(editingProduct.features || []).join(', ')} 
                        onChange={e => setEditingProduct({...editingProduct, features: e.target.value.split(',').map(f => f.trim())})} 
                        className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-xs font-bold focus:border-orange-600 focus:bg-black transition-all outline-none"
                        placeholder="Feature A, Feature B, Feature C..."
                     />
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex-shrink-0 p-8 md:p-12 bg-white/2 border-t border-white/5 flex gap-4">
                  <button type="submit" className="flex-1 py-5 bg-orange-600 text-white font-black uppercase italic tracking-tighter text-xl rounded-2xl hover:bg-white hover:text-orange-600 transition-all shadow-[0_20px_50px_rgba(234,88,12,0.3)] flex items-center justify-center gap-3 active:scale-[0.98]">
                     <Check className="w-6 h-6" /> Commit Changes
                  </button>
                  <button type="button" onClick={() => setEditingProduct(null)} className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase italic tracking-tighter text-xl rounded-2xl hover:bg-red-600/20 hover:border-red-600/40 transition-all active:scale-[0.98]">
                     Abstain
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAIL MODAL (Placeholder reuse) */}
      {selectedOrder && (
         <div className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-xl flex items-center justify-center p-8" onClick={() => setSelectedOrder(null)}>
            <div onClick={e => e.stopPropagation()} className="bg-[#0a0a0a] border border-white/5 w-full max-w-4xl rounded-[3.5rem] overflow-hidden flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-300">
               <div className="p-12 space-y-12 h-[80vh] overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-start">
                     <div>
                        <h2 className="text-4xl font-black italic uppercase italic tracking-tighter mb-2">Order <span className="text-orange-600">Manifest</span></h2>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{selectedOrder.id}</p>
                     </div>
                     <button onClick={() => setSelectedOrder(null)} className="p-4 bg-white/5 rounded-full hover:text-orange-600 transition">
                        <X className="w-6 h-6" />
                     </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-8">
                        <div>
                           <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Identity Matrix</p>
                           <div className="space-y-2">
                              <p className="text-2xl font-black italic text-white uppercase italic">{selectedOrder.name}</p>
                              <p className="text-gray-400 font-medium">{selectedOrder.email}</p>
                              <p className="text-orange-500 font-black italic">{selectedOrder.phone}</p>
                           </div>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Deployment Zone</p>
                           <p className="text-gray-300 font-medium leading-relaxed">{selectedOrder.address}</p>
                        </div>
                     </div>

                     <div className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] space-y-6">
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Financial Payload</p>
                        <div className="flex justify-between items-end border-b border-white/5 pb-6">
                           <span className="text-gray-400 uppercase font-bold text-[10px] tracking-widest">Hardware Unit</span>
                           <span className="text-white font-black italic text-lg uppercase italic">{selectedOrder.tier || selectedOrder.productName}</span>
                        </div>
                        <div className="flex justify-between items-end">
                           <span className="text-gray-400 uppercase font-bold text-[10px] tracking-widest">Amount Settle</span>
                           <span className="text-3xl font-black italic text-orange-600 uppercase italic">₹{Number(selectedOrder.price || selectedOrder.amount).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="pt-6">
                           <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-[0.4em] rounded-full text-center">
                              Payment ID: {selectedOrder.payment_id || "VERIFIED_BY_SIGNATURE"}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(234, 88, 12, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}

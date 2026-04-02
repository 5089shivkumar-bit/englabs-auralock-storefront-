"use client";
import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, ShoppingCart, CreditCard, Clock, Truck, BarChart3, ShieldCheck } from 'lucide-react';
import LogisticsHub from '@/components/admin/LogisticsHub';
import CommunicationHub from '@/components/admin/CommunicationHub';
import BillingSummary from '@/components/admin/BillingSummary';

export default function AdminPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [settings, setSettings] = useState({ email: '', phone: '' });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'settings'>('dashboard');

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

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
    alert("Settings saved successfully!");
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
            {['dashboard', 'orders', 'products', 'settings'].map(tab => (
              <button key={tab} 
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>
                {tab}
              </button>
            ))}
          </div>
        </header>

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

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">Hardware <span className="text-orange-600">Inventory</span></h2>
                  <button onClick={() => setEditingProduct({ name: '', price: 0, features: [], image: '' })} className="px-6 py-3 bg-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-orange-500 transition">
                     Deploy SKU
                  </button>
               </div>
               {products.map(product => (
                 <div key={product.id} className="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-orange-600/30 transition-all duration-500">
                    <div className="flex items-center gap-8">
                       <div className="w-24 h-24 bg-black rounded-3xl p-4 border border-white/5 group-hover:border-orange-600/20 transition">
                          <img src={product.image || product.images?.[0]} className="w-full h-full object-contain drop-shadow-xl" alt="" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-black italic uppercase italic tracking-tighter mb-1">{product.name}</h3>
                          <p className="text-orange-500 font-black italic mb-2 tracking-tighter">
                            ₹{Number(product.price).toLocaleString('en-IN')} 
                            <span className="text-gray-500 text-[10px] ml-3 opacity-50 tracking-widest uppercase italic">// STOCK_UNITS: {product.quantity || 0}</span>
                          </p>
                          <div className="flex gap-2 flex-wrap">
                             {product.features?.slice(0, 3).map((f: any, i: any) => (
                               <span key={i} className="text-[8px] font-black uppercase tracking-widest text-gray-600 border border-white/5 px-2 py-1 rounded-full">{f}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <button onClick={() => setEditingProduct(product)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition text-gray-400 hover:text-white border border-white/5">
                          <Edit2 className="w-4 h-4" />
                       </button>
                       <button onClick={() => deleteProduct(product.id)} className="p-3 bg-red-600/10 hover:bg-red-600/20 rounded-xl transition text-red-500 border border-red-600/20">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               ))}
            </div>

            {editingProduct && (
              <div className="bg-[#0a0a0a] border border-orange-600/20 p-10 rounded-[3rem] h-fit sticky top-24 shadow-2xl">
                 <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8">Configure <span className="text-orange-600">Unit</span></h2>
                 <form onSubmit={saveProduct} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Product Title</label>
                       <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-black border border-white/5 p-4 rounded-xl text-sm font-bold focus:border-orange-600 focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Base MSP (INR)</label>
                       <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full bg-black border border-white/5 p-4 rounded-xl text-sm font-bold focus:border-orange-600 focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Stock Quantity</label>
                       <input type="number" value={editingProduct.quantity || 0} onChange={e => setEditingProduct({...editingProduct, quantity: Number(e.target.value)})} className="w-full bg-black border border-white/5 p-4 rounded-xl text-sm font-bold focus:border-orange-600 focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Features Array</label>
                       <textarea rows={4} value={(editingProduct.features || []).join(', ')} onChange={e => setEditingProduct({...editingProduct, features: e.target.value.split(',').map(f => f.trim())})} className="w-full bg-black border border-white/5 p-4 rounded-xl text-xs font-bold focus:border-orange-600 focus:outline-none" />
                    </div>
                    <button className="w-full py-5 bg-orange-600 text-white font-black uppercase italic tracking-tighter text-xl rounded-2xl hover:bg-orange-500 transition shadow-xl">
                       Update Database
                    </button>
                 </form>
              </div>
            )}
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

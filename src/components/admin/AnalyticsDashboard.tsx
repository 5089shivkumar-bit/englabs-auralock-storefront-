"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Eye, MonitorPlay, Smartphone, Globe } from "lucide-react";

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState({
    totalSessions: 0,
    totalViews: 0,
    desktop: 0,
    mobile: 0,
    topPages: [] as { url: string, count: number }[],
    recentActivity: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      const { data: sessions } = await supabase.from("sessions").select("session_id, device_type, created_at").order('created_at', { ascending: false });
      const { data: views } = await supabase.from("page_views").select("session_id, page_url, created_at").order('created_at', { ascending: false });

      if (sessions && views) {
        const pageCounts: Record<string, number> = {};
        views.forEach(v => pageCounts[v.page_url] = (pageCounts[v.page_url] || 0) + 1);
        
        const topPages = Object.entries(pageCounts)
          .map(([url, count]) => ({ url, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        const desktop = sessions.filter(s => s.device_type === "desktop").length;
        const mobile = sessions.filter(s => s.device_type === "mobile").length;

        setMetrics({
          totalSessions: sessions.length,
          totalViews: views.length,
          desktop,
          mobile,
          topPages,
          recentActivity: views.slice(0, 8).map(v => ({
            ...v,
            device: sessions.find(s => s.session_id === v.session_id)?.device_type || 'unknown'
          }))
        });
      }
      setLoading(false);
    }
    loadAnalytics();
  }, []);

  if (loading) return <div className="p-8 text-center text-orange-600 animate-pulse font-mono uppercase tracking-widest text-xs border border-white/5 rounded-3xl bg-[#0a0a0a]">Calibrating Telemetry...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-orange-600/10 border border-orange-600/20 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Site <span className="text-orange-600">Telemetry</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Unique Visitors", value: metrics.totalSessions, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
          { label: "Total Page Views", value: metrics.totalViews, icon: Eye, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          { label: "Desktop Traffic", value: metrics.desktop, icon: MonitorPlay, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
          { label: "Mobile Traffic", value: metrics.mobile, icon: Smartphone, color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" }
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-[#0a0a0a] border border-white/5 rounded-[2rem] flex items-center gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-10 -mt-10 pointer-events-none" />
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.border} border`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-black italic uppercase text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
          <h3 className="text-lg font-black uppercase italic tracking-widest text-white mb-6">Top Destinations</h3>
          <div className="space-y-4">
            {metrics.topPages.map((page, i) => (
              <div key={i} className="flex justify-between items-center bg-black border border-white/5 p-4 rounded-xl">
                <span className="text-xs font-mono text-gray-400 truncate w-3/4">{page.url}</span>
                <span className="text-sm font-black text-orange-600">{page.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
          <h3 className="text-lg font-black uppercase italic tracking-widest text-white mb-6">Live Activity Stream</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-[9px] font-black tracking-widest uppercase text-gray-600">Timestamp</th>
                  <th className="pb-4 text-[9px] font-black tracking-widest uppercase text-gray-600">Endpoint</th>
                  <th className="pb-4 text-[9px] font-black tracking-widest uppercase text-gray-600">Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {metrics.recentActivity.map((activity, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4 px-2 text-xs font-mono text-gray-400">
                      {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-4 px-2 text-sm font-bold text-white max-w-[200px] truncate">{activity.page_url}</td>
                    <td className="py-4 px-2">
                      <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border ${activity.device === 'mobile' ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                        {activity.device}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackNavigation = async () => {
      let sessionId = sessionStorage.getItem("auralock_session_id");
      
      if (!sessionId) {
        sessionId = generateSessionId();
        sessionStorage.setItem("auralock_session_id", sessionId);

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        await supabase.from("sessions").insert([{
          session_id: sessionId,
          device_type: isMobile ? "mobile" : "desktop",
        }]);
      }

      await supabase.from("page_views").insert([{
        session_id: sessionId,
        page_url: pathname,
      }]);
    };

    trackNavigation();
  }, [pathname]);

  return null;
}

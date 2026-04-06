"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ShieldCheck, Phone, KeyRound, Loader2, ArrowRight, X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("phone");
        setPhone("");
        setOtp("");
        setError("");
        setSuccess("");
      }, 300);
    }
  }, [isOpen]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) throw error;
      setStep("otp");
      setSuccess("OTP sent successfully to your phone.");
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });
      if (error) throw error;

      setSuccess("Verification successful. Redirecting...");
      setTimeout(() => {
        onClose();
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full z-0 pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 text-gray-500 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 flex flex-col items-center mb-10 mt-2">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(147,51,234,0.15)]">
                <ShieldCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Aura<span className="text-purple-600">Lock</span></h2>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mt-2">Secure Authentication</p>
            </div>

            {error && (
              <div className="relative z-10 mb-6 p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-red-500 text-xs font-bold text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="relative z-10 mb-6 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-xs font-bold text-center">
                {success}
              </div>
            )}

            <div className="relative z-10">
              {step === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <Phone className="w-3 h-3" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                      required
                      className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white font-mono text-sm focus:border-purple-600 focus:outline-none focus:shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl text-white font-black uppercase italic tracking-tighter text-lg shadow-[0_10px_30px_rgba(147,51,234,0.2)] hover:shadow-[0_10px_40px_rgba(147,51,234,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Request Access <ArrowRight className="w-5 h-5" /></>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <KeyRound className="w-3 h-3" /> Verification Code
                    </label>
                    <input
                      type="text"
                      placeholder="******"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={loading}
                      maxLength={6}
                      required
                      className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white font-mono text-center text-2xl tracking-[1em] focus:border-purple-600 focus:outline-none focus:shadow-[0_0_20px_rgba(147,51,234,0.15)] transition-all"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full py-5 bg-emerald-600 rounded-2xl text-white font-black uppercase italic tracking-tighter text-lg shadow-[0_10px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Identity"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    disabled={loading}
                    className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                  >
                    Back to Phone
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

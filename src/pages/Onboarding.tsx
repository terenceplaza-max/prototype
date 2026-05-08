import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Onboarding() {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 overflow-hidden selection:bg-secondary/10 selection:text-secondary font-sans transition-colors duration-500">
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center py-20">
        <div className="w-full max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Mission Label */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                <span className="civic-label text-slate-400">Butuan City Operating System</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tightest">
                CIVIC <br/>
                <span className="text-secondary">INTELLIGENCE.</span> <br/>
                COLLECTIVE.
              </h1>
            </div>

            <div className="space-y-8 max-w-lg">
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                The next iteration of urban governance. Participate in real-time city evolution through secure, data-driven reporting and community verification.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link 
                  to="/dashboard"
                  className="civic-button-primary w-full sm:w-auto px-12 py-5 text-base relative group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Initialize Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <Link 
                  to="/login"
                  className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-center tracking-tight"
                >
                  Citizen ID Login
                </Link>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200/60">
              <div>
                <span className="civic-label block mb-2">Network Nodes</span>
                <span className="text-2xl font-black text-slate-900 civic-mono tracking-tighter">4.2k+</span>
              </div>
              <div>
                <span className="civic-label block mb-2">Sync Status</span>
                <span className="text-2xl font-black text-emerald-500 civic-mono tracking-tighter">Live</span>
              </div>
              <div>
                <span className="civic-label block mb-2">Protocol</span>
                <span className="text-2xl font-black text-slate-900 civic-mono tracking-tighter">v4.2</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative hidden lg:block perspective-1000"
          >
            <div className="relative aspect-[4/5] bg-slate-900 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl shadow-slate-900/10 border border-white/5">
              {/* Abstract Terminal UI */}
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div className="w-16 h-1 bg-secondary rounded-full" />
                    <div className="space-y-2">
                      <span className="civic-label text-secondary">Geospatial Data</span>
                      <h3 className="text-white text-4xl font-black tracking-tightest leading-tight">BUTUAN_CORE</h3>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/20 text-3xl">architecture</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="civic-label text-slate-400">Current Phase</span>
                      <span className="text-emerald-400 civic-mono text-[10px]">VERIFIED_SYNC</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: "78%" }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </div>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-right">Urban Renewal 78%</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10">
                      <span className="civic-label text-slate-500 block mb-1 font-mono">ID_042</span>
                      <span className="text-white font-bold leading-tight block">Water Grid Stability</span>
                    </div>
                    <div className="flex-1 bg-secondary rounded-2xl p-4 shadow-lg shadow-secondary/20">
                      <span className="civic-label text-white/60 block mb-1 font-mono">ID_043</span>
                      <span className="text-white font-bold leading-tight block">Solar Corridor Expansion</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Glows */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-secondary/30 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
            </div>
            
            {/* Decal */}
            <div className="absolute -right-8 bottom-20 translate-x-1/2 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 font-black italic shadow-inner">
                BC
              </div>
              <div>
                <span className="civic-label block mb-1">Official Protocol</span>
                <span className="text-sm font-bold text-slate-900 tracking-tight">Butuan City Executive Unit</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 py-12 w-full border-t border-slate-200/60 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2024 Butuan City ICT Office | All Rights Reserved</p>
          <div className="flex gap-10">
            <a className="hover:text-secondary transition-colors" href="#">Citizen Charter</a>
            <a className="hover:text-secondary transition-colors" href="#">Transparency Seal</a>
            <a className="hover:text-secondary transition-colors" href="#">Data privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

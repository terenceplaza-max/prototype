import { LogOut, Settings, Award, Shield, ChevronRight, MapPin, Mail, Calendar } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import TopAppBar from '../components/TopAppBar';
import { motion } from 'motion/react';

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-40 font-sans">
      <TopAppBar title="Citizen Profile" />

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-12">
        {/* Profile Identity Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="civic-card p-10 md:p-14 text-center relative overflow-hidden group shadow-2xl shadow-slate-900/5"
        >
          {/* Abstract Identity Background */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]" />

          <div className="relative z-10 space-y-10">
            <div className="relative inline-block">
              <div className="w-40 h-40 rounded-[2.5rem] p-1.5 bg-white shadow-2xl mx-auto overflow-hidden border border-slate-100">
                <img 
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'} 
                  alt="Avatar" 
                  className="w-full h-full rounded-[2.1rem] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-slate-900 text-white rounded-2xl border-4 border-white flex items-center justify-center shadow-xl">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 tracking-tightest leading-none uppercase italic">{user?.displayName || 'CITIZEN_V1'}</h2>
              <div className="flex flex-col items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-slate-100/50 px-4 py-1.5 rounded-full border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="civic-mono text-[10px] font-black text-slate-500 uppercase tracking-widest">{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-6 border-t border-slate-100">
              <div className="text-center space-y-1">
                <span className="civic-label text-slate-400 block mb-2 uppercase">Official Records</span>
                <span className="text-4xl font-black text-slate-900 civic-mono tracking-tightest">12.00</span>
              </div>
              <div className="text-center space-y-1">
                <span className="civic-label text-slate-400 block mb-2 uppercase">Civic Standing</span>
                <span className="text-4xl font-black text-secondary civic-mono tracking-tightest">A+</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Operational Settings */}
        <div className="space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-1">
              <div className="w-1 h-3 bg-secondary rounded-full" />
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em]">Operational Config</h3>
            </div>
            <div className="grid gap-4">
              <ProfileMenuItem 
                icon={<Settings className="w-5 h-5" />} 
                label="Security Protocols" 
                subtitle="Encrypted credential storage" 
              />
              <ProfileMenuItem 
                icon={<Award className="w-5 h-5 text-secondary" />} 
                label="Merit Ledger" 
                subtitle="Verification history & status" 
                badge="VETERAN"
              />
              <ProfileMenuItem 
                icon={<MapPin className="w-5 h-5 text-slate-400" />} 
                label="Spatial Identity" 
                subtitle="Butuan City Hub Connection" 
              />
            </div>
          </section>

          <section className="space-y-6">
             <div className="flex items-center gap-3 px-1">
              <div className="w-1 h-3 bg-red-500 rounded-full" />
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em]">Session Management</h3>
            </div>
             <button 
              onClick={handleSignOut}
              className="w-full p-6 md:p-8 bg-white border border-slate-200 rounded-3xl flex items-center justify-between group hover:border-red-200 hover:bg-red-50/10 transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 group-hover:bg-red-500 group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                  <LogOut className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="block font-black text-slate-900 tracking-tight uppercase group-hover:text-red-600 transition-colors">Terminate Connection</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1 block">Finalize Session Disposal</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-all" />
            </button>
          </section>
        </div>

        <div className="text-center pt-10 space-y-4">
          <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-50">Authorized Citizen Terminal / Protocol 4.2</p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <p className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em] opacity-40">Butuan_OS Core / Identity Verification Unit</p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function ProfileMenuItem({ icon, label, subtitle, badge }: { icon: React.ReactNode, label: string, subtitle: string, badge?: string }) {
  return (
    <button className="civic-card p-6 !rounded-3xl flex items-center justify-between group cursor-pointer border-transparent hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-500 bg-white">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 transition-all group-hover:bg-slate-900 group-hover:text-white duration-500 border border-slate-100 group-hover:-rotate-3">
          {icon}
        </div>
        <div className="text-left">
          <span className="block font-black text-slate-900 tracking-tightest leading-tight uppercase group-hover:text-slate-900 transition-colors mb-1">{label}</span>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block">{subtitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {badge && (
          <span className="px-3.5 py-1.5 bg-secondary text-white text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg shadow-secondary/20">
            {badge}
          </span>
        )}
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-slate-900 transition-all" />
      </div>
    </button>
  );
}


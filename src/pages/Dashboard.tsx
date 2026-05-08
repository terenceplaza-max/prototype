import { PlusCircle, Lightbulb, Trash2, TreePine, Users, ArrowRight, Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import { auth } from '../lib/firebase';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [greeting, setGreeting] = useState('Good day');
  const user = auth.currentUser;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <TopAppBar />

      <main className="pt-24 px-6 max-w-4xl mx-auto space-y-12">
        {/* Superior Welcome & Hero section */}
        <section className="relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="civic-label">Live City Operating System</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tightest leading-tight">
                {greeting}, <br/>
                <span className="text-secondary">{user?.displayName?.split(' ')[0] || 'Citizen'}</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4 border-l border-slate-200 pl-6 h-12">
              <div className="text-right">
                <span className="civic-label block mb-1">Response Rate</span>
                <span className="text-lg font-bold text-slate-900 civic-mono">94.2%</span>
              </div>
              <div className="text-right border-l border-slate-200 pl-4">
                <span className="civic-label block mb-1">Active Cases</span>
                <span className="text-lg font-bold text-slate-900 civic-mono">1,284</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 md:p-12 shadow-2xl shadow-slate-900/20 border border-white/5"
          >
            <div className="relative z-10 grid md:grid-cols-2 items-center gap-8">
              <div className="space-y-6">
                <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  Drive City Evolution. <br/>
                  <span className="text-white/60">Your contribution matters.</span>
                </h2>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
                  Report infrastructure gaps, maintenance issues, or community project suggestions with end-to-end encryption.
                </p>
                <Link 
                  to="/submit-report"
                  className="civic-button-primary w-fit px-10 py-4"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Initiate Submission</span>
                </Link>
              </div>
              
              {/* Abstract Visual Terminal */}
              <div className="hidden md:block bg-slate-900/50 border border-white/10 rounded-2xl p-6 civic-mono text-[10px] text-secondary/60 space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>SYS_PROTOCOL: V4.2</span>
                  <span>LOC: 14.5995° N, 120.9842° E</span>
                </div>
                <div className="space-y-1">
                  <p className="text-white/80 animate-pulse">Checking geospatial nodes...</p>
                  <p>Initializing secure reporting tunnel...</p>
                  <p>Metadata hashing enabled...</p>
                  <p className="text-secondary">System ready for citizen input...</p>
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent opacity-50" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
          </motion.div>
        </section>

        {/* Global Statistics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatMiniCard label="Resolved" value="12.4k" trend="+12%" />
          <StatMiniCard label="Verified" value="98.2%" trend="Stable" />
          <StatMiniCard label="Volunteers" value="3.5k" trend="+54" />
          <StatMiniCard label="Cities" value="24" trend="Live" />
        </section>

        {/* Recent Investigations */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <span className="civic-label text-secondary">Operational Feed</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Investigations</h3>
            </div>
            <Link to="/reports" className="group flex items-center gap-2 text-slate-400 hover:text-secondary transition-colors font-bold text-xs">
              Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid gap-4">
            <InvestigationCard 
              id="OPS-204-X"
              title="Infrastructure Recovery"
              location="District 4"
              status="resolved"
              time="2h ago"
              icon={<Lightbulb className="w-5 h-5" />}
            />
            <InvestigationCard 
              id="OPS-205-X"
              title="Environmental Scan"
              location="River Basin"
              status="in-progress"
              time="5h ago"
              icon={<TreePine className="w-5 h-5" />}
            />
          </div>
        </section>

        {/* Categories / Specialized Units */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Focus Units</h3>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UnitCard 
              label="Engineering" 
              desc="Civic structural integrity and urban planning" 
              icon={<span className="material-symbols-outlined text-3xl">foundation</span>}
              accent="bg-blue-50 text-blue-600"
            />
            <UnitCard 
              label="Human Capital" 
              desc="Public services and social welfare programs" 
              icon={<Users className="w-8 h-8" />}
              accent="bg-purple-50 text-purple-600"
            />
            <UnitCard 
              label="Eco-Protocol" 
              desc="Waste management and green belt conservation" 
              icon={<Trash2 className="w-8 h-8" />}
              accent="bg-emerald-50 text-emerald-600"
            />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function StatMiniCard({ label, value, trend }: { label: string, value: string, trend: string }) {
  return (
    <div className="civic-card p-5 !rounded-xl">
      <span className="civic-label block mb-2">{label}</span>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-black text-slate-900 tracking-tightest leading-none">{value}</span>
        <span className="text-[10px] font-bold text-secondary bg-secondary/5 px-1.5 py-0.5 rounded civic-mono">{trend}</span>
      </div>
    </div>
  );
}

function InvestigationCard({ id, title, location, status, time, icon }: { id: string, title: string, location: string, status: 'resolved' | 'in-progress' | 'under-review', time: string, icon: React.ReactNode }) {
  const statusStyles = {
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'in-progress': 'bg-amber-50 text-amber-700 border-amber-100',
    'under-review': 'bg-slate-50 text-slate-700 border-slate-100'
  };

  return (
    <Link to={`/reports/${id}`} className="group civic-card p-5 civic-card-hover flex items-center justify-between border-l-4 border-l-secondary/20 hover:border-l-secondary transition-all">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-300">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-slate-400 civic-mono">{id}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{location}</span>
          </div>
          <h4 className="font-bold text-slate-900 tracking-tight group-hover:text-secondary transition-colors">{title}</h4>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 text-right">
        <span className={`civic-tag ${statusStyles[status]}`}>{status.replace('-', ' ')}</span>
        <span className="text-[10px] font-medium text-slate-400">{time}</span>
      </div>
    </Link>
  );
}

function UnitCard({ label, desc, icon, accent }: { label: string, desc: string, icon: React.ReactNode, accent: string }) {
  return (
    <div className="civic-card p-8 civic-card-hover group cursor-pointer h-full flex flex-col">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${accent} group-hover:scale-110 shadow-sm`}>
        {icon}
      </div>
      <h4 className="font-black text-xl text-slate-900 mb-3 tracking-tightest group-hover:text-secondary transition-colors">{label}</h4>
      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">{desc}</p>
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 group-hover:text-secondary transition-colors uppercase tracking-[0.2em]">
        Explore Unit <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

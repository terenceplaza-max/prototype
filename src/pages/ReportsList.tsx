import { PlusCircle, Loader2, ArrowRight, Clock, Check, AlertCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Report } from '../types';
import { cn } from '../lib/utils';

export default function ReportsList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'reports'),
      where('authorId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Report[];
      setReports(docs);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredReports = reports.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'pending') return r.status === 'submitted' || r.status === 'under_review' || r.status === 'in-progress';
    if (filter === 'resolved') return r.status === 'resolved';
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-secondary/10">
      <TopAppBar title="Civic Ledger" />

      <main className="pt-24 pb-32 px-6 max-w-3xl mx-auto space-y-12">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="civic-label">Officer Audit Trail / V4.2</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tightest">Your Impact</h1>
            <p className="text-slate-500 font-medium mt-4 leading-relaxed max-w-xl text-sm md:text-base">
              A transparent, cryptographically-secure historical record of your contributions to the city's infrastructure and community welfare.
            </p>
          </motion.div>
        </section>

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>Full Ledger</FilterButton>
          <FilterButton active={filter === 'pending'} onClick={() => setFilter('pending')}>Active Tasks</FilterButton>
          <FilterButton active={filter === 'resolved'} onClick={() => setFilter('resolved')}>Verified Resolved</FilterButton>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
            <p className="civic-label animate-pulse text-secondary">Accessing Archives...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="grid gap-6">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/reports/${report.id}`} className="group block civic-card p-6 md:p-8 civic-card-hover border-l-4 border-l-slate-200/50 hover:border-l-secondary transition-all">
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="space-y-4 flex-1 min-w-0">
                       <StatusBadge status={report.status} />
                       <div>
                         <h3 className="text-2xl font-black text-slate-900 group-hover:text-secondary transition-colors tracking-tightest leading-tight">{report.title}</h3>
                         <div className="flex items-center gap-2 mt-2">
                            <MapPin className="w-3.5 h-3.5 text-secondary" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{report.location.address}</span>
                         </div>
                       </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 civic-mono">#{report.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        {report.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-2 max-w-2xl mb-8">
                    {report.description}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-secondary transition-colors">Examine Investigation Trail</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 civic-card border-dashed border-2 bg-slate-50/50">
            <div className="inline-flex w-20 h-20 items-center justify-center rounded-3xl bg-white shadow-inner text-slate-300 mb-8">
              <AlertCircle className="w-10 h-10" />
            </div>
            <p className="text-slate-900 font-black text-2xl tracking-tightest">Archive Empty</p>
            <p className="text-slate-500 text-sm mt-3 max-w-[280px] mx-auto font-medium leading-relaxed">System scan complete. Your individual civic activity ledger contains zero reported incidents.</p>
          </div>
        )}

        {/* Dynamic Action Trigger */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-10 md:p-14 rounded-3xl text-white shadow-2xl shadow-slate-900/10 relative overflow-hidden group border border-white/5"
        >
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-8">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-3xl font-black tracking-tightest leading-tight">IDENTIFY. <br className="hidden md:block"/>REPORT. <br className="hidden md:block"/>EVOLVE.</h2>
              <Link to="/submit-report" className="civic-button-primary w-full md:w-fit px-12 py-4">
                <PlusCircle className="w-5 h-5" />
                <span>Register New Incident</span>
              </Link>
            </div>
            <div className="hidden md:block text-right">
              <span className="material-symbols-outlined text-[140px] text-white/5 select-none transition-all duration-1000 group-hover:text-white/10 group-hover:scale-110 block">verified_user</span>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2",
        active 
          ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10 scale-105" 
          : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600"
      )}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    resolved: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-100', icon: <Check className="w-3.5 h-3.5" />, label: 'Verified Resolved' },
    'in-progress': { color: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-amber-100', icon: <Clock className="w-3.5 h-3.5" />, label: 'Active Investigation' },
    under_review: { color: 'bg-slate-50 text-slate-600 border-slate-200 group-hover:bg-slate-100', icon: <Clock className="w-3.5 h-3.5" />, label: 'Official Audit' },
    submitted: { color: 'bg-slate-50 text-slate-400 border-slate-200 group-hover:bg-slate-100', icon: <PlusCircle className="w-3.5 h-3.5" />, label: 'Pending Dispatch' }
  }[status] || { color: 'bg-slate-50 text-slate-400', icon: <PlusCircle className="w-3.5 h-3.5" />, label: status };

  return (
    <span className={cn(
      "civic-tag !py-2 !px-5 !rounded-xl !border-2",
      config.color
    )}>
      {config.icon}
      {config.label}
    </span>
  );
}


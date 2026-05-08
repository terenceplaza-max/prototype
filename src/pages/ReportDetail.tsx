import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, MapPin, BarChart2, Check, Clock, ShieldCheck, Verified, Loader2, Calendar, Clipboard, Download } from 'lucide-react';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Report } from '../types';

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, 'reports', id), (doc) => {
      if (doc.exists()) {
        setReport({ id: doc.id, ...doc.data() } as Report);
      }
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center space-y-6">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        <p className="civic-label animate-pulse text-secondary">Accessing Neural Cache...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-10 text-center space-y-12">
        <div className="w-24 h-24 bg-white border-2 border-dashed border-slate-200 text-slate-300 rounded-[2rem] flex items-center justify-center shadow-inner">
          <Clipboard className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tightest mb-4">RECORD_NOT_FOUND</h2>
          <p className="text-slate-500 font-medium max-w-xs mx-auto">This specific incident ledger entry has been purged or relocated within the neural archives.</p>
        </div>
        <button onClick={() => navigate('/reports')} className="civic-button-primary px-12 py-5">
          Return to Hub Ledger
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen selection:bg-secondary/10 font-sans">
      <TopAppBar title="Geospatial Analysis" showBack />

      <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <section className="space-y-10">
          <div className="flex flex-wrap items-center gap-4">
             <StatusBadge status={report.status} />
             <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Calendar className="w-4 h-4 text-secondary" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  INTAKE: {report.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
             </div>
             <button className="ml-auto w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm hover:text-secondary transition-all hover:border-secondary/30">
                <Share2 className="w-5 h-5" />
             </button>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tightest">
              {report.title}
            </h2>
            <div className="flex items-center gap-3 text-slate-400 font-bold bg-white w-fit px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-[10px] uppercase tracking-[0.2em]">{report.location.address}</span>
            </div>
          </div>
        </section>

        {/* Content Content Pattern */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-12 civic-card !p-10 md:!p-16 relative overflow-hidden group shadow-2xl shadow-slate-900/5">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 opacity-20 pointer-events-none -skew-x-12 translate-x-1/2" />
            <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                 <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Operational Narrative</h3>
              </div>
              <p className="text-2xl font-black text-slate-900 leading-relaxed tracking-tighter max-w-4xl italic">
                "{report.description}"
              </p>
              <div className="pt-12 grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-slate-100">
                <InfoItem label="Sector Classification" value={report.category} />
                <div className="space-y-2">
                  <span className="civic-label text-slate-400 block mb-2 uppercase tracking-widest">Digital Hub ID</span>
                  <span className="block font-black text-2xl text-slate-900 civic-mono tracking-tightest">#{report.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <InfoItem label="Source Node" value={report.authorName.split(' ')[0]} />
                <div className="space-y-2">
                  <span className="civic-label text-slate-400 block mb-2 uppercase tracking-widest">Impact Factor</span>
                  <span className="block font-black text-2xl text-secondary">OPTIMIZED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="civic-card !p-10 !rounded-[2.5rem] h-full shadow-xl shadow-slate-900/5 border border-slate-200">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Lifecycle Protocol</h3>
                <BarChart2 className="w-5 h-5 text-secondary" />
              </div>
              <div className="relative space-y-12 pl-4">
                <div className="absolute left-[27px] top-8 bottom-8 w-1 bg-slate-100 rounded-full"></div>
                
                <TimelineNode 
                  title="Citizen Record Registered" 
                  date={report.createdAt?.toDate().toLocaleString()} 
                  completed={true}
                  active={report.status === 'submitted'}
                />
                
                <TimelineNode 
                  title="Administrative Assessment" 
                  date={report.status !== 'submitted' ? (report.updatedAt?.toDate().toLocaleString() || 'In Progress') : 'Queue_Pending'} 
                  completed={report.status !== 'submitted' && report.status !== 'under_review'}
                  active={report.status === 'under_review' || report.status === 'in-progress'}
                />

                <TimelineNode 
                  title="Operational Outcome" 
                  date={report.status === 'resolved' ? report.updatedAt?.toDate().toLocaleString() : 'Processing_Sync'} 
                  completed={report.status === 'resolved'}
                  active={false}
                  isEnd
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="civic-card !rounded-[2.5rem] overflow-hidden group aspect-[4/4] shadow-xl shadow-slate-900/5 border-0">
               <div className="relative h-full overflow-hidden bg-slate-900">
                  <img 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 opacity-50 contrast-125 saturate-0 group-hover:saturate-100" 
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=900&fit=crop"
                    alt="Official evidence documentation"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-2">
                       <span className="block text-[9px] font-black text-secondary uppercase tracking-[0.3em]">H-FAD_VISUAL</span>
                       <p className="text-white text-[11px] font-bold uppercase tracking-widest leading-relaxed">System Verification: <br/>Cryptographically Signed</p>
                    </div>
                    <button className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all active:scale-95 shadow-2xl">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
               </div>
            </div>

            <div className="civic-card !rounded-[2.5rem] bg-slate-900 !p-10 text-white space-y-8 flex-1 border-0 shadow-2xl shadow-slate-900/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-[80px]" />
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Resolution Payload</span>
              </div>
              <p className="text-xl font-bold leading-relaxed tracking-tight text-white/90 italic">
                {report.status === 'resolved' 
                  ? "Operational Success. Official investigation concluded. Urban repairs verified per municipal OS standard."
                  : report.status === 'in-progress' 
                  ? "Operational Phase Active. Resource mobilization confirmed. Engineering units currently on-site."
                  : "Intake Acknowledged. Our assessment engine is currently prioritizing this record for terminal review."}
              </p>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="space-y-2">
                  <span className="block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Node Authenticity</span>
                  <div className="flex items-center gap-3">
                    <Verified className="w-4 h-4 text-emerald-500" />
                    <span className="text-[11px] font-black text-white/60 tracking-widest uppercase">Verified_Executor</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center opacity-20">
                  <span className="material-symbols-outlined text-4xl">verified_user</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
      <span className="civic-label text-slate-400 block mb-2 uppercase tracking-widest"> {label} </span>
      <span className="block font-black text-2xl tracking-tightest capitalize text-slate-900">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    resolved: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <Check className="w-4 h-4" />, label: 'Verified Outcome' },
    'in-progress': { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock className="w-4 h-4" />, label: 'Active Deployment' },
    under_review: { color: 'border-slate-200 bg-slate-50 text-slate-600', icon: <Clock className="w-4 h-4" />, label: 'Officer Audit' },
    submitted: { color: 'bg-slate-50 text-slate-400 border-slate-200', icon: <Clipboard className="w-4 h-4" />, label: 'Official Record' }
  }[status] || { color: 'bg-slate-50 text-slate-400', icon: <Clipboard className="w-4 h-4" />, label: status };

  return (
    <span className={cn(
      "inline-flex items-center gap-3 py-3 px-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border-2 shadow-sm",
      config.color
    )}>
      {config.icon}
      {config.label}
    </span>
  );
}

function TimelineNode({ title, date, completed, active }: any) {
  return (
    <div className="relative pl-12">
      <div className={cn(
        "absolute left-0 top-1 w-7 h-7 rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-all duration-1000",
        completed ? "bg-emerald-500 scale-110" : 
        active ? "bg-secondary animate-pulse ring-4 ring-secondary/20" : 
        "bg-slate-200"
      )}>
        {completed && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      <div className="space-y-2">
        <h4 className={cn("text-[11px] font-black uppercase tracking-[0.2em]", active ? "text-secondary" : completed ? "text-slate-900" : "text-slate-400 opacity-60")}>
          {title}
        </h4>
        <p className="text-[10px] font-black text-slate-400 civic-mono tracking-widest uppercase">{date}</p>
      </div>
    </div>
  );
}



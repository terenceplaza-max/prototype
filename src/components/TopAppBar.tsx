import { Bell, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
}

export default function TopAppBar({ title = "Butuan City OS", showBack = false }: TopAppBarProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 transition-all duration-500">
      <div className="flex justify-between items-center px-6 h-20 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-5">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <Link to="/dashboard" className="w-11 h-11 rounded-full border border-slate-200 p-0.5 bg-slate-50 shadow-inner overflow-hidden flex items-center justify-center group">
              <img 
                alt="City Seal" 
                className="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVRcrFjzqUy4aQP1OehOeccDvf1_goCkA3S-Y2ThXS8hKzH179o6Ws3rjeS91cRWU92vdoGy2NSPov4OBs48EIN2Uy1K--a1I6ZXMLSrEtMRyOxxcI9MHlIu6Sgpp0WeiPaptqfQn1OEiEoqlNC0qUvyIdfYwc2aoTq2aD8PPg4ZgqrKH8QDWoVTE-HD1RGaRD0nltBNKjO87KU_RN80FRT1-iaOFoUNifWSv83VjO7Z3_97K_o3InUJx1vR0R36WIDDkHCJGKxKUI"
                referrerPolicy="no-referrer"
              />
            </Link>
          )}
          <div>
            <h1 className="text-base font-black text-slate-900 tracking-tightest leading-none mb-1 uppercase italic">{title}</h1>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-secondary animate-pulse"></span>
              <span className="civic-mono text-[9px] font-black text-slate-400 tracking-widest uppercase">SYSTM_LIVE // V4.2</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Signal Strength</span>
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-0.5 h-1.5 rounded-full ${i < 4 ? 'bg-secondary' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all relative group">
            <Bell className="w-4 h-4 text-slate-600 transition-colors group-hover:text-secondary" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-secondary rounded-full border border-white shadow-[0_0_5px_rgba(14,165,233,0.5)]"></span>
          </button>
        </div>
      </div>
    </header>
  );
}


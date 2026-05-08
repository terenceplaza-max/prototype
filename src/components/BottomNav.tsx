import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, PlusCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'HUB', path: '/dashboard' },
    { icon: ClipboardList, label: 'LEDGER', path: '/reports' },
    { icon: User, label: 'OFFICER', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center pb-10 px-6 pointer-events-none">
      <nav className="bg-slate-900/90 backdrop-blur-3xl border border-white/10 p-1 flex items-center gap-1 shadow-2xl rounded-full pointer-events-auto ring-1 ring-black/20">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/reports' && location.pathname.startsWith('/reports'));
          const Icon = item.icon;

          return (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 group relative",
                isActive 
                  ? "bg-white text-slate-900 shadow-xl"
                  : "text-white/40 hover:text-white/80"
              )}
            >
              <Icon className={cn("w-4 h-4 transition-all duration-500", isActive && "rotate-[360deg]")} />
              <span className={cn(
                "civic-mono text-[10px] font-black transition-all duration-500 overflow-hidden whitespace-nowrap tracking-tighter",
                isActive ? "max-w-[80px] opacity-100" : "max-w-0 opacity-0"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
        <div className="w-px h-4 bg-white/10 mx-2"></div>
        <Link 
          to="/submit-report"
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
            location.pathname === '/submit-report' 
              ? "bg-secondary text-white shadow-lg shadow-secondary/40 rotate-45" 
              : "bg-white/5 text-secondary hover:bg-white/10"
          )}
        >
          <PlusCircle className="w-5 h-5" />
        </Link>
      </nav>
    </div>
  );
}


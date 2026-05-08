import { Camera, Send, MapPin, Loader2, ArrowLeft, ChevronRight, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function SubmitReport() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setLoading(true);
    try {
      const reportRef = doc(collection(db, 'reports'));
      const reportData = {
        id: reportRef.id,
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} Report`,
        description,
        category,
        location: {
          address: location,
          coordinates: { lat: 8.9472, lng: 125.5434 } // Mock Butuan coordinates
        },
        status: 'submitted',
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || 'Anonymous Citizen',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(reportRef, reportData);
      navigate('/reports');
    } catch (err: any) {
      handleFirestoreError(err, OperationType.WRITE, 'reports');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'infrastructure', label: 'Infrastructure', icon: 'architecture', desc: 'Roads & Structures' },
    { id: 'health', label: 'Public Health', icon: 'sanitizer', desc: 'Sanitation & Hygiene' },
    { id: 'environment', label: 'Environment', icon: 'eco', desc: 'Waste & Conservation' },
    { id: 'safety', label: 'Public Safety', icon: 'security', desc: 'Security & Order' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-secondary/10 font-sans">
      <TopAppBar title="Concern Intake" showBack />

      <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-12">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="civic-label">Municipal Intake Protocol / v4.2</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tightest leading-tight">Civic Intake</h2>
            <p className="text-slate-500 font-medium mt-4 text-sm md:text-base leading-relaxed max-w-xl">
              Initiate an official response by providing high-fidelity data regarding urban incidents or community requirements.
            </p>
          </motion.div>
        </section>

        <form className="space-y-16" onSubmit={handleSubmit}>
          {/* Step 1: Category Selection */}
          <section className="space-y-8">
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black italic text-slate-900/10 select-none">01</span>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Classification Unit</h3>
              </div>
              <div className="h-px flex-grow mx-8 bg-slate-200/60 hidden md:block" />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest hidden md:block">Sector Definition Required</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "civic-card p-6 md:p-8 flex flex-col items-start gap-4 text-left transition-all group relative overflow-hidden",
                    category === cat.id ? "ring-2 ring-secondary bg-white shadow-xl shadow-secondary/5" : "hover:border-slate-300"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                    category === cat.id ? "bg-secondary text-white rotate-6" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  )}>
                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  </div>
                  <div>
                    <span className="block font-black text-xl text-slate-900 tracking-tightest leading-none mb-2">{cat.label}</span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block">{cat.desc}</span>
                  </div>
                  {category === cat.id && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-secondary" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Location and Context */}
          <AnimatePresence mode="wait">
            {category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-16"
              >
                {/* Location */}
                <section className="space-y-8">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-black italic text-slate-900/10 select-none">02</span>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Spatial Reference</h3>
                    </div>
                    <div className="h-px flex-grow mx-8 bg-slate-200/60 hidden md:block" />
                    <MapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="space-y-6">
                    <div className="relative group">
                      <input 
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full h-14 bg-white border-2 border-slate-200 rounded-2xl px-6 focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all text-slate-900 font-bold placeholder:text-slate-300 placeholder:font-medium tracking-tight" 
                        placeholder="Street, Landmark, or Barangay Name" 
                        type="text"
                      />
                    </div>
                    <div className="civic-card !rounded-3xl overflow-hidden h-40 relative group grayscale hover:grayscale-0 transition-all border-dashed border-2 bg-slate-100">
                      <img 
                         className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000" 
                         src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbugWdDXG7cBuDpJfDHL2WhCA_zg1VrTygwOfcbfGMK2exgyBN9-d0cCgJe7jds-7e5FEx-pCnxMC54xlJMFcxTa__wS6zdu2Xrez-RkiUiayO6YDO4JwKX1Q5dnoG9hc3z4uRNejLQmARcx8bWbnpowyTiI6ryn4shPgUS0kIcRObn5cq4wxbOm7VpyqLtMDSwXksvjwi5BWB_yievxPlRDQwhznoBQwfY7LnV6TcExbB8mE52WZFD3Re6-rnF0ub_0QXbTMNCUc5"
                         alt="Spatial context"
                         referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center shadow-xl shadow-secondary/30">
                          <MapPin className="w-5 h-5 fill-current" />
                        </div>
                        <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </section>

                  {/* Concern */}
                  <section className="space-y-8">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-black italic text-slate-900/10 select-none">03</span>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Incident Narrative</h3>
                      </div>
                      <div className="h-px flex-grow mx-8 bg-slate-200/60 hidden md:block" />
                      <Send className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="space-y-6">
                      <textarea 
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-white border-2 border-slate-200 rounded-2xl p-6 focus:ring-4 focus:ring-secondary/10 focus:border-secondary text-slate-900 font-bold placeholder:text-slate-300 placeholder:font-medium resize-none leading-relaxed tracking-tight" 
                        placeholder="Provide a comprehensive operational summary of the concern..." 
                        rows={6}
                      />
                      
                      <div className="grid grid-cols-2 gap-6">
                         <button type="button" className="civic-card !rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 border-dashed border-2 border-slate-200 group hover:bg-white hover:border-secondary transition-all">
                            <Camera className="w-6 h-6 text-slate-300 group-hover:text-secondary transition-colors mb-3" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-slate-900">Upload Visual Data</span>
                         </button>
                         <div className="civic-card !rounded-2xl p-8 bg-slate-100/50 border-slate-200 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                               <Info className="w-4 h-4 text-slate-400" />
                               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold leading-relaxed">Submission data will be processed through end-to-end encryption and anonymized for public audits.</p>
                         </div>
                      </div>
                    </div>
                  </section>

                  {/* Submit Action */}
                  <div className="pt-12">
                    <motion.button 
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="civic-button-primary w-full h-18 text-lg font-black tracking-tightest group"
                      type="submit"
                    >
                      {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <span>Transmit Official Log</span>
                          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                    <p className="text-center text-slate-300 text-[10px] font-black mt-8 uppercase tracking-[0.3em] italic">System Verified Intake Chain</p>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}


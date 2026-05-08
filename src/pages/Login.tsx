import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { motion } from 'motion/react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Shield, ChevronRight, AlertCircle, Info } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      // Ensure we use popup for better iframe compatibility
      const result = await signInWithPopup(auth, provider);
      
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || 'Citizen',
          photoURL: result.user.photoURL || '',
          role: 'citizen',
          createdAt: serverTimestamp()
        });
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login Error:', err);
      if (err.code === 'auth/popup-blocked') {
        setError('Login popup was blocked. Please enable popups or try opening the app in a new tab.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Login attempt was cancelled. Please try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for login. Check Firebase Console.');
      } else {
        setError(err.message || 'An unexpected authentication error occurred.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 selection:bg-secondary/10 selection:text-secondary font-sans transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl shadow-slate-900/5 text-center space-y-12 relative overflow-hidden group border border-slate-100"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50" />
        
        <div className="space-y-6">
          <div className="w-24 h-24 bg-slate-950 rounded-[2rem] mx-auto flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-700">
              <img 
                alt="Butuan City Official Seal" 
                className="w-16 h-16 object-contain opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHqTvcJhafOTsEB3_RVeFL86IdqvC6i9wsrT6DAUHbrKQMZ_QDu4zjOCPXd6AsmprkS3icw3Uao24LfhgTpbQTnyQoGXmh3FbXSLdJ5qjvmZxIcO4FjI-Z-g-YgMZrbi2s0HC_CxtqSpvPMh0ZYNhQqBS_04a0kcklcytnY23_4u4LqBA7NwXf3YSTSnl-pqluF8fpmzHUu2zHDi-VsSvQQVJwO57z54rn9A2WsN3vL5jJ5XZnfF1aUaaXmu1ThANY_KxRObxttx7y"
                referrerPolicy="no-referrer"
              />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tightest leading-none uppercase italic">AUTHENTICATE.</h1>
            <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[240px] mx-auto">
              Initialize secure access to the Butuan City Civic Operating System.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            disabled={authLoading}
            onClick={loginWithGoogle}
            className="civic-button-primary w-full py-5 text-base relative group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-4">
              {authLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                  <span>Initialize Citizen ID</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-left"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-1">Auth_Error // Failure</p>
                <p className="text-xs text-red-700 font-medium leading-relaxed">{error}</p>
              </div>
            </motion.div>
          )}

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4 text-left">
            <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <span className="civic-label text-slate-500 text-[10px] block">SECURITY_NOTICE</span>
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase">
                Popups must be enabled. For maximum security, authorize sessions via verified biometric or two-factor citizen IDs.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
           <Link to="/" className="text-[10px] font-black text-slate-400 hover:text-secondary uppercase tracking-[0.3em] transition-colors">
              Return to Terminal Hub
           </Link>
        </div>
      </motion.div>
      
      <p className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] italic">
        Butuan_OS Alpha / Build 4.2.0
      </p>
    </div>
  );
}

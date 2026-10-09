import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { 
  IoPersonCircleOutline, 
  IoCartOutline, 
  IoTicketOutline, 
  IoLockClosedOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoRefreshOutline,
  IoMailOutline,
  IoLocationOutline,
  IoCalendarOutline,
  IoShirtOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline
} from 'react-icons/io5';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User
} from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string;
  photoURL: string | null;
}

export interface UserAccountPageProps {
  currentUserProfile: UserProfile | null;
}

interface AuthFormData {
  fullName?: string;
  email: string;
  password?: string;
}

interface PasswordUpdateFormData {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDOJ8Ok7anQg774u5vdCpDRqGRW2NG8dho",
  authDomain: "://firebaseapp.com",
  projectId: "uwa-fc",
  storageBucket: "uwa-fc.firebasestorage.app",
  messagingSenderId: "387684494889",
  appId: "1:387684494889:web:373435029bd43bfbbe3638",
  measurementId: "G-DF4GNF6N28"
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default function UserAccountPage({ currentUserProfile }: UserAccountPageProps) {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState<string>('profile');
  const [authMode, setAuthMode] = useState<string>('login'); 
  const [liveUser, setLiveUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [recentSuites, setRecentSuites] = useState<any[]>([]);
  const [membershipRegistered, setMembershipRegistered] = useState<boolean>(false);

  const { register: registerAuth, handleSubmit: handleAuthSubmit, reset: resetAuthForm, watch: watchAuth } = useForm<AuthFormData>({
    defaultValues: { fullName: '', email: '', password: '' }
  });

  const authEmailValue = watchAuth('email');

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, reset: resetPasswordForm } = useForm<PasswordUpdateFormData>({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
  });
  const liveUserProfile = {
    uid: liveUser ? liveUser.uid : "UWA-GUEST-NODE",
    name: liveUser ? (liveUser.displayName || "Simbas Supporter") : "Guest Supporter",
    email: liveUser ? (liveUser.email || "") : "guest@uwa-fc.com",
    joinedDate: liveUser ? "Verified Cloud Profile" : "Not Registered",
    membershipTier: membershipRegistered ? "Official Club Member" : "Guest Pass Tier",
    memberSince: "Season 26/27",
    loyaltyPoints: liveUser ? "1,450 XP" : "0 XP",
    walletBalance: liveUser ? "45,000 UGX" : "0 UGX"
  };

  const accountTabs = [
    { id: 'profile', label: 'Dashboard Hub', icon: <IoPersonCircleOutline /> },
    { id: 'tickets', label: 'Digital Passes', icon: <IoTicketOutline /> },
    { id: 'orders', label: 'Kit & Merch Store', icon: <IoCartOutline /> }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLiveUser(user);
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!liveUser) return;
    const fetchFanCrossCollectionHistoryLog = async () => {
      try {
        const userQueryEmail = liveUser.email;
        if (!userQueryEmail) return;
        
        const ticketsSnap = await getDocs(query(collection(db, "match_tickets"), where("fanEmail", "==", userQueryEmail), orderBy("timestamp", "desc"), limit(4)));
        setRecentTickets(ticketsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const ordersSnap = await getDocs(query(collection(db, "orders"), where("customerEmail", "==", userQueryEmail), orderBy("timestamp", "desc"), limit(4)));
        setRecentOrders(ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const suitesSnap = await getDocs(query(collection(db, "hospitality_bookings"), where("customerEmail", "==", userQueryEmail), orderBy("timestamp", "desc"), limit(2)));
        setRecentSuites(suitesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const membersSnap = await getDocs(query(collection(db, "registrations"), where("customerEmail", "==", userQueryEmail)));
        if (!membersSnap.empty) setMembershipRegistered(true);
      } catch (err) { 
        console.error("Database query synchronization delay: ", err); 
      }
    };
    fetchFanCrossCollectionHistoryLog();
  }, [liveUser]);
  const authMutation = useMutation({
    mutationFn: async (data: AuthFormData) => {
      if (authMode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password || '');
        await updateProfile(userCredential.user, {
          displayName: data.fullName || "Simbas Supporter"
        });
        return auth.currentUser;
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password || '');
        return userCredential.user;
      }
    },
    onSuccess: (user) => {
      setLiveUser(user);
      resetAuthForm();
      if (authMode === 'register') {
        alert("Account initialized! Profile mapped to global cloud registries successfully.");
      }
    },
    onError: (err: any) => {
      console.error("Auth Engine Fault Error: ", err);
      if (err.code === 'auth/email-already-in-use') {
        alert("Security Alert: This email is already active in our network grids.");
      } else {
        alert(err.message?.replace("Firebase: ", "").replace("auth/", "") || "Authentication structural fault.");
      }
    }
  });

  const passwordMutation = useMutation({
    mutationFn: async (data: PasswordUpdateFormData) => {
      if (!auth.currentUser || !auth.currentUser.email) throw new Error("No user profile session located.");
      if (data.newPassword !== data.confirmPassword) throw new Error("New password values do not match verification check.");
      if ((data.newPassword || '').length < 6) throw new Error("Passwords must contain a minimum of 6 characters.");

      const credential = EmailAuthProvider.credential(auth.currentUser.email, data.currentPassword || '');
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, data.newPassword || '');
    },
    onSuccess: () => {
      alert("Security Update Success: Your account login credential profile has been updated on cloud layers.");
      resetPasswordForm();
    },
    onError: (err: any) => {
      console.error("Credential rotation malfunction:", err);
      if (err.code === 'auth/wrong-password') {
        alert("Authentication Error: The current profile password provided is invalid.");
      } else if (err.code === 'auth/requires-recent-login') {
        alert("Security Rule Halt: This operation requires a fresh login session. Please exit and log back in to renew your keys.");
      } else {
        alert(err.message || "An unresolved error occurred during credential adjustment.");
      }
    }
  });

  const handleForgotPasswordRecoveryRequest = async (): Promise<void> => {
    if (!authEmailValue) {
      alert("Please input your active email address into the form input below first to trigger recovery.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, authEmailValue);
      alert(`Success! A secure password recovery reference link has been dispatched to: ${authEmailValue}. Please check your email inbox to update your password.`);
    } catch (err) {
      alert("Recovery Error: Please check if the email string complies with standard network formats.");
    }
  };

  const handleSignOut = (): void => {
    signOut(auth).then(() => {
      resetAuthForm();
      resetPasswordForm();
      setLiveUser(null);
      setRecentOrders([]);
      setRecentTickets([]);
      setRecentSuites([]);
      setMembershipRegistered(false);
      setActiveSegment('profile');
    });
  };

  if (isAuthChecking) {
    return (
      <div className="w-full min-h-screen px-4 py-8 text-center text-white flex flex-col justify-center items-center font-mono text-sm bg-[#031109]">
        <div className="animate-spin text-[#D4AF37] mb-3"><IoRefreshOutline size={28} /></div>
        <p className="tracking-widest uppercase text-white font-bold text-xs">Compiling Wildlife stars Security Enclaves...</p>
      </div>
    );
  }
  if (!liveUser) {
    return (
      <div className="w-full min-h-screen px-4 py-8 flex items-center justify-center box-border" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
        <div className="w-full max-w-[380px] bg-[#041A0E] border-2 border-[#D4AF37]/30 p-6 rounded-2xl shadow-2xl box-border">
          
          <div className="text-center border-b-2 border-white/10 pb-4 mb-5">
            <span className="font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest block text-[#D4AF37]">Personalized Fan Desk</span>
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight mt-1 text-white">Wildlife Stars Registry Locker</h3>
            <p className="text-white font-medium text-xs leading-normal mt-2 max-w-xs mx-auto font-sans opacity-95">
              Please log in or create an identity profile to view your personalized match tickets, season passes, and merchandise order receipts.
            </p>
          </div>
          <form onSubmit={handleAuthSubmit((data) => authMutation.mutate(data))} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="text-[10px] sm:text-xs uppercase font-black tracking-wider text-white block mb-1">Full Legal Name</label>
                <div className="relative">
                  <IoPersonOutline className="absolute left-3 top-3 text-[#D4AF37] text-sm z-20 font-bold" />
                  <Input required type="text" {...registerAuth("fullName")} placeholder="e.g., Lwabya Eric" className="w-full h-11 py-2 pl-9 pr-2 bg-black/60 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] font-mono font-bold placeholder:text-gray-500" />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] sm:text-xs uppercase font-black tracking-wider text-white block mb-1">Email Registry Link</label>
              <div className="relative">
                <IoMailOutline className="absolute left-3 top-3 text-[#D4AF37] text-sm z-20 font-bold" />
                <Input required type="email" {...registerAuth("email")} placeholder="name@domain.com" className="w-full h-11 py-2 pl-9 pr-2 bg-black/60 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] font-mono font-bold placeholder:text-gray-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] sm:text-xs uppercase font-black tracking-wider text-white block">Profile Password</label>
                {authMode === 'login' && (
                  <span onClick={handleForgotPasswordRecoveryRequest} className="text-[#D4AF37] text-[10px] font-mono font-black uppercase tracking-wider hover:underline cursor-pointer select-none">Forgot?</span>
                )}
              </div>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-3 top-3 text-[#D4AF37] text-sm z-20 font-bold" />
                <Input required type={showPassword ? "text" : "password"} {...registerAuth("password")} placeholder="••••••••" className="w-full h-11 py-2 pl-9 pr-9 bg-black/60 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] font-mono font-bold" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 cursor-pointer h-5 w-5 flex items-center justify-center bg-transparent border-0 focus:outline-none z-20">
                  {showPassword ? <IoEyeOffOutline size={14} style={{ color: '#D4AF37' }} /> : <IoEyeOutline size={14} style={{ color: '#D4AF37' }} />}
                </button>
              </div>
            </div>
            
            <div className="pt-2 flex justify-center w-full">
              <Button type="submit" disabled={authMutation.isPending} className="w-full h-11 bg-[#0B4622] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#073016] text-[10px] sm:text-xs tracking-widest font-mono font-black rounded-xl cursor-pointer transform active:scale-95 transition-all shadow-xl uppercase">
                {authMutation.isPending ? "Validating Connection..." : authMode === 'login' ? "Access Fan Profile" : "Register Profile Credentials"}
              </Button>
            </div>
          </form>

          <div className="text-center mt-4 pt-3 border-t border-white/10 text-[10px] sm:text-xs font-sans text-white font-medium">
            {authMode === 'login' ? (
              <p>New to the savanna? <span onClick={() => setAuthMode('register')} className="text-[#D4AF37] cursor-pointer font-black underline ml-1">Create Profile Now</span></p>
            ) : (
              <p>Already mapped? <span onClick={() => setAuthMode('login')} className="text-[#D4AF37] cursor-pointer font-black underline ml-1">Log In Here</span></p>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden" style={{ background: 'linear-gradient(to bottom, #020B05 0%, #010502 100%)' }}>
      <div className="max-w-4xl mx-auto container w-full box-border px-0">
        
        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider mb-4 text-white w-full whitespace-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => navigate({ to: '/' })}>Home</span> / <span style={{ color: '#D4AF37' }}>Supporter Portal</span> / <span className="text-white capitalize font-sans font-bold">{activeSegment}</span>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden p-4 mb-4 border-2 border-white/10 bg-gradient-to-r from-[#041A0E] via-[#020B05] to-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xl">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-600 p-0.5 shadow-xl flex-none">
              <div className="h-full w-full rounded-full bg-[#020B05] flex items-center justify-center font-black text-sm text-[#D4AF37]">
                {liveUserProfile.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm sm:text-xl font-black uppercase tracking-tight text-white leading-none truncate max-w-[140px] sm:max-w-[200px]">{liveUserProfile.name}</h2>
                <span className="text-[7px] sm:text-[9px] font-mono font-black uppercase bg-[#D4AF37] text-black px-2 py-0.5 rounded-md tracking-widest shadow-md">{liveUserProfile.memberSince}</span>
              </div>
              <p className="text-neutral-300 text-xs font-mono font-bold mt-1 truncate max-w-[160px] sm:max-w-[200px]">{liveUserProfile.email}</p>
            </div>
          </div>

          <div className="flex justify-between sm:justify-start gap-4 sm:gap-6 border-t-2 sm:border-t-0 sm:border-l-2 border-white/10 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto font-mono items-center">
            <div className="text-left">
              <span className="text-[7px] sm:text-[9px] uppercase font-black tracking-wider text-neutral-400 block mb-0.5">LOYALTY SCORE</span>
              <span className="text-xs sm:text-base font-black text-[#D4AF37]">{liveUserProfile.loyaltyPoints}</span>
            </div>
            <div className="text-left">
              <span className="text-[7px] sm:text-[9px] uppercase font-black tracking-wider text-neutral-400 block mb-0.5">MOMO WALLET</span>
              <span className="text-xs sm:text-base font-black text-white">{liveUserProfile.walletBalance}</span>
            </div>
            <button type="button" onClick={handleSignOut} className="px-2 py-1 rounded bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-[9px] sm:text-xs uppercase font-black flex items-center gap-0.5 cursor-pointer self-center transition-all hover:bg-red-900"><IoLogOutOutline size={12} /> Exit</button>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full box-border touch-pan-x">
          {accountTabs.map((tab) => (
            <button key={tab.id} type="button" onClick={() => setActiveSegment(tab.id)} className={`px-3.5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider font-mono border flex items-center gap-1.5 flex-none transition-all cursor-pointer ${activeSegment === tab.id ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/50 shadow-md' : 'bg-transparent text-neutral-400 border-white/5 hover:bg-white/5'}`}>{tab.label}</button>
          ))}
        </div>
        <div className="w-full bg-[#041A0E]/30 backdrop-blur-md rounded-2xl border-2 p-4 sm:p-6 box-border border-white/10 shadow-2xl">
          {activeSegment === 'profile' && (
            <div className="space-y-6 w-full box-border animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start">
                
                <div className="p-4 sm:p-5 rounded-2xl relative overflow-hidden bg-gradient-to-br from-[#062613] to-[#020B05] border-2 border-[#D4AF37]/30 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] shadow-2xl">
                  <div>
                    <span className="text-[7px] font-mono font-black uppercase text-[#D4AF37] tracking-widest bg-black/40 px-2 py-0.5 rounded border border-white/10">Official Supporter Card</span>
                    <h3 className="text-sm sm:text-xl font-black uppercase tracking-tight mt-2 text-white">{liveUserProfile.membershipTier}</h3>
                  </div>
                  <div className="flex justify-between items-end pt-2.5 border-t border-white/10 font-mono text-[9px] sm:text-xs">
                    <div><span className="text-neutral-400 block text-[6px] uppercase tracking-wider font-sans font-bold">HOLDER</span><span className="font-black text-white uppercase truncate max-w-[110px] block">{liveUserProfile.name}</span></div>
                    <div className="text-right"><span className="text-neutral-400 block text-[6px] uppercase tracking-wider font-sans font-bold">SERIAL TOKEN</span><span className="font-bold text-neutral-300 font-mono">{liveUserProfile.uid.substring(0, 10).toUpperCase()}</span></div>
                  </div>
                </div>

                <div className="space-y-2 p-1 font-sans text-xs sm:text-sm text-white text-left">
                  <h4 className="text-white font-black uppercase tracking-wider flex items-center gap-1.5 border-b-2 border-white/10 pb-2 text-xs sm:text-base"><span className="h-3.5 w-1.5 bg-[#D4AF37] rounded-full"></span> Security Account Parameters</h4>
                  <p className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/80 font-bold">Authorized Name:</span> <span className="font-black text-white truncate max-w-[140px] text-right">{liveUserProfile.name}</span></p>
                  <p className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/80 font-bold">Registry Gateway:</span> <span className="font-mono text-white text-right max-w-[140px] truncate">{liveUserProfile.email}</span></p>
                  <p className="flex justify-between pt-0.5"><span className="text-white/80 font-bold">Enrollment Basis:</span> <span className="text-white font-mono text-right truncate font-bold">{liveUserProfile.joinedDate}</span></p>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit((data) => passwordMutation.mutate(data))} className="p-4 bg-black/30 border-2 border-white/10 rounded-2xl space-y-3.5 max-w-sm text-left shadow-xl w-full">
                <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-wider flex items-center gap-1 border-b border-white/5 pb-1.5 font-mono"><IoRefreshOutline size={14} className={passwordMutation.isPending ? "animate-spin" : ""} /> Update Secure Password</h4>
                
                <div>
                  <label className="block text-[8px] sm:text-[9px] font-mono uppercase text-white font-bold tracking-wider mb-1">Current Password *</label>
                  <div className="relative">
                    <Input required type={showCurrentPassword ? "text" : "password"} {...registerPassword("currentPassword")} placeholder="Verify current credentials..." className="w-full bg-black/40 border border-white/20 rounded-xl p-2 pr-8 h-10 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37] placeholder:text-gray-500 font-bold" />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-2.5 top-3 cursor-pointer h-4 w-4 flex items-center justify-center bg-transparent border-0 focus:outline-none z-20">
                      {showCurrentPassword ? <IoEyeOffOutline size={12} style={{ color: '#D4AF37' }} /> : <IoEyeOutline size={12} style={{ color: '#D4AF37' }} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] sm:text-[9px] font-mono uppercase text-white font-bold tracking-wider mb-1">Input New Password Keys *</label>
                  <div className="relative">
                    <Input required type={showNewPassword ? "text" : "password"} {...registerPassword("newPassword")} placeholder="Enter at least 6 characters..." className="w-full bg-black/40 border border-white/20 rounded-xl p-2 pr-8 h-10 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37] placeholder:text-gray-500 font-bold" />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-2.5 top-3 cursor-pointer h-4 w-4 flex items-center justify-center bg-transparent border-0 focus:outline-none z-20">
                      {showNewPassword ? <IoEyeOffOutline size={12} style={{ color: '#D4AF37' }} /> : <IoEyeOutline size={12} style={{ color: '#D4AF37' }} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] sm:text-[9px] font-mono uppercase text-white font-bold tracking-wider mb-1">Confirm New Password Keys *</label>
                  <div className="relative">
                    <Input required type={showConfirmPassword ? "text" : "password"} {...registerPassword("confirmPassword")} placeholder="Re-type new password..." className="w-full bg-black/40 border border-white/20 rounded-xl p-2 pr-8 h-10 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37] placeholder:text-gray-500 font-bold" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2.5 top-3 cursor-pointer h-4 w-4 flex items-center justify-center bg-transparent border-0 focus:outline-none z-20">
                      {showConfirmPassword ? <IoEyeOffOutline size={12} style={{ color: '#D4AF37' }} /> : <IoEyeOutline size={12} style={{ color: '#D4AF37' }} />}
                    </button>
                  </div>
                </div>
                
                <div className="pt-1.5 flex justify-center w-full">
                  <Button type="submit" disabled={passwordMutation.isPending} className="w-full h-10 bg-[#0B4622] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#073016] rounded-xl font-mono font-black text-[8px] sm:text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md">
                    {passwordMutation.isPending ? "Syncing Keys..." : "Apply Security Key Update 🔑"}
                  </Button>
                </div>
              </form>
            </div>
          )}
          {activeSegment === 'tickets' && (
            <div className="space-y-4 w-full box-border animate-fadeIn">
              <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide border-b-2 border-white/10 pb-2 text-left">Active Stadium Match Day Passes</h3>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-6 w-full">
                {recentTickets.length > 0 ? recentTickets.map((ticket: any) => (
                  <div key={ticket.id} className="bg-black/40 border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col justify-between min-h-[115px] sm:min-h-[130px] shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[7px] font-mono font-black bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border uppercase tracking-tight">{ticket.ticketType && ticket.ticketType.includes('VIP') ? 'Pavilion' : 'Terraces'}</span>
                        <h4 className="text-white font-black text-xs sm:text-base uppercase mt-1.5 truncate max-w-[100px] sm:max-w-[130px] leading-tight text-left">{ticket.matchName || "vs Vipers SC"}</h4>
                      </div>
                      <div className="text-neutral-400"><IoLocationOutline size={14} /></div>
                    </div>
                    <div className="flex justify-between items-end pt-1.5 border-t border-white/5 font-mono text-[8px] sm:text-[9px] w-full">
                      <div className="min-w-0 flex-1 mr-2 text-left">
                        <span className="text-neutral-500 block text-[5px] uppercase font-sans font-bold">ASSIGNMENT</span>
                        <span className="text-white font-bold font-sans truncate block leading-tight">{ticket.gate || "UWA FC Arena • Gate B"}</span>
                      </div>
                      <span className="text-emerald-400 font-black uppercase flex items-center gap-0.5 font-sans flex-none"><IoShieldCheckmarkOutline size={10} /> Active</span>
                    </div>
                  </div>
                )) : null}
                
                {recentSuites.map((suite: any) => (
                  <div key={suite.id} className="bg-black/40 border-2 border-[#D4AF37]/30 rounded-2xl p-3 sm:p-4 flex flex-col justify-between min-h-[115px] sm:min-h-[130px] shadow-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[7px] font-mono font-black bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border uppercase tracking-tight">{suite.selectedPackage || "VIP Executive"}</span>
                        <h4 className="text-white font-black text-xs sm:text-base uppercase mt-1.5 leading-tight text-left">VIP Suite</h4>
                      </div>
                      <div className="text-[#D4AF37]"><IoCalendarOutline size={14} /></div>
                    </div>
                    <div className="flex justify-between items-end pt-1.5 border-t border-white/5 font-mono text-[8px] sm:text-[9px] w-full">
                      <div className="min-w-0 flex-1 mr-2 text-left">
                        <span className="text-neutral-400 block text-[5px] uppercase font-sans font-bold">ALLOCATION</span>
                        <span className="text-white font-bold font-sans truncate block leading-tight">x{suite.purchasedQuantity || 1} Guests Registered</span>
                      </div>
                      <span className="text-amber-400 font-black uppercase flex items-center gap-0.5 font-sans flex-none"><IoTimeOutline size={10} /> Paid</span>
                    </div>
                  </div>
                ))}

                {recentTickets.length === 0 && recentSuites.length === 0 && (
                  <div className="p-4 bg-black/10 border border-dashed border-white/10 rounded-2xl text-center font-sans text-xs font-bold text-white col-span-2 py-6">No active matchday passes linked under this profile string.</div>
                )}
              </div>
            </div>
          )}

          {activeSegment === 'orders' && (
            <div className="space-y-4 w-full box-border animate-fadeIn">
              <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-wide border-b-2 border-white/10 pb-2 text-left">Official Merchandise Order Tracking</h3>
              {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                <div key={order.id} className="p-3 rounded-2xl bg-black/30 border border-white/10 flex flex-col sm:flex-row justify-between items-stretch gap-3 text-left shadow-lg">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-10 w-10 bg-neutral-900 rounded-xl flex items-center justify-center text-[#D4AF37] border border-white/10 flex-none"><IoShirtOutline size={16} /></div>
                    <div className="min-w-0 flex-1 text-left">
                      <span className="text-[6px] font-mono font-black text-neutral-400 block">INVOICE #{order.orderId ? order.orderId.substring(0, 10).toUpperCase() : String(order.id).substring(0, 6).toUpperCase()}</span>
                      <h4 className="text-white font-black text-xs sm:text-base uppercase tracking-tight truncate max-w-[140px] sm:max-w-[200px] leading-tight mt-0.5">{order.orderedItems && order.orderedItems.length > 0 ? order.orderedItems.name : (order.itemName || "Club Kit Apparel")}</h4>
                      <p className="text-emerald-400 font-bold font-mono text-xs mt-0.5">UGX {(order.netTotalCost || order.totalPrice || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-1 font-sans min-w-[120px]">
                    <div className="flex justify-between text-[7px] sm:text-[8px] font-black uppercase text-white mb-1"><span>Ordered</span><span className="text-[#D4AF37]">In Transit</span><span>Delivered</span></div>
                    <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#0B4622] to-[#D4AF37] rounded-full w-2/3" />
                    </div>
                  </div>
                </div>
              )) : <div className="p-4 bg-black/10 border border-dashed border-white/10 rounded-2xl text-center font-sans text-xs font-bold text-white py-6">No historical orders found under this account profile link.</div>}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

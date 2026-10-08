import React, { useState, useEffect } from 'react';
import { Route } from '@/routes/account/$subSection';
import { useNavigate } from '@tanstack/react-router';
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
  const { subSection } = Route.useParams();
  const activeSegment: string = subSection || 'profile';
  
  const [authMode, setAuthMode] = useState<string>('login'); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [liveUser, setLiveUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [recentSuites, setRecentSuites] = useState<any[]>([]);
  const [membershipRegistered, setMembershipRegistered] = useState<boolean>(false);
  const liveUserProfile = {
    uid: liveUser ? liveUser.uid : "UWA-GUEST-NODE",
    name: liveUser ? (liveUser.displayName || "Simbas Supporter") : "Guest Supporter",
    email: liveUser ? liveUser.email : "guest@uwa-fc.com",
    joinedDate: liveUser ? "Verified Cloud Profile" : "Not Registered",
    membershipTier: membershipRegistered ? "Official Club Member" : "Guest Pass Tier",
    memberSince: "Season 26/27",
    loyaltyPoints: liveUser ? "1,450 XP" : "0 XP",
    walletBalance: liveUser ? "45,000 UGX" : "0 XP"
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

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill out all mandatory fields.");
      return;
    }
    setIsLoading(true);

    try {
      if (authMode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: fullName || "Simbas Supporter"
        });
        setLiveUser(auth.currentUser);
        alert("Account initialized! Profile mapped to global cloud registries successfully.");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setLiveUser(userCredential.user);
      }
    } catch (err: any) {
      console.error("Auth Engine Fault Error: ", err);
      if (err.code === 'auth/email-already-in-use') {
        alert("Security Alert: This email is already active in our network grids.");
      } else {
        alert(err.message.replace("Firebase: ", "").replace("auth/", ""));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecurePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser || !auth.currentUser.email) {
      alert("Security Halt: No active credential user segment located.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Input Failure: New password values do not match verification check.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Security Halt: Passwords must contain a minimum of 6 characters.");
      return;
    }

    setIsChangingPassword(true);

    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      
      alert("Security Update Success: Your account login credential profile has been updated on cloud layers.");
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error("Credential rotation malfunction:", err);
      if (err.code === 'auth/wrong-password') {
        alert("Authentication Error: The current profile password provided is invalid.");
      } else if (err.code === 'auth/requires-recent-login') {
        alert("Security Rule Halt: This operation requires a fresh login session. Please exit and log back in to renew your keys.");
      } else {
        alert(err.message.replace("Firebase: ", "").replace("auth/", ""));
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleForgotPasswordRecoveryRequest = async (): Promise<void> => {
    if (!email) {
      alert("Please input your active email address into the form input below first to trigger recovery.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Success! A secure password recovery reference link has been dispatched to: ${email}. Please check your email inbox to update your password.`);
    } catch (err) {
      alert("Recovery Error: Please check if the email string complies with standard network formats.");
    }
  };

  const handleSignOut = (): void => {
    signOut(auth).then(() => {
      setEmail('');
      setPassword('');
      setFullName('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLiveUser(null);
      setRecentOrders([]);
      setRecentTickets([]);
      setRecentSuites([]);
      setMembershipRegistered(false);
      navigate({ to: '/account/\$subSection', params: { subSection: 'profile' } });
    });
  };

  if (isAuthChecking) {
    return (
      <div className="w-full min-h-screen px-4 py-8 text-center text-white flex flex-col justify-center items-center font-mono text-xs bg-[#031109]">
        <div className="animate-spin text-[#D4AF37] mb-2"><IoRefreshOutline size={24} /></div>
        <p className="tracking-widest uppercase text-neutral-500 text-[8px]">Compiling Wildlife stars Security Enclaves...</p>
      </div>
    );
  }
  if (!liveUser) {
    return (
      <div className="w-full min-h-screen px-3 py-6 flex items-center justify-center box-border" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
        <div className="w-full max-w-[320px] bg-[#041A0E]/50 border border-white/5 p-4 rounded-xl shadow-2xl box-border">
          
          <div className="text-center border-b border-white/5 pb-2.5 mb-4">
            <span className="font-mono font-bold text-[7px] sm:text-[8px] uppercase tracking-widest block text-[#D4AF37]">Personalized Fan Desk</span>
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight mt-0.5">Wildlife Stars Registry Locker</h3>
            <p className="text-neutral-500 text-[8px] leading-tight mt-1 max-w-xs mx-auto">
              Please log in or create an identity profile to view your personalized match tickets, season passes, and merchandise order receipts. Duplicate emails are strictly restricted.
            </p>
          </div>
          <form onSubmit={handleAuthentication} className="space-y-3">
            {authMode === 'register' && (
              <div>
                <label className="text-[7px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">Full Legal Name</label>
                <div className="relative">
                  <IoPersonOutline className="absolute left-2 top-2 text-gray-500 text-xs" />
                  <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g., Lwabya Eric" className="w-full py-1.5 pl-7 pr-2 bg-black/40 border border-white/10 rounded-md text-[10px] text-white focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
            )}

            <div>
              <label className="text-[7px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">Email Registry Link</label>
              <div className="relative">
                <IoMailOutline className="absolute left-2 top-2 text-gray-500 text-xs" />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full py-1.5 pl-7 pr-2 bg-black/40 border border-white/10 rounded-md text-[10px] text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-0.5">
                <label className="text-[7px] uppercase font-bold tracking-wider text-gray-400 block">Profile Password</label>
                {authMode === 'login' && (
                  <span onClick={handleForgotPasswordRecoveryRequest} className="text-[#D4AF37] text-[7px] font-mono hover:underline cursor-pointer select-none">Forgot Password?</span>
                )}
              </div>
              <div className="relative">
                <IoLockClosedOutline className="absolute left-2 top-2 text-gray-500 text-xs" />
                <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full py-1.5 pl-7 pr-7 bg-black/40 border border-white/10 rounded-md text-[10px] text-white focus:outline-none focus:border-[#D4AF37]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 cursor-pointer h-4 w-4 flex items-center justify-center bg-transparent border-0 focus:outline-none">
                  {showPassword ? <IoEyeOffOutline size={12} style={{ color: '#D4AF37' }} /> : <IoEyeOutline size={12} style={{ color: '#D4AF37' }} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full py-2 bg-[#0B4622] hover:bg-[#073016] text-[#D4AF37] font-black text-[9px] uppercase rounded border border-[#D4AF37]/30 transition-all tracking-wider cursor-pointer mt-1.5">
              {isLoading ? "Validating Connection..." : authMode === 'login' ? "Access Fan Profile" : "Register Profile Credentials"}
            </button>
          </form>

          <div className="text-center mt-3 pt-2 border-t border-white/5 text-[9px] font-sans text-neutral-400">
            {authMode === 'login' ? (
              <p>New to the savanna? <span onClick={() => setAuthMode('register')} className="text-[#D4AF37] cursor-pointer font-bold underline">Create Profile Now</span></p>
            ) : (
              <p>Already mapped? <span onClick={() => setAuthMode('login')} className="text-[#D4AF37] cursor-pointer font-bold underline">Log In Here</span></p>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen px-2 sm:px-6 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden" style={{ background: 'linear-gradient(to bottom, #020B05 0%, #010502 100%)' }}>
      <div className="max-w-4xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1 text-[8px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-3 text-neutral-500">
          <span className="cursor-pointer hover:text-[#D4AF37]" onClick={() => navigate({ to: '/' })}>Home</span> / <span style={{ color: '#D4AF37' }}>Supporter Portal</span> / <span className="text-neutral-300 capitalize">{activeSegment}</span>
        </div>

        <div className="relative w-full rounded-xl overflow-hidden p-3 mb-3 border border-white/5 bg-gradient-to-r from-[#041A0E] via-[#020B05] to-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-600 p-0.5 shadow-xl flex-none">
              <div className="h-full w-full rounded-full bg-[#020B05] flex items-center justify-center font-black text-xs text-[#D4AF37]">
                {liveUserProfile.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 flex-wrap">
                <h2 className="text-xs sm:text-lg font-black uppercase tracking-tight text-white leading-none truncate max-w-[120px] sm:max-w-[160px]">{liveUserProfile.name}</h2>
                <span className="text-[6px] sm:text-[8px] font-mono font-black uppercase bg-[#D4AF37] text-black px-1.5 py-0.5 rounded tracking-widest shadow-md">{liveUserProfile.memberSince}</span>
              </div>
              <p className="text-neutral-400 text-[9px] sm:text-xs font-sans font-medium mt-0.5 truncate max-w-[140px] sm:max-w-none">{liveUserProfile.email}</p>
            </div>
          </div>

          <div className="flex justify-between sm:justify-start gap-4 sm:gap-6 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4 w-full sm:w-auto font-mono">
            <div className="text-left">
              <span className="text-[6px] sm:text-[8px] uppercase tracking-wider text-neutral-500 block">LOYALTY SCORE</span>
              <span className="text-[11px] sm:text-sm font-black text-[#D4AF37]">{liveUserProfile.loyaltyPoints}</span>
            </div>
            <div className="text-left">
              <span className="text-[6px] sm:text-[8px] uppercase tracking-wider text-neutral-500 block">MOMO WALLET</span>
              <span className="text-[11px] sm:text-sm font-black text-white">{liveUserProfile.walletBalance}</span>
            </div>
            <button type="button" onClick={handleSignOut} className="px-1.5 py-0.5 rounded bg-red-950/40 border border-red-500/20 text-red-400 font-mono text-[7px] sm:text-[8px] uppercase font-bold flex items-center gap-0.5 cursor-pointer self-center"><IoLogOutOutline size={10} /> Exit</button>
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto pb-1.5 mb-3 scrollbar-none w-full box-border touch-pan-x">
          {accountTabs.map((tab) => (
            <button key={tab.id} type="button" onClick={() => navigate({ to: '/account/\$subSection', params: { subSection: tab.id } })} className={`px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 flex-none transition-all cursor-pointer ${activeSegment === tab.id ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/40' : 'bg-transparent text-neutral-400 border-white/5'}`}>{tab.label}</button>
          ))}
        </div>
        <div className="w-full bg-[#041A0E]/20 backdrop-blur-md rounded-xl border p-2.5 sm:p-5 box-border border-white/5">
          
          {activeSegment === 'profile' && (
            <div className="space-y-4 w-full box-border animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full items-start">
                
                <div className="p-3.5 rounded-xl relative overflow-hidden bg-gradient-to-br from-[#062613] to-[#020B05] border border-[#D4AF37]/20 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] shadow-xl">
                  <div>
                    <span className="text-[6px] font-mono font-black uppercase text-[#D4AF37] tracking-widest bg-black/40 px-1.5 py-0.5 rounded border border-white/5">Official Supporter Card</span>
                    <h3 className="text-xs sm:text-base font-black uppercase tracking-tight mt-1.5 text-white">{liveUserProfile.membershipTier}</h3>
                  </div>
                  <div className="flex justify-between items-end pt-2 border-t border-white/5 font-mono text-[8px]">
                    <div><span className="text-neutral-500 block text-[5px]">HOLDER</span><span className="text-[9px] font-bold text-white uppercase truncate max-w-[80px] block">{liveUserProfile.name}</span></div>
                    <div className="text-right"><span className="text-neutral-500 block text-[5px]">SERIAL TOKEN</span><span className="text-[9px] font-bold text-neutral-300">{liveUserProfile.uid.substring(0, 10)}</span></div>
                  </div>
                </div>
                <div className="space-y-1.5 p-1 font-sans text-[10px] text-neutral-300">
                  <h4 className="text-white font-black uppercase tracking-wider flex items-center gap-1 border-b border-white/5 pb-1"><span className="h-2 w-0.5 bg-[#D4AF37] rounded-full"></span> Security Account Parameters</h4>
                  <p className="flex justify-between border-b border-white/5 pb-0.5"><span className="text-neutral-500">Authorized Name:</span> <span className="font-medium text-white truncate max-w-[120px] text-right">{liveUserProfile.name}</span></p>
                  <p className="flex justify-between border-b border-white/5 pb-0.5"><span className="text-neutral-500">Registry Gateway:</span> <span className="font-mono text-white text-right max-w-[120px] truncate">{liveUserProfile.email}</span></p>
                  <p className="flex justify-between"><span className="text-neutral-500">Enrollment Basis:</span> <span className="text-neutral-400 font-mono text-right truncate">{liveUserProfile.joinedDate}</span></p>
                </div>
              </div>

              <form onSubmit={handleSecurePasswordUpdate} className="p-3 bg-black/30 border border-white/5 rounded-xl space-y-2 max-w-sm text-left">
                <h4 className="text-[#D4AF37] font-black text-[10px] uppercase tracking-tight flex items-center gap-1"><IoRefreshOutline size={12} className={isChangingPassword ? "animate-spin" : ""} /> Change Profile Secure Password</h4>
                
                <div>
                  <label className="block text-[6px] font-mono uppercase text-neutral-400 tracking-wider mb-0.5">Current Password *</label>
                  <div className="relative">
                    <input required type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Verify current credentials..." className="w-full bg-black/40 border border-white/10 rounded-md p-1.5 pr-7 text-[10px] text-white font-mono focus:outline-none focus:border-[#D4AF37]" />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-2 top-2 cursor-pointer h-4 w-4 flex items-center justify-center bg-transparent border-0 focus:outline-none">
                      {showCurrentPassword ? <IoEyeOffOutline size={12} style={{ color: '#D4AF37' }} /> : <IoEyeOutline size={12} style={{ color: '#D4AF37' }} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[6px] font-mono uppercase text-neutral-400 tracking-wider mb-0.5">Input New Password Keys *</label>
                  <div className="relative">
                    <input required type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter at least 6 characters..." className="w-full bg-black/40 border border-white/10 rounded-md p-1.5 pr-7 text-[10px] text-white font-mono focus:outline-none focus:border-[#D4AF37]" />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-2 top-2 cursor-pointer h-4 w-4 flex items-center justify-center bg-transparent border-0 focus:outline-none">
                      {showNewPassword ? <IoEyeOffOutline size={12} style={{ color: '#D4AF37' }} /> : <IoEyeOutline size={12} style={{ color: '#D4AF37' }} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[6px] font-mono uppercase text-neutral-400 tracking-wider mb-0.5">Confirm New Password Keys *</label>
                  <div className="relative">
                    <input required type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-type new password..." className="w-full bg-black/40 border border-white/10 rounded-md p-1.5 pr-7 text-[10px] text-white font-mono focus:outline-none focus:border-[#D4AF37]" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-2 cursor-pointer h-4 w-4 flex items-center justify-center bg-transparent border-0 focus:outline-none">
                      {showConfirmPassword ? <IoEyeOffOutline size={12} style={{ color: '#D4AF37' }} /> : <IoEyeOutline size={12} style={{ color: '#D4AF37' }} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={isChangingPassword} className="w-full py-1.5 bg-[#0B4622] hover:bg-[#073016] rounded font-mono font-black text-[8px] uppercase tracking-wider text-white border border-[#D4AF37]/20 transition-colors cursor-pointer">
                  {isChangingPassword ? "Syncing Keys..." : "Apply Security Key Update 🔑"}
                </button>
              </form>
            </div>
          )}
          {activeSegment === 'tickets' && (
            <div className="space-y-3 w-full box-border animate-fadeIn">
              <h3 className="text-white font-black text-[10px] uppercase tracking-tight border-b border-white/5 pb-1.5">Active Stadium Match Day Passes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 w-full">
                {recentTickets.length > 0 ? recentTickets.map((ticket: any) => (
                  <div key={ticket.id} className="bg-black/30 border border-white/5 rounded-xl p-2.5 flex flex-col justify-between min-h-[105px]">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[6px] font-mono font-black bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border uppercase tracking-tight">{ticket.ticketType && ticket.ticketType.includes('VIP') ? 'Pavilion' : 'Terraces'}</span>
                        <h4 className="text-white font-black text-[11px] uppercase mt-1 truncate max-w-[120px]">{ticket.matchName || "vs Vipers SC"}</h4>
                      </div>
                      <div className="text-neutral-400"><IoLocationOutline size={11} /></div>
                    </div>
                    <div className="flex justify-between items-end pt-1 border-t border-white/5 font-mono text-[8px] w-full">
                      <div className="min-w-0 flex-1 mr-2">
                        <span className="text-neutral-500 block text-[4px]">ASSIGNMENT</span>
                        <span className="text-white font-bold font-sans text-[8px] truncate block">{ticket.gate || "UWA FC Stadium • Gate B"}</span>
                      </div>
                      <span className="text-emerald-400 font-bold uppercase text-[8px] flex items-center gap-0.5 font-sans flex-none"><IoShieldCheckmarkOutline size={8} /> Active</span>
                    </div>
                  </div>
                )) : null}
                
                {recentSuites.map((suite: any) => (
                  <div key={suite.id} className="bg-black/30 border border-[#D4AF37]/20 rounded-xl p-2.5 flex flex-col justify-between min-h-[105px]">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[6px] font-mono font-black bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border uppercase tracking-tight">{suite.selectedPackage || "VIP Executive"}</span>
                        <h4 className="text-white font-black text-[11px] uppercase mt-1">VIP Suite</h4>
                      </div>
                      <div className="text-[#D4AF37]"><IoCalendarOutline size={11} /></div>
                    </div>
                    <div className="flex justify-between items-end pt-1 border-t border-white/5 font-mono text-[8px] w-full">
                      <div className="min-w-0 flex-1 mr-2">
                        <span className="text-neutral-500 block text-[4px]">ALLOCATION</span>
                        <span className="text-white font-bold font-sans text-[8px] truncate block">x{suite.purchasedQuantity || 1} Guests Registered</span>
                      </div>
                      <span className="text-amber-400 font-bold uppercase text-[8px] flex items-center gap-0.5 font-sans flex-none"><IoTimeOutline size={8} /> Paid</span>
                    </div>
                  </div>
                ))}

                {recentTickets.length === 0 && recentSuites.length === 0 && (
                  <div className="p-3 bg-black/10 border border-dashed border-white/5 rounded-xl text-center font-sans text-[9px] text-neutral-500 col-span-1 sm:col-span-2 py-4">No active matchday passes linked under this profile string.</div>
                )}
              </div>
            </div>
          )}

          {activeSegment === 'orders' && (
            <div className="space-y-3 w-full box-border animate-fadeIn">
              <h3 className="text-white font-black text-[10px] uppercase tracking-tight border-b border-white/5 pb-1.5">Official Merchandise Order Tracking</h3>
              {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                <div key={order.id} className="p-2 rounded-xl bg-black/20 border border-white/5 flex flex-col sm:flex-row justify-between items-stretch gap-2 text-left">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-8 w-8 bg-neutral-900 rounded-md flex items-center justify-center text-[#D4AF37] border border-white/5 flex-none"><IoShirtOutline size={14} /></div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[5px] font-mono font-black text-neutral-500 block">INVOICE #{order.orderId ? order.orderId.substring(0, 10) : String(order.id).substring(0, 6).toUpperCase()}</span>
                      <h4 className="text-white font-black text-[10px] uppercase tracking-tight truncate max-w-[120px]">{order.orderedItems && order.orderedItems.length > 0 ? order.orderedItems[0].name : (order.itemName || "Club Kit Apparel")}</h4>
                      <p className="text-neutral-400 text-[8px] font-mono mt-0.5">UGX {(order.netTotalCost || order.totalPrice || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center flex-1 font-sans">
                    <div className="flex justify-between text-[6px] font-bold uppercase text-neutral-400 mb-0.5"><span>Ordered</span><span className="text-[#D4AF37]">In Transit</span><span>Delivered</span></div>
                    <div className="w-full h-1 bg-neutral-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#0B4622] to-[#D4AF37] rounded-full w-2/3" />
                    </div>
                  </div>
                </div>
              )) : <div className="p-3 bg-black/10 border border-dashed border-white/5 rounded-xl text-center font-sans text-[9px] text-neutral-500 py-4">No historical orders found under this account profile link.</div>}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

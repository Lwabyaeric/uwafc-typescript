import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router';
import { 
  IoTicketOutline, 
  IoQrCodeOutline, 
  IoCardOutline, 
  IoWalletOutline, 
  IoCheckmarkCircleOutline, 
  IoChevronDown,
  IoAlertCircleOutline,
  IoBusinessOutline,
  IoLocationOutline
} from 'react-icons/io5';

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

interface TicketCatalogItem {
  id: string;
  name: string;
  tier: string;
  price: number;
  originalPrice: number;
  badge: string;
  desc: string;
}

export interface TicketsPageProps {
  currentUserProfile: UserProfile | null;
}

export interface TicketCheckoutFormData {
  fanName: string;
  fanEmail: string;
  fanPhone: string;
  momoProvider: string;
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

const firebaseApp: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db: Firestore = getFirestore(firebaseApp);
export default function TicketsPage({ currentUserProfile }: TicketsPageProps) {
  const { subSection } = useParams({ from: '/tickets' as any }) as any;
  const navigate = useNavigate();
  
  const [ticketStep, setTicketStep] = useState<string>('browse');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkoutStatusText, setCheckoutStatusText] = useState<string>('Verifying gateway authorization arrays...');

  const [selectedTicketType, setSelectedTicketType] = useState<string>('General Admission');
  const [selectedTicketPrice, setSelectedTicketPrice] = useState<number>(5000);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  const [generatedTicketId, setGeneratedTicketId] = useState<string>('');
  const [verifiedPaymentToken, setVerifiedPaymentToken] = useState<string>('');

  const { register, handleSubmit, watch, setValue } = useForm<TicketCheckoutFormData>({
    defaultValues: {
      fanName: currentUserProfile?.displayName || 'Lwabya Eric',
      fanEmail: currentUserProfile?.email || '',
      fanPhone: '',
      momoProvider: 'mtn'
    }
  });

  const fanName = watch('fanName');
  const fanEmail = watch('fanEmail');
  const fanPhone = watch('fanPhone');
  const momoProvider = watch('momoProvider');

  useEffect(() => {
    const sheetId = 'uwa-tickets-breath';
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement('style');
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaTicketBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.01); }
          50% { transform: scale(1.018); box-shadow: 0 16px 24px -6px rgba(212, 175, 55, 0.06); border-color: rgba(212, 175, 55, 0.35) !important; background-color: rgba(4, 26, 14, 0.4) !important; }
        }
        .ticket-breath-card { animation: uwaTicketBreath 5.6s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .ticket-breath-card:nth-child(2) { animation-delay: 1.2s; }
        .ticket-breath-card:nth-child(3) { animation-delay: 2.4s; }
        .ticket-breath-card:nth-child(4) { animation-delay: 3.6s; }
        .ticket-breath-card:hover { transform: scale(1.03) translateY(-3px) !important; border-color: rgba(212, 175, 55, 0.5) !important; background-color: rgba(6, 38, 19, 0.45) !important; box-shadow: 0 25px 35px -5px rgba(212, 175, 55, 0.15) !important; animation-play-state: paused !important; }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);

  useEffect(() => {
    const scriptId = 'flutterwave-v3-inline-sdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://flutterwave.com';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (currentUserProfile) {
      setValue('fanName', currentUserProfile.displayName || 'Lwabya Eric');
      setValue('fanEmail', currentUserProfile.email || '');
    }
  }, [currentUserProfile, setValue]);

  const calculateTotalTicketCost = (): number => {
    return selectedTicketPrice * ticketQuantity;
  };

  const ticketMutation = useMutation({
    mutationFn: async (payload: { recordId: string; invoiceToken: string; finalCost: number; formData: TicketCheckoutFormData }) => {
      return await addDoc(collection(db, "match_tickets"), {
        ticketId: payload.recordId, 
        gatewayInvoiceToken: payload.invoiceToken,
        fanName: payload.formData.fanName,
        fanEmail: payload.formData.fanEmail || "ticket-buyer@uwa-fc.com",
        contactPhone: payload.formData.fanPhone,        
        ticketType: selectedTicketType, 
        quantityPurchased: ticketQuantity,
        totalAmountPaid: payload.finalCost,
        settlementChannel: payload.formData.momoProvider === 'mtn' ? "FLUTUT_MTN_MOMO" : "FLUTUT_AIRTEL_MONEY",
        orderStatus: "TICKET_PAID_ACCESS_GRANTED",
        userUid: currentUserProfile ? currentUserProfile.uid : "GUEST_FAN",
        timestamp: serverTimestamp()
      });
    },
    onSuccess: (data, variables) => {
      setGeneratedTicketId(variables.recordId);
      setVerifiedPaymentToken(variables.invoiceToken);
      setTicketStep('success'); 
      setIsSubmitting(false);
    },
    onError: (cloudWriteErr) => {
      console.error("Firestore ticketing security block: ", cloudWriteErr);
      alert("Database Synch Timeout. Please save your payment token number for manual gate verification.");
      setIsSubmitting(false);
    }
  });
  const ticketCatalog: TicketCatalogItem[] = [
    {
      id: "t1",
      name: "General Admission Pass",
      tier: "Single Match",
      price: 5000,
      originalPrice: 5000,
      badge: "Savannah Terraces",
      desc: "Open savannah uncovered terraces access gates for individual home fixtures."
    },
    {
      id: "t2",
      name: "VIP Covered Pavilion Pass",
      tier: "Single Match",
      price: 20000,
      originalPrice: 25000,
      badge: "Main Royal Pavilion",
      desc: "UWA FC main grandstand seating inclusive of a complimentary matchday program booklet."
    },
    {
      id: "t3",
      name: "Standard Seasonal Fan Card",
      tier: "Season Ticket",
      price: 60000,
      originalPrice: 80000,
      badge: "Full Season Terraces",
      desc: "Absolute access to all 15+ home league games, custom plastic smart card, and club wrist bangle."
    },
    {
      id: "t4",
      name: "VIP Executive Gold Season Card",
      tier: "Season Ticket",
      price: 250000,
      originalPrice: 300000,
      badge: "Full Season Pavilion",
      desc: "Reserved royal pavilion seating for the entire season, VIP hospitality lounge access, and official home jersey."
    }
  ];

  const handleTicketPurchaseExecution = (data: TicketCheckoutFormData) => {
    if (!data.fanName || !data.fanPhone) {
      alert("Validation Error: Please populate mandatory contact variables for gate security deployment.");
      return;
    }
    setIsSubmitting(true);

    const matchTicketRecordId = "SIMBA-TICKET-" + Date.now();
    const finalInvoicedCost = calculateTotalTicketCost();

    if (typeof (window as any).FlutterwaveCheckout !== 'function') {
      alert("Payment gateways are initializing background connections. Please wait 3 seconds and re-tap.");
      setIsSubmitting(false);
      return;
    }

    (window as any).FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-96d78819d2551e0d89dc4ec665b718e1-X",
      tx_ref: matchTicketRecordId,
      amount: finalInvoicedCost,
      currency: "UGX",
      payment_options: "mobilemoney, card",
      customer: {
        email: data.fanEmail || "gate.supporter@uwa-fc.com",
        phone_number: data.fanPhone,
        name: data.fanName,
      },
      customizations: {
        title: `UWA FC ${data.momoProvider.toUpperCase()} Payment Portal`,
        description: `Admissions Procurement: ${selectedTicketType} x ${ticketQuantity}`,
        logo: "https://unsplash.com",
      },
      callback: (response: any) => {
        setCheckoutStatusText("Verifying escrow clearances... Pushing validated parameters to Firestore records...");
        if (response.status === "successful" || response.status === "completed") {
          ticketMutation.mutate({
            recordId: matchTicketRecordId,
            invoiceToken: String(response.transaction_id || response.id),
            finalCost: finalInvoicedCost,
            formData: data
          });
        } else {
          alert("Gateway authentication failure. Please check wallet balances.");
          setTicketStep('checkout');
          setIsSubmitting(false);
        }
      },
      onclose: () => {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="w-full min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden relative" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
      <div className="max-w-4xl mx-auto container w-full box-border">
        
        <div className="border-b border-white/5 pb-3 mb-4 flex justify-between items-end gap-3 w-full">
          <div className="text-left">
            <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>Gate Entry Pass Logistics</span>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight mt-0.5 leading-none">Matchday Ticket Desks</h2>
          </div>
          {ticketStep === 'checkout' && (
            <button type="button" onClick={() => setTicketStep('browse')} className="text-[10px] font-mono font-black text-neutral-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 hover:text-[#D4AF37] uppercase tracking-tight transition-all cursor-pointer flex-none">Modify</button>
          )}
        </div>
        {ticketStep === 'browse' && (
          <div className="space-y-6 w-full box-border">
            {/* 📱 2-Column Responsive Layout Fix Matrix for Mobile */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 w-full box-border items-stretch">
              {ticketCatalog.map((ticket: TicketCatalogItem) => {
                const hasDiscount: boolean = ticket.originalPrice > ticket.price;
                const discountPercent: number = hasDiscount ? Math.round(((ticket.originalPrice - ticket.price) / ticket.originalPrice) * 100) : 0;
                const isSeasonCard: boolean = ticket.tier === "Season Ticket";

                return (
                  <div key={ticket.id} className={`ticket-breath-card p-3 sm:p-5 rounded-2xl border text-left flex flex-col justify-between min-h-[220px] sm:min-h-[240px] relative overflow-hidden transition-all duration-300 ${isSeasonCard ? 'bg-[#0B4622]/10 border-[#D4AF37]/20' : 'bg-[#041A0E]/20 border-white/5'}`}>
                    {hasDiscount && (
                      <div className="absolute top-1.5 right-1.5 bg-red-600 text-white font-mono font-black text-[7px] sm:text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md z-10 animate-pulse">
                        -{discountPercent}%
                      </div>
                    )}
                    
                    <div>
                      <span className={`text-[7px] sm:text-[9px] font-mono px-1.5 py-0.5 rounded-md border uppercase font-bold tracking-tight inline-block ${isSeasonCard ? 'bg-amber-950/40 text-[#D4AF37] border-[#D4AF37]/20' : 'bg-neutral-900 text-neutral-400 border-white/5'}`}>{ticket.badge}</span>
                      <h4 className="text-white font-black text-xs sm:text-base uppercase tracking-tight mt-2 leading-tight line-clamp-1">{ticket.name}</h4>
                      <p className="text-neutral-400 text-[10px] sm:text-xs font-sans mt-1 leading-tight line-clamp-3 min-h-[32px] sm:min-h-[40px]">{ticket.desc}</p>
                    </div>

                    <div className="mt-4 flex flex-col justify-between items-start gap-2 border-t border-white/5 pt-2.5 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        {hasDiscount && <span className="font-mono text-[8px] sm:text-[10px] line-through text-neutral-500">UGX {ticket.originalPrice.toLocaleString()}</span>}
                        <span className={`font-mono text-xs sm:text-base font-black ${isSeasonCard ? 'text-[#D4AF37]' : 'text-emerald-400'}`}>UGX {ticket.price.toLocaleString()}</span>
                      </div>
                      <button type="button" onClick={() => { setSelectedTicketType(ticket.name); setSelectedTicketPrice(ticket.price); setTicketStep('checkout'); }} className={`w-full py-1.5 rounded-xl text-[9px] sm:text-xs font-black uppercase tracking-wider border cursor-pointer text-center transition-all duration-150 transform active:scale-95 shadow-md ${isSeasonCard ? 'bg-gradient-to-tr from-amber-500 to-amber-600 text-black border-transparent hover:brightness-110' : 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/20 hover:bg-[#073016]'}`}>Procure</button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="w-full p-4 rounded-2xl border bg-gradient-to-br from-[#041A0E] via-[#052110] to-[#1e1903] border-[#D4AF37]/20 text-left box-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-mono font-black text-[10px] sm:text-xs uppercase tracking-wider">
                  <IoBusinessOutline size={14} /> Corporate Purchase Hub
                </div>
                <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-tight mt-0.5">Physical Season Cards & Invoicing</h3>
                <p className="text-neutral-400 text-xs font-sans leading-relaxed max-w-xl">
                  Official departments, corporate entities, and VIP patrons can order physical high-fidelity plastic **Smart Season Cards** directly from our central headquarters via cash processing lines, corporate checks, or formal institutional LPOs.
                </p>
              </div>
              
              <div className="flex-none bg-black/40 border border-white/5 p-3 rounded-xl font-mono text-[10px] sm:text-xs text-neutral-300 space-y-1 w-full md:w-auto md:min-w-[240px] shadow-inner">
                <div className="flex gap-1.5 items-start"><IoLocationOutline size={12} className="text-[#D4AF37] flex-none mt-0.5" /> <span><strong>UWA HQ Office:</strong> Plot 7 Kira Road, Kamwokya</span></div>
                <div className="pt-1 border-t border-white/5 text-neutral-500 font-bold">🏢 Office Hours: Mon - Fri | 8:00 AM - 5:00 PM</div>
              </div>
            </div>
          </div>
        )}
        {ticketStep === 'checkout' && (
          <div className="w-full flex flex-col md:flex-row gap-4 items-start justify-between box-border animate-fadeIn">
            <form onSubmit={handleSubmit(handleTicketPurchaseExecution)} className="w-full md:w-7/12 bg-black/30 border border-white/5 p-4 rounded-2xl space-y-3.5 box-border shadow-2xl">
              <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight pb-1.5 border-b border-white/5 flex items-center gap-2"><IoCardOutline size={14} className="text-[#D4AF37]" /> Supporter Registration</h3>
              
              <div>
                <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Supporter Full Name *</label>
                <input type="text" required {...register("fanName")} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 px-3 text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37] font-mono transition-all" placeholder="e.g. Lwabya Eric" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Mobile Money Number *</label>
                  <input type="tel" required {...register("fanPhone")} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="e.g. 077XXXXXXX" />
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Pass Quantities *</label>
                  <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-0.5 justify-between">
                    <button type="button" onClick={() => setTicketQuantity(prev => Math.max(1, prev - 1))} className="text-neutral-400 font-bold px-3 py-0.5 text-sm outline-none cursor-pointer select-none">-</button>
                    <span className="font-mono text-xs font-bold text-white px-1 select-none">{ticketQuantity}</span>
                    <button type="button" onClick={() => setTicketQuantity(prev => Math.min(10, prev + 1))} className="text-neutral-400 font-bold px-3 py-0.5 text-sm outline-none cursor-pointer select-none">+</button>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1.5">Select Network Operator Node</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setValue('momoProvider', 'mtn')} className={`p-2 rounded-lg border font-mono text-[10px] sm:text-xs font-black text-center transition-all cursor-pointer ${momoProvider === 'mtn' ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5'}`}>📱 MTN MoMo API</button>
                  <button type="button" onClick={() => setValue('momoProvider', 'airtel')} className={`p-2 rounded-lg border font-mono text-[10px] sm:text-xs font-black text-center transition-all cursor-pointer ${momoProvider === 'airtel' ? 'bg-red-600/10 border-red-600 text-red-400 shadow-md' : 'bg-black/20 border-white/5 text-neutral-400 hover:bg-white/5'}`}>💳 Airtel Money API</button>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={ticketMutation.isPending || isSubmitting} className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B38F2D] rounded-xl text-[#020B05] font-mono font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-xl disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer transform active:scale-95 transition-all select-none">
                  {ticketMutation.isPending || isSubmitting ? "Authorizing Security Lines..." : `Clear UGX ${calculateTotalTicketCost().toLocaleString()} via ${momoProvider.toUpperCase()} 🔒`}
                </button>
              </div>
            </form>
            
            <div className="w-full md:w-5/12 bg-black/20 border rounded-2xl p-4 text-left box-border flex flex-col justify-between shadow-2xl" style={{ borderColor: 'rgba(212, 175, 55, 0.15)', minHeight: '160px' }}>
              <div>
                <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-tight mb-2 border-b border-white/5 pb-1">Summary</h4>
                <div className="space-y-1.5 font-sans text-xs text-neutral-300">
                  <div className="flex justify-between"><span>Access Tier:</span><span className="font-bold text-white max-w-[120px] truncate">{selectedTicketType}</span></div>
                  <div className="flex justify-between"><span>Quantity:</span><span className="font-mono font-bold text-white">x{ticketQuantity}</span></div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-2.5 mt-4 flex justify-between items-baseline font-sans font-bold text-white w-full">
                <span className="text-[9px] uppercase font-mono text-neutral-400">Total:</span>
                <span className="font-mono text-sm sm:text-base font-black text-[#D4AF37]">UGX {calculateTotalTicketCost().toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {ticketStep === 'success' && (
          <div className="max-w-xs mx-auto bg-white text-neutral-950 p-5 rounded-2xl shadow-2xl text-center border-4 border-[#D4AF37] space-y-4 box-border animate-fadeIn mt-2">
            <div className="flex flex-col items-center">
              <span className="font-mono font-black text-[8px] bg-[#0B4622] text-[#D4AF37] px-2.5 py-0.5 rounded-md border border-[#D4AF37]/20 uppercase tracking-wider">Official Gate Passport</span>
              <h4 className="font-black text-sm uppercase tracking-tight text-neutral-800 mt-1 leading-none">UWA FC Secure Entry Pass</h4>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col items-center justify-center shadow-inner">
              <IoQrCodeOutline size={120} className="text-[#0B4622]" />
              <div className="mt-2 font-mono text-[9px] uppercase font-black text-neutral-500 tracking-wider bg-white border px-2 py-0.5 rounded shadow-sm">
                ID: {generatedTicketId || "UWA-MATCH-PENDING"}
              </div>
            </div>

            <div className="text-left font-sans text-xs border-t border-dashed border-neutral-300 pt-3 space-y-1 text-neutral-600">
              <p className="flex justify-between"><strong>Holder:</strong> <span className="font-bold text-neutral-900">{fanName}</span></p>
              <p className="flex justify-between"><strong>Selection:</strong> <span className="font-medium text-neutral-900 truncate max-w-[130px]">{selectedTicketType}</span></p>
              <p className="flex justify-between"><strong>Attendees:</strong> <span className="font-mono font-bold text-neutral-900">x{ticketQuantity}</span></p>
              <p className="flex justify-between border-t border-neutral-100 pt-1 font-bold"><strong>Rate Invoiced:</strong> <span className="font-mono font-black text-emerald-700">UGX {calculateTotalTicketCost().toLocaleString()}</span></p>
            </div>

            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-left">
              <p className="text-[9px] font-sans font-medium text-emerald-800 leading-tight">🦏 Proceeds directly fund anti-poaching patrol ranger assets inside local game reserve zones.</p>
            </div>

            <button type="button" onClick={() => { setTicketStep('browse'); setTicketQuantity(1); setGeneratedTicketId(''); setVerifiedPaymentToken(''); }} className="w-full py-2 bg-[#0B4622] hover:bg-[#073016] text-[#D4AF37] font-mono font-black border border-[#D4AF37]/20 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer text-center shadow-md transform active:scale-95 duration-150">Purchase Another</button>
          </div>
        )}

      </div>
    </div>
  );
}

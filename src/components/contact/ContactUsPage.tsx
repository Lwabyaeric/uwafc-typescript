import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { 
  IoChevronDownOutline, 
  IoCheckmarkCircleOutline,
  IoHelpCircleOutline 
} from 'react-icons/io5';


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface FaqItem {
  q: string;
  a: string;
}

interface ContactFormData {
  fullName: string;
  emailAddress: string;
  subjectMatter: string;
  messageBody: string;
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

const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db: Firestore = getFirestore(app);

export default function ContactUsPage() {
  const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ContactFormData>({
    defaultValues: {
      fullName: '',
      emailAddress: '',
      subjectMatter: 'General Inquiries',
      messageBody: ''
    }
  });

  const subjectMatterValue = watch('subjectMatter');

  useEffect(() => {
    const sheetId = "uwa-contact-breath";
    if (!document.getElementById(sheetId)) {
      const styleNode = document.createElement("style");
      styleNode.id = sheetId;
      styleNode.innerHTML = `
        @keyframes uwaContactFormBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.01); }
          50% { transform: scale(1.012); box-shadow: 0 16px 24px -6px rgba(212, 175, 55, 0.06); border-color: rgba(212, 175, 55, 0.35) !important; background-color: rgba(4, 26, 14, 0.45) !important; }
        }
        .contact-breath-card { animation: uwaContactFormBreath 5.8s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .contact-breath-card:hover { transform: scale(1.02) translateY(-2px) !important; border-color: rgba(212, 175, 55, 0.45) !important; background-color: rgba(6, 38, 19, 0.5) !important; box-shadow: 0 25px 35px -5px rgba(212, 175, 55, 0.15) !important; animation-play-state: paused !important; }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (formData: ContactFormData) => {
      return await addDoc(collection(db, "contact_messages"), {
        fullName: formData.fullName,
        emailAddress: formData.emailAddress,
        subjectMatter: formData.subjectMatter,
        messageBody: formData.messageBody,
        submittedAt: serverTimestamp()
      });
    },
    onSuccess: () => {
      setFormSubmitted(true);
      reset();
    },
    onError: (err) => {
      console.error("Firestore Ingestion Aborted:", err);
      alert("Secretariat server pipeline unreachable. Please check network connections.");
    }
  });

  const faqs: FaqItem[] = [
    { q: "How much are match tickets?", a: "Regular admission tickets are UGX 5,000, and VIP Covered Pavilion tickets are UGX 20,000. These can be purchased securely on this portal via MTN MoMo or Airtel Money." },
    { q: "How do I enroll my child in the Academy?", a: "Academy enrollment is open for age groups U-8 to U-18. Navigate to the Academy section on our portal, fill out the Intake form, and pay the UGX 50,000 registration fee." },
    { q: "Can corporate organizations rent the VIP lounge?", a: "Yes. The Mapesa VIP lounge and executive suites are available for hire for corporate events and private functions. Contact facilities@wildlife.go.ug for quotes." }
  ];

  const handleFormSubmission = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };
  return (
    <div className="w-full min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-12 text-white text-left box-border overflow-x-hidden" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1.5 text-[9px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4 text-gray-500">
          <span className="text-gray-400">Home</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }}>Contact Us</span>
        </div>

        <div className="border-b border-white/5 pb-3 mb-4 text-center sm:text-left">
          <span className="font-mono font-bold text-[9px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
            Get In Touch With The Secretariat
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-0.5 leading-none">
            Contact & Support Desk
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start w-full box-border">
          <div className="contact-breath-card p-4 sm:p-6 rounded-2xl border bg-[#041A0E]/20 box-border w-full transition-all duration-300 border-white/5">
            {formSubmitted ? (
              <div className="text-center py-6 sm:py-8 space-y-4 animate-fadeIn">
                <div className="flex justify-center text-emerald-400">
                  <IoCheckmarkCircleOutline className="text-4xl sm:text-5xl animate-bounce" />
                </div>
                <h4 className="text-white font-black uppercase text-sm sm:text-base tracking-wide">Message Dispatched</h4>
                <p className="text-gray-400 text-xs leading-normal max-w-xs mx-auto font-sans">Your inquiry has been successfully queued. The UWA FC Media desk will respond via email within 24 operational tracking hours.</p>
                
                {/* 🎛️ SHADCN BUTTON IN ACTION FOR RESET ACTION */}
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setFormSubmitted(false)} 
                  className="w-full sm:w-auto bg-[#0B4622] hover:bg-[#073016] text-[#D4AF37] border border-[#D4AF37]/20 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all transform active:scale-95 shadow-md"
                >
                  New Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(handleFormSubmission)} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Full Name</label>
                    {/* 🎛️ SHADCN INPUT IN ACTION */}
                    <Input required type="text" {...register("fullName")} placeholder="Your Name" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Email Address</label>
                    {/* 🎛️ SHADCN INPUT IN ACTION */}
                    <Input required type="type" {...register("emailAddress")} placeholder="name@domain.com" className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono" />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Subject Matter</label>
                  
                
                 <Select value={subjectMatterValue} onValueChange={(val) => setValue('subjectMatter', val as any)}>

                    <SelectTrigger className="w-full py-2 px-3 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-mono">
                      <SelectValue placeholder="Select Topic Classification" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#031109] border border-white/10 text-white font-mono text-xs">
                      <SelectItem value="General Inquiries">General Inquiries</SelectItem>
                      <SelectItem value="Ticketing & Hospitality Support">Ticketing & Hospitality Support</SelectItem>
                      <SelectItem value="Sponsorship & Corporate Inquiries">Sponsorship & Corporate Inquiries</SelectItem>
                      <SelectItem value="Academy Enrollment Queries">Academy Enrollment Queries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold tracking-wider text-gray-400 block mb-1">Detailed Message Statement</label>
                  <textarea required rows={4} {...register("messageBody")} placeholder="Draft your communication details..." className="w-full py-2 px-3 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans resize-none"></textarea>
                </div>
                
                
                <div className="pt-2 flex justify-center w-full">
              
                  <Button 
                    disabled={contactMutation.isPending}
                    type="submit" 
                    className="w-full sm:w-auto py-2.5 px-6 rounded-xl font-mono font-black uppercase tracking-wider text-[10px] sm:text-xs shadow-xl transform active:scale-95 transition-all duration-150 text-center flex-none disabled:opacity-40 select-none cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B38F2D 100%)', color: '#020B05' }}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="w-full box-border space-y-5">
            <div className="p-4 sm:p-5 rounded-2xl border bg-[#041A0E]/20 text-gray-300 text-xs sm:text-sm leading-relaxed box-border border-white/5 shadow-xl">
              <h3 className="text-white font-black text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                <IoHelpCircleOutline style={{ color: '#D4AF37' }} className="text-base sm:text-lg shrink-0" /> Instant Resolution Helpdesk
              </h3>
              <p className="font-sans text-[11px] sm:text-xs leading-normal">Review our immediate ticketing, fan membership, and academy assistance records below before routing an inquiry document node directly to our sports communications secretariat desk.</p>
            </div>

            <div className="w-full box-border">
              <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wider mb-3.5 flex items-center gap-2">
                <span className="h-4 w-1.5 bg-[#D4AF37] rounded-full"></span> Frequently Asked Questions
              </h3>
              
              <div className="space-y-3 w-full box-border">
                {faqs.map((faq: FaqItem, idx: number) => (
                  <div key={idx} className="rounded-xl border overflow-hidden bg-black/10 text-xs w-full box-border border-white/5 shadow-md">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      type="button"
                      className="w-full p-3.5 sm:p-4 flex justify-between items-center text-left text-white font-black uppercase tracking-wider bg-white/5 cursor-pointer focus:outline-none gap-3 transition-colors hover:bg-white/10"
                    >
                      <span className="text-[10px] sm:text-xs leading-tight font-mono">{faq.q}</span>
                      <IoChevronDownOutline className={`transition-transform duration-200 text-[#D4AF37] flex-shrink-0 text-sm sm:text-base ${activeFaq === idx ? 'transform rotate-180' : ''}`} />
                    </button>
                    {activeFaq === idx && (
                      <div className="p-3.5 sm:p-4 bg-black/20 text-gray-400 text-[11px] sm:text-xs leading-relaxed border-t border-white/5 font-sans break-words animate-fadeIn font-medium">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

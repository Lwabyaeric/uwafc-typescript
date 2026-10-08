import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { 
  IoChevronDownOutline, 
  IoCheckmarkCircleOutline,
  IoHelpCircleOutline
} from 'react-icons/io5';

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

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
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [fullName, setFullName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [subjectMatter, setSubjectMatter] = useState<string>("General Inquiries");
  const [messageBody, setMessageBody] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const faqs: FaqItem[] = [
    { q: "How much are match tickets?", a: "Regular admission tickets are UGX 5,000, and VIP Covered Pavilion tickets are UGX 20,000. These can be purchased securely on this portal via MTN MoMo or Airtel Money." },
    { q: "How do I enroll my child in the Academy?", a: "Academy enrollment is open for age groups U-8 to U-18. Navigate to the Academy section on our portal, fill out the Intake form, and pay the UGX 50,000 registration fee." },
    { q: "Can corporate organizations rent the VIP lounge?", a: "Yes. The Mapesa VIP lounge and executive suites are available for hire for corporate events and private functions. Contact facilities@wildlife.go.ug for quotes." }
  ];

  return (
    <div 
      className="w-full min-h-screen px-3 sm:px-6 py-6 sm:py-12 text-white text-left box-border overflow-x-hidden"
      style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}
    >
      <div className="max-w-7xl mx-auto container w-full box-border">
        
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-5 text-gray-500">
          <span className="text-gray-400">Home</span>
          <span>/</span>
          <span style={{ color: '#D4AF37' }}>Contact Us</span>
        </div>

        <div className="border-b border-white/10 pb-4 sm:pb-6 mb-6 sm:mb-8 text-center sm:text-left">
          <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>
            Get In Touch With The Secretariat
          </span>
          <h2 className="text-xl sm:text-4xl font-black uppercase tracking-wide mt-1">
            Contact & Support Desk
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start w-full box-border">
          <div className="p-4 sm:p-8 rounded-2xl border bg-black/20 box-border w-full" style={{ borderColor: 'rgba(212,175,55,0.15)' }}>
            {formSubmitted ? (
              <div className="text-center py-8 sm:py-10 space-y-4 animate-fadeIn">
                <div className="flex justify-center text-emerald-400">
                  <IoCheckmarkCircleOutline className="text-4xl sm:text-5xl" />
                </div>
                <h4 className="text-white font-black uppercase text-sm sm:text-base">Message Dispatched</h4>
                <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto font-sans">Your inquiry has been successfully queued. The UWA FC Media desk will respond via email within 24 operational tracking hours.</p>
                <button 
                  onClick={() => {
                    setFormSubmitted(false);
                    setFullName("");
                    setEmailAddress("");
                    setSubjectMatter("General Inquiries");
                    setMessageBody("");
                  }} 
                  className="w-full sm:w-auto px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase text-gray-300 transition-all active:scale-95 cursor-pointer"
                >
                  New Message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  if (isSubmitting) return;
                  setIsSubmitting(true);

                  try {
                    const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
                    await addDoc(collection(db, "contact_messages"), {
                      fullName: fullName,
                      emailAddress: emailAddress,
                      subjectMatter: subjectMatter,
                      messageBody: messageBody,
                      submittedAt: serverTimestamp()
                    });
                    setFormSubmitted(true);
                  } catch (err) {
                    console.error("Firestore Ingestion Aborted:", err);
                    alert("Secretariat server pipeline unreachable. Please check network connections.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }} 
                className="space-y-4 font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 block mb-1">Full Name</label>
                    <input required value={fullName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)} type="text" placeholder="Your Name" className="w-full py-2 sm:py-2.5 px-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]/50" />
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 block mb-1">Email Address</label>
                    <input required value={emailAddress} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(e.target.value)} type="email" placeholder="name@domain.com" className="w-full py-2 sm:py-2.5 px-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]/50" />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 block mb-1">Subject Matter</label>
                  <select value={subjectMatter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSubjectMatter(e.target.value)} className="w-full py-2 sm:py-2.5 px-2 sm:px-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 block truncate cursor-pointer">
                    <option className="bg-[#031109]">General Inquiries</option>
                    <option className="bg-[#031109]">Ticketing & Hospitality Support</option>
                    <option className="bg-[#031109]">Sponsorship & Corporate Inquiries</option>
                    <option className="bg-[#031109]">Academy Enrollment Queries</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 block mb-1">Detailed Message Statement</label>
                  <textarea required value={messageBody} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageBody(e.target.value)} rows={4} placeholder="Draft your communication details..." className="w-full py-2 sm:py-2.5 px-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 resize-none"></textarea>
                </div>
                
                <div className="pt-2 flex justify-end w-full">
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className={`w-full sm:w-auto py-3 px-6 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg transform active:scale-95 transition-all duration-150 cursor-pointer text-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B38F2D 100%)', color: '#020B05' }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="w-full box-border space-y-4">
            <div className="p-4 rounded-2xl bg-[#041A0E]/30 border border-[#D4AF37]/15 text-gray-300 text-xs sm:text-sm leading-relaxed box-border">
              <h3 className="text-white font-black text-sm uppercase tracking-wide mb-1.5 flex items-center gap-2">
                <IoHelpCircleOutline style={{ color: '#D4AF37' }} className="text-base sm:text-lg" /> Instant Resolution Helpdesk
              </h3>
              <p className="font-sans">Review our immediate ticketing, fan membership, and academy assistance records below before routing an inquiry document node directly to our sports communications secretariat desk.</p>
            </div>

            <div className="w-full box-border">
              <h3 className="text-white font-black text-sm sm:text-base uppercase tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
                <span className="h-4 w-1 bg-[#D4AF37] rounded-full"></span> Frequently Asked Questions
              </h3>
              
              <div className="space-y-3 w-full box-border">
                {faqs.map((faq: FaqItem, idx: number) => (
                  <div key={idx} className="rounded-xl border overflow-hidden bg-black/10 text-xs w-full box-border" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      type="button"
                      className="w-full p-3.5 sm:p-4 flex justify-between items-center text-left text-white font-extrabold uppercase tracking-wide bg-white/5 cursor-pointer focus:outline-none gap-3"
                    >
                      <span className="text-[11px] sm:text-xs leading-snug">{faq.q}</span>
                      <IoChevronDownOutline className={`transition-transform duration-200 text-[#D4AF37] flex-shrink-0 text-sm sm:text-base ${activeFaq === idx ? 'transform rotate-180' : ''}`} />
                    </button>
                    {activeFaq === idx && (
                      <div className="p-3.5 sm:p-4 bg-black/20 text-gray-400 text-[11px] sm:text-xs leading-relaxed border-t border-white/5 font-sans break-words animate-fadeIn">
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

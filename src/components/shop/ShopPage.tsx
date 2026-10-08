import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router'; 
import { 
  IoCartOutline, IoCardOutline, IoShirtOutline, IoWalletOutline, 
  IoGiftOutline, IoCheckmarkCircleOutline, IoCloseOutline, 
  IoTrashOutline, IoFootstepsOutline, IoAlertCircleOutline
} from 'react-icons/io5';
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Context } from '../../context/Context';
interface FirebaseConfig {
  apiKey: string; authDomain: string; projectId: string;
  storageBucket: string; messagingSenderId: string; appId: string; measurementId: string;
}

const firebaseConfig: FirebaseConfig = { 
  apiKey: "AIzaSyDOJ8Ok7anQg774u5vdCpDRqGRW2NG8dho", authDomain: "://firebaseapp.com", 
  projectId: "uwa-fc", storageBucket: "uwa-fc.firebasestorage.app", 
  messagingSenderId: "387684494889", appId: "1:387684494889:web:373435029bd43bfbbe3638", 
  measurementId: "G-DF4GNF6N28"
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp);

export interface CartItem {
  id: string | number; name: string; price: number; quantity: number;
  img: string; selectedSize: string; chosenSize?: string; rawId?: string; originalPrice?: number;
}
export interface UserProfile { displayName?: string | null; email?: string | null; }
export interface ProductItem {
  id: string; name: string; category: string; price: number; originalPrice: number;
  sizes: string[]; delivery: string; description: string; img: string;
}
export interface ShopCheckoutFormData {
  customerName: string; customerEmail: string; billingPhone: string;
  deliveryAddress: string; deliveryZone: string; fulfillmentClass: 'hub_dropoff' | 'doorstep'; paymentGateway: string;
}
export interface ShopPageProps { currentUserProfile: UserProfile | null; }
export default function ShopPage({ currentUserProfile }: ShopPageProps) { 
  const globalContext = useContext(Context);
  const cart = globalContext ? globalContext.cart : [];
  const onCartChange = globalContext ? globalContext.setCart : () => {};
  const addToCartGlobal = globalContext ? globalContext.addToCart : () => {};
  const updateCartQtyGlobal = globalContext ? globalContext.updateCartQty : () => {};

  const [activeCategory, setActiveFilter] = useState<string>('all'); 
  const [checkoutStep, setCheckoutStep] = useState<'browse' | 'checkout' | 'success'>('browse'); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [checkoutStatusText, setCheckoutStatusText] = useState<string>('Verifying financial processing lines...'); 
  const [popupNotification, setPopupNotification] = useState<string | null>(null); 
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({}); 

  const navigate = useNavigate(); 
  const searchParams = useSearch({ from: '/shop/\$subSection' }) as any;

  useEffect(() => {
    const shopInteractivityId = "uwa-shop-card-breathing-styles";
    if (!document.getElementById(shopInteractivityId)) {
      const styleNode = document.createElement("style");
      styleNode.id = shopInteractivityId;
      styleNode.innerHTML = `
        @keyframes uwaShopCardBreath {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(212, 175, 55, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.3); }
          50% { transform: scale(1.012); box-shadow: 0 12px 20px -5px rgba(212, 175, 55, 0.1), 0 8px 16px -8px rgba(0, 0, 0, 0.5); border-color: rgba(212, 175, 55, 0.25) !important; background-color: rgba(6, 38, 19, 0.25) !important; }
        }
        .shop-interactive-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; animation: uwaShopCardBreath 5.2s ease-in-out infinite; will-change: transform, box-shadow, border-color, background-color; }
        .shop-interactive-card:nth-child(2n) { animation-delay: 0.8s; }
        .shop-interactive-card:nth-child(3n) { animation-delay: 1.6s; }
        .shop-interactive-card:hover { transform: scale(1.035) translateY(-5px) !important; border-color: rgba(212, 175, 55, 0.45) !important; background-color: rgba(6, 38, 19, 0.4) !important; box-shadow: 0 20px 30px -5px rgba(212, 175, 55, 0.18), 0 12px 20px -8px rgba(0, 0, 0, 0.6) !important; animation-play-state: paused !important; }
        .shop-interactive-card:active { transform: scale(0.97) translateY(0) !important; transition: transform 0.1s ease !important; }
        .shop-card-img-wrap img { transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important; }
        .shop-interactive-card:hover .shop-card-img-wrap img { transform: scale(1.06) !important; }
      `;
      document.head.appendChild(styleNode);
    }
  }, []);
  const { register, handleSubmit, watch, setValue } = useForm<ShopCheckoutFormData>({
    defaultValues: {
      customerName: currentUserProfile?.displayName || 'Lwabya Eric',
      customerEmail: currentUserProfile?.email || '',
      billingPhone: '',
      deliveryAddress: '',
      deliveryZone: 'Kampala',
      fulfillmentClass: 'hub_dropoff',
      paymentGateway: 'momo_online'
    }
  });

  const deliveryZone = watch('deliveryZone');
  const paymentGateway = watch('paymentGateway');
  const customerName = watch('customerName');
  const customerEmail = watch('customerEmail');
  const billingPhone = watch('billingPhone');
  const deliveryAddress = watch('deliveryAddress');
  const fulfillmentClass = watch('fulfillmentClass');
  const orderMutation = useMutation({
    mutationFn: async (payload: { orderId: string; invoiceToken: string; channel: string; status: string; items: any[] }) => {
      return await addDoc(collection(db, "orders"), {
        orderId: payload.orderId,
        gatewayInvoiceToken: payload.invoiceToken,
        customerName,
        customerEmail: customerEmail || "shopper@uwa-fc.com",
        contactLine: billingPhone,
        targetZone: deliveryZone,
        fulfillmentClass,
        dropoffCoordinates: deliveryAddress,
        orderedItems: payload.items,
        invoiceSubtotal: calculateTotal(),
        shippingCost: getDeliveryFee(),
        netTotalCost: calculateTotal() + getDeliveryFee(),
        settlementChannel: payload.channel,
        orderStatus: payload.status,
        logisticsClass: deliveryZone === 'Other' ? "UPCOUNTRY_SURFACE_COURIER" : (fulfillmentClass === 'doorstep' ? "LOCAL_EXPRESS_DOORSTEP" : "CITY_CENTER_HUB_PICKUP"),
        timestamp: serverTimestamp()
      });
    },
    onSuccess: (data, variables) => {
      onCartChange([]); 
      if (variables.status === "COD_AWAITING_DELIVERY") {
        setCheckoutStatusText("VERIFIED_COD");
      } else {
        setCheckoutStatusText(deliveryZone === 'Other' ? "VERIFIED_UPCOUNTRY_ONLINE" : "VERIFIED_ONLINE");
      }
      setCheckoutStep('success');
      setIsSubmitting(false);
      navigate({ to: '/shop/$subSection', params: { subSection: 'overview' }, search: {} });
    },
    onError: (error) => {
      console.error("Cloud database synchronization blockage: ", error);
      alert("Order processed but database cluster link timed out. Save your checkout reference.");
      setIsSubmitting(false);
    }
  });
  useEffect(() => { 
    if (searchParams && searchParams.step === 'checkout') { setCheckoutStep('checkout'); } 
  }, [searchParams]); 

  useEffect(() => { 
    const scriptId = 'flutterwave-v3-inline-sdk'; 
    if (!document.getElementById(scriptId)) { 
      const script = document.createElement('script'); 
      script.id = scriptId; script.src = 'https://flutterwave.com'; script.async = true; 
      document.head.appendChild(script); 
    } 
  }, []); 

  useEffect(() => { 
    if (currentUserProfile) { 
      setValue('customerName', currentUserProfile.displayName || 'Lwabya Eric'); 
      setValue('customerEmail', currentUserProfile.email || ''); 
    } 
  }, [currentUserProfile, setValue]);
  const products: ProductItem[] = [
    { 
      id: "p1", name: "Official Home Jersey 2026/27", category: "kits", price: 20000, originalPrice: 50000, 
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)", 
      description: "Official home kit featuring dynamic Forest Green with Savannah Gold linings.", img: "../../assets/home/home_jersey.jpg" 
    },
    { 
      id: "p2", name: "Wildlife Stars Performance Home Shorts 2026", category: "kits", price: 20000, originalPrice: 35000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Official matching home shorts featuring durable Forest Green sports mesh.", img: "../../assets/home/home_shorts.jpg" 
    },
    { 
      id: "p3", name: "Official Wildlife Stars Home Matchday Socks", category: "kits", price: 5000, originalPrice: 8000, 
      sizes: ["Medium", "Large"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "High-performance compression home socks in matching Forest Green.", img: "../../assets/home/greensocks.jpg"
    }
  ];
  const officialKitsGroup1: ProductItem[] = [
    { 
      id: "p4", name: "Official Away Jersey 2026/27", category: "kits", price: 20000, originalPrice: 50000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Classic institutional Gold primary kit with subtle dark moss accent details.", img: "../../assets/home/away_jersey.jpg" 
    },
    { 
      id: "p5", name: "Wildlife Stars Performance Away Shorts 2026", category: "kits", price: 20000, originalPrice: 35000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Breathable moisture-wicking away shorts in matching Savannah Gold.", img: "../../assets/home/away_shorts.jpg" 
    },
    { 
      id: "p6", name: "Official Wildlife Stars Away Matchday Socks", category: "kits", price: 5000, originalPrice: 8000, 
      sizes: ["Medium", "Large"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Cushioned over-calf compression arch socks in matching Savannah Gold.", img: "../../assets/home/goldsocks.jpg"
    }
  ];
  products.push(...officialKitsGroup1);
  const officialKitsGroup2: ProductItem[] = [
    { 
      id: "p7", name: "Official Third Jersey 2026/27", category: "kits", price: 20000, originalPrice: 50000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Classic institutional alternative Blue kit with dynamic structural linings.", img: "../../assets/home/third_jersey.jpg" 
    },
    { 
      id: "p8", name: "Wildlife Stars Performance Third Shorts 2026", category: "kits", price: 20000, originalPrice: 35000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Breathable moisture-wicking alternative kit matching blue shorts.", img: "../../assets/home/third_blueshorts.jpg" 
    },
    { 
      id: "p9", name: "Official Wildlife Stars Third Matchday Socks", category: "kits", price: 5000, originalPrice: 8000, 
      sizes: ["Medium", "Large"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Cushioned fields compression match socks in matching institutional Blue.", img: "../../assets/home/bluesocks.jpg"
    },
    { 
      id: "p10", name: "Official First Goalkeeper Jersey 2026/27", category: "kits", price: 20000, originalPrice: 50000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Official institutional orange primary goalkeeper jersey layout.", img: "../../assets/home/goalkeeper-jersey.jpg" 
    }
  ];
  products.push(...officialKitsGroup2);
  const officialKitsGroup3: ProductItem[] = [
    { 
      id: "p11", name: "Wildlife Stars Goalkeeper Shorts 2026 (Orange)", category: "kits", price: 20000, originalPrice: 35000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Breathable moisture-wicking goalkeeper shorts in matching vivid orange.", img: "../../assets/home/goalkeeper_orangeshorts.jpg" 
    },
    { 
      id: "p12", name: "Official Wildlife Stars Orange Goalkeeper Socks", category: "accessories", price: 5000, originalPrice: 8000, 
      sizes: ["Medium", "Large"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Cushioned over-calf stabilization socks in matching vivid orange.", img: "../../assets/home/orangesocks.jpg"
    },
    { 
      id: "p13", name: "Official Second Goalkeeper Jersey 2026/27", category: "kits", price: 20000, originalPrice: 50000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Official alternative tactical grey goalkeeper shirt profiles.", img: "../../assets/home/goalkeeper-jersey2.jpg" 
    },
    { 
      id: "p14", name: "Wildlife Stars Goalkeeper Shorts 2026 (Grey)", category: "kits", price: 20000, originalPrice: 35000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Breathable moisture-wicking goalkeeper shorts in matching tactical grey.", img: "../../assets/home/goalkeeper_greyshorts.jpg" 
    },
    { 
      id: "p15", name: "Official Wildlife Stars Grey Goalkeeper Socks", category: "accessories", price: 5000, originalPrice: 8000, 
      sizes: ["Medium", "Large"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Cushioned field compression match socks in matching tactical grey.", img: "../../assets/home/greysocks.jpg"
    },
    {
      id: "p16", name: "Eco Green Turf Marathon Kit (Ordinary)", category: "kits", price: 20000, originalPrice: 20000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local",
      description: "Includes official commemorative race tag and runner t-shirt. Funds buy land & pitch infrastructure for UWA FC.", img: "../../assets/home/ordinary_kit.jpg"
    },
    {
      id: "p17", name: "Eco Green Turf Marathon Kit (VIP Package)", category: "kits", price: 50000, originalPrice: 50000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local",
      description: "Includes official race tag, premium event jersey, and custom UWA Wildlife Stars water bottle.", img: "../../assets/home/vip_kit.jpg"
    },
    {
      id: "p18", name: "Eco Green Turf Marathon Kit (VVIP Executive Package)", category: "kits", price: 100000, originalPrice: 100000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local",
      description: "Complete elite package: premium race tag, event jersey, UWA Wildlife Stars water bottle, and branded supporter cap.", img: "../../assets/home/vvip_kit.jpg"
    }
  ];
  products.push(...officialKitsGroup3);
  const trackAndFootwearCatalog: ProductItem[] = [
    { 
      id: "p19", name: "Wildlife Stars Premium Tracksuit Jacket", category: "kits", price: 50000, originalPrice: 90000, 
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Heavyweight full-zip athletic track jacket complete with woven gold club crest profiles.", img: "../../assets/home/tracksuit_jacket.jpg" 
    },
    { 
      id: "p20", name: "Savannah Ranger Tracksuit Pants", category: "kits", price: 30000, originalPrice: 50000, 
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Flexible tapered athletic jogging trousers with zip pockets and breathable panels.", img: "../../assets/home/tracksuit_pants.jpg" 
    },
    { 
      id: "p21", name: "Savannah Ranger Wind Breakers", category: "kits", price: 30000, originalPrice: 50000, 
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Premium institutional wind breakers designed for rainy field weather.", img: "../../assets/home/wind_breaker.jpg" 
    },
    { 
      id: "p22", name: "Wildlife Stars Premium Safari Polo Shirt", category: "kits", price: 35000, originalPrice: 55000, 
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Smart casual corporate polo tailored for match day hospitality lounges.", img: "../../assets/home/poloshirt.jpg" 
    },
    { 
      id: "p23", name: "Official Pre-Match Training Kit", category: "kits", price: 45000, originalPrice: 65000,
      sizes: ["S", "M", "L", "XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "High-performance mesh layout training gear used by players during active pre-match warmups.", img: "../../assets/home/prematch_trainingkit.jpg" 
    },
    { 
      id: "p24", name: "Elite Kipello Canvas Shoes", category: "footwear", price: 95000, originalPrice: 135000, 
      sizes: ["40", "41", "42", "43"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Vulcanized rubber sole trainers branded with gold club crest side panels.", img: "../../assets/home/kipello_canvas.jpg" 
    },
    { 
      id: "p25", name: "Elite Sneakers", category: "footwear", price: 120000, originalPrice: 135000, 
      sizes: ["40", "41", "42", "43", "44"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Vulcanized rubber sole sneakers branded with gold club crest side panels.", img: "../../assets/home/snickers.jpg" 
    },
    { 
      id: "p26", name: "Wildlife Stars Technical Slider Sandals", category: "footwear", price: 25000, originalPrice: 40000, 
      sizes: ["40", "41", "42", "43"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Contoured recovery slides ideal for post-match team locker rooms.", img: "../../assets/home/slider_sandles.jpg" 
    }
  ];
  products.push(...trackAndFootwearCatalog);
  const fanAccessoriesGroup1: ProductItem[] = [
    { 
      id: "p27", name: "Official Silicon Fan Wrist Bangles", category: "accessories", price: 3000, originalPrice: 5000, 
      sizes: ["Standard Fit"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Durable debossed silicon band with UWA FC text and Savannah Gold crown crest branding.", img: "../../assets/home/wrist_bangles.jpg" 
    },
    { 
      id: "p28", name: "UWA FC Branded Ceramic Coffee Mug", category: "accessories", price: 18000, originalPrice: 25000, 
      sizes: ["Standard Mug"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Premium matte green ceramic coffee mug with a high-gloss laser-sculpted gold club badge.", img: "../../assets/home/ceramic_coffeemug.jpg" 
    },
    { 
      id: "p29", name: "Wildlife Stars Thermal Flask", category: "accessories", price: 35000, originalPrice: 45000, 
      sizes: ["500ml Flask"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Double-walled vacuum insulated steel thermos supporting sustainable safari conservation.", img: "../../assets/home/thermo_flask.jpg"  
    },
    { 
      id: "p30", name: "Wildlife Stars Water Bottle", category: "accessories", price: 35000, originalPrice: 45000, 
      sizes: ["500ml Bottle"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Double-walled water bottle supporting sustainable safari conservation.", img: "../../assets/home/waterbottle.jpg"  
    },
    { 
      id: "p31", name: "Savannah Flat-Brim Snapback Cap", category: "accessories", price: 25000, originalPrice: 30000, 
      sizes: ["One Size Fits All"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Deep forest green streetwear cap with multi-row structured crown stitching.", img: "../../assets/home/snap_cap.jpg"
    },
    { 
      id: "p32", name: "Woven Wildlife Stars Supporter Scarf", category: "accessories", price: 15000, originalPrice: 25000, 
      sizes: ["Standard Scarf"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Traditional tightly woven matchday bar-scarf displaying official team conservation slogans.", img: "../../assets/home/supporter_scarf.jpg" 
    },
    { 
      id: "p33", name: "Wildlife Stars Sound Blaster Vuvuzela", category: "accessories", price: 8000, originalPrice: 12000, 
      sizes: ["Standard Horn"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "High-decibel acoustic stadium horn finished in signature high-gloss club green paint.", img: "../../assets/home/vuvuzela.jpg" 
    }
  ];
  products.push(...fanAccessoriesGroup1);
  const fanAccessoriesGroup2: ProductItem[] = [
    { 
      id: "p34", name: "Official Member Car Decal & Badge Kit", category: "accessories", price: 10000, originalPrice: 15000, 
      sizes: ["Universal Fit"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Hanging club flag and magnetic sticker to market the team inside local commuter matatus.", img: "../../assets/home/sticker_flag.jpg" 
    },
    { 
      id: "p35", name: "Heavy-Duty Wildlife Stars Stadium Umbrella", category: "accessories", price: 15000, originalPrice: 30000, 
      sizes: ["Double-Canopy XL"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Windproof fiberframe umbrella providing absolute shelter against tropical savanna rain downpours.", img: "../../assets/home/umbrella.jpg"
    },
    { 
      id: "p36", name: "Namulonge Foldable Ground Chair", category: "accessories", price: 30000, originalPrice: 40000, 
      sizes: ["Compact Fold"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Portable metal-frame campsite seat tailored for touchline stadium pitch views.", img: "../../assets/home/ground_chair.jpg"
    },
    { 
      id: "p37", name: "UWA FC Premium Luggage Bag", category: "accessories", price: 150000, originalPrice: 200000, 
      sizes: ["Heavy-Duty Travel Spec"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Heavy-duty team travel luggage bag detailed with reinforced straps and gold club badging.", img: "../../assets/home/luggaugebag.jpg"
    },
    { 
      id: "p38", name: "UWA FC Executive Laptop Bag", category: "accessories", price: 80000, originalPrice: 100000, 
      sizes: ["15-inch Protective Spec"], delivery: "1-3 Days Local (1-5 Upcountry)",
      description: "Premium shockproof executive laptop messenger bag perfect for corporate institutional staff.", img: "../../assets/home/laptopbag.jpg"
    },
    { 
      id: "p39", name: "Matchday Commemorative Program Guide", category: "accessories", price: 5000, originalPrice: 10000, 
      sizes: ["Issue #1 Collector Spec"], delivery: "Instant Ground Pickup",
      description: "Premium glossy booklet tracking player profiles, technical stats, and conservation milestones.", img: "../../assets/home/program_guide.jpg" 
    }
  ];
  products.push(...fanAccessoriesGroup2);
  const addToCart = (product: ProductItem) => {
    addToCartGlobal(product, selectedSizes);
    setPopupNotification(`Added to Cart: ${product.name}`);
    setTimeout(() => setPopupNotification(null), 2500);
  };

  const updateCartQty = (targetId: string | number, delta: number) => {
    updateCartQtyGlobal(targetId, delta);
  };

  const calculateTotal = (): number => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const calculateTotalItems = (): number => cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const getDeliveryFee = (): number => {
    if (deliveryZone === 'Kampala') return 5000;
    if (deliveryZone === 'Wakiso') return 6000;
    if (deliveryZone === 'Mukono') return 5000;
    return 0;
  };
  
  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  const processSecureCheckoutPipeline = (data: ShopCheckoutFormData) => {
    if (!data.customerName || !data.billingPhone || !data.deliveryAddress) {
      alert("Fulfillment Halt: Please populate all mandatory shipping variables before transaction clearance."); return;
    }
    setIsSubmitting(true);
    const localizedZones = ['Kampala', 'Wakiso', 'Mukono'];
    if (!localizedZones.includes(data.deliveryZone) && data.paymentGateway === 'cod_delivery') {
      alert("Logistics Violation: Cash on Delivery channels are restricted to Greater Kampala, Wakiso, and Mukono.");
      setIsSubmitting(false); return;
    }

    const liveRecordTrackingId = "SIMBA-SHOP-" + Date.now();
    const finalInvoicedPrice = calculateTotal() + getDeliveryFee();
    const nestedItemsPayload = cart.map(item => ({
      variantKey: item.id, name: item.name, quantity: item.quantity, billingPrice: item.price, img: item.img
    }));

    if (data.paymentGateway === 'cod_delivery') {
      setCheckoutStatusText("Logging delivery ticket... Transferring order data to Firestore records...");
      orderMutation.mutate({ orderId: liveRecordTrackingId, invoiceToken: "CASH_ON_DELIVERY_PENDING", channel: "CASH_ON_DELIVERY", status: "COD_AWAITING_DELIVERY", items: nestedItemsPayload });
      return;
    }

    if (data.paymentGateway === 'momo_online') {
      if (typeof (window as any).FlutterwaveCheckout !== 'function') {
        alert("Payment infrastructures are compiling background ports. Please wait 3 seconds and re-tap.");
        setIsSubmitting(false); return;
      }
      (window as any).FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-96d78819d2551e0d89dc4ec665b718e1-X", tx_ref: liveRecordTrackingId,
        amount: finalInvoicedPrice, currency: "UGX", payment_options: "card, mobilemoney",
        customer: { email: data.customerEmail || "retail.supporter@uwa-fc.com", phone_number: data.billingPhone, name: data.customerName },
        customizations: { title: "UWA FC Wildlife Stars Megastore", description: `Order Tracking Token: ${liveRecordTrackingId}`, logo: "https://unsplash.com" },
        callback: (response: any) => {
          if (response.status === "successful" || response.status === "completed") {
            setCheckoutStatusText("Verifying authorization logs... Transferring order data to Firestore records...");
            setCheckoutStep('success');
            orderMutation.mutate({ orderId: liveRecordTrackingId, invoiceToken: String(response.transaction_id || response.id), channel: "FLUTTERWAVE_MOMO_API", status: "ORDER_PAID_AWAITING_DISPATCH", items: nestedItemsPayload });
          } else { alert("Gateway processing fault. Check mobile money wallet balances."); setIsSubmitting(false); }
        },
        onclose: () => setIsSubmitting(false)
      });
    }
  };
  return (
    <div className="w-full min-h-screen px-1.5 sm:px-4 py-2 sm:py-8 text-white text-left box-border overflow-x-hidden relative" style={{ background: 'linear-gradient(to bottom, #031109 0%, #020B05 100%)' }}>
      {popupNotification && (
        <div className="fixed top-3 right-3 left-3 xs:left-auto xs:max-w-xs p-2.5 rounded-lg bg-emerald-950 border border-emerald-500 text-[10px] text-emerald-400 font-sans font-bold flex items-center justify-between shadow-2xl z-50 animate-fadeIn">
          <span>{popupNotification}</span>
          <button type="button" onClick={() => setPopupNotification(null)} className="text-emerald-400 hover:text-white flex-none"><IoCloseOutline size={14} /></button>
        </div>
      )}

      {checkoutStep === 'browse' && calculateTotalItems() > 0 && (
        <div className="fixed bottom-4 right-4 z-40 p-3 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-600 text-[#020B05] shadow-2xl border border-white/20 flex items-center justify-center font-mono font-black text-xs min-w-[42px] h-[42px] pointer-events-none animate-pulse">
          <IoCartOutline size={18} className="mr-0.5" /> <span>{calculateTotalItems()}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto container w-full box-border">
        <div className="flex items-center gap-1 text-[8px] sm:text-xs font-mono font-bold uppercase tracking-tight mb-3 text-neutral-500">
          <span>Home</span> / <span style={{ color: '#D4AF37' }}>Online Shop</span> / <span className="text-neutral-300 capitalize">{checkoutStep}</span>
        </div>
        {checkoutStep === 'browse' && (
          <div className="flex flex-col border-b border-white/5 pb-2 mb-3 gap-2 w-full box-border">
            <div className="flex justify-between items-end w-full">
              <div className="text-left">
                <span className="font-mono font-bold text-[8px] sm:text-xs uppercase tracking-widest block" style={{ color: '#D4AF37' }}>Official Merchandise Outlets</span>
                <h2 className="text-base sm:text-2xl font-black uppercase tracking-tight mt-0.5 leading-none">The Wildlife Stars of Uganda Retail Arena</h2>
              </div>
              <button type="button" onClick={() => setCheckoutStep('checkout')} className="bg-[#0B4622] border border-[#D4AF37]/20 px-2.5 py-1.5 rounded-lg text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-tight flex items-center gap-1 hover:bg-[#073016] transition-all cursor-pointer">
                <IoCartOutline size={12} /> View Basket ({calculateTotalItems()})
              </button>
            </div>

            <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-none w-full box-border touch-pan-x">
              <button type="button" onClick={() => setActiveFilter('all')} className={`px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 flex-none transition-all ${activeCategory === 'all' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30' : 'bg-transparent text-neutral-400 border-white/5'}`}>All Products</button>
              <button type="button" onClick={() => setActiveFilter('kits')} className={`px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 flex-none transition-all ${activeCategory === 'kits' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30' : 'bg-transparent text-neutral-400 border-white/5'}`}><IoShirtOutline size={10}/> Kits</button>
              <button type="button" onClick={() => setActiveFilter('footwear')} className={`px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 flex-none transition-all ${activeCategory === 'footwear' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30' : 'bg-transparent text-neutral-400 border-white/5'}`}><IoFootstepsOutline size={10}/> Shoes</button>
              <button type="button" onClick={() => setActiveFilter('accessories')} className={`px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1 flex-none transition-all ${activeCategory === 'accessories' ? 'bg-[#0B4622] text-[#D4AF37] border-[#D4AF37]/30' : 'bg-transparent text-neutral-400 border-white/5'}`}><IoGiftOutline size={10}/> Accessories</button>
            </div>
          </div>
        )}
                <div className="w-full box-border">
          {checkoutStep === 'browse' && (
            <div className="flex flex-col lg:flex-row gap-4 items-start justify-between w-full box-border">
              <div className="w-full lg:w-8/12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 box-border">

                {filteredProducts.map((product) => {
                  const currentSizeSelection = selectedSizes[product.id] || (product.sizes && product.sizes.length > 0 ? product.sizes : "Standard");
                  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
                  const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

                  return (
                    <div key={product.id} className="shop-interactive-card p-3 rounded-xl border bg-[#041A0E]/30 text-left flex flex-col justify-between min-h-[300px] sm:min-h-[390px] box-border relative border-white/5">
                      {hasDiscount && <div className="absolute top-3 left-3 z-10 bg-red-600 text-white font-mono font-black text-[7px] sm:text-[9px] uppercase px-1.5 py-0.5 rounded shadow-lg animate-pulse">{discountPercent}% OFF</div>}
                      <div>
                        <div className="shop-card-img-wrap w-full h-44 sm:h-56 bg-neutral-950 rounded-lg overflow-hidden relative border border-white/5 flex items-center justify-center p-1.5">
                          <span className="absolute top-1 right-1 z-10 text-[6px] sm:text-[8px] font-mono bg-neutral-900/90 px-1 py-0.5 rounded border text-[#D4AF37] font-bold uppercase">{product.delivery}</span>
                          <img src={product.img} className="w-full h-full object-cover filter drop-shadow-md" alt={product.name} />
                        </div>
                        <div className="mt-2.5">
                          <h4 className="text-white font-black text-[11px] sm:text-xs uppercase tracking-tight leading-tight line-clamp-1">{product.name}</h4>
                          <p className="hidden sm:block text-neutral-400 text-[10px] font-sans mt-0.5 line-clamp-2 leading-tight">{product.description}</p>
                        </div>
                        {product.sizes && (
                          <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center gap-1 overflow-x-auto scrollbar-none font-mono">
                            <span className="text-[5px] sm:text-[7px] text-neutral-500 font-bold uppercase flex-none">Size:</span>
                            {product.sizes.map((sz) => (
                              <button key={sz} type="button" onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: sz }))} className={`px-1 sm:px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-bold border transition-all cursor-pointer flex-none ${currentSizeSelection === sz ? 'bg-[#D4AF37] text-black font-black border-[#D4AF37]' : 'bg-black/20 text-neutral-400 border-white/5'}`}>{sz}</button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 pt-1.5 border-t border-white/5 flex flex-col justify-between items-start gap-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5">
                          {hasDiscount && <span className="text-neutral-500 line-through text-[8px] sm:text-[10px] font-mono">UGX {product.originalPrice.toLocaleString()}</span>}
                          <span className="font-mono text-[10px] sm:text-sm font-black text-emerald-400">UGX {product.price.toLocaleString()}</span>
                        </div>
                        <button type="button" onClick={() => addToCart(product)} className="w-full mt-1.5 py-2 bg-[#0B4622] rounded-md text-[9px] font-bold uppercase tracking-wider text-white border border-white/5 cursor-pointer text-center hover:bg-[#073016] transform active:scale-95 transition-all">Add To Cart</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-full lg:w-4/12 rounded-xl p-3 border bg-black/20 text-left box-border flex flex-col justify-between" style={{ borderColor: 'rgba(212, 175, 55, 0.15)', minHeight: '260px' }}>
                <div className="w-full">
                  <h4 className="text-[#D4AF37] font-black text-xs sm:text-sm uppercase tracking-tight mb-2.5 border-b border-white/5 pb-1.5">Review Order Items</h4>
                  {cart.length === 0 ? ( <p className="text-neutral-500 font-sans text-xs italic py-4">Your basket is empty. Shop club apparel items to update.</p> ) : (
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-neutral-300 border-b border-white/5 pb-2 last:border-0">
                          <div className="flex items-center gap-2">
                            <img src={item.img} alt={item.name} className="w-8 h-8 rounded bg-neutral-900 object-cover border border-white/10 flex-none" />
                            <div className="flex flex-col">
                              <span className="truncate max-w-[100px] sm:max-w-[140px] font-sans font-bold text-[10px] sm:text-[11px] leading-tight text-white">{item.name}</span>
                              <span className="text-[8px] text-[#D4AF37] font-mono">Size: {item.chosenSize}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                              <button type="button" onClick={() => updateCartQty(item.id, -1)} className="text-neutral-400 font-bold text-[10px] sm:text-xs">-</button>
                              <span className="text-[10px] sm:text-xs font-mono px-1 font-bold text-white">{item.quantity}</span>
                              <button type="button" onClick={() => updateCartQty(item.id, 1)} className="text-neutral-400 font-bold text-[10px] sm:text-xs">+</button>
                            </div>
                            <button type="button" onClick={() => updateCartQty(item.id, -item.quantity)} className="text-red-400 hover:text-red-500 p-0.5 transition-colors" title="Delete product"><IoTrashOutline size={12} /></button>
                            <span className="font-mono text-[10px] sm:text-xs font-bold text-neutral-200">UGX {(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-col border-t border-white/5 pt-1.5 font-sans text-[9px] sm:text-[10px] mt-2 text-neutral-400 space-y-0.5">
                    <div className="flex justify-between items-center italic"><span>Base Drop-off Logistics Status ({deliveryZone}):</span><span>{deliveryZone === 'Other' ? "Courier Collect" : `UGX ${getDeliveryFee().toLocaleString()}`}</span></div>
                    {['Kampala', 'Wakiso', 'Mukono'].includes(deliveryZone) && <span className="text-amber-400 font-mono text-[8px] leading-tight block">* Standard rate covers main drop-offs/city centers. Remote villages or doorstep requests incur extra charges upon arrival.</span>}
                  </div>
                </div>
                {cart.length > 0 && (
                  <div className="w-full mt-4 pt-2.5 border-t border-white/5">
                    <div className="flex justify-between items-center mb-2 font-mono"><span className="text-neutral-400 text-xs">Total Invoiced:</span><span className="text-[#D4AF37] font-black text-sm sm:text-base">UGX {(calculateTotal() + getDeliveryFee()).toLocaleString()}</span></div>
                    <button type="button" onClick={() => setCheckoutStep('checkout')} className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-black font-mono font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all cursor-pointer text-center">Proceed to Checkout</button>
                  </div>
                )}
              </div>
            </div>
          )}
          {checkoutStep === 'checkout' && (
            <div className="flex flex-col lg:flex-row gap-4 items-start justify-between w-full box-border mt-2 animate-fadeIn">
              <form onSubmit={handleSubmit(processSecureCheckoutPipeline)} className="w-full lg:w-7/12 bg-black/30 border border-white/5 p-4 rounded-xl space-y-3.5 box-border">
                <div className="border-b border-white/5 pb-1.5 flex justify-between items-center">
                  <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-tight flex items-center gap-1"><IoCardOutline size={14} className="text-[#D4AF37]" /> Shipping & Settlement Dossier</h3>
                  <button type="button" onClick={() => { setCheckoutStep('browse'); navigate({ to: '/shop/\$subSection', params: { subSection: 'overview' }, search: {} }); }} className="text-[9px] font-mono font-bold text-neutral-400 bg-white/5 px-2 py-1 rounded hover:bg-white/10 uppercase tracking-tight cursor-pointer">Modify Items</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Full Supporter Name *</label>
                    <input type="text" required {...register("customerName")} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Lwabya Eric" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Email Address (Optional)</label>
                    <input type="email" {...register("customerEmail")} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. supporter@uwa-fc.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Mobile Money Number *</label>
                    <input type="tel" required {...register("billingPhone")} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. 077XXXXXXX / 070XXXXXXX" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Fulfillment Area / District *</label>
                    <select {...register("deliveryZone")} onChange={(e) => { setValue('deliveryZone', e.target.value); if(!['Kampala','Wakiso','Mukono'].includes(e.target.value)) setValue('paymentGateway', 'momo_online'); }} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37]">
                      <option value="Kampala" className="bg-[#051b0e]">Kampala (City Drop-off: UGX 5,000 / Doorstep Extra)</option>
                      <option value="Wakiso" className="bg-[#051b0e]">Wakiso (Town Drop-off: UGX 6,000 / Doorstep Extra)</option>
                      <option value="Mukono" className="bg-[#051b0e]">Mukono (Town Drop-off: UGX 5,000 / Doorstep Extra)</option>
                      <option value="Other" className="bg-[#051b0e]">Other Districts Across Uganda (Upcountry Surface Courier)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-1">Detailed Delivery Dropoff Address *</label>
                  <textarea required rows={2} {...register("deliveryAddress")} className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs font-sans text-white focus:outline-none focus:border-[#D4AF37] resize-none" placeholder="Provide landmarks or building names..."></textarea>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <label className="block text-[9px] font-mono font-black uppercase text-neutral-400 tracking-wider mb-2">Available Clearance Channels</label>
                  <div className="space-y-2">
                    <label className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${paymentGateway === 'momo_online' ? 'bg-[#0B4622]/20 border-[#D4AF37]' : 'bg-black/20 border-white/5'}`}>
                      <div className="flex items-center gap-2">
                        <input type="radio" value="momo_online" checked={paymentGateway === 'momo_online'} onChange={() => setValue('paymentGateway', 'momo_online')} className="accent-[#D4AF37]" />
                        <div className="text-left"><span className="text-xs font-bold block text-white">Uganda Mobile Money Web API</span><span className="text-[9px] text-neutral-400 font-sans">Instant prompt routing on MTN MoMo and Airtel Money.</span></div>
                      </div>
                      <IoWalletOutline size={16} className="text-[#D4AF37]" />
                    </label>
                    {['Kampala', 'Wakiso', 'Mukono'].includes(deliveryZone) ? (
                      <label className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${paymentGateway === 'cod_delivery' ? 'bg-[#0B4622]/20 border-[#D4AF37]' : 'bg-black/20 border-white/5'}`}>
                        <div className="flex items-center gap-2">
                          <input type="radio" value="cod_delivery" checked={paymentGateway === 'cod_delivery'} onChange={() => setValue('paymentGateway', 'cod_delivery')} className="accent-[#D4AF37]" />
                          <div className="text-left"><span className="text-xs font-bold block text-white">Cash On Delivery (COD)</span><span className="text-[9px] text-neutral-400 font-sans">Valid inside Kampala, Wakiso, and Mukono hubs.</span></div>
                        </div>
                        <IoCheckmarkCircleOutline size={16} className="text-emerald-400" />
                      </label>
                    ) : (
                      <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-600/30 flex items-start gap-1.5 font-sans text-left">
                        <IoAlertCircleOutline size={14} className="text-amber-400 flex-none mt-0.5" />
                        <p className="text-[9px] text-amber-400 font-medium leading-tight">Upcountry Enforcement: Cash on Delivery options are disabled outside central distribution networks.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={orderMutation.isPending || isSubmitting} className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-black font-mono font-black text-xs uppercase tracking-widest shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer">
                    {orderMutation.isPending || isSubmitting ? "Processing Transaction..." : (paymentGateway === 'cod_delivery' ? "Authorize Delivery Handshake 🚚" : "Authorize Digital Payment 📲")}
                  </button>
                </div>
              </form>

              <div className="w-full lg:w-5/12 bg-black/20 border rounded-xl p-3 text-left box-border flex flex-col justify-between" style={{ borderColor: 'rgba(212, 175, 55, 0.15)' }}>
                <div>
                  <h4 className="text-[#D4AF37] font-black text-xs sm:text-sm uppercase tracking-tight mb-2 border-b border-white/5 pb-1.5">Fulfillment Summary</h4>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-neutral-300 text-[11px] sm:text-xs font-sans">
                        <span className="truncate max-w-[150px] sm:max-w-[200px]">{item.name} ({item.chosenSize}) <span className="text-[9px] text-neutral-500 font-mono font-bold">x{item.quantity}</span></span>
                        <span className="flex-none font-mono">UGX {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/5 mt-3 pt-2 space-y-1 font-sans text-[10px] sm:text-[11px] text-neutral-400">
                    <div className="flex justify-between"><span>Merchandise Subtotal:</span><span className="font-mono text-white">UGX {calculateTotal().toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Logistics Base Fee ({deliveryZone}):</span><span className="font-mono text-white">{deliveryZone === 'Other' ? "At Buyer's Expense" : `UGX ${getDeliveryFee().toLocaleString()}`}</span></div>
                    {['Kampala', 'Wakiso', 'Mukono'].includes(deliveryZone) && <span className="text-amber-400 font-mono text-[8px] tracking-tight pt-1 block leading-tight">* Note: Base rate covers central drop-off towns. Doorstep routes or remote villages will be invoiced extra charges upon runner transit clearance.</span>}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-2 mt-3 flex justify-between items-baseline font-sans font-bold text-[11px] sm:text-xs text-white w-full">
                  <span>TOTAL INVOICE VOLUME:</span>
                  <span className="font-mono text-sm sm:text-base font-black text-[#D4AF37]">UGX {(calculateTotal() + getDeliveryFee()).toLocaleString()}</span>
                </div>
              </div>

            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="max-w-md mx-auto p-4 sm:p-6 rounded-xl border text-center space-y-3 my-4 box-border animate-fadeIn" style={{ backgroundColor: 'rgba(6, 38, 19, 0.3)', borderColor: '#D4AF37' }}>
              <div className="flex justify-center text-emerald-400"><IoCheckmarkCircleOutline size={44} /></div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide text-white">Order Token Dispatched</h3>
              <p className="text-neutral-400 text-[10px] sm:text-xs leading-normal max-w-xs mx-auto font-sans text-left sm:text-center">
                {checkoutStatusText.includes("VERIFIED_COD") 
                  ? "Your Cash On Delivery request has been successfully committed to our cloud ledger database! A courier driver will contact you for delivery inside Kampala, Wakiso, or Mukono within 1-3 days. Please note extra distance handling fees apply for deep village locations outside central drop-off town points."
                  : checkoutStatusText.includes("VERIFIED_UPCOUNTRY_ONLINE")
                  ? "Online sandbox payment processed! Your order has been placed successfully. Because your shipping destination lies outside our primary hub network, club staff will coordinate parcel dispatching via upcountry transit systems within 1-5 days at your personal expense for transport upon arrival."
                  : "Your e-commerce payload request has been parsed! Your order has been placed. Please authorize the secure pop-up prompt by inputting your mobile money wallet PIN on your phone handset to clear the transit shipment."}
              </p>
              <div className="pt-1">
                <button type="button" onClick={() => { setCheckoutStep('browse'); setCheckoutStatusText('Verifying financial processing lines...'); }} className="px-4 py-2 bg-[#0B4622] text-white font-bold rounded-lg text-[9px] uppercase tracking-wider border border-[#D4AF37]/30 cursor-pointer transition-all hover:bg-[#0a3d21]">Continue Browsing Shop</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

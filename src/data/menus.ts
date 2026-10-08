export interface DropdownItem {
  name: string;
  path: string;
}

export interface MenuItem {
  id: string | number;
  name: string;
  path: string;
  title: string;
  target_name: string;
  dropdown?: DropdownItem[];
}
export const menus: MenuItem[] = [
  { 
    id: 1, 
    name: "Home", 
    path: "/", 
    title: "HOME", 
    target_name: "/" 
  },
  { 
    id: 2, 
    name: "The Club", 
    path: "/about", 
    title: "THE CLUB", 
    target_name: "/about",
    dropdown: [
      { name: "About Us Overview", path: "/about" },
      { name: "Club History & Heritage", path: "/about/history" },
      { name: "Executive Board & Management", path: "/about/management" },
      { name: "Our Facilities & Grounds", path: "/about/facilities" }, 
      { name: "Honours & Trophy Cabinet", path: "/honours" },
      { name: "Sponsors & Corporate Partners", path: "/sponsors" },
      { name: "Contact Bureau", path: "/contact" }
    ]
  },
  { 
    id: 3, 
    name: "Squad", 
    path: "/squad", 
    title: "SQUAD", 
    target_name: "/squad" 
  },
  { 
    id: 4, 
    name: "Fixtures", 
    path: "/fixtures", 
    title: "FIXTURES", 
    target_name: "/fixtures" 
  },
  { 
    id: 5, 
    name: "Media", 
    path: "/news", 
    title: "MEDIA", 
    target_name: "/news",
    dropdown: [
      { name: "News Hub Center", path: "/news" },
      { name: "Video Broadcast Hub", path: "/videos" },
      { name: "Anti-Poaching Campaign Updates", path: "/news/category/community" }
    ]
  },
  { 
    id: 6, 
    name: "Membership", 
    path: "/membership", 
    title: "MEMBERSHIP", 
    target_name: "/membership" 
  },
  { 
    id: 7, 
    name: "Fans Portal", 
    path: "/fans", 
    title: "FANS PORTAL", 
    target_name: "/fans",
    dropdown: [
      { name: "Fan Leadership Councils", path: "/fans" },
      { name: "Official Membership Sign-Up", path: "/membership" },
      { name: "UWA Foundation Advocacy", path: "/foundation" }
    ]
  },
  { 
    id: 8, 
    name: "Experience", 
    path: "/tickets", 
    title: "EXPERIENCE", 
    target_name: "/tickets",
    dropdown: [
      { name: "Matchday Tickets", path: "/tickets" },
      { name: "VIP Corporate Hospitality", path: "/hospitality" },
      { name: "Ranger Youth Academy", path: "/academy" }
    ]
  },
  { 
    id: 9, 
    name: "Shop", 
    path: "/shop", 
    title: "SHOP", 
    target_name: "/shop",
    dropdown: [
      { name: "All Merchandise", path: "/shop" },
      { name: "Official Match Kits", path: "/shop/kits" },
      { name: "Fan Accessories", path: "/shop/accessories" }
    ]
  },
  {
    id: 10,
    name: "Profile", 
    path: "/account", 
    title: "PROFILE", 
    target_name: "/account",
    dropdown: [
      { name: "Fan Login Desk", path: "/account" },
      { name: "Order Tracking Records", path: "/account/history" }
    ]
  }
];

export default menus;

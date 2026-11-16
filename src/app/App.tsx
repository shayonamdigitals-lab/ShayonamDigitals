import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router";
import {
  ArrowRight,
  Menu,
  Phone,
  Mail,
  ChevronDown
} from "lucide-react";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";

const DiamondIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const C = {
  bg: "#050714",
  glass: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  accentBlue: "#3B82F6",
  accentPurple: "#8B5CF6",
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Services", path: "/#services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="relative min-h-screen font-sans text-white overflow-x-hidden selection:bg-blue-500/30" style={{ backgroundColor: C.bg }}>
      
      {/* BACKGROUND GLOWS */}
      <div className="fixed top-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle, ${C.accentPurple} 0%, transparent 60%)` }} />
      <div className="fixed top-[20%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${C.accentBlue} 0%, transparent 70%)` }} />
      
      {/* SIDEBAR NAVIGATION (Dots) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-40 hidden lg:flex text-[10px] text-gray-500 font-mono">
        <span className="text-blue-500">01</span>
        <div className="w-px h-6 bg-gray-800" />
        <span className="w-1 h-1 rounded-full bg-gray-700" />
        <span className="w-1 h-1 rounded-full bg-gray-700" />
        <span>05</span>
      </div>

      {/* RIGHT FLOATING ACTION BAR */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden lg:flex">
        {[
          { icon: Phone, label: "Call Us", action: "tel:+918758731449" },
          { icon: WhatsappIcon, label: "WhatsApp", action: "https://wa.me/+91 9879181464" },
          { icon: Mail, label: "Email Us", action: "mailto:shayonamdigitals@gmail.com" }
        ].map((item, i) => (
          <a href={item.action} key={i} className="group relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl backdrop-blur-md border transition-all hover:bg-white/5 hover:border-white/20" style={{ background: C.glass, borderColor: C.glassBorder }}>
            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <span className="absolute right-16 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap" style={{ background: C.glass, borderColor: C.glassBorder, borderWidth: 1 }}>
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 flex items-center justify-between backdrop-blur-sm border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <img src="/only logo.png" alt="Shayonam Digital" className="w-10 h-10 object-contain" />
          <span className="text-xl font-semibold tracking-tight">Shayonam Digital</span>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-gray-300">
          {navLinks.map((link) => (
            link.path.startsWith("/#") ? (
              <a 
                key={link.name} 
                href={link.path} 
                className="transition-colors hover:text-white"
              >
                <span className="flex items-center gap-1">Services <ChevronDown className="w-4 h-4 opacity-50" /></span>
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`transition-colors ${location.pathname === link.path ? 'text-white font-semibold' : 'hover:text-white'}`}
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-medium">
            Get Started <ArrowRight className="w-4 h-4 opacity-70" />
          </Link>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/5 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050714] pt-24 px-6 flex flex-col gap-6 lg:hidden">
          {navLinks.map((link) => (
            link.path.startsWith("/#") ? (
              <a 
                key={link.name} 
                href={link.path} 
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold border-b border-white/10 pb-4"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold border-b border-white/10 pb-4"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      )}

      {/* MAIN CONTENT / ROUTER */}
      <main className="pt-32 pb-20 px-6 lg:px-20 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

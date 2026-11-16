import { motion } from "motion/react";
import {
  ArrowRight,
  Play,
  Code,
  Rocket,
  BarChart,
  Globe,
  Users,
  Award,
  Smartphone,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";

const DiamondIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
  </svg>
);

export default function Home() {
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* HERO TEXT */}
        <div className="flex flex-col items-start gap-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-300">Digital Solutions That Drive Real Results</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Digital</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Experiences</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-md leading-relaxed">
            Shayonam Digital combines innovative design with cutting-edge technology to deliver transformative digital experiences for global brands.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link to="/contact" className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#services" className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 text-white font-medium transition-all">
              Explore Our Services <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center ml-2"><Play className="w-2.5 h-2.5 translate-x-[1px]" /></span>
            </a>
          </div>
        </div>

        {/* HERO VISUALS */}
        <div className="relative h-[500px] hidden lg:block z-0" style={{ perspective: "1000px" }}>
           <motion.div 
             animate={{ y: [-10, 10, -10], rotateX: [15, 20, 15], rotateY: [-20, -15, -20] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-72 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
             style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)", transformStyle: "preserve-3d" }}
           >
             <img src="/logo.png" alt="Shayonam Digital" className="w-5000 h-5000 object-contain" />
             <h3 className="text-2xl font-semibold text-center"><br /></h3>
           </motion.div>

           <motion.div 
             animate={{ y: [5, -15, 5], rotateX: [10, 5, 10], rotateY: [-25, -30, -25] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute top-10 right-0 w-48 h-56 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md border border-white/10 opacity-80"
             style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)", transformStyle: "preserve-3d" }}
           >
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <div className="space-y-3 mt-4 flex-1">
                <div className="h-2 w-3/4 rounded bg-white/10" />
                <div className="h-2 w-full rounded bg-white/10" />
                <div className="h-2 w-5/6 rounded bg-white/10" />
                <div className="h-2 w-1/2 rounded bg-white/10" />
              </div>
           </motion.div>

           <motion.div 
             animate={{ y: [-15, 5, -15], rotateX: [25, 20, 25], rotateY: [-15, -20, -15] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="absolute bottom-10 right-10 w-40 h-32 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 backdrop-blur-lg border border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
             style={{ background: "linear-gradient(145deg, rgba(139,92,246,0.1) 0%, rgba(255,255,255,0.02) 100%)", transformStyle: "preserve-3d" }}
           >
              <BarChart className="w-8 h-8 text-purple-400" />
              <div className="flex items-end gap-1 w-full justify-center h-10 mt-2">
                {[40, 70, 50, 90, 60].map((h, i) => (
                  <div key={i} className="w-3 bg-purple-500/50 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
           </motion.div>
           
           <motion.div 
             animate={{ y: [10, -10, 10], rotateX: [15, 20, 15], rotateY: [10, 5, 10] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
             className="absolute bottom-20 left-10 w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 opacity-70"
             style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)", transformStyle: "preserve-3d" }}
           >
              <Rocket className="w-8 h-8 text-blue-400" />
           </motion.div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="mt-24 lg:mt-32 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-md relative overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/5 relative z-10">
          {[
            { icon: Users, num: "100+", label: "Projects Delivered", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: Award, num: "50+", label: "Happy Clients", color: "text-purple-400", bg: "bg-purple-500/10" },
            { icon: Code, num: "10+", label: "Technologies", color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { icon: Globe, num: "5+", label: "Countries Served", color: "text-cyan-400", bg: "bg-cyan-500/10" },
          ].map((stat, i) => (
            <div key={i} className={`flex items-center gap-5 ${i > 0 ? 'pl-8 lg:pl-12' : ''}`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} shadow-inner shadow-white/5`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-bold">{stat.num}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div id="services" className="mt-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img src="/logo.png" alt="Shayonam Digital" className="w-100 h-50 object-contain" />
              <div className="text-blue-500 text-sm font-semibold tracking-wide uppercase">Our Services</div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold">End-to-End Digital Solutions</h2>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-gray-400 text-sm max-w-sm hidden lg:block">
              We provide everything you need to build, grow and scale your digital presence.
            </p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Layers, title: "Digital Strategy", desc: "Comprehensive digital roadmaps aligned with your business goals.", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: Award, title: "UI/UX Design", desc: "Beautiful, intuitive designs that deliver exceptional user experiences.", color: "text-purple-400", bg: "bg-purple-500/10" },
            { icon: Code, title: "Web Development", desc: "High-performance websites built with modern technologies and best practices.", color: "text-indigo-400", bg: "bg-indigo-500/10" },
            { icon: Smartphone, title: "Mobile Development", desc: "Scalable mobile applications for iOS and Android platforms that users love.", color: "text-pink-400", bg: "bg-pink-500/10" },
          ].map((srv, i) => (
            <Link to="/contact" key={i} className="group relative rounded-3xl p-8 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all bg-white/[0.02] hover:bg-white/[0.04] flex flex-col h-full cursor-pointer">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${srv.bg} ${srv.color} mb-16 shadow-inner shadow-white/5`}>
                <srv.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{srv.title}</h3>
              <p className="text-sm text-gray-400 mb-8 flex-1">{srv.desc}</p>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mt-auto self-start group-hover:bg-white/10 transition-colors">
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

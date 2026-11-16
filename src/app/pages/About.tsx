export default function About() {
  return (
    <div className="pt-10 z-10 relative">
      {/* only Logo + Brand */}
      <div className="flex flex-col items-center text-center mb-16">
        <img src="/fp sd.png" alt="Shayonam Digital" className="w-100 h-50 object-contain mb-6" />
        <div className="text-cyan-500 text-sm font-semibold tracking-wide uppercase mb-3">About Us</div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">We are Shayonam Digital</h1>
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          Founded on the belief that digital presence should be transformative, we blend cutting-edge engineering with obsessive design. Our team operates at the intersection of technology and art, pushing the boundaries of what is possible on the web and beyond.
        </p>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {[
          { title: "Design-First", desc: "Every pixel is intentional. We create interfaces that feel effortless and look extraordinary.", color: "text-blue-400", bg: "bg-blue-500/10" },
          { title: "Engineering-Led", desc: "Precision-built software that is fast, scalable, and secure — from day one.", color: "text-purple-400", bg: "bg-purple-500/10" },
          { title: "Partnership-Minded", desc: "We work as an extension of your team, invested in your success at every step.", color: "text-cyan-400", bg: "bg-cyan-500/10" },
        ].map((v, i) => (
          <div key={i} className="rounded-3xl p-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-all">
            <div className={`text-xl font-bold mb-3 ${v.color}`}>{v.title}</div>
            <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact strip */}
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
        <div>
          <div className="text-lg font-semibold mb-1">Ready to work with us?</div>
          <div className="text-gray-400 text-sm">Bhavnagar, Gujarat, India &nbsp;·&nbsp; shayonamdigitals@gmail.com</div>
        </div>
        <a href="/contact" className="flex items-center gap-2 px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] text-sm whitespace-nowrap">
          Get in Touch →
        </a>
      </div>
    </div>
  );
}

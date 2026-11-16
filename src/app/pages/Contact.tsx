import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "Web Development", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "Web Development", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="pt-10 z-10 relative">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <div className="text-purple-500 text-sm font-semibold tracking-wide uppercase mb-3">Get in Touch</div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Let's build something extraordinary.</h1>
          <p className="text-gray-400 text-lg mb-12">
            Whether you have a full product specification or just a rough idea, we're here to help you turn it into reality.
          </p>
          
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Email</div>
              <div className="text-lg font-medium">shayonamdigitals@gmail.com</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Office</div>
              <div className="text-lg font-medium">Bhavnagar, Gujarat, India</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Service</label>
              <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors [&>option]:bg-[#050714]">
                <option value="Digital Strategy">Digital Strategy</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Tell us about your project..."></textarea>
            </div>
            
            <button disabled={status === "submitting"} type="submit" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50">
              {status === "submitting" ? "Sending..." : status === "success" ? <><CheckCircle className="w-5 h-5" /> Message Sent</> : <><Send className="w-5 h-5" /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

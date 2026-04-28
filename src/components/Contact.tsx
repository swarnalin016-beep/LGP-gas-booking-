import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="py-12 space-y-16 animate-in slide-in-from-bottom duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
             <h1 className="text-5xl font-bold tracking-tight text-gray-900">Get in touch.</h1>
             <p className="text-lg text-gray-500 leading-relaxed">
               Need help setting up your GasGuard IoT hub? Or want to partner with us? 
               Our support team is available 24/7 to assist you.
             </p>
          </div>

          <div className="space-y-6">
            <ContactLink icon={Mail} title="Email us" detail="support@gasguard.ai" />
            <ContactLink icon={Phone} title="Call us" detail="+1 (555) 000-SAFE" />
            <ContactLink icon={MapPin} title="Headquarters" detail="121 Innovation Ave, Palo Alto, CA" />
          </div>

          <div className="pt-8 flex gap-6">
            <SocialIcon icon={Twitter} />
            <SocialIcon icon={Github} />
            <SocialIcon icon={Linkedin} />
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl shadow-gray-100/50">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h3>
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="bg-emerald-50 text-emerald-600 size-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Message Received!</h4>
              <p className="text-gray-500">Our team will get back to you within 2-4 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="First Name" placeholder="John" />
                <InputGroup label="Last Name" placeholder="Doe" />
              </div>
              <InputGroup label="Email Address" type="email" placeholder="john@example.com" />
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Message</label>
                <textarea 
                  rows={4} 
                  required
                  placeholder="How can we help?"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all text-sm"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-xl shadow-gray-200"
              >
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16">
        <div className="text-center space-y-12">
           <h2 className="text-3xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
             <FaqItem question="Does it work with any LPG cylinder?" answer="Yes, our universal weight base is compatible with Indane, HP, Bharat Gas, and most international standard 14.2kg and 19kg cylinders." />
             <FaqItem question="How long does the battery last?" answer="The GasGuard Hub uses low-power BLE 5.0 and lasts up to 18 months on a single charge. It can also be plugged in permanently." />
             <FaqItem question="Is it safe near gas?" answer="Absolutely. Our sensors are IS-certified and intrinsic safety compliant, designed specifically for use in potential hazardous areas." />
             <FaqItem question="Can I override auto-booking?" answer="Yes, you have full control. You can toggle auto-booking on/off from the dashboard or via the Gemini chatbot." />
           </div>
        </div>
      </div>
    </div>
  );
}

function ContactLink({ icon: Icon, title, detail }: any) {
  return (
    <div className="flex gap-6 items-center group">
       <div className="bg-gray-50 text-gray-400 size-14 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
         <Icon size={24} />
       </div>
       <div>
         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
         <p className="text-lg font-bold text-gray-900">{detail}</p>
       </div>
    </div>
  );
}

function InputGroup({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">{label}</label>
      <input 
        required
        {...props}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all text-sm"
      />
    </div>
  );
}

function FaqItem({ question, answer }: any) {
  return (
    <div className="space-y-2 group cursor-pointer">
      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
        <MessageCircle size={18} className="opacity-20" /> {question}
      </h4>
      <p className="text-gray-500 text-sm leading-relaxed">{answer}</p>
    </div>
  );
}

function SocialIcon({ icon: Icon }: any) {
  return (
    <button className="bg-white border border-gray-100 size-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all hover:-translate-y-1">
      <Icon size={20} />
    </button>
  );
}

import { motion } from 'motion/react';
import { 
  BarChart3, 
  ShieldCheck, 
  Smartphone, 
  Leaf, 
  Users, 
  Trophy 
} from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 space-y-24 animate-in slide-in-from-bottom duration-700">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <ShieldCheck size={14} /> Our Mission
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Safety and <span className="text-blue-600">Smart Monitoring</span> at your fingertips.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            GasGuard was born from a simple observation: kitchen safety is often neglected until it's too late. 
            We've built an autonomous ecosystem that doesn't just monitor—it protects. 15% of all household fires 
            start with unattended cooking or unknown gas leaks. We aim to bring that number to zero.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="bg-white border border-gray-100 p-4 rounded-3xl flex items-center gap-4 shadow-sm">
              <div className="bg-blue-50 p-2 rounded-xl text-blue-600 font-bold text-xl">10M+</div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Lives Impacted</p>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-3xl flex items-center gap-4 shadow-sm">
              <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600 font-bold text-xl">45%</div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Waste Reduced</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -right-10 size-64 bg-blue-100 rounded-full blur-[80px] -z-10" />
          <div className="absolute -bottom-10 -left-10 size-64 bg-emerald-100 rounded-full blur-[80px] -z-10" />
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop" 
            alt="Modern Kitchen" 
            className="rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-[4/3] w-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-blue-50/50 rounded-[4rem] p-8 md:p-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">The Three Pillars of GasGuard</h2>
            <p className="text-gray-500">Design principles that guide every line of code we write.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Column 
              icon={BarChart3} 
              title="Data Integrity" 
              text="Every gram matters. Our sensors are calibrated daily to ensure zero false positives." 
            />
             <Column 
              icon={Smartphone} 
              title="Accessiblity" 
              text="Safe technology should be available to everyone, regardless of technical skill." 
            />
             <Column 
              icon={Leaf} 
              title="Sustainability" 
              text="Optimize usage logs to reduce excessive LPG consumption and carbon footprint." 
            />
          </div>
        </div>
      </div>

      {/* Team/Impact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1574630133144-0d8537463f4e?q=80&w=500&auto=format&fit=crop" className="rounded-3xl h-48 w-full object-cover" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop" className="rounded-3xl h-48 w-full object-cover translate-y-8" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop" className="rounded-3xl h-48 w-full object-cover" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=500&auto=format&fit=crop" className="rounded-3xl h-48 w-full object-cover translate-y-8" referrerPolicy="no-referrer" />
          </div>
        </div>
        <div className="space-y-6 order-1 lg:order-2">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">Powered by People.</h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Our team consists of IoT hardware engineers, AI researchers and hospitality experts working in 
            unison to build a safer world. We believe that technology is at its best when it's invisible.
          </p>
          <div className="space-y-4">
            <Achievement icon={Users} text="Over 150 dedicated engineers globally" />
            <Achievement icon={Trophy} text="Winner of Global Tech Safety Award 2024" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Column({ icon: Icon, title, text }: any) {
  return (
    <div className="text-center space-y-4">
      <div className="bg-white size-16 rounded-3xl shadow-sm flex items-center justify-center mx-auto text-blue-600">
        <Icon size={32} />
      </div>
      <h3 className="font-bold text-xl text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
    </div>
  );
}

function Achievement({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-blue-50 p-2 rounded-full text-blue-600">
        <Icon size={18} />
      </div>
      <span className="font-medium text-gray-700">{text}</span>
    </div>
  );
}

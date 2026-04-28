import { motion } from 'motion/react';
import { SYSTEM_FEATURES } from '../constants';
import { 
  BrainCircuit, 
  Weight, 
  AlertTriangle, 
  ShoppingCart,
  CheckCircle,
  Globe,
  Cpu,
  Smartphone
} from 'lucide-react';

const iconMap: any = {
  BrainCircuit,
  Weight,
  AlertTriangle,
  ShoppingCart
};

export default function Features() {
  return (
    <div className="py-12 space-y-16 animate-in slide-in-from-bottom duration-700">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter text-gray-900">Advanced Ecosystem</h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          GasGuard combines aerospace-grade IoT sensors with cutting-edge Large Language Models (Gemini) 
          to redefine kitchen safety and energy management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SYSTEM_FEATURES.map((feature, i) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
            >
              <div className="bg-blue-50 text-blue-600 size-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 ring-4 ring-blue-50">
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{feature.description}</p>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest cursor-pointer group-hover:gap-3 transition-all">
                Learn more <span>→</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400">Efficiency First</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">Built for the future of Smart Homes.</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We've partnered with major LPG providers across 12 countries to ensure seamless, 
              zero-intervention booking experiences. Your kitchen, automated.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FeatureMini icon={Globe} title="12 Countries" />
            <FeatureMini icon={Smartphone} title="Native App" />
            <FeatureMini icon={Cpu} title="ESP32 Compatible" />
            <FeatureMini icon={CheckCircle} title="99.9% Up-time" />
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-blue-500/20 rounded-full blur-[100px]" />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md"
          >
            <div className="bg-gray-800 p-6 rounded-xl space-y-6">
              <div className="flex justify-between items-center">
                <div className="size-3 bg-red-400 rounded-full" />
                <div className="size-3 bg-amber-400 rounded-full" />
                <div className="size-3 bg-emerald-400 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                <div className="h-24 w-full bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                  <BrainCircuit className="text-blue-400 size-12" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 flex-1 bg-white/5 rounded-lg" />
                <div className="h-10 flex-1 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/20 flex items-center justify-center text-[10px] font-bold">ACTIVATE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureMini({ icon: Icon, title }: any) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
      <Icon className="text-blue-400" size={20} />
      <span className="font-medium text-sm">{title}</span>
    </div>
  );
}

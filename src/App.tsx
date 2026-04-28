import { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Features from './components/Features';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Github, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'about': return <About />;
      case 'features': return <Features />;
      case 'contact': return <Contact />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-24 pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Chatbot />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Flame className="text-white size-5 fill-white" />
              </div>
              <span className="font-sans font-bold text-xl tracking-tight text-gray-900">GasGuard</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Making kitchens safer and energy management smarter through IoT and AI. 
              Designed for the next generation of smart homes.
            </p>
            <div className="flex gap-4">
              <Github className="size-5 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-[10px]">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">How it works</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Pricing Plans</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Partner Integrations</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">API for Developers</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-[10px]">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Safety Guide</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Case Studies</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Whitepapers</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Help Center</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 uppercase tracking-widest text-[10px]">Trust & Safety</h4>
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl text-blue-600 shadow-sm">
                <Heart size={16} />
              </div>
              <p className="text-xs text-blue-600 font-medium leading-snug">
                Verified IS-Intrinsic Safety compliant hardware.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2024 GasGuard AI Systems. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

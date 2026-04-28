import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Info, 
  Zap, 
  Mail, 
  Menu, 
  X, 
  Flame,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { useState } from 'react';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'contact', label: 'Support', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 h-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          <div className="bg-emerald-500 p-2 rounded-lg group-hover:scale-110 transition-transform shadow-md">
            <Flame className="text-white size-5 fill-white" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-slate-900">LPG Smart</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-semibold ${
                activeTab === item.id 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
          <div className="ml-4 h-8 w-px bg-slate-200" />
          <button 
            onClick={toggleDarkMode}
            className="ml-4 p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
          >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <button className="ml-3 bg-slate-900 text-white p-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-lg">
            <User className="size-5" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-white border-bottom border-gray-100 p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 p-4 rounded-xl text-left ${
                    activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <item.icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

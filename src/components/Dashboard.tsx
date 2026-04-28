import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Weight, 
  AlertCircle, 
  Calendar, 
  ShieldCheck, 
  Plus, 
  Bell, 
  TrendingDown,
  ArrowUpRight,
  Droplets,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { MOCK_USAGE_HISTORY } from '../constants';
import { SystemStatus, Alert } from '../types';
import { getAIPrediction } from '../services/geminiService';

export default function Dashboard() {
  const [status, setStatus] = useState<SystemStatus>({
    weight: 10.5,
    maxWeight: 14.2,
    isLeakDetected: false,
    isAutoBooked: false,
    daysRemaining: 12,
    refillDate: 'May 10',
    safeStatus: 'Safe'
  });

  const [aiAnalysis, setAiAnalysis] = useState('Predicting usage patterns...');
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', type: 'info', message: 'System online. Monitoring active.', timestamp: new Date() },
    { id: '2', type: 'success', message: 'Weight calibrated (±0.05kg).', timestamp: new Date() }
  ]);

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        weight: Math.max(0, +(prev.weight - 0.0001).toFixed(4))
      }));
    }, 2000);

    const runAnalysis = async () => {
      const prediction = await getAIPrediction(status.weight, MOCK_USAGE_HISTORY);
      setAiAnalysis(prediction);
    }
    runAnalysis();

    return () => clearInterval(interval);
  }, []);

  const handleManualBooking = () => {
    setStatus(prev => ({ ...prev, isAutoBooked: true }));
    const newAlert: Alert = {
      id: Date.now().toString(),
      type: 'success',
      message: 'Refill booked successfully via Indane Portal.',
      timestamp: new Date()
    };
    setAlerts(prev => [newAlert, ...prev]);
  }

  const toggleLeakSimulation = () => {
    setStatus(prev => ({
      ...prev,
      isLeakDetected: !prev.isLeakDetected,
      safeStatus: !prev.isLeakDetected ? 'Danger' : 'Safe'
    }));
    if (!status.isLeakDetected) {
      setAlerts(prev => [{
        id: Date.now().toString(),
        type: 'danger',
        message: 'CRITICAL: Gas leak detected in kitchen! Ventilation initiated.',
        timestamp: new Date()
      }, ...prev]);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Leak Banner */}
      {status.isLeakDetected && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-red-500 text-white px-4 py-3 rounded-2xl flex items-center justify-between shadow-lg shadow-red-200"
        >
          <div className="flex items-center gap-3">
            <div className="animate-pulse bg-white p-1 rounded-full">
              <AlertCircle size={20} className="text-red-500" />
            </div>
            <span className="font-bold tracking-tight">GAS LEAK DETECTED: PLEASE EVACUATE AND TURN OFF MAIN VALVE</span>
          </div>
          <button onClick={toggleLeakSimulation} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm font-medium transition-colors">
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Overview</p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Home System: Cylinder #01</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={toggleLeakSimulation}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all font-bold text-xs uppercase tracking-wider"
          >
            Safety Check
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 shadow-md shadow-emerald-100 transition-all font-bold text-xs uppercase tracking-wider">
            <Plus size={16} />
            Add Device
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Weight} 
          label="Current Volume" 
          value={`${status.weight.toFixed(1)}kg`} 
          subValue={`of ${status.maxWeight}kg`}
          color="emerald"
          progress={(status.weight / status.maxWeight) * 100}
        />
        <StatCard 
          icon={Calendar} 
          label="AI Forecast" 
          value={`${status.daysRemaining} Days`} 
          subValue={`Est. ${status.refillDate}`}
          color="blue"
        />
        <StatCard 
          icon={status.isAutoBooked ? CheckCircle2 : Clock} 
          label="Auto-Refill" 
          value={status.isAutoBooked ? "Active" : "Stable"} 
          subValue={status.isAutoBooked ? "Ref #8821" : "Smart Booking On"}
          color="slate"
        />
        <StatCard 
          icon={ShieldCheck} 
          label="Security Status" 
          value={status.safeStatus} 
          subValue={status.isLeakDetected ? "Check Ventilation" : "All Sensors Nominal"}
          color={status.isLeakDetected ? "red" : "emerald"}
        />
      </div>

      {/* Middle Section: Chart + Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-gray-900">LPG Usage Pattern</h3>
              <p className="text-gray-500 text-sm">Daily weight depletion trends</p>
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingDown size={14} /> Efficiency +12%
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_USAGE_HISTORY}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="timestamp" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  domain={[0, 15]} 
                  axisLine={false} 
                  tickLine={false} 
                   tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorWeight)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {/* AI Panel */}
          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-100 flex flex-col h-full overflow-hidden group">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors">
                <Bell size={18} />
              </div>
              <h3 className="font-bold">AI Predictive Alert</h3>
            </div>
            <div className="flex-1 space-y-4">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-blue-50 text-sm leading-relaxed">
                  "{aiAnalysis}"
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <ArrowUpRight size={16} className="text-emerald-300" />
                  <span className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">Confidence Rank: 0.98</span>
                </div>
              </div>
              <div className="bg-blue-700/50 p-4 rounded-2xl flex items-center justify-between border border-white/5">
                <div className="flex items-center gap-3">
                  <Droplets size={20} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest opacity-80">Auto-Refill</h4>
                    <span className="text-sm">Enabled</span>
                  </div>
                </div>
                <div className="toggle-switch relative h-6 w-10 bg-emerald-400 rounded-full flex items-center px-1">
                  <div className="size-4 bg-white rounded-full ml-auto shadow-sm" />
                </div>
              </div>
            </div>
            <button className="mt-6 w-full py-3 bg-white text-blue-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-colors">
              Refresh Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Activity / Booking History Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
             Recent System Alerts
             <span className="text-xs font-normal text-gray-400">({alerts.length} total)</span>
          </h3>
          <div className="space-y-4 overflow-y-auto max-h-[300px]">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex gap-4 group">
                <div className={`shrink-0 w-1 p-0.5 rounded-full ${
                  alert.type === 'danger' ? 'bg-red-500' :
                  alert.type === 'warning' ? 'bg-amber-500' :
                  alert.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-6">Booking History</h3>
          <div className="space-y-4">
            <HistoryItem date="Apr 12, 2024" status="Delivered" amount="14.2kg" provider="Indane" price="₹954.00" />
            <HistoryItem date="Mar 15, 2024" status="Delivered" amount="14.2kg" provider="Indane" price="₹954.00" />
            <HistoryItem date="Feb 10, 2024" status="Delivered" amount="14.2kg" provider="Indane" price="₹954.00" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subValue, color, progress, action }: any) {
  const colorMap: any = {
    emerald: 'text-emerald-600 bg-emerald-50 ring-emerald-100',
    blue: 'text-blue-600 bg-blue-50 ring-blue-100',
    slate: 'text-slate-600 bg-slate-50 ring-slate-100',
    red: 'text-red-600 bg-red-50 ring-red-100'
  }

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl ring-4 ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        {action && (
          <button 
            onClick={action.onClick}
            className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-black text-slate-900 tracking-tighter group-hover:scale-105 transition-transform origin-left">{value}</h4>
          <span className="text-[10px] font-bold text-slate-400">{subValue}</span>
        </div>
      </div>
      {progress !== undefined && (
        <div className="mt-4">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}

function HistoryItem({ date, status, amount, provider, price }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 size-10 rounded-xl flex items-center justify-center text-gray-500">
          <Calendar size={18} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{date}</p>
          <p className="text-xs text-gray-500">{provider} • {amount}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">{price}</p>
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">
          {status}
        </span>
      </div>
    </div>
  )
}

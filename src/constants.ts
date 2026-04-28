import { UsageData } from './types';

export const MOCK_USAGE_HISTORY: UsageData[] = [
  { timestamp: '2024-04-21', weight: 14.2 },
  { timestamp: '2024-04-22', weight: 13.8 },
  { timestamp: '2024-04-23', weight: 13.1 },
  { timestamp: '2024-04-24', weight: 12.5 },
  { timestamp: '2024-04-25', weight: 11.9 },
  { timestamp: '2024-04-26', weight: 11.2 },
  { timestamp: '2024-04-27', weight: 10.5 },
];

export const SYSTEM_FEATURES = [
  {
    title: "AI Predictive Analytics",
    description: "Our Gemini-powered engine analyzes your cooking patterns to predict exactly when you'll run out of gas.",
    icon: "BrainCircuit"
  },
  {
    title: "IoT Weight Sensors",
    description: "High-precision load cells monitor your cylinder weight in real-time with gram-level accuracy.",
    icon: "Weight"
  },
  {
    title: "Gas Leak Detection",
    description: "Advanced MQ-2 sensors detect even the smallest gas leaks and trigger immediate visual and audio alerts.",
    icon: "AlertTriangle"
  },
  {
    title: "Global Booking System",
    description: "Automatically place refill orders with your provider (HP, Indane, Bharat) before you hit critical levels.",
    icon: "ShoppingCart"
  }
];

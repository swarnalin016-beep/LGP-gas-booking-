
export interface UsageData {
  timestamp: string;
  weight: number;
}

export interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  message: string;
  timestamp: Date;
}

export interface SystemStatus {
  weight: number;
  maxWeight: number;
  isLeakDetected: boolean;
  isAutoBooked: boolean;
  daysRemaining: number;
  refillDate: string;
  safeStatus: 'Safe' | 'Warning' | 'Danger';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

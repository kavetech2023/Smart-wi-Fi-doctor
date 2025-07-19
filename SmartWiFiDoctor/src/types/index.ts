export interface WiFiNetwork {
  ssid: string;
  signalStrength: number;
  channel: number;
  frequency: string;
  security: string;
  isConnected: boolean;
  isRecommended?: boolean;
}

export interface ConnectedDevice {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  bandwidthUsage: number;
  deviceType: 'phone' | 'laptop' | 'tablet' | 'smart-tv' | 'unknown';
  isUnknown: boolean;
  lastSeen: string;
}

export interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: string;
}

export interface TroubleshootingStep {
  id: string;
  title: string;
  description: string;
  action?: () => void;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
import { WiFiNetwork, ConnectedDevice, SpeedTestResult, TroubleshootingStep, FAQ } from '../types';

export const currentNetwork: WiFiNetwork = {
  ssid: 'HomeNetwork_5G',
  signalStrength: 85,
  channel: 36,
  frequency: '5GHz',
  security: 'WPA2',
  isConnected: true,
};

export const nearbyNetworks: WiFiNetwork[] = [
  {
    ssid: 'HomeNetwork_5G',
    signalStrength: 85,
    channel: 36,
    frequency: '5GHz',
    security: 'WPA2',
    isConnected: true,
  },
  {
    ssid: 'HomeNetwork_2.4G',
    signalStrength: 78,
    channel: 6,
    frequency: '2.4GHz',
    security: 'WPA2',
    isConnected: false,
  },
  {
    ssid: 'Neighbor_WiFi',
    signalStrength: 45,
    channel: 11,
    frequency: '2.4GHz',
    security: 'WPA2',
    isConnected: false,
  },
  {
    ssid: 'CoffeeShop_Guest',
    signalStrength: 32,
    channel: 1,
    frequency: '2.4GHz',
    security: 'Open',
    isConnected: false,
    isRecommended: true,
  },
];

export const connectedDevices: ConnectedDevice[] = [
  {
    id: '1',
    name: 'iPhone 14',
    ipAddress: '192.168.1.101',
    macAddress: 'AA:BB:CC:DD:EE:FF',
    bandwidthUsage: 25.5,
    deviceType: 'phone',
    isUnknown: false,
    lastSeen: '2 minutes ago',
  },
  {
    id: '2',
    name: 'MacBook Pro',
    ipAddress: '192.168.1.102',
    macAddress: 'BB:CC:DD:EE:FF:AA',
    bandwidthUsage: 45.2,
    deviceType: 'laptop',
    isUnknown: false,
    lastSeen: 'Active now',
  },
  {
    id: '3',
    name: 'Samsung Smart TV',
    ipAddress: '192.168.1.103',
    macAddress: 'CC:DD:EE:FF:AA:BB',
    bandwidthUsage: 15.8,
    deviceType: 'smart-tv',
    isUnknown: false,
    lastSeen: '5 minutes ago',
  },
  {
    id: '4',
    name: 'Unknown Device',
    ipAddress: '192.168.1.104',
    macAddress: 'DD:EE:FF:AA:BB:CC',
    bandwidthUsage: 8.3,
    deviceType: 'unknown',
    isUnknown: true,
    lastSeen: '1 hour ago',
  },
];

export const speedTestResult: SpeedTestResult = {
  downloadSpeed: 85.4,
  uploadSpeed: 12.3,
  ping: 15,
  timestamp: new Date().toISOString(),
};

export const troubleshootingSteps: TroubleshootingStep[] = [
  {
    id: '1',
    title: 'Restart Your Router',
    description: 'Unplug your router for 30 seconds, then plug it back in.',
  },
  {
    id: '2',
    title: 'Check Cable Connections',
    description: 'Ensure all cables are securely connected to your router and modem.',
  },
  {
    id: '3',
    title: 'Update Router Firmware',
    description: 'Check if your router firmware is up to date.',
  },
  {
    id: '4',
    title: 'Contact Your ISP',
    description: 'If issues persist, contact your internet service provider.',
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Why is my internet slow?',
    answer: 'Slow internet can be caused by network congestion, too many connected devices, outdated equipment, or ISP issues.',
  },
  {
    id: '2',
    question: 'Why does my Wi-Fi keep disconnecting?',
    answer: 'Frequent disconnections can be due to interference, weak signal, outdated drivers, or router overheating.',
  },
  {
    id: '3',
    question: 'How can I improve my Wi-Fi signal?',
    answer: 'Position your router centrally, away from obstacles, update firmware, and consider a Wi-Fi extender for large homes.',
  },
];
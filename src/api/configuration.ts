import Constants from 'expo-constants';

export const API_URL =
  Constants.expoConfig?.extra?.apiUrl ||
  (Constants.manifest as any)?.extra?.apiUrl ||
  'http://192.168.100.14:4000';
export const TIMEOUT_MS = 10000; // ⏱️ Timeout after 5 seconds
import '@/lib/polyfill';
import { setupAlarms } from '@/background/alarms';
import { setupMessageRouter } from '@/background/messages';
import { TrackingEngine } from '@/tracking/engine';

export default defineBackground(() => {
  console.log('[Background] Service worker initialized');

  // Register alarms and background listeners
  setupAlarms();
  setupMessageRouter();

  // Initialize tracking engine
  const trackingEngine = new TrackingEngine();
  trackingEngine.init();
});

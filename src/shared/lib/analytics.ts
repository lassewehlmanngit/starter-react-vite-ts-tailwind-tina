/**
 * Analytics utility with consent integration
 *
 * This module provides a unified interface for tracking events and page views
 * while respecting user consent preferences.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type ConsentStatus = 'granted' | 'denied' | 'pending';

export interface AnalyticsConfig {
  measurementId?: string;
  debug?: boolean;
}

export interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

class Analytics {
  private config: AnalyticsConfig = {};
  private consentStatus: ConsentStatus = 'pending';
  private queuedEvents: Array<{ name: string; params: EventParams }> = [];

  /**
   * Initialize analytics with configuration
   */
  init(config: AnalyticsConfig) {
    this.config = config;

    if (this.config.debug) {
      console.log('[Analytics] Initialized with config:', config);
    }
  }

  /**
   * Update consent status and process queued events if granted
   */
  setConsent(status: ConsentStatus) {
    this.consentStatus = status;

    if (this.config.debug) {
      console.log('[Analytics] Consent updated:', status);
    }

    // Update Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: status === 'granted' ? 'granted' : 'denied',
      });
    }

    // Process queued events if consent granted
    if (status === 'granted') {
      this.processQueue();
    } else if (status === 'denied') {
      // Clear queue if consent denied
      this.queuedEvents = [];
    }
  }

  /**
   * Get current consent status
   */
  getConsent(): ConsentStatus {
    return this.consentStatus;
  }

  /**
   * Track a page view
   */
  pageView(path: string, title?: string) {
    this.track('page_view', {
      page_path: path,
      page_title: title,
    });
  }

  /**
   * Track a custom event
   */
  event(name: string, params: EventParams = {}) {
    this.track(name, params);
  }

  /**
   * Track user timing
   */
  timing(name: string, value: number, category?: string) {
    this.track('timing_complete', {
      name,
      value,
      event_category: category,
    });
  }

  /**
   * Track an exception/error
   */
  exception(description: string, fatal = false) {
    this.track('exception', {
      description,
      fatal,
    });
  }

  /**
   * Internal tracking method
   */
  private track(name: string, params: EventParams) {
    if (this.config.debug) {
      console.log('[Analytics] Track:', name, params);
    }

    // If consent pending, queue the event
    if (this.consentStatus === 'pending') {
      this.queuedEvents.push({ name, params });
      return;
    }

    // If consent denied, don't track
    if (this.consentStatus === 'denied') {
      return;
    }

    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', name, params);
    }
  }

  /**
   * Process queued events after consent granted
   */
  private processQueue() {
    if (this.config.debug && this.queuedEvents.length > 0) {
      console.log('[Analytics] Processing queued events:', this.queuedEvents.length);
    }

    for (const { name, params } of this.queuedEvents) {
      this.track(name, params);
    }

    this.queuedEvents = [];
  }
}

// Singleton instance
export const analytics = new Analytics();

// Convenience exports
export const initAnalytics = (config: AnalyticsConfig) => analytics.init(config);
export const setAnalyticsConsent = (status: ConsentStatus) => analytics.setConsent(status);
export const trackPageView = (path: string, title?: string) => analytics.pageView(path, title);
export const trackEvent = (name: string, params?: EventParams) => analytics.event(name, params);

/**
 * Globals content adapter
 * Loads navigation, footer, and settings from content/globals/{lang}/
 */

import type { SupportedLang } from '@/shared/config/i18n';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationData {
  logo?: string;
  items: NavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterData {
  copyright?: string;
  links: FooterLink[];
  social: SocialLink[];
}

export interface SettingsData {
  siteName: string;
  siteDescription?: string;
  defaultOgImage?: string;
  gtmId?: string;
  sentryDsn?: string;
}

/**
 * Fetch navigation data for a language
 */
export async function getNavigation(lang: SupportedLang): Promise<NavigationData> {
  try {
    const res = await fetch(`/content/globals/${lang}/navigation.json`);
    if (!res.ok) throw new Error(`Failed to fetch navigation: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error('Error loading navigation:', err);
    return { items: [] };
  }
}

/**
 * Fetch footer data for a language
 */
export async function getFooter(lang: SupportedLang): Promise<FooterData> {
  try {
    const res = await fetch(`/content/globals/${lang}/footer.json`);
    if (!res.ok) throw new Error(`Failed to fetch footer: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error('Error loading footer:', err);
    return { links: [], social: [] };
  }
}

/**
 * Fetch site settings for a language
 */
export async function getSettings(lang: SupportedLang): Promise<SettingsData> {
  try {
    const res = await fetch(`/content/globals/${lang}/settings.json`);
    if (!res.ok) throw new Error(`Failed to fetch settings: ${res.status}`);
    return res.json();
  } catch (err) {
    console.error('Error loading settings:', err);
    return { siteName: 'Marketing Site Starter' };
  }
}

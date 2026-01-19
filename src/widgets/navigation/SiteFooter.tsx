import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import { getFooter, type FooterData } from '@/shared/lib/content/globals';

export interface SiteFooterProps {
  lang: SupportedLang;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ lang }) => {
  const [footer, setFooter] = useState<FooterData>({ links: [], social: [] });

  useEffect(() => {
    getFooter(lang).then(setFooter);
  }, [lang]);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {footer.copyright || `© ${year} Marketing Site Starter`}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {footer.links.map((link) => (
              <Link
                key={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                to={`/${lang}${link.href}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {footer.social.length > 0 && (
            <div className="flex gap-3">
              {footer.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={s.platform}
                >
                  {s.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};


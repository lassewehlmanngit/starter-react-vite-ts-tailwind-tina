import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import type { SupportedLang } from '@/shared/config/i18n';
import { cn } from '@/shared/lib/cn';
import { getNavigation, type NavigationData } from '@/shared/lib/content/globals';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

export interface SiteHeaderProps {
  lang: SupportedLang;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ lang }) => {
  const { t } = useTranslation('common');
  const [nav, setNav] = useState<NavigationData>({ items: [] });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    getNavigation(lang).then(setNav);
  }, [lang]);

  const linkClassName = ({ isActive }: { isActive: boolean }): string =>
    cn(
      'rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted',
      isActive && 'bg-muted text-foreground',
    );

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    cn(
      'block rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted',
      isActive && 'bg-muted text-foreground',
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to={`/${lang}`} className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          {nav.logo ? (
            <img src={nav.logo} alt="Logo" className="h-8 w-8" />
          ) : (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              M
            </span>
          )}
          <span>Starter</span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label={t('navigation.mainNavigation')}
          className="hidden items-center gap-1 md:flex"
        >
          {nav.items.map((item) => (
            <NavLink key={item.href} to={`/${lang}${item.href}`} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <IconButton
          aria-label={t('navigation.openMenu')}
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </IconButton>

        {/* Mobile drawer */}
        <Drawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          side="right"
          title={t('navigation.menu')}
        >
          <nav
            aria-label={t('navigation.mobileNavigation')}
            className="flex flex-col gap-1"
          >
            {nav.items.map((item) => (
              <NavLink
                key={item.href}
                to={`/${lang}${item.href}`}
                className={mobileLinkClassName}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </Drawer>
      </div>
    </header>
  );
};


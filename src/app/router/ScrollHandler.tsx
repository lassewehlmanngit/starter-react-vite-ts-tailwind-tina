import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollHandler: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const headerOffset = 88;

      const scrollToElement = (): boolean => {
        const element = document.getElementById(id);
        if (!element) return false;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        return true;
      };

      if (scrollToElement()) return;

      const attempts = [250, 500, 900];
      attempts.forEach((delay) => {
        window.setTimeout(() => {
          scrollToElement();
        }, delay);
      });

      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};


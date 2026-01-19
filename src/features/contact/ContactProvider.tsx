import React, { createContext, useContext, useMemo, useState } from 'react';

export interface ContactInfo {
  email?: string;
  phone?: string;
  companyName?: string;
}

export interface ContactContextValue {
  pageContact: ContactInfo | null;
  setPageContact: (contact: ContactInfo | null) => void;
}

const ContactContext = createContext<ContactContextValue | undefined>(undefined);

export interface ContactProviderProps {
  children: React.ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [pageContact, setPageContact] = useState<ContactInfo | null>(null);

  const value = useMemo<ContactContextValue>(
    () => ({
      pageContact,
      setPageContact,
    }),
    [pageContact],
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};

export const usePageContact = (): ContactContextValue => {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('usePageContact must be used within ContactProvider');
  return ctx;
};


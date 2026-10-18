import { useEffect, useMemo, useState } from 'react';
import { translations } from '../data/translations';
import LanguageContext from './contextValue';

const STORAGE_KEY = 'portfolio-language';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = language === 'ar'
      ? 'زيد حمدي | مطور Full Stack'
      : 'Zeyad Hamdy | Full Stack Developer';
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      isArabic: language === 'ar',
      setLanguage,
      t: translations[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

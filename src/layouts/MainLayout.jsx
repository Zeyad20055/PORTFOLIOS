import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ScrollTop from '../components/ScrollTop/ScrollTop';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import MouseCursor from '../components/MouseCursor/MouseCursor';
import { useLanguage } from '../context/useLanguage';

export default function MainLayout({ children }) {
  const { isArabic } = useLanguage();

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'} className={`relative min-h-screen bg-[var(--color-bg)] font-body text-white${isArabic ? ' font-display' : ''}`}>
      <MouseCursor />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollTop />
    </div>
  );
}

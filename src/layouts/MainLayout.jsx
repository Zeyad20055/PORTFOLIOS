import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ScrollTop from '../components/ScrollTop/ScrollTop';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import MouseCursor from '../components/MouseCursor/MouseCursor';

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] font-body">
      <MouseCursor />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollTop />
    </div>
  );
}

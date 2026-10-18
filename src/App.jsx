import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Loader from './components/Loader/Loader';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <HashRouter>
            <Loader loading={loading} />

            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                </Routes>
              </MainLayout>
              </HashRouter>
            </MotionConfig>
      </ThemeProvider>
    </LanguageProvider>
  );
}

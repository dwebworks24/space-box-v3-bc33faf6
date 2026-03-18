import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import PageTransition from './PageTransition';
import ScrollToTop from './ScrollToTop';
import Galaxy from './Galaxy';
import { useLenis } from '@/hooks/useLenis';

export default function Layout() {
  useLenis();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Fixed galaxy background behind all content */}
      <div className="fixed inset-0 z-0">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      <div className="relative z-10">
        <ScrollToTop />
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </div>
  );
}

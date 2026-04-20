import { useScrollPosition } from '@/hooks/useScrollPosition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActionButton from '@/components/FloatingActionButton';
import HeroSection from '@/sections/HeroSection';
import FeaturesSection from '@/sections/FeaturesSection';
import LivePreviewSection from '@/sections/LivePreviewSection';
import HowItWorksSection from '@/sections/HowItWorksSection';
import ThemePresetsSection from '@/sections/ThemePresetsSection';

export default function App() {
  const scrollY = useScrollPosition();
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600;

  return (
    <div className="theme-transition min-h-screen bg-luna-bg text-luna-text">
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <LivePreviewSection />
        <HowItWorksSection />
        <ThemePresetsSection />
      </main>

      <Footer />
      <FloatingActionButton visible={scrollY > heroHeight} />
    </div>
  );
}

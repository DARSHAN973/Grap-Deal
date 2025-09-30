import HeroBannerSlider from '@/components/sections/HeroBannerSlider';
import TrendingSlider from '@/components/sections/TrendingSlider';
import AnimatedHeroHeading from '@/components/sections/AnimatedHeroHeading';

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnimatedHeroHeading />
      <HeroBannerSlider />
      <TrendingSlider />
    </main>
  );
}
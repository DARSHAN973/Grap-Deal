import HeroBannerSlider from '@/components/sections/HeroBannerSlider';
import TrendingSlider from '@/components/sections/TrendingSlider';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <HeroBannerSlider />
      <TrendingSlider />
    </main>
  );
}
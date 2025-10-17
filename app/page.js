'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HeroBannerSlider from '@/components/sections/HeroBannerSlider';
import TrendingSlider from '@/components/sections/TrendingSlider';
import AnimatedHeroHeading from '@/components/sections/AnimatedHeroHeading';

function HomeContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const authRequired = searchParams?.get('auth');
    if (authRequired === 'required') {
      // Trigger auth modal - we'll need to find a way to communicate with Header
      alert('Please log in to continue with checkout. Click the Login button in the header.');
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen">
      <AnimatedHeroHeading />
      <HeroBannerSlider />
      <TrendingSlider />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
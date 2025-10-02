"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banners");
        const data = await res.json();
        setHeroSlides(data.banners || []);
      } catch (err) {
        console.error("Failed to load banners", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <p className="text-center">Loading banners...</p>;

  return (
    <div className="w-full relative overflow-hidden">
      {heroSlides.length > 0 ? (
        heroSlides.map((banner) => (
          <div key={banner.id} className="relative w-full h-[400px] mb-6">
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-5 left-5 bg-black/50 text-white p-3 rounded-lg">
              <h2 className="text-lg font-bold">{banner.title}</h2>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No active banners</p>
      )}
    </div>
  );
}

'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const WaveBackground = () => {
  const containerRef = useRef(null);

  const orbs = [
    { 
      id: 1, 
      gradient: 'from-blue-500/30 via-indigo-500/20 to-purple-500/30 dark:from-blue-500/50 dark:via-indigo-500/40 dark:to-purple-500/50', 
      size: 'h-[500px] w-[500px]', 
      pos: { left: '10%', top: '15%' } 
    },
    { 
      id: 2, 
      gradient: 'from-cyan-500/30 via-sky-500/20 to-blue-500/30 dark:from-cyan-500/50 dark:via-sky-500/40 dark:to-blue-500/50', 
      size: 'h-[600px] w-[600px]', 
      pos: { left: '60%', top: '10%' } 
    },
    { 
      id: 3, 
      gradient: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30 dark:from-emerald-500/50 dark:via-teal-500/40 dark:to-cyan-500/50', 
      size: 'h-[450px] w-[450px]', 
      pos: { left: '20%', top: '60%' } 
    },
    { 
      id: 4, 
      gradient: 'from-fuchsia-500/30 via-purple-500/20 to-pink-500/30 dark:from-fuchsia-500/50 dark:via-purple-500/40 dark:to-pink-500/50', 
      size: 'h-[550px] w-[550px]', 
      pos: { left: '70%', top: '55%' } 
    },
    { 
      id: 5, 
      gradient: 'from-indigo-500/25 via-violet-500/15 to-purple-500/25 dark:from-indigo-500/45 dark:via-violet-500/35 dark:to-purple-500/45', 
      size: 'h-[400px] w-[400px]', 
      pos: { left: '45%', top: '35%' } 
    },
  ];

  useGSAP(() => {
    orbs.forEach((orb, index) => {
      const orbEl = containerRef.current.querySelector(`#orb-${orb.id}`);
      
      // Wave-like floating motion with repeatRefresh for smooth randomization
      gsap.to(orbEl, {
        x: 'random(-200, 200)',
        y: 'random(-150, 150)',
        duration: 'random(18, 28)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        delay: index * 0.8,
      });

      // Subtle rotation
      gsap.to(orbEl, {
        rotation: 360,
        duration: 'random(35, 55)',
        ease: 'none',
        repeat: -1,
      });

      // Breathing scale effect
      gsap.to(orbEl, {
        scale: 'random(1.15, 1.35)',
        duration: 'random(10, 16)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        delay: index * 0.5,
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        {orbs.map((orb) => (
          <div
            key={orb.id}
            id={`orb-${orb.id}`}
            className={`absolute ${orb.size} rounded-full bg-gradient-to-br ${orb.gradient} blur-3xl will-change-transform`}
            style={{
              left: orb.pos.left,
              top: orb.pos.top,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Subtle noise overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      
      {/* Optional: Top gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-50/80 to-transparent dark:from-gray-950/80 dark:to-transparent" />
      
      {/* Bottom gradient fade for better blending */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-50/60 to-transparent dark:from-gray-950/60 dark:to-transparent" />
    </div>
  );
};

export default WaveBackground;
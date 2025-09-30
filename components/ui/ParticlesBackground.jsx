'use client';

import { useEffect, useMemo, useId } from 'react';

const SCRIPT_SRC = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';

const ParticlesBackground = ({
  colors = ['#ff223e', '#5d1eb2', '#ff7300'],
  lightModeColors = ['#2563eb', '#7c3aed', '#f97316'],
  size = 3,
  countDesktop = 60,
  countTablet = 50,
  countMobile = 40,
  zIndex = 0,
  height = '100%',
  className = ''
}) => {
  const reactId = useId();
  const elementId = useMemo(
    () => `particles-${reactId.replace(/[:]/g, '')}`,
    [reactId]
  );

  useEffect(() => {
    let cancelled = false;
    const observers = [];

    const resolveColors = () => {
      if (typeof window === 'undefined') return colors;
      const root = document.documentElement;
      const isDark = root.classList.contains('dark');
      return !isDark && lightModeColors?.length ? lightModeColors : colors;
    };

    const destroyParticles = () => {
      if (typeof window === 'undefined' || !window.pJSDom) return;
      window.pJSDom = window.pJSDom.filter((instance) => {
        const canvasParent = instance?.pJS?.canvas?.el?.parentNode;
        if (canvasParent && canvasParent.id === elementId) {
          const destroyFn = instance?.destroy;
          const vendor = instance?.pJS?.fn?.vendors;

          if (typeof destroyFn === 'function') {
            destroyFn.call(instance);
          } else if (typeof vendor?.destroy === 'function') {
            vendor.destroy();
          } else if (typeof vendor?.destroypJS === 'function') {
            vendor.destroypJS();
          } else {
            // Fallback: remove canvas element manually
            const canvasEl = instance?.pJS?.canvas?.el;
            if (canvasEl && canvasEl.parentNode === canvasParent) {
              canvasParent.removeChild(canvasEl);
            }
          }
          return false;
        }
        return true;
      });
    };

    const initializeParticles = () => {
      if (
        cancelled ||
        typeof window === 'undefined' ||
        !window.particlesJS
      )
        return;

      const element = document.getElementById(elementId);
      if (!element) return;

      const getParticleCount = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1024) return countDesktop;
        if (screenWidth > 768) return countTablet;
        return countMobile;
      };

      destroyParticles();

      window.particlesJS(elementId, {
        particles: {
          number: {
            value: getParticleCount()
          },
          color: {
            value: resolveColors()
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 1,
            random: false
          },
          size: {
            value: size,
            random: true
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out'
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false
            },
            onclick: {
              enable: false
            },
            resize: true
          }
        },
        retina_detect: true
      });
    };

    const ensureScript = () => {
      if (typeof window === 'undefined') return;
      const existingScript = document.querySelector(
        `script[src="${SCRIPT_SRC}"]`
      );

      if (existingScript) {
        if (existingScript.getAttribute('data-loaded')) {
          initializeParticles();
        } else {
          existingScript.addEventListener('load', initializeParticles, {
            once: true
          });
        }
        return;
      }

      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        initializeParticles();
      };
      document.body.appendChild(script);
    };

    ensureScript();

    const handleResize = () => {
      initializeParticles();
    };

    window.addEventListener('resize', handleResize);

    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const observer = new MutationObserver((mutations) => {
        const classChange = mutations.some((mutation) => mutation.attributeName === 'class');
        if (classChange) {
          initializeParticles();
        }
      });

      observer.observe(root, { attributes: true, attributeFilter: ['class'] });
      observers.push(observer);

      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const mediaListener = () => initializeParticles();
      media.addEventListener('change', mediaListener);
      observers.push({ disconnect: () => media.removeEventListener('change', mediaListener) });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      destroyParticles();
      observers.forEach((observer) => observer.disconnect?.());
    };
  }, [elementId, colors, lightModeColors, size, countDesktop, countTablet, countMobile]);

  return (
    <div
      id={elementId}
      className={className}
      style={{
        width: '100%',
        height,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex,
        pointerEvents: 'none'
      }}
    >
      <style>{`
        #${elementId} canvas {
          position: absolute;
          width: 100%;
          height: 100%;
          mix-blend-mode: screen;
          opacity: 0.75;
        }

        .particles-js-canvas-el {
          position: absolute !important;
        }

        .dark #${elementId} canvas {
          mix-blend-mode: normal;
          opacity: 0.6;
        }

        .particles-js-canvas-el circle {
          fill: currentColor;
          filter: url(#${elementId}-glow);
        }
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id={`${elementId}-glow`}>
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default ParticlesBackground;

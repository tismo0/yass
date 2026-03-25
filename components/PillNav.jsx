'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function PillNav({
  logo = null,
  logoAlt = 'Logo',
  items = [],
  activeHref = '/',
  className = '',
  ease = 'power2.easeOut',
  baseColor = '#000000',
  pillColor = '#000000',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#09090b',
  theme = 'light',
  initialLoadAnimation = true,
  onNavigate,
}) {
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const itemRefs = useRef([]);
  const [currentActive, setCurrentActive] = useState(activeHref);

  // Update pill position
  const movePill = (el) => {
    if (!el || !pillRef.current || !navRef.current) return;
    gsap.to(pillRef.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  // Set initial pill position on active item
  useEffect(() => {
    const idx = items.findIndex((it) => it.href === currentActive);
    if (idx >= 0 && itemRefs.current[idx]) {
      if (initialLoadAnimation) {
        gsap.fromTo(
          pillRef.current,
          { opacity: 0, scaleX: 0.5 },
          { opacity: 1, scaleX: 1, duration: 0.5, delay: 0.2, ease }
        );
      }
      // Small delay for DOM layout
      setTimeout(() => movePill(itemRefs.current[idx]), 50);
    }
  }, []);

  // Update when activeHref prop changes
  useEffect(() => {
    setCurrentActive(activeHref);
    const idx = items.findIndex((it) => it.href === activeHref);
    if (idx >= 0 && itemRefs.current[idx]) {
      movePill(itemRefs.current[idx]);
    }
  }, [activeHref]);

  const handleClick = (e, href) => {
    // For page routes (not anchors), let the browser navigate normally
    if (!href.startsWith('#')) {
      return;
    }
    e.preventDefault();
    setCurrentActive(href);
    const idx = items.findIndex((it) => it.href === href);
    if (idx >= 0 && itemRefs.current[idx]) {
      movePill(itemRefs.current[idx]);
    }
    if (onNavigate) onNavigate(href);
    // Smooth scroll
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseEnter = (idx) => {
    if (itemRefs.current[idx]) {
      movePill(itemRefs.current[idx]);
    }
    // Animate text color
    itemRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.to(ref, {
          color: i === idx ? hoveredPillTextColor : pillTextColor,
          duration: 0.2,
          ease,
        });
      }
    });
  };

  const handleMouseLeave = () => {
    // Return pill to active
    const idx = items.findIndex((it) => it.href === currentActive);
    if (idx >= 0 && itemRefs.current[idx]) {
      movePill(itemRefs.current[idx]);
    }
    // Reset colors
    itemRefs.current.forEach((ref, i) => {
      if (ref) {
        gsap.to(ref, {
          color: items[i]?.href === currentActive ? hoveredPillTextColor : pillTextColor,
          duration: 0.2,
          ease,
        });
      }
    });
  };

  const bgColor = theme === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(9,9,11,0.85)';
  const borderColor = theme === 'light' ? 'rgba(228,228,231,0.8)' : 'rgba(39,39,42,0.8)';

  return (
    <nav
      ref={navRef}
      className={`relative flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-xl ${className}`}
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated pill behind active item */}
      <div
        ref={pillRef}
        className="absolute left-0 top-1.5 bottom-1.5 rounded-full pointer-events-none"
        style={{ background: pillColor, transition: 'none' }}
      />

      {/* Logo */}
      {logo && (
        <a href="#" className="relative z-10 flex items-center mr-2 pl-1.5">
          {typeof logo === 'string' ? (
            <img src={logo} alt={logoAlt} className="h-5 w-auto" />
          ) : (
            logo
          )}
        </a>
      )}

      {/* Nav items */}
      {items.map((item, i) => (
        <a
          key={item.href}
          href={item.href}
          ref={(el) => (itemRefs.current[i] = el)}
          onClick={(e) => handleClick(e, item.href)}
          onMouseEnter={() => handleMouseEnter(i)}
          className="relative z-10 text-[13px] font-medium px-4 py-1.5 rounded-full transition-none whitespace-nowrap cursor-pointer select-none block"
          style={{
            color: item.href === currentActive ? hoveredPillTextColor : pillTextColor,
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

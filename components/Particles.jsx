'use client';

import React, { useRef, useEffect, useState } from 'react';

function hexToRgb(hex) {
  let h = hex.replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export default function Particles({
  particleColors = ['#ffffff'],
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleBaseSize = 100,
  moveParticlesOnHover = true,
  alphaParticles = false,
  disableRotation = false,
  pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  className = '',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      const colors = particleColors.map(hexToRgb);
      for (let i = 0; i < particleCount; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        // Size variation based on baseSize (which is a general scale factor in some libs, let's treat it as max radius * 10 or similar)
        const radius = (Math.random() * 2 + 0.5) * (particleBaseSize / 100);
        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed * 10,
          vy: (Math.random() - 0.5) * speed * 10,
          radius,
          color: c,
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: disableRotation ? 0 : (Math.random() - 0.5) * 0.05,
          alpha: alphaParticles ? Math.random() : 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.current.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rotationSpeed;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction
        if (moveParticlesOnHover) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = particleSpread * 15;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            p.x -= (dx / dist) * force * 2;
            p.y -= (dy / dist) * force * 2;
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        if (alphaParticles) {
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        } else {
          ctx.fillStyle = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b})`;
        }
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    particleColors,
    particleCount,
    particleSpread,
    speed,
    particleBaseSize,
    moveParticlesOnHover,
    alphaParticles,
    disableRotation,
    pixelRatio,
  ]);

  const handleMouseMove = (e) => {
    if (!moveParticlesOnHover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouse.current.x = -9999;
    mouse.current.y = -9999;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

'use client';
import React, { useRef, useEffect } from 'react';

export default function LightRays({
  className = '',
  raysOrigin = 'top-center', // top-center, center, bottom-center
  raysColor = '#ffffff',
  raysSpeed = 1,
  lightSpread = 0.5, // 0 to 1
  rayLength = 3,
  followMouse = true,
  mouseInfluence = 0.1,
  fadeDistance = 1,
  pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rays = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;

    const initRays = () => {
      rays.current = [];
      const numRays = 40;
      for (let i = 0; i < numRays; i++) {
        rays.current.push({
          angle: (Math.random() - 0.5) * Math.PI * lightSpread,
          speed: (0.001 + Math.random() * 0.002) * raysSpeed,
          opacity: Math.random() * 0.5 + 0.1,
          width: Math.random() * 40 + 10,
          length: (Math.random() * 0.5 + 0.5) * rayLength,
          phase: Math.random() * Math.PI * 2,
          dir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const resize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      
      centerX = width / 2;
      mouse.current.x = centerX;
      mouse.current.targetX = centerX;
      
      if (raysOrigin === 'top-center') {
        centerY = -height * 0.1;
      } else if (raysOrigin === 'bottom-center') {
        centerY = height * 1.1;
      } else {
        centerY = height / 2;
      }
      mouse.current.y = centerY;
      mouse.current.targetY = centerY;

      initRays();
    };

    const hexToRgb = (hex) => {
      let h = hex.replace(/^#/, '');
      if (h.length === 3) h = h.split('').map((x) => x + x).join('');
      const num = parseInt(h, 16);
      return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    };

    const rgbColor = hexToRgb(raysColor);
    let time = 0;

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Mouse lerp
      if (followMouse) {
        mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
        mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;
        
        centerX += (mouse.current.x - centerX) * mouseInfluence;
      }

      const gradientStart = `rgba(${rgbColor}, 0.8)`;
      const gradientEnd = `rgba(${rgbColor}, 0)`;

      rays.current.forEach((ray) => {
        ray.phase += ray.speed * ray.dir;
        const currentAngle = ray.angle + Math.sin(ray.phase) * 0.1;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentAngle);
        
        const rayLen = height * ray.length;
        const gradient = ctx.createLinearGradient(0, 0, 0, rayLen);
        gradient.addColorStop(0, gradientStart);
        gradient.addColorStop(fadeDistance, gradientEnd);

        ctx.globalAlpha = ray.opacity * (0.5 + Math.sin(ray.phase * 2) * 0.2);
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.moveTo(-ray.width / 2, 0);
        ctx.lineTo(ray.width / 2, 0);
        ctx.lineTo(ray.width * 2, rayLen);
        ctx.lineTo(-ray.width * 2, rayLen);
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
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    followMouse,
    mouseInfluence,
    fadeDistance,
    pixelRatio,
  ]);

  const handleMouseMove = (e) => {
    if (!followMouse || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.targetX = e.clientX - rect.left;
    mouse.current.targetY = e.clientY - rect.top;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          filter: 'blur(20px)', // Creates the volume light effect
        }}
      />
    </div>
  );
}

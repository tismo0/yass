'use client';

import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import {
  Menu, X, Send, ArrowRight, ArrowUpRight,
  Layers, Code2, Rocket, Plus,
  CheckCircle2, Loader2,
  ChevronUp, Sparkles, Eye
} from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiSupabase, SiGit,
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiNodedotjs,
  SiPostgresql, SiDocker, SiStripe, SiAmazonwebservices
} from 'react-icons/si';
import { Marquee } from '@/components/ui/marquee';
import PillNav from '@/components/PillNav';
import SpotlightCard from '@/components/SpotlightCard';
import LightRays from '@/components/LightRays';
import Particles from '@/components/Particles';

// Lazy load Antigravity for performance
const Antigravity = lazy(() => import('@/components/Antigravity'));


/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const processSteps = [
  {
    num: '01',
    title: 'Audit & Vision',
    desc: 'Analyse complète de votre établissement. On identifie les points de friction et les leviers de croissance digitale.',
    detail: 'Diagnostic offert',
    icon: Sparkles,
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'Conception UI/UX sur-mesure, maquettes interactives, validation des parcours utilisateurs avec votre équipe.',
    detail: 'Maquettes Figma',
    icon: Layers,
  },
  {
    num: '03',
    title: 'Engineering',
    desc: 'Développement robuste, code propre, tests automatisés. Performances optimales même aux heures de pointe.',
    detail: 'Next.js · React Native',
    icon: Code2,
  },
  {
    num: '04',
    title: 'Lancement & Scale',
    desc: 'Déploiement, formation de votre équipe, monitoring 24/7 et itérations continues basées sur vos données.',
    detail: 'Support dédié 24/7',
    icon: Rocket,
  },
];

const projects = [
  {
    id: 'project-1',
    title: 'Plateforme de réservation',
    category: 'SaaS',
    desc: 'Une expérience de réservation fluide pour les restaurants étoilés.',
    image: null,
    link: null,
  },
  {
    id: 'project-2',
    title: 'Dashboard Gérant',
    category: 'Web App',
    desc: 'Gestion des commandes, stocks et analyse des performances en temps réel.',
    image: null,
    link: null,
  },
  {
    id: 'project-3',
    title: 'Application Client',
    category: 'App Native',
    desc: 'Fidélisation et commande à table via QR code intelligent.',
    image: null,
    link: null,
  },
];

const techStack = [
  { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
  { icon: SiCss3, name: 'CSS3', color: '#1572B6' },
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: SiReact, name: 'React', color: '#61DAFB' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#ffffff' }, // White for dark mode stack
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
  { icon: SiSupabase, name: 'Supabase', color: '#3FCF8E' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
  { icon: SiGit, name: 'Git', color: '#F05032' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiStripe, name: 'Stripe', color: '#635BFF' },
  { icon: SiAmazonwebservices, name: 'AWS', color: '#FF9900' },
];


/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL (Framer Motion)
   ═══════════════════════════════════════════════════════ */

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* ═══════════════════════════════════════════════════════
   PROJECT CARD (using SpotlightCard)
   ═══════════════════════════════════════════════════════ */

function ProjectCard({ project }) {
  const hasContent = project.image && project.link;
  const Wrapper = hasContent ? 'a' : 'div';
  const wrapperProps = hasContent
    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group block h-full transition-transform duration-500 hover:-translate-y-1 ${
        hasContent ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <SpotlightCard className="h-full p-4 sm:p-5 flex flex-col" spotlightColor="rgba(255, 255, 255, 0.08)" borderColor="rgba(255, 255, 255, 0.05)">
        {/* Placeholder / Image Area */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800/50 mb-5 relative group/img">
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 group-hover/img:scale-110">
                <ArrowUpRight size={13} className="text-white" />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
               <div className="w-12 h-12 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center group-hover/img:bg-zinc-800 transition-colors">
                 <Eye size={18} className="text-zinc-500 group-hover/img:text-zinc-300 transition-colors" />
               </div>
               <span className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">Bientôt disponible</span>
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="flex-1 flex flex-col justify-between px-1">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-[16px] font-semibold text-white tracking-tight">
                {project.title}
              </h3>
            </div>
            <p className="text-[13px] text-zinc-400 leading-relaxed">
              {project.desc}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-zinc-800/50">
             <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest bg-zinc-900/50 border border-zinc-800 px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>
        </div>
      </SpotlightCard>
    </Wrapper>
  );
}


/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  // Handle Scroll Spy
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['contact', 'portfolio', 'stack', 'processus', 'hero'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 300) {
          setActiveSection(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('loading');
    try {
      const res = await fetch('https://formsubmit.co/ajax/9614c88d9c38e36384389a0dc6810357', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service,
          message: form.message,
          _subject: `[Despa&co] ${form.name} — ${form.service}`,
        }),
      });
      if (res.ok) {
        setFormState('success');
        setTimeout(() => {
          setFormState('idle');
          setForm({ name: '', email: '', service: '', message: '' });
        }, 4000);
      } else setFormState('idle');
    } catch { setFormState('idle'); }
  };

  const navItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Processus', href: '#processus' },
    { label: 'Stack', href: '#stack' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  /* Logo Element — text only, no icon */
  const logoEl = (
    <span className="font-semibold text-[14px] tracking-tight text-zinc-900 mr-1">
      Despa<span className="text-zinc-400">&amp;</span>co
    </span>
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-white/20">

      {/* ════════════════ FIXED NAVBAR - PILLNAV ════════════════ */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ${
          scrolled ? 'top-3' : 'top-5'
        }`}
      >
        <PillNav
          logo={logoEl}
          logoAlt="Despa&co"
          items={navItems}
          activeHref={activeSection}
          baseColor="#ffffff" // the navbar container itself stays white
          pillColor="#000000" // the selected pill is black
          hoveredPillTextColor="#ffffff"
          pillTextColor="#71717a"
          theme="light"
          initialLoadAnimation
        />
      </motion.div>

      {/* Mobile navbar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 md:hidden transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-zinc-200 shadow-sm'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-semibold text-[15px] tracking-tight text-zinc-900">
              Despa<span className="text-zinc-400">&amp;</span>co
            </span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 active:bg-zinc-200 transition-all"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white text-zinc-900 md:hidden"
          >
            <div className="flex flex-col h-full px-6 py-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">D</span>
                  </div>
                  <span className="font-semibold text-[14px] tracking-tight">
                    Despa<span className="text-zinc-400">&</span>co
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col justify-center flex-1 gap-2">
                {navItems.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`text-[32px] font-semibold tracking-tight py-2 transition-colors ${
                      activeSection === l.href
                        ? 'text-zinc-900'
                        : 'text-zinc-300'
                    }`}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ════════════════ 1. HERO (WHITE THEME + BLACK ANTIGRAVITY) ════════════════ */}
      <section id="hero" className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-white text-zinc-900">
        
        {/* Antigravity 3D background (Black particles reacting to mouse) */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
             <Antigravity
              count={250}
              magnetRadius={6}
              ringRadius={8}
              waveSpeed={0.3}
              waveAmplitude={0.8}
              particleSize={1.2}
              lerpSpeed={0.04}
              color="#09090b"  // Black particles 
              autoAnimate
              particleVariance={1.2}
              rotationSpeed={0.05}
              depthFactor={0.8}
              pulseSpeed={2}
              particleShape="capsule"
              fieldStrength={10}
            />
          </Suspense>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-block text-[11px] sm:text-[12px] font-medium text-zinc-500 uppercase tracking-[0.25em] mb-8 border border-zinc-200 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full">
              Digital Agency
            </p>

            <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-semibold leading-[1.05] tracking-[-0.03em] text-zinc-900 mb-6 drop-shadow-sm">
              L'ingénierie digitale
              <br />
              au service de la
              <br />
              <span className="text-zinc-400">restauration.</span>
            </h1>

            <p className="text-[15px] sm:text-[17px] text-zinc-500 max-w-lg mx-auto mb-10 leading-relaxed font-light">
              Nous concevons des applications natives, du SaaS et des automatisations sur-mesure pour les établissements exigeants.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 text-[14px] font-medium text-white bg-zinc-900 rounded-full shadow-xl shadow-zinc-900/10 hover:bg-zinc-800 active:scale-[0.97] transition-all"
              >
                Démarrer un projet →
              </a>
              <a
                href="#processus"
                className="w-full sm:w-auto px-8 py-3.5 text-[14px] font-medium text-zinc-600 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.97] transition-all"
              >
                Comment ça marche
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-zinc-300 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-zinc-400" />
          </motion.div>
        </motion.div>
      </section>




      {/* ════════════════ 2. PROCESSUS (BLACK THEME + SPOTLIGHT CARDS) ════════════════ */}
      <section id="processus" className="py-24 sm:py-32 md:py-40 bg-zinc-950 relative border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-semibold tracking-[-0.02em] text-white leading-tight">
                L'excellence a
                <br />
                <span className="text-zinc-600">une méthode.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <SpotlightCard className="h-full p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col gap-6 mb-8">
                        <span className="text-[48px] font-bold text-zinc-800 leading-none tracking-tighter">
                          {step.num}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                          <Icon size={20} className="text-zinc-400" />
                        </div>
                      </div>

                      <h3 className="text-[20px] font-semibold text-white mb-3 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-[14px] text-zinc-400 leading-relaxed mb-6 font-light">
                        {step.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-900">
                      <span className="inline-block text-[11px] font-medium text-zinc-500 uppercase tracking-widest">
                        → {step.detail}
                      </span>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ════════════════ 3. STACK (BLACK THEME + MARQUEE) ════════════════ */}
      <section id="stack" className="py-20 sm:py-28 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-14 sm:mb-20">
              <h2 className="text-[1.75rem] sm:text-[2.25rem] font-semibold tracking-[-0.02em] text-white leading-tight">
                La tech derrière 
                <span className="text-zinc-600 block mt-1">la performance.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative py-6">
              {/* Fade gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />

              <Marquee speed={35} pauseOnHover>
                {techStack.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-4 mx-6 sm:mx-8 group cursor-default">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center group-hover:bg-zinc-800 transition-all duration-300">
                        <Icon size={28} className="text-zinc-500 group-hover:text-white transition-colors duration-300 filter grayscale group-hover:grayscale-0" style={{ color: typeof Icon === "string" ? "white" : undefined }} color={tech.color} />
                      </div>
                      <span className="text-[11px] sm:text-[12px] text-zinc-600 group-hover:text-zinc-400 transition-colors whitespace-nowrap font-medium tracking-wide">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </Marquee>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ════════════════ 4. PORTFOLIO (BLACK THEME + LIGHTRAYS) ════════════════ */}
      <section id="portfolio" className="relative py-24 sm:py-32 md:py-40 bg-black border-t border-zinc-900 overflow-hidden">
        {/* Deep volumetric LightRays in background */}
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.5}
          lightSpread={0.8}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.15}
          fadeDistance={0.7}
          className="opacity-50 mix-blend-screen"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-16 sm:mb-24">
               <p className="inline-block text-[11px] font-medium text-white/50 uppercase tracking-[0.25em] mb-6 border border-white/10 bg-white/5 px-4 py-1.5 rounded-full">
                Portfolio
              </p>
              <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-semibold tracking-[-0.02em] text-white leading-tight">
                Une sélection
                <br />
                <span className="text-white/30">de projets.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.15}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════ 5. CONTACT (BLACK THEME + PARTICLES) ════════════════ */}
      <section id="contact" className="relative py-24 sm:py-32 md:py-40 bg-[#020202] border-t border-zinc-900 overflow-hidden">
        
        {/* Custom React-Bits-style Particles (White particles on deep black) */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#ffffff']}
            particleCount={250}
            particleSpread={12}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-semibold tracking-[-0.02em] text-white leading-tight mb-4">
                Lançons votre
                <br />
                projet.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-zinc-400 font-light leading-relaxed">
                Remplissez les informations ci-dessous. Nous vous recontacterons sous 48h.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
             <SpotlightCard className="p-1" spotlightColor="rgba(255,255,255,0.06)" borderColor="rgba(255,255,255,0.05)">
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-zinc-950/80 backdrop-blur-xl rounded-2xl space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-4 text-[14px] bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:bg-zinc-800/80 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all font-light"
                    placeholder="Votre nom"
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-5 py-4 text-[14px] bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:bg-zinc-800/80 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all font-light"
                    placeholder="Votre email"
                  />
                </div>

                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-5 py-4 text-[14px] bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:bg-zinc-800/80 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all appearance-none cursor-pointer font-light"
                >
                  <option value="" className="text-zinc-500">Intéressé par...</option>
                  <option value="saas">SaaS / Solution Métier</option>
                  <option value="app-native">Application Native (iOS/Android)</option>
                  <option value="site-web">Site Web Premium</option>
                  <option value="automatisation">Automatisation process</option>
                </select>

                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-5 py-4 text-[14px] bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:bg-zinc-800/80 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all resize-none font-light"
                  placeholder="Décrivez brièvement votre projet..."
                />

                <button
                  type="submit"
                  disabled={formState !== 'idle'}
                  className="w-full py-4 text-[14px] font-medium text-black bg-white rounded-xl hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {formState === 'loading' && <Loader2 size={16} className="animate-spin" />}
                  {formState === 'success' && <CheckCircle2 size={16} />}
                  {formState === 'idle' && <Send size={16} />}
                  {formState === 'loading' ? 'Envoi...' : formState === 'success' ? 'Message envoyé' : 'Demander un devis'}
                </button>

                {formState === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-[13px] text-emerald-400 font-medium"
                  >
                    Nous avons bien reçu votre demande.
                  </motion.p>
                )}
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>


      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="py-10 bg-black border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <a href="/a-propos" className="text-[14px] font-semibold text-white tracking-tight hover:text-zinc-300 transition-colors">
                Despa<span className="text-zinc-500">&</span>co
              </a>
              <span className="text-zinc-700">·</span>
              <span className="text-[12px] text-zinc-500 font-light">Verviers, Belgique</span>
            </div>

            <p className="text-[12px] text-zinc-500 font-medium tracking-wide">
              © {new Date().getFullYear()} Despa&co · Tous droits réservés
            </p>
          </div>
        </div>
      </footer>


      {/* Scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:bg-zinc-200 active:scale-90 transition-all cursor-pointer border border-zinc-200"
          >
            <ChevronUp size={18} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

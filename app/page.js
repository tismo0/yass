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
    detail: 'Maquettes Figma exclusives',
    icon: Layers,
  },
  {
    num: '03',
    title: 'Engineering',
    desc: 'Développement robuste, code propre, tests automatisés. Performances optimales même aux heures de pointe.',
    detail: 'Next.js · React Native · Node',
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
    title: 'Projet à venir',
    category: 'SaaS',
    desc: 'Notre première réalisation sera présentée ici très bientôt.',
    image: null,
    link: null,
  },
  {
    id: 'project-2',
    title: 'Projet à venir',
    category: 'App Native',
    desc: 'Un projet passionnant est actuellement en développement.',
    image: null,
    link: null,
  },
  {
    id: 'project-3',
    title: 'Projet à venir',
    category: 'Web App',
    desc: 'Chaque projet est une collaboration unique et sur-mesure.',
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
  { icon: SiNextdotjs, name: 'Next.js', color: '#000' },
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
   SCROLL REVEAL
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
   PROJECT CARD
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
      className={`group block overflow-hidden transition-all duration-500 ${
        hasContent ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* Image / Placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 mb-4 transition-all duration-500 group-hover:border-zinc-300 group-hover:shadow-xl group-hover:shadow-zinc-200/50">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
              <ArrowUpRight size={13} className="text-zinc-800" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-zinc-200 flex items-center justify-center group-hover:border-zinc-300 transition-colors">
              <Plus size={22} className="text-zinc-300 group-hover:text-zinc-400 transition-colors" />
            </div>
            <span className="text-[11px] text-zinc-300 font-medium tracking-wide uppercase">Bientôt</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-[15px] font-semibold text-zinc-900 tracking-tight">
            {project.title}
          </h3>
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider border border-zinc-200 px-2 py-0.5 rounded-full">
            {project.category}
          </span>
        </div>
        <p className="text-[13px] text-zinc-500 leading-relaxed">
          {project.desc}
        </p>
      </div>
    </Wrapper>
  );
}


/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['contact', 'portfolio', 'stack', 'processus', 'hero'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 250) {
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

  /* Logo element for PillNav */
  const logoEl = (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center">
        <span className="text-white text-[10px] font-bold leading-none">D</span>
      </div>
      <span className="font-semibold text-[14px] tracking-tight text-zinc-900">
        Despa<span className="text-zinc-400">&</span>co
      </span>
    </div>
  );


  return (
    <main className="min-h-screen bg-white text-zinc-900">

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
          baseColor="#ffffff"
          pillColor="#000000"
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
            ? 'bg-white/90 backdrop-blur-xl border-b border-zinc-100'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">D</span>
            </div>
            <span className="font-semibold text-[14px] tracking-tight">
              Despa<span className="text-zinc-400">&</span>co
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
            className="fixed inset-0 z-[60] bg-white md:hidden"
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

              <nav className="flex flex-col justify-center flex-1 gap-1">
                {navItems.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`text-[28px] font-medium tracking-tight px-4 py-3 rounded-2xl transition-colors ${
                      activeSection === l.href
                        ? 'text-zinc-900 bg-zinc-100'
                        : 'text-zinc-400 active:bg-zinc-50'
                    }`}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full py-4 bg-zinc-900 text-white text-[15px] font-medium rounded-2xl text-center active:scale-[0.98] transition-transform mb-4"
              >
                Démarrer un projet
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ════════════════ HERO + ANTIGRAVITY ════════════════ */}
      <section id="hero" className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
        {/* Antigravity 3D background */}
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
              color="#d4d4d8"
              autoAnimate
              particleVariance={1.2}
              rotationSpeed={0.05}
              depthFactor={0.8}
              pulseSpeed={2}
              particleShape="capsule"
              fieldStrength={8}
            />
          </Suspense>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] sm:text-[12px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-8">
              Digital Agency
            </p>

            <h1 className="text-[2.25rem] sm:text-[3.25rem] md:text-[4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-zinc-900 mb-6">
              L'ingénierie digitale
              <br />
              au service de la
              <br />
              <span className="text-zinc-300">restauration.</span>
            </h1>

            <p className="text-[15px] sm:text-[17px] text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed font-light">
              Apps natives, SaaS et automatisation
              pour votre établissement.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="w-full sm:w-auto px-7 py-3 text-[14px] font-medium text-white bg-zinc-900 rounded-full hover:bg-zinc-800 active:scale-[0.97] transition-all"
              >
                Démarrer un projet →
              </a>
              <a
                href="#processus"
                className="w-full sm:w-auto px-7 py-3 text-[14px] font-medium text-zinc-500 border border-zinc-200 rounded-full hover:bg-zinc-50 hover:text-zinc-900 active:scale-[0.97] transition-all"
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


      {/* ════════════════ PROCESSUS ════════════════ */}
      <section id="processus" className="py-20 sm:py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-16 sm:mb-20">
              <p className="text-[11px] sm:text-[12px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-4">
                Notre approche
              </p>
              <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-semibold tracking-[-0.02em] text-zinc-900 leading-tight">
                Un processus pensé
                <br />
                pour votre succès.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="relative bg-zinc-50 rounded-3xl p-7 sm:p-8 group hover:bg-zinc-100/80 transition-all duration-500 h-full border border-transparent hover:border-zinc-200/50">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-500">
                        <Icon size={16} className="text-zinc-400 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <span className="text-[40px] font-bold text-zinc-100 group-hover:text-zinc-200 transition-colors leading-none tracking-tighter">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-[18px] font-semibold text-zinc-900 mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed mb-4">
                      {step.desc}
                    </p>
                    <span className="inline-block text-[11px] font-medium text-zinc-400 bg-white border border-zinc-200/80 px-3 py-1 rounded-full">
                      {step.detail}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ════════════════ STACK — MARQUEE ════════════════ */}
      <section id="stack" className="py-20 sm:py-28 md:py-36 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[11px] sm:text-[12px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-4">
                Technologies
              </p>
              <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-semibold tracking-[-0.02em] text-zinc-900 leading-tight">
                Stack moderne,
                <br />
                résultats concrets.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative py-6">
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-white to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-white to-transparent" />

              <Marquee speed={30} pauseOnHover>
                {techStack.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-3 mx-5 sm:mx-7 group cursor-default">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center group-hover:bg-white group-hover:border-zinc-300 group-hover:shadow-lg group-hover:shadow-zinc-100 group-hover:scale-110 transition-all duration-300">
                        <Icon size={24} color={tech.color} />
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-zinc-400 group-hover:text-zinc-600 transition-colors whitespace-nowrap font-medium">
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


      {/* ════════════════ PORTFOLIO ════════════════ */}
      <section id="portfolio" className="py-20 sm:py-28 md:py-36 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-14 sm:mb-20">
              <p className="text-[11px] sm:text-[12px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-4">
                Réalisations
              </p>
              <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-semibold tracking-[-0.02em] text-zinc-900 leading-tight">
                Nos projets,
                <br />
                <span className="text-zinc-300">bientôt ici.</span>
              </h2>
              <p className="text-[14px] sm:text-[15px] text-zinc-400 mt-4 max-w-md mx-auto leading-relaxed">
                Nos premières réalisations seront présentées très prochainement. Chaque projet est une collaboration unique.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════ CONTACT ════════════════ */}
      <section id="contact" className="py-20 sm:py-28 md:py-36">
        <div className="max-w-xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-[11px] sm:text-[12px] font-medium text-zinc-400 uppercase tracking-[0.2em] mb-4">
                Contact
              </p>
              <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-semibold tracking-[-0.02em] text-zinc-900 leading-tight mb-3">
                Parlons de
                <br />
                votre projet.
              </h2>
              <p className="text-[14px] sm:text-[15px] text-zinc-400 leading-relaxed">
                Décrivez votre besoin. Réponse garantie sous 48h.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 text-[14px] bg-zinc-100/50 border border-zinc-200 rounded-2xl text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:bg-white focus:border-zinc-300 focus:ring-2 focus:ring-zinc-100 transition-all shadow-sm"
                  placeholder="Votre nom"
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 text-[14px] bg-zinc-100/50 border border-zinc-200 rounded-2xl text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:bg-white focus:border-zinc-300 focus:ring-2 focus:ring-zinc-100 transition-all shadow-sm"
                  placeholder="Votre email"
                />
              </div>

              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-zinc-100/50 border border-zinc-200 rounded-2xl text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-300 focus:ring-2 focus:ring-zinc-100 transition-all appearance-none cursor-pointer shadow-sm"
              >
                <option value="">Type de service</option>
                <option value="saas">SaaS / Plateforme</option>
                <option value="app-native">Application Native</option>
                <option value="site-web">Site Web</option>
                <option value="automatisation">Automatisation</option>
                <option value="autre">Autre</option>
              </select>

              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 text-[14px] bg-zinc-100/50 border border-zinc-200 rounded-2xl text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:bg-white focus:border-zinc-300 focus:ring-2 focus:ring-zinc-100 transition-all resize-none shadow-sm"
                placeholder="Décrivez votre projet..."
              />

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full py-3.5 text-[14px] font-medium text-white bg-zinc-900 rounded-2xl hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {formState === 'loading' && <Loader2 size={15} className="animate-spin" />}
                {formState === 'success' && <CheckCircle2 size={15} />}
                {formState === 'idle' && <Send size={15} />}
                {formState === 'loading' ? 'Envoi...' : formState === 'success' ? 'Message envoyé !' : 'Envoyer le message'}
              </button>

              {formState === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[13px] text-emerald-600 font-medium"
                >
                  Merci ! Nous vous recontacterons sous 48h.
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </section>


      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="py-8 sm:py-10 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-zinc-900 rounded flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">D</span>
              </div>
              <span className="text-[13px] font-medium text-zinc-900">
                Despa<span className="text-zinc-400">&</span>co
              </span>
            </div>

            <p className="text-[11px] text-zinc-300">
              © {new Date().getFullYear()} Despa&co · Fait avec rigueur
            </p>
          </div>
        </div>
      </footer>


      {/* Scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-5 right-5 z-50 w-9 h-9 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer"
          >
            <ChevronUp size={15} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import {
  Menu, X, Send, ArrowRight, ArrowUpRight,
  MessageSquare, Layers, Code2, Rocket,
  CheckCircle2, Loader2, Zap, Plus,
  ChevronUp, MapPin, Building2,
  TrendingUp, Timer, Shield, Sparkles,
  Eye, ImageIcon, ExternalLink
} from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiSupabase, SiGit,
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiNodedotjs,
  SiPostgresql, SiDocker, SiStripe, SiAmazonwebservices
} from 'react-icons/si';
import { Marquee } from '@/components/ui/marquee';
import { DotPattern } from '@/components/ui/dot-pattern';


/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const processSteps = [
  {
    num: '01',
    title: 'Audit & Vision',
    desc: 'Analyse complète de votre établissement, identification des pertes de temps et opportunités de digitalisation.',
    detail: 'Pourquoi votre restaurant perd du temps',
    icon: Sparkles,
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'Conception UI/UX exclusive, maquettes interactives et validation des parcours utilisateurs avec votre équipe.',
    detail: 'Maquettes UI/UX exclusives',
    icon: Layers,
  },
  {
    num: '03',
    title: 'Engineering',
    desc: 'Développement robuste avec Next.js, React Native et des performances optimales pour les heures de pointe.',
    detail: 'Next.js, React Native, Performance',
    icon: Code2,
  },
  {
    num: '04',
    title: 'Scalabilité',
    desc: 'Déploiement, formation de votre équipe, monitoring continu et maintenance proactive 24/7.',
    detail: 'Déploiement & Maintenance 24/7',
    icon: Rocket,
  },
];

/* Portfolio : cadre prêt pour de vrais projets — remplace image/link plus tard */
const projects = [
  {
    id: 'project-1',
    title: 'Projet à venir',
    category: 'SaaS · Réservation',
    desc: 'Un nouveau projet passionnant est en préparation. Restez connecté.',
    image: null,
    link: null,
  },
  {
    id: 'project-2',
    title: 'Projet à venir',
    category: 'App Native · iOS & Android',
    desc: 'Un nouveau projet passionnant est en préparation. Restez connecté.',
    image: null,
    link: null,
  },
  {
    id: 'project-3',
    title: 'Projet à venir',
    category: 'SaaS · QR Code',
    desc: 'Un nouveau projet passionnant est en préparation. Restez connecté.',
    image: null,
    link: null,
  },
  {
    id: 'project-4',
    title: 'Projet à venir',
    category: 'Site Web · Vitrine',
    desc: 'Un nouveau projet passionnant est en préparation. Restez connecté.',
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
  { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
  { icon: SiSupabase, name: 'Supabase', color: '#3FCF8E' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
  { icon: SiGit, name: 'Git', color: '#F05032' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
  { icon: SiStripe, name: 'Stripe', color: '#635BFF' },
  { icon: SiAmazonwebservices, name: 'AWS', color: '#FF9900' },
];

const stats = [
  { value: '50+', label: 'Projets livrés' },
  { value: '98%', label: 'Satisfaction' },
  { value: '<48h', label: 'Temps de réponse' },
  { value: '24/7', label: 'Support actif' },
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
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* ═══════════════════════════════════════════════════════
   PROJECT CARD (placeholder-ready)
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
      className={`group block rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-300 ${
        hasContent
          ? 'hover:shadow-lg hover:shadow-zinc-100 hover:border-zinc-300 cursor-pointer'
          : 'cursor-default'
      }`}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-50">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowUpRight size={13} className="text-zinc-600" />
            </div>
          </>
        ) : (
          /* Empty placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl border-2 border-dashed border-zinc-200 flex items-center justify-center">
              <Plus size={20} className="text-zinc-300" />
            </div>
            <span className="text-xs text-zinc-300 font-medium">Bientôt disponible</span>
          </div>
        )}
      </div>

      {/* Info bar */}
      <div className="px-4 py-4 sm:px-5 sm:py-4">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-[15px] font-semibold text-zinc-900 tracking-tight leading-snug">
            {project.title}
          </h3>
          <span className="shrink-0 text-[10px] sm:text-[11px] font-medium text-zinc-400 uppercase tracking-wider mt-0.5">
            {project.category}
          </span>
        </div>
        <p className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed">
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
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Track active section
      const sections = ['processus', 'stack', 'portfolio', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
      if (window.scrollY < 300) setActiveSection('');
    };
    window.addEventListener('scroll', onScroll);
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

  const navLinks = [
    { id: 'processus', label: 'Processus' },
    { id: 'stack', label: 'Stack' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* ════════════════ HEADER ════════════════ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center group-hover:rounded-lg transition-all duration-300">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-zinc-900">
              Despa<span className="text-zinc-400">&</span>co
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative text-[13px] font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === l.id
                    ? 'text-zinc-900 bg-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                {l.label}
                {activeSection === l.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-zinc-100 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 text-[13px] font-medium text-white bg-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 active:scale-[0.97] transition-all"
            >
              Démarrer un projet
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-white md:hidden"
          >
            <div className="flex flex-col h-full px-5 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">D</span>
                  </div>
                  <span className="font-semibold text-[15px] tracking-tight">
                    Despa<span className="text-zinc-400">&</span>co
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col items-start justify-center flex-1 gap-2">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`w-full text-2xl font-medium tracking-tight px-4 py-3 rounded-xl transition-colors ${
                      activeSection === l.id
                        ? 'text-zinc-900 bg-zinc-100'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full mt-4 px-4 py-3.5 bg-zinc-900 text-white text-lg font-medium rounded-xl text-center active:scale-[0.98] transition-transform"
                >
                  Démarrer un projet
                </motion.a>
              </nav>

              {/* Mobile footer */}
              <p className="text-[11px] text-zinc-300 text-center pb-4">
                © {new Date().getFullYear()} Despa&co
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-14 sm:pt-16 overflow-hidden">
        <DotPattern className="opacity-30 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-6 text-center py-16 sm:py-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[11px] sm:text-[13px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-6 sm:mb-8">
              Agence digitale pour la restauration
            </p>

            <h1 className="text-[2rem] sm:text-[3rem] md:text-[3.75rem] font-semibold leading-[1.1] tracking-tight text-zinc-900 mb-5 sm:mb-6">
              L'ingénierie digitale
              <br />
              <span className="text-zinc-400">au service de la restauration.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-500 max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed font-light">
              Apps natives, SaaS et systèmes de réservation
              haute performance pour votre établissement.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3 text-[14px] font-medium text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 active:scale-[0.97] transition-all"
              >
                Démarrer un projet
              </a>
              <a
                href="#portfolio"
                className="w-full sm:w-auto px-6 py-3 text-[14px] font-medium text-zinc-600 border border-zinc-200 rounded-xl hover:bg-zinc-50 active:scale-[0.97] transition-all"
              >
                Nos solutions
              </a>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20"
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center px-3 py-4 rounded-xl bg-zinc-50/80 border border-zinc-100">
                <div className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">{s.value}</div>
                <div className="text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ════════════════ PROCESSUS — BENTO ════════════════ */}
      <section id="processus" className="py-16 sm:py-24 md:py-32 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center sm:text-left max-w-xl mb-12 sm:mb-16">
              <p className="text-[11px] sm:text-[13px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-3 sm:mb-4">
                Processus
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
                De l'idée au lancement,
                <br />
                <span className="text-zinc-400">en toute sérénité.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-8 group hover:border-zinc-300 hover:shadow-sm transition-all duration-300 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-colors duration-300">
                        <Icon size={16} className="text-zinc-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[11px] font-medium text-zinc-300 uppercase tracking-widest">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-zinc-500 leading-relaxed mb-4">
                      {step.desc}
                    </p>
                    <span className="inline-block text-[11px] sm:text-[12px] font-medium text-zinc-400 border border-zinc-200 px-3 py-1 rounded-full">
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
      <section id="stack" className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center sm:text-left max-w-xl mb-12 sm:mb-16">
              <p className="text-[11px] sm:text-[13px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-3 sm:mb-4">
                Stack technique
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
                Technologies de pointe,
                <br />
                <span className="text-zinc-400">résultats concrets.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-white to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-white to-transparent" />

              <Marquee speed={35} pauseOnHover>
                {techStack.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 mx-4 sm:mx-6 group cursor-default">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-zinc-200 bg-white flex items-center justify-center group-hover:border-zinc-300 group-hover:shadow-sm transition-all">
                        <Icon size={22} color={tech.color} />
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-zinc-400 group-hover:text-zinc-600 transition-colors whitespace-nowrap">
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
      <section id="portfolio" className="py-16 sm:py-24 md:py-32 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center sm:text-left max-w-xl mb-12 sm:mb-16">
              <p className="text-[11px] sm:text-[13px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-3 sm:mb-4">
                Portfolio
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
                Nos réalisations,
                <br />
                <span className="text-zinc-400">bientôt ici.</span>
              </h2>
              <p className="text-[13px] sm:text-[15px] text-zinc-500 mt-3 sm:mt-4 leading-relaxed">
                Chaque projet est construit sur-mesure. Nos premières réalisations seront affichées très prochainement.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════ CONTACT ════════════════ */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center sm:text-left mb-10 sm:mb-12">
              <p className="text-[11px] sm:text-[13px] font-medium text-zinc-400 uppercase tracking-[0.15em] mb-3 sm:mb-4">
                Contact
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight mb-3 sm:mb-4">
                Parlons de votre projet.
              </h2>
              <p className="text-[13px] sm:text-[15px] text-zinc-500 leading-relaxed">
                Décrivez votre besoin. Nous revenons vers vous sous 48h
                avec une proposition sur-mesure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[12px] sm:text-[13px] font-medium text-zinc-700 mb-1.5">
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-[14px] border border-zinc-200 rounded-xl bg-white text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[12px] sm:text-[13px] font-medium text-zinc-700 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-[14px] border border-zinc-200 rounded-xl bg-white text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
                    placeholder="contact@restaurant.fr"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-[12px] sm:text-[13px] font-medium text-zinc-700 mb-1.5">
                  Type de service
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-2.5 text-[14px] border border-zinc-200 rounded-xl bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Sélectionnez un service...</option>
                  <option value="saas">SaaS de réservation</option>
                  <option value="app-native">Application Native</option>
                  <option value="site-web">Site Web</option>
                  <option value="automatisation">Automatisation</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[12px] sm:text-[13px] font-medium text-zinc-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-[14px] border border-zinc-200 rounded-xl bg-white text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all resize-none"
                  placeholder="Décrivez votre projet, vos objectifs..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full py-3 text-[14px] font-medium text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formState === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {formState === 'success' && <CheckCircle2 size={16} />}
                {formState === 'idle' && <Send size={16} />}
                {formState === 'loading' ? 'Envoi...' : formState === 'success' ? 'Envoyé !' : 'Envoyer'}
              </button>

              {formState === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[13px] text-emerald-600"
                >
                  Merci ! Nous vous recontacterons sous 48h.
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </section>


      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="py-8 sm:py-10 bg-zinc-50 border-t border-zinc-200/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-zinc-900 rounded flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">D</span>
            </div>
            <span className="text-[13px] font-medium text-zinc-900">
              Despa<span className="text-zinc-400">&</span>co
            </span>
          </div>

          <p className="text-[11px] sm:text-[12px] text-zinc-400 text-center">
            Fait avec rigueur · © {new Date().getFullYear()} Despa&co
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-[11px] sm:text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>


      {/* Scroll to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-5 right-5 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <ChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

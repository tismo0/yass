'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import {
  Menu, X, Send, ArrowRight, ArrowUpRight,
  MessageSquare, Layers, Code2, Rocket,
  CheckCircle2, Loader2, Zap,
  ChevronUp, MapPin, Building2,
  TrendingUp, Timer, Shield, Sparkles,
  Eye
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
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'Conception UI/UX exclusive, maquettes interactives et validation des parcours utilisateurs avec votre équipe.',
    detail: 'Maquettes UI/UX exclusives',
  },
  {
    num: '03',
    title: 'Engineering',
    desc: 'Développement robuste avec Next.js, React Native et des performances optimales pour les heures de pointe.',
    detail: 'Next.js, React Native, Performance',
  },
  {
    num: '04',
    title: 'Scalabilité',
    desc: 'Déploiement, formation de votre équipe, monitoring continu et maintenance proactive 24/7.',
    detail: 'Déploiement & Maintenance 24/7',
  },
];

const projects = [
  {
    id: 'bistrot',
    title: 'BistrotConnect',
    category: 'SaaS · Réservation',
    desc: 'Système de réservation en temps réel avec gestion intelligente des tables et confirmations automatiques.',
    image: '/projects/reservation.png',
    link: '#',
  },
  {
    id: 'gusto',
    title: 'GustoApp',
    category: 'App Native · iOS & Android',
    desc: 'Application de commande en ligne avec paiement intégré, suivi de livraison et programme fidélité.',
    image: '/projects/delivery.png',
    link: '#',
  },
  {
    id: 'menuflow',
    title: 'MenuFlow',
    category: 'SaaS · QR Code',
    desc: 'Gestion de menus dynamiques via QR Code. Mise à jour instantanée des plats, prix et disponibilités.',
    image: '/projects/dashboard.png',
    link: '#',
  },
  {
    id: 'vitrine',
    title: 'La Table Dorée',
    category: 'Site Web · Gastronomie',
    desc: 'Vitrine digitale avec menu interactif, galerie immersive et réservation intégrée pour un étoilé.',
    image: '/projects/vitrine.png',
    link: '#',
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
  { value: '50+', label: 'Projets' },
  { value: '98%', label: 'Satisfaction' },
  { value: '<48h', label: 'Réponse' },
  { value: '24/7', label: 'Support' },
];


/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════ */

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
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
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-200">

      {/* ════════════════ HEADER ════════════════ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-zinc-900 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-zinc-900">
              Despa&co
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-[13px] font-medium text-white bg-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Démarrer un projet
            </a>
          </nav>

          {/* Mobile */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900"
          >
            <Menu size={20} />
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
            className="fixed inset-0 z-[60] bg-white md:hidden"
          >
            <div className="flex flex-col h-full px-6 py-5">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[15px] tracking-tight">Despa&co</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-600">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col items-start justify-center flex-1 gap-8">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-3xl font-medium text-zinc-900 tracking-tight"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 px-6 py-3 bg-zinc-900 text-white text-lg font-medium rounded-lg"
                >
                  Démarrer un projet
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ════════════════ HERO ════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <DotPattern className="opacity-40 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-8">
              Agence digitale · Restauration
            </p>

            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-zinc-900 mb-6">
              L'ingénierie digitale
              <br />
              <span className="text-zinc-400">au service de la restauration.</span>
            </h1>

            <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Nous codons l'avenir de votre établissement. Apps natives, 
              SaaS et systèmes de réservation haute performance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3 text-[14px] font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Démarrer un projet
              </a>
              <a
                href="#portfolio"
                className="w-full sm:w-auto px-6 py-3 text-[14px] font-medium text-zinc-600 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                Nos solutions
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center gap-12 mt-20"
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-semibold text-zinc-900 tracking-tight">{s.value}</div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-zinc-200" />
      </section>


      {/* ════════════════ PROCESSUS — BENTO ════════════════ */}
      <section id="processus" className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-xl mb-16">
              <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-4">
                Processus
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
                De l'idée au lancement,
                <br />
                <span className="text-zinc-400">en toute sérénité.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white p-8 sm:p-10 group hover:bg-zinc-50/80 transition-colors h-full">
                  <span className="text-[11px] font-medium text-zinc-300 uppercase tracking-widest">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-semibold text-zinc-900 mt-3 mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-zinc-500 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <span className="text-[12px] font-medium text-zinc-400 border border-zinc-200 px-3 py-1 rounded-full">
                    {step.detail}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════ STACK — MARQUEE ════════════════ */}
      <section id="stack" className="py-24 sm:py-32 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-xl mb-16">
              <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-4">
                Stack technique
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
                Technologies de pointe,
                <br />
                <span className="text-zinc-400">résultats concrets.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent" />

              <Marquee speed={35} pauseOnHover>
                {techStack.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2.5 mx-6 group cursor-default">
                      <div className="w-14 h-14 rounded-xl border border-zinc-200 bg-white flex items-center justify-center group-hover:border-zinc-300 group-hover:shadow-sm transition-all">
                        <Icon size={24} color={tech.color} />
                      </div>
                      <span className="text-[11px] text-zinc-400 group-hover:text-zinc-600 transition-colors whitespace-nowrap">
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
      <section id="portfolio" className="py-24 sm:py-32 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="max-w-xl mb-16">
              <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-4">
                Portfolio
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
                Des projets qui font
                <br />
                <span className="text-zinc-400">la différence.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl border border-zinc-200 overflow-hidden hover:shadow-lg hover:shadow-zinc-100 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                    />
                    {/* Hover badge */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight size={14} className="text-zinc-600" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[16px] font-semibold text-zinc-900 tracking-tight">
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-[14px] text-zinc-500 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════ CONTACT ════════════════ */}
      <section id="contact" className="py-24 sm:py-32 border-t border-zinc-200">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="mb-12">
              <p className="text-[13px] font-medium text-zinc-400 uppercase tracking-widest mb-4">
                Contact
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight mb-4">
                Parlons de votre projet.
              </h2>
              <p className="text-[15px] text-zinc-500 leading-relaxed">
                Décrivez votre besoin. Nous revenons vers vous sous 48h 
                avec une proposition sur-mesure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-medium text-zinc-700 mb-1.5">
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-[14px] border border-zinc-200 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-medium text-zinc-700 mb-1.5">
                    Email du restaurant
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-[14px] border border-zinc-200 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
                    placeholder="contact@restaurant.fr"
                  />
                </div>
              </div>

              {/* Service type */}
              <div>
                <label htmlFor="service" className="block text-[13px] font-medium text-zinc-700 mb-1.5">
                  Type de service
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-2.5 text-[14px] border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all appearance-none cursor-pointer"
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
                <label htmlFor="message" className="block text-[13px] font-medium text-zinc-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-[14px] border border-zinc-200 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all resize-none"
                  placeholder="Décrivez votre projet, vos objectifs..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full py-3 text-[14px] font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formState === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {formState === 'success' && <CheckCircle2 size={16} />}
                {formState === 'idle' && <Send size={16} />}
                {formState === 'loading' ? 'Envoi...' : formState === 'success' ? 'Envoyé !' : 'Envoyer'}
              </button>

              {formState === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
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
      <footer className="py-10 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-zinc-900 rounded flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">D</span>
            </div>
            <span className="text-[13px] font-medium text-zinc-900">Despa&co</span>
          </div>

          <p className="text-[12px] text-zinc-400">
            Fait avec rigueur · © {new Date().getFullYear()} Despa&co
          </p>

          <div className="flex items-center gap-4">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-[12px] text-zinc-400 hover:text-zinc-600 transition-colors"
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
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-lg bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:shadow-md transition-all cursor-pointer"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

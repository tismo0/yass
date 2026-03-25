'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Globe, Code2, Smartphone,
  Layers, Rocket, CheckCircle2, Users, Zap
} from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiSupabase,
  SiNodedotjs, SiPostgresql, SiDocker, SiStripe
} from 'react-icons/si';

/* ── Reveal helper ── */
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

export default function AProposPage() {
  const services = [
    {
      icon: Code2,
      title: 'Sites Web Restaurant',
      desc: 'Sites vitrines premium pour restaurants, brasseries et établissements gastronomiques. Next.js, React, animations soignées et SEO intégré.',
    },
    {
      icon: Smartphone,
      title: 'Applications Natives',
      desc: 'Applications iOS et Android pour la commande à table, la réservation en ligne et la fidélisation client. React Native & Swift.',
    },
    {
      icon: Layers,
      title: 'SaaS & Dashboards',
      desc: 'Solutions SaaS de gestion pour restaurateurs : réservations, stocks, analytics, facturation. Supabase, PostgreSQL, temps réel.',
    },
    {
      icon: Zap,
      title: 'Automatisation',
      desc: 'Automatisation des processus métier : envoi de confirmations, rappels, synchronisation de stocks et intégrations API tierces.',
    },
  ];

  const techStack = [
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: SiSupabase, name: 'Supabase', color: '#3FCF8E' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiStripe, name: 'Stripe', color: '#635BFF' },
  ];

  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-200">

      {/* ── Back navigation ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
          <span className="text-[14px] font-semibold tracking-tight text-zinc-900">
            Despa<span className="text-zinc-400">&</span>co
          </span>
        </div>
      </nav>


      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.25em] mb-6">
              À propos
            </p>
            <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] font-semibold tracking-[-0.03em] leading-[1.05] mb-8">
              Agence digitale
              <br />
              spécialisée
              <br />
              <span className="text-zinc-400">restauration.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-2xl space-y-6 text-[16px] sm:text-[17px] text-zinc-500 leading-relaxed font-light">
              <p>
                <strong className="text-zinc-800 font-medium">Despa&co</strong> est une agence de développement
                web et mobile basée à <strong className="text-zinc-800 font-medium">Verviers</strong>, dans la
                province de <strong className="text-zinc-800 font-medium">Liège</strong>, en{' '}
                <strong className="text-zinc-800 font-medium">Belgique</strong>. Nous concevons des solutions
                digitales sur-mesure exclusivement pour les professionnels de la{' '}
                <strong className="text-zinc-800 font-medium">restauration</strong>.
              </p>
              <p>
                Que vous soyez un restaurant étoilé à Liège, une brasserie à Verviers, un traiteur
                à Bruxelles ou un réseau d'établissements en France — nous développons les outils
                numériques qui font la différence : <strong className="text-zinc-800 font-medium">sites web
                pour restaurants</strong>, <strong className="text-zinc-800 font-medium">applications de
                réservation et commande</strong>, <strong className="text-zinc-800 font-medium">dashboards
                de gestion SaaS</strong> et <strong className="text-zinc-800 font-medium">automatisations</strong>.
              </p>
              <p>
                Notre approche allie ingénierie de haut niveau (Next.js, React Native, Supabase, PostgreSQL)
                et un design éditorial minimaliste de luxe. Chaque projet est pensé pour offrir une
                expérience utilisateur irréprochable et un référencement naturel optimal.
              </p>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════ LOCALISATION ═══════════════════ */}
      <section className="py-16 sm:py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin size={20} className="text-zinc-400" />
                  <h2 className="text-[1.5rem] sm:text-[1.75rem] font-semibold tracking-tight">
                    Localisation
                  </h2>
                </div>
                <div className="space-y-4 text-[15px] text-zinc-500 font-light leading-relaxed">
                  <p>
                    Nous sommes installés à <strong className="text-zinc-700 font-medium">Verviers</strong> (code postal 4800),
                    au cœur de la province de <strong className="text-zinc-700 font-medium">Liège</strong>, en Wallonie.
                    Notre situation géographique nous permet d'intervenir rapidement dans toute la{' '}
                    <strong className="text-zinc-700 font-medium">Belgique</strong> :
                  </p>
                  <ul className="space-y-2 ml-1">
                    {[
                      'Liège et sa province',
                      'Bruxelles-Capitale',
                      'Namur, Charleroi, Mons',
                      'Eupen, Malmedy, Spa',
                      'Toute la Wallonie et Flandre',
                    ].map((loc, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[14px]">
                        <CheckCircle2 size={14} className="text-zinc-400 flex-shrink-0" />
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Globe size={20} className="text-zinc-400" />
                  <h2 className="text-[1.5rem] sm:text-[1.75rem] font-semibold tracking-tight">
                    International
                  </h2>
                </div>
                <div className="space-y-4 text-[15px] text-zinc-500 font-light leading-relaxed">
                  <p>
                    Nos projets sont menés intégralement à distance, ce qui nous permet
                    d'accompagner des restaurateurs partout dans la <strong className="text-zinc-700 font-medium">zone
                    francophone</strong> et au-delà :
                  </p>
                  <ul className="space-y-2 ml-1">
                    {[
                      'France (Paris, Lyon, Bordeaux, Marseille)',
                      'Luxembourg',
                      'Suisse romande (Genève, Lausanne)',
                      'Canada francophone (Montréal, Québec)',
                      'Afrique francophone',
                    ].map((loc, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[14px]">
                        <CheckCircle2 size={14} className="text-zinc-400 flex-shrink-0" />
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-[-0.02em] mb-4">
              Nos services
            </h2>
            <p className="text-[16px] text-zinc-400 font-light mb-14 max-w-xl">
              Tout ce dont un restaurateur a besoin pour digitaliser son établissement.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((srv, i) => {
              const Icon = srv.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="p-7 sm:p-8 rounded-3xl border border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-sm transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:bg-zinc-100 transition-colors">
                      <Icon size={22} className="text-zinc-500" />
                    </div>
                    <h3 className="text-[18px] font-semibold tracking-tight mb-3">{srv.title}</h3>
                    <p className="text-[14px] text-zinc-500 font-light leading-relaxed">{srv.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════ TECH STACK ═══════════════════ */}
      <section className="py-16 sm:py-24 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <h2 className="text-[1.5rem] sm:text-[1.75rem] font-semibold tracking-tight mb-10">
              Technologies utilisées
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-4">
              {techStack.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-zinc-100 hover:border-zinc-200 transition-colors"
                  >
                    <Icon size={18} color={tech.color} />
                    <span className="text-[13px] font-medium text-zinc-600">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════ STATS ═══════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { val: '100%', label: 'Projets livrés dans les délais', icon: Rocket },
                { val: '48h', label: 'Temps de réponse garanti', icon: Zap },
                { val: 'B2B', label: 'Accompagnement sur-mesure', icon: Users },
                { val: '🇧🇪', label: 'Basés à Verviers, Liège', icon: MapPin },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="p-6 sm:p-8 rounded-3xl border border-zinc-100 text-center">
                    <p className="text-[2.5rem] font-bold tracking-tight text-zinc-900 leading-none mb-3">
                      {stat.val}
                    </p>
                    <p className="text-[13px] text-zinc-500 font-light">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-20 sm:py-28 bg-zinc-950 text-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Reveal>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-[-0.02em] mb-5">
              Prêt à digitaliser
              <br />
              <span className="text-zinc-500">votre établissement ?</span>
            </h2>
            <p className="text-[16px] text-zinc-400 font-light mb-10 max-w-lg mx-auto">
              Contactez-nous pour un audit gratuit de votre présence digitale.
              Réponse garantie sous 48h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-8 py-3.5 text-[14px] font-medium text-black bg-white rounded-full hover:bg-zinc-200 active:scale-[0.97] transition-all"
              >
                Demander un devis gratuit →
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 text-[14px] font-medium text-zinc-400 border border-zinc-700 rounded-full hover:bg-zinc-900 hover:text-white active:scale-[0.97] transition-all"
              >
                Retour à l'accueil
              </Link>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="py-10 bg-white border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-semibold text-zinc-900 tracking-tight">
                Despa<span className="text-zinc-400">&</span>co
              </span>
              <span className="text-zinc-300">·</span>
              <span className="text-[12px] text-zinc-500 font-light">
                Agence digitale — Verviers, Liège (Belgique)
              </span>
            </div>
            <p className="text-[12px] text-zinc-400 font-medium">
              © {new Date().getFullYear()} Despa&co · Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

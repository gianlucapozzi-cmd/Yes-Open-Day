import { useState } from 'react'
import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  MapPinIcon,
  SparklesIcon,
  TagIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Footer } from '../components/Footer'
import { FeatureCard } from '../components/FeatureCard'
import { Hero } from '../components/Hero'
import { LeadForm, type SedeOption } from '../components/LeadForm'
import { ProgramTeaser } from '../components/ProgramTeaser'
import { Reviews } from '../components/Reviews'
import { Section } from '../components/Section'
import { SedeCard } from '../components/SedeCard'
import { StickyCTA } from '../components/StickyCTA'
import { fadeUp, stagger } from '../lib/motion'

const SEDE_OPTIONS: SedeOption[] = [
  {
    value: 'Melzo — 19 settembre',
    label: 'Melzo — 19 settembre',
  },
  {
    value: 'Melzo — 26 settembre',
    label: 'Melzo — 26 settembre',
  },
  {
    value: 'Lambrate — 19 settembre',
    label: 'Lambrate — 19 settembre',
  },
  {
    value: 'Lambrate — 26 settembre',
    label: 'Lambrate — 26 settembre',
  },
  {
    value: 'Pasteur — 18 settembre (17:00–20:00)',
    label: 'Pasteur — 18 settembre (17:00–20:00)',
  },
]

const SEDI = [
  {
    sede: 'YES! Melzo',
    date: '19 settembre',
    value: 'Melzo — 19 settembre',
  },
  {
    sede: 'YES! Melzo',
    date: '26 settembre',
    value: 'Melzo — 26 settembre',
  },
  {
    sede: 'YES! Milano Lambrate',
    date: '19 settembre',
    value: 'Lambrate — 19 settembre',
  },
  {
    sede: 'YES! Milano Lambrate',
    date: '26 settembre',
    value: 'Lambrate — 26 settembre',
  },
  {
    sede: 'YES! Milano Pasteur',
    date: '18 settembre',
    time: '17:00–20:00',
    value: 'Pasteur — 18 settembre (17:00–20:00)',
  },
] as const

const INFO_SEDI = [
  {
    sede: 'YES! Melzo',
    address: 'Via Cristoforo Colombo, 6/C, 20066 Melzo MI',
  },
  {
    sede: 'YES! Milano Lambrate',
    address: 'Via Giovanni Pacini, 39, 20131 Milano MI',
  },
  {
    sede: 'YES! Milano Pasteur',
    address: 'Via Marco Aurelio, 8, 20127 Milano MI',
  },
] as const

function scrollToForm() {
  document.getElementById('lead-form')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export function OpenDayPage() {
  const [selectedSede, setSelectedSede] = useState('')

  function prenota(sedeValue?: string) {
    if (sedeValue) setSelectedSede(sedeValue)
    scrollToForm()
  }

  return (
    <div className="bg-surface pb-20 md:pb-0">
      <Hero onCtaClick={() => prenota()} />

      <Section id="open-day" className="bg-surface" decor="section">
        <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">
          Durante l&apos;Open Day potrai…
        </h2>
        <motion.div
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <FeatureCard
            icon={AcademicCapIcon}
            title="Conoscere il nostro metodo"
            text="Scopri come lavoriamo in classe e cosa rende efficace il percorso YES!."
            tone="brand"
          />
          <FeatureCard
            icon={ChatBubbleLeftRightIcon}
            title="Confrontarti con i docenti"
            text="Parla con i nostri insegnanti e chiarisci dubbi su livelli, orari e obiettivi."
            tone="accent"
          />
          <FeatureCard
            icon={SparklesIcon}
            title="Partecipare a una lezione di prova gratuita"
            text="Prova il corso senza impegno e vivi in prima persona l’atmosfera YES!."
            tone="brand"
          />
        </motion.div>
        <div className="mt-8 flex justify-center">
          <motion.button
            type="button"
            onClick={() => prenota()}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-bold text-white shadow-[0_10px_24px_rgba(255,0,21,0.28)] transition hover:bg-brand-dark"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Prenota il tuo posto
          </motion.button>
        </div>
      </Section>

      <ProgramTeaser />

      <Section id="sedi" className="bg-brand/[0.05]" decor="section">
        <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">
          Scegli la sede più vicina a te
        </h2>
        <motion.div
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SEDI.map((item) => (
            <SedeCard
              key={item.value}
              sede={item.sede}
              date={item.date}
              time={'time' in item ? item.time : undefined}
              onPrenota={() => prenota(item.value)}
            />
          ))}
        </motion.div>
      </Section>

      <Section id="perche" className="bg-accent/[0.08]" decor="band">
        <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">
          Perché scegliere YES!
        </h2>
        <motion.div
          className="mt-8 grid gap-5 sm:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <FeatureCard
            icon={UsersIcon}
            title="Classi a numero ridotto"
            text="Gruppi piccoli per seguire ogni studente con attenzione e far praticare tutti."
            tone="accent"
          />
          <FeatureCard
            icon={GlobeAltIcon}
            title="Docenti qualificati, madrelingua e bilingue"
            text="Professionisti preparati che accompagnano adulti, bambini e ragazzi."
            tone="brand"
          />
          <FeatureCard
            icon={UserGroupIcon}
            title="Percorsi per bambini, adolescenti e adulti"
            text="Un’offerta pensata per ogni età, con obiettivi e metodi adatti al livello."
            tone="accent"
          />
          <FeatureCard
            icon={TagIcon}
            title="Promozione speciale del 20%"
            text="Iscriviti in occasione dell’Open Day e approfitta dello sconto dedicato."
            promo
          />
        </motion.div>
      </Section>

      <Reviews />

      <Section
        id="lead-form"
        className="scroll-mt-6 bg-gradient-to-b from-brand/[0.07] via-accent/[0.06] to-surface"
        decor="band"
      >
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Iscriviti all&apos;Open Day
          </p>
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
            Prenota il tuo posto
          </h2>
          <p className="mt-3 text-lg text-muted">
            Prenota il tuo posto: ti aspettiamo all&apos;Open Day.
          </p>
        </motion.div>
        <div className="relative mx-auto mt-8 max-w-2xl">
          <div
            className="absolute -inset-3 -z-10 rounded-[28px] bg-accent/10 blur-xl"
            aria-hidden="true"
          />
          <LeadForm
            className="border-accent/10 shadow-[0_16px_48px_rgba(20,20,27,0.1)]"
            sedeOptions={SEDE_OPTIONS}
            source="landing-open-day"
            campaign="open-day-settembre"
            showPercorso
            submitLabel="Prenota il tuo posto"
            selectedSede={selectedSede}
            onSedeChange={setSelectedSede}
          />
        </div>
      </Section>

      <Section id="info-open-day" className="bg-surface" decor="section">
        <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">
          Info Open Day
        </h2>
        <motion.ul
          className="mt-8 grid gap-5 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {INFO_SEDI.map((item) => (
            <motion.li
              key={item.sede}
              className="flex h-full gap-3 rounded-card border border-black/5 bg-surface p-6 shadow-card"
              variants={fadeUp}
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <MapPinIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink">{item.sede}</h3>
                <p className="mt-1 text-base text-muted">{item.address}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      <Footer showBrand />
      <StickyCTA label="Prenota il tuo posto" targetId="lead-form" />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  FaceSmileIcon,
  GlobeAltIcon,
  LanguageIcon,
  MapIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { ConsulenzaHero } from '../components/ConsulenzaHero'
import { FeatureCard } from '../components/FeatureCard'
import { Footer } from '../components/Footer'
import { LeadForm, type SedeOption } from '../components/LeadForm'
import { Reviews } from '../components/Reviews'
import { Section } from '../components/Section'
import { StickyCTA } from '../components/StickyCTA'
import { fadeUp, stagger } from '../lib/motion'

const SEDE_OPTIONS: SedeOption[] = [
  { value: 'Milano Lambrate', label: 'Milano Lambrate' },
  { value: 'Milano Pasteur', label: 'Milano Pasteur' },
  { value: 'Melzo', label: 'Melzo' },
]

const STEPS = [
  {
    icon: LanguageIcon,
    title: 'Scegli la lingua',
    text: 'Indicaci cosa vuoi imparare e per chi è il percorso.',
  },
  {
    icon: CalendarDaysIcon,
    title: 'Prenota un appuntamento',
    text: 'Fissa un appuntamento in sede: niente impegno, solo chiarezza.',
  },
  {
    icon: MapIcon,
    title: 'Scopri il percorso su misura',
    text: 'Costruiamo insieme il piano più adatto ai tuoi obiettivi.',
  },
] as const

function interesseFromCampaign(campaign: string | null) {
  if (campaign === 'kids') return 'Bambini e ragazzi'
  if (campaign === 'adulti') return 'Adulti'
  return ''
}

export function ConsulenzaPage() {
  const [searchParams] = useSearchParams()
  const campaignParam = searchParams.get('campaign')
  const campaign = campaignParam === 'kids' || campaignParam === 'adulti'
    ? campaignParam
    : 'consulenza'
  const [selectedSede, setSelectedSede] = useState('')
  const [interesse, setInteresse] = useState(() =>
    interesseFromCampaign(campaignParam),
  )

  useEffect(() => {
    setInteresse(interesseFromCampaign(campaignParam))
  }, [campaignParam])

  function scrollToForm() {
    document.getElementById('lead-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function goToForm(nextInteresse: string) {
    setInteresse(nextInteresse)
    scrollToForm()
  }

  return (
    <div className="bg-surface pb-20 md:pb-0">
      <ConsulenzaHero onCtaClick={scrollToForm} />

      <Section id="percorsi" className="bg-surface" decor="section">
        <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">
          Un percorso per ogni obiettivo
        </h2>
        <motion.div
          className="mt-8 grid gap-5 md:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.article
            className="flex flex-col rounded-card border border-accent/25 bg-accent/[0.12] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,94,164,0.18)] md:p-8"
            variants={fadeUp}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
              <BriefcaseIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-ink">Adulti</h3>
            <p className="text-base text-muted">
              Migliora per lavoro, viaggio o per il piacere di fare
              conversazione. Un metodo pratico, orientato a conversazione e
              interazione.
            </p>
            <button
              type="button"
              onClick={() => goToForm('Adulti')}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark sm:w-auto"
            >
              Prenota un appuntamento
            </button>
          </motion.article>
          <motion.article
            className="flex flex-col rounded-card border border-brand/25 bg-brand/[0.1] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(255,0,21,0.16)] md:p-8"
            variants={fadeUp}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
              <FaceSmileIcon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-ink">
              Bambini e ragazzi (3–18 anni)
            </h3>
            <p className="text-base text-muted">
              Imparare diventa un&apos;esperienza naturale, coinvolgente e
              divertente. Con attività pratiche, ascolto e conversazione,
              sviluppano sicurezza e spontaneità.
            </p>
            <button
              type="button"
              onClick={() => goToForm('Bambini e ragazzi')}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark sm:w-auto"
            >
              Prenota un appuntamento
            </button>
          </motion.article>
        </motion.div>
      </Section>

      <Section id="perche" className="bg-brand/[0.05]" decor="section">
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
            icon={ChatBubbleLeftRightIcon}
            title="Metodo pratico e interattivo"
            text="Orientato a conversazione e interazione, per parlarti con sicurezza nella vita reale."
            tone="accent"
          />
          <FeatureCard
            icon={AcademicCapIcon}
            title="Corsi dai 3 ai 18 anni + percorsi per adulti"
            text="Un’offerta completa per famiglie e adulti, con obiettivi e metodi adatti a ogni età."
            tone="brand"
          />
        </motion.div>
      </Section>

      <Section id="come-funziona" className="bg-accent/[0.08]" decor="band">
        <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">
          Come funziona
        </h2>
        <motion.ol
          className="mt-8 grid gap-5 md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <motion.li
                key={step.title}
                className="relative rounded-card border border-black/5 bg-surface p-6 shadow-card"
                variants={fadeUp}
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-base text-muted">{step.text}</p>
              </motion.li>
            )
          })}
        </motion.ol>
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
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
            Prenota un appuntamento
          </h2>
          <p className="mt-3 text-lg text-muted">
            Lascia il tuo contatto: ti richiamiamo per costruire insieme il
            percorso più adatto.
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
            source="landing-consulenza"
            campaign={campaign}
            showInteresse
            defaultInteresse={interesse}
            submitLabel="Prenota un appuntamento"
            selectedSede={selectedSede}
            onSedeChange={setSelectedSede}
          />
        </div>
      </Section>

      <Footer />
      <StickyCTA label="Prenota un appuntamento" targetId="lead-form" />
    </div>
  )
}

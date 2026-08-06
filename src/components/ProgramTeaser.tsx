import type { ComponentType, SVGProps } from 'react'
import {
  BriefcaseIcon,
  FaceSmileIcon,
  LanguageIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'
import { Section } from './Section'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

const FASCE: {
  icon: IconComponent
  title: string
  detail: string
  tone: 'brand' | 'accent'
}[] = [
  {
    icon: FaceSmileIcon,
    title: 'Early Years',
    detail: '3–5 anni',
    tone: 'brand',
  },
  {
    icon: PuzzlePieceIcon,
    title: 'Primary',
    detail: '6–11 anni',
    tone: 'accent',
  },
  {
    icon: UserGroupIcon,
    title: 'Junior & Teens',
    detail: '11–18 anni',
    tone: 'brand',
  },
  {
    icon: BriefcaseIcon,
    title: 'Adulti',
    detail: 'Tutti i livelli, A1–C1',
    tone: 'accent',
  },
  {
    icon: LanguageIcon,
    title: 'Altre lingue',
    detail: 'Spagnolo, francese, tedesco, italiano per stranieri',
    tone: 'brand',
  },
]

type ProgramTeaserProps = {
  onCtaClick: () => void
}

export function ProgramTeaser({ onCtaClick }: ProgramTeaserProps) {
  return (
    <Section id="programma" className="bg-accent/[0.08]" decor="band">
      <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">
        Un programma per ogni età
      </h2>

      <motion.ul
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {FASCE.map((fascia) => {
          const Icon = fascia.icon
          const iconWrap =
            fascia.tone === 'accent'
              ? 'bg-accent/10 text-accent'
              : 'bg-brand/10 text-brand'

          return (
            <motion.li
              key={fascia.title}
              className="flex h-full flex-col rounded-card border border-black/5 bg-surface p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(20,20,27,0.12)]"
              variants={fadeUp}
            >
              <span
                className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${iconWrap}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-bold text-ink">{fascia.title}</h3>
              <p className="mt-1 text-sm text-muted">{fascia.detail}</p>
            </motion.li>
          )
        })}
      </motion.ul>

      <motion.div
        className="mx-auto mt-10 max-w-2xl text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p className="text-base leading-relaxed text-muted md:text-lg">
          Ogni sede ha il suo programma dettagliato con orari per fascia
          d&apos;età. Lascia il tuo contatto e ti inviamo il programma completo
          della sede che preferisci.
        </p>
        <motion.button
          type="button"
          onClick={onCtaClick}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-bold text-white shadow-[0_10px_24px_rgba(255,0,21,0.28)] transition hover:bg-brand-dark"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Ricevi il programma completo
        </motion.button>
      </motion.div>
    </Section>
  )
}

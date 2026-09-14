import { useId, useState, type ComponentType, type SVGProps } from 'react'
import {
  BriefcaseIcon,
  CalendarDaysIcon,
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
    title: 'Kids',
    detail: '3–5 anni',
    tone: 'brand',
  },
  {
    icon: PuzzlePieceIcon,
    title: 'Children',
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

type ScheduleRow = {
  time: string
  title: string
  bookingRequired?: boolean
}

type ScheduleGroup = {
  heading: string
  note?: string
  rows: ScheduleRow[]
}

type SedeProgram = {
  id: string
  label: string
  subtitle: string
  groups: ScheduleGroup[]
}

const MELZO_ADULTI: ScheduleGroup = {
  heading: 'Adulti',
  note: 'Trial Class',
  rows: [
    { time: '14:00–14:30', title: 'Beginner (A1–A2)' },
    { time: '15:00–15:30', title: 'Intermediate (B1)' },
    { time: '16:00–16:30', title: 'Advanced (B2/C1)' },
  ],
}

const MELZO_CONSULENZE: ScheduleGroup = {
  heading: 'Consulenze didattiche',
  note: 'Su prenotazione',
  rows: [
    {
      time: '14:00–16:30',
      title:
        'Inglese e altre lingue (spagnolo, francese, tedesco, italiano per stranieri)',
      bookingRequired: true,
    },
  ],
}

const MELZO_BAMBINI_BASE: ScheduleRow[] = [
  { time: '9:45–10:15', title: 'Early Years Kids (3–5 anni)' },
  {
    time: '10:15–10:45',
    title: 'Children-Primary (6–7 anni, 1ª–2ª elementare)',
  },
  {
    time: '11:00–11:30',
    title: 'Children-Primary (8–11 anni, 3ª–5ª elementare)',
  },
  {
    time: '11:45–12:15',
    title: 'Junior-Lower Secondary (11–14 anni, scuola media)',
  },
  {
    time: '12:30–13:00',
    title: 'Teens (15–18 anni, scuola superiore)',
  },
]

const PROGRAMS: SedeProgram[] = [
  {
    id: 'melzo-19',
    label: 'Melzo 19',
    subtitle: '19 Settembre · 9:30–16:30',
    groups: [
      {
        heading: 'Bambini e Ragazzi',
        note: 'Trial Lesson + Course Presentation per i genitori',
        rows: MELZO_BAMBINI_BASE,
      },
      MELZO_ADULTI,
      MELZO_CONSULENZE,
    ],
  },
  {
    id: 'melzo-26',
    label: 'Melzo 26',
    subtitle: '26 Settembre · 9:30–16:30',
    groups: [
      {
        heading: 'Bambini e Ragazzi',
        note: 'Trial Lesson + Course Presentation per i genitori',
        rows: [
          ...MELZO_BAMBINI_BASE,
          { time: '14:30–15:00', title: 'Early Years Kids (3–5 anni)' },
          { time: '15:30–16:00', title: 'Junior e Teens (14–17 anni)' },
        ],
      },
      MELZO_ADULTI,
      MELZO_CONSULENZE,
    ],
  },
  {
    id: 'lambrate',
    label: 'Lambrate',
    subtitle: '19 e 26 Settembre · 9:30–16:30',
    groups: [
      {
        heading: 'Young Learners (3–18 anni)',
        rows: [
          { time: '10:30–11:00', title: 'Early Years Kids (3–5 anni)' },
          { time: '11:00–11:30', title: 'Children-Primary 1-2 (6–7 anni)' },
          { time: '11:30–12:00', title: 'Children-Primary 3-4-5 (8–11 anni)' },
          { time: '12:00–12:30', title: 'Junior-Lower Secondary (11–14 anni)' },
          { time: '12:00–12:30', title: 'Teens (15–18 anni)' },
        ],
      },
      {
        heading: 'Adulti — General English',
        rows: [
          { time: '13:00–13:30', title: 'Elementary (A1–A2)' },
          { time: '14:00–14:40', title: 'Intermediate (B1–B2)' },
          { time: '15:00–15:30', title: 'Advanced (C1)' },
        ],
      },
      {
        heading: 'Other Languages',
        rows: [
          { time: '13:00–13:30', title: 'Spanish (Intro to Spanish)' },
          { time: '13:30–14:00', title: 'French' },
          {
            time: '14:30–15:00',
            title:
              'Japanese (Intro to Japanese: sistemi di scrittura, struttura base della frase)',
          },
        ],
      },
    ],
  },
  {
    id: 'pasteur',
    label: 'Pasteur',
    subtitle: 'Venerdì 18 Settembre · 17:00–20:30',
    groups: [
      {
        heading: 'Bambini e Ragazzi',
        note: 'Trial Lesson + Course Presentation per i genitori',
        rows: [
          { time: '17:00–17:30', title: 'Early Years Kids (3–5 anni)' },
          { time: '17:30–18:00', title: 'Children-Primary (6–7 anni)' },
          { time: '18:00–18:30', title: 'Children-Primary (8–11 anni)' },
          { time: '18:00–18:30', title: 'Teens (15–18 anni)' },
          { time: '18:30–19:00', title: 'Junior-Lower Secondary (11–14 anni)' },
        ],
      },
      {
        heading: 'Adulti',
        note: 'Trial Class',
        rows: [
          { time: '18:30–19:00', title: 'Beginner (A1–A2)' },
          { time: '19:00–19:30', title: 'Intermediate (B1)' },
          { time: '19:30–20:00', title: 'Advanced (B2/C1)' },
        ],
      },
      {
        heading: 'Consulenze didattiche',
        note: 'Su prenotazione',
        rows: [
          {
            time: '17:00–20:30',
            title:
              'Inglese e altre lingue (spagnolo, francese, tedesco, italiano per stranieri)',
            bookingRequired: true,
          },
        ],
      },
    ],
  },
]

function ProgramPanel({ program }: { program: SedeProgram }) {
  return (
    <div>
      <div className="mb-6 border-b border-black/5 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
          YES! {program.label}
        </p>
        <h3 className="mt-1 text-lg font-extrabold text-ink md:text-xl">
          {program.subtitle}
        </h3>
      </div>
      <div className="space-y-7">
        {program.groups.map((group) => (
          <div key={group.heading}>
            <h4 className="text-base font-bold text-accent">{group.heading}</h4>
            {group.note ? (
              <p className="mt-1 text-sm text-muted">{group.note}</p>
            ) : null}
            <ul className="mt-3 space-y-2.5">
              {group.rows.map((row) => (
                <li
                  key={`${row.time}-${row.title}`}
                  className={`flex flex-col gap-2 rounded-2xl px-3 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-4 ${
                    row.bookingRequired
                      ? 'border border-accent/20 bg-accent/[0.08]'
                      : 'border border-black/5 bg-surface-alt/70'
                  }`}
                >
                  <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                    {row.time}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-ink">{row.title}</p>
                    {row.bookingRequired ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent">
                        <CalendarDaysIcon
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                        Su prenotazione
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProgramTeaser() {
  const baseId = useId()
  const [activeId, setActiveId] = useState(PROGRAMS[0].id)
  const active = PROGRAMS.find((p) => p.id === activeId) ?? PROGRAMS[0]

  return (
    <Section id="programma" className="bg-accent/[0.08]" decor="band">
      <h2 className="text-center text-3xl font-extrabold text-ink md:text-4xl">
        Un programma per ogni età ed esigenze
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

      <div id="programma-open-day" className="mx-auto mt-12 max-w-3xl scroll-mt-6">
        <h3 className="text-center text-2xl font-extrabold text-ink md:text-3xl">
          Programma Open Day
        </h3>

        <div
          className="mt-6 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Sede del programma Open Day"
        >
          {PROGRAMS.map((program) => {
            const selected = program.id === activeId
            return (
              <button
                key={program.id}
                id={`${baseId}-tab-${program.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${program.id}`}
                onClick={() => setActiveId(program.id)}
                className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  selected
                    ? 'bg-brand text-white shadow-[0_8px_20px_rgba(255,0,21,0.22)]'
                    : 'bg-surface text-ink hover:bg-brand/10'
                }`}
              >
                {program.label}
              </button>
            )
          })}
        </div>

        <div
          id={`${baseId}-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          className="mt-6 rounded-card border border-black/5 bg-surface p-5 shadow-card sm:p-7"
        >
          <ProgramPanel program={active} />
        </div>
      </div>
    </Section>
  )
}

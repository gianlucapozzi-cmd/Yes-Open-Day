import { MapPinIcon } from '@heroicons/react/24/outline'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../lib/motion'

type SedeCardProps = {
  sede: string
  date: string
  time?: string
  onPrenota?: () => void
}

export function SedeCard({ sede, date, time, onPrenota }: SedeCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className="group flex h-full flex-col rounded-card border border-black/5 bg-surface p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-[0_14px_40px_rgba(20,20,27,0.12)]"
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="mb-4 flex flex-1 items-start gap-3">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
          <MapPinIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-ink">{sede}</h3>
          <p className="mt-1 text-base text-muted">{date}</p>
          {time ? <p className="mt-1 text-sm font-medium text-accent">{time}</p> : null}
        </div>
      </div>
      {onPrenota ? (
        <motion.button
          type="button"
          onClick={onPrenota}
          className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(255,0,21,0.22)] transition hover:bg-brand-dark"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Prenota
        </motion.button>
      ) : null}
    </motion.article>
  )
}

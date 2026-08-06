import type { ComponentType, SVGProps } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../lib/motion'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

type FeatureCardProps = {
  icon: IconComponent
  title: string
  text: string
  promo?: boolean
  /** Tinta icona: brand (rosso) o accent (blu) */
  tone?: 'brand' | 'accent'
}

export function FeatureCard({
  icon: Icon,
  title,
  text,
  promo = false,
  tone = 'brand',
}: FeatureCardProps) {
  const reduceMotion = useReducedMotion()
  const iconWrap = promo
    ? 'bg-promo text-ink'
    : tone === 'accent'
      ? 'bg-accent/10 text-accent'
      : 'bg-brand/10 text-brand'

  return (
    <motion.article
      className={`group h-full rounded-card border p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(20,20,27,0.12)] ${
        promo
          ? 'border-promo/40 bg-promo/15'
          : 'border-black/5 bg-surface'
      }`}
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full transition group-hover:scale-105 ${iconWrap}`}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-ink">{title}</h3>
      <p className="text-base font-normal text-muted">{text}</p>
    </motion.article>
  )
}

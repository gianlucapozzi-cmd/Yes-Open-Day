import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '../lib/motion'
import { BrandDecor } from './BrandDecor'

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
  /** Mostra forme decorative brand in sottofondo */
  decor?: 'section' | 'band' | false
}

export function Section({
  id,
  className = '',
  children,
  decor = false,
}: SectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={`relative isolate overflow-hidden py-12 md:py-16 ${className}`.trim()}
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      {decor ? <BrandDecor variant={decor} /> : null}
      <div className="relative mx-auto w-full max-w-[1120px] px-4 sm:px-6">
        {children}
      </div>
    </motion.section>
  )
}

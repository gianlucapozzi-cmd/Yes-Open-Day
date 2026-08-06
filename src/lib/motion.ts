import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const stagger: Variants = {
  show: { transition: { staggerChildren: 0.12 } },
}

export const viewportOnce = {
  once: true,
  amount: 0.2,
} as const

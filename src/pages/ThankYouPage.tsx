import { useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { motion, useReducedMotion } from 'framer-motion'
import { Navigate } from 'react-router-dom'
import { BrandDecor } from '../components/BrandDecor'
import { Footer } from '../components/Footer'
import { fadeUp, stagger } from '../lib/motion'

export function ThankYouPage() {
  const reduceMotion = useReducedMotion()
  const [allowed, setAllowed] = useState<boolean | null>(null)

  useEffect(() => {
    setAllowed(sessionStorage.getItem('yes-openday-lead-submitted') === '1')
  }, [])

  if (allowed === null) {
    return <div className="min-h-dvh bg-surface" aria-hidden="true" />
  }

  if (!allowed) {
    return <Navigate to="/open-day" replace />
  }

  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <main className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
        <BrandDecor variant="hero" />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center"
          variants={stagger}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          <motion.img
            src="/logo-yes.svg?v=13"
            alt="YES! Your English School"
            className="mb-8 h-16 w-auto sm:h-20"
            variants={fadeUp}
          />

          <motion.div
            className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent"
            variants={fadeUp}
          >
            <CheckCircleIcon className="h-9 w-9" aria-hidden="true" />
          </motion.div>

          <motion.h1
            className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl"
            variants={fadeUp}
          >
            Grazie!
          </motion.h1>

          <motion.p
            className="mt-4 max-w-md text-base text-muted sm:text-lg"
            variants={fadeUp}
          >
            Abbiamo ricevuto la tua prenotazione all&apos;Open Day. Ti
            ricontatteremo a breve.
          </motion.p>
        </motion.div>
      </main>

      <Footer showBrand />
    </div>
  )
}

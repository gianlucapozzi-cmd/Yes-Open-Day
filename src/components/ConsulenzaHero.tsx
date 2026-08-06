import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'
import { BrandDecor } from './BrandDecor'

type ConsulenzaHeroProps = {
  onCtaClick: () => void
}

export function ConsulenzaHero({ onCtaClick }: ConsulenzaHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <header className="relative isolate overflow-hidden bg-surface">
      <BrandDecor variant="hero" />

      <div className="relative mx-auto flex min-h-[520px] w-full max-w-[1200px] flex-col items-center px-4 pb-0 pt-4 sm:min-h-[580px] sm:px-6 md:min-h-[640px] md:pt-6">
        {/* Coppia — sinistra */}
        <img
          src="/consulenza-coppia.png?v=2"
          alt="Coppia di adulti in percorso linguistico YES!"
          className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-[48%] max-h-[340px] w-auto object-contain drop-shadow-[0_14px_30px_rgba(20,20,27,0.14)] sm:left-[-2%] sm:block md:left-0 md:h-[55%] lg:left-[1%]"
        />

        {/* Bambina — destra, più piccola */}
        <img
          src="/consulenza-bimba.png"
          alt="Bambina che impara le lingue con YES!"
          className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-[48%] max-h-[320px] w-auto object-contain drop-shadow-[0_14px_30px_rgba(20,20,27,0.14)] sm:right-[2%] sm:block md:right-[4%] md:h-[55%] lg:right-[6%]"
        />

        <motion.div
          className="relative z-20 mx-auto flex w-full max-w-xl flex-col items-center pb-10 pt-2 text-center sm:pb-14 md:pb-16"
          variants={stagger}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          <motion.img
            src="/logo-yes.png?v=3"
            alt="YES! Your English School"
            className="mb-4 h-16 w-auto sm:h-20"
            variants={fadeUp}
          />

          <motion.p
            className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent"
            variants={fadeUp}
          >
            Scegli il tuo percorso
          </motion.p>

          <motion.h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-[2.75rem]"
            variants={fadeUp}
          >
            Impara una nuova lingua
            <span className="mt-1 block">con YES!</span>
            <span className="mt-1 block text-lg font-bold tracking-normal text-ink sm:text-xl md:text-2xl">
              Your English School
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-md text-base text-muted sm:text-lg"
            variants={fadeUp}
          >
            Corsi per adulti, bambini e ragazzi. Scegli la lingua e prenota un
            appuntamento.
          </motion.p>

          <motion.div className="mt-7" variants={fadeUp}>
            <motion.button
              type="button"
              onClick={onCtaClick}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-bold text-white shadow-[0_10px_24px_rgba(255,0,21,0.28)] transition hover:bg-brand-dark"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Prenota un appuntamento
            </motion.button>
            <p className="mt-3 text-sm font-medium text-muted">
              Per te o per tuo figlio · Senza impegno
            </p>
          </motion.div>
        </motion.div>

        {/* Mobile: coppia sinistra, bambina destra più piccola */}
        <div className="relative z-10 flex w-full items-end justify-between gap-2 sm:hidden">
          <img
            src="/consulenza-coppia.png?v=2"
            alt=""
            aria-hidden="true"
            className="h-36 w-auto max-w-[48%] object-contain object-bottom drop-shadow-lg"
          />
          <img
            src="/consulenza-bimba.png"
            alt=""
            aria-hidden="true"
            className="h-36 w-auto max-w-[36%] object-contain object-bottom drop-shadow-lg"
          />
        </div>
      </div>
    </header>
  )
}

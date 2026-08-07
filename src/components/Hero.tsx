import { SparklesIcon } from '@heroicons/react/24/solid'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'
import { BrandDecor } from './BrandDecor'

type HeroProps = {
  onCtaClick: () => void
}

export function Hero({ onCtaClick }: HeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <header className="relative isolate overflow-hidden bg-accent bg-gradient-to-b from-[#0070c0] via-accent to-[#004a82]">
      <BrandDecor variant="hero-blue" />

      {/* Scene: figure laterali + contenuto centrale */}
      <div className="relative mx-auto flex min-h-[560px] w-full max-w-[1200px] flex-col items-center px-4 pb-0 pt-3 sm:min-h-[620px] sm:px-6 md:min-h-[680px] md:pt-4">
        {/* Bambini — colonna sinistra */}
        <img
          src="/hero-boy.png?v=2"
          alt="Bambini entusiasti all’Open Day YES!"
          className="pointer-events-none absolute bottom-0 left-[-8%] z-10 hidden h-[58%] max-h-[430px] w-auto max-w-[40%] object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.28)] sm:left-[-10%] sm:block md:left-[-8%] md:h-[66%] md:max-h-[490px] lg:left-[-6%] lg:max-w-[38%]"
        />

        {/* Donna — colonna destra */}
        <img
          src="/hero-woman.png"
          alt="Insegnante YES! Your English School"
          className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-[78%] max-h-[560px] w-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.28)] sm:right-[-1%] sm:block md:right-0 md:h-[92%] lg:right-[2%]"
        />

        {/* Contenuto testuale centrato */}
        <motion.div
          className="relative z-20 mx-auto flex w-full max-w-xl flex-col items-center pb-10 pt-2 text-center sm:pb-14 md:pb-16"
          variants={stagger}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
        >
          <motion.img
            src="/logo-yes.svg?v=13"
            alt="YES! Your English School"
            className="mb-3 h-14 w-auto drop-shadow-sm sm:mb-4 sm:h-16"
            variants={fadeUp}
          />

          <motion.p
            className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/85"
            variants={fadeUp}
          >
            Settembre · Corsi di lingue
          </motion.p>

          <motion.h1
            className="font-display text-5xl leading-[0.95] text-white drop-shadow-sm sm:text-6xl md:text-7xl lg:text-8xl"
            variants={fadeUp}
          >
            OPEN DAY
          </motion.h1>

          <motion.p
            className="mt-3 text-xl font-extrabold tracking-tight text-white sm:text-2xl"
            variants={fadeUp}
          >
            YES! Your English School
          </motion.p>

          <motion.p
            className="mt-3 max-w-md text-base text-white/90 sm:text-lg"
            variants={fadeUp}
          >
            Vuoi trovare il corso di lingua giusto per te o per tuo figlio? Vieni
            a conoscerci.
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
            variants={fadeUp}
          >
            <span className="inline-flex min-h-9 items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-accent shadow-sm">
              Melzo &amp; Lambrate · 19 e 26 settembre
            </span>
            <span className="inline-flex min-h-9 items-center rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-accent shadow-sm">
              Pasteur · 18 settembre, 17:00–20:00
            </span>
          </motion.div>

          <motion.div className="mt-5" variants={fadeUp}>
            <motion.div
              className="relative inline-flex max-w-full items-center gap-3 rounded-2xl bg-promo px-5 py-3.5 text-ink shadow-[0_10px_28px_rgba(255,199,44,0.4)] ring-2 ring-white/30"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.025, 1],
                      boxShadow: [
                        '0 10px 28px rgba(255,199,44,0.35)',
                        '0 14px 34px rgba(255,199,44,0.55)',
                        '0 10px 28px rgba(255,199,44,0.35)',
                      ],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/10">
                <SparklesIcon className="h-5 w-5 text-ink" aria-hidden="true" />
              </span>
              <div className="text-left leading-tight">
                <p className="text-[11px] font-bold uppercase tracking-wide text-ink/70">
                  Promozione speciale
                </p>
                <p className="text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">
                  -20%
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="mt-7" variants={fadeUp}>
            <motion.button
              type="button"
              onClick={onCtaClick}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-bold text-white shadow-[0_10px_28px_rgba(0,0,0,0.25)] transition hover:bg-brand-dark"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Prenota il tuo posto
            </motion.button>
            <p className="mt-3 text-sm font-medium text-white/85">
              Lezione di prova gratuita · Posti limitati
            </p>
          </motion.div>
        </motion.div>

        {/* Figure mobile: sotto il testo, ancora ai lati */}
        <div className="relative z-10 flex w-full items-end justify-between gap-2 sm:hidden">
          <img
            src="/hero-boy.png?v=2"
            alt=""
            aria-hidden="true"
            className="h-44 w-auto max-w-[52%] object-contain object-bottom drop-shadow-lg"
          />
          <img
            src="/hero-woman.png"
            alt=""
            aria-hidden="true"
            className="h-56 w-auto max-w-[44%] object-contain object-bottom drop-shadow-lg"
          />
        </div>
      </div>
    </header>
  )
}

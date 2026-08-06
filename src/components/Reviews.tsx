import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'
import { Section } from './Section'

const REVIEWS = [
  {
    name: 'Cami',
    text: 'Mi ero iscritta quest’estate alla scuola per affrontare l’esame di recupero di inglese e ho lavorato con l’insegnante Anelda, che oltre ad essere una persona molto disponibile e gentile mi ha reso lo studio della letteratura inglese più semplice, divertente e affascinante. È stata un’esperienza bellissima e sono rimasta molto contenta di aver scelto questa scuola. Voglio ringraziare in particolare Silvia che mi ha supportato in questa esperienza.',
  },
  {
    name: 'Sara Red',
    text: 'Struttura bellissima, addobbata per Natale con albero e luci che illuminano la scuola, insegnanti super competenti e certificati con metodo di insegnamento nuovo e efficace. Io e tutta la mia famiglia siamo soddisfatti al massimo!',
  },
  {
    name: 'Francesca Piredda',
    text: 'Molto soddisfatti della esperienza con il Summer Camp che si è concluso proprio oggi, nella sede di Lambrate. Attività interessanti e molto varie e persone davvero accoglienti. Il mio bambino ha partecipato ogni giorno con grande entusiasmo! THANK YOU!',
  },
  {
    name: 'Silvia C',
    text: "Quest'anno ho partecipato ad un corso di gruppo di livello B2 in questa scuola. L'insegnante Anelda è stata fantastica ed è riuscita sempre a rendere le lezioni interessanti e coinvolgenti, bilanciando bene le parti di grammatica e quelle di conversazione. Sono rimasta molto soddisfatta.",
  },
  {
    name: 'Giorgio Di Pierno',
    text: 'Lo staff della YES school è molto gentile e professionale. Le loro proposte per i corsi di lingue sono molto valide.',
  },
  {
    name: 'brecri 1',
    text: "Staff gentile, professionale e giovane! Ho iscritto il piccolo ad inglese (corso annuale) e il grande a tedesco (lezioni private). Entrambi hanno seguito con interesse e con serenità, implementando velocemente le loro basi scolastiche. Grazie",
  },
] as const

function Stars({ size = 18 }: { size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label="5 stelle su 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="#FBBC04"
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7 12.9 19.6C14.7 15.1 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-4.6 6.6-8.5 7.5l6.3 5.3C36.8 38.3 44 33 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  )
}

export function Reviews() {
  const reduceMotion = useReducedMotion()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const el = scrollerRef.current
    if (!el) return

    const id = window.setInterval(() => {
      const card = el.querySelector<HTMLElement>('[data-review-card]')
      if (!card) return
      const step = card.offsetWidth + 20
      const maxScroll = el.scrollWidth - el.clientWidth
      const next = el.scrollLeft + step
      if (next >= maxScroll - 8) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
        setActive(0)
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' })
        setActive((prev) => (prev + 1) % REVIEWS.length)
      }
    }, 6000)

    return () => window.clearInterval(id)
  }, [reduceMotion])

  function scrollToIndex(index: number) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelectorAll<HTMLElement>('[data-review-card]')[index]
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    setActive(index)
  }

  return (
    <Section id="recensioni" className="bg-surface" decor="section">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
          Dicono di noi
        </h2>
        <motion.div
          className="mt-6 inline-flex flex-col items-center gap-2 rounded-card border border-black/5 bg-surface-alt px-6 py-5 shadow-card"
          variants={fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-lg font-extrabold uppercase tracking-wide text-ink">
            Eccellente
          </p>
          <Stars size={22} />
          <p className="text-sm text-muted">
            In base a <strong className="font-semibold text-ink">80 recensioni</strong>
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm font-medium text-muted">
            <GoogleMark />
            <span>Pubblicato su Google</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative mt-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Recensioni Google"
        >
          {REVIEWS.map((review) => (
            <motion.article
              key={review.name}
              data-review-card
              className="w-[min(100%,320px)] shrink-0 snap-start rounded-card border border-black/5 bg-surface p-6 shadow-card sm:w-[340px]"
              variants={fadeUp}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent"
                    aria-hidden="true"
                  >
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-ink">{review.name}</p>
                    <p className="text-xs text-muted">Pubblicato su Google</p>
                  </div>
                </div>
                <GoogleMark />
              </div>
              <Stars size={16} />
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {review.text}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {REVIEWS.map((review, index) => (
            <button
              key={review.name}
              type="button"
              aria-label={`Vai alla recensione di ${review.name}`}
              aria-current={active === index}
              onClick={() => scrollToIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                active === index ? 'bg-brand' : 'bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

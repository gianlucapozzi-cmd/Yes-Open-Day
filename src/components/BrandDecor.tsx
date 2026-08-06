type BrandDecorProps = {
  variant?: 'hero' | 'hero-blue' | 'section' | 'band'
  className?: string
}

/** Motivo speech-bubble YES + blob sfocati (solo decorativo). */
export function BrandDecor({
  variant = 'section',
  className = '',
}: BrandDecorProps) {
  const isHero = variant === 'hero'
  const isHeroBlue = variant === 'hero-blue'
  const isBand = variant === 'band'

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden="true"
    >
      {/* Blob sfocati per profondità */}
      <div
        className={`absolute rounded-full blur-3xl ${
          isHeroBlue
            ? '-left-24 top-8 h-80 w-80 bg-white/15 md:h-[26rem] md:w-[26rem]'
            : isHero
              ? '-left-24 top-10 h-72 w-72 bg-brand/15 md:h-96 md:w-96'
              : isBand
                ? '-left-16 top-0 h-64 w-64 bg-brand/20'
                : '-left-20 top-8 h-56 w-56 bg-brand/[0.07]'
        }`}
      />
      <div
        className={`absolute rounded-full blur-3xl ${
          isHeroBlue
            ? '-right-28 bottom-0 h-96 w-96 bg-black/20 md:h-[30rem] md:w-[30rem]'
            : isHero
              ? '-right-20 bottom-8 h-80 w-80 bg-accent/20 md:h-[28rem] md:w-[28rem]'
              : isBand
                ? '-right-12 bottom-0 h-72 w-72 bg-accent/25'
                : 'right-[-4rem] bottom-0 h-60 w-60 bg-accent/[0.08]'
        }`}
      />
      {isHeroBlue ? (
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl md:h-80 md:w-80" />
      ) : null}

      {/* Speech bubble A */}
      <svg
        viewBox="0 0 200 200"
        className={`absolute ${
          isHeroBlue
            ? '-left-6 top-28 h-48 w-48 opacity-[0.12] md:left-10 md:h-60 md:w-60'
            : isHero
              ? '-left-8 top-24 h-44 w-44 opacity-[0.12] md:left-8 md:h-56 md:w-56'
              : isBand
                ? 'left-4 top-6 h-36 w-36 opacity-[0.18]'
                : 'left-2 top-10 h-28 w-28 opacity-[0.1]'
        }`}
        fill="currentColor"
      >
        <path
          className={isHeroBlue ? 'text-white' : 'text-brand'}
          d="M100 18c-42 0-76 30-76 68 0 24 14 45 36 57l-10 33 36-20c4 1 9 1 14 1 42 0 76-30 76-68S142 18 100 18z"
        />
      </svg>

      {/* Speech bubble B */}
      <svg
        viewBox="0 0 200 200"
        className={`absolute ${
          isHeroBlue
            ? '-right-4 bottom-36 h-52 w-52 opacity-[0.1] md:right-14 md:h-64 md:w-64'
            : isHero
              ? '-right-6 bottom-28 h-48 w-48 opacity-[0.14] md:right-16 md:h-64 md:w-64'
              : isBand
                ? 'right-8 bottom-4 h-40 w-40 opacity-[0.2]'
                : 'right-4 bottom-8 h-32 w-32 opacity-[0.1]'
        }`}
        fill="currentColor"
      >
        <path
          className={isHeroBlue ? 'text-white' : 'text-accent'}
          d="M108 22c40 0 72 29 72 66 0 23-13 43-34 55l12 30-38-18c-4 1-8 1-12 1-40 0-72-29-72-66s32-68 72-68z"
        />
      </svg>
    </div>
  )
}

type FooterProps = {
  /** Mostra logo + copyright (usato su Open Day) */
  showBrand?: boolean
}

export function Footer({ showBrand = false }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      >
        <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-brand blur-2xl" />
        <div className="absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-accent blur-2xl" />
      </div>
      <div className="relative mx-auto flex w-full max-w-[1120px] flex-col items-center gap-5 px-4 py-8 sm:px-6">
        {showBrand ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <img
              src="/logo-yes.svg?v=13"
              alt="YES! Your English School"
              className="h-12 w-auto sm:h-14"
            />
            <p className="text-sm text-white/70">
              © YES GROUP SRL | YES! Your English School
            </p>
          </div>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
          <a
            href="https://www.yourenglishschool.it/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.yourenglishschool.it/cookie-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline"
          >
            Cookies Policy
          </a>
        </div>
      </div>
    </footer>
  )
}

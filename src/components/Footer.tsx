export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      >
        <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-brand blur-2xl" />
        <div className="absolute -right-8 bottom-0 h-36 w-36 rounded-full bg-accent blur-2xl" />
      </div>
      <div className="relative mx-auto flex w-full max-w-[1120px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-7 text-sm text-white/70 sm:px-6">
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
    </footer>
  )
}

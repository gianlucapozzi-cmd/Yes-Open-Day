type StickyCTAProps = {
  label: string
  targetId?: string
}

export function StickyCTA({ label, targetId = 'lead-form' }: StickyCTAProps) {
  function handleClick() {
    const target = document.getElementById(targetId)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-surface/95 p-3 backdrop-blur md:hidden">
      <button
        type="button"
        onClick={handleClick}
        className="flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-card transition hover:bg-brand-dark"
      >
        {label}
      </button>
    </div>
  )
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export async function submitLead(data: Record<string, unknown>) {
  const res = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('submit_failed')
  // Meta Pixel Lead event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead')
  }
  return res.json().catch(() => ({}))
}

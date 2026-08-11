declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Invia il lead al webhook (Google Apps Script).
 * Usa text/plain per evitare preflight CORS con Apps Script.
 * Il caller deve fare redirect alla thank you SOLO dopo che questa Promise resolve.
 */
export async function submitLead(data: Record<string, unknown>) {
  const url = (import.meta.env.VITE_WEBHOOK_URL as string | undefined)?.trim()

  if (!url) {
    console.error(
      '[submitLead] VITE_WEBHOOK_URL mancante. Controlla .env.local e riavvia Vite.',
    )
    throw new Error('webhook_missing')
  }

  console.log('[submitLead] POST webhook', url, data)

  const res = await fetch(url, {
    method: 'POST',
    // text/plain evita il preflight CORS con Google Apps Script
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  })

  // Apps Script può rispondere 200 dopo redirect; se il body non è leggibile
  // ma lo status è ok, consideriamo successo.
  if (!res.ok) {
    throw new Error('submit_failed')
  }

  try {
    const payload = (await res.json()) as { ok?: boolean }
    if (payload && payload.ok === false) {
      throw new Error('submit_failed')
    }
  } catch (err) {
    if (err instanceof Error && err.message === 'submit_failed') throw err
    // JSON non parseabile ma HTTP ok → ok (comportamento tipico GAS)
  }

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead')
  }
}

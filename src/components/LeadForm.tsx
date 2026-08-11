import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { PhoneInput } from 'react-international-phone'
import { submitLead } from '../lib/submitLead'

export type SedeOption = {
  value: string
  label: string
}

type LeadFormProps = {
  sedeOptions: SedeOption[]
  source: string
  campaign: string
  showInteresse?: boolean
  /** Mostra select Percorso (Open Day) */
  showPercorso?: boolean
  /** Pre-selezione Interesse (es. da UTM campaign) */
  defaultInteresse?: string
  whatsappUrl?: string
  submitLabel?: string
  className?: string
  /** Pre-selezione sede (es. da SedeCard) */
  selectedSede?: string
  onSedeChange?: (value: string) => void
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

type FormErrors = Partial<
  Record<
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'phone'
    | 'percorso'
    | 'sede'
    | 'interesse'
    | 'privacy',
    string
  >
>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PERCORSO_OPTIONS = [
  'Early Years Kids (3–5 anni)',
  'Children-Primary (6–7 anni, 1ª–2ª elementare)',
  'Children-Primary (8–11 anni, 3ª–5ª elementare)',
  'Junior-Lower Secondary (11–14 anni, scuola media)',
  'Teens (15–18 anni, scuola superiore)',
  'Adulto Beginner (A1–A2)',
  'Adulto Intermediate (B1)',
  'Advanced (B2/C1)',
  'Lingua - Spagnolo',
  'Lingua - Francese',
  'Lingua - Giapponese',
  'Consulenze didattiche',
] as const

function isValidE164(phone: string) {
  return /^\+[1-9]\d{7,14}$/.test(phone)
}

export function LeadForm({
  sedeOptions,
  source,
  campaign,
  showInteresse = false,
  showPercorso = false,
  defaultInteresse = '',
  whatsappUrl,
  submitLabel = 'Invia',
  className = '',
  selectedSede,
  onSedeChange,
}: LeadFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [percorso, setPercorso] = useState('')
  const [sedeInternal, setSedeInternal] = useState('')
  const [interesse, setInteresse] = useState(defaultInteresse)
  const [privacy, setPrivacy] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<FormErrors>({})

  const sede = selectedSede ?? sedeInternal

  useEffect(() => {
    if (defaultInteresse) setInteresse(defaultInteresse)
  }, [defaultInteresse])

  function setSede(value: string) {
    onSedeChange?.(value)
    if (selectedSede === undefined) setSedeInternal(value)
  }

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!firstName.trim()) next.firstName = 'Inserisci il nome'
    if (!lastName.trim()) next.lastName = 'Inserisci il cognome'
    if (!email.trim()) next.email = 'Inserisci l’email'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Email non valida'
    if (!phone.trim() || !isValidE164(phone)) {
      next.phone = 'Inserisci un numero di telefono valido'
    }
    if (showPercorso && !percorso) next.percorso = 'Seleziona un percorso'
    if (!sede) next.sede = 'Seleziona una sede'
    if (showInteresse && !interesse) next.interesse = 'Seleziona un interesse'
    if (!privacy) next.privacy = 'Devi accettare la privacy policy'
    return next
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    try {
      await submitLead({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone,
        sede,
        ...(showPercorso ? { percorso } : {}),
        ...(showInteresse ? { interesse } : {}),
        source,
        campaign,
        privacy_consent: true,
        submitted_at: new Date().toISOString(),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`rounded-card border border-black/5 bg-surface p-6 text-center shadow-card sm:p-8 ${className}`.trim()}
        role="status"
      >
        <h3 className="text-xl font-bold text-ink">Grazie!</h3>
        <p className="mt-2 text-muted">Ti ricontatteremo a breve.</p>
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Scrivici su WhatsApp
          </a>
        ) : null}
      </div>
    )
  }

  const fieldClass =
    'min-h-11 w-full rounded-xl border border-black/10 bg-surface px-4 py-2.5 text-ink outline-none transition focus:border-brand'
  const labelClass = 'mb-1.5 block text-sm font-medium text-ink'
  const errorClass = 'mt-1 text-sm text-brand'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-card border border-black/5 bg-surface p-6 shadow-card sm:p-8 ${className}`.trim()}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-first-name" className={labelClass}>
            Nome
          </label>
          <input
            id="lead-first-name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'lead-first-name-error' : undefined}
          />
          {errors.firstName ? (
            <p id="lead-first-name-error" className={errorClass} role="alert">
              {errors.firstName}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lead-last-name" className={labelClass}>
            Cognome
          </label>
          <input
            id="lead-last-name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'lead-last-name-error' : undefined}
          />
          {errors.lastName ? (
            <p id="lead-last-name-error" className={errorClass} role="alert">
              {errors.lastName}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="lead-email" className={labelClass}>
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'lead-email-error' : undefined}
          />
          {errors.email ? (
            <p id="lead-email-error" className={errorClass} role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="lead-phone" className={labelClass}>
            Telefono
          </label>
          <PhoneInput
            defaultCountry="it"
            value={phone}
            onChange={(value) => setPhone(value)}
            inputProps={{
              id: 'lead-phone',
              name: 'phone',
              autoComplete: 'tel',
              'aria-invalid': Boolean(errors.phone),
              'aria-describedby': errors.phone ? 'lead-phone-error' : undefined,
            }}
            className="w-full"
            inputClassName="!min-h-11 !w-full !rounded-r-xl !border !border-black/10 !bg-surface !px-4 !py-2.5 !text-ink"
            countrySelectorStyleProps={{
              buttonClassName:
                '!min-h-11 !rounded-l-xl !border !border-r-0 !border-black/10 !bg-surface !px-3',
            }}
          />
          {errors.phone ? (
            <p id="lead-phone-error" className={errorClass} role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>

        {showPercorso ? (
          <div className="sm:col-span-2">
            <label htmlFor="lead-percorso" className={labelClass}>
              Percorso
            </label>
            <select
              id="lead-percorso"
              name="percorso"
              value={percorso}
              onChange={(e) => setPercorso(e.target.value)}
              className={fieldClass}
              aria-invalid={Boolean(errors.percorso)}
              aria-describedby={
                errors.percorso ? 'lead-percorso-error' : undefined
              }
            >
              <option value="">Seleziona un percorso</option>
              {PERCORSO_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.percorso ? (
              <p id="lead-percorso-error" className={errorClass} role="alert">
                {errors.percorso}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className={showInteresse ? '' : 'sm:col-span-2'}>
          <label htmlFor="lead-sede" className={labelClass}>
            Sede
          </label>
          <select
            id="lead-sede"
            name="sede"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
            className={fieldClass}
            aria-invalid={Boolean(errors.sede)}
            aria-describedby={errors.sede ? 'lead-sede-error' : undefined}
          >
            <option value="">Seleziona una sede</option>
            {sedeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.sede ? (
            <p id="lead-sede-error" className={errorClass} role="alert">
              {errors.sede}
            </p>
          ) : null}
        </div>

        {showInteresse ? (
          <div>
            <label htmlFor="lead-interesse" className={labelClass}>
              Interesse
            </label>
            <select
              id="lead-interesse"
              name="interesse"
              value={interesse}
              onChange={(e) => setInteresse(e.target.value)}
              className={fieldClass}
              aria-invalid={Boolean(errors.interesse)}
              aria-describedby={
                errors.interesse ? 'lead-interesse-error' : undefined
              }
            >
              <option value="">Seleziona</option>
              <option value="Adulti">Adulti</option>
              <option value="Bambini e ragazzi">Bambini e ragazzi</option>
              <option value="Entrambi">Entrambi</option>
            </select>
            {errors.interesse ? (
              <p id="lead-interesse-error" className={errorClass} role="alert">
                {errors.interesse}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-brand"
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={errors.privacy ? 'lead-privacy-error' : undefined}
          />
          <span>
            Ho letto e accetto la{' '}
            <a
              href="https://www.yourenglishschool.it/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.privacy ? (
          <p id="lead-privacy-error" className={errorClass} role="alert">
            {errors.privacy}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <p className="mt-4 text-sm text-brand" role="alert">
          Si è verificato un errore. Riprova tra poco.
        </p>
      ) : null}

      <motion.button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-card transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === 'submitting' ? 'Invio in corso…' : submitLabel}
      </motion.button>
    </form>
  )
}

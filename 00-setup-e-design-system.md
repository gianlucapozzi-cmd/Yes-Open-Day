# YES! Your English School — Setup & Design System (comune alle 2 landing)

> Questo file va letto da Cursor **prima** dei brief delle singole landing.
> Contiene stack, struttura, design tokens, componenti riutilizzabili, gestione form + webhook + Meta Pixel, animazioni e regole responsive/accessibilità.
> Le due landing condividono lo stesso progetto/base di componenti: cambia solo il contenuto delle sezioni.

---

## 1. Cliente & asset

- **Cliente:** YES! Your English School® (YES GROUP S.r.l.)
- **Sito:** https://www.yourenglishschool.it/
- **Asset nella cartella di progetto (già presenti sul desktop):**
  - `/guideline` → **fonte di verità** per colori, font, tono. Estrai da qui palette e tipografia.
  - `/logo` → usa il logo ufficiale (versione trasparente/PNG). Non ridisegnarlo, non ricolorarlo.
  - `/ispirazione` → riferimenti visivi di mood/layout. Prendi ispirazione, **non copiare** 1:1.

> ⚠️ Se un valore (colore, font) non è nella guideline, ricavalo dal logo. Non inventare colori a caso.

---

## 2. Stack tecnico

- **Vite + React + TypeScript**
- **Tailwind CSS 4.1+** (config con `@theme`)
- **Framer Motion 12** (animazioni)
- **Heroicons** (`@heroicons/react` v2) — icone outline/solid
- **react-international-phone** per il campo telefono (output E.164)

Installazione:
```bash
npm create vite@latest yes-landing -- --template react-ts
cd yes-landing
npm i tailwindcss @tailwindcss/vite framer-motion @heroicons/react react-international-phone
```

> Nota: uso `react-international-phone` al posto di `intl-tel-input` vanilla perché si integra in modo pulito in React e restituisce già il numero in formato E.164 (comodo per Relatia). Se preferisci restare su `intl-tel-input`, va inizializzato via `useRef` + `useEffect`.

---

## 3. Struttura file

```
src/
  App.tsx                → monta la landing
  main.tsx
  index.css              → Tailwind + @theme (design tokens)
  components/
    Hero.tsx
    Section.tsx          → wrapper con animazione fade-up on scroll
    FeatureCard.tsx
    SedeCard.tsx
    LeadForm.tsx         → form contatti (condiviso, config via props)
    Footer.tsx
    StickyCTA.tsx        → CTA fissa mobile
  lib/
    motion.ts            → varianti Framer Motion riutilizzabili
    submitLead.ts        → invio dati al webhook + evento Pixel
```

---

## 4. Design system (design tokens)

In `index.css`, definisci i token con `@theme`. **Sostituisci i valori placeholder con quelli della guideline/logo.**

```css
@import "tailwindcss";

@theme {
  /* COLORI — ricavare da /guideline e /logo */
  --color-brand:        #E30613;  /* placeholder: colore primario YES (rosso) → confermare da guideline */
  --color-brand-dark:   #B4040F;
  --color-ink:          #14141B;  /* testo principale */
  --color-muted:        #5B5B66;  /* testo secondario */
  --color-surface:      #FFFFFF;
  --color-surface-alt:  #F6F6F4;  /* sezioni alternate */
  --color-accent:       #FFC72C;  /* accento caldo per badge promo → confermare */

  /* TIPOGRAFIA — usare i font della guideline */
  --font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif; /* placeholder */

  /* RAGGI E OMBRE */
  --radius-card: 20px;
  --shadow-card: 0 8px 30px rgba(20,20,27,0.08);
}
```

**Regole visive:**
- Layout arioso, generoso di white space. Contenuto centrato, `max-width` ~1120px.
- Bottoni CTA: colore `--color-brand`, testo bianco, `rounded-full`, padding abbondante, hover con leggero scale + ombra.
- Card: fondo bianco, `--radius-card`, `--shadow-card`, bordo sottile 1px in grigio chiarissimo.
- Titoli in `font-bold`/`font-extrabold`, corpo in `font-normal`, alto contrasto sul testo (`--color-ink`).
- Badge promo (es. "-20%"): pill con `--color-accent`, testo scuro.
- Immagini: usa quelle del sito/ispirazione (bambini, adulti, aule) con `object-cover`, angoli arrotondati.

---

## 5. Componenti riutilizzabili

### `Section.tsx`
Wrapper che applica animazione **fade-up on scroll** (`whileInView`) e padding verticale coerente (`py-16 md:py-24`). Accetta `id`, `className`, `children`.

### `FeatureCard.tsx`
Card con: icona Heroicon in cerchio brand-tint, titolo breve, testo. Props: `icon`, `title`, `text`.

### `SedeCard.tsx`
Card sede con: nome sede (es. "YES! Melzo"), data/e open day, orario (se presente), pin icon (`MapPinIcon`). Props: `sede`, `date`, `time?`.

### `LeadForm.tsx` (condiviso — vedi §6)

### `StickyCTA.tsx`
Barra fissa in basso **solo su mobile** (`md:hidden`) con bottone "Prenota il tuo posto" / "Prenota la consulenza" che fa `scroll` al form. Testo passato via prop.

---

## 6. Form contatti (comune)

Componente `LeadForm.tsx` configurabile via props così serve entrambe le landing.

**Campi (tutti obbligatori tranne dove indicato):**
1. Nome — text
2. Cognome — text
3. Email — email (validazione formato)
4. Telefono — `react-international-phone`, default country `it`, output **E.164**
5. **Sede** — `<select>`, opzioni passate via prop (variano per landing)
6. *(solo landing generica, opzionale ma consigliato)* **Interesse** — select: `Adulti` / `Bambini e ragazzi` → utile per il routing in Relatia
7. Checkbox privacy (obbligatoria) con link a https://www.yourenglishschool.it/privacy/

**Comportamento:**
- Validazione client-side: campi vuoti, email valida, telefono valido, privacy spuntata.
- Stato: `idle → submitting → success | error`.
- In success: sostituisci il form con un messaggio di conferma ("Grazie! Ti ricontatteremo a breve.") + eventuale CTA WhatsApp.
- Niente tag `<form>` con reload: gestisci via `onClick`/`onSubmit` con `preventDefault`.

**Submit → `lib/submitLead.ts`:**
- POST JSON al webhook n8n (env `VITE_WEBHOOK_URL`).
- Al successo, spara l'evento Meta Pixel `Lead`.

Payload verso il webhook (mappabile su Relatia):
```json
{
  "first_name": "Mario",
  "last_name": "Rossi",
  "email": "mario@example.com",
  "phone": "+393331234567",
  "sede": "Melzo",
  "interesse": "Adulti",
  "source": "landing-open-day",      // o "landing-consulenza"
  "campaign": "open-day-settembre",  // valore per campagna
  "privacy_consent": true,
  "submitted_at": "2026-09-01T10:00:00Z"
}
```

```ts
// lib/submitLead.ts
export async function submitLead(data: Record<string, unknown>) {
  const res = await fetch(import.meta.env.VITE_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("submit_failed");
  // Meta Pixel Lead event
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Lead");
  }
  return res.json().catch(() => ({}));
}
```

---

## 7. Meta Pixel

Nel `<head>` di `index.html` inserisci lo snippet standard Meta Pixel.
- **⚠️ Pixel ID: DA VERIFICARE** — non usare ancora nessun ID. Inserire il valore corretto solo dopo conferma.
  - Placeholder da sostituire: `__PIXEL_ID_DA_VERIFICARE__`
  - (ID rilevato sul sito, in attesa di conferma: `549585275653564`)
- `PageView` al load, `Lead` all'invio form riuscito (già gestito in `submitLead.ts`).

---

## 8. Animazioni (Framer Motion 12)

In `lib/motion.ts` definisci varianti riutilizzabili:
```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};
```
Uso:
- **Hero:** entrata `fadeUp` al mount (logo → headline → sottotitolo → CTA in sequenza).
- **Sezioni:** `whileInView="show"` con `viewport={{ once: true, amount: 0.2 }}`.
- **Griglie di card:** container con `stagger`, figli con `fadeUp`.
- **Bottoni:** `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.98 }}`.
- Rispetta `prefers-reduced-motion`: disabilita/riduci le animazioni.

---

## 9. Responsive & accessibilità

- **Mobile-first.** Breakpoint principali Tailwind (`sm/md/lg`).
- Form e CTA sempre facilmente raggiungibili; su mobile `StickyCTA` visibile.
- Contrasto testo ≥ WCAG AA. `label` collegate agli input, `aria-*` sui campi con errore.
- Target touch ≥ 44px. Focus visibile su tutti gli elementi interattivi.
- `alt` descrittivi sulle immagini; ordine dei titoli semanticamente corretto (`h1` unico).

---

## 10. Footer (comune)

Contenuti reali (dal sito):

**Numero verde:** 800 199 356 — info@yesgroup.it

**Sedi (mostra le 3 dell'iniziativa + eventuali altre):**
- **YES! Milano Lambrate** — yes.lambrate@yourenglishschool.it — +39 02 97 10 24 73 / +39 329 8758327
- **YES! Milano Pasteur** — yesmilano@yourenglishschool.it — +39 02 23 189 073 / +39 328 598 7754
- **YES! Melzo (MI)** — yesmelzo@yourenglishschool.it — +39 02 39 46 40 85 / +39 346 5462130

**Social:** Facebook `/yourenglishschoolitaly` · Instagram `@yes_scuola_di_lingue` · LinkedIn `your-english-school-yes` · TikTok `@yes_yourenglishschool`

**Dati legali:** YES GROUP S.r.l. — Via G. Pacini 39, 20131 Milano (MI) — P.IVA 09073740962 — © YES! Your English School®, marchio registrato.
Link: Privacy Policy, Cookies Policy.

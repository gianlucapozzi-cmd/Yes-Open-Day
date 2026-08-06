# Landing 1 — OPEN DAY · YES! Your English School

> Leggi prima `00-setup-e-design-system.md` (stack, design tokens, form, pixel, animazioni, footer).
> Questo brief definisce **solo contenuto e struttura** di questa landing.

---

## Obiettivo
Generare iscrizioni agli **Open Day** di settembre tramite form (lead gen). Traffico da campagna Meta.
- `source`: `landing-open-day`
- `campaign`: `open-day-settembre`

## Target
Adulti interessati per sé **o** genitori interessati per i figli. Tono caldo, invitante, concreto.

## Dati chiave Open Day (usali dove servono)
- 📍 **Melzo** e **Lambrate** → 🗓️ **19 e 26 settembre**
- 📍 **Pasteur** → 🗓️ **18 settembre**, ore **17:00–20:00**

---

## Struttura sezioni

### 1. Hero
- Logo YES in alto (dalla cartella `/logo`).
- **Headline:** "Open Day YES! Your English School"
- **Sottotitolo:** "Vuoi trovare il corso di lingua giusto per te o per tuo figlio? Vieni a conoscerci."
- Riga con le date/sedi in evidenza (badge/pill): "Melzo & Lambrate · 19 e 26 settembre" — "Pasteur · 18 settembre, 17:00–20:00".
- **Badge promo** ben visibile: "Promozione speciale -20%".
- **CTA primaria:** "Prenota il tuo posto" → scroll al form.
- Immagine di supporto (aula/studenti) dalle immagini di ispirazione, con overlay leggero per leggibilità del testo.

### 2. Le sedi e le date (3 `SedeCard`)
Titolo sezione: "Scegli la sede più vicina a te"
- **YES! Melzo** — 19 e 26 settembre
- **YES! Milano Lambrate** — 19 e 26 settembre
- **YES! Milano Pasteur** — 18 settembre · 17:00–20:00
Ogni card ha pin icon (`MapPinIcon`), nome sede, data/e, orario (dove presente) e un mini-CTA "Prenota" che porta al form pre-selezionando la sede (opzionale ma gradito).

### 3. Cosa farai durante l'Open Day
Titolo: "Durante l'Open Day potrai…"
Tre punti con icona (`FeatureCard`):
- **Conoscere il nostro metodo** (`AcademicCapIcon`)
- **Confrontarti con i docenti** (`ChatBubbleLeftRightIcon`)
- **Partecipare a una lezione di prova gratuita** (`SparklesIcon`)

### 4. Perché scegliere YES! (4 `FeatureCard`)
Titolo: "Perché scegliere YES!"
- ✨ **Classi a numero ridotto** (`UsersIcon`)
- ✨ **Docenti qualificati, madrelingua e bilingue** (`GlobeAltIcon`)
- ✨ **Percorsi per bambini, adolescenti e adulti** (`UserGroupIcon`)
- ✨ **Promozione speciale del 20%** (`TagIcon`) — evidenziata con `--color-accent`

### 5. Form — "Prenota il tuo posto"
Testo introduttivo: "Scegli la lingua e prenota il tuo posto: ti aspettiamo all'Open Day."
`LeadForm` con:
- Nome, Cognome, Email, Telefono (E.164), **Sede** (select).
- Opzioni **Sede**:
  - `Melzo — 19 e 26 settembre`
  - `Lambrate — 19 e 26 settembre`
  - `Pasteur — 18 settembre (17:00–20:00)`
- Checkbox privacy obbligatoria.
- `source`: `landing-open-day`, `campaign`: `open-day-settembre`.
- **Nessun** campo "Interesse" qui (non serve per l'open day).

### 6. Footer
Come da `00-setup-e-design-system.md` §10.

### StickyCTA (mobile)
Testo bottone: "Prenota il tuo posto" → scroll al form.

---

## Note copy
- Riprendi il tono del post Meta: "Durante l'Open Day potrai conoscere il nostro metodo, confrontarti con i docenti e partecipare a una lezione di prova gratuita."
- CTA di chiusura coerente con il post: "Scegli la lingua e prenota il tuo posto."
- La promo -20% deve essere sempre visibile ma non urlata: usala come rinforzo, non come unico gancio.

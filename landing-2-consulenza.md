# Landing 2 — CONSULENZA GRATUITA (generica) · YES! Your English School

> Leggi prima `00-setup-e-design-system.md` (stack, design tokens, form, pixel, animazioni, footer).
> Questo brief definisce **solo contenuto e struttura** di questa landing.

---

## Obiettivo
Raccogliere contatti per **prenotare una consulenza gratuita / appuntamento** presso una delle sedi.
Ricevono traffico **due campagne Meta** diverse (adulti + bambini/ragazzi), quindi la landing deve parlare **a entrambi i segmenti**.
- `source`: `landing-consulenza`
- `campaign`: valorizzato dalla campagna (`adulti` o `kids`) — vedi §UTM

## Target
1. **Adulti** — lavoro, viaggi, piacere di conversare.
2. **Genitori** per bambini/ragazzi (3–18 anni).

---

## Struttura sezioni

### 1. Hero
- Logo YES in alto.
- **Headline:** "Impara una nuova lingua con YES! Your English School"
- **Sottotitolo:** "Corsi per adulti, bambini e ragazzi. Scegli la lingua e prenota la tua consulenza gratuita."
- **CTA primaria:** "Prenota la consulenza gratuita" → scroll al form.
- Immagine hero che richiami entrambi i mondi (adulti in conversazione + ragazzi), dalle immagini di ispirazione.

### 2. Due percorsi (blocco a 2 colonne / 2 card grandi)
Titolo: "Un percorso per ogni obiettivo"

**Card A — Adulti** (`BriefcaseIcon` / `GlobeAltIcon`)
Testo: "Migliora per lavoro, viaggio o per il piacere di fare conversazione. Un metodo pratico, orientato a conversazione e interazione."

**Card B — Bambini e ragazzi (3–18 anni)** (`SparklesIcon` / `FaceSmileIcon`)
Testo: "Imparare diventa un'esperienza naturale, coinvolgente e divertente. Con attività pratiche, ascolto e conversazione, sviluppano sicurezza e spontaneità."

### 3. Perché scegliere YES! (3–4 `FeatureCard`)
Titolo: "Perché scegliere YES!"
- ✅ **Classi a numero ridotto** (`UsersIcon`)
- ✅ **Docenti qualificati, madrelingua e bilingue** (`GlobeAltIcon`)
- ✅ **Metodo pratico e interattivo**, orientato a conversazione (`ChatBubbleLeftRightIcon`)
- ✅ **Corsi dai 3 ai 18 anni + percorsi per adulti** (`AcademicCapIcon`)

### 4. Come funziona (3 step)
Titolo: "Come funziona"
Step numerati con icona:
1. **Scegli la lingua** (`LanguageIcon`)
2. **Prenota la consulenza gratuita** (`CalendarDaysIcon`)
3. **Scopri il percorso su misura** per i tuoi obiettivi (`MapIcon`)

### 5. Form — "Prenota la consulenza gratuita"
Testo introduttivo: "Lascia il tuo contatto: ti richiamiamo per costruire insieme il percorso più adatto."
`LeadForm` con:
- Nome, Cognome, Email, Telefono (E.164), **Sede** (select).
- **Interesse** (select consigliato per il routing in Relatia): `Adulti` / `Bambini e ragazzi` → pre-compila in base alla campagna se possibile (vedi §UTM).
- Opzioni **Sede**:
  - `Milano Lambrate`
  - `Milano Pasteur`
  - `Melzo`
  - *(opzionale, se vuoi includerle: `Milano Cascina Merlata`, `Online`)*
- Checkbox privacy obbligatoria.

### 6. Footer
Come da `00-setup-e-design-system.md` §10.

### StickyCTA (mobile)
Testo bottone: "Prenota la consulenza" → scroll al form.

---

## UTM & attribuzione per segmento
Poiché due campagne puntano qui, leggi i parametri URL per popolare `campaign` e pre-selezionare `Interesse`:
- Campagna **adulti** → link con `?campaign=adulti`
- Campagna **kids** → link con `?campaign=kids`
Logica: se `campaign=kids` → `Interesse` default = "Bambini e ragazzi"; se `campaign=adulti` → "Adulti". L'utente può comunque modificare.

## Note copy
- Adulti (testo 1): enfasi su lavoro/viaggio/piacere + "classi a numero ridotto", "docenti madrelingua e bilingue", "metodo pratico orientato a conversazione". CTA: "Scegli la lingua, prenota una consulenza gratuita e scopri il percorso più adatto ai tuoi obiettivi."
- Kids (testo 2): "esperienza naturale, coinvolgente e divertente", "corsi dai 3 ai 18 anni", "metodo pratico e interattivo". CTA: "Lascia il tuo contatto per ricevere tutte le informazioni."
- Bilanciamento: la hero e le sezioni devono risultare accoglienti per entrambi i pubblici, senza sbilanciarsi solo su uno.

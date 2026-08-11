/**
 * Google Apps Script per il foglio Open Day:
 * https://docs.google.com/spreadsheets/d/1EcYdu-KWuV4j0Rcz9QU6r4n_PiX0m-pcsMgdvZwykNs
 *
 * Setup:
 * 1. Apri il foglio → Estensioni → Apps Script
 * 2. Incolla questo codice e salva
 * 3. Distribuisci → Nuova distribuzione → App web
 *    - Esegui come: Me
 *    - Chi può accedere: Chiunque
 * 4. Copia l’URL …/exec in .env.local come VITE_WEBHOOK_URL
 * 5. Riavvia Vite
 */
const SPREADSHEET_ID = '1EcYdu-KWuV4j0Rcz9QU6r4n_PiX0m-pcsMgdvZwykNs'
const SHEET_NAME = 'Foglio1'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}')
    const sheet =
      SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME) ||
      SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0]

    const nome = data.nome || data.first_name || ''
    const cognome = data.cognome || data.last_name || ''
    const email = data.email || ''
    const telefono =
      data['numero di telefono'] || data.telefono || data.phone || ''
    const percorso = data.percorso || ''
    const sede = data.sede || ''

    sheet.appendRow([nome, cognome, email, telefono, percorso, sede])

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: 'yes-open-day' }),
  ).setMimeType(ContentService.MimeType.JSON)
}

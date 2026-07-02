// ─────────────────────────────────────────────────────────────────────────────
//  Roselyn & An — Wedding RSVP · Google Apps Script Backend
//  Deploy as Web App: Execute as "Me", Access "Anyone"
//  Handles: submit RSVP, lookup by phone
// ─────────────────────────────────────────────────────────────────────────────

const SHEET_NAME = 'RSVPs';

// Column layout (1-indexed)
const COL = {
  TIMESTAMP:    1,
  NAME:         2,
  PHONE:        3,
  CATEGORY:     4,
  GUESTS:       5,
  ATTENDING:    6,
  DIETARY:      7,
  TABLE:        8,
};

// ─── CORS WRAPPER ────────────────────────────────────────────────────────────
function respond(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── MAIN HANDLER ────────────────────────────────────────────────────────────
// All requests come in as GET to avoid CORS preflight issues.
// action=submit → save RSVP
// action=lookup → find by phone
function doGet(e) {
  try {
    const action = e.parameter.action || '';

    if (action === 'submit') return handleSubmit(e.parameter);
    if (action === 'lookup') return handleLookup(e.parameter);

    return respond({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return respond({ ok: false, error: err.message });
  }
}

// ─── SUBMIT ──────────────────────────────────────────────────────────────────
function handleSubmit(p) {
  // ── Validate ──
  const name     = (p.name     || '').trim();
  const phone    = normalizePhone(p.phone || '');
  const category = (p.category || '').trim();
  const guests   = parseInt(p.guests, 10) || 1;
  const attending = p.attending === 'true';
  const dietary  = (p.dietary  || '').trim();

  if (!name)     return respond({ ok: false, error: 'Tên không được để trống. / Name is required.' });
  if (!phone)    return respond({ ok: false, error: 'Số điện thoại không hợp lệ. / Invalid phone number.' });
  if (!category) return respond({ ok: false, error: 'Vui lòng chọn nhóm khách. / Please select a party group.' });
  if (!dietary)  return respond({ ok: false, error: 'Vui lòng điền yêu cầu ăn uống (hoặc ghi "Không có"). / Please fill in dietary info (or write "None").' });

  // ── Duplicate check ──
  const sheet = getOrCreateSheet();
  const existing = findRowByPhone(sheet, phone);
  if (existing) {
    // Update existing row instead of creating duplicate
    sheet.getRange(existing, COL.NAME,     1, 1).setValue(name);
    sheet.getRange(existing, COL.CATEGORY, 1, 1).setValue(category);
    sheet.getRange(existing, COL.GUESTS,   1, 1).setValue(guests);
    sheet.getRange(existing, COL.ATTENDING,1, 1).setValue(attending);
    sheet.getRange(existing, COL.DIETARY,  1, 1).setValue(dietary);
    sheet.getRange(existing, COL.TIMESTAMP,1, 1).setValue(new Date().toISOString());

    return respond({
      ok: true,
      updated: true,
      message: attending
        ? 'RSVP của bạn đã được cập nhật! / Your RSVP has been updated!'
        : 'Cảm ơn bạn đã thông báo! / Thank you for letting us know.',
      data: { name, phone, attending, guests, category, dietary, table: getTable(sheet, existing) }
    });
  }

  // ── Append new row ──
  sheet.appendRow([
    new Date().toISOString(), // A: Timestamp
    name,                     // B: Name
    phone,                    // C: Phone
    category,                 // D: Category
    guests,                   // E: Guests
    attending,                // F: Attending
    dietary,                  // G: Dietary
    ''                        // H: Table (assigned later by admin)
  ]);

  return respond({
    ok: true,
    updated: false,
    message: attending
      ? 'Cảm ơn! Chúng tôi rất vui được đón tiếp bạn! / Thank you! We look forward to celebrating with you!'
      : 'Cảm ơn bạn đã thông báo! / Thank you for letting us know.',
    data: { name, phone, attending, guests, category, dietary, table: null }
  });
}

// ─── LOOKUP ──────────────────────────────────────────────────────────────────
function handleLookup(p) {
  const phone = normalizePhone(p.phone || '');
  if (!phone) return respond({ ok: false, error: 'Vui lòng nhập số điện thoại. / Please enter a phone number.' });

  const sheet = getOrCreateSheet();
  const row = findRowByPhone(sheet, phone);
  if (!row) return respond({ ok: false, error: 'Không tìm thấy RSVP với số điện thoại này. / No RSVP found for this number.' });

  const data = sheet.getRange(row, 1, 1, Object.keys(COL).length).getValues()[0];
  return respond({
    ok: true,
    data: {
      submittedAt: data[COL.TIMESTAMP - 1],
      name:        data[COL.NAME      - 1],
      phone:       data[COL.PHONE     - 1],
      category:    data[COL.CATEGORY  - 1],
      guests:      data[COL.GUESTS    - 1],
      attending:   data[COL.ATTENDING - 1],
      dietary:     data[COL.DIETARY   - 1],
      table:       data[COL.TABLE     - 1] || null,
    }
  });
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Write header row
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Category', 'Guests', 'Attending', 'Dietary', 'Table']);
    sheet.setFrozenRows(1);
    // Style header
    sheet.getRange(1, 1, 1, 8).setBackground('#34495a').setFontColor('#ffffff').setFontWeight('bold');
    sheet.setColumnWidth(1, 180); // Timestamp
    sheet.setColumnWidth(2, 160); // Name
    sheet.setColumnWidth(3, 130); // Phone
    sheet.setColumnWidth(4, 150); // Category
    sheet.setColumnWidth(7, 200); // Dietary
  }
  return sheet;
}

function normalizePhone(raw) {
  // Strip everything except digits and leading +
  const stripped = raw.replace(/[^\d+]/g, '');
  // Must have at least 7 digits
  const digits = stripped.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return null;
  return stripped;
}

function findRowByPhone(sheet, phone) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const phones = sheet.getRange(2, COL.PHONE, lastRow - 1, 1).getValues();
  for (let i = 0; i < phones.length; i++) {
    const stored = normalizePhone(String(phones[i][0]));
    if (stored && stored === phone) return i + 2; // +2: 1-indexed + header row
  }
  return null;
}

function getTable(sheet, row) {
  const val = sheet.getRange(row, COL.TABLE).getValue();
  return val || null;
}
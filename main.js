// ─── CONFIG ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Họ hàng Cô dâu",
  "Họ hàng Chú rể",
  "Bạn bè Cô dâu",
  "Bạn bè Chú rể",
  "TNTT",
  "Cộng đoàn / Parish",
  "Đồng nghiệp / Coworkers",
  "Hàng xóm / Neighbors",
  "Bạn chung đôi",
  "Khác / Other"
];

let selectedCategory = null;
let attending = null;
let adminPassword = null;

// ─── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildCategoryGrid();
  buildFilterCategoryDropdown();
  loadQR();
  startCountdown();

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });

  if (window.location.hash === '#rsvp') showPage('rsvp');
});

// ─── COUNTDOWN ──────────────────────────────────────────────────────────────
function startCountdown() {
  const target = new Date('2026-12-05T14:00:00');
  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');
  if (!dEl) return;

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      dEl.textContent = '00'; hEl.textContent = '00'; mEl.textContent = '00'; sEl.textContent = '00';
      clearInterval(timer);
      return;
    }
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);
    dEl.textContent = String(days).padStart(2, '0');
    hEl.textContent = String(hours).padStart(2, '0');
    mEl.textContent = String(mins).padStart(2, '0');
    sEl.textContent = String(secs).padStart(2, '0');
  }
  tick();
  const timer = setInterval(tick, 1000);
}

// ─── NAVIGATION ─────────────────────────────────────────────────────────────
function showPage(p) {
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(x => x.classList.remove('active'));
  document.getElementById('page-' + p).classList.add('active');
  document.getElementById('nav-' + p).classList.add('active');
  document.getElementById('nav-links').classList.remove('open');
  if (p === 'admin' && adminPassword) refreshAdmin();
  window.scrollTo(0, 0);
}

// ─── CATEGORY GRID ──────────────────────────────────────────────────────────
function buildCategoryGrid() {
  const grid = document.getElementById('category-grid');
  grid.innerHTML = '';
  CATEGORIES.forEach(c => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cat-btn';
    b.textContent = c;
    b.onclick = () => {
      selectedCategory = c;
      document.getElementById('rsvp-category').value = c;
      grid.querySelectorAll('.cat-btn').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
    };
    grid.appendChild(b);
  });
}

function buildFilterCategoryDropdown() {
  const sel = document.getElementById('filter-cat');
  CATEGORIES.forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    sel.appendChild(o);
  });
}

// ─── ATTENDANCE TOGGLE ──────────────────────────────────────────────────────
function selectAttendance(val) {
  attending = val;
  document.getElementById('rsvp-attending').value = val;
  document.getElementById('btn-yes').className = 'att-btn att-yes' + (val === true ? ' selected-yes' : '');
  document.getElementById('btn-no').className  = 'att-btn att-no'  + (val === false ? ' selected-no'  : '');
  document.getElementById('dietary-wrap').style.display = val ? 'block' : 'none';
}

// ─── SUBMIT RSVP ────────────────────────────────────────────────────────────
async function submitRSVP(e) {
  e.preventDefault();
  const errEl = document.getElementById('rsvp-error');
  errEl.style.display = 'none';

  const name = document.getElementById('rsvp-name').value.trim();
  const phone = document.getElementById('rsvp-phone').value.trim();
  const guests = document.getElementById('rsvp-guests').value;
  const dietary = document.getElementById('rsvp-dietary').value.trim();

  if (!name || !phone) {
    return showRsvpError('Vui lòng điền đầy đủ thông tin / Please fill out all fields.');
  }
  if (!selectedCategory) {
    return showRsvpError('Vui lòng chọn nhóm khách / Please select your party group.');
  }
  if (attending === null) {
    return showRsvpError('Vui lòng xác nhận tham dự / Please confirm attendance.');
  }

  const submitBtn = document.getElementById('rsvp-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Đang gửi...';

  try {
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, category: selectedCategory, guests, attending, dietary })
    });
    const data = await res.json();

    if (!res.ok) {
      showRsvpError(data.error || 'Có lỗi xảy ra / Something went wrong.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Gửi xác nhận · Submit RSVP';
      return;
    }

    document.getElementById('rsvp-form-wrap').style.display = 'none';
    document.getElementById('rsvp-success').style.display = 'block';
    document.getElementById('success-msg').textContent = data.message;
    document.getElementById('success-seat').innerHTML = data.data.table
      ? `<div class="seat-badge">Bàn của bạn · Table ${data.data.table}</div>`
      : '';
  } catch (err) {
    showRsvpError('Không thể kết nối máy chủ / Could not connect to server.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Gửi xác nhận · Submit RSVP';
  }
}

function showRsvpError(msg) {
  const errEl = document.getElementById('rsvp-error');
  errEl.textContent = msg;
  errEl.style.display = 'block';
}

function resetRSVP() {
  attending = null; selectedCategory = null;
  document.getElementById('rsvp-form').reset();
  document.getElementById('btn-yes').className = 'att-btn att-yes';
  document.getElementById('btn-no').className = 'att-btn att-no';
  document.getElementById('dietary-wrap').style.display = 'none';
  document.getElementById('rsvp-error').style.display = 'none';
  buildCategoryGrid();
  document.getElementById('rsvp-form-wrap').style.display = 'block';
  document.getElementById('rsvp-success').style.display = 'none';
}

// ─── LOOKUP ─────────────────────────────────────────────────────────────────
async function lookupRSVP() {
  const phone = document.getElementById('lookup-phone').value.trim();
  const resultEl = document.getElementById('lookup-result');
  if (!phone) { toast('Vui lòng nhập số điện thoại'); return; }

  try {
    const res = await fetch(`/api/rsvp/${encodeURIComponent(phone)}`);
    const data = await res.json();

    if (!res.ok) {
      resultEl.innerHTML = `<div class="error-msg">${data.error || 'Không tìm thấy RSVP'}</div>`;
      return;
    }
    const g = data.data;
    resultEl.innerHTML = `
      <div class="rsvp-result">
        <div class="guest-name">${g.name}</div>
        <div class="info-row"><span class="info-label">Nhóm</span><span>${g.category}</span></div>
        <div class="info-row"><span class="info-label">Tham dự</span>
          <span class="badge badge-${g.attending ? 'yes' : 'no'}">${g.attending ? '✓ Tham dự' : '✗ Vắng mặt'}</span>
        </div>
        ${g.attending ? `<div class="info-row"><span class="info-label">Số người</span><span>${g.guests} người</span></div>` : ''}
        ${g.table ? `<div class="info-row"><span class="info-label">Bàn số</span><span style="font-weight:500;font-size:1rem">Bàn ${g.table}</span></div>` : ''}
        ${g.dietary ? `<div class="info-row"><span class="info-label">Yêu cầu ăn</span><span>${g.dietary}</span></div>` : ''}
        <div class="info-row"><span class="info-label">Ngày gửi</span><span>${new Date(g.submittedAt).toLocaleDateString('vi-VN')}</span></div>
      </div>`;
  } catch (err) {
    resultEl.innerHTML = `<div class="error-msg">Không thể kết nối máy chủ / Could not connect to server.</div>`;
  }
}

// ─── QR CODE ────────────────────────────────────────────────────────────────
async function loadQR() {
  try {
    const res = await fetch('/api/qr');
    const data = await res.json();
    if (data.success) {
      document.getElementById('qr-img-wrap').innerHTML = `<img src="${data.qr}" alt="RSVP QR Code">`;
      document.getElementById('invite-qr').innerHTML = `<img src="${data.qr}" alt="RSVP QR Code">`;
      document.getElementById('qr-url-text').textContent = data.url;
      window._qrDataUrl = data.qr;
      window._qrUrl = data.url;
    }
  } catch (err) {
    document.getElementById('qr-img-wrap').innerHTML = `<div class="qr-loading">Không thể tạo QR</div>`;
  }
}

function downloadQR() {
  if (!window._qrDataUrl) { toast('QR chưa sẵn sàng'); return; }
  const a = document.createElement('a');
  a.href = window._qrDataUrl;
  a.download = 'roselyn-an-rsvp-qr.png';
  a.click();
  toast('Đã tải QR Code!');
}

function copyQRUrl() {
  if (!window._qrUrl) return;
  navigator.clipboard.writeText(window._qrUrl)
    .then(() => toast('Đã sao chép link!'))
    .catch(() => toast('Không thể sao chép'));
}

// ─── ADMIN ──────────────────────────────────────────────────────────────────
async function unlockAdmin() {
  const pass = document.getElementById('admin-pass').value;
  try {
    const res = await fetch('/api/admin/stats', { headers: { 'x-admin-password': pass } });
    if (!res.ok) { toast('Mật khẩu không đúng / Incorrect password'); return; }
    adminPassword = pass;
    document.getElementById('admin-locked').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    refreshAdmin();
  } catch (err) {
    toast('Không thể kết nối máy chủ');
  }
}

function adminHeaders() {
  return { 'x-admin-password': adminPassword, 'Content-Type': 'application/json' };
}

async function refreshAdmin() {
  await loadStats();
  await loadGuests();
}

async function loadStats() {
  try {
    const res = await fetch('/api/admin/stats', { headers: adminHeaders() });
    const { data } = await res.json();
    document.getElementById('admin-stats').innerHTML = `
      <div class="stat-card"><div class="stat-num">${data.total}</div><div class="stat-label">Tổng RSVP</div></div>
      <div class="stat-card"><div class="stat-num">${data.attending}</div><div class="stat-label">Tham dự</div></div>
      <div class="stat-card"><div class="stat-num">${data.totalGuests}</div><div class="stat-label">Tổng khách</div></div>
      <div class="stat-card"><div class="stat-num">${data.declined}</div><div class="stat-label">Vắng mặt</div></div>
      <div class="stat-card"><div class="stat-num">${data.seated}</div><div class="stat-label">Đã xếp chỗ</div></div>
      <div class="stat-card"><div class="stat-num">${data.numTables}</div><div class="stat-label">Số bàn</div></div>`;
    window._catBreakdown = data.catBreakdown;
    window._seatingBreakdown = data.seatingBreakdown;
    window._numTables = data.numTables;
    window._tableSize = data.tableSize;
  } catch (err) { console.error(err); }
}

async function loadGuests() {
  const search = document.getElementById('search-input').value;
  const category = document.getElementById('filter-cat').value;
  const attendingFilter = document.getElementById('filter-att').value;

  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  if (attendingFilter !== '') params.set('attending', attendingFilter);

  try {
    const res = await fetch(`/api/admin/guests?${params}`, { headers: adminHeaders() });
    const { data } = await res.json();
    renderGuestTable(data);
  } catch (err) { console.error(err); }
}

function renderGuestTable(guests) {
  const tbody = document.getElementById('guest-tbody');
  if (!guests.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:2rem">Không có kết quả</td></tr>`;
    return;
  }
  tbody.innerHTML = guests.map(g => `
    <tr>
      <td><strong>${g.name}</strong></td>
      <td style="color:var(--mid);font-size:0.8rem">${g.phone}</td>
      <td><span style="font-size:0.74rem;padding:0.18rem 0.5rem;background:var(--light);border:1px solid var(--gold-light)">${g.category}</span></td>
      <td style="text-align:center">${g.guests}</td>
      <td><span class="badge badge-${g.attending ? 'yes' : 'no'}">${g.attending ? '✓ Có' : '✗ Không'}</span></td>
      <td style="text-align:center;font-weight:500">${g.table ? 'Bàn ' + g.table : '—'}</td>
      <td style="color:var(--mid);font-size:0.78rem">${g.dietary || '—'}</td>
      <td><button class="btn-danger" onclick="deleteGuest('${g._id}')">Xóa</button></td>
    </tr>`).join('');
}

async function deleteGuest(id) {
  if (!confirm('Xóa khách này? / Delete this guest?')) return;
  try {
    await fetch(`/api/admin/guest/${id}`, { method: 'DELETE', headers: adminHeaders() });
    toast('Đã xóa khách');
    refreshAdmin();
  } catch (err) {
    toast('Không thể xóa');
  }
}

async function autoSeatAll() {
  try {
    const res = await fetch('/api/admin/auto-seat', { method: 'POST', headers: adminHeaders() });
    const data = await res.json();
    toast(data.message || 'Đã xếp chỗ tự động!');
    refreshAdmin();
    renderSeatingGrid();
  } catch (err) {
    toast('Không thể xếp chỗ');
  }
}

function showAdminTab(tab) {
  ['guests', 'seating', 'categories'].forEach(t => {
    document.getElementById('admin-tab-' + t).style.display = t === tab ? 'block' : 'none';
    document.getElementById('tab-' + t).className = t === tab ? 'btn btn-primary' : 'btn btn-outline';
  });
  if (tab === 'seating') renderSeatingGrid();
  if (tab === 'categories') renderCategories();
}

function renderSeatingGrid() {
  const grid = document.getElementById('seating-grid');
  const breakdown = window._seatingBreakdown || [];
  const numTables = window._numTables || 15;
  const tableSize = window._tableSize || 10;
  const byTable = {};
  breakdown.forEach(t => { byTable[t._id] = t; });

  let html = '';
  for (let t = 1; t <= numTables; t++) {
    const info = byTable[t];
    const total = info ? info.total : 0;
    const names = info ? info.guests.map(g => `<li>${g.name}${g.count > 1 ? ` +${g.count - 1}` : ''}</li>`).join('') : '';
    const open = tableSize - total;
    html += `<div class="table-card">
      <h4>Bàn ${t} <span>${total}/${tableSize}</span></h4>
      <ul class="seat-list">${names || '<li class="empty">Chưa có khách</li>'}${open > 0 ? `<li class="empty">${open} chỗ trống</li>` : ''}</ul>
    </div>`;
  }
  grid.innerHTML = html;
}

function renderCategories() {
  const div = document.getElementById('cat-breakdown');
  const breakdown = window._catBreakdown || [];
  const byCat = {};
  breakdown.forEach(c => { byCat[c._id] = c; });

  div.innerHTML = CATEGORIES.map(c => {
    const info = byCat[c] || { total: 0, attending: 0, declined: 0 };
    const pct = info.total ? Math.round((info.attending / info.total) * 100) : 0;
    return `<div class="cat-row">
      <div>
        <div class="cat-row-name">${c}</div>
        <div class="cat-row-sub">${info.total} RSVP</div>
      </div>
      <div class="cat-stats">
        <div class="cat-stat"><div class="cat-stat-num" style="color:var(--sage)">${info.attending}</div><div class="cat-stat-lbl">Tham dự</div></div>
        <div class="cat-stat"><div class="cat-stat-num" style="color:var(--rose)">${info.declined}</div><div class="cat-stat-lbl">Vắng</div></div>
        <div class="cat-stat"><div class="cat-stat-num" style="color:var(--gold-dark)">${pct}%</div><div class="cat-stat-lbl">Tỉ lệ</div></div>
      </div>
      <div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

function exportCSV() {
  const url = '/api/admin/export';
  fetch(url, { headers: adminHeaders() })
    .then(res => res.blob())
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'roselyn-an-guests.csv';
      a.click();
      toast('Đã xuất CSV!');
    })
    .catch(() => toast('Không thể xuất CSV'));
}

// ─── TOAST ──────────────────────────────────────────────────────────────────
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
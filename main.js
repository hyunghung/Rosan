// ─── CONFIG ─────────────────────────────────────────────────────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyBAkbzs9pmXLP3w8o9DQrqmagDW7Kt35T_dLlFwOdu2IfUmgHY1o94PeBpSNeZDWvk/exec';

const CATEGORIES = {
  vi: ["Họ hàng Cô dâu","Họ hàng Chú rể","Bạn bè Cô dâu","Bạn bè Chú rể","TNTT","Cộng đoàn / Parish","Đồng nghiệp","Hàng xóm","Bạn chung đôi","Khác"],
  en: ["Bride's Family","Groom's Family","Bride's Friends","Groom's Friends","TNTT / Youth Group","Parish / Community","Coworkers","Neighbors","Mutual Friends","Other"]
};

// Photo gallery — add/remove/reorder file paths here. Drop the actual image
// files into pictures/ (same filenames) and the carousel picks them up
// automatically, no other code changes needed.
const GALLERY_IMAGES = [
  'pictures/14bdf07cc5bd4b8a66b579e07c709ebe.jpg',
  'pictures/1F8F44D7-25B1-4856-A491-AB1FF456737B.jpg',
  'pictures/40B5566C-88EC-4557-B6E6-63FAB5D27C04.jpg',
  'pictures/78797911126__59EBF361-2D44-44C6-9AB5-7C5A5978ACB7.jpg',
  'pictures/78797966150__3EFD31A0-A32F-40EF-BFCC-370FD1F17745.jpg',
  'pictures/8689053de6325513ae0a99fff0692850.jpg',
  'pictures/BC1D752B-EED2-4730-BE88-BBF6895AAC4F.jpg',
  'pictures/E35C9844-EF5F-4026-8C91-81C4968F2C37.jpg',
  'pictures/IMG_0528.jpg',
  'pictures/IMG_0553.jpg',
  'pictures/IMG_0561.jpg',
  'pictures/IMG_0750.jpg',
  'pictures/IMG_0913.jpg',
  'pictures/IMG_0920.jpg',
  'pictures/IMG_0928.jpg',
  'pictures/IMG_0939.jpg',
  'pictures/IMG_0941.jpg',
  'pictures/IMG_0951.jpg',
  'pictures/IMG_1605.jpg',
  'pictures/IMG_1630.jpg',
  'pictures/IMG_1956.jpg',
  'pictures/IMG_1958.jpg',
  'pictures/IMG_1966.jpg',
  'pictures/IMG_1968.jpg',
  'pictures/IMG_1971.jpg',
  'pictures/IMG_1973.jpg',
  'pictures/IMG_1986.jpg',
  'pictures/IMG_2003.jpg',
  'pictures/IMG_2010.jpg',
  'pictures/IMG_2026.jpg',
  'pictures/IMG_2027.jpg',
  'pictures/IMG_2029.jpg',
  'pictures/IMG_2034.jpg',
  'pictures/IMG_2035.jpg',
  'pictures/IMG_2039.jpg',
  'pictures/IMG_2044.jpg',
  'pictures/IMG_2058.jpg',
  'pictures/IMG_2063.jpg',
  'pictures/IMG_2072.jpg',
  'pictures/IMG_2074.jpg',
  'pictures/IMG_2080.jpg',
  'pictures/IMG_2085.jpg',
  'pictures/IMG_2224.jpg',
  'pictures/IMG_2241.jpg',
  'pictures/IMG_2454.jpg',
  'pictures/IMG_2461.jpg',
  'pictures/IMG_2466.jpg',
  'pictures/IMG_2496.jpg',
  'pictures/IMG_2516.jpg',
  'pictures/IMG_2543.jpg',
  'pictures/IMG_2608.jpg',
  'pictures/IMG_2623.jpg',
  'pictures/IMG_2646.jpg',
  'pictures/IMG_2649.jpg',
  'pictures/IMG_2758.jpg',
  'pictures/IMG_2760.jpg',
  'pictures/IMG_2789.jpg',
  'pictures/IMG_2897.jpg',
  'pictures/IMG_2955.jpg',
  'pictures/IMG_2958.jpg',
  'pictures/IMG_3017.jpg',
  'pictures/IMG_3134.jpg',
  'pictures/IMG_3135.jpg',
  'pictures/IMG_3144.jpg',
  'pictures/IMG_3150.jpg',
  'pictures/IMG_3155.jpg',
  'pictures/IMG_3187.jpg',
  'pictures/IMG_3192.jpg',
  'pictures/IMG_3200.jpg',
  'pictures/IMG_3214.jpg',
  'pictures/IMG_3217.jpg',
  'pictures/IMG_3223.jpg',
  'pictures/IMG_3226.jpg',
  'pictures/IMG_3282.jpg',
  'pictures/IMG_3330.jpg',
  'pictures/IMG_3338.jpg',
  'pictures/IMG_3339.jpg',
  'pictures/IMG_3342.jpg',
  'pictures/IMG_3363.jpg',
  'pictures/IMG_3378.jpg',
  'pictures/IMG_3383.jpg',
  'pictures/IMG_3389.jpg',
  'pictures/IMG_3391.jpg',
  'pictures/IMG_3454.jpg',
  'pictures/IMG_3465.jpg',
  'pictures/IMG_3575.jpg',
  'pictures/IMG_3606.jpg',
  'pictures/IMG_3621.jpg',
  'pictures/IMG_3626.jpg',
  'pictures/IMG_3649.jpg',
  'pictures/IMG_3657.jpg',
  'pictures/IMG_3661.jpg',
  'pictures/IMG_3662.jpg',
  'pictures/IMG_3682.jpg',
  'pictures/IMG_3697.jpg',
  'pictures/IMG_3703.jpg',
  'pictures/IMG_3709.jpg',
  'pictures/IMG_3714.jpg',
  'pictures/IMG_3719.jpg',
  'pictures/IMG_3747.jpg',
  'pictures/IMG_3748.jpg',
  'pictures/IMG_4618.jpg',
  'pictures/IMG_5112.jpg',
  'pictures/IMG_5121.jpg',
  'pictures/IMG_5300.jpg',
  'pictures/IMG_5477.jpg',
  'pictures/IMG_6710.jpg',
  'pictures/IMG_6846.jpg',
  'pictures/IMG_6854.jpg',
  'pictures/IMG_7520.jpg',
  'pictures/IMG_7523.jpg',
  'pictures/IMG_7524.jpg',
  'pictures/IMG_7532.jpg',
  'pictures/IMG_7537.jpg',
  'pictures/IMG_7553.jpg',
  'pictures/IMG_7555.jpg',
  'pictures/IMG_7563.jpg',
  'pictures/IMG_8171.jpg',
  'pictures/IMG_8351.jpg',
  'pictures/IMG_8583.jpg',
  'pictures/IMG_8614.jpg',
  'pictures/IMG_8616.jpg',
  'pictures/IMG_8695.jpg',
  'pictures/IMG_8720.jpg',
  'pictures/IMG_8839.jpg',
  'pictures/IMG_9238.jpg',
  'pictures/IMG_9277.jpg',
  'pictures/IMG_9584.jpg',
  'pictures/IMG_9587.jpg',
  'pictures/IMG_9717.jpg',
  'pictures/a826ccef2ac3ad8164df93e9a53d90bc.jpg',
  'pictures/att.gvTfe3cQHFmVsRoJqDthO9YAokI4YhovyDPU6ZGz5Kc.jpg',
  'pictures/att.wnNvxp3pyIGdxcpJRWYDscq-uL8a7jvjTjxHuinT2cw.jpg'
];
const GALLERY_INTERVAL_MS = 4500;

let galleryIndex = 0;
let galleryTimer = null;

let selectedCategory = null;
let attending = null;
let adminPassword = null;
let currentLang = 'vi';
let adminPollInterval = null;

// MUSIC
const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");

window.addEventListener("load", () => {
    const savedTime = localStorage.getItem("musicTime");
    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    toggleBtn.style.display = "flex";
});

document.addEventListener("click", startMusic, { once: true });

function startMusic() {
    music.volume = 0.01;
    music.play().catch(err => console.log(err));
}

music.addEventListener("timeupdate", () => {
    localStorage.setItem("musicTime", music.currentTime);
});

const musicIcon = document.getElementById("music-icon");

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicIcon.innerHTML = "♫";
    } else {
        music.pause();
        musicIcon.innerHTML = "🔇";
    }
}
// ─── LANGUAGE TOGGLE ────────────────────────────────────────────────────────
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // swap textContent for all data-vi/data-en elements
  document.querySelectorAll('[data-vi]').forEach(el => {
    el.textContent = lang === 'vi' ? el.dataset.vi : el.dataset.en;
  });

  // swap placeholders
  document.querySelectorAll('[data-vi-placeholder]').forEach(el => {
    el.placeholder = lang === 'vi' ? el.dataset.viPlaceholder : el.dataset.enPlaceholder;
  });

  // toggle button state
  document.getElementById('lang-vi').classList.toggle('active', lang === 'vi');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');

  // rebuild category grid so labels translate
  buildCategoryGrid();
  buildFilterCategoryDropdown();

  // if admin dashboard is open, re-render its category-dependent views
  if (adminPassword) {
    loadGuests();
    if (window._catBreakdown) renderCategories();
  }
}

// ─── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildCategoryGrid();
  buildFilterCategoryDropdown();
  startCountdown();
  buildGallery();
  initIntro();
  setLanguage('en');

  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });

  if (window.location.hash === '#rsvp') showPage('rsvp');
});

// ─── INTRO ENVELOPE ─────────────────────────────────────────────────────────
function initIntro() {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  // guests who already opened the invitation this session skip straight in
  if (sessionStorage.getItem('introSeen') === 'true') {
    overlay.classList.add('hidden');
    return;
  }
  document.documentElement.classList.add('intro-active');
}

function openEnvelope() {
  const envelope = document.getElementById('envelope');
  const card = document.getElementById('invitation-card');
  if (!envelope || envelope.classList.contains('open')) return;

  envelope.classList.add('open');
  setTimeout(() => card.classList.add('show'), 450);
}

function enterSite(event) {
  if (event) event.stopPropagation();
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  sessionStorage.setItem('introSeen', 'true');
  overlay.classList.add('exit');
  document.documentElement.classList.remove('intro-active');

  setTimeout(() => overlay.classList.add('hidden'), 850);
}

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

// ─── GALLERY ────────────────────────────────────────────────────────────────
function buildGallery() {
  const stage = document.getElementById('gallery-stage');
  if (!stage || !GALLERY_IMAGES.length) return;

  GALLERY_IMAGES.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide' + (i === 0 ? ' active' : '');

    const backdrop = document.createElement('div');
    backdrop.className = 'gallery-backdrop';
    backdrop.style.backgroundImage = `url('${src}')`;
    slide.appendChild(backdrop);

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Roselyn & An — photo ${i + 1}`;
    img.className = 'gallery-photo';
    img.loading = i === 0 ? 'eager' : 'lazy';
    slide.appendChild(img);

    stage.appendChild(slide);
  });

  // pause autoplay while the person is looking closely / interacting
  stage.addEventListener('mouseenter', stopGalleryAutoplay);
  stage.addEventListener('mouseleave', startGalleryAutoplay);

  // basic swipe support for mobile
  let touchStartX = 0;
  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    stopGalleryAutoplay();
  }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 40) galleryPrev();
    else if (dx < -40) galleryNext();
    else startGalleryAutoplay();
  }, { passive: true });

  startGalleryAutoplay();
}

function showGallerySlide(index) {
  const imgs = document.querySelectorAll('.gallery-slide');
  if (!imgs.length) return;
  galleryIndex = ((index % imgs.length) + imgs.length) % imgs.length;
  imgs.forEach((img, i) => img.classList.toggle('active', i === galleryIndex));
}

function galleryNext() {
  showGallerySlide(galleryIndex + 1);
  startGalleryAutoplay();
}

function galleryPrev() {
  showGallerySlide(galleryIndex - 1);
  startGalleryAutoplay();
}

function goToGallerySlide(i) {
  showGallerySlide(i);
  startGalleryAutoplay();
}

function startGalleryAutoplay() {
  stopGalleryAutoplay();
  galleryTimer = setInterval(() => showGallerySlide(galleryIndex + 1), GALLERY_INTERVAL_MS);
}

function stopGalleryAutoplay() {
  if (galleryTimer) {
    clearInterval(galleryTimer);
    galleryTimer = null;
  }
}

// ─── NAVIGATION ─────────────────────────────────────────────────────────────
function showPage(p) {
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(x => x.classList.remove('active'));
  document.getElementById('page-' + p).classList.add('active');
  document.getElementById('nav-' + p).classList.add('active');
  document.getElementById('nav-links').classList.remove('open');
  if (p === 'admin' && adminPassword) {
    refreshAdmin();
    startAdminPolling();
  } else {
    stopAdminPolling();
  }
  window.scrollTo(0, 0);
}

// Keeps the admin dashboard (stats + seating chart) live-updated while it's open,
// so new RSVPs and seat assignments show up without a manual refresh.
function startAdminPolling() {
  stopAdminPolling();
  adminPollInterval = setInterval(() => {
    if (adminPassword) refreshAdmin();
  }, 15000);
}

function stopAdminPolling() {
  if (adminPollInterval) {
    clearInterval(adminPollInterval);
    adminPollInterval = null;
  }
}

// ─── CATEGORY GRID ──────────────────────────────────────────────────────────
function buildCategoryGrid() {
  const grid = document.getElementById('category-grid');
  const prevSelected = selectedCategory;
  grid.innerHTML = '';
  const cats = CATEGORIES[currentLang];
  const catsVi = CATEGORIES.vi;
  cats.forEach((c, i) => {
    const viName = catsVi[i]; // always store Vietnamese name as canonical value
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cat-btn';
    b.textContent = c;
    if (prevSelected === viName) b.classList.add('selected');
    b.onclick = () => {
      selectedCategory = viName;
      document.getElementById('rsvp-category').value = viName;
      grid.querySelectorAll('.cat-btn').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
    };
    grid.appendChild(b);
  });
}

function buildFilterCategoryDropdown() {
  const sel = document.getElementById('filter-cat');
  if (!sel) return;
  const prevValue = sel.value;
  // Rebuild all options after the first (the "All Groups" placeholder, kept as-is)
  sel.querySelectorAll('option[data-cat-option]').forEach(o => o.remove());
  CATEGORIES.vi.forEach((viName, i) => {
    const o = document.createElement('option');
    o.value = viName; // canonical value used for filtering/lookup, always Vietnamese
    o.textContent = CATEGORIES[currentLang][i]; // label shown, translated
    o.dataset.catOption = 'true';
    sel.appendChild(o);
  });
  sel.value = prevValue;
}

// Returns the translated display label for a canonical (Vietnamese) category name.
function categoryLabel(viName) {
  const i = CATEGORIES.vi.indexOf(viName);
  return i === -1 ? viName : CATEGORIES[currentLang][i];
}

// ─── PLUS-ONE GUEST NAMES ───────────────────────────────────────────────────
// Rebuilds the "additional guest" name inputs whenever the plus-ones dropdown
// changes, and keeps the hidden #rsvp-guests total (self + plus-ones) in sync
// so the rest of the submit/lookup pipeline needs no other changes.
function updatePlusOneFields() {
  const n = parseInt(document.getElementById('rsvp-plusones').value, 10) || 0;
  const wrap = document.getElementById('plusone-names-wrap');
  const existing = {};
  wrap.querySelectorAll('.plusone-name-input').forEach(input => {
    existing[input.dataset.index] = input.value;
  });

  wrap.innerHTML = '';
  if (n > 0) {
    wrap.style.display = 'block';
    for (let i = 1; i <= n; i++) {
      const guestNumber = i + 1; // guest 1 is the person filling out the form
      const field = document.createElement('div');
      field.style.marginTop = i === 1 ? '0' : '0.9rem';

      const label = document.createElement('label');
      label.setAttribute('data-vi', `Tên khách ${guestNumber}`);
      label.setAttribute('data-en', `Guest ${guestNumber} Name`);
      label.textContent = currentLang === 'vi' ? `Tên khách ${guestNumber}` : `Guest ${guestNumber} Name`;

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'plusone-name-input';
      input.dataset.index = String(i);
      input.setAttribute('data-vi-placeholder', 'Tên đầy đủ');
      input.setAttribute('data-en-placeholder', 'Full name');
      input.placeholder = currentLang === 'vi' ? 'Tên đầy đủ' : 'Full name';
      input.required = true;
      if (existing[i]) input.value = existing[i];

      field.appendChild(label);
      field.appendChild(input);
      wrap.appendChild(field);
    }
  } else {
    wrap.style.display = 'none';
  }

  document.getElementById('rsvp-guests').value = String(1 + n);
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
// Formats digits into (___) ___-____ as the user types. No country code needed.
function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const len = digits.length;
  if (len === 0) return '';
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatPhoneField(e) {
  e.target.value = formatPhoneNumber(e.target.value);
}

// Requires a complete US-style number: (XXX) XXX-XXXX — exactly 10 digits.
function validatePhone(raw) {
  const digits = raw.replace(/\D/g, '');
  return digits.length === 10;
}

async function submitRSVP(e) {
  e.preventDefault();
  const errEl = document.getElementById('rsvp-error');
  errEl.style.display = 'none';

  const name     = document.getElementById('rsvp-name').value.trim();
  const phone    = document.getElementById('rsvp-phone').value.trim();
  const guests   = document.getElementById('rsvp-guests').value;
  const dietary  = document.getElementById('rsvp-dietary').value.trim();
  const plusOneInputs = [...document.querySelectorAll('.plusone-name-input')];
  const plusOneNames  = plusOneInputs.map(i => i.value.trim());

  // ── Client-side validation ──
  if (!name) {
    return showRsvpError(
      currentLang === 'vi'
        ? 'Vui lòng nhập họ và tên.'
        : 'Please enter your full name.'
    );
  }
  if (name.length < 2) {
    return showRsvpError(
      currentLang === 'vi'
        ? 'Tên phải có ít nhất 2 ký tự.'
        : 'Name must be at least 2 characters.'
    );
  }
  if (!phone) {
    return showRsvpError(
      currentLang === 'vi'
        ? 'Vui lòng nhập số điện thoại.'
        : 'Please enter your phone number.'
    );
  }
  if (!validatePhone(phone)) {
    return showRsvpError(
      currentLang === 'vi'
        ? 'Số điện thoại không hợp lệ. Vui lòng nhập đầy đủ 10 số theo dạng (XXX) XXX-XXXX.'
        : 'Invalid phone number. Please enter all 10 digits as (XXX) XXX-XXXX.'
    );
  }
  if (!selectedCategory) {
    return showRsvpError(
      currentLang === 'vi'
        ? 'Vui lòng chọn nhóm khách.'
        : 'Please select your guest group.'
    );
  }
  if (attending === null) {
    return showRsvpError(
      currentLang === 'vi'
        ? 'Vui lòng xác nhận tham dự.'
        : 'Please confirm your attendance.'
    );
  }
  if (plusOneNames.some(n => !n)) {
    return showRsvpError(
      currentLang === 'vi'
        ? 'Vui lòng nhập tên cho mỗi khách đi cùng.'
        : 'Please enter a name for each additional guest.'
    );
  }
  if (attending && !dietary) {
    return showRsvpError(
      currentLang === 'vi'
        ? 'Vui lòng điền yêu cầu ăn uống. Nếu không có, ghi "Không có".'
        : 'Please fill in dietary info. If none, write "None".'
    );
  }

  // Fold plus-one names into the dietary/notes field with a clear "Guests:" prefix,
  // since that's the one free-text field the spreadsheet backend already stores —
  // lookupRSVP() parses this same prefix back out to show it as its own line.
  const finalDietary = plusOneNames.length
    ? `Guests: ${plusOneNames.join(', ')}${dietary ? ' | Notes: ' + dietary : ''}`
    : (dietary || 'N/A');

  const submitBtn = document.getElementById('rsvp-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = currentLang === 'vi' ? 'Đang gửi...' : 'Submitting...';

  try {
    const params = new URLSearchParams({
      action:    'submit',
      name,
      phone,
      category:  selectedCategory,
      guests,
      attending: attending.toString(),
      dietary:   finalDietary
    });

    const res  = await fetch(`${APPS_SCRIPT_URL}?${params}`, { redirect: 'follow' });
    const data = await res.json();

    if (!data.ok) {
      showRsvpError(data.error || (currentLang === 'vi' ? 'Có lỗi xảy ra.' : 'Something went wrong.'));
      return;
    }

    document.getElementById('rsvp-form-wrap').style.display = 'none';
    document.getElementById('rsvp-success').style.display   = 'block';
    document.getElementById('success-title').textContent    = currentLang === 'vi' ? 'Cảm ơn bạn!' : 'Thank You!';
    document.getElementById('success-msg').textContent      = data.message;
    document.getElementById('success-seat').innerHTML       = data.data.table
      ? `<div class="seat-badge">${currentLang === 'vi' ? 'Bàn số' : 'Table'} ${data.data.table}</div>`
      : '';
  } catch (err) {
    showRsvpError(
      currentLang === 'vi'
        ? 'Không thể kết nối. Vui lòng thử lại.'
        : 'Could not connect. Please try again.'
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = currentLang === 'vi' ? 'Gửi xác nhận' : 'Submit RSVP';
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
  updatePlusOneFields();
  document.getElementById('rsvp-form-wrap').style.display = 'block';
  document.getElementById('rsvp-success').style.display = 'none';
}

// ─── LOOKUP ─────────────────────────────────────────────────────────────────
async function lookupRSVP() {
  const phone    = document.getElementById('lookup-phone').value.trim();
  const resultEl = document.getElementById('lookup-result');

  if (!phone) {
    toast(currentLang === 'vi' ? 'Vui lòng nhập số điện thoại' : 'Please enter a phone number');
    return;
  }
  if (!validatePhone(phone)) {
    resultEl.innerHTML = `<div class="error-msg">${currentLang === 'vi' ? 'Số điện thoại không hợp lệ. Vui lòng nhập đầy đủ 10 số.' : 'Invalid phone number. Please enter all 10 digits.'}</div>`;
    return;
  }

  resultEl.innerHTML = `<div class="loading-msg">${currentLang === 'vi' ? 'Đang tìm kiếm...' : 'Searching...'}</div>`;

  try {
    const params = new URLSearchParams({ action: 'lookup', phone });
    const res    = await fetch(`${APPS_SCRIPT_URL}?${params}`, { redirect: 'follow' });
    const data   = await res.json();

    if (!data.ok) {
      resultEl.innerHTML = `<div class="error-msg">${data.error || (currentLang === 'vi' ? 'Không tìm thấy RSVP' : 'No RSVP found')}</div>`;
      return;
    }

    const g = data.data;
    const isVi = currentLang === 'vi';

    // The stored "dietary" field may carry a "Guests: A, B | Notes: ..." prefix
    // (see submitRSVP) — split it back apart for display.
    let extraGuests = '';
    let dietaryNote = g.dietary || '';
    const guestsMatch = dietaryNote.match(/^Guests:\s*(.+?)(?:\s*\|\s*Notes:\s*(.*))?$/s);
    if (guestsMatch) {
      extraGuests = guestsMatch[1].trim();
      dietaryNote = (guestsMatch[2] || '').trim();
    }

    resultEl.innerHTML = `
      <div class="rsvp-result">
        <div class="guest-name">${g.name}</div>
        <div class="info-row">
          <span class="info-label">${isVi ? 'Nhóm' : 'Group'}</span>
          <span>${categoryLabel(g.category)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${isVi ? 'Tham dự' : 'Attending'}</span>
          <span class="badge badge-${g.attending ? 'yes' : 'no'}">
            ${g.attending ? (isVi ? '✓ Tham dự' : '✓ Attending') : (isVi ? '✗ Vắng mặt' : '✗ Not Attending')}
          </span>
        </div>
        ${g.attending ? `<div class="info-row"><span class="info-label">${isVi ? 'Số người' : 'Guests'}</span><span>${g.guests} ${isVi ? 'người' : 'guests'}</span></div>` : ''}
        ${extraGuests  ? `<div class="info-row"><span class="info-label">${isVi ? 'Khách đi cùng' : 'Additional Guests'}</span><span>${extraGuests}</span></div>` : ''}
        ${g.table     ? `<div class="info-row"><span class="info-label">${isVi ? 'Bàn số' : 'Table'}</span><span style="font-weight:500;font-size:1rem">${g.table}</span></div>` : ''}
        ${dietaryNote && dietaryNote !== 'N/A' ? `<div class="info-row"><span class="info-label">${isVi ? 'Yêu cầu ăn' : 'Dietary'}</span><span>${dietaryNote}</span></div>` : ''}
        <div class="info-row">
          <span class="info-label">${isVi ? 'Ngày gửi' : 'Submitted'}</span>
          <span>${new Date(g.submittedAt).toLocaleDateString(isVi ? 'vi-VN' : 'en-US')}</span>
        </div>
      </div>`;
  } catch (err) {
    resultEl.innerHTML = `<div class="error-msg">${currentLang === 'vi' ? 'Không thể kết nối. Vui lòng thử lại.' : 'Could not connect. Please try again.'}</div>`;
  }
}

// ─── ADMIN ──────────────────────────────────────────────────────────────────
async function unlockAdmin() {
  const pass = document.getElementById('admin-pass').value;
  try {
    const res = await fetch('/api/admin/stats', { headers: { 'x-admin-password': pass } });
    if (!res.ok) {
      toast(currentLang === 'vi' ? 'Mật khẩu không đúng' : 'Incorrect password');
      return;
    }
    adminPassword = pass;
    document.getElementById('admin-locked').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';
    refreshAdmin();
    startAdminPolling();
  } catch (err) {
    toast(currentLang === 'vi' ? 'Không thể kết nối máy chủ' : 'Could not connect to server');
  }
}

function adminHeaders() {
  return { 'x-admin-password': adminPassword, 'Content-Type': 'application/json' };
}

async function refreshAdmin() {
  await loadStats();
  await loadGuests();
  const seatingTab = document.getElementById('admin-tab-seating');
  if (seatingTab && seatingTab.style.display !== 'none') renderSeatingGrid();
  const catTab = document.getElementById('admin-tab-categories');
  if (catTab && catTab.style.display !== 'none') renderCategories();
}

async function loadStats() {
  try {
    const res = await fetch('/api/admin/stats', { headers: adminHeaders() });
    const { data } = await res.json();
    const isVi = currentLang === 'vi';
    const L = isVi
      ? ['Tổng RSVP', 'Tham dự', 'Tổng khách', 'Vắng mặt', 'Đã xếp chỗ', 'Số bàn']
      : ['Total RSVPs', 'Attending', 'Total Guests', 'Declined', 'Seated', 'Tables'];
    document.getElementById('admin-stats').innerHTML = `
      <div class="stat-card"><div class="stat-num">${data.total}</div><div class="stat-label">${L[0]}</div></div>
      <div class="stat-card"><div class="stat-num">${data.attending}</div><div class="stat-label">${L[1]}</div></div>
      <div class="stat-card"><div class="stat-num">${data.totalGuests}</div><div class="stat-label">${L[2]}</div></div>
      <div class="stat-card"><div class="stat-num">${data.declined}</div><div class="stat-label">${L[3]}</div></div>
      <div class="stat-card"><div class="stat-num">${data.seated}</div><div class="stat-label">${L[4]}</div></div>
      <div class="stat-card"><div class="stat-num">${data.numTables}</div><div class="stat-label">${L[5]}</div></div>`;
    window._catBreakdown = data.catBreakdown;
    window._seatingBreakdown = data.seatingBreakdown;
    window._numTables = data.numTables;
    window._tableSize = data.tableSize;
    const updatedEl = document.getElementById('admin-updated');
    if (updatedEl) {
      const timeStr = new Date().toLocaleTimeString(isVi ? 'vi-VN' : 'en-US');
      updatedEl.textContent = (isVi ? 'Cập nhật lúc ' : 'Last updated ') + timeStr;
    }
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
  const isVi = currentLang === 'vi';
  if (!guests.length) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--mid);padding:2rem">${isVi ? 'Không có kết quả' : 'No results'}</td></tr>`;
    return;
  }
  tbody.innerHTML = guests.map(g => `
    <tr>
      <td><strong>${g.name}</strong></td>
      <td style="color:var(--mid);font-size:0.8rem">${g.phone}</td>
      <td><span style="font-size:0.74rem;padding:0.18rem 0.5rem;background:var(--light);border:1px solid var(--gold-light)">${categoryLabel(g.category)}</span></td>
      <td style="text-align:center">${g.guests}</td>
      <td><span class="badge badge-${g.attending ? 'yes' : 'no'}">${g.attending ? (isVi ? '✓ Có' : '✓ Yes') : (isVi ? '✗ Không' : '✗ No')}</span></td>
      <td style="text-align:center;font-weight:500">${g.table ? (isVi ? 'Bàn ' : 'Table ') + g.table : '—'}</td>
      <td style="color:var(--mid);font-size:0.78rem">${g.dietary || '—'}</td>
      <td><button class="btn-danger" onclick="deleteGuest('${g._id}')">${isVi ? 'Xóa' : 'Delete'}</button></td>
    </tr>`).join('');
}

async function deleteGuest(id) {
  const confirmMsg = currentLang === 'vi' ? 'Xóa khách này?' : 'Delete this guest?';
  if (!confirm(confirmMsg)) return;
  try {
    await fetch(`/api/admin/guest/${id}`, { method: 'DELETE', headers: adminHeaders() });
    toast(currentLang === 'vi' ? 'Đã xóa khách' : 'Guest deleted');
    refreshAdmin();
  } catch (err) {
    toast(currentLang === 'vi' ? 'Không thể xóa' : 'Could not delete');
  }
}

async function autoSeatAll() {
  try {
    const res = await fetch('/api/admin/auto-seat', { method: 'POST', headers: adminHeaders() });
    await res.json();
    toast(currentLang === 'vi' ? 'Đã xếp chỗ tự động!' : 'Auto-seating complete!');
    refreshAdmin();
    renderSeatingGrid();
  } catch (err) {
    toast(currentLang === 'vi' ? 'Không thể xếp chỗ' : 'Could not assign seats');
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
  const isVi = currentLang === 'vi';
  const byTable = {};
  breakdown.forEach(t => { byTable[t._id] = t; });

  let html = '';
  for (let t = 1; t <= numTables; t++) {
    const info = byTable[t];
    const total = info ? info.total : 0;
    const names = info ? info.guests.map(g => `<li>${g.name}${g.count > 1 ? ` +${g.count - 1}` : ''}</li>`).join('') : '';
    const open = tableSize - total;
    const emptyLabel = isVi ? 'Chưa có khách' : 'No guests yet';
    const openLabel = isVi ? `${open} chỗ trống` : `${open} seats open`;
    html += `<div class="table-card">
      <h4>${isVi ? 'Bàn' : 'Table'} ${t} <span>${total}/${tableSize}</span></h4>
      <ul class="seat-list">${names || `<li class="empty">${emptyLabel}</li>`}${open > 0 ? `<li class="empty">${openLabel}</li>` : ''}</ul>
    </div>`;
  }
  grid.innerHTML = html;
}

function renderCategories() {
  const div = document.getElementById('cat-breakdown');
  const breakdown = window._catBreakdown || [];
  const byCat = {};
  breakdown.forEach(c => { byCat[c._id] = c; });
  const isVi = currentLang === 'vi';

  div.innerHTML = CATEGORIES.vi.map(viName => {
    const info = byCat[viName] || { total: 0, attending: 0, declined: 0 };
    const pct = info.total ? Math.round((info.attending / info.total) * 100) : 0;
    return `<div class="cat-row">
      <div>
        <div class="cat-row-name">${categoryLabel(viName)}</div>
        <div class="cat-row-sub">${info.total} RSVP</div>
      </div>
      <div class="cat-stats">
        <div class="cat-stat"><div class="cat-stat-num" style="color:var(--sage)">${info.attending}</div><div class="cat-stat-lbl">${isVi ? 'Tham dự' : 'Attending'}</div></div>
        <div class="cat-stat"><div class="cat-stat-num" style="color:var(--rose)">${info.declined}</div><div class="cat-stat-lbl">${isVi ? 'Vắng' : 'Declined'}</div></div>
        <div class="cat-stat"><div class="cat-stat-num" style="color:var(--gold-dark)">${pct}%</div><div class="cat-stat-lbl">${isVi ? 'Tỉ lệ' : 'Rate'}</div></div>
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
      toast(currentLang === 'vi' ? 'Đã xuất CSV!' : 'CSV exported!');
    })
    .catch(() => toast(currentLang === 'vi' ? 'Không thể xuất CSV' : 'Could not export CSV'));
}

// ─── TOAST ──────────────────────────────────────────────────────────────────
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
        }
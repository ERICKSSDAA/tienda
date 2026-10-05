'use strict';
window.BH = {
  products: [],
  settings: { usdRate: 3.7, freeShipping: 1500, shipping: 20 },
  $: id => document.getElementById(id),
  escape: value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  storage: {
    get(key, fallback) { try { const value = localStorage.getItem('bh_muestra_' + key); return value === null ? fallback : JSON.parse(value); } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem('bh_muestra_' + key, JSON.stringify(value)); } catch { /* Navegación privada o cuota: mantener el estado en memoria. */ } }
  },
  show(id) { const dialog = BH.$(id); if (!dialog.open) dialog.showModal(); },
  toast(message) { const box = BH.$('toast'); box.textContent = message; box.classList.add('show'); clearTimeout(BH.toastTimer); BH.toastTimer = setTimeout(() => box.classList.remove('show'), 3500); },
  image(url, alt, extra = '') {
    const safe = typeof url === 'string' && /^https:\/\//i.test(url) ? url : 'assets/product-placeholder.svg';
    return `<img src="${BH.escape(safe)}" alt="${BH.escape(alt)}" loading="lazy" ${extra}>`;
  },
  icons: {
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    user:'<circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
    cart:'<path d="M2 3h3l3 12h11l3-9H6M9 15l-1 3h12"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6"/>',
    phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4M11 19h2"/>',
    laptop:'<rect x="4" y="3" width="16" height="13" rx="1"/><path d="m4 16-2 4h20l-2-4M9 20h6"/>',
    monitor:'<rect x="2" y="3" width="20" height="14" rx="1"/><path d="M12 17v4M7 21h10"/>',
    gaming:'<path d="M7 7h10c4 0 5 11 3 12-2 1-4-3-5-3H9c-1 0-3 4-5 3-2-1-1-12 3-12ZM6 11h4M8 9v4M16 10h.01M18 13h.01"/>',
    audio:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="12" width="4" height="9" rx="2"/><rect x="17" y="12" width="4" height="9" rx="2"/>',
    keyboard:'<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M5 10h1m3 0h1m3 0h1m3 0h2M5 14h1m3 0h6m3 0h1"/>',
    truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/>',
    box:'<path d="m12 2 10 5v10l-10 5-10-5V7zM2 7l10 5 10-5M12 12v10M7 4.5l10 5v5"/>',
    star:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
    zap:'<path d="m13 2-9 12h7l-1 8 10-13h-8z"/>',
    menu:'<path d="M3 6h18M3 12h18M3 18h18"/>'
  },
  icon(name) { return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${BH.icons[name] || BH.icons.box}</svg>`; },
  renderIcons() { document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = BH.icon(el.dataset.icon); }); }
};
document.addEventListener('error', e => { if (e.target.tagName === 'IMG' && !e.target.dataset.fallback) { e.target.dataset.fallback = '1'; e.target.src = 'assets/product-placeholder.svg'; } }, true);

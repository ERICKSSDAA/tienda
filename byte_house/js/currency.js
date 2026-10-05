'use strict';
BH.currency = ['PEN','USD'].includes(BH.storage.get('currency','PEN')) ? BH.storage.get('currency','PEN') : 'PEN';
BH.money = (pen, forcePEN = false) => new Intl.NumberFormat('es-PE', {style:'currency', currency:forcePEN ? 'PEN' : BH.currency}).format(forcePEN || BH.currency === 'PEN' ? Number(pen) : Number(pen) / BH.settings.usdRate);
BH.currencyRefresh = () => {
  BH.$('freeTop').textContent = BH.money(BH.settings.freeShipping);
  BH.$('priceValue').textContent = BH.money(BH.filters.max);
  BH.renderProducts(); BH.renderCart();
  if (BH.$('detailDialog').open && BH.detailId) BH.detail(BH.detailId, true);
  if (BH.$('checkoutDialog').open) BH.renderCheckout();
};

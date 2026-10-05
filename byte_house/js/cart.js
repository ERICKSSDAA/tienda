'use strict';
{
 const saved = BH.storage.get('cart', []);
 BH.cart = Array.isArray(saved) ? saved.filter(x => x && Number.isInteger(x.id) && x.id > 0 && Number.isInteger(x.quantity) && x.quantity > 0 && x.quantity <= 20).filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i).slice(0,50) : [];
}
BH.saveCart = () => { BH.storage.set('cart',BH.cart); BH.renderCart(); };
BH.cartLines = () => BH.cart.map(item => ({...item, product: BH.products.find(p => p.id === item.id)}));
BH.totals = () => {
  const subtotalCents = BH.cartLines().reduce((sum, item) => sum + Math.round((item.product?.price || 0)*100)*item.quantity, 0);
  const shippingCents = subtotalCents === 0 || subtotalCents >= Math.round(BH.settings.freeShipping*100) ? 0 : Math.round(BH.settings.shipping*100);
  return {subtotal:subtotalCents/100, shipping:shippingCents/100, total:(subtotalCents+shippingCents)/100};
};
BH.cartValid = () => BH.cart.length > 0 && BH.cartLines().every(i => i.product && i.product.stock >= i.quantity);
BH.add = (id, quantity = 1) => {
  const p = BH.products.find(p => p.id === id); const current = BH.cart.find(i => i.id === id);
  if (!p || !Number.isInteger(quantity) || quantity < 1) return;
  if ((current?.quantity || 0)+quantity > Math.min(p.stock,20)) return BH.toast('No puedes agregar más unidades. Revisa el stock (máximo 20).');
  if (current) current.quantity += quantity; else BH.cart.push({id,quantity});
  BH.saveCart(); BH.toast(p.name+' agregado al carrito.');
};
BH.changeQuantity = (id, delta) => {
  const item = BH.cart.find(i=>i.id===id); const p = BH.products.find(p=>p.id===id); if (!item) return;
  const next = item.quantity + delta;
  if (next < 1) BH.cart = BH.cart.filter(i=>i.id!==id);
  else if (delta > 0 && (!p || next > Math.min(p.stock,20))) return BH.toast('No hay más unidades disponibles.');
  else item.quantity = next;
  BH.saveCart();
};
BH.summaryHTML = () => { const t=BH.totals(); return `<div class="summary-line"><span>Subtotal</span><span>${BH.money(t.subtotal)}</span></div><div class="summary-line"><span>Envío</span><span class="${t.shipping===0?'free':''}">${t.shipping===0?'Gratis':BH.money(t.shipping)}</span></div><div class="summary-line total"><span>Total</span><span>${BH.money(t.total)}</span></div>`; };
BH.renderCart = () => {
  BH.$('cartCount').textContent = BH.cart.reduce((s,i)=>s+i.quantity,0);
  BH.$('cartBtn').setAttribute('aria-label',`Abrir carrito, ${BH.$('cartCount').textContent} productos`);
  const lines = BH.cartLines(); const t=BH.totals();
  BH.$('cartItems').innerHTML = lines.length ? lines.map(i => `<article class="cart-item">${BH.image(i.product?.img,i.product?.name || 'Producto no disponible')}<div><h3>${BH.escape(i.product?.name || 'Producto no disponible')}</h3><span class="item-price">${i.product ? BH.money(i.product.price):'Retira este producto'}</span><div class="quantity"><button data-quantity="${i.id}" data-delta="-1" aria-label="Reducir cantidad de ${BH.escape(i.product?.name)}">−</button><span>${i.quantity}</span><button data-quantity="${i.id}" data-delta="1" aria-label="Aumentar cantidad de ${BH.escape(i.product?.name)}" ${!i.product || i.quantity>=Math.min(i.product.stock,20)?'disabled':''}>+</button></div>${i.product && i.quantity>i.product.stock?'<p class="warning">Stock disponible: '+i.product.stock+'</p>':''}</div><button class="remove-item" data-remove="${i.id}" aria-label="Eliminar ${BH.escape(i.product?.name)}">×</button></article>`).join('') : '<div class="empty-state"><h3>Tu próximo upgrade empieza aquí.</h3><p>Agrega tus favoritos al carrito.</p></div>';
  BH.$('shippingProgress').innerHTML = lines.length ? `<div class="shipping-progress"><p>${t.subtotal >= BH.settings.freeShipping ? '¡Tu pedido tiene envío gratis!' : 'Te faltan <b>'+BH.money(BH.settings.freeShipping-t.subtotal)+'</b> para envío gratis.'}</p><progress value="${Math.min(t.subtotal,BH.settings.freeShipping)}" max="${BH.settings.freeShipping}"></progress></div>` : '';
  BH.$('cartSummary').innerHTML = lines.length ? BH.summaryHTML() : '';
  BH.$('checkoutBtn').disabled = !BH.cartValid();
};

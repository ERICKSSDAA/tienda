'use strict';
// Resumen visual: no solicita datos personales, no envía ni almacena pedidos.
BH.renderCheckout = () => {
  BH.$('checkoutSummary').innerHTML = BH.cartLines().map(i => `<div class="checkout-item"><span>${i.quantity} × ${BH.escape(i.product?.name)}</span><strong>${BH.money((i.product?.price || 0) * i.quantity)}</strong></div>`).join('') + BH.summaryHTML();
};
BH.bindCheckout = () => {
  BH.$('checkoutBtn').onclick = () => {
    if (!BH.cartValid()) return BH.toast('Agrega productos al carrito para ver el resumen.');
    BH.$('cartDialog').close();
    BH.renderCheckout();
    BH.show('checkoutDialog');
  };
  BH.$('finishDemo').onclick = () => {
    BH.$('checkoutDialog').close();
    BH.toast('Demostración finalizada. No se ha enviado ningún pedido.');
  };
};

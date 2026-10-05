'use strict';
(async () => {
  document.querySelectorAll('img').forEach(img => {
    if (img.complete && !img.naturalWidth) { img.dataset.fallback='1'; img.src='assets/product-placeholder.svg'; }
  });
  BH.renderIcons(); BH.bindFilters(); BH.bindSearch(); BH.bindCheckout();
  BH.$('currency').value = BH.currency;
  BH.$('currency').onchange = e => { BH.currency=e.target.value; BH.storage.set('currency',BH.currency); BH.currencyRefresh(); };
  BH.$('cartBtn').onclick = () => { BH.renderCart(); BH.show('cartDialog'); };
  BH.$('footerCart').onclick = BH.$('cartBtn').onclick;
  BH.$('projectBtn').onclick = () => BH.show('projectDialog');
  BH.$('footerProject').onclick = BH.$('projectBtn').onclick;
  BH.$('menuBtn').onclick = () => {
    const open=BH.$('mainNav').classList.toggle('open');
    BH.$('menuBtn').setAttribute('aria-expanded',String(open));
  };
  document.addEventListener('click',e => {
    const close=e.target.closest('[data-close]'); if(close)close.closest('dialog').close();
    const add=e.target.closest('[data-add]'); if(add)BH.add(Number(add.dataset.add));
    const detail=e.target.closest('[data-detail]'); if(detail)BH.detail(Number(detail.dataset.detail));
    const quantity=e.target.closest('[data-quantity]'); if(quantity)BH.changeQuantity(Number(quantity.dataset.quantity),Number(quantity.dataset.delta));
    const remove=e.target.closest('[data-remove]'); if(remove){BH.cart=BH.cart.filter(i=>i.id!==Number(remove.dataset.remove));BH.saveCart();}
    const category=e.target.closest('[data-category]'); if(category)BH.setCategory(category.dataset.category);
    if(e.target.closest('nav a')){BH.$('mainNav').classList.remove('open');BH.$('menuBtn').setAttribute('aria-expanded','false');}
  });
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{
    if(e.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
  }));
  await BH.loadProducts(); BH.tick(); setInterval(BH.tick,1000);
})();

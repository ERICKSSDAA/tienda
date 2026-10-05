'use strict';
BH.loadProducts = async () => {
  BH.products=JSON.parse(JSON.stringify(window.BH_DEMO_PRODUCTS));
  BH.expireOffers();
  const selected=BH.filters.brand;
  BH.$('brandFilter').innerHTML='<option>Todas</option>'+[...new Set(BH.products.map(p=>p.brand))].sort().map(b=>`<option>${BH.escape(b)}</option>`).join('');
  BH.$('brandFilter').value=selected;
  BH.currencyRefresh();
};
BH.expireOffers = () => {
 let changed=false;
 for(const p of BH.products)if(p.old&&p.saleUntil&&Date.parse(p.saleUntil)<=Date.now()){p.price=p.old;p.old=null;changed=true;}
 return changed;
};
BH.renderProducts = () => {
 const list=BH.filtered();BH.$('resultCount').textContent=`${list.length} producto${list.length===1?'':'s'}`;
 BH.$('activeCategory').textContent=BH.filters.category==='Todos'?'Todos los productos':BH.filters.category;
 BH.$('productGrid').innerHTML=list.slice(0,BH.visible).map(p=>`<article class="product"><div class="product-image">${p.old?`<span class="discount">−${Math.round((1-p.price/p.old)*100)}%</span>`:''}<button data-detail="${p.id}" aria-label="Ver detalles de ${BH.escape(p.name)}">${BH.image(p.img,p.name)}</button>${p.imageNote?'<span class="ref-label">Imagen referencial</span>':''}</div><div class="product-body"><span class="product-brand">${BH.escape(p.brand)}</span><h3><button data-detail="${p.id}">${BH.escape(p.name)}</button></h3><p class="product-spec">${BH.escape(Object.values(p.specs||{}).slice(0,2).join(' · '))}</p><div class="rating">Ficha y precio de muestra</div><div class="product-bottom"><div>${p.old?'<span class="old">'+BH.money(p.old)+'</span>':''}<span class="price">${BH.money(p.price)}</span></div><button class="add-cart" data-add="${p.id}" aria-label="Agregar ${BH.escape(p.name)} al carrito" ${p.stock<1?'disabled':''}>${BH.icon('cart')}</button></div><div class="product-stock-row"><span class="stock ${p.stock<1?'out-stock':''}">${p.stock>0?'● Disponible':'Agotado'}</span><button class="text-button" data-detail="${p.id}">Ver detalles ↗</button></div></div></article>`).join('') || '<div class="empty-state"><h3>No encontramos coincidencias.</h3><p>Prueba otra búsqueda o limpia los filtros.</p><button class="btn outline" id="emptyReset">Limpiar filtros</button></div>';
 BH.$('loadMore').hidden=list.length<=BH.visible;
 BH.$('emptyReset')?.addEventListener('click',BH.resetFilters);
};
BH.detail = async (id, refresh=false) => {
 const p=BH.products.find(p=>p.id===id);if(!p)return BH.toast('El producto todavía no está disponible.');
 BH.detailId=id;
 BH.$('detailContent').innerHTML=`<div class="detail-grid"><div class="detail-image">${BH.image(p.img,p.name)}<small>${BH.escape(p.imageNote)}</small></div><div class="detail-copy"><span class="eyebrow muted">${BH.escape(p.brand)}</span><h2 id="detailTitle">${BH.escape(p.name)}</h2><span class="price">${BH.money(p.price)}</span>${p.old?'<span class="old">'+BH.money(p.old)+'</span>':''}<p class="description">${BH.escape(p.description)}</p><dl class="specs">${Object.entries(p.specs||{}).map(([key,value])=>`<div><dt>${BH.escape(key)}</dt><dd>${BH.escape(value)}</dd></div>`).join('')}</dl><p class="stock">${p.stock} unidades disponibles · Máximo 20 por pedido</p><div class="detail-actions"><label class="small">Cantidad<input id="detailQty" type="number" value="1" min="1" max="${Math.min(p.stock,20)}" ${p.stock<1?'disabled':''}></label><button class="btn dark" id="detailAdd" ${p.stock<1?'disabled':''}>Agregar al carrito ${BH.icon('cart')}</button></div><p class="small muted">Producto de muestra para la presentación del proyecto. No se realizan ventas reales.</p></div></div>`;
 BH.$('detailAdd').onclick=()=>{const q=BH.$('detailQty');if(q.reportValidity())BH.add(id,Number(q.value));};
 if(!refresh)BH.show('detailDialog');

};
BH.tick = () => {
 if(BH.expireOffers())BH.currencyRefresh();
 const dates=BH.products.filter(p=>p.old&&p.saleUntil).map(p=>Date.parse(p.saleUntil));
 if(!dates.length){BH.$('countdown').textContent='Sin ofertas activas';return;}
 let time=Math.max(0,Math.floor((Math.min(...dates)-Date.now())/1000));
 const days=Math.floor(time/86400);time%=86400;const hours=Math.floor(time/3600);time%=3600;const minutes=Math.floor(time/60);const seconds=time%60;
 BH.$('countdown').innerHTML=[[days,'DÍAS'],[hours,'HRS'],[minutes,'MIN'],[seconds,'SEG']].map(([n,label])=>`<div><b>${String(n).padStart(2,'0')}</b><small>${label}</small></div>`).join('');
};

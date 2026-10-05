'use strict';
BH.filters = {category:'Todos',brand:'Todas',max:6000,sale:false,stock:false,sort:'featured',search:''}; BH.visible=9;
BH.categoryData = [['Celulares','phone','Potencia en tu bolsillo'],['Laptops','laptop','Crea sin límites'],['Monitores','monitor','Amplía tu mundo'],['Gaming','gaming','Equipa tu partida'],['Audio','audio','Escucha más'],['Accesorios','keyboard','Completa tu setup']];
BH.filtered = () => {
  const f=BH.filters;
  const list=BH.products.filter(p=>(f.category==='Todos'||p.category===f.category)&&(f.brand==='Todas'||p.brand===f.brand)&&p.price<=f.max&&(!f.sale||p.old)&&(!f.stock||p.stock>0)&&BH.normalize(p.name+' '+p.brand+' '+p.category).includes(BH.normalize(f.search)));
  if(f.sort==='priceAsc')list.sort((a,b)=>a.price-b.price);
  else if(f.sort==='priceDesc')list.sort((a,b)=>b.price-a.price);
  else if(f.sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'es'));
  else list.sort((a,b)=>Number(b.featured)-Number(a.featured)||a.id-b.id);
  return list;
};
BH.setCategory = category => {BH.filters.category=category;BH.filters.brand='Todas';BH.$('brandFilter').value='Todas';BH.$('categoryFilter').value=category;BH.visible=9;BH.renderProducts();};
BH.resetFilters = () => {
  Object.assign(BH.filters,{category:'Todos',brand:'Todas',max:6000,sale:false,stock:false,sort:'featured',search:''});
  BH.$('categoryFilter').value='Todos';BH.$('brandFilter').value='Todas';BH.$('maxPrice').value=6000;BH.$('saleFilter').checked=false;BH.$('stockFilter').checked=false;BH.$('sortFilter').value='featured';BH.$('searchInput').value='';BH.visible=9;BH.currencyRefresh();
};
BH.bindFilters = () => {
  BH.$('categories').innerHTML=BH.categoryData.map(([name,icon,sub])=>`<a href="#productos" class="category" data-category="${name}">${BH.icon(icon)}<b>${name}</b><small>${sub}</small></a>`).join('');
  BH.$('categoryFilter').innerHTML='<option>Todos</option>'+BH.categoryData.map(([name])=>`<option>${name}</option>`).join('');
  [['categoryFilter','category'],['brandFilter','brand'],['sortFilter','sort']].forEach(([id,key])=>BH.$(id).addEventListener('change',e=>{BH.filters[key]=e.target.value;BH.visible=9;BH.renderProducts();}));
  [['saleFilter','sale'],['stockFilter','stock']].forEach(([id,key])=>BH.$(id).addEventListener('change',e=>{BH.filters[key]=e.target.checked;BH.visible=9;BH.renderProducts();}));
  BH.$('maxPrice').addEventListener('input',e=>{BH.filters.max=Number(e.target.value);BH.$('priceValue').textContent=BH.money(BH.filters.max);BH.visible=9;BH.renderProducts();});
  BH.$('resetFilters').onclick=BH.resetFilters;
  BH.$('offerLink').onclick=()=>{BH.resetFilters();BH.filters.sale=true;BH.$('saleFilter').checked=true;BH.renderProducts();};
  BH.$('loadMore').onclick=()=>{BH.visible+=9;BH.renderProducts();};
};

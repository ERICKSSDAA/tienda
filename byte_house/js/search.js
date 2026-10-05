'use strict';
BH.normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
BH.bindSearch = () => {
  BH.$('searchInput').addEventListener('input',e=>{BH.filters.search=e.target.value;BH.visible=9;BH.renderProducts();});
  BH.$('searchForm').addEventListener('submit',e=>{e.preventDefault();BH.$('productos').scrollIntoView({behavior:'smooth'});});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&!document.querySelector('dialog[open]')){e.preventDefault();BH.$('searchInput').focus();}});
};

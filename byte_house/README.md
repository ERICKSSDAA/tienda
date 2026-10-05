# BYTE HOUSE — Presentación para GitHub Pages

Sitio de muestra hecho con **HTML, CSS y JavaScript**, con diseño gamer.
No necesita base de datos, PHP, XAMPP, cuentas ni claves de configuración.

## Publicar para que el profesor vea la página

1. Descomprime el ZIP.
2. Sube **todos los archivos y carpetas descomprimidos** al repositorio. No subas solamente el ZIP.
3. Comprueba que `index.html` esté directamente en la raíz del repositorio, junto a `css`, `js` y `assets`.
4. En GitHub entra a **Settings → Pages**.
5. En **Source**, selecciona **Deploy from a branch**.
6. Selecciona la rama **main**, carpeta **/(root)**, y pulsa **Save**.
7. Espera a que termine la publicación y copia el enlace que muestra GitHub Pages.
8. Comparte ese enlace con el profesor. Será parecido a `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

Si reemplazas la versión anterior, elimina del repositorio las carpetas antiguas `api`, `config`, `database` y `tests`, además de sus instrucciones de XAMPP. Esta entrega contiene solo los archivos de la presentación.

También puedes abrir `index.html` con doble clic para verla en tu computadora.

## Qué se puede probar

- Catálogo de 22 productos con imágenes por URL.
- Categorías, marcas, búsqueda, filtros y ordenamiento.
- Detalles de cada producto.
- Cambio entre PEN y USD con una tasa fija de muestra.
- Carrito con cantidades, eliminación, subtotal y envío de ejemplo.
- Resumen visual de la selección, sin registrar una compra.
- Menú y diseño adaptables a celular.

El carrito se conserva solo en el navegador. No se crean usuarios, no se guardan pedidos y no se cobra dinero. Los precios, stock y promociones son de muestra. Algunas imágenes son referenciales y se señalan en la tarjeta. Se necesita Internet para las imágenes externas.

## Archivos separados

- `index.html`: estructura de la página.
- `css/`: diseño general, catálogo, carrito, adaptación móvil y tema gamer.
- `js/products.js`: productos de muestra (nombres, precios e imágenes).
- `js/catalog.js`: tarjetas y detalles.
- `js/cart.js`: carrito.
- `js/checkout.js`: resumen visual.
- `js/search.js` y `js/filters.js`: búsqueda y filtros.
- `js/currency.js`: moneda.
- `js/core.js` y `js/app.js`: funciones comunes y eventos.
- `assets/`: icono y reemplazo para imágenes que no cargan.

Documentación de publicación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

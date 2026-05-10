# Creaciones V y L 🌙

Sitio web para negocio de decoraciones en MDF para habitaciones de bebé.

## Estructura
```
CreacionesV&L/
├── index.html          ← Página principal
├── productos.html      ← Catálogo completo
├── css/
│   └── styles.css      ← Todos los estilos
├── js/
│   ├── data.js         ← Productos, testimonios, Instagram
│   ├── cart.js         ← Carrito de compras
│   ├── main.js         ← Lógica de index.html
│   └── catalog.js      ← Lógica de productos.html
└── img/                ← Aquí van tus fotos
```

## Personalización rápida

### 1. Cambiar número de WhatsApp
En `js/data.js`, línea final:
```js
const WA_NUMBER = "573000000000"; // ← pon tu número aquí (sin + ni espacios)
```

### 2. Agregar productos
En `js/data.js`, agrega objetos al array `PRODUCTS`:
```js
{
  id: 9,
  name: "Nombre de tu producto",
  desc: "Descripción corta",
  price: 80000,           // precio en pesos colombianos
  category: "nombres",    // nombres | coronas | cuadros | kits | stickers
  badge: "Nuevo",         // o null si no quieres badge
  featured: true,         // true = aparece en la home
  img: "img/mi-foto.jpg", // ruta a tu imagen
  emoji: "✨"             // emoji de respaldo si no hay imagen
}
```

### 3. Agregar imágenes
Pon tus fotos en la carpeta `img/` con estos nombres:
- `hero-room.jpg` — foto principal del hero
- `about.jpg` — foto de la sección "Sobre Nosotros"
- `prod-nombre.jpg`, `prod-corona.jpg`, etc. — fotos de productos
- `insta-1.jpg` a `insta-6.jpg` — fotos del grid de Instagram

### 4. Cambiar handle de Instagram
En `js/data.js`, actualiza las URLs de `INSTAGRAM_POSTS` con tu usuario real.

### 5. Testimonios
En `js/data.js`, edita el array `TESTIMONIALS` con los mensajes reales de tus clientas.

## Para abrir el sitio
Simplemente abre `index.html` en tu navegador. No necesita servidor.

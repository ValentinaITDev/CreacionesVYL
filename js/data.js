// ============================================
// DATA.JS — Productos e Instagram posts
// ============================================

const PRODUCTS = [
  {
    id: 1,
    name: "Kit completo 1 nombre",
    desc: "Kit decorativo completo para el cuarto de tu bebé con un nombre personalizado en MDF.",
    price: 160000,
    category: "kits",
    badge: "Más vendido",
    featured: true,
    img: "img/KitCompleto1Nombre.jpeg",
    emoji: "✨"
  },
  {
    id: 2,
    name: "Kit completo 2 nombres",
    desc: "Kit decorativo completo con dos nombres personalizados, ideal para mellizos o cuartos compartidos.",
    price: 180000,
    category: "kits",
    badge: null,
    featured: true,
    img: "img/KitCompleto2Nombres.jpeg",
    emoji: "✨"
  },
  {
    id: 3,
    name: "Kit nombre y cuadros",
    desc: "Nombre personalizado en MDF acompañado de cuadros decorativos coordinados.",
    price: 120000,
    category: "kits",
    badge: null,
    featured: true,
    img: "img/NombreyCuadros.jpeg",
    emoji: "🖼️"
  },
  {
    id: 4,
    name: "Lámpara de mesa",
    desc: "Lámpara de mesa decorativa en MDF, personalizada con el nombre de tu bebé.",
    price: 120000,
    category: "lamparas",
    badge: null,
    featured: true,
    img: "img/LamparaDemesa.png",
    emoji: "🌙"
  },
  {
    id: 5,
    name: "Nacimiento circular",
    desc: "Decoración circular de nacimiento personalizada con nombre, fecha y peso del bebé.",
    price: 90000,
    category: "cuadros",
    badge: "Nuevo",
    featured: false,
    img: "img/Nacimientocircular.jpeg",
    emoji: "🌸"
  },
  {
    id: 6,
    name: "Pañalera y canastilla",
    desc: "Pañalera y canastilla decorativas en MDF pintadas a mano, perfectas para organizar el cuarto con estilo.",
    price: 280000,
    category: "organizadores",
    badge: null,
    featured: false,
    img: "img/Canastillaypañalera.jpeg",
    emoji: "🎀"
  },
  {
    id: 7,
    name: "Lámpara nube",
    desc: "Lámpara decorativa en forma de nube, ideal para crear un ambiente mágico y suave.",
    price: 120000,
    category: "lamparas",
    badge: null,
    featured: false,
    img: "img/NubeLampara.jpeg",
    emoji: "☁️"
  },
  {
    id: 8,
    name: "Cuadro fotografías 12 meses",
    desc: "Marco decorativo en MDF para registrar los 12 primeros meses de tu bebé con fotos.",
    price: 85000,
    category: "cuadros",
    badge: null,
    featured: false,
    img: "img/Cuadrofotografias12meses.jpeg",
    emoji: "📸"
  },
  {
    id: 9,
    name: "Repisa decorativa",
    desc: "Repisa en MDF pintada a mano para decorar y organizar el cuarto del bebé.",
    price: 95000,
    category: "organizadores",
    badge: null,
    featured: false,
    img: "img/Repisa1.jpeg",
    emoji: "🪵"
  },
  {
    id: 10,
    name: "Cajonero decorativo",
    desc: "Cajonero en MDF personalizado, funcional y decorativo para el cuarto de tu bebé.",
    price: 900000,
    category: "organizadores",
    badge: null,
    featured: false,
    img: "img/Cajonero.jpeg",
    emoji: "🗄️"
  },
  {
    id: 11,
    name: "Tocador",
    desc: "Tocador decorativo en MDF, elegante y personalizable para el cuarto del bebé.",
    price: 350000,
    category: "organizadores",
    badge: "Premium",
    featured: false,
    img: "img/Tocador.jpeg",
    emoji: "🪞"
  },
  {
    id: 12,
    name: "Recordatorio silla",
    desc: "Decoración de recordatorio en forma de silla, perfecta para baby shower o bautizo.",
    price: 55000,
    category: "recordatorios",
    badge: null,
    featured: false,
    img: "img/RecordatorioSilla.jpeg",
    emoji: "🪑"
  },
  {
    id: 13,
    name: "Recordatorios",
    desc: "Recordatorios personalizados en MDF para eventos especiales de tu bebé.",
    price: 45000,
    category: "recordatorios",
    badge: null,
    featured: false,
    img: "img/Recordatorios1.jpeg",
    emoji: "🎁"
  },
  {
    id: 14,
    name: "Pañalera individual",
    desc: "Pañalera decorativa en MDF pintada a mano, práctica y hermosa para el cuarto.",
    price: 150000,
    category: "organizadores",
    badge: null,
    featured: false,
    img: "img/Pañalera.jpeg",
    emoji: "🧸"
  }
];

const CATEGORIES = [
  { id: "todos",         label: "Todos" },
  { id: "kits",          label: "Kits" },
  { id: "lamparas",      label: "Lámparas" },
  { id: "cuadros",       label: "Cuadros" },
  { id: "organizadores", label: "Organizadores" },
  { id: "recordatorios", label: "Recordatorios" }
];

// Posts de Instagram — imágenes reales
const INSTAGRAM_POSTS = [
  { img: "img/habitaciondecorada.jpeg",    url: "https://instagram.com/creacionesvyl", alt: "Habitación de bebé decorada completa" },
  { img: "img/KitCompleto1Nombre.jpeg",    url: "https://instagram.com/creacionesvyl", alt: "Kit completo 1 nombre" },
  { img: "img/KitCompleto2Nombres.jpeg",   url: "https://instagram.com/creacionesvyl", alt: "Kit completo 2 nombres" },
  { img: "img/Nacimientocircular.jpeg",    url: "https://instagram.com/creacionesvyl", alt: "Nacimiento circular personalizado" },
  { img: "img/NombreyCuadros.jpeg",        url: "https://instagram.com/creacionesvyl", alt: "Nombre y cuadros decorativos" },
  { img: "img/Canastillaypañalera.jpeg",   url: "https://instagram.com/creacionesvyl", alt: "Canastilla y pañalera" }
];

const TESTIMONIALS = [
  {
    name: "Valentina M.",
    date: "Hace 2 días",
    stars: 5,
    text: "Quedé enamorada del nombre iluminado que pedí para el cuarto de mi bebé. La calidad es increíble y llegó súper bien empacado. 100% recomendadas 💛",
    tag: "Kit 1 nombre",
    avatar: "💛"
  },
  {
    name: "Daniela R.",
    date: "Hace 1 semana",
    stars: 5,
    text: "Pedí el kit completo y superó todas mis expectativas. Los colores quedaron exactamente como los pedí. Son muy atentas y responden rápido por WhatsApp ✨",
    tag: "Kit completo",
    avatar: "🌸"
  },
  {
    name: "Camila T.",
    date: "Hace 2 semanas",
    stars: 5,
    text: "El nacimiento circular para el cuarto de mi Sofía quedó precioso. Muy buena calidad y el envío llegó rapidísimo a Bogotá 🥰",
    tag: "Nacimiento circular",
    avatar: "👑"
  },
  {
    name: "Mariana P.",
    date: "Hace 3 semanas",
    stars: 5,
    text: "Excelente trabajo, muy detallistas. El cuadro personalizado quedó hermoso. El cuarto de mi bebé quedó de revista. Gracias chicas 🙏",
    tag: "Nombre y cuadros",
    avatar: "🎀"
  },
  {
    name: "Laura G.",
    date: "Hace 1 mes",
    stars: 5,
    text: "Compré la pañalera y la canastilla. Todo llegó perfecto y el empaque es muy lindo. Se nota el amor con que hacen cada pieza 💕",
    tag: "Pañalera y canastilla",
    avatar: "⭐"
  }
];

// Número de WhatsApp (cambia por el real)
const WA_NUMBER = "573026603400";
const WA_MSG = encodeURIComponent("Hola, me gustaría recibir información sobre sus decoraciones ✨");

// ============================================
// MAIN.JS — Lógica de index.html
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  // ── Carrito
  Cart.init();

  // ── Header scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // ── Hamburger
  const hamburger = document.getElementById("hamburger");
  const nav       = document.getElementById("nav");
  hamburger?.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    nav?.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
  });
  // Cerrar nav al hacer click en link
  nav?.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger?.classList.remove("open");
      nav.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");
    });
  });

  // ── Fade-in on scroll
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  // ── Productos destacados
  renderFeaturedProducts();

  // ── Instagram grid
  renderInstagram();

  // ── Testimonios
  renderTestimonials();

  // ── Formulario de contacto
  initContactForm();

});

// ── RENDER PRODUCTOS DESTACADOS
function renderFeaturedProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.featured);
  grid.innerHTML = featured.map(p => productCardHTML(p)).join("");
  grid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.add);
      const product = PRODUCTS.find(p => p.id === id);
      if (product) Cart.add(product);
    });
  });
  grid.querySelectorAll("[data-fav]").forEach(btn => {
    btn.addEventListener("click", () => btn.classList.toggle("active"));
  });
  // Fade-in cards
  grid.querySelectorAll(".product-card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
    card.classList.add("fade-in");
    setTimeout(() => card.classList.add("visible"), 100 + i * 80);
  });
}

function productCardHTML(p) {
  const imgHTML = p.img
    ? `<img src="${p.img}" alt="${p.name}" class="product-card__img" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'product-card__img-placeholder\\'>${p.emoji}</div>'" />`
    : `<div class="product-card__img-placeholder">${p.emoji}</div>`;
  return `
    <article class="product-card">
      <div class="product-card__img-wrap">
        ${imgHTML}
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ""}
        <button class="product-card__fav" data-fav="${p.id}" aria-label="Agregar a favoritos">❤️</button>
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__footer">
          <span class="product-card__price">${formatPrice(p.price)}</span>
          <button class="product-card__add" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">
            🛒 Agregar
          </button>
        </div>
      </div>
    </article>
  `;
}

function formatPrice(n) {
  return "$" + n.toLocaleString("es-CO");
}

// ── RENDER INSTAGRAM
function renderInstagram() {
  const grid = document.getElementById("instagramGrid");
  if (!grid) return;
  grid.innerHTML = INSTAGRAM_POSTS.map(post => `
    <a href="${post.url}" target="_blank" rel="noopener" class="instagram__post" aria-label="${post.alt}">
      ${post.img
        ? `<img src="${post.img}" alt="${post.alt}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'insta-placeholder\\'>📸</div>'" />`
        : `<div class="insta-placeholder">📸</div>`
      }
      <div class="instagram__post-overlay">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </div>
    </a>
  `).join("");
}

// ── RENDER TESTIMONIOS
function renderTestimonials() {
  const track = document.getElementById("testimonialsTrack");
  const dots  = document.getElementById("testimonialsDots");
  if (!track) return;

  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-card__header">
        <div class="testimonial-card__avatar">${t.avatar}</div>
        <div>
          <p class="testimonial-card__name">${t.name}</p>
          <p class="testimonial-card__date">${t.date}</p>
        </div>
      </div>
      <div class="testimonial-card__stars">${"★".repeat(t.stars)}</div>
      <p class="testimonial-card__text">"${t.text}"</p>
      <span class="testimonial-card__tag">${t.tag}</span>
    </div>
  `).join("");

  // Dots
  const cards = track.querySelectorAll(".testimonial-card");
  const perView = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  let current = 0;

  function buildDots() {
    if (!dots) return;
    const pages = Math.ceil(cards.length / perView());
    dots.innerHTML = Array.from({ length: pages }, (_, i) =>
      `<button aria-label="Página ${i + 1}" ${i === 0 ? 'class="active"' : ""}></button>`
    ).join("");
    dots.querySelectorAll("button").forEach((btn, i) => {
      btn.addEventListener("click", () => goTo(i));
    });
  }

  function goTo(page) {
    current = page;
    const pv = perView();
    const cardW = track.querySelector(".testimonial-card")?.offsetWidth || 0;
    const gap = 24;
    track.style.transform = `translateX(-${page * pv * (cardW + gap)}px)`;
    dots?.querySelectorAll("button").forEach((b, i) => b.classList.toggle("active", i === page));
  }

  buildDots();
  window.addEventListener("resize", () => { buildDots(); goTo(0); });

  // Swipe
  let startX = 0;
  track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    const pages = Math.ceil(cards.length / perView());
    if (diff > 50 && current < pages - 1) goTo(current + 1);
    if (diff < -50 && current > 0) goTo(current - 1);
  });
}

// ── FORMULARIO CONTACTO
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const phone   = form.phone.value.trim();
    const message = form.message.value.trim();
    if (!name || !message) return;
    const text = encodeURIComponent(
      `Hola, soy ${name}${phone ? " (" + phone + ")" : ""}.\n\n${message} ✨`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, "_blank");
    form.reset();
  });
}

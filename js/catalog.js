// ============================================
// CATALOG.JS — Lógica de productos.html
// ============================================

document.addEventListener("DOMContentLoaded", () => {

  Cart.init();

  // Header scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  const hamburger = document.getElementById("hamburger");
  const nav       = document.getElementById("nav");
  hamburger?.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    nav?.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
  });

  // Fade-in
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  fadeEls.forEach(el => observer.observe(el));

  // Filtros
  let activeCategory = "todos";
  const filtersEl = document.getElementById("catalogFilters");
  if (filtersEl) {
    filtersEl.innerHTML = CATEGORIES.map(c => `
      <button class="filter-btn ${c.id === "todos" ? "active" : ""}" data-cat="${c.id}">
        ${c.label}
      </button>
    `).join("");
    filtersEl.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        filtersEl.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.cat;
        renderCatalog(activeCategory);
      });
    });
  }

  renderCatalog("todos");
});

function renderCatalog(category) {
  const grid  = document.getElementById("productsGrid");
  const empty = document.getElementById("catalogEmpty");
  if (!grid) return;

  const filtered = category === "todos"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === category);

  if (!filtered.length) {
    grid.innerHTML = "";
    if (empty) empty.style.display = "block";
    return;
  }
  if (empty) empty.style.display = "none";

  grid.innerHTML = filtered.map(p => productCardHTML(p)).join("");

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

  // Animate cards
  grid.querySelectorAll(".product-card").forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity .4s ease ${i * 0.06}s, transform .4s ease ${i * 0.06}s`;
    requestAnimationFrame(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
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

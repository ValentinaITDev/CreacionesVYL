// ============================================
// CART.JS — Carrito de compras
// ============================================

const Cart = (() => {
  let items = JSON.parse(localStorage.getItem("vyl_cart") || "[]");

  function save() {
    localStorage.setItem("vyl_cart", JSON.stringify(items));
  }

  function formatPrice(n) {
    return "$" + n.toLocaleString("es-CO");
  }

  function updateCount() {
    const total = items.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll("#cartCount").forEach(el => {
      el.textContent = total;
      el.classList.toggle("visible", total > 0);
    });
  }

  function buildWhatsAppMsg() {
    if (!items.length) return "";
    let msg = "Hola, me gustaría cotizar los siguientes productos:\n\n";
    items.forEach(i => {
      msg += `• ${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}\n`;
    });
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    msg += `\nTotal estimado: ${formatPrice(total)}\n\n¿Podrían confirmarme disponibilidad? ✨`;
    return encodeURIComponent(msg);
  }

  function render() {
    const container = document.getElementById("cartItems");
    const footer    = document.getElementById("cartFooter");
    const totalEl   = document.getElementById("cartTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (!container) return;

    if (!items.length) {
      container.innerHTML = '<p class="cart-empty">Tu carrito está vacío 🌸</p>';
      if (footer) footer.style.display = "none";
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item__img-wrap">
          ${item.img
            ? `<img src="${item.img}" alt="${item.name}" class="cart-item__img" loading="lazy" />`
            : `<div class="cart-item__img" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:var(--cream-dark)">${item.emoji || "🎀"}</div>`
          }
        </div>
        <div class="cart-item__info">
          <p class="cart-item__name">${item.name}</p>
          <p class="cart-item__price">${formatPrice(item.price)} × ${item.qty}</p>
          <button class="cart-item__remove" data-remove="${item.id}">Eliminar</button>
        </div>
      </div>
    `).join("");

    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    if (totalEl) totalEl.textContent = formatPrice(total);
    if (footer)  footer.style.display = "block";
    if (checkoutBtn) {
      checkoutBtn.href = `https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMsg()}`;
    }

    // Remove buttons
    container.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        remove(parseInt(btn.dataset.remove));
      });
    });
  }

  function add(product) {
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      items.push({ ...product, qty: 1 });
    }
    save();
    updateCount();
    render();
    openDrawer();
    showToast(`${product.name} agregado al carrito 🛒`);
  }

  function remove(id) {
    items = items.filter(i => i.id !== id);
    save();
    updateCount();
    render();
  }

  function openDrawer() {
    document.getElementById("cartDrawer")?.classList.add("open");
    document.getElementById("cartOverlay")?.classList.add("open");
    document.getElementById("cartDrawer")?.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    document.getElementById("cartDrawer")?.classList.remove("open");
    document.getElementById("cartOverlay")?.classList.remove("open");
    document.getElementById("cartDrawer")?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function showToast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("toast--show"));
    setTimeout(() => {
      t.classList.remove("toast--show");
      setTimeout(() => t.remove(), 400);
    }, 2800);
  }

  function init() {
    updateCount();
    render();

    document.getElementById("cartBtn")?.addEventListener("click", openDrawer);
    document.getElementById("cartClose")?.addEventListener("click", closeDrawer);
    document.getElementById("cartOverlay")?.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeDrawer();
    });
  }

  return { init, add, remove, openDrawer, closeDrawer };
})();

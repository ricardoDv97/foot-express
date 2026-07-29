import { AppState } from "./store.js";
import { formatPrice } from "../utils/formatPrice.js";
import { loadCart, saveCart } from "../utils/storage.js";
import { products } from "../data/products.js";

const cartButton = document.querySelector("#cartButton");
const cartCounter = document.querySelector("#cartCounter");
const cartDrawer = document.querySelector("#cartDrawer");
const cartOverlay = document.querySelector("#cartOverlay");
const closeCartButton = document.querySelector("#closeCart");
const cartItemsContainer = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const clearCartButton = document.querySelector("#clearCart");
let isInitialized = false;

function normalizeOptions(options = {}) {
  return {
    sauces: Array.isArray(options.sauces) ? [...options.sauces] : [],
    extras: Array.isArray(options.extras) ? [...options.extras] : [],
    notes: typeof options.notes === "string" ? options.notes.trim() : "",
  };
}

function createCartItem({ productId, product, quantity = 1, unitPrice, options }) {
  const normalizedUnitPrice = Number(unitPrice) || 0;

  return {
    uid: crypto.randomUUID(),
    productId,
    product: {
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
    },
    quantity: 1,
    unitPrice: normalizedUnitPrice,
    subtotal: normalizedUnitPrice,
    options: normalizeOptions(options),
  };
}

function calculateSubtotal(item) {
  return item.quantity * item.unitPrice;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function getCartItemByUid(uid) {
  return AppState.cart.find((item) => item.uid === uid);
}

function isCartItem(item) {
  return (
    item &&
    typeof item.uid === "string" &&
    typeof item.productId !== "undefined" &&
    item.product &&
    typeof item.product.id !== "undefined" &&
    typeof item.product.name === "string" &&
    Number.isFinite(item.quantity) &&
    Number.isFinite(item.unitPrice) &&
    item.options
  );
}

function hydrateCart(items) {
  if (!Array.isArray(items)) return [];

  return items.filter(isCartItem).flatMap((item) => {
    const quantity = Math.max(1, Number(item.quantity) || 1);

    return Array.from({ length: quantity }, () => createCartItem({
      productId: item.productId,
      product: item.product,
      unitPrice: item.unitPrice,
      options: item.options,
    }));
  });
}

function synchronizeCart(nextCart) {
  AppState.cart = nextCart.map((item) => ({
    ...item,
    subtotal: calculateSubtotal(item),
  }));
  saveCart(AppState.cart);
  renderCart();
}

export function renderCart() {
  const itemCount = getCartItemCount();
  const isEmpty = AppState.cart.length === 0;

  if (cartCounter) cartCounter.textContent = itemCount;
  cartButton?.classList.toggle("hidden", isEmpty);
  clearCartButton?.classList.toggle("hidden", isEmpty);

  if (!cartItemsContainer || !cartTotal) return;

  cartItemsContainer.innerHTML = isEmpty
    ? `
      <div class="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 text-center">
        <span class="text-4xl" aria-hidden="true">🛒</span>
        <h3 class="mt-4 text-lg font-bold">Tu carrito está vacío</h3>
        <p class="mt-2 text-sm leading-6 text-gray-400">Agregá tus productos favoritos para comenzar tu pedido.</p>
      </div>
    `
    : AppState.cart.map((item) => {
      const productName = escapeHtml(item.product.name);
      const uid = escapeHtml(item.uid);
      const product = products.find((catalogProduct) => catalogProduct.id === item.productId);
      const availableSauces = product?.options?.sauces ?? [];
      const sauces = item.options.sauces.length
        ? `<p class="mt-3 text-sm text-gray-300">Aderezos: ${item.options.sauces.map(escapeHtml).join(", ")}</p>`
        : `<p class="mt-3 text-sm text-gray-400">Sin aderezos seleccionados</p>`;
      const sauceEditor = availableSauces.length
        ? `
          <div data-sauce-editor="${uid}" class="mt-4 hidden rounded-xl border border-white/10 bg-black/20 p-3">
            <p class="mb-2 text-sm font-medium">Aderezos para esta unidad</p>
            <div class="grid gap-2">
              ${availableSauces.map((sauce) => `
                <label class="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
                  <input data-cart-sauce data-cart-item-uid="${uid}" type="checkbox" value="${escapeHtml(sauce)}" ${item.options.sauces.includes(sauce) ? "checked" : ""}>
                  ${escapeHtml(sauce)}
                </label>
              `).join("")}
            </div>
          </div>
        `
        : "";

      return `
        <article class="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold">${productName}</h3>
              <p class="mt-1 text-sm text-gray-400">Precio unitario: ${formatPrice(item.unitPrice)}</p>
            </div>
            <button
              data-cart-action="remove"
              data-cart-item-uid="${uid}"
              class="rounded-lg px-2 py-1 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              type="button"
              aria-label="Eliminar ${productName}"
            >
              Eliminar
            </button>
          </div>
          ${sauces}
          ${availableSauces.length ? `
            <button data-cart-action="edit-sauces" data-cart-item-uid="${uid}" class="mt-3 text-sm font-medium text-[var(--color-primary)] transition hover:text-yellow-300" type="button">
              Editar aderezos
            </button>
            ${sauceEditor}
          ` : ""}
          <div class="mt-5 flex items-center justify-between gap-4">
            <div class="flex items-center rounded-xl border border-white/10 bg-black/20 p-1">
              <button
                data-cart-action="decrease"
                data-cart-item-uid="${uid}"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-xl transition hover:bg-white/10"
                type="button"
                aria-label="Quitar una unidad de ${productName}"
              >
                −
              </button>
              <span class="min-w-10 px-2 text-center text-sm font-bold">1 un.</span>
              <button
                data-cart-action="increase"
                data-cart-item-uid="${uid}"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-xl transition hover:bg-white/10"
                type="button"
                aria-label="Aumentar cantidad de ${productName}"
              >
                +
              </button>
            </div>
            <div class="text-right">
              <span class="block text-xs font-medium uppercase tracking-wide text-gray-500">Subtotal</span>
              <strong class="mt-1 block text-lg text-[var(--color-primary)]">${formatPrice(item.subtotal)}</strong>
            </div>
          </div>
        </article>
      `;
    }).join("");
  cartTotal.textContent = formatPrice(getCartTotal());
}

export function getCartItems() {
  return AppState.cart.map((item) => ({
    ...item,
    product: { ...item.product },
    options: {
      ...item.options,
      sauces: [...item.options.sauces],
      extras: [...item.options.extras],
    },
  }));
}

export function getCartItemCount() {
  return AppState.cart.reduce((count, item) => count + item.quantity, 0);
}

export function getCartTotal() {
  return AppState.cart.reduce((total, item) => total + item.subtotal, 0);
}

export function addCartItem(itemData) {
  const quantity = Math.max(1, Number(itemData.quantity) || 1);
  const newItems = Array.from({ length: quantity }, () => createCartItem(itemData));

  synchronizeCart([...AppState.cart, ...newItems]);
  return newItems[0];
}

export function updateCartItemQuantity(uid, quantity) {
  const item = getCartItemByUid(uid);

  if (!item) return null;

  const normalizedQuantity = Number(quantity);
  if (!Number.isFinite(normalizedQuantity) || normalizedQuantity < 1) {
    return removeCartItem(uid);
  }

  const nextCart = AppState.cart.map((cartItem) =>
    cartItem.uid === uid ? { ...cartItem, quantity: normalizedQuantity } : cartItem,
  );

  synchronizeCart(nextCart);
  return getCartItemByUid(uid);
}

export function updateCartItemOptions(uid, options) {
  const item = getCartItemByUid(uid);

  if (!item) return null;

  const nextCart = AppState.cart.map((cartItem) =>
    cartItem.uid === uid
      ? { ...cartItem, options: normalizeOptions(options) }
      : cartItem,
  );

  synchronizeCart(nextCart);
  return getCartItemByUid(uid);
}

export function removeCartItem(uid) {
  const nextCart = AppState.cart.filter((item) => item.uid !== uid);

  if (nextCart.length === AppState.cart.length) return null;

  synchronizeCart(nextCart);
  return uid;
}

export function clearCart() {
  synchronizeCart([]);
}

export function openCart() {
  cartDrawer?.classList.remove("-translate-x-full");
  cartOverlay?.classList.remove("hidden");
}

export function closeCart() {
  cartDrawer?.classList.add("-translate-x-full");
  cartOverlay?.classList.add("hidden");
}

export function initializeCart() {
  if (isInitialized) return;

  AppState.cart = hydrateCart(loadCart());
  cartButton?.addEventListener("click", openCart);
  closeCartButton?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);
  cartItemsContainer?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cart-action]");

    if (!button) return;

    const uid = button.dataset.cartItemUid;
    const action = button.dataset.cartAction;
    const item = getCartItems().find((cartItem) => cartItem.uid === uid);

    if (!item) return;

    if (action === "increase") {
      addCartItem(item);
      return;
    }

    if (action === "decrease") {
      removeCartItem(uid);
      return;
    }

    if (action === "edit-sauces") {
      const editor = cartItemsContainer.querySelector(`[data-sauce-editor="${uid}"]`);
      editor?.classList.toggle("hidden");
      return;
    }

    if (action === "remove") removeCartItem(uid);
  });
  cartItemsContainer?.addEventListener("change", (event) => {
    const input = event.target.closest("[data-cart-sauce]");
    if (!input) return;

    const uid = input.dataset.cartItemUid;
    const item = getCartItemByUid(uid);
    if (!item) return;

    const selectedSauces = [...cartItemsContainer.querySelectorAll(
      `[data-cart-sauce][data-cart-item-uid="${uid}"]:checked`,
    )].map((sauceInput) => sauceInput.value);

    updateCartItemOptions(uid, { ...item.options, sauces: selectedSauces });
  });
  clearCartButton?.addEventListener("click", clearCart);
  renderCart();
  isInitialized = true;
}

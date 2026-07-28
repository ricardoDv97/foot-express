import { closeCart } from "./cart.js";

const cartButton = document.querySelector("#cartButton");
const cartDrawer = document.querySelector("#cartDrawer");
const cartOverlay = document.querySelector("#cartOverlay");
const closeCartButton = document.querySelector("#closeCart");

let opener = null;

function isDrawerOpen() {
  return Boolean(cartDrawer && !cartDrawer.classList.contains("-translate-x-full"));
}

function getFocusableElements() {
  if (!cartDrawer) return [];

  return [...cartDrawer.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )];
}

function restoreFocus() {
  if (opener?.isConnected) opener.focus();
}

function closeDrawerAndRestoreFocus() {
  closeCart();
  cartDrawer?.setAttribute("aria-hidden", "true");
  restoreFocus();
}

cartButton?.addEventListener("click", () => {
  opener = cartButton;

  requestAnimationFrame(() => {
    if (!isDrawerOpen()) return;

    cartDrawer?.setAttribute("aria-hidden", "false");
    getFocusableElements()[0]?.focus();
  });
});

closeCartButton?.addEventListener("click", () => {
  requestAnimationFrame(() => {
    cartDrawer?.setAttribute("aria-hidden", "true");
    restoreFocus();
  });
});

cartOverlay?.addEventListener("click", () => {
  requestAnimationFrame(() => {
    cartDrawer?.setAttribute("aria-hidden", "true");
    restoreFocus();
  });
});

document.addEventListener("keydown", (event) => {
  if (!isDrawerOpen()) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeDrawerAndRestoreFocus();
    return;
  }

  if (event.key !== "Tab") return;

  const focusableElements = getFocusableElements();
  const firstElement = focusableElements[0];
  const lastElement = focusableElements.at(-1);

  if (!firstElement || !lastElement) {
    event.preventDefault();
    cartDrawer?.focus();
    return;
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
});

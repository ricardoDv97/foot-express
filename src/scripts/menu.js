const button = document.querySelector("#menuButton");
const drawer = document.querySelector("#menuDrawer");
const overlay = document.querySelector("#drawerOverlay");
const closeButton = document.querySelector("#closeDrawer");

function isDrawerOpen() {
  return Boolean(drawer && !drawer.classList.contains("translate-x-full"));
}

function getFocusableElements() {
  if (!drawer) return [];

  return [...drawer.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )];
}

function openDrawer() {
  drawer?.classList.remove("translate-x-full");
  overlay?.classList.remove("hidden");
  drawer?.setAttribute("aria-hidden", "false");
  button?.setAttribute("aria-expanded", "true");

  requestAnimationFrame(() => {
    closeButton?.focus();
  });
}

function closeDrawer({ restoreFocus = true } = {}) {
  drawer?.classList.add("translate-x-full");
  overlay?.classList.add("hidden");
  drawer?.setAttribute("aria-hidden", "true");
  button?.setAttribute("aria-expanded", "false");

  if (restoreFocus) button?.focus();
}

button?.addEventListener("click", openDrawer);
closeButton?.addEventListener("click", () => closeDrawer());
overlay?.addEventListener("click", () => closeDrawer());
drawer?.querySelectorAll("[data-open-product]").forEach((productButton) => {
  productButton.addEventListener("click", () => closeDrawer({ restoreFocus: false }));
});

document.addEventListener("keydown", (event) => {
  if (!isDrawerOpen()) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeDrawer();
    return;
  }

  if (event.key !== "Tab") return;

  const focusableElements = getFocusableElements();
  const firstElement = focusableElements[0];
  const lastElement = focusableElements.at(-1);

  if (!firstElement || !lastElement) {
    event.preventDefault();
    drawer?.focus();
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

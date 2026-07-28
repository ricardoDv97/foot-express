import { products } from "../data/products";
import { formatPrice } from "../utils/formatPrice.js";
import { addCartItem } from "./cart.js";

const overlay = document.querySelector("#productModalOverlay");
const modalContent = document.querySelector("#productModal");
const image = document.querySelector("#modalImage");
const title = document.querySelector("#modalTitle");
const category = document.querySelector("#modalCategory");
const description = document.querySelector("#modalDescription");
const price = document.querySelector("#modalPrice");
const availabilityMessage = document.querySelector("#modalAvailability");
const saucesContainer = document.querySelector("#saucesContainer");
const saucesList = document.querySelector("#saucesList");
const quantityText = document.querySelector("#productQuantity");
const increaseButton = document.querySelector("#increaseQty");
const decreaseButton = document.querySelector("#decreaseQty");
const addButton = document.querySelector("#addToCartButton");
const closeButton = document.querySelector("#closeProductModal");

const modalState = {
  product: null,
  quantity: 1,
  options: createEmptyOptions(),
};

let opener = null;
let closeAnimationId = null;

function createEmptyOptions() {
  return {
    sauces: [],
    extras: [],
    notes: "",
  };
}

function isCurrentProductAvailable() {
  return Boolean(modalState.product?.available);
}

function isModalOpen() {
  return Boolean(overlay && !overlay.classList.contains("hidden"));
}

function getFocusableElements() {
  if (!modalContent) return [];

  return [...modalContent.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )];
}

function openModal() {
  if (!overlay || !modalContent) return;

  if (closeAnimationId) {
    clearTimeout(closeAnimationId);
    closeAnimationId = null;
  }

  overlay.classList.remove("hidden", "opacity-0", "pointer-events-none");
  overlay.classList.add("flex");
  overlay.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    closeButton?.focus();
  });
}

function closeProductModal() {
  if (!overlay || !modalContent || !isModalOpen()) return;

  overlay.classList.add("opacity-0", "pointer-events-none");
  modalContent.classList.add("scale-95", "opacity-0");
  overlay.setAttribute("aria-hidden", "true");

  closeAnimationId = setTimeout(() => {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
    closeAnimationId = null;

    if (opener?.isConnected) opener.focus();
    opener = null;
  }, 200);
}

function resetModalState(product) {
  modalState.product = product;
  modalState.quantity = 1;
  modalState.options = createEmptyOptions();
}

function renderAvailability(product) {
  const isAvailable = product.available;

  availabilityMessage?.classList.toggle("hidden", isAvailable);
  if (availabilityMessage) {
    availabilityMessage.textContent = isAvailable
      ? ""
      : "Este producto no se encuentra disponible actualmente.";
  }

  if (addButton) {
    addButton.disabled = !isAvailable;
    addButton.classList.toggle("cursor-not-allowed", !isAvailable);
    addButton.classList.toggle("opacity-50", !isAvailable);
    addButton.textContent = isAvailable ? "Agregar al carrito" : "No disponible";
  }
}

function renderSauces(product) {
  if (!saucesContainer || !saucesList) return;

  const sauces = product.options?.sauces ?? [];
  saucesContainer.classList.toggle("hidden", sauces.length === 0);
  saucesList.replaceChildren();

  sauces.forEach((sauce) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    const text = document.createElement("span");

    label.className = "flex items-center gap-3 rounded-xl border border-neutral-700 p-3 cursor-pointer";
    input.type = "checkbox";
    input.value = sauce;
    text.textContent = sauce;

    input.addEventListener("change", () => {
      modalState.options.sauces = input.checked
        ? [...modalState.options.sauces, sauce]
        : modalState.options.sauces.filter((selectedSauce) => selectedSauce !== sauce);
    });

    label.append(input, text);
    saucesList.append(label);
  });
}

function renderModal(product) {
  if (!image || !title || !category || !description || !price || !quantityText) return;

  image.src = product.image.src;
  image.alt = product.name;
  title.textContent = product.name;
  category.textContent = product.category;
  description.textContent = product.description;
  price.textContent = formatPrice(product.price);
  quantityText.textContent = modalState.quantity;

  renderAvailability(product);
  renderSauces(product);
}

function openProduct(productId, trigger) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  opener = trigger;
  resetModalState(product);
  renderModal(product);
  openModal();
}

function updateQuantity(change) {
  const nextQuantity = modalState.quantity + change;

  if (nextQuantity < 1) return;

  modalState.quantity = nextQuantity;
  if (quantityText) quantityText.textContent = modalState.quantity;
}

function buildCartItemPayload() {
  const product = modalState.product;

  return {
    productId: product.id,
    product: {
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image.src,
    },
    quantity: modalState.quantity,
    unitPrice: product.price,
    options: {
      sauces: [...modalState.options.sauces],
      extras: [...modalState.options.extras],
      notes: modalState.options.notes,
    },
  };
}

function addCurrentProductToCart() {
  if (!modalState.product || !isCurrentProductAvailable()) return;

  addCartItem(buildCartItemPayload());
  document.dispatchEvent(new CustomEvent("foodexpress:toast", {
    detail: {
      message: "Producto agregado al carrito.",
      pulseCartButton: true,
    },
  }));
  closeProductModal();
}

document.querySelectorAll("[data-open-product]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openProduct(Number(trigger.dataset.openProduct), trigger);
  });

  if (!trigger.matches("button, a, input, select, textarea")) {
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      openProduct(Number(trigger.dataset.openProduct), trigger);
    });
  }
});

increaseButton?.addEventListener("click", () => updateQuantity(1));
decreaseButton?.addEventListener("click", () => updateQuantity(-1));
addButton?.addEventListener("click", addCurrentProductToCart);
closeButton?.addEventListener("click", closeProductModal);
overlay?.addEventListener("click", (event) => {
  if (event.target === overlay) closeProductModal();
});

document.addEventListener("keydown", (event) => {
  if (!isModalOpen()) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeProductModal();
    return;
  }

  if (event.key !== "Tab") return;

  const focusableElements = getFocusableElements();
  const firstElement = focusableElements[0];
  const lastElement = focusableElements.at(-1);

  if (!firstElement || !lastElement) {
    event.preventDefault();
    modalContent?.focus();
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

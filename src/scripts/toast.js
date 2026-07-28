const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toastMessage");
const cartButton = document.querySelector("#cartButton");

function showToast({ message, pulseCartButton = false }) {
  if (!toast || !toastMessage || !message) return;

  toastMessage.textContent = message;
  toast.classList.remove("toast-visible");

  requestAnimationFrame(() => {
    toast.classList.add("toast-visible");
  });

  if (pulseCartButton && cartButton) {
    cartButton.classList.remove("cart-pulse");

    requestAnimationFrame(() => {
      cartButton.classList.add("cart-pulse");
    });
  }
}

document.addEventListener("foodexpress:toast", (event) => {
  showToast(event.detail ?? {});
});

toast?.addEventListener("animationend", (event) => {
  if (event.animationName === "toast-lifecycle") {
    toast.classList.remove("toast-visible");
  }
});

cartButton?.addEventListener("animationend", (event) => {
  if (event.animationName === "cart-pulse") {
    cartButton.classList.remove("cart-pulse");
  }
});

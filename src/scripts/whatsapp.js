import { getCartItems, getCartTotal } from "./cart.js";
import { SITE } from "../config/site.js";
import { buildWhatsAppMessage } from "../utils/whatsappMessage.js";

const button = document.querySelector("#sendWhatsapp");

button?.addEventListener("click", () => {
  const items = getCartItems();

  if (items.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const message = buildWhatsAppMessage({
    items,
    total: getCartTotal(),
  });
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${SITE.phone}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
});

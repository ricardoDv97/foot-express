import { formatPrice } from "./formatPrice.js";

const SEPARATOR = "────────────────";

function buildOptionSection(title, values) {
  if (!values.length) return [];

  return [title, "", ...values.flatMap((value) => [`• ${value}`, ""])];
}

export function buildWhatsAppMessage({ items, total }) {
  const orderLines = items.flatMap((item) => [
    SEPARATOR,
    "",
    `${item.quantity} x ${item.product.name}`,
    "",
    ...buildOptionSection("Aderezos", item.options.sauces),
    ...buildOptionSection("Extras", item.options.extras),
    ...buildOptionSection("Notas", item.options.notes ? [item.options.notes] : []),
    "Subtotal",
    "",
    formatPrice(item.subtotal),
    "",
  ]);

  return [
    "🍔 FOOD EXPRESS",
    "",
    "Hola 👋",
    "",
    "Quiero realizar el siguiente pedido:",
    "",
    ...orderLines,
    SEPARATOR,
    "",
    "TOTAL",
    "",
    formatPrice(total),
    "",
    "Muchas gracias.",
  ].join("\n");
}

import { products } from "./products.js";
import { promotions } from "./promotions.js";

// Punto único de consulta para los flujos que necesitan resolver un ítem
// sin acoplarse a una categoría concreta del catálogo.
export const catalog = [...promotions, ...products];

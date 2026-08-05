import hamburCompletaX2 from "../assets/hamburCompletaX2.webp";
import hamburCompletaX4 from "../assets/hamburCompletaX4.webp";
import pizzaX2 from "../assets/pizzaX2.webp";
import pizzaX4 from "../assets/pizzaX4.webp";
import sandwichDeMilanesaX2 from "../assets/SandwichDeMilanesaX2.webp";
import promoPapas from "../assets/promoPapas.webp";



// Las promociones son una fuente de datos independiente, pero respetan el
// contrato de producto para poder usar las mismas cards y el mismo modal.
export const promotions = [
  {
    id: 101,
    slug: "promo-2-hamburguesas",
    name: "Promo 2 Hamburguesas",
    category: "Promociones",
    description: "Dos hamburguesas completas para compartir.",
    image: hamburCompletaX2,
    price: 7500,
    available: true,
    featured: true,
    options: {
      sauces: ["Mayonesa", "Ketchup", "Mostaza"],
    },
  },
  {
    id: 102,
    slug: "promo-4-hamburguesas",
    name: "Promo 4 Hamburguesas",
    category: "Promociones",
    description: "Cuatro hamburguesas completas, ideales para la juntada.",
    image: hamburCompletaX4,
    price: 14000,
    available: true,
    featured: true,
    options: {
      sauces: ["Mayonesa", "Ketchup", "Mostaza"],
    },
  },
  {
    id: 103,
    slug: "promo-2-pizzas",
    name: "Promo 2 Pizzas",
    category: "Promociones",
    description: "Dos pizzas de muzzarella recién hechas para disfrutar.",
    image: pizzaX2,
    price: 15000,
    available: true,
    featured: true,
    options: {},
  },
  {
    id: 104,
    slug: "promo-4-pizzas",
    name: "Promo 4 Pizzas",
    category: "Promociones",
    description: "Cuatro pizzas de muzzarella para compartir en grande.",
    image: pizzaX4,
    price: 29000,
    available: true,
    featured: true,
    options: {},
  },
  {
    id: 105,
    slug: "promo-2-sandwichDeMilanesa",
    name: "Promo 2 Sanwich de Milanesa",
    category: "Promociones",
    description: "2 Sandwich de Milanesa de Pollo con Lechuga, tomate y aderezos.",
    image: sandwichDeMilanesaX2,
    price: 15000,
    available: true,
    featured: true,
    options: {
      sauces: ["Mayonesa", "Ketchup", "Mostaza"],
    },
  },
  {
    id: 106,
    slug: "promo-papas",
    name: "¡Promo de Papas Fritas!",
    category: "Promociones",
    description: "llevando cualquier producto, Las papas fritas tienen descuento.",
    image: promoPapas,
    price: 5000,
    available: true,
    featured: true,
    options: {
    },
  }
];

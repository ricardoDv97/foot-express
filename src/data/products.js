// ============================
// FOOD EXPRESS
// Catálogo de productos
// ============================

// Imágenes
import pizza from "../assets/pizza-hero.png";

// Cuando agregues nuevas imágenes solo importa aquí:
//
// import hamburguesa from "../assets/hamburguesa-completa.webp";
// import milanesa from "../assets/milanesa.webp";
// import papas from "../assets/papas.webp";

export const products = [

  {
    id: 1,

    slug: "pizza-muzzarella",

    name: "Pizza Muzzarella",

    category: "Pizzas",

    description:
      "Nuestra clásica pizza de muzzarella con abundante queso.",

    image: pizza,

    price: 8000,

    available: true,

    featured: true,

    options: {}
  },

  {
    id: 2,

    slug: "hamburguesa-completa",

    name: "Hamburguesa Completa",

    category: "Hamburguesas",

    description:
      "Carne, queso, huevo, paleta, lechuga, tomate y aderezos.",

    image: pizza,

    price: 4000,

    available: true,

    featured: true,

    options: {
      sauces: [
        "Mayonesa",
        "Ketchup",
        "Mostaza"
      ]
    }
  },

  {
    id: 3,

    slug: "sandwich-milanesa",

    name: "Sándwich de Milanesa",

    category: "Sándwiches",

    description:
      "Milanesa casera con verduras frescas.",

    image: pizza,

    price: 6500,

    available: false,

    featured: false,

    options: {}
  },

  {
    id: 4,

    slug: "papas-fritas",

    name: "Papas Fritas",

    category: "Guarniciones",

    description:
      "Papas fritas recién hechas.",

    image: pizza,

    price: 3500,

    available: false,

    featured: false,

    options: {
      sauces: [
        "Mayonesa",
        "Ketchup"
      ]
    }
  }

];
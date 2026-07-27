// Imágenes
import pizza from "../assets/pizza-hero.png";

// Cuando agreguemos las demás imágenes
// simplemente las importaremos aquí.

// import hamburguesa from "../assets/hamburguesa.png";
// import papas from "../assets/papas.png";
// import milanesa from "../assets/milanesa.png";

export const products = [

  {
    id: 1,

    name: "Pizza Muzzarella",

    description:
      "Nuestra clásica pizza de muzzarella con abundante queso.",

    price: "$8.000",

    category: "Pizzas",

    image: pizza,

    whatsapp:
      "Hola 👋 Quiero pedir una Pizza Muzzarella."
  },

  {
    id: 2,

    name: "Hamburguesa Completa",

    description:
      "Carne, queso, huevo, paleta, lechuga, tomate y adherezos.",

    price: "$4.000",

    image: pizza,

    category: "Hamburguesas",

    whatsapp:
      "Hola 👋 Quiero pedir una Hamburguesa Completa."
  },

  {
    id: 3,

    name: "Sandwich de Milanesa",

    description:
      "Milanesa casera con verduras frescas.",

    price: "Próximamente",

    image: pizza,

    category: "Sandwiches",

    whatsapp:
      "Hola 👋 Quiero pedir un Sandwich de Milanesa."
  },

  {
    id: 4,

    name: "Papas Fritas",

    description:
      "Papas fritas recién hechas.",

    price: "Próximamente",

    image: pizza,

    category: "Guarniciones",

    whatsapp:
      "Hola 👋 Quiero pedir unas Papas Fritas."
  }

];
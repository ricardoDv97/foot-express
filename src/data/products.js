// ============================
// FOOD EXPRESS
// Catálogo de productos
// ============================

// Imágenes
import fallbackImage from "../assets/pizza-hero.png";
import pizzaMuzzarella from "../assets/pizzaMuzzarella.webp";
import hamburguesaCompleta from "../assets/hamburguesaCompleta.webp";
import sandwichDeMilanesa from "../assets/SandwichDeMilanesa.webp";
import pizzaCriolla from "../assets/pizzaCriolla.webp";
import pizzaFugaceta from "../assets/pizzaFugaceta.webp";
import SalchipapaGratinada from "../assets/SalchipapaGratinada.webp";
import SalchipapaConHuevo from "../assets/SalchipapaConHuevo.webp";
import hamburguesaEspecial1 from "../assets/hamburguesaEspecial1.webp"
import empanadas from "../assets/empanadas.webp"
import papasConAderezos from "../assets/papasConAderezos.webp";


export const products = [

  {
    id: 1,

    slug: "pizza-muzzarella",

    name: "Pizza Muzzarella",

    category: "Pizzas",

    description:
      "Nuestra clásica pizza de muzzarella con abundante queso.",

    image: pizzaMuzzarella,

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

    image: hamburguesaCompleta,

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

    image: sandwichDeMilanesa,

    price: 8000,

    available: true,

    featured: true,

    options: {}
  },

  {
    id: 4,

    slug: "Salchipapas-Gratinadas",

    name: "Salchipapas Gratinadas",

    category: "Guarniciones",

    description:
      "Papas fritas recién hechas con Salchichas salteadas y gratinadas con queso Muzzarella.",

    image: SalchipapaGratinada,

    price: 6000,

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
    id: 5,

    slug: "pizza-Criolla",

    name: "Pizza Criolla",

    category: "Pizzas",

    description:
      "Nuestra clásica pizza a la Criolla con abundante queso y Salsa Criolla tradicional.",

    image: pizzaCriolla,

    price: 10000,

    available: true,

    featured: true,

    options: {}
  },
  {
    id: 6,

    slug: "pizza-Fugaceta",

    name: "Pizza Fugaceta",

    category: "Pizzas",

    description:
      "Nuestra clásica pizza Fugaceta con abundante queso y cebollas cortadas en juliana.",

    image: pizzaFugaceta,

    price: 10000,

    available: true,

    featured: true,

    options: {}
  },
  {
    id: 7,

    slug: "Salchipapas-con-huevo",

    name: "Salchipapas con Huevo",

    category: "Guarniciones",

    description:
      "Papas fritas recién hechas con Salchichas salteadas y 2 huevos fritos.",

    image: SalchipapaConHuevo,

    price: 7000,

    available: true,

    featured: true,

    options: {}
  },
  {
    id: 8,

    slug: "Hamburguesa-Especial",

    name: "Hamburguesa Especial",

    category: "Hamburguesas",

    description:
      "Hamburguesa completa Doble Carne con cebolla caramelizada y quezo muzzarella",

    image: hamburguesaEspecial1,

    price: 8000,

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
    id: 9,

    slug: "empanadas",

    name: "Empanadas de carne",

    category: "empanadas",

    description:
      "Empanadas de Carne Vacuna X 12 Unidades.",

    image: empanadas,

    price: 12000,

    available: true,

    featured: true,

    options: {}
  },
  {
    id: 10,

    slug: "Papas-Fritas",

    name: "Papas Fritas con Aderezos",

    category: "Papas Fritas",

    description: "Papas Fritas crugientes con los aderezos que elijas!!.",

    image: papasConAderezos,

    price: 6000,

    available: true,

    featured: true,

    options: {
      sauces: [
        "Mayonesa",
        "Ketchup",
        "Mostaza"
      ]
    }
  }
  

];

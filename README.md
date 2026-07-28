# Food Express

MVP estático de pedidos por WhatsApp construido con Astro y Tailwind CSS.

## Requisitos

- Node.js 22.12 o superior
- npm

## Comandos

```sh
npm install
npm run dev
npm run build
npm run preview
```

El build genera archivos estáticos en `dist/`.

## Configuración comercial

La información del negocio y la URL pública viven en `src/config/site.js`.
El catálogo está en `src/data/products.js` y es la fuente de verdad de productos e imágenes.

## Flujo de pedido

1. El usuario selecciona un producto y sus opciones.
2. El carrito se persiste localmente en el navegador.
3. El pedido se convierte a texto y se abre en WhatsApp.

## Publicación

La URL de producción configurada es `https://foodexpress.vercel.app`.
Antes de publicar, ejecutar `npm run build` y revisar el checklist de release del proyecto.

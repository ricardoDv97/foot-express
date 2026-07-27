import { formatPrice } from "./formatPrice.js";

export function buildWhatsappMessage(cart){

let message="🍔 *FOOD EXPRESS*%0A%0A";

message+="Hola 👋%0A";

message+="Quiero realizar el siguiente pedido:%0A%0A";

let total=0;

cart.forEach(item=>{

message+=`${item.quantity} x ${item.product.name}%0A`;

if(item.options.sauces.length){

message+="Aderezos:%0A";

item.options.sauces.forEach(s=>{

message+=`• ${s}%0A`;

});

}

message+=`Subtotal: ${formatPrice(item.subtotal)}%0A`;

message+="----------------------------%0A";

total+=item.subtotal;

});

message+=`%0ATOTAL: ${formatPrice(total)}%0A%0A`;

message+="Muchas gracias.";

return message;

}
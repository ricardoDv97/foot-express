import { AppState } from "./store.js";
import { SITE } from "../config/site.js";

const button=document.querySelector("#sendWhatsapp");

button?.addEventListener("click",()=>{

if(AppState.cart.length===0){

alert("El carrito está vacío.");

return;

}

let message="Hola 👋 Quiero realizar el siguiente pedido:%0A%0A";

AppState.cart.forEach(item=>{

message+=`${item.quantity} x ${item.name}`;

if(item.sauces.length){

message+=` (%20${item.sauces.join(", ")})`;

}

message+="%0A";

});

const total=AppState.cart.reduce((a,b)=>{

return a+b.price*b.quantity;

},0);

message+=`%0ATotal: $${new Intl.NumberFormat("es-AR").format(total)}`;

window.open(

`https://wa.me/${SITE.phone}?text=${message}`,

"_blank"

);

});

import { AppState } from "./store.js";

const CART_KEY = "foodexpress-cart";

const cartButton = document.querySelector("#cartButton");

const cartCounter = document.querySelector("#cartCounter");

const cartDrawer = document.querySelector("#cartDrawer");

const cartOverlay = document.querySelector("#cartOverlay");

const closeCart = document.querySelector("#closeCart");

const cartItems = document.querySelector("#cartItems");

const cartTotal = document.querySelector("#cartTotal");

const formatter = new Intl.NumberFormat("es-AR");

function save(){

localStorage.setItem(CART_KEY,JSON.stringify(AppState.cart));

}

function load(){

const data=localStorage.getItem(CART_KEY);

if(data){

AppState.cart=JSON.parse(data);

}

render();

}

function total(){

return AppState.cart.reduce((acc,item)=>{

return acc+item.price*item.quantity;

},0);

}

function count(){

return AppState.cart.reduce((acc,item)=>{

return acc+item.quantity;

},0);

}

function render(){

const items=count();

cartCounter.textContent=items;

if(items>0){

cartButton.classList.remove("hidden");

}else{

cartButton.classList.add("hidden");

}

cartItems.innerHTML="";

if(AppState.cart.length===0){

cartItems.innerHTML=`

<p class="text-center text-gray-400">

Tu carrito está vacío.

</p>

`;

cartTotal.textContent="$0";

return;

}

AppState.cart.forEach((item,index)=>{

const div=document.createElement("div");

div.className="card p-5";

div.innerHTML=`

<h3 class="font-bold text-xl">

${item.name}

</h3>

<p class="mt-2 text-gray-400">

Cantidad: ${item.quantity}

</p>

${item.sauces.length?

`<p class="mt-2 text-sm">

${item.sauces.join(", ")}

</p>`:""}

<div class="mt-5 flex justify-between items-center">

<strong>

$ ${formatter.format(item.price*item.quantity)}

</strong>

<button
data-remove="${index}"
class="rounded-lg bg-red-600 px-3 py-2"
>

Eliminar

</button>

</div>

`;

cartItems.append(div);

});

cartItems.querySelectorAll("[data-remove]").forEach(btn=>{

btn.addEventListener("click",()=>{

AppState.cart.splice(btn.dataset.remove,1);

save();

render();

});

});

cartTotal.textContent="$ "+formatter.format(total());

}

export function addToCart(item){

const found=AppState.cart.find(p=>{

return p.id===item.id &&

JSON.stringify(p.sauces)===JSON.stringify(item.sauces);

});

if(found){

found.quantity+=item.quantity;

}else{

AppState.cart.push(item);

}

save();

render();

}

cartButton?.addEventListener("click",()=>{

cartDrawer.classList.remove("-translate-x-full");

cartOverlay.classList.remove("hidden");

});

closeCart?.addEventListener("click",()=>{

cartDrawer.classList.add("-translate-x-full");

cartOverlay.classList.add("hidden");

});

cartOverlay?.addEventListener("click",()=>{

cartDrawer.classList.add("-translate-x-full");

cartOverlay.classList.add("hidden");

});

load();
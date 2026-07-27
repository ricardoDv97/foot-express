import { products } from "../data/products";
import { AppState } from "./store.js";
import { addToCart } from "./cart.js";

const overlay = document.querySelector("#productModalOverlay");

const image = document.querySelector("#modalImage");
const title = document.querySelector("#modalTitle");
const category = document.querySelector("#modalCategory");
const description = document.querySelector("#modalDescription");
const price = document.querySelector("#modalPrice");

const saucesContainer = document.querySelector("#saucesContainer");
const saucesList = document.querySelector("#saucesList");

const quantityText = document.querySelector("#productQuantity");

const increase = document.querySelector("#increaseQty");
const decrease = document.querySelector("#decreaseQty");

const addButton = document.querySelector("#addToCartButton");

const closeButton = document.querySelector("#closeProductModal");

const formatter = new Intl.NumberFormat("es-AR");

function openProduct(id){

const product=products.find(p=>p.id===id);

if(!product) return;

AppState.currentProduct=product;

AppState.quantity=1;

AppState.sauces=[];

quantityText.textContent="1";

image.src=product.image.src;

image.alt=product.name;

title.textContent=product.name;

category.textContent=product.category;

description.textContent=product.description;

price.textContent="$ "+formatter.format(product.price);

saucesList.innerHTML="";

if(product.options.sauces){

saucesContainer.classList.remove("hidden");

product.options.sauces.forEach(sauce=>{

const label=document.createElement("label");

label.className="flex items-center gap-3 rounded-xl border border-neutral-700 p-3 cursor-pointer";

label.innerHTML=`

<input type="checkbox" value="${sauce}">

<span>${sauce}</span>

`;

const input=label.querySelector("input");

input.addEventListener("change",()=>{

if(input.checked){

AppState.sauces.push(sauce);

}else{

AppState.sauces=AppState.sauces.filter(s=>s!==sauce);

}

});

saucesList.append(label);

});

}else{

saucesContainer.classList.add("hidden");

}

overlay.classList.remove("hidden");

overlay.classList.add("flex");

}

document.querySelectorAll("[data-open-product]").forEach(card=>{

card.addEventListener("click",()=>{

openProduct(Number(card.dataset.openProduct));

});

});

increase.addEventListener("click",()=>{

AppState.quantity++;

quantityText.textContent=AppState.quantity;

});

decrease.addEventListener("click",()=>{

if(AppState.quantity===1) return;

AppState.quantity--;

quantityText.textContent=AppState.quantity;

});

addButton.addEventListener("click",()=>{

addToCart({

id:AppState.currentProduct.id,

name:AppState.currentProduct.name,

price:AppState.currentProduct.price,

quantity:AppState.quantity,

image:AppState.currentProduct.image.src,

sauces:[...AppState.sauces]

});

overlay.classList.remove("flex");

overlay.classList.add("hidden");

});

closeButton.addEventListener("click",()=>{

overlay.classList.remove("flex");

overlay.classList.add("hidden");

});

overlay.addEventListener("click",(e)=>{

if(e.target===overlay){

overlay.classList.remove("flex");

overlay.classList.add("hidden");

}

});
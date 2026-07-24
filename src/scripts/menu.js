const button=document.querySelector("#menuButton");

const drawer=document.querySelector("#menuDrawer");

const overlay=document.querySelector("#drawerOverlay");

const close=document.querySelector("#closeDrawer");

function openDrawer(){

drawer.classList.remove("translate-x-full");

overlay.classList.remove("hidden");

}

function closeDrawer(){

drawer.classList.add("translate-x-full");

overlay.classList.add("hidden");

}

button?.addEventListener("click",openDrawer);

close?.addEventListener("click",closeDrawer);

overlay?.addEventListener("click",closeDrawer);
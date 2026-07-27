const KEY="foodexpress-cart";

export function loadCart(){

    const data=localStorage.getItem(KEY);

    if(!data) return [];

    try{

        return JSON.parse(data);

    }catch{

        return [];

    }

}

export function saveCart(cart){

    localStorage.setItem(KEY,JSON.stringify(cart));

}

export function clearCart(){

    localStorage.removeItem(KEY);

}
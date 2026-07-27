const formatter=new Intl.NumberFormat("es-AR");

export function formatPrice(price){

    return "$ "+formatter.format(price);

}
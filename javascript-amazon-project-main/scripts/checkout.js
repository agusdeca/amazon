import {renderOrder} from "./checkout/orderSummary.js";
import {renderSummary} from "./checkout/paymentSummary.js";
import { cargarProductos,cargarProductosFetch } from "../data/products.js";
//import '../data/class-carrito.js'
//import '../data/practica-backend.js'


Promise.all([
    cargarProductosFetch()
]).then(()=>{
    renderOrder();
    renderSummary();
}).catch((error) => {
    console.error("Error loading products:", error);
});


/*
new Promise((resolve)=>{
    cargarProductos(()=>{
        resolve()
    })
}).then(()=>{
    renderOrder();
    renderSummary();
})
*/


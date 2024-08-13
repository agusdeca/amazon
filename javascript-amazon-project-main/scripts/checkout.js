import {renderOrder} from "./checkout/orderSummary.js";
import {renderSummary} from "./checkout/paymentSummary.js";
import { cargarProductos } from "../data/products.js";
//import '../data/class-carrito.js'
//import '../data/practica-backend.js'

cargarProductos(()=>{
    renderOrder();
    renderSummary();
})


import { carrito, actualizarCantidad } from '../../data/carrito.js';
import { products } from '../../data/products.js';
import { obtenerDelivery } from '../../data/opcionDelivery.js';

export function renderSummary() {
    var totalProductos = 0;
    var productoConEnvio = 0;
    
    carrito.forEach(producto => {
        var matchProducto;
        products.forEach(product => {
            if (producto.idProducto === product.id) {
                matchProducto = product;
            }
        });
        
        totalProductos += (producto.cantidadProducto * matchProducto.priceCents);
        var deliveryValor = obtenerDelivery(producto.deliveryId);
        productoConEnvio += deliveryValor.priceCents;
    });
    
    totalProductos = (totalProductos / 100).toFixed(2);
    
    const totalProductosNum = parseFloat(totalProductos);
    const productoConEnvioNum = productoConEnvio / 100;

    const precioDespuesEnvios = totalProductosNum + productoConEnvioNum;
    const impuesto = precioDespuesEnvios * 0.1;
    const total = precioDespuesEnvios + impuesto;

    const paymentSummary = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${carrito.length}):</div>
            <div class="payment-summary-money">$${totalProductos}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping & handling:</div>
            <div class="payment-summary-money">$${productoConEnvioNum.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${precioDespuesEnvios.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${impuesto.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${total.toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;
    
    document.querySelector(".payment-summary").innerHTML = paymentSummary;
}

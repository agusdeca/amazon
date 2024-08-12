import{products} from '../../data/products.js'
import {carrito,borrarProducto,actualizarCantidad,actualizarDelivery} from '../../data/carrito.js'
import{opcionDelivery,obtenerDelivery} from '../../data/opcionDelivery.js'
import { renderSummary } from './paymentSummary.js';



export function renderOrder(){
  var textoProductoHtml="";
  carrito.forEach((productoCarrito)=>{
      actualizarCantidad();
      var matchProducto
      products.forEach((producto)=>{
          if(producto.id===productoCarrito.idProducto){
              matchProducto=producto;
          }
      })
      console.log(matchProducto)
              var opcionDeliveryId= productoCarrito.deliveryId
              var encontradoDelivery=obtenerDelivery(opcionDeliveryId)
              
              
              const diaHoy= dayjs()
              const diaDelivery=diaHoy.add(encontradoDelivery.diasDelivery,'days');
              const diaString=diaDelivery.format('dddd, MMMM D');

              var textoProductos=` <div class="cart-item-container js-cart-item-container-${matchProducto.id}">
                <div class="delivery-date">
                    Delivery date: ${diaString}
                </div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchProducto.image}">
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchProducto.name}
                        </div>
                        <div class="product-price">
                            $${matchProducto.getprice()}
                        </div>
                        <div class="product-quantity js-product-quantity-${matchProducto.id}">
                            <span>
                                Quantity: <span class="quantity-label">${productoCarrito.cantidadProducto}</span>
                            </span>
                            <span class="update-quantity-link link-primary" data-id-producto="${matchProducto.id}">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary" data-id-producto="${matchProducto.id}">
                                Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${opcionesDeliveryHTML(matchProducto, productoCarrito)}
                    </div>
                </div>
            </div>`
          
        textoProductoHtml+=textoProductos    
  })
  function opcionesDeliveryHTML(matchProducto,carrito){
    let html=''
    opcionDelivery.forEach((opcion=>{
      const diaHoy= dayjs()
      const diaDelivery=diaHoy.add(opcion.diasDelivery,'days');
      const diaString=diaDelivery.format('dddd, MMMM D');
      const priceString= opcion.priceCents
      ===0
      ?'Gratis'
      :`$${(opcion.priceCents/100).toFixed(2)}`
      const isChecked=opcion.id===carrito.deliveryId
      html+=`
            <div class="delivery-option" data-id-producto="${matchProducto.id}" data-id-opcion-delivery="${opcion.id}">
                <input type="radio" ${isChecked ?'checked' :''} class="delivery-option-input"name="${matchProducto.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${diaString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString}
                        </div>
                      </div>
              </div>
            `
    }))
    return html
  }
  document.querySelector(".order-summary").innerHTML=textoProductoHtml

  document.querySelectorAll(".delete-quantity-link").forEach((link)=>{
      link.addEventListener('click',()=>{
          const idDelProducto= link.dataset.idProducto
          borrarProducto(idDelProducto);
          const contenedor= document.querySelector(`.js-cart-item-container-${idDelProducto}`)
          contenedor.remove()
          renderSummary()
      })
  })

  document.querySelectorAll(".update-quantity-link").forEach((link) => {
        link.addEventListener('click', () => {
            const idDelProducto = link.dataset.idProducto;
            const productQuantityDiv = document.querySelector(`.js-product-quantity-${idDelProducto}`);
            const currentQuantity = carrito.find(product => product.idProducto == idDelProducto).cantidadProducto;

            productQuantityDiv.innerHTML = `
                <input type="number" class="update-quantity-input" value="${currentQuantity}" min="1">
                <button class="save-quantity-button" data-id-producto="${idDelProducto}">Save</button>
                <button class="cancel-quantity-button" data-id-producto="${idDelProducto}">Cancel</button>
            `;

            document.querySelector(`.save-quantity-button[data-id-producto="${idDelProducto}"]`).addEventListener('click', () => {
                const newQuantity = document.querySelector(`.update-quantity-input`).value;
                var matchProducto;
                carrito.forEach((producto)=>{
                  if(producto.idProducto==idDelProducto){
                    matchProducto=producto
                  }
                })
                matchProducto.cantidadProducto=newQuantity;
                renderOrder();
                renderSummary();
            });

            document.querySelector(`.cancel-quantity-button[data-id-producto="${idDelProducto}"]`).addEventListener('click', () => {
                renderOrder();
            });
        });
    });

  document.querySelectorAll(".delivery-option").forEach((item) => {
    item.addEventListener('click', () => {
      const { idProducto, idOpcionDelivery } = item.dataset;
      actualizarDelivery(idProducto, idOpcionDelivery);
      renderOrder()
      renderSummary()
    });
  });
}

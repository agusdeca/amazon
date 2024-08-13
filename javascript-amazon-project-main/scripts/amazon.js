import {carrito, agregarCarrito,mostrarCarrito} from '../data/carrito.js'
import{products,Clothing,cargarProductos} from '../data/products.js'
//mostrar los productos
cargarProductos(renderProductos)
function renderProductos(){
  let prHtml="";
products.forEach((producto)=>{
  const textoProductos=`<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${producto.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${producto.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${producto.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${producto.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${producto.getprice()}
          </div>

          <div class="product-quantity-container">
            <select class="product-quantity" data-id-producto="${producto.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${producto.extraInfo()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-id-producto="${producto.id}">
            Add to Cart
          </button>
        </div>`;
        prHtml+=textoProductos
});
document.querySelector(".products-grid").innerHTML=prHtml
mostrarCarrito();

//sumar al carrito
document.querySelectorAll(".add-to-cart-button").forEach((button)=>{
    button.addEventListener('click',()=>{
        const idPr=button.dataset.idProducto 
        const cantidadPr = parseInt(document.querySelector(`.product-quantity[data-id-producto="${idPr}"]`).value);
        agregarCarrito(idPr,cantidadPr);
        mostrarCarrito();
        console.log(carrito)
    })
})
}


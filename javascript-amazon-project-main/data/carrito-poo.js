function Cart(nombreLocalStorage){
    var cart = {
        carrito: JSON.parse(localStorage.getItem(nombreLocalStorage)) || [],
        
        almacenarCarrito() {
            localStorage.setItem(nombreLocalStorage, JSON.stringify(this.carrito));
        },
    
        agregarCarrito(idPr, cantidadPr) {
            var articuloMatch;
    
            this.carrito.forEach((item) => {
                if (item.idProducto === idPr) {
                    articuloMatch = item;  
                }
            });
    
            if (articuloMatch) {
                articuloMatch.cantidadProducto += cantidadPr;
            } else {
                this.carrito.push({
                    idProducto: idPr,
                    cantidadProducto: cantidadPr,
                    deliveryId: '1'
                });
            }
            
            this.almacenarCarrito();
            this.mostrarCarrito();
        },
    
        mostrarCarrito() {
            var total = 0;
            this.carrito.forEach((producto) => {
                total += producto.cantidadProducto;
            });
    
            var cartQuantityElement = document.querySelector(".cart-quantity");
            if (cartQuantityElement) {
                cartQuantityElement.innerHTML = total;
            } else {
                console.error("El elemento .cart-quantity no se encontró en el DOM.");
            }
        },
    
        borrarProducto(idProducto) {
            const nuevoCarrito = this.carrito.filter((producto) => producto.idProducto !== idProducto);
            this.carrito = nuevoCarrito;
            this.almacenarCarrito();
            this.actualizarCantidad();
        },
    
        actualizarCantidad() {
            var returnToHomeLink = document.querySelector(".return-to-home-link");
            if (returnToHomeLink) {
                returnToHomeLink.innerHTML = `${this.carrito.length} items`;
            } else {
                console.error("El elemento .return-to-home-link no se encontró en el DOM.");
            }
        },
    
        actualizarDelivery(idProducto, opcionDelivery) {
            var articuloMatch;
            this.carrito.forEach((item) => {
                if (item.idProducto === idProducto) {
                    articuloMatch = item;  
                }
            });
    
            if (articuloMatch) {
                articuloMatch.deliveryId = opcionDelivery;
                this.almacenarCarrito();
            } else {
                console.error('Producto no encontrado en el carrito.');
            }
        }
    };

    return cart; 
}

const carrito = Cart('carrito-poo');
const carritoBusiness = Cart('carrito-poo-business');

carrito.agregarCarrito('15b6fc6f-327a-4ec4-896f-486349e85a3d', 2);
carritoBusiness.agregarCarrito('15b6fc6f-327a-4ec4-896f-486349e85a3d', 222);

console.log(carrito);
console.log(carritoBusiness);

class Cart{
    #localStorageKey;
    carrito= JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];

    constructor(nombreLocalStorage){
        this.#localStorageKey=nombreLocalStorage;
    }

    almacenarCarrito() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.carrito));
    };

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
    };

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
    };

    borrarProducto(idProducto) {
        const nuevoCarrito = this.carrito.filter((producto) => producto.idProducto !== idProducto);
        this.carrito = nuevoCarrito;
        this.almacenarCarrito();
        this.actualizarCantidad();
    };

    actualizarCantidad() {
        var returnToHomeLink = document.querySelector(".return-to-home-link");
        if (returnToHomeLink) {
            returnToHomeLink.innerHTML = `${this.carrito.length} items`;
        } else {
            console.error("El elemento .return-to-home-link no se encontró en el DOM.");
        }
    };

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
}
4
const carro= new Cart("carrito-poo")
carro.agregarCarrito("83d4ca15-0f35-48f5-b7a3-1ea210004f2e",2)
console.log(carro)

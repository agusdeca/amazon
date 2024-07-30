 export var carrito=JSON.parse(localStorage.getItem('carrito'))|| [];

 function almacenarCarrito(){
    localStorage.setItem('carrito',JSON.stringify(carrito));
    
 }

 export function agregarCarrito(idPr,cantidadPr){
    var articuloMatch;

        carrito.forEach((item)=>{
            if(item.idProducto===idPr){
                articuloMatch=item;  
            }
        })
        
        if(articuloMatch){
            articuloMatch.cantidadProducto+=cantidadPr;
        }else{
            carrito.push(
                {
                    idProducto: idPr,
                    cantidadProducto:cantidadPr,
                    deliveryId:'1' 
                }
            )
            
        }
        almacenarCarrito();
        mostrarCarrito();
}

export function mostrarCarrito(){
  var total=0
  carrito.forEach((producto)=>{
    total+=producto.cantidadProducto;
  })
  document.querySelector(".cart-quantity").innerHTML=total
  
}

export function borrarProducto(idProducto){
    const nuevoCarrito=[]
    carrito.forEach((producto)=>{
        if(producto.idProducto!==idProducto){
            nuevoCarrito.push(producto)
        }
    })

    carrito=nuevoCarrito;
    almacenarCarrito();
    actualizarCantidad();
}

export function actualizarCantidad(){
    document.querySelector(".return-to-home-link").innerHTML=`${carrito.length} items`
}

export function actualizarDelivery(idProducto,opcionDelivery){
    var articuloMatch;
    carrito.forEach((item)=>{
        if(item.idProducto===idProducto){
            articuloMatch=item;  
        }
    })

    articuloMatch.deliveryId=opcionDelivery;
    almacenarCarrito();
}
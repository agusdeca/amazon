 export var carrito=[
    {
        idProducto:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        cantidadProducto:2
    },
    {
        idProducto:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        cantidadProducto:1 
    }
 ];
 export function agregarCarrito(idPr,cantidadPr){
    var articuloMatch;

        carrito.forEach((item)=>{
            if(item.idProducto===idPr){
                articuloMatch=item;  
            }
        })
        
        if(articuloMatch){
            articuloMatch.cantidadProducto+=1;
        }else{
            carrito.push(
                {
                    idProducto: idPr,
                    cantidadProducto:cantidadPr
                }
            )
            
        }

}

export function mostrarCarrito(){
  var total=0
  carrito.forEach((producto)=>{
    total+=producto.cantidadProducto;
  })
  document.querySelector(".cart-quantity").innerHTML=total
}

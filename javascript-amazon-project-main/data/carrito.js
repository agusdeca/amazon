 export var carrito=[];
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

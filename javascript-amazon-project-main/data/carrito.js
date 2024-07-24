var carrito=[];

document.querySelectorAll(".add-to-cart-button").forEach((button)=>{
    button.addEventListener('click',()=>{
        const nombrePr=button.dataset.nombreProducto 
        const cantidadPr=1
        
        carrito.push(
            {
                nombreProducto: nombrePr,
                cantidadProducto:cantidadPr
            }
        )
    })
})
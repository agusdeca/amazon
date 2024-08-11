import{agregarCarrito,carrito} from '../data/carrito'
descibe('Test suite: Agregar al carrito',()=>{
    it( "Agrega un producto ya existente al carrito",()=>{

    })
    it("Agrega un nuevo producto al carrito",()=>{
        agregarCarrito('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',2)
        expect(carrito.length).toEqual(1);
    })
})
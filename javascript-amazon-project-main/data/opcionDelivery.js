export const opcionDelivery=[
    {
        id:'1',
        diasDelivery:7,
        priceCents:0
    },
    {
        id:'2',
        diasDelivery:3,
        priceCents:499
    },
    {
        id:'3',
        diasDelivery:1,
        priceCents:999
    }
]

export function obtenerDelivery(numero){
    let opcionEncontrada
    opcionDelivery.forEach((opcion)=>{
        if(opcion.id==numero){
            opcionEncontrada= opcion
        }
    })
    return opcionEncontrada || opcionDelivery[0]    
}
window.onload = function ( ) {
    let agregarBoton = document.querySelector(".add-detail")

    console.log(JSON.parse(localStorage.getItem("carrito")))

    if (JSON.parse(localStorage.getItem("carrito")) == null) {
        
        localStorage.setItem("carrito", JSON.stringify([]))

    }
    let img = document.getElementById("image")
    let nombre = document.getElementById("name")
    let id = document.getElementById("idProduct")
    let brand = document.getElementById("brand")
    let color = document.getElementById("color")
    let size = document.getElementById("size")
    let category = document.getElementById("category")
    let description = document.getElementById("description")
    let price = document.querySelector(".price-detail")
    

    agregarBoton.addEventListener("click", function( ){
        
        const carrito = JSON.parse(localStorage.getItem("carrito"))
        const producto = {
            id : id.innerText,
            nombre: nombre.innerText,
            brand: brand.innerText,
            color: color.innerText,
            size: size.innerText,
            category: category.innerText,
            description: description.innerText,
            price: parseFloat(price.innerText),
            img: img.alt
        }

        if (carrito.length > 0) {
            
            let productoCarrito = carrito.find(row=> row.id == producto.id)
            if (productoCarrito) {
                productoCarrito.quantity += 1
                productoCarrito.subtotal += producto.price
            } else {
                producto.quantity = 1
                producto.subtotal = producto.quantity*producto.price
                carrito.push(producto)
            }

        } else {
            producto.quantity = 1
            producto.subtotal = producto.quantity*producto.price
            carrito.push(producto)
        }

        localStorage.setItem("carrito", JSON.stringify(carrito))
        
        console.log(producto)
    })
}
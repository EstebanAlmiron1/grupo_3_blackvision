window.onload = function ( ) {
    displayCarrito();
    actualizarTotal();
}

let displayCarrito = function( ){
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    let carritoContainer = document.querySelector(".selected")    
    carritoContainer.innerHTML = " "
    carrito.forEach(element => {
        carritoContainer.innerHTML += `
        <article>
            <div class="photobox">
                <img id="photo-product" src="/img/products/${element.img}" alt="">
            </div>
            <div class="detail-product">
                
                <div class="column-product">
                    <h3>PRODUCTO</h3>
                        <P>${element.name}</P>
                        <p>${element.color}</p>
                        <p>${element.size}</p>
                        <p>${element.brand}</p>
                </div>
                <div class="cant-price">
                    
                    <div class="column-amount">
                        <h3>CANTIDAD</h3>
                        <p> <i onClick="sumar(${element.id})" class="fas fa-plus"></i> ${element.quantity} <i onClick="restar(${element.id})" class="fas fa-minus"></i> </p>
                    </div>
                <div class="column-price">
                    <h3>PRECIO</h3>
                        <P>$${element.price}</P>
                </div>
            </div>
            </div>
        </article>
        `
    });
}
let actualizarTotal = function(){
    let productos = JSON.parse(localStorage.getItem("carrito"));
    let sumaTotal = productos.reduce((acum, current) => acum + current.subtotal, 0);
    let subtotal = document.getElementById('subtotal');
    let total = document.getElementById('total');
    subtotal.innerHTML = `$ ${sumaTotal}`;
    total.innerHTML = `$ ${sumaTotal}`;
};
let sumar = function(id){
    let productos = JSON.parse(localStorage.getItem("carrito"));
    let producto = productos.find((row) => row.id == id);
    producto.quantity += 1;
    producto.subtotal = producto.price * producto.quantity;
    localStorage.setItem("carrito", JSON.stringify(productos));
    displayCarrito();
    actualizarTotal();
};
let restar = function(id){
    let productos = JSON.parse(localStorage.getItem("carrito"));
    let producto = productos.find((row) => row.id == id);
    producto.quantity -= 1;
    producto.subtotal = producto.price * producto.quantity;
    if(producto.quantity == 0){
        borrar(id);
        return 
    }
    localStorage.setItem("carrito", JSON.stringify(productos));
    displayCarrito();
    actualizarTotal();
};
let borrar = function(id){
    let productos = JSON.parse(localStorage.getItem("carrito"));
    let productosFiltrados = productos.filter((row) => row.id != id);
    localStorage.setItem("carrito", JSON.stringify(productosFiltrados));
    displayCarrito();
    actualizarTotal();
};
let boton =document.querySelector('.finalizar-button')
boton.addEventListener('submit',function (e) {
    e.preventDefault();
    Swal.fire(
        'Bien hecho!',
        'Se realizó la compra con éxito!!',
        'success'
    ).then(() => {boton.submit();})
})
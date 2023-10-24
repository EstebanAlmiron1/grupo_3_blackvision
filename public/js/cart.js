window.onload = function ( ) {

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
                            <p> <i class="fas fa-plus"></i> ${element.quantity} <i class="fas fa-minus"></i> </p>
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
    displayCarrito()
}
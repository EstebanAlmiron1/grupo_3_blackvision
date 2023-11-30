import React from 'react'
function ProductoReact({ producto }) {

    console.log(producto.name);
    return (

        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                <p>{producto.name}</p>
                <p>  {producto.description}</p>

                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={producto.img} alt=" Star Wars - Mandalorian " />
                    </div>

                </div>
            </div>
        </div>
    )




}


export default ProductoReact
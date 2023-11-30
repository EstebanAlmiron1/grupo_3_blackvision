import React from 'react';
import TopBar from './TopBar';

import Footer from './Footer';
import ProductoReact from './ProductoReact'
function AllProductsReact({ productInfo }) {
    let productos = productInfo.products
    return (
        <React.Fragment>
            {/*<!-- Content Wrapper -->*/}
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar />
                    <p>PRODUCTOS</p>
                    {productos.map((producto, i) => {
                        return (<ProductoReact key={producto + i} producto={producto} />)
                    })}
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    )
}
export default AllProductsReact;
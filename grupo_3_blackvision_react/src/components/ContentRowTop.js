import React,{useEffect,useState} from 'react';
import Cards from './Cards'
import GenresInDb from './GenresInDb';

function ContentRowTop({productInfo, userInfo}){
	
	
     
	let productsInDB = {
		titulo: 'Productos totales',
		color: 'primary', 
		cantidad: productInfo.count,
		icono: 'fa-clipboard-list'
	}
	let totalCategories = {
		titulo:' Categorias totales', 
		color:'success', 
		cantidad: Object.keys(productInfo.countByCategory).length,
		icono:'fa-award'
	}
	let usersQuantity = {
		titulo:'Usuarios totales' ,
		color:'warning',
		cantidad:userInfo.count,
		icono:'fa-user-check'
	}
	let cartProps = [productsInDB, totalCategories, usersQuantity];

	if (productInfo.count > 0 ){
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>
				
					{/*<!-- Content Row Movies-->*/}
					<div className="row">
						<Cards datos = {cartProps} />
						

						
					</div>
					{/*<!-- End movies in Data Base -->*/}
					
	
					{/*<!-- Content Row Last Movie in Data Base -->*/}
					<div className="row">
						{/*<!-- Last Movie in DB -->*/}
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto en DB</h5>
								</div>
								<div className="card-body">
									<div className="text-center">
										<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={productInfo.products[productInfo.products.length -1].img} alt=" Star Wars - Mandalorian "/>
									</div>
									<p>{productInfo.products[productInfo.products.length -1].description}</p>
									<p>{productInfo.products[productInfo.products.length -1].id}</p>
									<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View product detail</a>
								</div>
							</div>
						</div>
						{/*<!-- End content row last movie in Data Base -->*/}

						{/*<!-- Genres in DB -->*/}
						<GenresInDb generos= {productInfo.countByCategory}/>
					
					</div>
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )}

}
export default ContentRowTop;
import React,{useEffect,useState} from 'react';
import image from '../assets/images/logo-DH.png';
import { Link, Route,Switch } from 'react-router-dom';
import ContentWrapper from './ContentWrapper';
import ContentRowTop from './ContentRowTop';
import GenresInDb from './GenresInDb';
import AllProductsReact from './AllProductsReact'



function SideBar(){
    const [productInfo, setProductInfo] = useState({
        count: 0,
        countByCategory: {},
        products: [],
    })
    async function fetchApi(){
        let respuesta = await fetch("/api/product")
        let data = await respuesta.json()
        setProductInfo(data)
        console.log(data);
    }
    
    const [userInfo, setUserInfo] = useState({
        count: 0,        
        user: [],
    })
    async function fetchUserApi(){
        let respuesta = await fetch("/api/user")
        let data = await respuesta.json()
        setUserInfo(data)
        ;
    }
    useEffect(()=>{ 
        fetchUserApi()
        fetchApi()

    },[])

    
   
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src='/img/logo.png' alt="BlackVisionLogo"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - BlackVision Eyewear</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/contentRowTop">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to ="/genresInDB">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></Link>
                </li>
                {/*<!-- ALL PRODUCTS -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to ="/AllProductsReact">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>ALL PRODUCTS</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            <Switch>
                <Route path="/" exact={true} ><ContentWrapper productInfo = {productInfo}></ContentWrapper></Route>
                <Route path="/contentRowTop" exact={true} ><ContentRowTop userInfo ={userInfo} productInfo = {productInfo}/></Route>
                <Route path="/genresInDB" exact={true} ><GenresInDb categorias= {productInfo.countByCategory}/></Route>
                <Route path="/AllProductsReact" exact={true} ><AllProductsReact productInfo = {productInfo}/></Route>
            </Switch>
            {/*<!-- End of Sidebar -->*/}
            
        </React.Fragment>
    )
}
export default SideBar;
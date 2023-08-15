import React, {useState} from "react";
import { ReactComponent as SiteLogo } from "../../assets/icons/sitelogo.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as OfferIcon } from "../../assets/icons/offers.svg";
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg";
import { Link } from "react-router-dom";
import "./Header.css"
import { useSelector } from "react-redux";
import {BsBag} from "react-icons/bs"
import {IoPersonOutline} from 'react-icons/io5'
import {FaRegUser} from 'react-icons/fa'
import { useUserAuth } from "../../context/userContext";
import Swal from 'sweetalert2'


const Header = ({handleVisible})=>{

    const {user,logOut} = useUserAuth()
    const [addClass, setAddClass] = useState(false);
    const cartItems = useSelector(store => store.cart.items)


    const tStock = cartItems.map((el)=>{
        return  el?.card?.info?.inStock
    })
    const totalCartCount = tStock.reduce((acc,curr)=>{
        acc = acc + curr
        return acc
    },0)

    const changeNavbarClass = () => {
        if (window.scrollY >= 80) {
            setAddClass(true);
        }
        else {
            setAddClass(false);
        }
    };
    window.addEventListener('scroll', changeNavbarClass);

    const handleLogout =()=>{
        Swal.fire({
            title: 'Are you sure you want to Logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(result => {
            if (result.isConfirmed) {
                logOut()
            }
        });
    }

    return(
        <>
            <div className={addClass ? 'header sticky' : 'header'}>
            <div className="container nav-wrap">
                    <div className="left-block">
                        <Link to="/"> <SiteLogo/></Link>
                    </div>
                    <ul className="nav-bar">
                        <li><Link className="nav-search" to="/search"> <SearchIcon/> Search</Link></li>
                        <li><Link to="/offers"> <OfferIcon/> Offers</Link></li>
                        <li><Link to="/checkout" className={cartItems.length > 0 ? "active nav-cart" : "nav-cart" }> 
                            <div> <CartIcon/> <span className="nav-cart-count">{totalCartCount}</span></div> 
                            Cart</Link>
                        </li>
                        {!user ? 
                        <li className="nav-user"><Link to="#" onClick={()=>{handleVisible()}}><FaRegUser/> Sign In</Link></li> :
                        <li className="nav-user"><Link to="#" onClick={()=>{handleLogout()}}><FaRegUser/> Logout </Link></li>
                        }
                        
                    </ul>
                </div>
            </div>

            <ul className="mobile-bottom-bar">
               <li><Link to="/"> <SiteLogo/> <span>Swiggy</span> </Link></li>
               <li><Link to="/search"> <SearchIcon/> <span>Search</span> </Link></li>
               <li><Link to="/checkout" className={cartItems.length > 0 ? "active mob-nav-cart" : "mob-nav-cart" }> 
                     <div> <BsBag/> <span className="nav-cart-count">{totalCartCount}</span></div> 
                     <span>Cart</span></Link>
               </li>
               {!user ? 
                        <li><Link to="#" onClick={()=>{handleVisible()}}><IoPersonOutline/> <span>Sign In</span></Link></li> :
                        <li><Link to="#" onClick={()=>{handleLogout()}}><IoPersonOutline/> <span>Logout</span> </Link></li>
                        }
            </ul>
        </>
    )
}

export default Header
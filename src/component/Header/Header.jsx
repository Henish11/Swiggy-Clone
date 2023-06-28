import React, {useState} from "react";
import { ReactComponent as SiteLogo } from "../../assets/icons/sitelogo.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as OfferIcon } from "../../assets/icons/offers.svg";
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg";
import { Link } from "react-router-dom";
import "./Header.css"
import { useSelector } from "react-redux";


const Header = ()=>{
    const [addClass, setAddClass] = useState(false);
    const cartItems = useSelector(store => store.cart.items)

    const changeNavbarClass = () => {
        if (window.scrollY >= 80) {
            setAddClass(true);
        }
        else {
            setAddClass(false);
        }
    };
    window.addEventListener('scroll', changeNavbarClass);
    return(
        <div className={addClass ? 'header sticky' : 'header'}>
           <div className="container nav-wrap">
                <div className="left-block">
                    <Link to="/"> <SiteLogo/></Link>
                </div>
                <ul className="nav-bar">
                    <li><Link to="/search"> <SearchIcon/> Search</Link></li>
                    <li><Link to="/offers"> <OfferIcon/> Offers</Link></li>
                    <li><Link to="/checkout" className={cartItems.length > 0 ? "active nav-cart" : "nav-cart" }> 
                        <div> <CartIcon/> <span className="nav-cart-count">{cartItems.length}</span></div> 
                        Cart</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
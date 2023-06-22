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
           <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="left-block">
                            <Link to="/"> <SiteLogo/></Link>
                        </div>
                    </div>
                    <div className="col-md-8"> 
                        <ul className="nav-bar">
                            <li><Link to="/search"> <SearchIcon/> Search</Link></li>
                            <li><Link to="/offers"> <OfferIcon/> Offers</Link></li>
                            <li><Link to="/checkout"> <CartIcon/> Cart - {cartItems.length}</Link></li>
                        </ul>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default Header
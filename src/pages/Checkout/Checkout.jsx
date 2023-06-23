import {useSelector } from "react-redux/es/hooks/useSelector"
import { IMG_LINK } from "../../utils/config";
import "./Checkout.css";
import { Link } from "react-router-dom";

const Checkout = () =>{

    const cartItem = useSelector(store=> store.cart.items)
     
    console.log(cartItem);

    return cartItem.length === 0 
        ?
        (<div className="empty-cart-section">
            <div className="container">
                <div className="empty-cart">
                    <img src={`${IMG_LINK}2xempty_cart_yfxml0`} alt="image" />
                    <h3>Your cart is empty</h3>
                    <p>You can go to home page to view more restaurants</p>
                    <Link to="/" className="back-btn"> See restaurants near you </Link>
                </div>
            </div>
        </div>) 
        :  
        ( 
          <div className="checkout-section">
           <div className="container-small">
              <div className="cart-wrap">
              {
                cartItem.map((el)=>{
                    return(
                        <div className="cart-item">
                            <div className="img-name">
                                <div className="img">
                                    { el?.card?.info?.imageId ? <img src={`${IMG_LINK}${el?.card?.info?.imageId}`} alt={el?.card?.info?.category}/> : null }
                                </div>
                                <h3>{el?.card?.info?.name}</h3>
                            </div>
                            <div className="add-remove-btn">

                            </div>
                            <div className="price">
                               ₹{el?.card?.info?.price/100}
                            </div>
                        </div>
                    )
                })
               }
              </div>
           </div>
        </div>

    )
}

export default Checkout
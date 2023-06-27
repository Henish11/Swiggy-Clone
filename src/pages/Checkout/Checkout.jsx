import {useSelector } from "react-redux/es/hooks/useSelector"
import { IMG_LINK } from "../../utils/config";
import "./Checkout.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {clearCart,removeItem,increaseItem,decreaseItem} from "../../redux/cartSlice";
import {v4 as uuidv4} from "uuid"

const Checkout = () =>{
    
    const cartItem = useSelector(store=> store.cart.items)
    console.log(cartItem);

    // reducers
    const dispatch = useDispatch();
    const handleClearCart = () =>{
        dispatch(clearCart())
    }
    const handleIncreaseItem = (el) =>{
        dispatch(increaseItem(el));
    }  
    const handleDecreaseItem = (el)=>{
        dispatch(decreaseItem(el))
    } 
    const handleRemoveItem = (el) =>{
        dispatch(removeItem(el?.card?.info?.id));
    }

    // totalAmount
    const TotalAmount = cartItem.map((el)=>{
        return  ((el?.card?.info?.price/100) * (el?.card?.info?.inStock))
    })

    return cartItem.length === 0 
        ?
        (<div className="empty-cart-section">
            <div className="container">
                <div className="empty-cart">
                    <img src={`${IMG_LINK}2xempty_cart_yfxml0`} alt="empty-cart" />
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
              <div className="top-bar-btn">
                <Link to={"/"} className="back">Back</Link>
                <button className="clear" onClick={handleClearCart}>Clear Cart</button>
              </div>
              <div className="cart-wrap">
              {
                cartItem.map((el)=>{
                    return(
                        <div className="cart-item" key={uuidv4()}>
                            <div className="img-name">
                                <div className="img">
                                    { el?.card?.info?.imageId ? <img src={`${IMG_LINK}${el?.card?.info?.imageId}`} alt={el?.card?.info?.category}/> : <div className="no-img">No Image</div> }
                                </div>
                                <h3>{el?.card?.info?.name}</h3>
                            </div>
                            <div className="add-remove-btn">
                                    <button onClick={()=>{ (el?.card?.info?.inStock) > 1 ? handleDecreaseItem(el) : handleRemoveItem(el) }} className="remove">-</button>
                                    <span>{el?.card?.info?.inStock}</span>
                                    <button onClick={()=>{handleIncreaseItem(el)}}  className="add" >+</button>
                            </div>
                            <div className="price">
                             { (el?.card?.info?.defaultPrice) ? `₹${(el?.card?.info?.defaultPrice/100)*(el?.card?.info?.inStock)}` : `₹${(el?.card?.info?.price/100)*(el?.card?.info?.inStock)}`  }
                            </div>
                        </div>
                    )
                })
               }
              </div>
              <div className="cart-total-amount">
                  <span>Total Amount</span>
                  <span>
                   ₹{
                        TotalAmount.reduce((acc,curr)=>{
                            acc = acc + curr
                            return acc
                        },0)
                    }
                  </span>
              </div>
              <div className="order-btn-box">
                 <Link to={"#"} className="order-btn">Order</Link>
              </div>
           </div>
        </div>

    )
}

export default Checkout
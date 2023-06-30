import { IMG_LINK } from "../../utils/config"
import "./RestaurantItem.css"
import {ReactComponent as NonvegIcon} from "../../assets/icons/nonveg.svg"
import {ReactComponent as VegIcon} from "../../assets/icons/veg.svg"
import { IoStarSharp } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { addItem } from "../../redux/cartSlice"
import { useState } from "react"


const RestaurantItem =(props) =>{
   const el = props.data
   console.log(el);
   const [quantity,setQuantity] = useState(0)

   const dispatch = useDispatch();
   const handleAddItem = (el)=>{
      dispatch(addItem(el))
   }

    return(
        <>
         <div className="hotem-item">
                  <div className="left-block">
                        <div> 
                             <span>{el?.card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? <NonvegIcon className="veg-nonveg-icon"/> : <VegIcon className="veg-nonveg-icon"/>}</span>
                             <>{el?.card?.info?.isBestseller ? <span className="best-seller"><IoStarSharp/> Bestseller</span> : null}</>
                        </div>
                        <h4>{el?.card?.info?.name}</h4>
                        <span>
                           { el?.card?.info?.defaultPrice ? `₹${el?.card?.info?.defaultPrice/100}` : `₹${el?.card?.info?.price/100}`}
                            {/* {(el?.card?.info?.finalPrice) ?
                             <> 
                             <span className="old-price">{`₹${el?.card?.info?.price/100}`}</span> <span>{`₹${el?.card?.info?.finalPrice/100}`}</span> </> 
                             : (`₹${el?.card?.info?.defaultPrice/100}`) || (`₹${el?.card?.info?.price/100}`)
                            }  */}
                        </span>
                        <p>{el?.card?.info?.description}</p>
                  </div>
                  <div className="right-block">
                        <div className="img">
                           {el?.card?.info?.imageId ? <img src={`${IMG_LINK}${el?.card?.info?.imageId}`} alt="item" /> : <div className="dummy-img">No Image</div> }
                        </div>

                        { <button className= { quantity <= 0 ? "add-btn" : "add-btn added"} onClick={()=>{ 
                           handleAddItem(el)
                           setQuantity(1)
                        }}> Add </button> }
                  </div>       
         </div>
        </>
    )
}

export default RestaurantItem
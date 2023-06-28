import { IoStarSharp } from "react-icons/io5"
import { Link } from "react-router-dom";
import {ReactComponent as NonvegIcon} from "../../assets/icons/nonveg.svg"
import {ReactComponent as VegIcon} from "../../assets/icons/veg.svg"
import { IMG_LINK } from "../../utils/config";
import {HiArrowRight} from "react-icons/hi";
import "./SearchItemCard.css"
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";

const SearchItemCard = (props) => {

    const item = props.item.card?.card?.info;
    const restaurantInfo = props.item.card?.card?.restaurant?.info
    console.log(props.item.card?.card);
  
    const el = props.item.card;
    const dispatch = useDispatch();
    const handleAddItem = (el) =>{
        dispatch(addItem(el))
    }
 
    return (
        <div className="search-item-card">
           <Link to={`/restaurant/${restaurantInfo?.slugs?.restaurant}/${restaurantInfo?.id}`} className="card-top">
                <div className="left-block">
                    <h3 className="title">By {restaurantInfo?.name}</h3>
                    <div className="rating-d-time">
                        <span className="rating">
                        <IoStarSharp/>  {restaurantInfo?.avgRating}
                        </span>
                        <span className="d-time">
                            {restaurantInfo?.sla?.slaString}
                        </span>
                    </div>
                    
                </div>
                <div className="right-block">
                     <HiArrowRight/> 
                </div>
            </Link>
            <div className="card-bottom">
                <div className="left-block">
                    <div> 
                        <span>{item?.isVeg !== 1 ? <NonvegIcon className="veg-nonveg-icon"/> : <VegIcon className="veg-nonveg-icon"/>}</span>
                        <>{item?.isBestseller ? <span className="best-seller"><IoStarSharp/> Bestseller</span> : null}</>
                    </div>
                    <h3 className="title">{item?.name}</h3>
                    <div className="price"> {(item?.defaultPrice) ? `₹${item?.defaultPrice/100}` : `₹${item?.price/100}` }</div>
                    <p className="info">{item?.description}</p>
                </div>
                <div className="right-block">
                    <div className="img-btn-wrap">
                        { item?.imageId 
                        ? <div className="img-box"> <img src={`${IMG_LINK}${item?.imageId}`} alt="" /> </div>
                        : <div className="no-image"> No Image</div>
                        }
                        { <button className="add-btn"  onClick={()=>{ 
                            handleAddItem(el)
                            }}> Add </button> }
                    </div>
                </div>
                
            </div>
             
        </div>
    )
}

export default SearchItemCard
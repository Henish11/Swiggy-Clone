
import { IMG_LINK } from "../../utils/config";
import {AiFillStar} from "react-icons/ai"
import {BsDot} from "react-icons/bs"
import "./RestaurantCard.css"

const RestaurantCard = (props) =>{
    const {name,cloudinaryImageId,cuisines,costForTwoString,slaString,avgRating,promoted} = props?.hotel?.data;


    return(
        <div className="hotel-card">
           {promoted ? <div className="hotel-promoted">Promoted</div> : null}
           <div className="card-img">
             <img src={IMG_LINK + cloudinaryImageId}  />
           </div>
           <div className="title">
            <span>{name}</span>
            <span>{cuisines.join(", ")}</span>
            </div>
            <div className="rating">
               <span className={avgRating >= 4 ? " star-badge" : "red-star star-badge" }> <AiFillStar/> {avgRating} </span>
               <span><BsDot/></span>
               <span>{slaString}</span>
               <span><BsDot/></span>
               <span>{costForTwoString}</span>
            </div>
        </div>
    )
}

export default RestaurantCard
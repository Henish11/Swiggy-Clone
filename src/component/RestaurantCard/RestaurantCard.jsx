
import { IMG_LINK } from "../../utils/config";
import {AiFillStar} from "react-icons/ai"
import {BsDot} from "react-icons/bs"
import "./RestaurantCard.css"
import { Link } from "react-router-dom";

const RestaurantCard = (props) =>{
    console.log(props);
    const {name,cloudinaryImageId,cuisines,costForTwo,sla,avgRating,promoted,id,slugs} = props?.hotel?.info;
    return(
        <Link to={`restaurant/${slugs?.restaurant}/${id}`}>
            <div className="hotel-card">
            {promoted ? <div className="hotel-promoted">Promoted</div> : null}
            <div className="card-img">
                {cloudinaryImageId ? <img src={IMG_LINK + cloudinaryImageId}  /> : null }
            </div>
            <div className="title">
                <span>{name}</span>
                <span>{ cuisines?.length > 0 ?  cuisines.join(", ") : cuisines}</span>
                </div>
                <div className="rating">
                <span className={avgRating >= 4 ? " star-badge" : "red-star star-badge" }> <AiFillStar/> {avgRating} </span>
                <span><BsDot/></span>
                <span>{sla?.slaString}</span>
                <span><BsDot/></span>
                <span>{costForTwo}</span>
                </div>
            </div>
        </Link>
    ) 
}

export default RestaurantCard
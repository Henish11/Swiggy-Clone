
import { IMG_LINK } from "../../utils/config";
import {AiFillStar} from "react-icons/ai"
import {BsDot} from "react-icons/bs"
import "./RestaurantCard.css"
import { Link } from "react-router-dom";

const RestaurantCard = (props) =>{
    const {name,cloudinaryImageId,cuisines,costForTwoString,slaString,avgRating,promoted,id,slugs} = props?.hotel?.data;

    return(
        <Link to={`restaurant/${slugs?.restaurant}/${id}`}>
            <div className="hotel-card">
            {promoted ? <div className="hotel-promoted">Promoted</div> : null}
            <div className="card-img">
                {cloudinaryImageId ? <img src={IMG_LINK + cloudinaryImageId} alt={name} /> : null }
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
        </Link>
    )
}

export default RestaurantCard
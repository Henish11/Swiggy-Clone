import { IMG_LINK } from "../../utils/config";
import "./SearchRestaurantItem.css"
import { Link } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5"


const SearchRestaurantItem = (props) =>{
    const item = props.item.card?.card?.restaurant?.info
    console.log(props);
    return(
        <Link to={`/restaurant/${item?.slugs?.restaurant}/${item?.id}`} className="search-restaurant-card">
            <div className="left-block">
                <img src={`${IMG_LINK}${item?.cloudinaryImageId}`} alt="Restaurant" />
            </div>
            <div className="right-block">
                <h3 className="title">{item?.name}</h3>
                <div className="info">
                    <span className="rating">
                       <IoStarSharp/>  {item?.avgRating}
                    </span>
                    <span className="d-time">
                       {item?.sla?.slaString} 
                    </span>
                    <div className="off">
                        {item?.costForTwoMessage}
                    </div>
                </div>
                <div className="cuisines">
                    {item?.cuisines.join(", ")}
                </div>
            </div>
        </Link>
    )
}

export default SearchRestaurantItem
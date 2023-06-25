import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { RESTAURANT_DETAILS_API } from "../../utils/config";
import "./RestaurantDetails.css"
import { IoStarSharp } from "react-icons/io5"
import { IMG_LINK } from "../../utils/config";
import {ReactComponent as ClockIcon} from "../../assets/icons/circle.svg"
import {ReactComponent as MoneyIcon} from "../../assets/icons/rs.svg"
import RestaurantItem from "../../component/RestaurantItem/RestaurantItem";
import {v4 as uuidv4} from "uuid"
import {BsChevronDown} from "react-icons/bs"
import Shimmer from "../../component/Shimmer/Shimmer";



const RestaurantDetails = () =>{

    const [restaurantDetails,setRestaurantDetails] = useState([]);
    const {id} = useParams();

    const getrestaurantDetails = async ()=>{
        const data = await axios(RESTAURANT_DETAILS_API+id);
        setRestaurantDetails(data?.data?.data?.cards)
    }
    useEffect(()=>{
        getrestaurantDetails()
    },[])
   

    return restaurantDetails.length === 0 ? <Shimmer/> :  (
     <div className="hotel-details-wrap">
        <div className="container-small">
            <div className="top-bar">
                <div className="left-block">
                    <h1 className="hotel-name">{restaurantDetails[0]?.card?.card?.info?.name}</h1>
                    <div className="hotel-cousin">{restaurantDetails[0]?.card?.card?.info?.cuisines.join(", ")}</div>
                    <div className="location">
                        <span>{restaurantDetails[0]?.card?.card?.info?.locality}</span>
                        <span>{restaurantDetails[0]?.card?.card?.info?.sla?.lastMileTravelString}</span>
                    </div>
                </div>
                <div className="right-block">
                    <div className="star-rating">
                        <span> <IoStarSharp/> {restaurantDetails[0]?.card?.card?.info?.avgRating}</span>
                        <span> {restaurantDetails[0]?.card?.card?.info?.totalRatingsString}</span>
                    </div>
                </div>
            </div>
            <div className="d_time">
                <span> <ClockIcon/> {restaurantDetails[0]?.card?.card?.info?.sla?.slaString} </span>
                <span> <MoneyIcon/> {restaurantDetails[0]?.card?.card?.info?.costForTwoMessage}</span>
            </div>
            <div className="offer-card-wrap">
                {restaurantDetails[1]?.card?.card?.gridElements?.infoWithStyle?.offers.map((el)=>{
                       return (
                          <div className="offer-card" key={uuidv4()}>
                              <div className="offer-card-top">
                                <img src={`${IMG_LINK}${el?.info?.offerLogo}`} alt="" />
                                <span>{el?.info?.header}</span>
                              </div>
                              
                              <div className="offer-card-bottom">
                                 <span>{el?.info?.couponCode}</span> <span className="line">|</span> <span>{el?.info?.description}</span>
                              </div>  
                          </div>
                       )
                })}
            </div>

            <div className="hotem-item-section" >
                {restaurantDetails[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.slice(1,-2)?.map((e)=>{
                    return(
                       <div className="hotel-item-wrap" key={uuidv4()}>
                           {
                            e?.card?.card?.itemCards?.length > 0 && (
                            <>
                                <div className="title">
                                   <h4>{e?.card?.card?.title} ({e?.card?.card?.itemCards?.length})</h4>
                                   <BsChevronDown/>
                                   {/* <button onClick={e=> e.target.classList.toggle('active')}>  </button> */}
                                </div>
                                {
                                    e?.card?.card?.itemCards.map((el)=>{
                                        return <RestaurantItem data={el} key={uuidv4()} />
                                    })
                                }
                            </>
                            )
                           }
                       </div>
                    )                  
                })}        
            </div>
        </div>
     </div>
      
    )


}

export default RestaurantDetails
import React, { useEffect, useState } from "react"
import axios from "axios"
import { IMG_LINK } from "../../utils/config"
import "./Offers.css"
import {MdStars} from "react-icons/md"
import { Link } from "react-router-dom"
import { OFFERS_DATA } from "../../utils/config"
import Shimmer from "../../component/Shimmer/Shimmer"


const Offers = () =>{
     
    const [offerData,setOfferData] = useState([]);
    const [relevanceData,setRelevanceData] = useState([]);

    
    const findOfferData = async () =>{
        try {
            await axios.get(OFFERS_DATA)
            .then((res)=>{
               setOfferData(res?.data?.data?.success?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
               setRelevanceData(res?.data?.data?.success?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            })
         } catch (error) {
            alert(error.message)
         }
    }
    useEffect(()=>{
      findOfferData();
    },[]);
    console.log(offerData);

    // Fast Delivery 
    const filterDelivery = () =>{
        const newOfferData = [...offerData];
        newOfferData.sort((a,b)=>{
             return a.info.sla.deliveryTime - b.info.sla.deliveryTime
        })  
        setOfferData(newOfferData)
    }

    // Rating 4+
    const filterRating = ()=>{
        const newOfferData = [...offerData];
        const filteredRatingData = newOfferData.filter((e)=>{
            return e?.info?.avgRating > 4.0 
        })
        setOfferData(filteredRatingData)
    }

    // Relevance
    const filterRelevance = ()=>{
        setOfferData(relevanceData)
    }


    return offerData.length === 0 ? <Shimmer/> : (
        <div className="offers-section">
            <div className="container">
                <h1>Restaurants with great offers near me</h1>
                <div className="offer-filter-wrap">
                   <button onClick={filterRelevance}>Relevance</button>
                   <button onClick={filterDelivery}>Fast Delivery</button>
                   <button onClick={filterRating}>Rating</button>
                   <button onClick={filterRelevance}>Clear</button>
                </div>
                

                <div className="offers-card-wrap">
                    {offerData.map((el)=>{
                        return(
                            <Link to={`/restaurant/${el?.cta?.link?.split('/')?.at(-1)?.slice(0,-7)}/${el?.info?.id}`} className="offers-card">
                                <div className="offer-img">
                                   <img src={`${IMG_LINK}${el?.info?.cloudinaryImageId}`} alt="offers" />
                                   <div className="upto-text">{el?.info?.aggregatedDiscountInfoV3?.header} {el?.info?.aggregatedDiscountInfoV3?.subHeader}</div>
                                </div>
                                <div className="bottom-info">
                                    <h3>{el?.info?.name}</h3>
                                    {el?.info?.avgRating 
                                    ? 
                                    <div className="rating">
                                        <MdStars/> {el?.info?.avgRating}
                                    </div> 
                                    : null}
                                
                                    <div className="cousins">
                                        {el?.info?.cuisines.join(', ')}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div> 
    )
}

export default Offers
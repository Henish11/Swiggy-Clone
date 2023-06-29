import React, { useEffect, useState } from "react"
import axios from "axios"
import TopFilter from "../../component/TopFilter/TopFilter"
import { IMG_LINK } from "../../utils/config"
import "./Offers.css"


const Offers = () =>{
     
    const [offerData,setOfferData] = useState([]);

    const findOfferData = async () =>{
        try {
             await axios.get('https://corsproxy.io/?https://www.swiggy.com/api/seo/getListing?lat=20.9467019&lng=72.95203479999999')
            .then( (res)=>{
              setOfferData(res?.data?.data?.success?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            //   setOfferData(res?.data?.success?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)

            })
         } catch (error) {
            alert(error.massage)
         }
    }
    useEffect(()=>{
      findOfferData();
    },[])

    console.log(offerData);

    return(
        <div className="offers-section">
            <div className="container">
                <h1>Restaurants with great offers near me</h1>
                <TopFilter/>
                <div className="offers-card-wrap">
                    {offerData.map((el)=>{
                        return(
                            <div className="offers-card">
                                <div className="offer-img">
                                   <img src={`${IMG_LINK}${el?.info?.cloudinaryImageId}`} alt="offers" />
                                   <span>{el?.info?.aggregatedDiscountInfoV3?.header} {el?.info?.aggregatedDiscountInfoV3?.subHeader}</span>
                                </div>
                                {el?.info?.avgRating 
                                  ? 
                                  <div className="rating">
                                        {el?.info?.avgRating}
                                  </div> 
                                  : null}
                               
                                <h3>{el?.info?.name}</h3>
                                <div className="cousins">
                                    {el?.info?.cuisines.join(', ')}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div> 
    )
}

export default Offers
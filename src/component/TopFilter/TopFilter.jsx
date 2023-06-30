import { useState } from 'react'
import './TopFilter.css'
import {MdClose} from 'react-icons/md'
import {ReactComponent as FilterIcon} from "../../assets/icons/filter.svg"


const TopFilter = ({restaurantCount,setFilterData,filterData,allRestaurant}) =>{

    const [filterbtn,setFilterbtn] = useState(0)

    // High To Low Price Sort
    const sortHightolow = ({}) =>{
        const sortedAllRestaurant = [...filterData]
        sortedAllRestaurant.sort((a,b)=> b?.data?.costForTwo - a?.data?.costForTwo)
        setFilterData(sortedAllRestaurant)
    }
    // Low To High Price Sort
    const sortLowtohigh = () =>{
        const sortedAllRestaurant = [...filterData]
        sortedAllRestaurant.sort((a,b)=> a?.data?.costForTwo - b?.data?.costForTwo)
        setFilterData(sortedAllRestaurant)
    }
    // Sort by Rating
    const sortbyRating = () =>{
        const sortedAllRestaurant = [...filterData]
        sortedAllRestaurant.sort((a,b)=> (+(b?.data?.avgRating)) - +(a?.data?.avgRating))
        setFilterData(sortedAllRestaurant)
    }
    // Sort by DeliveryTime
    const sortbyDeliveryTime = () =>{
        const sortedAllRestaurant = [...filterData]
        sortedAllRestaurant.sort((a,b)=> (+(a?.data?.deliveryTime)) - +(b?.data?.deliveryTime))
        setFilterData(sortedAllRestaurant)
    }
    // Sort by Relevance
    const sortbyRelevance = () =>{
        setFilterData(allRestaurant)
    }

    return(
        <div className="hotel-top-bar" id="scroll-down">
            <h1 className="hotel-count">{restaurantCount} restaurants</h1>
            <div className={filterbtn === 0 ? "filter-btn" : "filter-btn active"}>
                <button onClick={()=> { sortbyRelevance()
                     setFilterbtn(0)}}>Relevance</button>  
                <button onClick={()=>{sortbyDeliveryTime()
                   setFilterbtn(0)}}>Delivery Time</button> 
                <button onClick={()=>{sortbyRating()
                setFilterbtn(0) }}>Rating</button> 
                <button onClick={()=>{sortLowtohigh()
                setFilterbtn(0) }}>Cost: Low To High</button> 
                <button onClick={()=>{sortHightolow()
                setFilterbtn(0) }}>Cost: High To Low</button>     
            </div>
            <button className={filterbtn === 0 ? 'mobile-filter-btn' : 'mobile-filter-btn inactive'} onClick={()=>{setFilterbtn(1)}}>Filter <FilterIcon/>  </button>
            <button className={filterbtn === 0 ? 'mobile-filter-btn inactive' : 'mobile-filter-btn close'} onClick={()=>{setFilterbtn(0)}}> Filter <MdClose/></button>
        </div>
    )
}

export default TopFilter
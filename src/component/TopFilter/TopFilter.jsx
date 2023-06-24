import './TopFilter.css'

const TopFilter = ({restaurantCount,setFilterData,filterData,allRestaurant}) =>{

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
        sortedAllRestaurant.sort((a,b)=> (Number(b?.data?.avgRating)) - Number(a?.data?.avgRating))
        setFilterData(sortedAllRestaurant)
    }
    // Sort by DeliveryTime
    const sortbyDeliveryTime = () =>{
        const sortedAllRestaurant = [...filterData]
        sortedAllRestaurant.sort((a,b)=> (Number(a?.data?.deliveryTime)) - Number(b?.data?.deliveryTime))
        setFilterData(sortedAllRestaurant)
    }
    // Sort by Relevance
    const sortbyRelevance = () =>{
        setFilterData(allRestaurant)
    }

    return(
        <div className="hotel-top-bar">
            <h1 className="hotel-count">{restaurantCount} restaurants</h1>
            <div className="filter-btn">
                <button onClick={sortbyRelevance}>Relevance</button>  
                <button onClick={sortbyDeliveryTime}>Delivery Time</button> 
                <button onClick={sortbyRating}>Rating</button> 
                <button onClick={sortLowtohigh}>Cost: Low To High</button> 
                <button onClick={sortHightolow}>Cost: High To Low</button>     
            </div>
         
        </div>
    )
}

export default TopFilter
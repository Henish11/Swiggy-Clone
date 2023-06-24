import { useEffect, useState } from "react"
import axios from "axios";
import RestaurantCard from "../../component/RestaurantCard/RestaurantCard";
import {v4 as uuidv4} from "uuid"
import Shimmer from "../../component/Shimmer/Shimmer";
import "./Home.css"
import TopFilter from "../../component/TopFilter/TopFilter";


const Home = () =>{
    
    const [allRestaurant, setAllRestaurant] = useState([]); 
    const [offset,setOffset] = useState(0);
    const [restaurantCount,setRestaurantCount] = useState(0);
    const [filterData, setFilterData] = useState([])

    const getRestaurantMore = async (offset)=>{
        const data = await axios.get(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1417761&lng=72.77094149999999&offset=${offset}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`);
        setAllRestaurant(prev => [...prev, ...data?.data?.data?.cards.map(e=> e.data)])
        setFilterData(prev => [...prev, ...data?.data?.data?.cards.map(e=> e.data)])
        setRestaurantCount(data?.data?.data?.totalSize)
    }
    console.log(allRestaurant);
   
    useEffect(()=>{
        getRestaurantMore(offset)
    },[offset])

    const handleScroll = ()=>{
        if( window.innerHeight +  document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight ){
            setOffset(prev => prev + 16)
        }
    }
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll)
        return(()=>{
           return window.removeEventListener("scroll",handleScroll)  
        })
    },[])


    return allRestaurant.length === 0 ? <Shimmer key={uuidv4()}/> : (
        <div className="main">
            <div className="container">
               <TopFilter 
                restaurantCount={restaurantCount}
                setFilterData={setFilterData}
                filterData={filterData}
                allRestaurant={allRestaurant}
               />
               <div className="hotel-card-wrap">
                  { filterData.map((restaurant)=>{
                            return <RestaurantCard key={uuidv4()} hotel={restaurant} />
                        })
                  }
                  
               </div>
            </div>
        </div>
    )
}

export default Home
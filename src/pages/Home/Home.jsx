import { useEffect, useState } from "react"
import axios from "axios";
import RestaurantCard from "../../component/RestaurantCard/RestaurantCard";
import uuid from "react-uuid";
import Shimmer from "../../component/Shimmer/Shimmer";


const Home = () =>{
    
    const [allRestaurant, setAllRestaurant] = useState([]);
    const [offset,setOffset] = useState(0)
    
    // useEffect(()=>{
    //     reastaurantdata()
    // },[])

    // const reastaurantdata = async ()=>{
    //     const data = await axios.get(ALL_LISTING_API_LINK)
    //     console.log(data?.data?.data.cards.map(e=> e.data));
    //     setAllRestaurant(data?.data?.data.cards.map(e=> e.data))
    // }

    const getRestaurantMore = async (offset)=>{

       const data = await axios.get(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1417761&lng=72.77094149999999&offset=${offset}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`);
       console.log(data);
       setAllRestaurant(prev => [...prev, ...data?.data?.data.cards.map(e=> e.data)])
    }
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

    return allRestaurant.length === 0 ? <Shimmer key={uuid()}/> : (
        <div className="main">
            <div className="container">
               <div className="hotel-card-wrap">
                  { allRestaurant.map((restaurant)=>{
                            return <RestaurantCard key={uuid()} hotel={restaurant} />
                        })
                  }
                  
               </div>
            </div>
        </div>
    )
}

export default Home
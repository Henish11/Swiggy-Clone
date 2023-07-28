import { useEffect, useState } from "react"
import axios from "axios";
import RestaurantCard from "../../component/RestaurantCard/RestaurantCard";
import {v4 as uuidv4} from "uuid"
import Shimmer from "../../component/Shimmer/Shimmer";
import "./Home.css"
import TopFilter from "../../component/TopFilter/TopFilter";
import { IMG_LINK } from "../../utils/config";
import HeroSlider from "../../component/HeroSlider/HeroSlider";
import CarouselShimmer from "../../component/Shimmer/CarouselShimmer";


const Home = () =>{
    
    const [allRestaurant, setAllRestaurant] = useState([]); 
    const [offset,setOffset] = useState(0);
    const [restaurantCount,setRestaurantCount] = useState(0);
    const [filterData, setFilterData] = useState([])

    // Restaurant data
    const getRestaurantMore = async (offset)=>{
        try{
            const data = await axios.get(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1417761&lng=72.77094149999999&offset=${offset}e_t&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`);
            setAllRestaurant(prev=>[...prev,...data?.data?.data?.cards.filter((ele)=>ele?.card?.card?.id === "restaurant_grid_listing")[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants])
            setFilterData(prev=>[...prev,...data?.data?.data?.cards.filter((ele)=>ele?.card?.card?.id === "restaurant_grid_listing")[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants])
            // setRestaurantCount(data?.data?.data?.totalSize)
        }catch(err){
           alert(err.message)
        }
 
    }
    console.log(filterData);
    useEffect(()=>{
        getRestaurantMore(offset)
    },[offset])


    // scroll
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


    return allRestaurant.length === 0 ? <> <CarouselShimmer/> <Shimmer key={uuidv4()}/></>  : (
        <>
            <div className="hero-slider-wrap">
                {/* <HeroSlider/> */}
            </div>
            <div className="main">
                <div className="container">
                    <div className="mobile-banner">
                        <a href='#scroll-down'>
                        <img src={`${IMG_LINK}/rng/md/carousel/production/faxdufvkcllzse67eqry`} alt="Mobile Banner" />
                        </a>
                    </div>
                <TopFilter 
                    // restaurantCount={restaurantCount}
                    setFilterData={setFilterData}
                    filterData={filterData}
                    allRestaurant={allRestaurant}
                />
                <div className="hotel-card-wrap">
                    { filterData.length > 0 && filterData.map((restaurant)=>{
                                return <RestaurantCard key={uuidv4()} hotel={restaurant} />
                            }) 
                     } 
                </div>
                </div>
            </div>
        </>
    )
}

export default Home
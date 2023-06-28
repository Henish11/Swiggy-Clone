import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import SearchItemCard from "../../component/SearchItemCard/SearchItemCard"
import SearchRestaurantItem from "../../component/SearchRestaurantItem/SearchRestaurantItem"
import "./Search.css"

const Search = () =>{

    const [searchText,setSearchText] = useState('');
    const [searchData,setSearchData] = useState([]);
    const [toggle,setToggle] = useState(0)

    useEffect(()=>{
        try {
            axios.get(`https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/search/v3?lat=21.1417761&lng=72.77094149999999&str=${searchText}&submitAction=SUGGESTION`)
            .then((response)=>{
                setSearchData(response?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards);
                console.log(response?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards);
            })
        } catch (error) {
            alert(error.massage)
        }
    },[searchText])

    console.log(searchData);

    const handleToggle = (id) =>{
        setToggle(id);
    }

    
    return (
        <div className="search-wrap">
            <div className="container-small ">
               {
                (searchData) === undefined 
                ?
                <div className="search-box before-search">
                    <form>
                      <input type="text" placeholder="Search for restaurants and food" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
                    </form> 
                </div> 
                :  
                <div className="search-box">
                    <form>
                      <input type="text" placeholder="Search for restaurants and food" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
                    </form> 
                    <div className="search-result-wrap">
                        <div className="search-tab-wrap">
                            <div className="search-tab">
                                <button className={toggle === 1 ? "active" : null} onClick={()=> handleToggle(1)}>Restaurant</button>
                                <button className={toggle === 0 ? "active" : null} onClick={()=> handleToggle(0)}>Dishes</button>
                            </div>
                            <div  className={toggle === 0 ? "show-content search-result" : "hide-content search-result"}>
                                {searchData.slice(1).map((item)=>{
                                return <SearchItemCard item={item} />
                                })}
                            </div>
                            <div  className={toggle === 1 ? "show-content search-result" : "hide-content search-result"}>
                                {
                                  searchData.filter((obj, index) => {
                                    return index === searchData.findIndex((o) => {
                                        return obj?.card?.card?.restaurant?.info?.id === o?.card?.card?.restaurant?.info?.id
                                    });
                                  }).slice(1).map((item)=>{
                                    console.log(searchData);
                                    return <SearchRestaurantItem item={item} />
                                    })
                        
                                }
                                {/* {searchData.slice(1).map((item)=>{
                                return <SearchRestaurantItem item={item} />
                                })} */}
                            </div>
                        </div>
                    </div> 
                </div>
               }
             
            </div>
        </div>
    )
}

export default Search
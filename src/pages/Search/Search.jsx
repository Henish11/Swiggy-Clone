import axios from "axios"
import { useState,useEffect } from "react"
import SearchItemCard from "../../component/SearchItemCard/SearchItemCard"
import SearchRestaurantItem from "../../component/SearchRestaurantItem/SearchRestaurantItem"
import "./Search.css"
import { SEARCH_CUISINES_API } from "../../utils/config"
import { IMG_LINK } from "../../utils/config"
import { useNavigate } from "react-router-dom"
import {v4 as uuidv4} from "uuid"
import {MdClose} from 'react-icons/md'

const Search = () =>{

    const [searchText,setSearchText] = useState('');
    const [searchData,setSearchData] = useState([]);
    const [toggle,setToggle] = useState(0);
    const [cuisinesData,setCuisinesData] = useState([]);

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

    useEffect(()=>{
        try {
            axios.get(SEARCH_CUISINES_API)
            .then((res)=>{
               console.log(res?.data?.data?.cards[1]?.card?.card?.imageGridCards?.info);
               setCuisinesData(res?.data?.data?.cards[1]?.card?.card?.imageGridCards?.info)
            })
        } catch (error) {
            alert(error.massage)
        }
    },[])

    const handleToggle = (id) =>{
        setToggle(id);
    }
    
    const navigate = useNavigate()
    const handleSearchCuisines = (el) =>{
      return navigate(`?${el.entityId.split('?').at(-1)}`)
    }
    const queryToken = () =>{
        const value = window.location.search;
        const token = value.split('=').at(-1).replaceAll('%20',' ')
        return token 
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
                    
                    <div className="search-cuisines-wrap">
                        <h3>Popular Cuisines</h3>
                        <div className="search-cuisines-data">
                            {cuisinesData.map((el)=>{
                                return  (<button key={uuidv4()} onClick={()=>{
                                    handleSearchCuisines(el)
                                    setSearchText(queryToken())
                                    }}>
                                            <img src={`${IMG_LINK}${el.imageId}`} alt="search-cuisines"/>
                                        </button> )
                            })}
                        </div>
                    </div>
                </div> 
                :  
                <div className="search-box">
                    <div className="form-wrap">
                        <form>
                        <input type="text" placeholder="Search for restaurants and food" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
                        </form> 
                        <button className="clear-search" onClick={()=>{setSearchText('')}}><MdClose/></button>
                    </div>

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

import Slider from "react-slick"
import "./HeroSlider.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { ALL_RESTAURANTS_API_LINK } from "../../utils/config";
import { IMG_LINK } from "../../utils/config";
import {v4 as uuidv4} from "uuid"
import CarouselShimmer from "../Shimmer/CarouselShimmer";


const HeroSlider = () =>{

     const [carouselData,setCarouselData] = useState([]);

     useEffect( ()=>{
        try {
            axios.get(ALL_RESTAURANTS_API_LINK)
                 .then((res)=>{
                   console.log(res?.data?.data?.cards[0]?.data?.data?.cards);
                   setCarouselData(res?.data?.data?.cards[0]?.data?.data?.cards)
                })
        } catch (error) {
            alert(error.message)
        }
     },[])



    // Slider Settings
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive:[
            {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 3
                }
            },
        ]
    };

    return carouselData.length === 0 ? <CarouselShimmer/> : (
        <div className="hero-slider">
          <div className="container">
            <Slider {...settings}>
                {
                    carouselData.map((el)=>{
                    return (
                            <div className="single-slide" key={uuidv4()}>
                               <img src={`${IMG_LINK}${el.data.creativeId}`} alt="carousel" />
                            </div>
                    )       
                    })
                }
            </Slider>
          </div>
          
        </div>
    );
}

export default HeroSlider
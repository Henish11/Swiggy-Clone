import { IMG_LINK } from "../../utils/config"

const CarouselShimmer = () =>{
    return(
     <div className="hero-slider-wrap shimmer">
        <div className="container">
            <div className="loader-wrap">
                <div className="loader"></div>
                <img src={`${IMG_LINK}icecream_wwomsa`} alt="Loader" />
            </div>
            <h1>Looking For a Great Food Near You</h1>
        </div>
    </div>
    )
}

export default CarouselShimmer 
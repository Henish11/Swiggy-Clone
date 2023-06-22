
import "./Shimmer.css"
import uuid from "react-uuid"

const Shimmer = () =>{
    return(
        <div className="main">
           <div className="container">
               <div className="hotel-card-wrap">
                 {Array(12).fill(0).map(()=>{
                        return(
                            <div className="shimmer-card-wrap" key={uuid()}>
                                <div className="shimmer-card-effect"></div>
                                <div className="shimmer-card">
                                    <div className="img"></div>
                                    <div className="title">
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className="rating"></div>
                                    <div className="offer"></div>
                                </div> 
                            </div>
                      )
                  })}
                    </div>
                </div>
           </div>
    )
}

export default Shimmer

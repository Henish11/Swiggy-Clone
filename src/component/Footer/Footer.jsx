
import { IMG_LINK } from "../../utils/config"
import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () =>{
    return(
        <div className="footer">
           <div className="container">
               <div className="f_logo">
                  <Link to="/">
                      <img src={`${IMG_LINK}Logo_f5xzza`} />
                  </Link>
               </div>
               <div className="f_info">
                  &copy; 2023 Swiggy Clone By HenisH
               </div>
           </div>
        </div>
    )
}

export default Footer
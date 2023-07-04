
import ReactDOM from "react-dom/client"
import App from "./App"
import Home from "./pages/Home/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import Search from "./pages/Search/Search"
import Offers from "./pages/Offers/Offers"
import Checkout from "./pages/Checkout/Checkout"
import RestaurantDetails from "./pages/RestaurantDetails/RestaurantDetails"
import { Provider } from "react-redux"
import store from "./redux/store"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <Provider store={store}>
      <BrowserRouter>
            <Routes>
               <Route element={<App/>}>
                  <Route path="/" element={<Home/>}></Route>
                  <Route path="/search" element={<Search/>}></Route>
                  <Route path="/offers" element={<Offers/>}></Route>
                  <Route path="/checkout" element={<Checkout/>}></Route>
                  <Route path="/restaurant/:params/:id" element={<RestaurantDetails/>}></Route>
               </Route>
            </Routes>
      </BrowserRouter>
   </Provider>
)
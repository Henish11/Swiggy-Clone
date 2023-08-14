
import Header from "./component/Header/Header"
import Footer from "./component/Footer/Footer"
import  "./App.css"
import { Outlet } from "react-router-dom"
import LoginBox from "./component/LoginBox/LoginBox"
import { useState } from "react"


const App = ()=>{
    const [isVisible,setIsVisible] = useState(false)
    const handleVisible = (value) =>{
         setIsVisible(!isVisible)
    }
    return(
        <>
          <Header handleVisible={handleVisible}/>
            <Outlet/>
          <Footer/>
          <LoginBox isVisible={isVisible} setIsVisible={setIsVisible}/>
        </>
    )
}

export default App
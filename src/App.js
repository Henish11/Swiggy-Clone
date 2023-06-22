
import Header from "./component/Header/Header"
import Footer from "./component/Footer/Footer"
import  "./App.css"
import { Outlet } from "react-router-dom"


// const scrollHeader = ()=>{
//     return (document.window.scroll(()=>{
//         var scroll = document.window.scrollTop();
//         console.log(scroll);
//         if (scroll >= 80) {
//             document.getElementsByTagName('body').addClass('fixed');
//         } else {
//             document.getElementsByTagName('body').removeClass("fixed");
//         }
//     }))
// }

const App = ()=>{
    return(
        <>
          <Header/>
            <Outlet/>
          <Footer/>
        </>
    )
}

export default App
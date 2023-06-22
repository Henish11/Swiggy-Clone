
import ReactDOM from "react-dom/client"
import App from "./App"
import Home from "./pages/Home/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
      <Routes>
         <Route element={<App/>}>
            <Route path="/" element={<Home/>}></Route>
         </Route>
      </Routes>
    </BrowserRouter>
)
import React,{useState} from "react";
import "./LoginBox.css";
import Register from "../Register/Register";
import {MdClose} from 'react-icons/md'
import Login from "../Login/Login";

const LoginBox = ({ isVisible, setIsVisible }) => {

  const [toggle,setToggle] = useState(false)

  const handleToggle = (value) =>{
    setToggle(value)
  }

  return (
    <div className={isVisible ? "LoginBox active" : "LoginBox"}>
      <div className="boxWrap">
        <MdClose className="closeBtn" onClick={() => {
            setIsVisible(!isVisible);
          }}/>
        <Login isVisible={isVisible} setIsVisible={setIsVisible} handleToggle={handleToggle} toggle={toggle}/>
        <Register handleToggle={handleToggle} toggle={toggle}/>
      </div>
    </div>
  );
};

export default LoginBox;

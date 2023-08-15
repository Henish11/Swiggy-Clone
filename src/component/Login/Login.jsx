import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userContext";
import GoogleButton from "react-google-button";

const Login = ({ isVisible, setIsVisible, handleToggle,toggle}) => {
  const initialValue = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [formErrors, setFormErros] = useState({});
  const navigate = useNavigate();
  const { login, googleSignIn } = useUserAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErros(validate(formData));

    try {
      const result = await login(formData.email, formData.password);
      console.log(result);
      toast.success("Login Succesfully !!");
      setTimeout(() => {
        navigate("/");
        setIsVisible(!isVisible);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await googleSignIn();
      console.log(result);
      toast.success("Login Succesfully !!");
      setTimeout(() => {
        navigate("/");
        setIsVisible(!isVisible);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (value) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value.email) {
      errors.email = "Email Can't be Empty !!";
    } else if (!regex.test(value.email)) {
      errors.email = "Email Format is not Valid !!";
    }
    if (!value.password) {
      errors.password = "Password Can't be Empty !!";
    } else if (value.password.length < 6) {
      errors.password = "Password have atleast 6 Character";
    }
    return errors;
  };

  return (
    toggle !== true && (
      <div className="container-small">
        <h3 className='title'>Login</h3>
        <p className="toggleLink"> or <span onClick={() => {handleToggle(!toggle); }}> create an account </span>
        </p>
        <form className="userForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="formError">{formErrors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <p className="formError">{formErrors.password}</p>
          )}
          <button type="submit">Login</button>
        </form>
        <div className="googleButtonWrap">
          <span>Or</span>
          <GoogleButton className="googleButton" onClick={handleGoogleAuth} />
        </div>
        <ToastContainer position="top-right" autoClose={5000} theme="light" />
      </div>
    )
  );
};

export default Login;

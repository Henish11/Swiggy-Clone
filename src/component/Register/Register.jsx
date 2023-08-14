import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useUserAuth } from '../../context/userContext';


const Register = ({handleToggle,toggle}) => {

  const initialValue = {
    username : '',
    email : '',
    password : '',
  }
  const[formData,setFormData] = useState(initialValue)
  const [formErrors,setFormErros] = useState({})
  const {signUp} = useUserAuth()

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) =>{
     e.preventDefault()
     setFormErros(validate(formData))

     try {
        const result = await signUp(formData.email,formData.password)
        console.log(result);
        toast.success("Register Succesfully !!")
     } catch (error) {
        toast.error(error.message)
     }
     
  }

  const validate = (value) =>{
      const errors = {}
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if(!value.username){
        errors.username = "Username Can't be Empty !!"
      }
      if(!value.email){
        errors.email = "Email Can't be Empty !!"
      }else if(!regex.test(value.email)){
        errors.email = "Email Format is not Valid !!"
      }
      if(!value.password){
        errors.password = "Password Can't be Empty !!"
      }else if(value.password.length < 6){
        errors.password = "Password have atleast 6 Character"
      }
      return errors
  }


  return toggle === true &&  (
    <div className='formWrap'>
        <h3 className='title'>Sign up</h3>
        <p className="toggleLink">or <span onClick={()=>{ handleToggle(!toggle)}}>login to your account</span></p>
        <form className='userForm' onSubmit={handleSubmit}>
            <input type="text" name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
            {formErrors.username && <p className='formError'>{formErrors.username}</p>}
            <input type="text" name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
            {formErrors.email && <p className='formError'>{formErrors.email}</p>}
            <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
            {formErrors.password && <p className='formError'>{formErrors.password}</p>}
            <button type='submit'>Register</button>
        </form>
        <ToastContainer position="top-right" autoClose={5000} theme="light"/>
    </div>
  )
}

export default Register



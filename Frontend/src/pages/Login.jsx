import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';


const Login = () => {
  let [currentState,setCurrentState] = useState("login");
  let [formData,setFormData] = useState({name: "",password: "",email: ""});


  let { baseurl,setToken,navigate } = useContext(ShopContext);

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      let res;
      if(currentState === 'login') {
        res = await axios.post(baseurl+'/api/user/login',formData);
        console.log(res); 
      } else {
        res = await axios.post(baseurl+'/api/user/register',formData);
        console.log(res);
      }
      if(res.data.success){
        toast.success(res.data.message);
        setToken(res.data.token)
        navigate('/');
      } else  {
        toast.error(res.data.message);
      }
    } catch(err) {
      console.log(err);
      toast.error(err.response.data.error);
    }    
  }
  return (
    <div className='border-t'>
      <form onSubmit={ handleSubmit } className='py-6 pt-10 flex flex-col justify-center items-center sm:max-w-[480px] w-full mx-auto'>
        <div className='inline-flex items-center gap-2 py-10 p-6'>
          <h1 className='prata-regular text-3xl'>{currentState === 'login'?'Login':'Sign Up'}</h1>
          <hr className='w-14 border-none h-[4px] bg-gray-700'/>
        </div>
        {
          currentState === 'signUp' ? 
            <input type="name" required onChange={(e) => setFormData({...formData,name: e.target.value})} value={formData.name} className='border border-gray-400 w-full  p-2 h-10 mb-4' placeholder='Name'/> 
          : ""
        }
        <input type="email" required onChange={(e) => setFormData({...formData,email: e.target.value})} value={formData.email} className='border border-gray-400 w-full  p-2 h-10 mb-4' placeholder='Email'/>
        <input type="password"  required onChange={(e) => setFormData({...formData,password: e.target.value})} value={formData.password} className='border border-gray-400 w-full  p-2 h-10 mb-2' placeholder='Password'/>
        {
          currentState === 'login'?
            <div className='flex justify-between w-full pb-8'>
              <p className='text-gray-600 text-sm hover:text-black transition cursor-pointer'>Forgot Password?</p>
              <p onClick={() => setCurrentState('signUp')} className='text-gray-600 text-sm cursor-pointer hover:text-black transition'>Create Account</p>
            </div> 
          :
            <div className='flex justify-start w-full pb-8'>
              <a href="">Have an account ? <span className='text-blue-500 underline'>Login</span></a>
            </div>
        }
        <button className='px-10 py-2 bg-black text-white'>{currentState === 'login'?'Login':'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login

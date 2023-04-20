import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/image/memories_logo.png'
import { useEffect } from 'react';
import { useState } from 'react';
import { SERVER_URL } from './../services/helper';
import MainContext from './../context/MainContext';

function LogIn() {

  const context = useContext(MainContext)

  const navigate = useNavigate()

  const { setNotification } = context;

  const localTheme = localStorage.getItem("theme")


  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const response = await fetch(`${SERVER_URL}auth/user/authuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": email, "password": password })
    })

    const json = await response.json()

    if (json.success) {
      localStorage.setItem("auth-token", json.authToken)
      setNotification({ status: "true", message: "Login Sucess", type: "success" })
      navigate('/')
    } else {
      setNotification({ status: "true", message: `${json.error}`, type: "error" })
    }

  }


  useEffect(() => {
    if (localTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [localTheme]);

  return (
    <>
      <div className='lg:h-screen bg-[#D9D9D9] dark:bg-[#1C1132] lg:flex lg:items-center lg:justify-around lg:px-52'>

        <div className='flex justify-between mx-5 pt-5 lg:flex-col lg:justify-center lg:w-1/4 lg:gap-y-3'>
          <div className='w-8 text-center justify-center lg:w-48'>
            <img className='' src={logo} alt="logo" />
          </div>
          <div className='hidden lg:block justify-center dark:text-white font-semibold lg:text-4xl lg:font-bold'>Memories</div>
          <div className='justify-center lg:hidden dark:text-white font-semibold lg:text-4xl lg:font-bold'>Login</div>
          <div className='hidden dark:text-white lg:block lg:text-xl '>keep your memoires alive and enjoy every moment</div>
        </div>

        <form method='POST' onSubmit={handleLogin} className="flex flex-col h-screen justify-center p-5 rounded-lg lg:w-1/3 2xl:justify-center">
          <div className='hidden te xt-black dark:text-white text-2xl font-semibold lg:block lg:px-5 lg:py-3 lg:mb-4 '>Login</div>
          <input name='email' value={email} onChange={e => setEmail(e.target.value)} className="px-5 py-3 mb-4 bg-transparent border-black dark:text-white border dark:border-white rounded-3xl" type="email" placeholder="Email" />
          <input name='password' value={password} onChange={e => setpassword(e.target.value)} className="px-5 py-3 mb-7 bg-transparent border-black dark:text-white border dark:border-white rounded-3xl" type="password" placeholder="Password" />
          <button type='submit' className="bg-[#901EC7] p-3 font-bold text-xl text-white bg-gradient-to-bl from-[#573698] to-[#9013C9] rounded-3xl hover:scale-105 duration-300">LOGIN</button>
          <Link to="/signup" className='text-md dark:text-white mt-4 underline underline-offset-2 flex justify-center lg:no-underline lg:hover:underline duration-300 w-max mx-auto'>Create New Account !</Link>
          <Link to="/forgetpassword" className='text-md dark:text-white mt-4 underline underline-offset-2 flex justify-center lg:no-underline lg:hover:underline duration-300 w-max mx-auto'>Forget Password</Link>
        </form>
      </div>
    </>
  )
}

export default LogIn
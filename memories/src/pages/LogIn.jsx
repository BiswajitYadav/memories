import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/image/memories_logo.png'
import { useEffect } from 'react';

function LogIn() {

  const localTheme = localStorage.getItem("theme")

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
      <div className='h-screen bg-[#D9D9D9] dark:bg-[#1C1132] lg:flex lg:items-center lg:justify-around lg:px-52'>

        <div className='flex justify-between mx-5 pt-5 lg:flex-col lg:justify-center lg:w-1/4 lg:gap-y-3'>
          <div className='w-8 text-center justify-center lg:w-48'>
            <img className='' src={logo} alt="logo" />
          </div>
          <div className='hidden lg:block justify-center dark:text-white font-semibold lg:text-4xl lg:font-bold'>Memories</div>
          <div className='justify-center lg:hidden dark:text-white font-semibold lg:text-4xl lg:font-bold'>Login</div>
          <div className='hidden dark:text-white lg:block lg:text-xl '>keep your memoires alive and enjoy every moment</div>
        </div>

        <div className="flex flex-col h-screen justify-center p-5 rounded-lg lg:w-1/3 2xl:justify-center">
          <div className='hidden te xt-black dark:text-white text-2xl font-semibold lg:block lg:px-5 lg:py-3 lg:mb-4 '>Login</div>
          <input className="px-5 py-3 mb-4 bg-transparent border-black text-white border dark:border-white rounded-3xl" type="email" placeholder="Email" />
          <input className="px-5 py-3 mb-7 bg-transparent border-black text-white border dark:border-white rounded-3xl" type="password" placeholder="Password" />
          <button className="bg-[#901EC7] p-3 font-bold text-xl text-white bg-gradient-to-bl from-[#573698] to-[#9013C9] rounded-3xl hover:scale-105 duration-300">LOGIN</button>
          <Link to="/signup" className='text-md dark:text-white mt-4 underline underline-offset-2 flex justify-center lg:no-underline lg:hover:underline duration-300'>Create New Account !</Link>
        </div>
      </div>
    </>
  )
}

export default LogIn
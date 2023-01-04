import React from 'react'
import logo from '../assets/image/memories_logo.png'

function LogIn() {
  return (
    <>
      <div className='h-screen bg-[#1C1132] md:flex md:flex-row md:space-x-52 md:pl-60'>

        <div className='flex justify-between mx-5 pt-5 md:flex-col md:justify-center md:w-1/4 md:space-y-5 md:my-auto'>
          <div className='w-8 text-center justify-center md:w-56'>
            <img src={logo} alt="the memories" />
          </div>
          <div className='text-center justify-center text-white font-semibold md:text-5xl md:font-bold'>The Memories</div>
          <div className='hidden text-white md:block md:text-xl'>keep your memoires alive and enjoy every moment</div>
        </div>


        <div class="mt-44 ml-2 flex flex-col p-5 rounded-lg md:w-1/3 md:pt-28">
          <div className='hidden text-white text-2xl font-semibold md:block md:px-5 md:py-3 md:mb-4'>Login</div>
          <input class="px-5 py-3 mb-4 bg-[#1C1132] text-white border border-white rounded-3xl" type="email" placeholder="Email" />
          <input class="px-5 py-3 mb-7 bg-[#1C1132] text-white border border-white rounded-3xl" type="password" placeholder="Password" />
          <button class="bg-[#901EC7] p-3 font-bold text-xl text-white rounded-3xl">LOGIN</button>
        </div>

      </div>
    </>
  )
}

export default LogIn
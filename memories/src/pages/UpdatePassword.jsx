import React from 'react'
import Header from '../components/Header'
import SideBarNav from '../components/SideBarNav'

const UpdatePassword = () => {
  return (
    <>
    <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-screen'>
      <Header />
      <div className='bg-[#D9D9D9] dark:bg-[#1C1132] overflow-y-auto h-max lg:h-[92vh] w-screen flex justify-between gap-x-5 py-3 px-2 sm:px-5 md:px-9 md:py-5 lg:px-5 xl:px-16'>
        <div className='bg-white dark:bg-[#231344] dark:shadow-black rounded-xl w-full flex shadow-lg'>
          <SideBarNav />
          <div className='h-full w-full p-5 md:p-8 xl:p-10 '>
            <div className='text-lg font-semibold dark:text-white'>
                Update Password
            </div>
            <div className='text-xs md:text-sm text-[#797979]'>Note : Update your password if you think somebody else knows your password.</div>
            <form action="" className='flex flex-col py-5 gap-4 lg:w-[50%]'>
                <input type="password" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' placeholder='Current Password'/>
                <input type="password" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' placeholder='New Password'/>
                <input type="password" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' placeholder='Repeat Password'/>
                <p className='text-xs text-[#797979]'>Always choose a strong password</p>
                <p className='duration-300 text-red-500 flex justify-center cursor-default'>Password doesn't match</p>
                <p className='duration-300 text-red-500 flex justify-center cursor-default'>Invalid Current Password</p>
                <button className='bg-[#8948B8] w-full text-white py-2 hover:bg-[#8E2BC2] duration-200 font-semibold rounded-md'>UPDATE PASSWORD</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default UpdatePassword
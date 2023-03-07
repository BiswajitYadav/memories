import React, { useState } from 'react'
import logo from '../assets/image/memories_logo.png'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const ForgetPassword = () => {
    const [OTP, setOTP] = useState("");

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
            <div className='h-screen bg-[#D9D9D9] dark:bg-[#1C1132] lg:flex lg:px-20 xl:px-40'>
                <div className='flex p-4 lg:flex-col my-auto lg:justify-center gap-2 w-[50%] select-none cursor-default'>
                    <img className='w-12 lg:w-16 text-center justify-center' src={logo} alt="logo" />
                    <div className='hidden lg:block justify-center dark:text-white font-semibold lg:text-3xl lg:font-bold'>Reset Your Password!</div>
                    <div className='hidden dark:text-white xl:w-[70%] text-lg lg:block cursor-default'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>

                <div className='lg:w-[80%] xl:w-[70%] duration-300 my-[25%] sm:my-[16%] md:my-[10%] lg:h-auto flex flex-col dark:text-white lg:flex-row lg:my-auto justify-center p-1 sm:p-3 lg:p-5'>
                    <div className='lg:hidden text-xl py-4 dark:text-white font-semibold px-3'>Reset Your Password!</div>
                    <div className='w-auto lg:w-[70%] bg-white dark:bg-[#231344] flex items-center justify-center py-6 px-2 lg:px-6 shadow-lg dark:shadow-black rounded-lg'>
                        <form className='flex flex-col gap-4 h-max w-full' action="">
                            <div className="px-2 font-semibold text-md md:text-lg dark:text-white cursor-default select-none">
                                Enter email associated with your account
                            </div>
                            <input className="px-5 py-3 bg-transparent border-[0.5px] border-slate-400 dark:text-white dark:border-white rounded-full" type="email" placeholder="Enter Your Email Id.." />
                            <button className='bg-gradient-to-b from-[#9013C9] to-[#573698] text-white dark:text-white py-3 rounded-full font-semibold text-md select-none'>CONFIRM EMAIL</button>
                        </form>
                    </div>
                    <div className='dark:text-white p-3 text-sm lg:hidden'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword
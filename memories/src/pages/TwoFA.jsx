import React, { useState } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import logo from '../assets/image/memories_logo.png'
import { Link } from 'react-router-dom';
import { margin } from '@mui/system';
import { useEffect } from 'react';

const TwoFA = () => {
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
                <div className='flex p-4 lg:flex-col my-auto lg:justify-center gap-2 w-[50%]'>
                    <img className='w-12 lg:w-16 text-center justify-center' src={logo} alt="logo" />
                    <div className='hidden lg:block justify-center dark:text-white font-semibold lg:text-3xl lg:font-bold'>Verify it's you!</div>
                    <div className='hidden dark:text-white w-[70%] text-lg lg:block'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>

                <div className='lg:w-[50%] duration-300 my-[25%] sm:my-[16%] md:my-[10%] lg:h-auto flex flex-col dark:text-white lg:flex-row lg:my-auto justify-center p-1 sm:p-3 lg:p-5'>
                    <div className='lg:hidden text-xl py-4 dark:text-white font-semibold px-3'>Verify it's you!</div>
                    <div className='w-auto bg-white dark:bg-[#231344] flex items-center justify-center p-6 shadow-lg dark:shadow-black rounded-lg'>
                        <form className='flex flex-col gap-y-9 h-max w-max' action="">
                            <div className="font-semibold text-sm md:text-lg dark:text-white">
                                Enter OTP sent on ro****9051@gmail.com
                            </div>
                            <div className='flex items-center justify-center w-max ml-3'>
                                <OTPInput className="" inputClassName="border-[0.5px] border-black font-semibold bg-slate-100 dark:bg-slate-800 dark:border-slate-400 dark:text-white scale-125 rounded-md" value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                            </div>
                            <button className='bg-gradient-to-b from-[#9013C9] to-[#573698] hover:scale-105 duration-300 text-white dark:text-white py-3 rounded-full'>VERIFY OTP</button>
                        </form>
                    </div>
                    <div className='dark:text-white p-3 text-sm lg:hidden'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>
            </div>
        </>
    )
}

export default TwoFA
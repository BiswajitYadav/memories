import React, { useContext, useState } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import logo from '../assets/image/memories_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MainContext from '../context/MainContext';
import { SERVER_URL } from '../services/helper';

const TwoFA = () => {

    const navigate = useNavigate()

    const context = useContext(MainContext)

    const { setNotification } = context;

    const requestType = sessionStorage.getItem("type")

    const sessionEmail = sessionStorage.getItem("email")

    const authToken = sessionStorage.getItem("auth-token");

    const [otp, setOtp] = useState(0)

    const localTheme = localStorage.getItem("theme")

    const verifyOTP = async (e) => {

        e.preventDefault()

        const response = await fetch(requestType == "reset" ? `${SERVER_URL}forgot-password/verify-otp` : `${SERVER_URL}otp/verify`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "otp": otp, "email": sessionEmail })
        });

        const json = await response.json()

        if (json.success) {

            if (json.type === "auth") {

                setNotification({ status: "true", message: `${json.message}`, type: "success" });
                navigate('/createprofile')

            } else if (json.type === "reset") {

                setNotification({ status: "true", message: `${json.message}`, type: "success" });
                navigate('/resetpassword')

            }

        } else {
            setNotification({ status: "true", message: `${json.error}`, type: "error" });
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
            <div className='h-screen bg-[#D9D9D9] dark:bg-[#1C1132] lg:flex lg:px-20 xl:px-40'>
                <div className='flex p-4 lg:flex-col my-auto lg:justify-center gap-2 w-[50%] cursor-default select-none'>
                    <img className='w-12 lg:w-16 text-center justify-center' src={logo} alt="logo" />
                    <div className='hidden lg:block justify-center dark:text-white font-semibold lg:text-3xl lg:font-bold'>Verify it's you!</div>
                    <div className='hidden dark:text-white w-[70%] text-lg lg:block'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>

                <div className='lg:w-[50%] duration-300 my-[25%] sm:my-[16%] md:my-[10%] lg:h-auto flex flex-col dark:text-white lg:flex-row lg:my-auto justify-center p-1 sm:p-3 lg:p-5'>
                    <div className='lg:hidden text-xl py-4 dark:text-white font-semibold px-3'>Verify it's you!</div>
                    <div className='w-full bg-white dark:bg-[#231344] flex items-center justify-center p-3 md-p-6 shadow-lg dark:shadow-black rounded-lg py-10'>

                        <form onSubmit={verifyOTP} className='flex flex-col gap-y-9 h-full w-full' method='POST'>

                            <div className="font-semibold text-sm md:text-lg dark:text-white cursor-default select-none">
                                Enter OTP sent on {sessionEmail}
                            </div>

                            <div className='flex items-center justify-center w-full mx-3 lg:mx-0'>

                                <OTPInput inputClassName="border-[0.5px] border-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 dark:border-slate-400 dark:text-white scale-110 sm:scale-125 xl:scale-150 rounded-md -mx-1 lg:mx-1 xl:mx-7" value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} />

                            </div>

                            <button type='submit' className='bg-gradient-to-b from-[#9013C9] to-[#573698] text-white dark:text-white py-1.5 md:py-3 rounded-full text-lg font-semibold select-none'>VERIFY OTP</button>

                        </form>
                    </div>
                    <div className='dark:text-white p-3 text-sm lg:hidden'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>
            </div>
        </>
    )
}

export default TwoFA
import React, { useContext, useState } from 'react'
import logo from '../assets/image/memories_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SERVER_URL } from '../services/helper';
import MainContext from '../context/MainContext';

const ResetPassword = () => {

    const navigate = useNavigate()

    const context = useContext(MainContext)

    const { setNotification } = context;

    const localTheme = localStorage.getItem("theme")

    const sessionEmail = sessionStorage.getItem("email")

    const [password, setPassword] = useState("")

    const [repeatPassword, setRepeatPassword] = useState("")

    const [passMatch, setPassMatch] = useState(false)

    const handlePasswordChange = async (e) => {

        e.preventDefault()

        if (password != repeatPassword != "") {
            setPassMatch(true)
        } else {

            setPassMatch(false)

            const response = await fetch(`${SERVER_URL}forgot-password/update-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": sessionEmail, "password": repeatPassword })
            })

            const json = await response.json()

            if (json.success) {

                sessionStorage.removeItem("type")

                setNotification({ status: "true", message: `${json.message}`, type: "success" });

                navigate('/login')

            } else {

                setNotification({ status: "true", message: `${json.error}`, type: "error" })

            }

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
                <div className='flex p-4 lg:flex-col my-auto lg:justify-center gap-2 w-[50%] select-none cursor-default'>
                    <img className='w-12 lg:w-16 text-center justify-center' src={logo} alt="logo" />
                    <div className='hidden lg:block justify-center dark:text-white font-semibold lg:text-3xl lg:font-bold'>Reset Your Password!</div>
                    <div className='hidden dark:text-white xl:w-[70%] text-lg lg:block cursor-default'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>

                <div className='lg:w-[80%] xl:w-[70%] duration-300 my-[25%] sm:my-[16%] md:my-[10%] lg:h-auto flex flex-col dark:text-white lg:flex-row lg:my-auto justify-center p-1 sm:p-3 lg:p-5'>
                    <div className='lg:hidden text-xl py-4 dark:text-white font-semibold px-3'>Reset Your Password!</div>
                    <div className='w-auto lg:w-[70%] bg-white dark:bg-[#231344] flex items-center justify-center py-6 px-2 lg:px-6 shadow-lg dark:shadow-black rounded-lg'>

                        <form onSubmit={handlePasswordChange} className='flex flex-col gap-4 h-max w-full' action="">

                            <div className="px-2 font-semibold text-md md:text-lg dark:text-white cursor-default select-none">
                                Enter new password for your account
                            </div>

                            <input value={password} onChange={e => setPassword(e.target.value)} className="px-5 py-3 bg-transparent border-[0.5px] border-slate-400 dark:text-white dark:border-white rounded-full text-lg" type="password" placeholder="New Password.." required />

                            <input value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} className="px-5 py-3 bg-transparent border-[0.5px] border-slate-400 dark:text-white dark:border-white rounded-full text-lg" type="password" placeholder="Repeat Password.." required />

                            <button type='submit' className='bg-gradient-to-b from-[#9013C9] to-[#573698] text-white dark:text-white py-3 rounded-full font-semibold text-md select-none'>SET NEW PASSWORD</button>

                            {passMatch ? <p className='text-red-500 text-center font-medium animate-pulse duration-300 w-full'>Password match failed !</p> : ""}

                        </form>

                    </div>
                    <div className='dark:text-white p-3 text-sm lg:hidden'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
import React from 'react'
import Logo from '../assets/image/memories_logo.png'

const Login = () => {
    return (
        <>
            <div className='h-[82vh] bg-[#FFFFFF] flex items-center px-28'>

                <div className='w-full h-full pt-5 flex justify-center'>
                    <div className='w-full h-full shadow-xl border rounded-lg px-2'>
                        <div className='flex justify-between items-center px-6 py-3 rounded-t-lg'>
                            <div className='flex items-center gap-3'>
                                <img className='w-10' src={Logo} alt="" />
                                <div className='font-semibold text-lg'>Developer's Portal</div>
                            </div>
                            <div className='font-semibold text-lg'>Login</div>

                        </div>
                        <form className=''>
                            <div className='flex flex-col items-center gap-3 py-36'>
                                <input className=" px-5 py-3 w-[50%] bg-transparent border border-[#1C1132] text-[#1C1132] rounded-lg" type="text" placeholder="Email" />
                                <input className=" px-5 py-3 w-[50%] bg-transparent border border-[#1C1132] text-[#1C1132] rounded-lg" type="password" placeholder="Password" />
                                <button className=" px-5 py-3 w-[50%] bg-[#1C1132] text-white font-semibold rounded-lg shadow-lg">LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
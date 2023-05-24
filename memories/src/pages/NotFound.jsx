import React from 'react'
import Logo from '../assets/image/memories_logo.png'
import { Link } from 'react-router-dom'


const NotFound = () => {
    return (
        <>
            <div className='h-screen flex w-full bg-[#D9D9D9] dark:bg-[#1C1132]'>

                <div className='m-auto flex flex-col gap-2'>
                    <img src={Logo} alt="" className='w-32' />
                    <div className='text-lg dark:text-white'><b>OOPS!</b> wrong route</div>
                    <Link to={localStorage.getItem('auth-token') ? '/' : '/login'} className='w-full bg-slate-400 hover:bg-purple-800 hover:text-white text-center py-1.5 rounded-md duration-300'>{localStorage.getItem('auth-token') ? 'HOME' : 'LOGIN'}</Link>
                </div>

            </div>
        </>
    )
}

export default NotFound
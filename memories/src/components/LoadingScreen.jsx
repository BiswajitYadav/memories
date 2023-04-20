import React from 'react'
import Header from './Header'
import Logo from '../assets/image/memories_logo.png'

const LoadingScreen = () => {
    return (
        <>
            <div className='h-screen w-screen bg-[#D9D9D9] dark:bg-[#1C1132]'>
                <Header />
                <div className='h-[82vh] w-full flex items-center justify-center'>
                    <img src={Logo} alt="loading logo" className='animate-pulse w-20 m-auto' />
                </div>
            </div>
        </>
    )
}

export default LoadingScreen
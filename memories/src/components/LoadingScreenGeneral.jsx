import React from 'react'
import Logo from '../assets/image/memories_logo.png'


const LoadingScreenGeneral = () => {
    return (
        <>

            <div className='h-screen w-screen flex items-center justify-center bg-[#D9D9D9] dark:bg-[#1C1132]'>

                <img src={Logo} alt="loading logo" className='animate-pulse w-20 m-auto' />

            </div>
            
        </>
    )
}

export default LoadingScreenGeneral
import { Avatar } from '@mui/material'
import React from 'react'

const CreatePost = () => {
    return (
        <div className='hidden md:flex bg-white dark:bg-[#231344] h-[15%] justify-center items-center rounded-md shadow-lg p-3 gap-2'>
            <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
            <div className='bg-transparent rounded-full flex items-center w-full'>
                <input className='p-2 bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full dark:text-white w-full px-8 py-3 focus:outline-none' type="text" placeholder='Write Something to get Butterflies...' />
            </div>
        </div>
    )
}

export default CreatePost
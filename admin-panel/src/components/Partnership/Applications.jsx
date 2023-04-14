import React from 'react'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { Avatar } from '@mui/material';

const Applications = () => {
    return (
        <>
            <div className='flex flex-col h-max py-3 rounded-md duration-300 cursor-default hover:bg-[#1C1132] hover:text-white'>
                <div className='flex w-full justify-between px-7'>
                    <div className='flex gap-2'>
                        <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
                    <div className='flex flex-col justify-center'>
                        <div className='font-semibold -my-1.5'>User ID</div>
                        <div className='text-gray-400 text-sm'>wserc3w4ce4432874cdf</div>
                    </div>
                    </div>
                    <div className='flex items-center gap-8'>
                        <OpenInBrowserIcon className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Applications
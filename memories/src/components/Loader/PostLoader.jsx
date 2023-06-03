import React from 'react'
import { SendIcon } from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const PostLoader = () => {
    return (
        <>
            <div className='flex flex-col bg-white dark:bg-[#231344] h-max w-full justify-center items-center rounded-md shadow-lg px-2 sm:px-5 py-4 md:py-5 gap-2 md:gap-3 mb-5'>

                <div className='flex gap-2 animate-pulse w-full'>

                    <Avatar sx={{ width: 45, height: 45 }} />

                    <div className='flex flex-col gap-2 justify-center'>
                        <div className='bg-slate-300 dark:bg-[#1C1132] py-1 w-[150px] rounded'></div>
                        <div className='bg-slate-300 dark:bg-[#1C1132] py-1 w-[100px] rounded'></div>
                    </div>
                </div>

                <div className='animate-pulse h-[150px] md:h-[250px] w-full bg-slate-300 dark:bg-[#1C1132] rounded-lg'>
                </div>

                <div className='w-full flex gap-2 text-slate-300 animate-pulse'>
                    <Favorite />
                    <CommentIcon />
                </div>

            </div>
        </>
    )
}

export default PostLoader
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const CommentItem = () => {
    return (
        <>
            <div className='flex gap-2 py-3 md:px-2 w-full'>
                <Avatar className='' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
                <div className='flex flex-col w-full'>
                    <div className='flex items-center gap-2 dark:text-white'>
                        <Link to="/profile">
                            <div className='font-semibold text-sm'>Rohit Kumar Pandit</div>
                        </Link>
                        <div className='text-xs'>2 days ago</div>
                    </div>
                    <div className='w-full break-normal dark:text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, molestias tempore infsadfasdgsdgsadga</div>
                </div>
            </div>
        </>
    )
}

const Comment = () => {
    return (
        <>
            <form className='bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full flex items-center py-0.5 md:px-2 md:py-1 w-full'>
                <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
                <input className='px-2 md:px-4 bg-transparent w-full focus:outline-none dark:text-white' type="text" placeholder='Add a comment...' />
                <button className='text-[#573698] dark:text-white/70 rounded-full hover:scale-105 duration-200 px-1.5'>
                    <SendIcon style={{ fontSize: 30 }} />
                </button>
            </form>
            <div className='py-2 flex flex-col w-full'>
                
                <CommentItem />

            </div>
        </>
    )
}

export default Comment
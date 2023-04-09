import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom'

const Followers = () => {
    return (
        <>
            <div className='flex w-full justify-between px-3 py-2'>
                <Link to="/profile" className='flex gap-2'>
                    <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 40, height: 40 }} />

                    <div className='flex flex-col justify-center'>
                        <div className='flex gap-1'>
                            <div className='dark:text-white font-semibold text-sm'>Rohit Kumar Pandit</div>
                            <Tooltip title="Developer" className="text-gray-400 my-auto">
                                <VerifiedIcon style={{ fontSize: 16 }} />
                            </Tooltip>
                        </div>
                        <div className=' text-slate-400 text-xs'>@rohit64Bit</div>
                    </div>
                </Link>
                <Tooltip title="Follow">
                    <button className='h-max bg-gradient-to-r from-[#8948B8] to-[#8E2BC2] my-auto px-3 py-1 text-white rounded flex '>Follow</button>
                </Tooltip>
            </div>
        </>
    )
}

export default Followers
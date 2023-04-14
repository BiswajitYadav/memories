import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const RecentUser = () => {
    return (
        <>
            <div className='flex flex-col h-max py-3 px-5 gap-5 rounded-md duration-300 cursor-default hover:bg-[#1C1132] hover:text-white'>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-2'>
                        <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 40, height: 40 }} />

                        <div className='flex flex-col justify-center'>
                            <div className='flex gap-1'>
                                <div className='font-semibold text-sm'>Rohit Kumar Pandit</div>
                                <Tooltip title="Developer" className="text-gray-400 my-auto">
                                    <VerifiedIcon style={{ fontSize: 16 }} />
                                </Tooltip>
                            </div>
                            <div className=' text-slate-400 text-xs'>Rohit64Bit</div>
                        </div>
                    </div>
                    <div className='flex items-center cursor-pointer'>
                        <OpenInNewIcon fontSize='small'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecentUser
import React from 'react'
import { Avatar, Tooltip } from '@mui/material'
import VerifiedIcon from '@mui/icons-material/Verified';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Partners = () => {
    return (
        <>
            <div className='flex flex-col h-max py-3 rounded-md duration-300 cursor-default hover:bg-[#1C1132] hover:text-white'>
                <div className='flex w-full justify-around'>
                    <div className='flex gap-2'>
                        <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />

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
                    <div className='flex flex-col justify-center'>
                        <div className='font-semibold -my-1.5'>User ID</div>
                        <div className='text-gray-400 text-sm'>wserc3w4ce4432874cdf</div>
                    </div>
                    <div className='flex items-center gap-8'>
                        <ManageAccountsIcon className='cursor-pointer' />
                        <OpenInNewIcon className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Partners
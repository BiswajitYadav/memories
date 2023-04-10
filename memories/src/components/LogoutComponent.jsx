import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import Badge from '@mui/material/Badge';


const LogoutComponent = () => {

    return (
        <>
            <div className='w-full h-max flex flex-col px-3 py-2'>
                <Badge
                    className="mx-auto"
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <Tooltip  title="Developer">
                            <VerifiedIcon fontSize='large' className='text-gray-400' />
                        </Tooltip>
                        // <Tooltip  title="Developer">
                        //     <VerifiedIcon className='text-yellow-400' />
                        // </Tooltip>
                        // <Tooltip  title="Developer">
                        //     <VerifiedIcon className='text-blue-400' />
                        // </Tooltip>
                    }>
                    <Avatar sx={{ height: '150px', width: '150px' }} alt="Travis Howard" src="https://i.ytimg.com/vi/oxCAPWBNJag/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBUgcigRMA8=&rs=AOn4CLBq6UUnvf2-ImYSgPwsIz8BJOcN6A" className='' />
                </Badge>

                <div className='py-5 lg:py-3 xl:py-9 flex flex-col gap-5 items-center '>
                    <div className='text-xl lg:text-2xl font-semibold dark:text-white'>Name</div>
                    <button className='w-full bg-[#FF0000] py-2 xl:py-3 text-white text-lg font-semibold rounded-lg'>LOGOUT</button>
                </div>
            </div>
        </>
    )
}

export default LogoutComponent
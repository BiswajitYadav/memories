import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';

const RenderUserProfile = (props) => {
    const { name, profileURL } = props;

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("auth-token")
        navigate('/login')
    }
    return (
        <>
            <div className='w-full h-max flex flex-col px-3 py-1'>
                <Badge
                    className="mx-auto"
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <Tooltip title="Developer">
                            <VerifiedIcon fontSize='large' className='text-gray-400 drop-shadow-lg rounded-full' />
                        </Tooltip>
                        // <Tooltip  title="Organization">
                        //     <VerifiedIcon className='text-yellow-400' />
                        // </Tooltip>
                        // <Tooltip  title="Partner">
                        //     <VerifiedIcon className='text-blue-400' />
                        // </Tooltip>
                    }>
                    <Avatar sx={{ height: '120px', width: '120px' }} src={profileURL} alt={name?.slice(0, 1)} className='' />
                </Badge>
                <div>
                    <div className='flex flex-col items-center gap-1 justify-center pt-5'>
                        <div className='font-bold text-lg sm:text-xl xl:text-2xl'>Rohit Kumar Pandit</div>
                        <div className=' dark:text-slate-200 text-slate-600 text-sm sm:text-sm font-semibold'>rohit64bit</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RenderUserProfile
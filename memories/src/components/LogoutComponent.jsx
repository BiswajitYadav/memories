import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';


const LogoutComponent = (props) => {

    const { name, profileURL } = props;

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("auth-token")
        navigate('/login')
    }

    return (
        <>
            <div className='w-full h-max flex flex-col px-3 py-2'>
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
                    <Avatar sx={{ height: '150px', width: '150px' }} src={profileURL} alt={name?.slice(0, 1)} className='' />
                </Badge>

                <div className='py-5 lg:py-3 xl:py-9 flex flex-col gap-5 items-center '>
                    <div className='text-xl lg:text-2xl font-semibold dark:text-white'>{name}</div>
                    <button onClick={handleLogout} className='w-full bg-slate-200 text-black hover:bg-[#FF0000] py-2 xl:py-3 duration-300 hover:text-white text-lg font-semibold rounded-lg'>LOGOUT</button>
                </div>
            </div>
        </>
    )
}

export default LogoutComponent
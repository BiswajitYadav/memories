import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { SERVER_URL } from '../services/helper';

const Like = (props) => {

    const { userID } = props.data;

    const [userData, setUserData] = useState({})

    const { name, userName, profileURL } = userData;

    const fetchUserProfileData = async () => {

        const response = await fetch(`${SERVER_URL}user/get-profile-of/${userID}`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if (json.success) {
            setUserData(json.userProfile)
        }

    }

    useEffect(() => {

        if (userID) {
            fetchUserProfileData()
        }

    }, [userID])

    return (
        <>
            <div className='flex w-full justify-between px-3 py-2'>

                <Link to={`/profile/${userID}`} className='flex gap-2'>
                    <Avatar className='my-auto' alt="Travis Howard" src={profileURL} sx={{ width: 40, height: 40 }} />

                    <div className='flex flex-col justify-center'>
                        <div className='flex gap-1'>
                            <div className='dark:text-white font-semibold text-sm'>{name}</div>
                            <Tooltip title="Developer" className="text-gray-400 my-auto">
                                <VerifiedIcon style={{ fontSize: 16 }} />
                            </Tooltip>
                        </div>
                        <div className=' text-slate-400 text-xs'>@{userName}</div>
                    </div>
                </Link>

                {/* <Tooltip title="Follow">
                    <button className='h-max bg-gradient-to-r from-[#8948B8] to-[#8E2BC2] my-auto px-3 py-1 text-white rounded flex '>Follow</button>
                </Tooltip> */}
            </div>
        </>
    )
}

export default Like
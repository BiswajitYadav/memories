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
    const [partner, setPartner] = useState({})

    const { name, userName, profileURL } = userData;

    const [loading, setLoading] = useState(true)

    const fetchUserProfileData = async () => {

        setLoading(true)

        const response = await fetch(`${SERVER_URL}user/get-profile-of/${userID}`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if (json.success) {
            setLoading(false)
            setUserData(json.userProfile)
            setPartner(json.partner)
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

                {
                    loading ?
                        <div className='flex gap-2 animate-pulse w-full'>
                            <Avatar className='my-auto' alt="" src="" sx={{ width: 40, height: 40 }} />

                            <div className='flex flex-col gap-2 justify-center w-full'>

                                <div className='dark:text-white font-semibold text-sm bg-slate-200 w-[100%] md:w-[50%] p-1 rounded-lg' ></div>

                                <div className=' text-slate-400 text-xs bg-slate-200 w-[70%] md:w-[30%] p-1 rounded-lg'></div>

                            </div>
                        </div>
                        :



                        <Link to={`/profile/${userID}`} className='flex gap-2'>
                            <Avatar className='my-auto' alt={name?.slice(0, 1)} src={profileURL} sx={{ width: 40, height: 40 }} />

                            <div className='flex flex-col justify-center'>
                                <div className='flex gap-1'>
                                    <div className='dark:text-white font-semibold text-sm'>{name}</div>

                                    {
                                        partner?.verificationType == "dev" ?
                                            <Tooltip title="Developer" className="text-gray-400 my-auto">
                                                <VerifiedIcon style={{ fontSize: 16 }} />
                                            </Tooltip>
                                            : partner?.verificationType == "celeb" ?
                                                <Tooltip title="Public Figure" className="text-blue-400 my-auto">
                                                    <VerifiedIcon style={{ fontSize: 16 }} />
                                                </Tooltip>
                                                : partner?.verificationType == "org" ?
                                                    <Tooltip title="Organization" className="text-yellow-400 my-auto">
                                                        <VerifiedIcon style={{ fontSize: 16 }} />
                                                    </Tooltip>
                                                    : null
                                    }

                                </div>
                                <div className=' text-slate-400 text-xs'>@{userName}</div>
                            </div>
                        </Link>

                }

            </div>
        </>
    )
}

export default Like
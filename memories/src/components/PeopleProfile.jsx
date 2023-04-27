import { Avatar, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../services/helper';
import { useContext } from 'react';
import MainContext from '../context/MainContext';

const PeopleProfile = (props) => {

    const userID = props.userID;

    const authToken = localStorage.getItem('auth-token')

    const { setNotification } = useContext(MainContext)

    const [userData, setUserData] = useState({})

    const { name, userName, profileURL } = userData;

    const fetchUserProfileData = async () => {

        const response = await fetch(`${SERVER_URL}user/get-profile-of/${userID}`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if (json.success) {
            setUserData(json.userProfile)
        }

    }

    // handle follow

    const [followStatus, setFollowStatus] = useState(Boolean)

    const fetchFollowStatus = async () => {

        const response = await fetch(`${SERVER_URL}follow/fetch-follow-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "followingUserID": userID })
        })

        const json = await response.json()

        if (json.success) {

            if (json.followingStatus) {
                setFollowStatus(true)
            } else {
                setFollowStatus(false)
            }

        } else {
            setNotification({ status: "true", message: `${json.error}`, type: "error" })
        }

    }

    const handleFollowUnfollow = async () => {
        const response = await fetch(`${SERVER_URL}follow/follow-unfollow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "following": userID })
        });

        const json = await response.json()

        if (json.success) {
            fetchFollowStatus()
        } else {
            setNotification({ status: "true", message: `${json.error}`, type: "error" })
        }

    }

    useEffect(() => {
        if (userID) {
            fetchFollowStatus()
        }
    }, [])

    // -------------

    useEffect(() => {
        fetchUserProfileData()
    }, [userID])

    return (
        <>
            <div className='flex w-full justify-between px-3 py-2'>
                <Link to={`/profile/${userID}`} className='flex gap-2'>
                    <Avatar className='my-auto' alt={name?.slice(0, 1)} src={profileURL} sx={{ width: 40, height: 40 }} />

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

                {

                    followStatus ?
                        <Tooltip title="Unfollow">
                            <button onClick={handleFollowUnfollow} className='h-max bg-slate-200 my-auto px-3 py-1.5 text-slate-700 rounded flex text-sm '>Unfollow</button>
                        </Tooltip>
                        :
                        <Tooltip title="Follow">
                            <button onClick={handleFollowUnfollow} className='h-max bg-gradient-to-r from-[#8948B8] to-[#8E2BC2] my-auto px-3 py-1.5 text-white rounded flex text-sm '>Follow</button>
                        </Tooltip>

                }



            </div>
        </>
    )
}

export default PeopleProfile
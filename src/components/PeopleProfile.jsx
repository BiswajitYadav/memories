import { Avatar, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../services/helper';
import { useContext } from 'react';
import MainContext from '../context/MainContext';

const PeopleProfile = (props) => {

    const sessionUserID = sessionStorage.getItem("sessionUserID")

    const userID = props.userID;

    const authToken = localStorage.getItem('auth-token')

    const { setNotification } = useContext(MainContext)

    const [userData, setUserData] = useState({})

    const { name, userName, profileURL } = userData;

    const [partner, setPartner] = useState({})

    const [loading, setLoading] = useState(true)

    const fetchUserProfileData = async () => {

        setLoading(true)

        const response = await fetch(`${SERVER_URL}user/get-profile-of/${userID}`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
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

                        <>
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

                            {

                                sessionUserID !== userID ?

                                    followStatus ?
                                        <Tooltip title="Unfollow">
                                            <button onClick={handleFollowUnfollow} className='h-max bg-slate-200 my-auto px-3 py-1.5 text-slate-700 rounded flex text-sm '>Unfollow</button>
                                        </Tooltip>
                                        :
                                        <Tooltip title="Follow">
                                            <button onClick={handleFollowUnfollow} className='h-max bg-gradient-to-r from-[#8948B8] to-[#8E2BC2] my-auto px-3 py-1.5 text-white rounded flex text-sm '>Follow</button>
                                        </Tooltip>
                                    : ""

                            }
                        </>
                }

            </div>
        </>
    )
}

export default PeopleProfile
import { CircularProgress, Modal, Tooltip } from '@mui/material'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Post from '../components/Home/Post'
import VerifiedIcon from '@mui/icons-material/Verified';
import { AiFillYoutube, AiFillInstagram, AiFillGithub } from 'react-icons/ai'
import { FaDiscord } from 'react-icons/fa'
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from 'react'
import { CloseIcon } from '@mui/icons-material/Close';
import Followers from '../components/Followers'
import Followings from '../components/Followings'
import MessageIcon from '@mui/icons-material/Message';
import { SERVER_URL } from '../services/helper'
import { useContext } from 'react'
import MainContext from '../context/MainContext'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import staticAvatar from '../assets/image/sample-profile.webp'


const UserProfile = () => {

    const { otherUserProfile, fetchAnotherUserProfile, setNotification } = useContext(MainContext)

    const { name, bio, userName, profileURL } = otherUserProfile;

    const authToken = localStorage.getItem('auth-token')

    const params = useParams()
    const { userID } = params;

    const [followersModalOpen, setFollowersModalOpen] = useState(false);
    const handlefollowersModalOpen = () => setFollowersModalOpen(true);
    const handlefollowersModalClosed = () => setFollowersModalOpen(false);

    const [followingsModalOpen, setFollowingsModalOpen] = useState(false);
    const handlefollowingsModalOpen = () => setFollowingsModalOpen(true);
    const handlefollowingsModalClosed = () => setFollowingsModalOpen(false);


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
        fetchAnotherUserProfile(userID)
    }, [])


    const pageLimit = 5

    const [post, setPost] = useState([]);

    const [totalData, setTotalData] = useState(0)

    const fetchData = () => {

        let pageNo = Math.ceil(post.length / pageLimit) + 1;

        fetch(`${SERVER_URL}post/fetch-user-post/${userID}/${pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
            .then(res => res.json())
            .then((newData) => {
                console.log(newData);
                const mergeData = [...post, ...newData.usersPost]
                setPost(mergeData)
                setTotalData(newData.usersPostLength)
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchData()
    }, [])

    const fetchMoreData = () => {
        fetchData()
    }


    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>

                <Header />

                <div id='scrollableDivUserProfile' className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-screen overflow-y-auto flex flex-col gap-x-5'>

                    <div className='w-full h-full flex items-center flex-col px-2 py-5'>

                        <div className='flex gap-6 lg:gap-8 xl:gap-6 py-3 xl:py-5'>
                            <img className='w-24 h-24 md:h-32 md:w-32 xl:h-40 xl:w-40 select-none rounded-full overflow-hidden object-cover' src={profileURL ? profileURL : staticAvatar} alt="Profile Picture" />
                            <div className='gap-4 md:gap-5 select-none'>
                                <div className='flex gap-1 dark:text-white'>
                                    <div className='font-bold text-lg sm:text-xl xl:text-2xl'>{name}</div>
                                    <Tooltip title="Developer" className="text-gray-400 my-auto">
                                        <VerifiedIcon style={{ fontSize: 16 }} />
                                    </Tooltip>
                                </div>
                                <div className=' dark:text-slate-200 text-slate-600 text-sm sm:text-sm font-semibold'>@{userName}</div>
                                <div className='font-semibold text-sm py-2 lg:py-3 text-gray-400'>Developer</div>
                                <div className='hidden md:flex gap-x-4 lg:gap-x-8 dark:text-white'>
                                    <div className='flex items-baseline gap-1'><span className='font-bold flex justify-center text-lg'>{totalData ? totalData : "N/A"}</span><span className='text-xs'>posts</span></div>
                                    <div className='flex items-baseline gap-1'><span className='font-bold flex justify-center text-lg'>10</span><span className='text-xs'>followers</span></div>
                                    <div className='flex items-baseline gap-1'><span className='font-extrabold flex justify-center text-lg'>10</span><span className='text-xs'>followings</span></div>
                                </div>
                                <div className='py-3 hidden md:block dark:text-white whitespace-pre-wrap'>
                                    {bio}
                                </div>
                                <div className='hidden md:flex gap-5'>
                                    <a className='cursor-pointer text-slate-500 hover:text-red-600 duration-200' target="_blank" href="/"><AiFillYoutube style={{ fontSize: 30 }} /></a>
                                    <a className='cursor-pointer text-slate-500 hover:text-pink-600 duration-200' target="_blank" href="/"><AiFillInstagram style={{ fontSize: 30 }} /></a>
                                    <a className='cursor-pointer text-slate-500 hover:text-violet-600 duration-200' target="_blank" href="/"><AiFillGithub style={{ fontSize: 30 }} /></a>
                                    <a className='cursor-pointer text-slate-500 hover:text-sky-600 duration-200' target="_blank" href="/"><FaDiscord style={{ fontSize: 30 }} /></a>
                                </div>
                            </div>
                        </div>

                        <div className='flex md:hidden px-2 w-full justify-around py-3 text-xs dark:text-white'>
                            <div><span className='font-extrabold flex justify-center text-lg'>{totalData ? totalData : "N/A"}</span> posts</div>
                            <div><span className='font-extrabold flex justify-center text-lg'>10</span> followers</div>
                            <div><span className='font-extrabold flex justify-center text-lg'>10</span> followings</div>
                        </div>

                        <div className='py-1 md:hidden dark:text-white whitespace-pre-wrap'>
                            {bio}
                        </div>

                        <div className='flex md:hidden gap-7 py-3'>
                            <a className='cursor-pointer text-slate-500' href="/"><AiFillYoutube style={{ fontSize: 25 }} /></a>
                            <a className='cursor-pointer text-slate-500' href="/"><AiFillInstagram style={{ fontSize: 25 }} /></a>
                            <a className='cursor-pointer text-slate-500' href="/"><AiFillGithub style={{ fontSize: 25 }} /></a>
                            <a className='cursor-pointer text-slate-500' href="/"><FaDiscord style={{ fontSize: 25 }} /></a>
                        </div>

                        <div className="flex flex-col items-center gap-2 w-full">

                            {
                                followStatus ?
                                    <div className='flex gap-2 w-full md:w-[75%] lg:w-[50%] xl:w-[40%]'>

                                        <button onClick={handleFollowUnfollow} className='flex w-full justify-center bg-white py-1.5 lg:py-2 hover:bg-slate-100 duration-200 font-semibold rounded-md text-lg'>
                                            Unfollow
                                        </button>

                                        <button className='flex gap-1 w-max px-4 items-center bg-white py-1.5 lg:py-2 hover:bg-slate-100 duration-200 font-semibold rounded-md text-lg'>
                                            <MessageIcon />
                                        </button>

                                    </div>
                                    :
                                    <button onClick={handleFollowUnfollow} className='flex w-full md:w-[75%] lg:w-[50%] xl:w-[40%] justify-center bg-[#8948B8] text-white py-1.5 lg:py-2 hover:bg-[#8E2BC2] duration-200 font-semibold rounded-md text-lg'>
                                        Follow
                                    </button>
                            }

                        </div>

                        <div className='flex text-slate-400 border-y-2 border-slate-400 py-1 my-7 w-full md:w-[75%] lg:w-[50%] xl:w-[40%] justify-center cursor-default'>

                            <WidgetsIcon />
                            <div>POST</div>

                        </div>

                        <div className='w-full md:w-[80%] lg:w-[50%] xl:w-[40%] duration-300 flex flex-col gap-7 mx-auto'>

                            <InfiniteScroll
                                dataLength={post.length}
                                next={fetchMoreData}
                                hasMore={post.length < Number(totalData)}
                                className='flex flex-col'
                                scrollableTarget="scrollableDivUserProfile"
                            >

                                {
                                    post.length ?
                                        post?.map((data) => {
                                            return (
                                                <Post key={data._id} data={data} />
                                            )
                                        })
                                        :
                                        <div className='flex w-full justify-center'><CircularProgress className='text-black dark:text-white' /></div>
                                }

                            </InfiniteScroll>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
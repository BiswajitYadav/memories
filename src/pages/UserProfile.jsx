import { CircularProgress, Modal, Tooltip } from '@mui/material'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Post from '../components/Home/Post'
import VerifiedIcon from '@mui/icons-material/Verified';
import { AiFillYoutube, AiFillInstagram, AiFillGithub } from 'react-icons/ai'
import { FaDiscord } from 'react-icons/fa'
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import { SERVER_URL } from '../services/helper'
import { useContext } from 'react'
import MainContext from '../context/MainContext'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import staticAvatar from '../assets/image/sample-profile.webp'
import PeopleProfile from '../components/PeopleProfile'
import PostLoader from './../components/Loader/PostLoader';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const UserProfile = () => {

    const { otherUserProfile, fetchAnotherUserProfile, partner, setNotification } = useContext(MainContext)

    const { name, bio, userName, profileURL } = otherUserProfile;

    const sessionUserID = sessionStorage.getItem("sessionUserID")

    const authToken = localStorage.getItem('auth-token')

    const params = useParams()
    const { userID } = params;

    const navigate = useNavigate()

    const [followersModalOpen, setFollowersModalOpen] = useState(false);
    const handlefollowersModalOpen = () => setFollowersModalOpen(true);
    const handlefollowersModalClosed = () => setFollowersModalOpen(false);

    const [followingsModalOpen, setFollowingsModalOpen] = useState(false);
    const handlefollowingsModalOpen = () => setFollowingsModalOpen(true);
    const handlefollowingsModalClosed = () => setFollowingsModalOpen(false);


    // handle chat

    const handleFetchChat = async () => {

        const response = await fetch(`${SERVER_URL}chat/fetch-chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ userID })
        })

        const json = await response.json()

        if (json.success) {
            navigate(`/chat/${json.chatData._id}`, { state: { data: otherUserProfile, chatData: json.chatData } })
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
    }, [userID])

    // -------------


    useEffect(() => {
        setPost([])
        fetchAnotherUserProfile(userID)
    }, [userID])

    const [postLoading, setPostLoading] = useState(true)

    const pageLimit = 5

    const [post, setPost] = useState([]);

    const [totalData, setTotalData] = useState(0)

    const fetchData = async (isNewUser) => {

        let pageNo = Math.ceil(post.length / pageLimit) + 1;

        // if (isNewUser) {

        //     setPost([])
        //     setTotalData(0)
        //     setPostLoading(true)

        // }

        await fetch(`${SERVER_URL}post/fetch-user-post/${userID}/${isNewUser ? 1 : pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
            .then(res =>
                res.json()
            )
            .then((newData) => {

                setPostLoading(false)

                isNewUser ? setPost(newData.usersPost) : setPost([...post, ...newData.usersPost])

                setTotalData(newData.usersPostLength)

            })
            .catch((err) => console.error(err));

    };

    useEffect(() => {

        fetchData(true)

    }, [userID])

    const fetchMoreData = () => {
        fetchData()
    }


    // followers API calls

    const pageLimitFollowers = 5

    const [followersData, setFollowersData] = useState([])

    const [totalFollowersData, setTotalFollowersData] = useState(0)

    const fetchAllFollowers = async (refreshData) => {

        let pageNo = Math.ceil(followersData.length / pageLimitFollowers) + 1;

        fetch(`${SERVER_URL}follow/fetch-followers/${refreshData ? 1 : pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "userID": userID })
        })
            .then(res => res.json())
            .then((newData) => {
                refreshData ? setFollowersData(newData.userFollowers) : setFollowersData([...followersData, ...newData.userFollowers])
                setTotalFollowersData(newData.userFollowersTotal)
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {

        if (userID) {
            fetchAllFollowers(true)
            setFollowersModalOpen(false)
            setFollowingsModalOpen(false)
        }

    }, [userID])

    const fetchMoreFollowerData = () => {
        fetchAllFollowers()
    }

    // ------------------


    // Following API Calls

    const pageLimitFollowing = 5

    const [followingData, setFollowingData] = useState([])

    const [totalFollowingData, setTotalFollowingData] = useState(0)

    const fetchAllFollowing = async (refreshData) => {

        let pageNo = Math.ceil(followingData.length / pageLimitFollowing) + 1;

        fetch(`${SERVER_URL}follow/fetch-following/${refreshData ? 1 : pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "userID": userID })
        })
            .then(res => res.json())
            .then((newData) => {
                refreshData ? setFollowingData(newData.userFollowing) : setFollowingData([...followingData, ...newData.userFollowing])
                setTotalFollowingData(newData.userFollowingTotal)
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        if (userID) {
            fetchAllFollowing(true)
        }
    }, [userID])

    const fetchMoreFollowingData = () => {
        fetchAllFollowing()
    }

    // -------------------


    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-full'>

                <Header />

                <div id='scrollableDivUserProfile' className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-full overflow-y-auto flex flex-col gap-x-5'>

                    <div className='w-full h-full flex items-center flex-col px-2 py-5'>

                        <div className='flex gap-6 lg:gap-8 xl:gap-6 py-3 xl:py-5'>
                            <img className='w-24 h-24 md:h-32 md:w-32 xl:h-40 xl:w-40 select-none rounded-full overflow-hidden object-cover' src={profileURL ? profileURL : staticAvatar} alt="Profile Picture" />
                            <div className='gap-4 md:gap-5 select-none'>
                                <div className='flex gap-1 dark:text-white'>
                                    <div className='font-bold text-lg sm:text-xl xl:text-2xl'>{name}</div>

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

                                <div className=' dark:text-slate-200 text-slate-600 text-sm sm:text-sm font-semibold'>@{userName}</div>

                                <div className='font-semibold text-sm py-2 lg:py-3 text-gray-400'>{partner?.verificationText}</div>

                                <div className='hidden md:flex gap-x-4 lg:gap-x-8 dark:text-white'>

                                    <div className='flex items-baseline gap-1'><span className='font-bold flex justify-center text-lg'>{totalData ? totalData : "N/A"}</span><span className='text-xs'>posts</span></div>

                                    <button onClick={handlefollowersModalOpen} className='flex items-baseline gap-1'>
                                        <span className='font-bold flex justify-center text-lg'>{totalFollowersData}</span>
                                        <span className='text-xs'>followers</span>
                                    </button>

                                    <button onClick={handlefollowingsModalOpen} className='flex items-baseline gap-1'>
                                        <span className='font-extrabold flex justify-center text-lg'>{totalFollowingData}</span>
                                        <span className='text-xs'>followings</span>
                                    </button>

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

                            <button onClick={handlefollowersModalOpen} className='flex flex-col items-center'>
                                <span className='font-bold flex justify-center text-lg'>{totalFollowersData}</span>
                                <span className='text-xs'>followers</span>
                            </button>

                            <Modal
                                open={followersModalOpen}
                                onClose={handlefollowersModalClosed}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className="flex justify-center items-center"
                            >
                                <div className='py-3 px-2 md:px-3 md:p-4 h-max md:w-[70%] lg:px-5 lg:py-2 bg-white w-[90%] dark:bg-[#231344] lg:w-[40%] rounded-lg'>
                                    <div className='bg-white dark:bg-[#231344]'>

                                        <div className='flex justify-between dark:text-white px-3'>
                                            <div className='flex items-center gap-1 py-3 lg:py-5'>
                                                <div className='text-lg font-semibold dark:text-gray-300 text-gray-600'>Followers</div>
                                                <div className='text-lg font-semibold dark:text-gray-300 text-gray-600'>{totalFollowersData}</div>
                                            </div>
                                            <button>
                                                <CloseIcon onClick={handlefollowersModalClosed} />
                                            </button>
                                        </div>

                                        <div id='scrollableDivFollower' className='flex flex-col overflow-y-auto h-[30vh] md:h-[35vh] scroll-smooth '>

                                            <InfiniteScroll
                                                dataLength={followersData.length}
                                                next={fetchMoreFollowerData}
                                                hasMore={followersData.length < Number(totalFollowersData)}
                                                className='flex flex-col w-full duration-300 transition-all'
                                                scrollableTarget="scrollableDivFollower"
                                            >

                                                {
                                                    followersData?.map((data) => {
                                                        return (
                                                            <PeopleProfile key={data._id} userID={data.userID} />
                                                        )
                                                    })
                                                }

                                            </InfiniteScroll>

                                        </div>

                                    </div>
                                </div>
                            </Modal>

                            <button onClick={handlefollowingsModalOpen} className='flex items-center flex-col'>
                                <span className='font-extrabold flex justify-center text-lg'>{totalFollowingData}</span>
                                <span className='text-xs'>followings</span>
                            </button>

                            <Modal
                                open={followingsModalOpen}
                                onClose={handlefollowingsModalClosed}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                className="flex justify-center items-center"
                            >
                                <div className='py-3 px-2 md:px-3 md:p-4 h-max md:w-[70%] lg:px-5 lg:py-2 bg-white w-[90%] dark:bg-[#231344] lg:w-[40%] rounded-lg'>
                                    <div className='bg-white dark:bg-[#231344]'>
                                        <div className='flex justify-between dark:text-white px-3'>
                                            <div className='flex items-center gap-1 py-3 lg:py-5'>
                                                <div className='text-lg font-semibold dark:text-gray-300 text-gray-600'>Followings</div>
                                                <div className='text-lg font-semibold dark:text-gray-300 text-gray-600'>{totalFollowingData}</div>
                                            </div>
                                            <button>
                                                <CloseIcon onClick={handlefollowingsModalClosed} />
                                            </button>
                                        </div>

                                        <div id='scrollableDivFollowing' className='flex flex-col overflow-y-auto h-[35vh] scroll-smooth'>

                                            <InfiniteScroll
                                                dataLength={followingData.length}
                                                next={fetchMoreFollowingData}
                                                hasMore={followingData.length < Number(totalFollowingData)}
                                                className='flex flex-col w-full duration-300 transition-all'
                                                scrollableTarget="scrollableDivFollowing"
                                            >

                                                {
                                                    followingData?.map((data) => {
                                                        return (
                                                            <PeopleProfile key={data._id} userID={data.following} />
                                                        )
                                                    })
                                                }

                                            </InfiniteScroll>

                                        </div>
                                    </div>
                                </div>
                            </Modal>

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

                            {sessionUserID !== userID ?
                                followStatus ?
                                    <div className='flex gap-2 w-full md:w-[75%] lg:w-[50%] xl:w-[40%]'>

                                        <button onClick={handleFollowUnfollow} className='flex w-full justify-center bg-white py-1.5 lg:py-2 hover:bg-slate-100 duration-200 font-semibold rounded-md text-lg'>
                                            Unfollow
                                        </button>

                                        <button onClick={handleFetchChat} className='flex gap-1 w-max px-4 items-center bg-white py-1.5 lg:py-2 hover:bg-slate-100 duration-200 font-semibold rounded-md text-lg'>
                                            <MessageIcon />
                                        </button>

                                    </div>
                                    :
                                    <button onClick={handleFollowUnfollow} className='flex w-full md:w-[75%] lg:w-[50%] xl:w-[40%] justify-center bg-[#8948B8] text-white py-1.5 lg:py-2 hover:bg-[#8E2BC2] duration-200 font-semibold rounded-md text-lg'>
                                        Follow
                                    </button>
                                : null
                            }

                        </div>

                        <div className='flex text-slate-400 border-y-2 border-slate-400 py-1 my-7 w-full md:w-[75%] lg:w-[50%] xl:w-[40%] justify-center cursor-default'>

                            <WidgetsIcon />
                            <div>POST</div>

                        </div>

                        <div className='w-full md:w-[80%] lg:w-[50%] xl:w-[40%] duration-300 flex flex-col gap-7 mx-auto'>

                            {
                                postLoading ?

                                    <PostLoader />

                                    :
                                    !postLoading && post.length < 1 ?

                                        <div className='w-full flex flex-col gap-5 p-10 h-max items-center opacity-70'>

                                            <div className='outline outline-2 outline-slate-400 text-slate-400 rounded-full p-4'>
                                                <CameraAltIcon fontSize='medium' />
                                            </div>

                                            <div className='font-bold text-lg text-slate-400'>No Posts Yet</div>

                                        </div>

                                        :
                                        <InfiniteScroll
                                            dataLength={post.length}
                                            next={fetchMoreData}
                                            hasMore={post.length < Number(totalData)}
                                            className='flex flex-col'
                                            scrollableTarget="scrollableDivUserProfile"
                                        >

                                            {
                                                post?.map((data) => {
                                                    return (
                                                        <Post key={data._id} data={data} />
                                                    )
                                                })
                                            }

                                        </InfiniteScroll>
                            }

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
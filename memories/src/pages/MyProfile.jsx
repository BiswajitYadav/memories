import { Avatar, Modal, Tooltip } from '@mui/material';
import React from 'react'
import Header from './../components/Header';
import VerifiedIcon from '@mui/icons-material/Verified';
import { AiFillYoutube, AiFillInstagram, AiFillGithub } from 'react-icons/ai'
import { FaDiscord } from 'react-icons/fa'
import WidgetsIcon from '@mui/icons-material/Widgets';
import MyPost from '../components/MyPost';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Followings from '../components/Followings';
import { useContext } from 'react';
import MainContext from '../context/MainContext';
import staticAvatar from '../assets/image/sample-profile.webp'
import { useEffect } from 'react';
import { SERVER_URL } from '../services/helper';
import CreatePost from '../components/Home/CreatePost';
import InfiniteScroll from 'react-infinite-scroll-component';
import PeopleProfile from '../components/PeopleProfile';


const MyProfile = () => {

    const authToken = localStorage.getItem('auth-token')

    const context = useContext(MainContext)
    const { userProfileData, fetchSessionUserProfile, post, setPost } = context;

    const { _id, name, email, profileURL, gender, userName, bio } = userProfileData;

    const [followersModalOpen, setFollowersModalOpen] = useState(false);
    const handlefollowersModalOpen = () => setFollowersModalOpen(true);
    const handlefollowersModalClosed = () => setFollowersModalOpen(false);

    const [followingsModalOpen, setFollowingsModalOpen] = useState(false);
    const handlefollowingsModalOpen = () => setFollowingsModalOpen(true);
    const handlefollowingsModalClosed = () => setFollowingsModalOpen(false);

    useEffect(() => {
        fetchSessionUserProfile()
    }, [])


    const pageLimit = 5

    const [totalData, setTotalData] = useState(0)

    const fetchData = () => {

        let pageNo = Math.ceil(post.length / pageLimit) + 1;

        fetch(`${SERVER_URL}post/fetch-my-post/${pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
            .then(res => res.json())
            .then((newData) => {
                const mergeData = [...post, ...newData.myPost]
                setPost(mergeData)
                setTotalData(newData.myPostLength)
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchData()
    }, [])

    const fetchMoreData = () => {
        fetchData()
    }

    // followers API calls

    const pageLimitFollowers = 5

    const [followersData, setFollowersData] = useState([])

    const [totalFollowersData, setTotalFollowersData] = useState(0)

    const fetchAllFollowers = async () => {

        let pageNo = Math.ceil(followersData.length / pageLimitFollowers) + 1;

        fetch(`${SERVER_URL}follow/fetch-followers/${pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "userID": _id })
        })
            .then(res => res.json())
            .then((newData) => {
                const mergeData = [...followersData, ...newData.userFollowers]
                setFollowersData(mergeData)
                setTotalFollowersData(newData.userFollowersTotal)
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {

        if (_id) {
            fetchAllFollowers()
        }

    }, [_id])

    const fetchMoreFollowerData = () => {
        fetchAllFollowers()
    }

    // ------------------


    // Following API Calls

    const pageLimitFollowing = 5

    const [followingData, setFollowingData] = useState([])

    const [totalFollowingData, setTotalFollowingData] = useState(0)

    const fetchAllFollowing = async () => {

        let pageNo = Math.ceil(followingData.length / pageLimitFollowing) + 1;

        fetch(`${SERVER_URL}follow/fetch-following/${pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "userID": _id })
        })
            .then(res => res.json())
            .then((newData) => {
                console.log(newData)
                const mergeData = [...followingData, ...newData.userFollowing]
                setFollowingData(mergeData)
                setTotalFollowingData(newData.userFollowingTotal)
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        if (_id) {
            fetchAllFollowing()
        }
    }, [_id])

    const fetchMoreFollowingData = () => {

        fetchAllFollowing()

    }

    // -------------------


    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>
                <Header />
                <div id='scrollableDivUserProfile' className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-screen overflow-y-auto flex flex-col gap-x-5'>
                    <div className='w-full h-max flex items-center flex-col px-2 py-5'>

                        <div className='bg-white dark:bg-[#231344] w-full md:w-[75%] lg:w-[60%] xl:w-[40%] flex gap-6 lg:gap-8 xl:gap-6 rounded-t-md lg:rounded-md shadow-md p-3 xl:p-5'>
                            <img className='w-24 h-24 md:h-32 md:w-32 xl:h-40 xl:w-40 select-none rounded-full overflow-hidden object-cover' src={profileURL ? profileURL : staticAvatar} alt="Profile Picture" />
                            <div className='gap-4 md:gap-5 select-none'>

                                <div className='flex gap-1 dark:text-white'>

                                    <div className='font-bold text-lg sm:text-xl xl:text-2xl'>{name}</div>

                                    <Tooltip title="Developer" className="text-gray-400 my-auto">
                                        <VerifiedIcon style={{ fontSize: 16 }} />
                                    </Tooltip>

                                    <Link to="/editprofile">
                                        <button className='hidden lg:block text-sm ml-4 py-1 px-3 rounded-md shadow-md hover:scale-105 duration-300 bg-slate-100 text-black
                                    dark:bg-white/90 dark:hover:bg-white'>Edit Profile</button>
                                    </Link>

                                </div>

                                <div className=' dark:text-slate-200 text-slate-600 text-sm sm:text-sm font-semibold'>@{userName}</div>

                                <div className='font-semibold text-sm py-2 lg:py-3 text-gray-400'>Developer</div>

                                <div className='hidden md:flex gap-x-4 lg:gap-x-8 dark:text-white'>

                                    <div className='flex items-baseline gap-1'>
                                        <span className='font-bold flex justify-center text-lg'>{totalData ? totalData : "N/A"}</span>
                                        <span className='text-xs'>posts</span>
                                    </div>

                                    <button onClick={handlefollowersModalOpen} className='flex items-baseline gap-1'>
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

                                                <div id='scrollableDivFollower' className='flex flex-col overflow-y-auto h-[35vh] scroll-smooth '>

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

                                    <button onClick={handlefollowingsModalOpen} className='flex items-baseline gap-1'>
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

                                <div className='py-3 hidden md:block dark:text-white whitespace-pre-wrap'>

                                    {bio}

                                </div>

                                <div className='hidden md:flex gap-5'>

                                    <a className='cursor-pointer text-slate-500 hover:text-red-500 duration-200' target="_blank" href="/"><AiFillYoutube style={{ fontSize: 30 }} /></a>

                                    <a className='cursor-pointer text-slate-500 hover:text-pink-600 duration-200' target="_blank" href="/"><AiFillInstagram style={{ fontSize: 30 }} /></a>

                                    <a className='cursor-pointer text-slate-500 hover:text-violet-600 duration-200' target="_blank" href="/"><AiFillGithub style={{ fontSize: 30 }} /></a>

                                    <a className='cursor-pointer text-slate-500 hover:text-sky-600 duration-200' target="_blank" href="/"><FaDiscord style={{ fontSize: 30 }} /></a>

                                </div>

                            </div>
                        </div>

                        {/* profile page for small devices */}
                        <div className='w-full bg-white dark:bg-[#231344] gap-6 rounded-b-md shadow-md'>

                            <div className='flex md:hidden px-2 w-full justify-around py-3 text-xs dark:text-white'>

                                <div>
                                    <span className='font-extrabold flex justify-center text-lg'>{totalData ? totalData : "N/A"}</span>
                                    posts</div>

                                <button onClick={handlefollowersModalOpen}>
                                    <span className='font-extrabold flex justify-center text-lg'>{totalFollowersData}</span>
                                    followers</button>

                                <button onClick={handlefollowingsModalOpen}>
                                    <span className='font-extrabold flex justify-center text-lg'>{totalFollowingData}</span>
                                    followings</button>

                            </div>

                            <div className='py-1 px-2 md:hidden dark:text-white whitespace-pre-wrap flex justify-center flex-wrap'>
                                {bio}
                            </div>

                            <div className='flex md:hidden gap-7 py-3 justify-center'>
                                <a className='cursor-pointer text-red-600' href="/"><AiFillYoutube style={{ fontSize: 25 }} /></a>
                                <a className='cursor-pointer text-pink-700' href="/"><AiFillInstagram style={{ fontSize: 25 }} /></a>
                                <a className='cursor-pointer text-purple-600' href="/"><AiFillGithub style={{ fontSize: 25 }} /></a>
                                <a className='cursor-pointer text-sky-500' href="/"><FaDiscord style={{ fontSize: 25 }} /></a>
                            </div>
                            
                        </div>

                        <div className='flex text-slate-400 border-y-2 border-slate-400 py-1 my-5 w-full md:w-[75%] lg:w-[60%] xl:w-[40%] justify-center cursor-default'>
                            <WidgetsIcon /><div>POST</div>
                        </div>

                        <div className='flex flex-col gap-4 mt-5 w-full md:w-[75%] lg:w-[60%] xl:w-[40%] items-center '>

                            <InfiniteScroll
                                dataLength={post.length}
                                next={fetchMoreData}
                                hasMore={post.length < Number(totalData)}
                                className='flex flex-col gap-4 w-full duration-300 transition-all'
                                scrollableTarget="scrollableDivUserProfile"
                            >

                                {
                                    post?.map((data) => {
                                        return (
                                            <MyPost key={data._id} data={data} postID={data._id} />
                                        )
                                    })
                                }


                            </InfiniteScroll>


                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default MyProfile
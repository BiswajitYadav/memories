import { Avatar, Tooltip } from '@mui/material';
import React from 'react'
import Header from './../components/Header';
import VerifiedIcon from '@mui/icons-material/Verified';
import { AiFillYoutube, AiFillInstagram, AiFillGithub } from 'react-icons/ai'
import { FaDiscord } from 'react-icons/fa'
import WidgetsIcon from '@mui/icons-material/Widgets';
import MyPost from '../components/MyPost';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>
                <Header />
                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-screen overflow-y-auto flex flex-col gap-x-5'>
                    <div className='w-full h-max overflow-y-auto flex items-center flex-col px-2 py-5'>
                        <div className='bg-white dark:bg-[#231344] w-full md:w-[75%] lg:w-[60%] xl:w-[40%] flex gap-6 lg:gap-8 xl:gap-6 rounded-t-md lg:rounded-md shadow-md p-3 xl:p-5'>
                            <img className='w-24 h-24 md:h-32 md:w-32 xl:h-40 xl:w-40 select-none rounded-full overflow-hidden object-cover' src="https://i.ytimg.com/vi/oxCAPWBNJag/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBUgcigRMA8=&rs=AOn4CLBq6UUnvf2-ImYSgPwsIz8BJOcN6A" alt="Profile Picture" />
                            <div className='gap-4 md:gap-5 select-none'>
                                <div className='flex gap-1 dark:text-white'>
                                    <div className='font-bold text-lg sm:text-xl xl:text-2xl'>Rohit Kumar Pandit</div>
                                    <Tooltip title="Developer" className="text-gray-400 my-auto">
                                        <VerifiedIcon style={{ fontSize: 16 }} />
                                    </Tooltip>
                                    <Link to="/editprofile">
                                        <button className='hidden lg:block text-sm ml-4 py-1 px-3 rounded-md shadow-md hover:scale-105 duration-300 bg-slate-100 text-black
                                    dark:bg-white/90 dark:hover:bg-white'>Edit Profile</button>
                                    </Link>
                                </div>
                                <div className=' dark:text-slate-200 text-slate-600 text-sm sm:text-sm font-semibold'>@Rohit64Bit</div>
                                <div className='font-semibold text-sm py-2 lg:py-3 text-gray-400'>Developer</div>
                                <div className='hidden md:flex gap-x-4 lg:gap-x-8 dark:text-white'>
                                    <div className='flex items-baseline gap-1'><span className='font-bold flex justify-center text-lg'>10</span><span className='text-xs'>posts</span></div>
                                    <div className='flex items-baseline gap-1'><span className='font-bold flex justify-center text-lg'>10</span><span className='text-xs'>followers</span></div>
                                    <div className='flex items-baseline gap-1'><span className='font-extrabold flex justify-center text-lg'>10</span><span className='text-xs'>followings</span></div>
                                </div>
                                <div className='py-3 hidden md:block dark:text-white whitespace-pre-wrap'>
                                    Bio of the person
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
                                <div><span className='font-extrabold flex justify-center text-lg'>10</span> posts</div>
                                <div><span className='font-extrabold flex justify-center text-lg'>10</span> followers</div>
                                <div><span className='font-extrabold flex justify-center text-lg'>10</span> followings</div>
                            </div>
                            <div className='py-1 md:hidden dark:text-white flex justify-center flex-wrap'>
                                This is the bio of the person
                            </div>
                            <div className='flex md:hidden gap-7 py-3 justify-center'>
                                <a className='cursor-pointer text-red-600' href="/"><AiFillYoutube style={{ fontSize: 25 }} /></a>
                                <a className='cursor-pointer text-pink-700' href="/"><AiFillInstagram style={{ fontSize: 25 }} /></a>
                                <a className='cursor-pointer text-purple-600' href="/"><AiFillGithub style={{ fontSize: 25 }} /></a>
                                <a className='cursor-pointer text-sky-500' href="/"><FaDiscord style={{ fontSize: 25 }} /></a>
                            </div>
                        </div>
                        <div className='flex text-slate-400 border-y-2 border-slate-400 py-1 my-5 w-full md:w-[75%] lg:w-[60%] xl:w-[40%] justify-center cursor-default '>
                            <WidgetsIcon /><div>POST</div>
                        </div>
                        <div className='flex flex-col gap-4 w-full items-center'>
                            <MyPost />
                            <MyPost />
                            <MyPost />
                            <MyPost />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile
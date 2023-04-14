import React from 'react'
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Report from '../components/Home/Report';
import RecentUser from '../components/Home/RecentUser';

const Home = () => {
    return (
        <>
            <div className='h-full w-full px-20'>
                <div className='w-full h-[25%] flex justify-around items-center'>
                    <div className='flex items-center gap-4 bg-white h-max px-12 py-5 shadow-xl rounded-lg text-[#1C1132] hover:bg-[#1C1132] hover:text-white duration-300 cursor-pointer border'>
                        <GroupIcon className='' style={{ fontSize: 50 }} />
                        <div className='flex flex-col'>
                            <div className='text-2xl font-semibold -my-1'>1765780</div>
                            <div className='-my-1 text-sm'>users</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 bg-white h-max px-12 py-5 shadow-xl rounded-lg text-[#1C1132] hover:bg-[#1C1132] hover:text-white duration-300 cursor-pointer border'>
                        <ArticleIcon className='' style={{ fontSize: 50 }} />
                        <div className='flex flex-col'>
                            <div className='text-2xl font-semibold -my-1'>1765780</div>
                            <div className='-my-1 text-sm'>posts</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 bg-white h-max px-12 py-5 shadow-xl rounded-lg  text-[rgb(28,17,50)] hover:bg-[#1C1132] hover:text-white duration-300 cursor-pointer border'>
                        <RemoveRedEyeIcon className='' style={{ fontSize: 50 }} />
                        <div className='flex flex-col'>
                            <div className='text-2xl font-semibold -my-1'>1765780</div>
                            <div className='-my-1 text-sm'>visits</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 bg-white h-max px-12 py-5 shadow-xl rounded-lg text-[#1C1132] hover:bg-[#1C1132] hover:text-white duration-300 cursor-pointer border'>
                        <TouchAppIcon className='' style={{ fontSize: 50 }} />
                        <div className='flex flex-col'>
                            <div className='text-2xl font-semibold -my-1'>1765780</div>
                            <div className='-my-1 text-sm'>engagement</div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-[75%] flex justify-around px-3'>
                    <div className='w-[60%] pb-10 '>
                        <div className='shadow-xl h-full rounded-lg border px-2'>
                            <div className='flex justify-between px-6 py-3 rounded-t-lg'>
                                <div className='font-semibold text-lg'>Recent Reports</div>
                                <button className='font-semibold text-lg bg-[#1C1132] text-white px-6'>View All</button>
                            </div>
                            <div className='flex flex-col gap-3 px-3 overflow-y-auto h-[53vh]'>
                                <Report />
                                <Report />
                                <Report />
                                <Report />
                                <Report />
                                <Report />
                                <Report />
                                <Report />
                            </div>
                        </div>
                    </div>
                    <div className='w-[35%] pb-10'>
                        <div className='shadow-xl h-full border rounded-lg px-2'>
                            <div className='flex justify-between px-6 py-3 rounded-t-lg'>
                                <div className='font-semibold text-lg'>Recent Users</div>
                                <button className='font-semibold text-lg bg-[#1C1132] text-white px-6'>View All</button>
                            </div>
                            <div className='flex flex-col gap-3 px-3 overflow-y-auto h-[53vh]'>
                                <RecentUser />
                                <RecentUser />
                                <RecentUser />
                                <RecentUser />
                                <RecentUser />
                                <RecentUser />
                                <RecentUser />
                                <RecentUser />
                                <RecentUser />
                                <RecentUser />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
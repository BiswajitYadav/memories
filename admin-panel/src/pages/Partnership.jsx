import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Report from '../components/Home/Report';
import RecentUser from '../components/Home/RecentUser';
import Partners from '../components/Partnership/Partners';
import Applications from '../components/Partnership/Applications';


const Partnership = () => {
    return (
        <>
        <div className='w-full h-full px-20 '>
            <div className='h-[20%] w-full flex items-center gap-10 px-5'>
                <form className='rounded-lg flex items-center p-2 w-[70%] border shadow-xl'>
                    <input className='px-3 bg-transparent w-full focus:outline-none' type="text" placeholder='Search partners by email...' />
                    <button className='text-white bg-[#1C1132] sm:px-3 sm:py-1 rounded-lg hover:scale-105 duration-300 '>
                        <SearchIcon style={{ fontSize: 35 }} />
                    </button>
                </form>
                <div className='rounded-lg flex items-center p-2 w-[25%] border shadow-xl gap-3 justify-center cursor-default hover:bg-[#1C1132] hover:text-white duration-300'>
                    <HandshakeIcon style={{ fontSize: 40 }} />
                    <div className='text-2xl font-semibold'>246</div>
                </div>
            </div>
            <div className='w-full h-[75%] flex justify-around pr-7 px-2'>
                    <div className='w-[65%] pb-10 '>
                        <div className='shadow-xl h-full rounded-lg border px-2'>
                            <div className='flex justify-between px-6 py-3 rounded-t-lg'>
                                <div className='font-semibold text-lg'>Partners</div>
                                <button className='font-semibold text-lg bg-[#1C1132] text-white px-6'>View All</button>
                            </div>
                            <div className='flex flex-col gap-3 px-3 overflow-y-auto h-[53vh]'>
                                <Partners />
                                <Partners />
                                <Partners />
                                <Partners />
                                <Partners />
                                <Partners />
                                <Partners />
                                <Partners />
                                <Partners />
                                <Partners />
                            </div>
                        </div>
                    </div>
                    <div className='w-[32%] pb-10'>
                        <div className='shadow-xl h-full border rounded-lg px-2'>
                            <div className='flex justify-between px-6 py-3 rounded-t-lg'>
                                <div className='font-semibold text-lg'>Applications</div>
                            </div>
                            <div className='flex flex-col gap-3 px-3 overflow-y-auto h-[53vh]'>
                                <Applications />
                                <Applications />
                                <Applications />
                                <Applications />
                                <Applications />
                                <Applications />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </>
    )
}

export default Partnership
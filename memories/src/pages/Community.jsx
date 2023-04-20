import React from 'react'
import Header from '../components/Header'
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Tooltip } from '@mui/material';

const Suggestion = (props) => {
    return (
        <>
            <div className='flex w-full justify-between'>
                <div className='flex gap-2'>
                    <img className='my-auto w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " />

                    <div className='flex flex-col justify-center'>
                        <div className='flex gap-1'>
                            <div className='dark:text-white font-semibold text-sm lg:text-lg'>Rohit Kumar Pandit</div>
                            <Tooltip title="Developer" className="text-gray-400 my-auto">
                                <VerifiedIcon style={{ fontSize: 16 }} />
                            </Tooltip>
                            {/* <Tooltip title="Developer" className="text-blue-400 my-auto">
              <VerifiedIcon style={{ fontSize: 16 }} />
            </Tooltip>
            <Tooltip title="Developer" className="text-yellow-400 my-auto">
              <VerifiedIcon style={{ fontSize: 16 }} />
            </Tooltip> */}
                        </div>
                        <div className=' text-slate-400 text-xs md:text-xs lg:text-sm'>@rohit64Bit</div>
                    </div>
                </div>
                <Tooltip title="Follow">
                    <button className='h-max bg-gradient-to-r from-[#8948B8] to-[#8E2BC2] my-auto px-3 py-1 text-white md:px-6 lg:px-10 rounded lg:text-lg'>Follow</button>
                </Tooltip>
            </div>
        </>
    )
}


const Community = () => {
    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>
                <Header />
                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-screen flex justify-between gap-x-5 py-4 px-2 sm:px-5 md:px-16'>
                    <div className='bg-white dark:bg-[#231344] rounded-xl w-full flex items-center py-3 md:py-6 flex-col gap-3 md:gap-4 shadow-lg'>
                        <div className='bg-[#FFFFFF] dark:bg-[#1C1132] rounded w-[95%] sm:w-[85%] md:w-[80%] lg:w-[60%] flex flex-col gap-4'>
                            <form className='bg-[#F1F1F1] dark:bg-[#1C1132] rounded flex items-center p-2 w-full h-max border-[2px] border-[#D9D9D9] dark:border-[#33215A]'>
                                <input className='px-3 md:px-5 bg-transparent w-full focus:outline-none dark:text-white lg:py-1 xl:py-2 xl:text-lg' type="search" placeholder='Search the community...' />
                                {/* <button className='hidden md:block text-white bg-[#9013C9] sm:px-3 sm:py-1 rounded hover:scale-105 duration-300 '>
                                <SearchIcon style={{ fontSize: 35 }} />
                            </button> */}
                            </form>

                            <div className='bg-[#F1F1F1] dark:bg-[#1C1132] rounded border-[2px] border-[#D9D9D9] dark:border-[#33215A] w-full p-0.5 md:p-3 h-max'>
                                <div className=' overflow-y-auto flex flex-col gap-10 md:gap-7 xl:gap-10 h-[73vh] md:h-[63vh] xl:h-[66vh] p-2 py-7 sm:p-2 lg:px-4'>
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                    <Suggestion />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Community
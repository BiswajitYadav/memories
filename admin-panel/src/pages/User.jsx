import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import UserComponent from '../components/Users/UserComponent';


const User = () => {
    return (
        <>
            <div className='w-full h-full px-20 '>
                <div className='h-[20%] w-full flex items-center gap-10 px-5'>
                    <form className='rounded-lg flex items-center p-2 w-[60%] border shadow-xl'>
                        <input className='px-3 bg-transparent w-full focus:outline-none' type="text" placeholder='Search users by email...' />
                        <button className='text-white bg-[#1C1132] sm:px-3 sm:py-1 rounded-lg hover:scale-105 duration-300 '>
                            <SearchIcon style={{ fontSize: 35 }} />
                        </button>
                    </form>
                    <div className='rounded-lg flex items-center p-2 w-[35%] border shadow-xl gap-3 justify-center cursor-default hover:bg-[#1C1132] hover:text-white duration-300'>
                        <GroupIcon style={{ fontSize: 40 }} />
                        <div className='text-2xl font-semibold'>349875345</div>
                    </div>
                </div>
                <div className='h-[80%] w-full px-5 pr-10'>
                    <div className='h-[65vh] shadow-xl border rounded-lg px-3'>
                        <div className='flex justify-between px-7 py-4 rounded-t-lg'>
                            <div className='font-semibold text-lg'>Users</div>
                            <button className='font-semibold text-lg bg-[#1C1132] text-white px-7'>View All</button>
                        </div>
                        <div className='flex flex-col gap-3 px-5 overflow-y-auto h-[55vh]'>
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                            <UserComponent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User
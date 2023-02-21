import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../components/Header'
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatSection from '../components/Chat/ChatSection';

const Chat = () => {
  return (
    <>
      <div className='bg-[#D9D9D9] h-screen w-screen'>
        <Header />
        <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-screen overflow-y-auto flex justify-between gap-x-5 py-4 px-2 sm:px-5 md:px-16'>
          <div className='bg-white dark:bg-[#231344] rounded-xl w-full flex items-center py-3 flex-row gap-5 shadow-lg justify-between lg:pr-4'>
            <div className='w-full xl:w-[22%] lg:w-[30%] h-[80vh] flex flex-col overflow-y-auto'>
              <NavLink className={({ isActive }) => (isActive ? 'bg-[#D9D9D9] lg:rounded-r-md lg:rounded-l-none rounded-md dark:bg-[#1C1132]' : '')} to=":chatID">
                <div className='flex flex-col h-max dark:text-white p-5 gap-5 rounded-md'>
                  <div className='flex w-full justify-between'>
                    <div className='flex gap-2'>
                      <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
                      <div className='flex flex-col justify-center'>
                        <div className='flex gap-1 '>
                          <div className='dark:text-white font-semibold text-sm'>Rohit Kumar Pandit</div>
                          <Tooltip title="Developer" className="text-gray-400 my-auto">
                            <VerifiedIcon style={{ fontSize: 16 }} />
                          </Tooltip>
                        </div>
                        <div className=' dark:text-slate-200 text-slate-600 text-sm font-semibold'>A message</div>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className='hidden lg:block lg:w-[70%] xl:w-[78%] h-[80vh]'>
              <ChatSection />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
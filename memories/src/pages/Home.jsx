import { Avatar, Modal, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import Header from '../components/Header'
import CreatePost from '../components/Home/CreatePost'
import PeopleSuggestions from '../components/Home/PeopleSuggestions'
import VerifiedIcon from '@mui/icons-material/Verified';
import Post from '../components/Home/Post'
import { Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import LogoutComponent from '../components/LogoutComponent';


const LogoutComponentHome = () => {

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const handleLogoutModalOpen = () => setLogoutModalOpen(true);
  const handleLogoutModalClosed = () => setLogoutModalOpen(false);
  return (
    <>
      <div className='hidden xl:flex flex-col w-[25%] h-max dark:text-white p-5 gap-5 rounded-md'>
        <div className='flex w-full justify-between'>
          <Link to="/myprofile" className='flex gap-2'>
            <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />

            <div className='flex flex-col justify-center'>
              <div className='flex gap-1'>
                <div className='dark:text-white font-semibold text-sm'>Rohit Kumar Pandit</div>
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
              <div className=' text-slate-500 text-xs'>@rohit64Bit</div>
            </div>
          </Link>
          <Tooltip title="Logout">
            <button onClick={handleLogoutModalOpen} className='h-max text-gray-400 text-sm my-auto px-3 py-1 rounded flex font-semibold'>Logout</button>
          </Tooltip>
          <Modal
            open={logoutModalOpen}
            onClose={handleLogoutModalClosed}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-center items-center"
          >
            <div className='py-3 px-2 md:px-3 md:p-4 h-[60%] md:w-[60%] lg:px-5 lg:py-3 bg-white w-full dark:bg-[#231344] lg:w-[50%] xl:w-[30%] rounded-lg'>
              <div className='bg-white dark:bg-[#231344]'>
                <div className='flex justify-between dark:text-white px-3'>
                  <div className='flex items-center gap-1 py-3 lg:py-5'>
                    <div className='text-lg font-semibold dark:text-gray-300 text-gray-600'>Confirm Logout !</div>
                  </div>
                  <button>
                    <CloseIcon onClick={handleLogoutModalClosed} />
                  </button>
                </div>
                <div className='flex flex-col'>
                  <LogoutComponent />
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}

const Home = () => {
  return (
    <>
      <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-screen'>
        <Header />
        <div className='bg-[#D9D9D9] dark:bg-[#1C1132] overflow-y-auto h-[92vh] w-screen flex justify-between gap-x-5 py-4 px-2 sm:px-5 md:px-16 '>
          <PeopleSuggestions />
          <div className='w-full md:w-[80%] lg:w-[70%] xl:w-[50%] duration-300 flex flex-col gap-4 md:gap-7 mx-auto'>
            <CreatePost />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
          <LogoutComponentHome />
        </div>
      </div>

    </>
  )
}

export default Home
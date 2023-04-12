import React, { useState } from 'react'
import Header from '../components/Header'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Modal, Tooltip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import Like from '../components/Like';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DeleteIcon from '@mui/icons-material/Delete';


const MyPostComment = () => {
  return (
    <>
      <div className='flex gap-2 py-1  md:px-2 w-full'>
        <Avatar className='' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
        <div className='flex flex-col w-full'>
          <div className='flex items-center gap-2 dark:text-white'>
            <Link to="/profile">
              <div className='font-semibold text-sm'>Rohit Kumar Pandit</div>
            </Link>
            <div className='text-xs'>2 days ago</div>
          </div>
          <div className='w-full break-normal dark:text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, molestias tempore infsadfasdgsdgsadga</div>
        </div>
      </div>
    </>
  )
}

const ViewMyPost = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  const [likeModalOpen, setLikeModalOpen] = useState(false);
  const handleLikeModalOpen = () => setLikeModalOpen(true);
  const handleLikeModalClosed = () => setLikeModalOpen(false);

  return (
    <>
      <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>
        <Header />
        <div className='bg-[#D9D9D9] dark:bg-[#1C1132] lg:h-[92vh] w-screen overflow-y-auto flex justify-between py-4 px-2 sm:px-5 md:px-14 lg:px-12 xl:px-16'>
          <div className='bg-white dark:bg-[#231344] rounded-xl w-full flex flex-col lg:flex-row items-center shadow-lg'>

            <div className='h-full w-full rounded-t-xl lg:rounded-none lg:w-[65%] xl:w-[75%] bg-black lg:rounded-l-xl'>
              <div className='px-3 md:px-5 py-2 md:py-3 absolute'>
                <button className='p-2 text-[#D9D9D9] rounded-full duration-200 hover:bg-white hover:shadow-lg hover:outline-2'><ArrowBackIcon /></button>
              </div>
              <div className='p-4'>
                <img className='h-[70vh] lg:h-[80vh] xl:h-[83vh] w-full object-contain rounded-md' src="https://c1.wallpaperflare.com/preview/776/410/395/wallpaper-android-wallpapers-android-backgrounds-lock-screen-background.jpg" alt="Image" />
              </div>
            </div>

            <div className='h-full lg:w-[35%] xl:w-[25%] px-3 py-3 xl:py-6 flex flex-col gap-5 lg:gap-2 xl:gap-4'>
              <div className='flex justify-between items-center'>
                <Link to="/profile" className='flex w-max self-start gap-2'>
                  <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
                  <div className='flex flex-col justify-center'>
                    <div className='flex gap-1'>
                      <div className='dark:text-white font-semibold text-sm'>Rohit Kumar Pandit</div>
                      <Tooltip title="Developer" className="text-gray-400 my-auto">
                        <VerifiedIcon style={{ fontSize: 16 }} />
                      </Tooltip>
                      <Tooltip title="Developer" className="text-blue-400 my-auto">
                        <VerifiedIcon style={{ fontSize: 16 }} />
                      </Tooltip>
                      <Tooltip title="Developer" className="text-yellow-400 my-auto">
                        <VerifiedIcon style={{ fontSize: 16 }} />
                      </Tooltip>
                    </div>
                    <div className=' text-slate-400 text-xs'>@rohit64Bit</div>
                  </div>
                </Link>

                <div>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined} >
                    <Tooltip title="Options" className="text-gray-400 dark:text-white my-auto">
                      <MoreVertIcon />
                    </Tooltip>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <div className='dark:bg-[#231344] rounded-md bg-white dark:text-white -m-2
                         p-1 lg:p-2 duration-300'>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <DeleteIcon className='dark:text-white' style={{ fontSize: 25 }} />
                        </ListItemIcon>
                        <p className='font-semibold text-[16px]'>Delete</p>
                      </MenuItem>
                    </div>
                  </Menu>
                </div>
              </div>

              <div className='dark:text-white w-full flex font-medium px-1'>
                Born To Shine ❤ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste neque at delectus commodi distinctio. Maxime quod qui culpa sapiente commodi laboriosam, laborum debitis. lorem34
              </div>

              <div className='flex gap-3 w-full items-center'>
                <Tooltip title="Like" className="text-red-600 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">
                  <FavoriteIcon style={{ fontSize: 30 }} />
                </Tooltip>

                <Tooltip title="Comment" className="text-gray-400 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">
                  <button>
                    <CommentIcon style={{ fontSize: 30 }} />
                  </button>
                </Tooltip>

                <button onClick={handleLikeModalOpen} className='dark:text-white text-xs flex hover:underline duration-200'>Liked by HelloWorld and 34 others</button>
                <Modal
                  open={likeModalOpen}
                  onClose={handleLikeModalClosed}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="flex justify-center items-center"
                >
                  <div className='py-3 px-3 md:p-4 h-[60%] md:w-[70%] lg:px-5 lg:py-3 bg-white w-full dark:bg-[#231344] lg:w-[40%] rounded-lg'>
                    <div className='bg-white dark:bg-[#231344]'>
                      <div className='flex justify-between dark:text-white'>
                        <div className='flex items-center gap-1 py-3 lg:py-5'>
                          <div className='font-semibold text-lg'>Liked By</div>
                          <div className='text-red-600'><FavoriteIcon /></div>
                        </div>
                        <button>
                          <CloseIcon onClick={handleLikeModalClosed} />
                        </button>
                      </div>
                      <div className='flex flex-col overflow-y-auto h-[46vh] md:h-[45vh] lg:h-[46vh] scroll-smooth '>
                        <Like />
                        <Like />
                        <Like />
                        <Like />
                        <Like />
                        <Like />
                        <Like />
                        <Like />
                        <Like />
                        <Like />
                        <Like />
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>

              <form className='bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full flex items-center px-2 py-1 w-full'>
                <input className='px-2 bg-transparent w-full focus:outline-none dark:text-white' type="text" placeholder='Write a comment...' />
                <button className=' text-[#573698] dark:text-white/70 rounded-full hover:scale-105 duration-200'>
                  <SendIcon style={{ fontSize: 30 }} />
                </button>
              </form>

              <div className='overflow-y-auto px-1 h-[60vh] lg:h-max'>
                <MyPostComment />
                <MyPostComment />
                <MyPostComment />
                <MyPostComment />
                <MyPostComment />
                <MyPostComment />
                <MyPostComment />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewMyPost
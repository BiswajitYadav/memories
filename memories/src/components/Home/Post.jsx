import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Modal, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import Like from '../Like';
import Comment from '../Comment';

const Post = () => {
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

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const handleCommentModalOpen = () => setCommentModalOpen(true);
  const handleCommentModalClosed = () => setCommentModalOpen(false);

  return (
    <>
      <div className='flex flex-col bg-white dark:bg-[#231344] h-max w-full justify-center items-center rounded-md shadow-lg px-2 sm:px-5 py-4 md:py-5 gap-2 md:gap-3'>

        <div className='flex w-full justify-between'>
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
            <div className='dark:bg-[#231344] rounded-md bg-white dark:text-white -m-2 p-2 duration-300'>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ShareIcon className='text-blue-600' style={{ fontSize: 25 }} />
                </ListItemIcon>
                <p className='font-semibold text-[16px]'>Share</p>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ReportProblemIcon className='text-red-500' style={{ fontSize: 25 }} />
                </ListItemIcon>
                <p className='font-semibold text-[16px]'>Report</p>
              </MenuItem>
            </div>
          </Menu>
        </div>

        <Link className='w-full' to="/post/:postID">
          <img className='w-full object-cover rounded-md' src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YnVnYXR0aSUyMGNoaXJvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Image" />
        </Link>


        <div className='dark:text-white w-full flex font-medium px-1'>
          Born To Shine ❤
        </div>

        <div className='flex gap-3 w-full items-center'>
          <Tooltip title="Like" className="text-red-600 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">
            <FavoriteIcon style={{ fontSize: 30 }} />
          </Tooltip>

          <Tooltip title="Comment" className="text-gray-400 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">
            <button onClick={handleCommentModalOpen}>
              <CommentIcon style={{ fontSize: 30 }} />
            </button>
          </Tooltip>
          <Modal
            open={commentModalOpen}
            onClose={handleCommentModalClosed}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-center items-center"
          >
            <div className='py-3 px-2 md:px-3 md:p-4 h-[70%] md:w-[80%] lg:py-3 bg-white w-full dark:bg-[#231344] lg:w-[65%] xl:w-[50%] rounded-lg'>
              <div className='bg-white dark:bg-[#231344] w-full'>
                <div className='flex dark:text-white items-center py-1 justify-between px-4'>
                  <div className='flex px-3 gap-2 cursor-default'>
                    <div className='font-semibold text-lg text-gray-500 dark:text-white'>Comments</div>
                    <div className='font-semibold text-lg text-gray-500 dark:text-white'>13K</div>
                  </div>
                  <button className='flex justify-end py-1 '>
                    <CloseIcon onClick={handleCommentModalClosed} />
                  </button>
                </div>
                <div className='flex flex-col overflow-y-auto w-full h-[60vh] scroll-smooth px-1 py-2 md:p-2'>
                  <Comment />
                </div>
              </div>
            </div>
          </Modal>

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
          <input className='px-2 md:px-8 bg-transparent w-full focus:outline-none dark:text-white' type="text" placeholder='Write a comment...' />
          <button className=' text-[#573698] dark:text-white/70 rounded-full hover:scale-105 duration-200'>
            <SendIcon style={{ fontSize: 30 }} />
          </button>
        </form>
      </div>
    </>
  )
}

export default Post
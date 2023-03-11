import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ShareIcon from '@mui/icons-material/Share';

const Post = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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


        <img className='w-full object-cover rounded-md' src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YnVnYXR0aSUyMGNoaXJvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />


        <div className='dark:text-white w-full flex font-medium px-1'>
          Born To Shine ❤
        </div>

        <div className='flex gap-3 w-full items-center'>
          <Tooltip title="Like" className="text-red-600 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">
            <FavoriteIcon style={{ fontSize: 30 }} />
          </Tooltip>
          <Tooltip title="Comment" className="text-gray-400 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">
            <CommentIcon style={{ fontSize: 30 }} />
          </Tooltip>
          <div className='dark:text-white text-xs flex'>Liked by HelloWorld and 34 others</div>
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
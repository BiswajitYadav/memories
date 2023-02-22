import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


const Message = (props) => {
    return (
        <>
            <div className='bg-[#8948B8] text-white w-max max-w-[70%] px-3 py-1 rounded-t-full rounded-r-full shadow-lg dark:shadow-black flex gap-1'>
                <div>
                    Lorem, ipsum dolor sit amet consec
                </div>
                {/* <div className='text-xs opacity-40 '>00:00</div> */}
            </div>
            <div className='bg-[#FFFFFF] w-max max-w-[70%] px-3 py-1 rounded-t-full rounded-l-full self-end shadow-lg dark:shadow-black flex gap-1'>
                <div>
                    Lorem
                </div>
                {/* <div className='text-xs opacity-40 '>00:00</div> */}
            </div>
        </>
    )
}


const ChatSection = () => {
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
            <div className="h-full w-full bg-[#EFEFEF] dark:bg-[#1C1132] rounded-md">
                <div className='h-max flex px-10  py-3 justify-between bg-[#EFEFEF] dark:bg-[#1C1132] rounded-md -mx-2 shadow-lg dark:shadow-black'>
                    <Link to="/profile" className='flex gap-5'>
                        <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 50, height: 50 }} />
                        <div className='flex flex-col justify-center'>
                            <div className='flex gap-1 '>
                                <div className='dark:text-white font-semibold text-lg'>Rohit Kumar Pandit</div>
                                <Tooltip title="Developer" className="text-gray-400 my-auto">
                                    <VerifiedIcon style={{ fontSize: 16 }} />
                                </Tooltip>
                            </div>
                            <div className=' dark:text-slate-200 text-slate-600 text-sm font-semibold'>@Rohit64Bit</div>
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
                                    <PersonIcon className='dark:text-white' style={{ fontSize: 25 }} />
                                </ListItemIcon>
                                <p className='font-semibold text-[16px]'>View Profile</p>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <ReportProblemIcon className='dark:text-white' style={{ fontSize: 25 }} />
                                </ListItemIcon>
                                <p className='font-semibold text-[16px]'>Report</p>
                            </MenuItem>
                        </div>
                    </Menu>
                </div>
                <div className='h-[71vh] w-full p-5 flex flex-col'>
                    <div className='h-full w-full overflow-y-auto my-2 flex gap-5 flex-col p-2'>

                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />

                    </div>
                    <form method='POST' className='bg-white border-[4px] dark:bg-[#231344] dark:border-[#33215A] dark:text-white border-[#D4D4D4] w-full h-max flex rounded-lg'>

                        <IconButton className='dark:text-white dark:opacity-60 duration-300'>
                            <EmojiEmotionsIcon />
                        </IconButton>

                        <input type="text" className='w-full bg-transparent p-2' />

                        <IconButton type='submit' className='dark:text-white dark:opacity-60 duration-300'>
                            <SendIcon />
                        </IconButton>

                    </form>
                </div>
            </div>
        </>
    )
}

export default ChatSection
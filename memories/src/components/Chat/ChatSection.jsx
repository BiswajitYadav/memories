import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Message = (props) => {
    return (
        <>
            <div className='flex gap-1.5 items-end'>
                <div className='bg-[#8948B8] text-white w-max max-w-[70%] px-3 py-1 rounded-t-lg rounded-r-lg shadow-lg dark:shadow-md dark:shadow-black flex flex-col gap-1 text-sm lg:text-lg'>
                    <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea architecto aspernatur quisquam voluptas maxime tempora sed ipsa reprehenderit similique soluta, quaerat animi totam, fugiat libero debitis exercitationem quasi enim sapiente.
                    </div>
                </div>
                <div className='text-xs text-black/50 dark:text-white/50'>00:00</div>
            </div>

            <div className='flex gap-1.5 items-end w-full justify-end'>
                <div className='text-xs text-black/50 dark:text-white/50'>00:00</div>
                <div className='bg-[#EFEFEF] w-max max-w-[70%] px-3 py-1 rounded-t-lg rounded-l-lg self-end shadow-lg dark:shadow-md dark:shadow-black flex gap-1 text-sm lg:text-lg'>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea architecto aspernatur quisquam voluptas maxime tempora sed ipsa reprehenderit similique soluta, quaerat animi totam, fugiat libero debitis exercitationem quasi enim sapiente.
                    </div>
                </div>
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
            <div className="h-full w-full bg-white dark:bg-[#1C1132] rounded-md">
                <div className='h-max flex px-3 lg:px-10 py-2.5 lg:py-3 xl:py-4 justify-between bg-[#FFFFFF] dark:bg-[#2c1a57] rounded-md md:-mx-2 shadow-lg dark:shadow-black'>
                    <div className='flex gap-1 sm:gap-3 lg:gap-5 h-full'>
                        <Link to="/chat" className='flex my-auto gap-1 sm:gap-3 lg:gap-5 h-full'>
                            <ArrowBackIcon className='md:scale-125 xl:scale-150 text-[#8948B8]' />
                        </Link>

                        <Link to="/profile" className='flex gap-1 sm:gap-3 lg:gap-5 h-full'>
                            <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 50, height: 50 }} />
                            <div className='flex flex-col justify-center'>
                                <div className='flex gap-1 '>
                                    <div className='dark:text-white font-semibold lg:text-lg text-sm'>Rohit Kumar Pandit</div>
                                    <Tooltip title="Developer" className="text-gray-400 my-auto">
                                        <VerifiedIcon style={{ fontSize: 16 }} />
                                    </Tooltip>
                                </div>
                                <div className=' dark:text-slate-200 text-slate-600 text-xs lg:text-sm font-semibold'>@Rohit64Bit</div>
                            </div>
                        </Link>
                    </div>

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
                                    <ReportProblemIcon className='dark:text-white' style={{ fontSize: 25 }} />
                                </ListItemIcon>
                                <p className='font-semibold text-[16px]'>Report</p>
                            </MenuItem>
                        </div>
                    </Menu>
                </div>
                <div className='h-[75vh] w-full p-2 md:p-1 lg:px-3 flex flex-col  dark:bg-[#231344]'>
                    <div className='h-full w-full overflow-y-auto my-2 flex gap-6 flex-col p-2 md:p-3'>

                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />

                    </div>
                    <form method='POST' className=' bg-[#FFFFFF] border-[4px] dark:bg-[#2c1a57] dark:border-[#33215A] dark:text-white border-[#D4D4D4] w-full h-max flex rounded-lg'>

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
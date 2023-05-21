import React, { useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { IO_SERVER_URL, SERVER_URL, socket } from './../../services/helper';
import { useContext } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MainContext from './../../context/MainContext';
import moment from 'moment/moment';

const Message = (props) => {

    const { userProfileData } = useContext(MainContext)

    const { _id } = userProfileData;

    const { senderID, date, message } = props.data

    const formatDate = (dateString) => {
        const date = moment(dateString);
        const today = moment();

        // Check if the date is today
        if (date.isSame(today, 'day')) {
            return date.format('h:mm A');
        }

        // Check if the date is yesterday
        if (date.isSame(today.subtract(1, 'day'), 'day')) {
            return 'Yesterday';
        }

        // Format the date using the desired format for older dates
        return date.format('D MMM YYYY, h:mm A');
    };

    const formatedDate = formatDate(date)

    return (
        <>

            {

                senderID === _id ?
                    <div className='flex gap-1.5 items-end w-full justify-end'>

                        <Tooltip title={
                            formatedDate
                        }>
                            <div className='text-xs text-black/30 dark:text-white/30 cursor-pointer'>
                                <InfoOutlinedIcon style={{ fontSize: 15 }} />
                            </div>
                        </Tooltip>

                        <div className='bg-[#EFEFEF] w-max max-w-[70%] px-3 py-1 rounded-t-lg rounded-l-lg self-end shadow-lg dark:shadow-md dark:shadow-black/20 flex gap-1 text-sm lg:text-base break-all'>

                            <div>
                                {message}
                            </div>

                        </div>

                    </div>
                    :
                    <div className='flex gap-1.5 items-end'>

                        <div className='bg-[#8948B8] text-white w-max max-w-[70%] px-3 py-1 rounded-t-lg rounded-r-lg shadow-lg dark:shadow-md dark:shadow-black/20 flex flex-col gap-1 text-sm lg:text-base break-all'>

                            <div>
                                {message}
                            </div>

                        </div>

                        <Tooltip title={
                            formatedDate
                        }>
                            <div className='text-xs text-black/30 dark:text-white/30 cursor-pointer'>
                                <InfoOutlinedIcon style={{ fontSize: 15 }} />
                            </div>
                        </Tooltip>

                    </div>
            }

        </>
    )
}


const ChatSection = () => {

    const authToken = localStorage.getItem('auth-token')

    const { userProfileData } = useContext(MainContext)

    const location = useLocation()
    const { data } = location.state;

    const { _id, name, userName, profileURL } = data;

    const params = useParams()
    const { chatId } = params

    const chatSectionRef = useRef(null)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [messages, setMessages] = useState([])

    const fetchAllMessage = async () => {

        socket.emit("join-chat", chatId);

        const response = await fetch(`${SERVER_URL}chat/fetch-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ chatID: chatId })
        })

        const json = await response.json()

        if (json.success) {
            setMessages(json.message)
        }

    }

    const [messageInput, setMessageInput] = useState("")

    const [sendEnabled, setSendEnabled] = useState(false)

    const handleSendMessageToDB = async (e) => {

        e.preventDefault()

        socket.emit('stop-typing', { "room": chatId, "userID": userProfileData._id })

        socket.emit("message", { "message": messageInput, "chatID": chatId, "senderID": userProfileData._id });


        setMessageInput("")

        setSendEnabled(false)

        const response = await fetch(`${SERVER_URL}chat/send-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "message": messageInput, "chatID": chatId })
        })

        const json = await response.json()

    }

    useEffect(() => {
        fetchAllMessage()
    }, [])

    // IO handlers

    const [socketConnected, setSocketConnected] = useState(false)

    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {

        socket.emit('setup', userProfileData)

        socket.on('connected', () => setSocketConnected(true))

        socket.on('stop-typing', (payload) => {
            setIsTyping(false)
        })

        socket.on('typing', (payload) => {

            if (payload.room === chatId && userProfileData._id != payload.userID) {
                setIsTyping(true)
            }

        })

    }, [])

    useEffect(() => {

        if (messageInput.length !== 0) {
            socket.emit('typing', { "room": chatId, "userID": userProfileData._id })
        } else {
            socket.emit('stop-typing', { "room": chatId, "userID": userProfileData._id })
        }

    }, [messageInput.length])

    useEffect(() => {

        socket.on('message', (payload) => {

            if (payload.chatID === chatId) {
                setMessages([...messages, payload])
            }

        })

    })

    useEffect(() => {
        chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    return (
        <>
            <div className="h-full w-full bg-white dark:bg-[#1C1132] rounded-md">

                <div className='h-max flex px-3 lg:px-10 py-2.5 lg:py-3 xl:py-4 justify-between bg-[#FFFFFF] dark:bg-[#2c1a57] rounded-md md:-mx-2 shadow-lg dark:shadow-black'>

                    <div className='flex gap-1 sm:gap-3 lg:gap-5 h-full'>

                        <Link onClick={fetchAllMessage} to="/chat" className='flex my-auto gap-1 sm:gap-3 lg:gap-5 h-full p-2'>
                            <ArrowBackIcon className='md:scale-125 xl:scale-150 text-[#8948B8]' />
                        </Link>

                        <Link to={`/profile/${_id}`} className='flex gap-1 sm:gap-3 lg:gap-5 h-full'>
                            <Avatar className='my-auto' alt={`${name.slice(0, 1)}`} src={profileURL} sx={{ width: 50, height: 50 }} />
                            <div className='flex flex-col justify-center'>
                                <div className='flex gap-1 '>
                                    <div className='dark:text-white font-semibold lg:text-lg text-sm'>{name}</div>

                                    <Tooltip title="Developer" className="text-gray-400 my-auto">
                                        <VerifiedIcon style={{ fontSize: 16 }} />
                                    </Tooltip>

                                </div>
                                <div className=' dark:text-slate-200 text-slate-600 text-xs lg:text-sm font-semibold'>@{userName}</div>
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

                        <div className="mx-auto bg-cyan-600 shadow-lg text-sm rounded-md px-2 py-1 text-white">Message in the chat are end-to-end encrypted</div>

                        {
                            messages?.length ?

                                messages?.map((data) => {
                                    return (
                                        <Message key={data._id} data={data} />
                                    )
                                })

                                :
                                undefined
                        }

                        {
                            isTyping ?
                                <div className='bg-[#8948B8] text-white w-max max-w-[70%] px-3 py-2 rounded-t-lg rounded-r-lg shadow-lg dark:shadow-md dark:shadow-black/20 flex gap-1 text-sm lg:text-base'>

                                    <div className='bg-white/80 animate-bounce duration-300 rounded-full p-1 h-max w-max'></div>
                                    <div className='bg-white/80 animate-bounce duration-300 rounded-full p-1 h-max w-max'></div>
                                    <div className='bg-white/80 animate-bounce duration-300 rounded-full p-1 h-max w-max'></div>

                                </div>
                                :
                                null
                        }

                        <div className='p-2' ref={chatSectionRef} />

                    </div>

                    <form method='POST' onSubmit={handleSendMessageToDB} className=' bg-[#FFFFFF] border-[4px] dark:bg-[#2c1a57] dark:border-[#33215A] dark:text-white border-[#D4D4D4] w-full h-max flex rounded-lg'>

                        {/* <IconButton className='dark:text-white dark:opacity-60 duration-300'>
                            <EmojiEmotionsIcon />
                        </IconButton> */}

                        <input onChange={e => {
                            setMessageInput(e.target.value)
                            if (e.target.value.length > 0) {
                                setSendEnabled(true)
                            } else {
                                setSendEnabled(false)
                            }
                        }} rows={1} value={messageInput} type="text" className='w-full bg-transparent p-2 resize-none' placeholder='Type a message...' required />

                        <button type='submit' disabled={!sendEnabled} className={sendEnabled ? 'dark:text-white dark:opacity-60 opacity-50 duration-300 hover:opacity-100 px-2' : 'hidden'}>
                            <SendIcon />
                        </button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default ChatSection
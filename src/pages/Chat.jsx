import { Avatar, Badge, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Header from '../components/Header'
import VerifiedIcon from '@mui/icons-material/Verified';
import { BsFillChatTextFill } from 'react-icons/bs'
import { useState } from 'react';
import { SERVER_URL, socket } from '../services/helper';
import { useEffect } from 'react';
import ReactTimeago from 'react-timeago';
import MainContext from '../context/MainContext';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import moment from 'moment';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'blue',
    color: 'blue',
    boxShadow: `0 0 0 2px`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const ChatSelect = (props) => {

  const sessionUserID = sessionStorage.getItem('sessionUserID')

  const { _id, user, updatedAt, recentMessage, newMessage, newMessageBy } = props.data;

  const [userData, setUserData] = useState({})

  const [partner, setPartner] = useState({})

  const { name, userName, profileURL } = userData;

  const userID = user?.find(data => data != sessionUserID)

  const fetchUserProfileData = async () => {

    const response = await fetch(`${SERVER_URL}user/get-profile-of/${userID}`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json()

    if (json.success) {
      setUserData(json.userProfile)
      setPartner(json.partner)
    }

  }

  useEffect(() => {

    if (userID) {
      fetchUserProfileData()
    }

  }, [userID])

  const encryptedBytes = recentMessage ? CryptoJS.enc.Base64.parse(recentMessage) : null
  const keyBytes = recentMessage ? CryptoJS.enc.Utf8.parse(_id) : null

  const decrypted = recentMessage ? CryptoJS.AES.decrypt(
    {
      ciphertext: encryptedBytes,
    },
    keyBytes,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  )
    :
    null

  const decryptedMessage = recentMessage ? decrypted.toString(CryptoJS.enc.Utf8) : null

  const formatDate = (dateString) => {
    const date = moment(dateString);
    const today = moment();

    if (date.isSame(today, 'day')) {
      return date.format('h:mm A')
    }

    if (date.isSame(today.subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    }

    return date.format('DD-MM-YY');
  };

  const formatedDate = formatDate(updatedAt)

  const [isOnline, setIsOnline] = useState(false)

  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {

    socket.on('user-stop-typing', (payload) => {
      setIsTyping(false)
    })

    socket.on('user-typing', (payload) => {

      if (payload.room == _id && userData._id != payload.userID) {
        setIsTyping(true)
      }

    })

    socket.on('is-connected', (payload) => {

      if (userID == payload) {
        setIsOnline(true)
      }

    })

  }, [])

  return (
    <>

      <Link className='hover:bg-[#D9D9D9] lg:hover:rounded-r-md lg:rounded-l-none rounded-md dark:hover:bg-[#1C1132] w-full' to={`${_id}`} state={{ data: userData, chatData: props.data, partner: partner }}>

        <div className='flex flex-col h-max dark:text-white px-5 py-3 lg:py-4 gap-5 rounded-md'>

          <div className='flex w-full justify-between'>

            <div className='flex gap-2 w-full'>

              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant={isOnline ? "dot" : ""}
              >

                <Avatar alt={`${name?.slice(0, 1)}`} src={profileURL} sx={{ width: 45, height: 45 }} />

              </StyledBadge>

              <div className='flex flex-col justify-center w-full'>

                <div className="flex justify-between w-full items-center">

                  <div className='flex gap-1'>

                    <div className='dark:text-white font-semibold text-sm'>{name}</div>

                    {
                      partner?.verificationType == "dev" ?
                        <Tooltip title="Developer" className="text-gray-400 my-auto">
                          <VerifiedIcon style={{ fontSize: 16 }} />
                        </Tooltip>
                        : partner?.verificationType == "celeb" ?
                          <Tooltip title="Public Figure" className="text-blue-400 my-auto">
                            <VerifiedIcon style={{ fontSize: 16 }} />
                          </Tooltip>
                          : partner?.verificationType == "org" ?
                            <Tooltip title="Organization" className="text-yellow-400 my-auto">
                              <VerifiedIcon style={{ fontSize: 16 }} />
                            </Tooltip>
                            : null
                    }

                  </div>

                  <div className='text-xs opacity-50'>{formatedDate}</div>

                </div>
                <div className="flex items-center justify-between w-full ">

                  {
                    isTyping ?
                      <div className=' dark:text-slate-200 text-slate-600 text-sm font-light'>typing...</div>
                      :
                      newMessage && sessionUserID != newMessageBy ?
                        <div className=' dark:text-slate-200 text-slate-600 text-sm font-semibold'>
                          {
                            decryptedMessage ? decryptedMessage?.length > 20 ?
                              decryptedMessage?.slice(0, 20) + "..."
                              :
                              decryptedMessage : "send a message"
                          }
                        </div>
                        :
                        <div className=' dark:text-slate-200 text-slate-600 text-sm font-light'>
                          {
                            decryptedMessage ? decryptedMessage?.length > 20 ?
                              decryptedMessage?.slice(0, 20) + "..."
                              :
                              decryptedMessage : "send a message"
                          }
                        </div>
                  }

                  {
                    newMessage ?
                      sessionUserID !== newMessageBy ?
                        <div className='bg-green-500 rounded-full p-1.5 h-max w-max'>
                        </div>
                        : null
                      : null
                  }

                  {
                    !newMessage ?
                      sessionUserID === newMessageBy ?
                        <div className='h-max w-max text-blue-500 dark:text-blue-400'>
                          <DoneAllIcon style={{ fontSize: 18 }} />
                        </div>
                        : null
                      : null
                  }

                  {
                    newMessage ?
                      sessionUserID === newMessageBy ?
                        <div className='h-max w-max text-slate-500 dark:text-white'>
                          <DoneIcon style={{ fontSize: 18 }} />
                        </div>
                        : null
                      : null
                  }

                </div>

              </div>

            </div>

          </div>

        </div>

      </Link>

    </>
  )
}


const Chat = () => {

  const { allChat, fetchAllChat, userProfileData, fetchSessionUserProfile } = useContext(MainContext)

  useEffect(() => {

  }, [])

  // IO HANDLERS
  useEffect(() => {

    fetchAllChat()

    socket.on('refresh', (payload) => {

      if (payload.refreshUserID == userProfileData._id) {
        fetchAllChat()
      } else {
        return;
      }

    })

  }, [])

  return (
    <>
      <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-screen w-full'>

        <Header />

        <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-full overflow-y-auto flex justify-between gap-x-5 py-4 px-2 sm:px-5 md:px-16'>

          <div className='bg-white dark:bg-[#231344] rounded-xl w-full flex items-center py-3 flex-row gap-5 shadow-lg justify-between lg:pr-4'>

            <div className='w-full md:w-[50%] lg:w-[40%] xl:w-[25%] h-[80vh] '>

              <div className='w-full h-full flex flex-col lg:items-center overflow-y-auto md:pr-2 lg:pr-5'>

                {
                  allChat?.length ?
                    allChat?.map((data) => {
                      return (
                        <ChatSelect key={data._id} data={data} />
                      )
                    })
                    :
                    <div className='p-10 opacity-50 dark:text-white'>Send message to someone to start a chat.</div>
                }


              </div>

            </div>

            <div className='hidden md:block md:w-[50%] lg:w-[60%] xl:w-[75%] h-[80vh]'>

              <div className='w-full h-full flex justify-center'>

                <div className='flex items-center gap-2 lg:gap-4 justify-center cursor-default select-none'>

                  <BsFillChatTextFill className='scale-125 lg:scale-150 text-[#D9D9D9]' />
                  <div className='text-xl lg:text-3xl font-semibold text-[#D9D9D9]'>Tap to Chat</div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Chat
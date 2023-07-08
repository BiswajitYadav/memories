import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from './../components/Header';
import { SERVER_URL } from '../services/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const NotificationElement = (props) => {

    const { interaction, userInteracted, notificationText, date } = props.data;

    const [userData, setUserData] = useState({})

    const { name, userName, profileURL } = userData;

    const fetchUserProfileData = async () => {

        const response = await fetch(`${SERVER_URL}user/get-profile-of/${userInteracted}`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json()

        if (json.success) {
            setUserData(json.userProfile)
        }

    }

    useEffect(() => {

        if (userInteracted) {
            fetchUserProfileData()
        }

    }, [userInteracted])

    return (

        <>
            {
                interaction ?

                    <div div className='hover:bg-white duration-300 ease-in-out text-black dark:text-white hover:dark:bg-[#231344] w-full px-1 py-3 md:p-5 rounded-lg hover:shadow-lg select-none flex  items-center flex-wrap gap-2 my-auto text-sm md:text-lg xl:text-xl cursor-pointer' >

                        <Link
                            to={`/profile/${userInteracted}`}
                            className='flex gap-2 items-center'
                        >
                            <Avatar className='my-auto' alt={name?.slice(0, 1)} src={profileURL} sx={{ width: 35, height: 35 }} />
                            <span className='font-bold'>{name}</span>
                        </Link>
                        {notificationText}

                    </div>

                    :

                    <div className='hover:bg-white duration-300 ease-in-out text-black dark:text-white hover:dark:bg-[#231344] w-full p-3 md:p-5 rounded-lg hover:shadow-lg select-none flex items-center gap-2 my-auto text-sm md:text-lg xl:text-xl cursor-pointer'>
                        <div className='bg-white dark:bg-[#231344] p-1 rounded-full' >
                            <SmartToyTwoToneIcon fontSize="large" />
                        </div>
                        {notificationText}
                    </div>
            }
        </>


    )
}

const Notification = () => {

    const authToken = localStorage.getItem('auth-token')

    const [notification, setNotification] = useState([])

    const [totalNotificationData, setTotalNotificationData] = useState(0)

    const pageLimit = 9

    const fetchNotification = async () => {

        let pageNo = Math.ceil(notification.length / pageLimit) + 1;

        const response = await fetch(`${SERVER_URL}notification/fetch-notification/${pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })
            .then(res => res.json())
            .then((newData) => {

                const mergeData = [...notification, ...newData.notificationData]

                setNotification(mergeData)

                setTotalNotificationData(newData.totalData)

            })
            .catch((err) => console.log(err))

    };

    useEffect(() => {
        fetchNotification()
    }, [])

    const fetchMoreData = () => {
        fetchNotification()
    }

    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>
                <Header />
                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-full flex justify-between gap-x-5 py-4 px-2 sm:px-5 md:px-16'>
                    <div className='bg-white dark:bg-[#231344] rounded-xl w-full flex px-1 sm:px-5 md:px-10 py-3 md:py-6 shadow-lg '>
                        <div className='bg-[#F1F1F1] dark:bg-[#1C1132] rounded border-[2px] border-[#D9D9D9] dark:border-[#33215A] w-[95%] sm:w-[85%] md:w-[80%] lg:w-[60%] p-1.5 md:p-3 mx-auto'>

                            {
                                notification && notification.length !== 0 ?

                                    <div id='scrollProvider' className='overflow-y-auto w-full h-full p-1 md:p-2 lg:p-4'>

                                        <InfiniteScroll
                                            dataLength={notification.length}
                                            next={fetchMoreData}
                                            hasMore={notification.length < Number(totalNotificationData)}
                                            className='flex flex-col h-full items-center justify-center'
                                            scrollableTarget="scrollProvider"
                                        >


                                            {
                                                notification.length ?
                                                    notification?.map((data) => {
                                                        return (
                                                            <NotificationElement key={data._id} data={data} />
                                                        )
                                                    })
                                                    :
                                                    <div className='flex w-full justify-center'><CircularProgress className='text-black dark:text-white' /></div>
                                            }

                                        </InfiniteScroll>

                                    </div>

                                    :

                                    <div className='h-full opacity-70 flex flex-col gap-2 items-center justify-center text-black select-none dark:text-white'>
                                        <NotificationsNoneIcon />
                                        <div>No new notifications</div>
                                    </div>
                            }



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification
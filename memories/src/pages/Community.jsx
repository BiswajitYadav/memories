import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, CircularProgress, Tooltip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { SERVER_URL } from './../services/helper';
import { Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

const Suggestion = (props) => {

    const { name, userName, profileURL, _id } = props.data;

    const authToken = localStorage.getItem('auth-token')

    const { setNotification } = useContext(MainContext)

    // handle follow

    const [followStatus, setFollowStatus] = useState(Boolean)

    const fetchFollowStatus = async () => {

        const response = await fetch(`${SERVER_URL}follow/fetch-follow-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "followingUserID": _id })
        })

        const json = await response.json()

        if (json.success) {

            if (json.followingStatus) {
                setFollowStatus(true)
            } else {
                setFollowStatus(false)
            }

        } else {
            setNotification({ status: "true", message: `${json.error}`, type: "error" })
        }

    }

    const handleFollowUnfollow = async () => {
        const response = await fetch(`${SERVER_URL}follow/follow-unfollow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ "following": _id })
        });

        const json = await response.json()

        if (json.success) {
            fetchFollowStatus()
        } else {
            setNotification({ status: "true", message: `${json.error}`, type: "error" })
        }

    }

    useEffect(() => {
        fetchFollowStatus()
    }, [])

    // -------------


    return (
        <>
            <div className='flex w-full justify-between'>
                <Link to={`/profile/${_id}`} className='flex gap-2 w-max'>
                    <Avatar className='my-auto w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover' alt="Travis Howard" src={profileURL} />

                    <div className='flex flex-col justify-center'>

                        <div className='flex gap-1'>

                            <div className='dark:text-white font-semibold text-sm lg:text-base'>{name}</div>

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

                        <div className=' text-slate-400 text-xs md:text-xs lg:text-sm'>@{userName}</div>

                    </div>
                </Link>

                {
                    !followStatus ?
                        <Tooltip title="Follow">
                            <button onClick={handleFollowUnfollow} className='h-max bg-gradient-to-r from-[#8948B8] to-[#8E2BC2] my-auto px-3 py-1 text-white md:px-6 lg:px-10 rounded lg:text-lg'>Follow</button>
                        </Tooltip>
                        :
                        <Tooltip title="Unfollow">
                            <button onClick={handleFollowUnfollow} className='h-max bg-slate-300 my-auto px-3 py-1 text-slate-900 md:px-6 lg:px-10 rounded lg:text-lg'>Following</button>
                        </Tooltip>
                }



            </div>
        </>
    )
}


const Community = () => {

    const authToken = localStorage.getItem("auth-token")

    const [searchResult, setSearchResult] = useState([])

    const [searchQuery, setSearchQuery] = useState("")

    const [loadingSearch, setLoadingSearch] = useState(false)

    const fetchSearchData = async () => {

        setLoadingSearch(true)

        const response = await fetch(`${SERVER_URL}search/search-community/${searchQuery}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        });

        const json = await response.json()

        if (json.success) {
            setSearchResult(json.userList)
            setLoadingSearch(false)
        }

    }

    const onQueryChange = (e) => {

        setSearchQuery(e.target.value)

    }


    useEffect(() => {

        if (searchQuery.length > 3) {

            fetchSearchData()

        }

    }, [searchQuery.length])


    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>

                <Header />

                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-screen flex justify-between gap-x-5 py-4 px-2 sm:px-5 md:px-16'>

                    <div className='bg-white dark:bg-[#231344] rounded-xl w-full flex items-center py-3 md:py-6 flex-col gap-3 md:gap-4 shadow-lg'>

                        <div className='bg-[#FFFFFF] dark:bg-[#231344] rounded w-[95%] sm:w-[85%] md:w-[80%] lg:w-[55%] flex flex-col gap-4'>

                            <div className='bg-[#F1F1F1] dark:bg-[#1C1132] rounded flex items-center p-2 w-full h-max border-[2px] border-[#D9D9D9] dark:border-[#33215A]'>

                                <input
                                    onChange={onQueryChange}
                                    value={searchQuery}
                                    className='px-3 md:px-5 bg-transparent w-full focus:outline-none dark:text-white lg:py-1 xl:py-2 xl:text-lg'
                                    type="search"
                                    placeholder='Search the community...'
                                />

                                {/* <button type='submit' className='hidden md:block text-white bg-[#9013C9] sm:px-3 sm:py-1 rounded hover:scale-105 duration-300 '>
                                    <SearchIcon style={{ fontSize: 35 }} />
                                </button> */}

                            </div>

                            <div className='bg-[#F1F1F1] dark:bg-[#1C1132] rounded border-[2px] border-[#D9D9D9] dark:border-[#33215A] w-full p-0.5 md:p-3 h-max'>

                                {

                                    searchQuery.length < 3 ?
                                        <div className='w-full justify-center items-center flex h-[73vh] md:h-[63vh] xl:h-[66vh] p-2 py-7 sm:p-2 lg:px-4'>

                                            <div className='flex flex-col justify-center items-center opacity-30 w-full'>

                                                <PeopleIcon className='dark:text-white' fontSize='large' />
                                                <div className='dark:text-white'>Search by name or username</div>

                                            </div>

                                        </div>

                                        :

                                        loadingSearch
                                            ?
                                            <div className='w-full justify-center items-center flex h-[73vh] md:h-[63vh] xl:h-[66vh] p-2 py-7 sm:p-2 lg:px-4'>

                                                <CircularProgress className='text-black dark:text-white opacity-50' />

                                            </div>

                                            :

                                            searchQuery !== "" && searchResult.length === 0 ?

                                                <div className='w-full justify-center items-center flex h-[73vh] md:h-[63vh] xl:h-[66vh] p-2 py-7 sm:p-2 lg:px-4'>

                                                    <div className='dark:text-white/50'>No user found</div>

                                                </div>

                                                :

                                                <div className='overflow-y-auto flex flex-col gap-10 md:gap-7 xl:gap-10 h-[73vh] md:h-[63vh] xl:h-[66vh] p-2 py-7 sm:p-2 lg:px-4'>

                                                    {

                                                        searchResult?.map((data) => {
                                                            return (
                                                                <Suggestion key={data._id} data={data} />
                                                            )
                                                        })

                                                    }

                                                </div>

                                }



                            </div>

                        </div>

                    </div>

                </div>

            </div >

        </>
    )
}

export default Community
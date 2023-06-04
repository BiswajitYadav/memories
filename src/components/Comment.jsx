import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@mui/material/CircularProgress';
import CommentIcon from '@mui/icons-material/Comment';
import { SERVER_URL } from '../services/helper';
import ReactTimeago from 'react-timeago';
import { useContext } from 'react';
import MainContext from '../context/MainContext';

const CommentItem = (props) => {

    const { userID, commentText, postID, date } = props.data;

    const [userProfile, setUserProfile] = useState({})

    const [userData, setUserData] = useState({})

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
        }

    }

    // ---------------------

    const { name, userName, profileURL } = userData;

    const [redirectURL, setRedirectURL] = useState("")

    const sessionUserID = sessionStorage.getItem('sessionUserID')

    useEffect(() => {
        if (userID === sessionUserID) {
            setRedirectURL(`/myprofile`)
        } else {
            setRedirectURL(`/profile/${userID}`)
        }
    }, [])

    useEffect(() => {
        if (userID) {
            fetchUserProfileData()
        }
    }, [userID])

    return (
        <>
            <div className='flex gap-2 py-3 md:px-2 w-full'>
                <Link to={redirectURL}>
                    <Avatar className='' alt={name?.slice(0, 1)} src={profileURL} sx={{ width: 45, height: 45 }} />
                </Link>
                <div className='flex flex-col w-full'>
                    <div className='flex items-center gap-2 dark:text-white'>
                        <Link to={redirectURL}>
                            <div className='font-semibold text-sm'>{name}</div>
                        </Link>
                        <ReactTimeago className='text-xs opacity-50' date={date} />
                    </div>
                    <div className='w-full break-normal dark:text-white'>{commentText}</div>
                </div>
            </div>
        </>
    )
}


const Comment = (props) => {

    const { postID } = props

    const authToken = localStorage.getItem('auth-token')

    const context = useContext(MainContext)

    const { createNewComment, commentingStatus, commentUploaded } = context;

    const [commentTextInput, setCommentTextInput] = useState("")

    const uploadComment = (e) => {
        e.preventDefault()
        setCommentTextInput("")
        createNewComment(postID, commentTextInput)
    }

    // handling comment apis

    const pageLimitComment = 7

    const [commentData, setCommentData] = useState([])
    const [totalComment, setTotalComment] = useState(0)

    const fetchCommentsByPostID = () => {

        let pageNo = Math.ceil(commentData.length / pageLimitComment) + 1;

        fetch(`${SERVER_URL}comment/fetch-comment-of-post/${postID}/${pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })
            .then(res => res.json())
            .then((newData) => {

                const mergeData = [...commentData, ...newData.commentList]
                setCommentData(mergeData)
                setTotalComment(newData.commentListSize)

            })
            .catch((err) => console.error(err))

    }

    useEffect(() => {
        fetchCommentsByPostID()
    }, [postID])

    const fetchMoreCommentData = () => {
        fetchCommentsByPostID()
    }


    return (
        <>

            <form method='POST' onSubmit={uploadComment} className='bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full flex items-center py-0.5 md:px-2 md:py-1 w-full'>
                <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
                <input value={commentTextInput} onChange={e => setCommentTextInput(e.target.value)} className='px-2 md:px-4 bg-transparent w-full focus:outline-none dark:text-white' type="text" placeholder='Add a comment...' required />
                <button type="submit" className='text-[#573698] dark:text-white/70 rounded-full hover:scale-105 duration-200 px-1.5'>
                    <SendIcon style={{ fontSize: 30 }} />
                </button>
            </form>

            <div id='commentDiv' className='y-2 flex flex-col gap-1 h-[60vh] overflow-y-auto w-full'>

                {
                    commentData.length ?

                        <InfiniteScroll
                            dataLength={commentData.length}
                            next={fetchMoreCommentData}
                            hasMore={commentData.length < totalComment}
                            className='flex flex-col h-full items-center justify-center'
                            scrollableTarget="commentDiv"
                        >

                            {
                                commentData.length ?
                                    commentData?.map((data) => {

                                        return (

                                            <CommentItem key={data._id} data={data} />

                                        )

                                    })
                                    :
                                    <div className='flex w-full justify-center'>
                                        <CircularProgress className='text-black dark:text-white' />
                                    </div>
                            }

                        </InfiniteScroll>

                        :

                        <div className='w-full h-full flex flex-col gap-2 items-center text-black dark:text-white opacity-50 justify-center'>
                            <CommentIcon />
                            <div className='text-black dark:text-white'>
                                No Comments
                            </div>
                        </div>

                }

            </div>
        </>
    )
}

export default Comment
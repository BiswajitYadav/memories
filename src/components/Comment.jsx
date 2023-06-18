import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@mui/material/CircularProgress';
import CommentIcon from '@mui/icons-material/Comment';
import { SERVER_URL } from '../services/helper';
import ReactTimeago from 'react-timeago';
import { useContext } from 'react';
import MainContext from '../context/MainContext';

const CommentItem = (props) => {

    const authToken = localStorage.getItem('auth-token')

    const { _id, userID, commentText, postID, date } = props.data;

    const { refresh } = props;

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

    const handleDeleteComment = async () => {

        await fetch(`${SERVER_URL}comment/delete`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ commentID: _id })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    refresh()
                }
            })

    }

    return (
        <>
            <div className='flex items-center justify-between gap-2 w-full'>
                <div className="flex items-center gap-2 py-3 md:px-2 ">
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
                {
                    userID === sessionUserID ?
                        <IconButton onClick={handleDeleteComment} className='dark:text-white text-black opacity-50 hover:opacity-100 transition-all duration-300'>
                            <DeleteIcon />
                        </IconButton>
                        : null
                }
            </div>
        </>
    )
}


const Comment = (props) => {

    const { postID } = props

    const authToken = localStorage.getItem('auth-token')

    const context = useContext(MainContext)

    const { createNewComment, commentingStatus, commentUploaded, userProfileData } = context;

    const [commentTextInput, setCommentTextInput] = useState("")

    // handling comment apis

    const pageLimitComment = 7

    const [commentData, setCommentData] = useState([])
    const [totalComment, setTotalComment] = useState(0)

    const fetchCommentsByPostID = (refresh) => {

        let pageNo = Math.ceil(commentData.length / pageLimitComment) + 1;

        fetch(`${SERVER_URL}comment/fetch-comment-of-post/${postID}/${refresh ? 1 : pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })
            .then(res => res.json())
            .then((newData) => {

                refresh ? setCommentData(newData.commentList) : setCommentData([...commentData, ...newData.commentList])

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

    const uploadComment = (e) => {
        e.preventDefault()
        createNewComment(postID, commentTextInput)
        setCommentTextInput("")
        setInterval(() => {
            fetchCommentsByPostID(true)
        }, 2000);
    }


    return (
        <>

            <form method='POST' onSubmit={uploadComment} className='bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full flex items-center py-0.5 md:px-2 md:py-1 w-full'>

                <Avatar className='my-auto' alt={userProfileData.name?.slice(0, 1)} src={userProfileData.profileURL} sx={{ width: 45, height: 45 }} />

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

                                            <CommentItem key={data._id} data={data} refresh={() => fetchCommentsByPostID(true)} />

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
import { Avatar, IconButton, ListItemIcon, Modal, Menu, MenuItem, Tooltip, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { Link, useNavigate } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CloseIcon from '@mui/icons-material/Close';
import Like from '../components/Like';
import Comment from '../components/Comment'
import { useContext } from 'react';
import MainContext from '../context/MainContext';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import ReactTimeago from 'react-timeago';
import { SERVER_URL } from '../services/helper';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import ReadMoreReact from 'read-more-react';
import InfiniteScroll from 'react-infinite-scroll-component'
import PeopleProfile from './PeopleProfile';
import ImageLoader from './Loader/ImageLoader';

const MyPost = (props) => {

    const authToken = localStorage.getItem('auth-token')

    const sessionUserID = sessionStorage.getItem('sessionUserID')

    const { postImageURL, postCaption, date, postType, _id } = props.data;

    const context = useContext(MainContext)

    const { userProfileData, setNotification, fetchMyAllPost, handleStaticPostRemove, sessionPartner } = context;

    const { name, email, profileURL, gender, userName, bio } = userProfileData;

    const [editedPostCaption, setEditedPostCaption] = useState(postCaption)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [deleteModal, setDeleteModal] = useState(false)
    const handleDeleteModalOpen = () => setDeleteModal(true)
    const handleDeleteModalClose = () => setDeleteModal(false)

    const [editModal, setEditModal] = useState(false)
    const handleEditModalOpen = () => setEditModal(true)
    const handleEditModalClose = () => setEditModal(false)

    const [likeModalOpen, setLikeModalOpen] = useState(false);
    const handleLikeModalOpen = () => setLikeModalOpen(true);
    const handleLikeModalClosed = () => setLikeModalOpen(false);


    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const handleCommentModalOpen = () => setCommentModalOpen(true);
    const handleCommentModalClosed = () => setCommentModalOpen(false);

    const [readMore, setReadMore] = useState(false)

    const [postTypeInput, setPostTypeInput] = useState(postType)
    const [postCaptionInput, setPostCaptionInput] = useState(postCaption)

    const [editButtonInfo, setEditButtonInfo] = useState("Save")

    const handlePostEdit = async (e) => {

        e.preventDefault()
        setEditedPostCaption(postCaptionInput)
        setEditButtonInfo("Saving...")
        const response = await fetch(`${SERVER_URL}post/edit/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify({ 'postType': postTypeInput, 'postCaption': postCaptionInput })
        })

        const json = await response.json()

        if (json.success) {
            setEditButtonInfo("Save")
            setNotification({ status: "true", message: "Post Updated", type: "info" })
            handleEditModalClose()
        } else {
            setNotification({ status: "true", message: `${json.error}`, type: "error" })
        }

    }

    const handleDeletePost = async () => {

        const response = await fetch(`${SERVER_URL}post/user/delete-post/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        });

        const json = await response.json()

        if (json.success) {
            setNotification({ status: "true", message: "Post Deleted", type: "success" })
            handleStaticPostRemove(_id)
            handleDeleteModalClose()
        } else {
            setNotification({ status: "true", message: `${json.error}`, type: "error" })
        }

    }

    // setting up the like part

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [likeStatus, setLikeStatus] = useState(Boolean)

    const fetchLikeStatus = async () => {

        const response = await fetch(`${SERVER_URL}like/fetch-like-status`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "postID": _id })
        })

        const json = await response.json()

        if (json.success) {
            setLikeStatus(true)
        } else {
            setLikeStatus(false)
        }

    }

    const handleLikeDislike = async () => {

        const response = await fetch(`${SERVER_URL}like/like-dislike`, {
            method: 'POST',
            headers: {
                'auth-token': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "postID": _id })
        })

        const json = await response.json()

        if (json.success) {
            fetchLikeStatus()
        } else {
            fetchLikeStatus()
        }

    }

    const pageLimitLike = 7

    const [likeData, setLikeData] = useState([])

    const [totalLikeData, setTotalLikeData] = useState(0)

    const fetchAllLikes = async () => {

        let pageNo = Math.ceil(likeData.length / pageLimitLike) + 1;

        fetch(`${SERVER_URL}like/fetch-like-post/${_id}/${pageNo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })
            .then(res => res.json())
            .then((newData) => {
                const mergeData = [...likeData, ...newData.likesPost]
                setLikeData(mergeData)
                setTotalLikeData(newData.allLikesPost)
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        fetchAllLikes()
    }, [])

    const fetchMoreLikeData = () => {
        fetchAllLikes()
    }

    // 

    useEffect(() => {
        fetchLikeStatus()
    }, [])

    useEffect(() => {

    }, [editedPostCaption])

    return (
        <>
        
            <div className='flex flex-col bg-white dark:bg-[#231344] h-max w-full justify-center items-center rounded-md shadow-lg px-2 sm:px-5 py-4 sm:py-5 gap-3 scroll-smooth'>

                <div className='flex w-full justify-between'>

                    <div className='flex w-full content-start gap-2'>
                        <Avatar className='my-auto' alt={name?.slice(0, 1)} src={profileURL} sx={{ width: 45, height: 45 }} />
                        <div className='flex flex-col justify-center'>
                            <div className='flex gap-1'>

                                <div className='dark:text-white font-semibold text-sm'>{name}</div>

                                {
                                    sessionPartner?.verificationType == "dev" ?
                                        <Tooltip title="Developer" className="text-gray-400 my-auto">
                                            <VerifiedIcon style={{ fontSize: 16 }} />
                                        </Tooltip>
                                        : sessionPartner?.verificationType == "celeb" ?
                                            <Tooltip title="Public Figure" className="text-blue-400 my-auto">
                                                <VerifiedIcon style={{ fontSize: 16 }} />
                                            </Tooltip>
                                            : sessionPartner?.verificationType == "org" ?
                                                <Tooltip title="Organization" className="text-yellow-400 my-auto">
                                                    <VerifiedIcon style={{ fontSize: 16 }} />
                                                </Tooltip>
                                                : null
                                }

                            </div>
                            <div className=' text-slate-400 text-xs'>@{userName}</div>
                        </div>
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

                        <div className='dark:bg-[#231344] rounded-md bg-white dark:text-white -m-2 p-2 duration-300'>

                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <ShareIcon className='dark:text-white' style={{ fontSize: 25 }} />
                                </ListItemIcon>
                                <p className='font-semibold text-[16px]'>Share</p>
                            </MenuItem>

                            <MenuItem onClick={() => {
                                handleClose()
                                handleEditModalOpen()
                            }}>

                                <ListItemIcon>
                                    <EditIcon className='dark:text-white' style={{ fontSize: 25 }} />
                                </ListItemIcon>
                                <p className='font-semibold text-[16px]'>Edit</p>

                            </MenuItem>

                            <MenuItem onClick={() => {
                                handleClose()
                                handleDeleteModalOpen()
                            }}>
                                <ListItemIcon>
                                    <DeleteIcon className='dark:text-white' style={{ fontSize: 25 }} />
                                </ListItemIcon>
                                <p className='font-semibold text-[16px]'>Delete</p>
                            </MenuItem>

                        </div>

                    </Menu>

                    <Modal
                        open={editModal}
                        onClose={handleEditModalOpen}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="flex justify-center items-center"
                    >

                        <form onSubmit={handlePostEdit} method='POST' className=' h-max max-h-max w-[90%] md:w-[60%] bg-white dark:bg-[#231344] lg:w-[40%] rounded-md dark:text-white'>

                            <div className='flex py-4 px-5 items-center justify-between font-bold border-b'>
                                <div>Edit Post</div>
                                <IconButton onClick={handleEditModalClose}>
                                    <CloseIcon className='dark:text-white' />
                                </IconButton>
                            </div>
                            <div className='py-4 w-full flex gap-4 flex-col px-5'>

                                <select
                                    name="postType"
                                    value={postTypeInput}
                                    onChange={e => setPostTypeInput(e.target.value)}
                                    className='dark:bg-[#1C1132] bg-[#F1F1F1] dark:text-white rounded cursor-pointer text-sm px-2 py-1 w-max shadow-md'
                                >
                                    <option className='px-2 py-1' value="public">Public</option>
                                    <option className='px-2 py-1' value="private">Private</option>
                                </select>

                                <textarea
                                    value={postCaptionInput}
                                    onChange={e => setPostCaptionInput(e.target.value)}
                                    className=' w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] bg-[#F1F1F1] dark:text-white dark:border-[#33215A]' placeholder='Write Post Caption...' cols="30" rows="3"
                                >
                                </textarea>

                            </div>
                            <div className='px-5 py-5 flex gap-2 w-full'>

                                <button type='submit' className='bg-[#901EC7] text-center w-full rounded-md text-white'>
                                    {editButtonInfo}
                                </button>

                                <div onClick={handleEditModalClose} className='py-2 w-full bg-slate-200 rounded-md text-black hover:bg-slate-300 text-center duration-300 cursor-pointer'>
                                    Cancel
                                </div>

                            </div>

                        </form>
                    </Modal>

                    <Modal
                        open={deleteModal}
                        onClose={handleDeleteModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="flex justify-center items-center"
                    >

                        <div className=' h-max max-h-max w-[90%] md:w-[60%] bg-white dark:bg-[#231344] lg:w-[40%] rounded-md dark:text-white'>

                            <div className='flex py-4 px-5 items-center justify-between font-bold border-b'>
                                <div>Confirm Delete</div>
                                <IconButton onClick={handleDeleteModalClose}>
                                    <CloseIcon className='dark:text-white' />
                                </IconButton>
                            </div>
                            <div className='py-2 px-5'>
                                After this, the post will be permanently deleted and once you delete it, you won't be able to recover the post.
                            </div>
                            <div className='px-5 py-5 flex gap-2 w-full'>
                                <button onClick={handleDeletePost} className='py-2 w-full bg-red-500 rounded-md text-white hover:bg-red-600 duration-300'>
                                    Delete
                                </button>
                                <button onClick={handleDeleteModalClose} className='py-2 w-full bg-slate-200 rounded-md text-black hover:bg-slate-300 duration-300'>
                                    Cancel
                                </button>
                            </div>
                        </div>

                    </Modal>

                </div>

                {
                    postImageURL ?
                        <Link className='w-full min-h-max max-h-[60vh] bg-black rounded-md' to={`/post/${props.postID}`}>

                            <ImageLoader src={postImageURL} />

                        </Link> :
                        null
                }


                <div className='dark:text-white w-full flex whitespace-pre-wrap font-medium px-1 my-1'>

                    {/* <ReadMoreReact text={editedPostCaption}
                        min={0}
                        ideal={260}
                        max={300}
                        readMoreText={<div className='hover:underline cursor-pointer pt-2'>Read More...</div>}
                        className="whitespace-pre-line"

                    /> */}

                    {editedPostCaption}

                </div>

                <div className='dark:text-white/50 font-semibold gap-2 text-black/50 w-full flex text-xs items-center px-1'>

                    <ReactTimeago date={date} />

                    {
                        postType === "public" ?
                            <Tooltip title="public" className="text-gray-400 my-auto">
                                <PublicIcon style={{ fontSize: 16 }} />
                            </Tooltip>
                            :
                            <Tooltip title="private" className="text-gray-400 my-auto">
                                <PublicOffIcon style={{ fontSize: 16 }} />
                            </Tooltip>
                    }

                </div>

                <div className='flex gap-3 w-full items-center'>

                    <Tooltip title={!likeStatus ? "Like" : "Liked"} className="text-red-600 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">

                        <Checkbox
                            color='error'
                            onChange={(e) => {
                                setLikeStatus(e.target.checked)
                                handleLikeDislike()
                            }}

                            checked={likeStatus}

                            icon={<FavoriteBorder color='error' style={{ fontSize: 33 }} />}
                            checkedIcon={<Favorite style={{ fontSize: 33 }} />} />

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

                        <div className='py-3 px-2 md:px-3 md:p-4 h-max md:w-[80%] lg:py-3 bg-white w-full dark:bg-[#231344] lg:w-[65%] xl:w-[50%] rounded-lg'>

                            <div className='bg-white dark:bg-[#231344] w-full'>

                                <div className='flex dark:text-white items-center py-1 justify-between px-4'>

                                    <div className='flex px-3 gap-2 cursor-default'>
                                        <div className='font-semibold text-lg text-gray-500 dark:text-white'>Comments</div>
                                    </div>

                                    <button className='flex justify-end py-1 '>
                                        <CloseIcon onClick={handleCommentModalClosed} />
                                    </button>

                                </div>

                                <Comment postID={_id} />

                            </div>
                        </div>

                    </Modal>

                    <button onClick={handleLikeModalOpen} className='dark:text-white text-xs flex hover:underline duration-200'>Liked By {totalLikeData} people</button>

                    <Modal
                        open={likeModalOpen}
                        onClose={handleLikeModalClosed}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="flex justify-center items-center"
                    >
                        <div className='py-3 px-3 md:p-4 h-[60%] w-[90%] md:w-[60%] lg:px-5 lg:py-3 bg-white dark:bg-[#231344] lg:w-[40%] rounded-lg'>
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

                                <div id='scrollableDiv' className='flex flex-col overflow-y-auto h-[45vh] scroll-smooth '>

                                    {
                                        likeData.length ?

                                            <InfiniteScroll
                                                dataLength={likeData.length}
                                                next={fetchMoreLikeData}
                                                hasMore={likeData.length < Number(totalLikeData)}
                                                className='flex flex-col h-full items-center justify-center'
                                                scrollableTarget="scrollableDiv"
                                            >

                                                {
                                                    likeData.length ?
                                                        likeData?.map((data) => {

                                                            return (

                                                                <Like key={data._id} data={data} />

                                                            )

                                                        })
                                                        :
                                                        <div className='flex w-full justify-center'><CircularProgress className='text-black dark:text-white' /></div>
                                                }

                                            </InfiniteScroll>

                                            :

                                            <div className='w-full h-full flex flex-col gap-2 items-center text-red-600 opacity-50 justify-center'>
                                                <FavoriteIcon />
                                                <div className='text-black dark:text-white'>
                                                    No likes
                                                </div>
                                            </div>

                                    }


                                </div>

                            </div>
                        </div>
                    </Modal>

                </div>



                <form className='bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full flex items-center px-2 py-1 w-full'>
                    <input className='p-1 px-2 md:px-8 bg-transparent w-full focus:outline-none dark:text-white' type="text" placeholder='Write a comment...' />
                    <button className='text-[#573698] dark:text-white/70 rounded-full hover:scale-105 duration-200'>
                        <SendIcon style={{ fontSize: 30 }} />
                    </button>
                </form>
            </div >
        </>
    )
}

export default MyPost
import { Avatar, Checkbox, IconButton, ListItemIcon, Menu, MenuItem, Modal, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import Like from '../Like';
import Comment from '../Comment';
import LogoutComponent from '../LogoutComponent';
import { useContext } from 'react';
import MainContext from '../../context/MainContext';
import { useEffect } from 'react';
import { SERVER_URL } from '../../services/helper';

import PublicOffIcon from '@mui/icons-material/PublicOff';
import PublicIcon from '@mui/icons-material/Public';
import ReactTimeago from 'react-timeago';
import { CLOUD_NAME } from './../../services/cloudinary';
import ReadMoreReact from 'read-more-react';
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@mui/material/CircularProgress';
import PeopleProfile from '../PeopleProfile';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkIcon from '@mui/icons-material/Link';


const Post = (props) => {

  const commentTextLength = 150

  const authToken = localStorage.getItem('auth-token')

  const sessionUserID = sessionStorage.getItem('sessionUserID')

  const { userID, postCaption, _id, postImageURL, date, postType } = props.data;

  const postID = props.data._id

  const context = useContext(MainContext)

  const { createNewComment, commentingStatus, commentUploaded, setNotification } = context;

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [likeModalOpen, setLikeModalOpen] = useState(false);
  const handleLikeModalOpen = () => setLikeModalOpen(true);
  const handleLikeModalClosed = () => setLikeModalOpen(false);

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const handleCommentModalOpen = () => setCommentModalOpen(true);
  const handleCommentModalClosed = () => setCommentModalOpen(false);

  const [shareModalOpen, setShareModalOpen] = useState(false)
  const handleShareOpen = () => setShareModalOpen(true)
  const handleShareClose = () => setShareModalOpen(false)

  const [reportModal, setReportModal] = useState(false);
  const handleReportModalOpen = () => setReportModal(true);
  const handleReportModalClose = () => setReportModal(false);

  const [userData, setUserData] = useState({})
  const [partnerData, setPartnerData] = useState({})

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
      setPartnerData(json.partner)
    }

  }

  const { name, userName, profileURL } = userData;

  const [redirectURL, setRedirectURL] = useState("")

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
      setNotification({ status: "true", message: `${json.error}`, type: "info" })
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

  // --------------------


  const [commentText, setCommentText] = useState("")

  const uploadComment = (e) => {
    e.preventDefault()
    setCommentText("")
    createNewComment(postID, commentText)

  }

  // ---------------------


  // handle post report apis
  const [reportText, setReportText] = useState("")

  const handlePostReport = async (e) => {

    e.preventDefault()

    const response = await fetch(`${SERVER_URL}report/post-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      },
      body: JSON.stringify({ "postID": postID, "reportText": reportText })
    })

    const json = await response.json()

    if (json.success) {
      handleReportModalClose()
      setNotification({ status: "true", message: `${json.message}`, type: "info" })
    } else {
      setNotification({ status: "true", message: `${json.error}`, type: "error" })
    }

  }
  // ----------------------

  useEffect(() => {
    if (userID === sessionUserID) {
      setRedirectURL(`/myprofile`)
    } else {
      setRedirectURL(`/profile/${userID}`)
    }
  }, [])

  useEffect(() => {
    fetchLikeStatus()
  }, [])

  useEffect(() => {
    fetchUserProfileData()
  }, [userID])


  return (
    <>
      <div className='flex flex-col bg-white dark:bg-[#231344] h-max w-full justify-center items-center rounded-md shadow-lg px-2 sm:px-5 py-4 md:py-5 gap-2 md:gap-3 mb-5'>

        <div className='flex w-full justify-between'>
          <Link to={redirectURL} className='flex w-max self-start gap-2'>
            <Avatar className='my-auto' alt={name?.slice(0, 1)} src={profileURL} sx={{ width: 45, height: 45 }} />
            <div className='flex flex-col justify-center'>
              <div className='flex gap-1'>

                <div className='dark:text-white font-semibold text-sm'>{name}</div>

                {
                  partnerData?.verificationType == "dev" ?
                    <Tooltip title="Developer" className="text-gray-400 my-auto">
                      <VerifiedIcon style={{ fontSize: 16 }} />
                    </Tooltip>
                    : partnerData?.verificationType == "celeb" ?
                      <Tooltip title="Public Figure" className="text-blue-400 my-auto">
                        <VerifiedIcon style={{ fontSize: 16 }} />
                      </Tooltip>
                      : partnerData?.verificationType == "org" ?
                        <Tooltip title="Organization" className="text-yellow-400 my-auto">
                          <VerifiedIcon style={{ fontSize: 16 }} />
                        </Tooltip>
                        : null
                }

              </div>
              
              <div className=' text-slate-400 text-xs'>@{userName}</div>

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
              <MenuItem onClick={() => {
                handleClose()
                handleShareOpen()
              }}>
                <ListItemIcon>
                  <ShareIcon className='text-blue-600' style={{ fontSize: 25 }} />
                </ListItemIcon>
                <p className='font-semibold text-[16px]'>Share</p>
              </MenuItem>
              <MenuItem onClick={() => {
                handleClose()
                handleReportModalOpen()
              }}>
                <ListItemIcon>
                  <ReportProblemIcon className='text-red-500' style={{ fontSize: 25 }} />
                </ListItemIcon>
                <p className='font-semibold text-[16px]'>Report</p>
              </MenuItem>
            </div>
          </Menu>

          <Modal
            open={shareModalOpen}
            onClose={handleShareOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-center items-center"
          >

            <div className=' h-max max-h-max bg-white dark:bg-[#231344] rounded-md dark:text-white'>

              <div className='flex py-2 px-5 items-center justify-between font-bold border-b'>

                <div>Share</div>

                <IconButton onClick={handleShareClose}>
                  <CloseIcon className='dark:text-white' />
                </IconButton>

              </div>

              <div className='py-5 px-10 flex gap-5'>

                <Tooltip title="Send Link">

                  <div className='flex flex-col gap-1.5 text-center justify-center'>

                    <a href={`whatsapp://send?text=Hey! %0Acheck this amazing post by ${name} %0A${window.location.href}post/${postID}`} className='m-auto rounded-full p-4 bg-[#D9D9D9] dark:bg-[#1C1132] text-black cursor-pointer dark:text-white w-max'>
                      <WhatsAppIcon fontSize='medium' className='' />
                    </a>

                    <div className='text-xs'>Send Link</div>

                  </div>

                </Tooltip>

                <Tooltip title="Copy Link">
                  <div className='flex flex-col gap-1.5 text-center justify-center'>
                    <div className='m-auto rounded-full p-4 bg-[#D9D9D9] dark:bg-[#1C1132] text-black cursor-pointer dark:text-white w-max'>
                      <LinkIcon fontSize='medium' />
                    </div>
                    <div className='text-xs'>Copy Link</div>
                  </div>
                </Tooltip>

              </div>

            </div>

          </Modal>

          <Modal
            open={reportModal}
            onClose={handleReportModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-center items-center"
          >

            <form method='POST' onSubmit={handlePostReport} className=' h-max max-h-max w-[90%] md:w-[60%] bg-white dark:bg-[#231344] lg:w-[40%] rounded-md dark:text-white'>

              <div className='flex py-4 px-5 items-center justify-between font-bold border-b'>

                <div>Report Post</div>

                <IconButton onClick={handleReportModalClose}>
                  <CloseIcon className='dark:text-white' />
                </IconButton>

              </div>

              <div className='py-2 px-5'>
                If you think this post is inappropriate for the platform or is violating any guidelines, you can report it. Your <b> user ID</b> will be collected and the moderation team will take appropriate action on the post.
              </div>

              <div className="py-2 px-5">

                <textarea
                  onChange={e => setReportText(e.target.value)}
                  className=' w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] bg-[#F1F1F1] dark:text-white dark:border-[#33215A]' placeholder='Explain the problem with this post...' cols="30" rows="3"
                  required
                >
                </textarea>

              </div>

              <div className='px-5 py-5 flex gap-2 w-full'>

                <button type='submit' className='bg-[#901EC7] text-center w-full rounded-md text-white'>
                  Report
                </button>

                <div onClick={handleReportModalClose} className='py-2 w-full text-center bg-slate-200 rounded-md text-black hover:bg-slate-300 duration-300 cursor-pointer'>
                  Cancel
                </div>

              </div>

            </form>

          </Modal>

        </div>

        {
          postImageURL ?
            <Link className='w-full min-h-max max-h-[60vh] bg-black rounded-md' to={`/post/${_id}`}>
              <img className='w-full object-contain min-h-full max-h-[60vh] rounded-md' src={postImageURL} alt="Image" />
            </Link> :
            ""
        }

        <div className='dark:text-white w-full flex whitespace-pre-wrap font-medium px-1 my-1'>

          {/* <ReadMoreReact
            text={postCaption}
            min={0}
            ideal={260}
            max={300}
            readMoreText={<div className='hover:underline cursor-pointer mt-2'>Read More...</div>}
            className="whitespace-pre-line"

          /> */}

          {postCaption}

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


          <Tooltip title={!likeStatus ? "Like" : "Dislike"} className="text-red-600 cursor-pointer transition-all ease-in-out hover:scale-110 duration-300">

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
            <button onClick={() => {
              handleCommentModalOpen()
            }}>
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


                <Comment postID={postID} />


              </div>
            </div>
          </Modal>

          <button onClick={handleLikeModalOpen} className='dark:text-white text-xs flex hover:underline duration-200'>Liked By {totalLikeData}</button>

          <Modal
            open={likeModalOpen}
            onClose={handleLikeModalClosed}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex justify-center items-center"
          >
            <div className='py-3 px-3 md:p-4 h-max w-[90%] md:w-[60%] lg:px-5 lg:py-3 bg-white dark:bg-[#231344] lg:w-[40%] rounded-lg'>
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

        <form method='POST' onSubmit={uploadComment} className='bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full flex items-center px-2 py-1 w-full'>

          <input value={commentText} onChange={e => setCommentText(e.target.value)} required maxLength={commentTextLength} className='px-2 md:px-8 bg-transparent w-full focus:outline-none dark:text-white' type="text" placeholder='Write a comment...' />

          <button type='submit' className=' text-[#573698] dark:text-white/70 rounded-full hover:scale-105 duration-200'>
            <SendIcon style={{ fontSize: 30 }} />
          </button>

        </form>

      </div>
    </>
  )
}

export default Post
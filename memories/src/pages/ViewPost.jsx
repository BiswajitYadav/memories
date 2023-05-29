import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Checkbox, Modal, Tooltip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import Like from '../components/Like';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MainContext from '../context/MainContext';
import { useEffect } from 'react';
import { SERVER_URL } from '../services/helper';
import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import ReactTimeago from 'react-timeago';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import InfiniteScroll from 'react-infinite-scroll-component'
import Comment from '../components/Comment';

const PostComment = () => {


  return (
    <>
      <div className='flex gap-2 py-1  md:px-2 w-full'>
        <Avatar className='' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
        <div className='flex flex-col w-full'>
          <div className='flex items-center gap-2 dark:text-white'>
            <Link to="/profile">
              <div className='font-semibold text-sm'>Rohit Kumar Pandit</div>
            </Link>
            <div className='text-xs'>2 days ago</div>
          </div>
          <div className='w-full break-normal dark:text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, molestias tempore infsadfasdgsdgsadga</div>
        </div>
      </div>
    </>
  )
}

const ViewPost = () => {

  const authToken = localStorage.getItem('auth-token')

  const history = useNavigate()

  const [likeModalOpen, setLikeModalOpen] = useState(false);
  const handleLikeModalOpen = () => setLikeModalOpen(true);
  const handleLikeModalClosed = () => setLikeModalOpen(false);

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const handleCommentModalOpen = () => setCommentModalOpen(true);
  const handleCommentModalClosed = () => setCommentModalOpen(false);

  const params = useParams()
  const { postID } = params;

  const [fetchedPostData, setFetchedPostData] = useState({})

  const fetchPostDataById = async () => {

    const response = await fetch(`${SERVER_URL}post/fetch-post/${postID}`, {
      method: 'POST',
      headers: {
        'auth-token': authToken,
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json()

    if (json) {
      setFetchedPostData(json)
    }
  }

  const { postImageURL, postType, postCaption, date, _id } = fetchedPostData;

  const userID = fetchedPostData.userID

  const sessionUserID = sessionStorage.getItem('sessionUserID')

  const [redirectURL, setRedirectURL] = useState("")

  const [userData, setUserData] = useState({})

  const [partnerData, setPartnerData] = useState({})

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
    if (_id) {
      fetchAllLikes()
    }
  }, [_id])

  const fetchMoreLikeData = () => {
    fetchAllLikes()
  }

  // 
  // 

  const { name, userName, profileURL } = userData;


  useEffect(() => {

    if (userID === sessionUserID) {
      setRedirectURL(`/myprofile`)
    } else {
      setRedirectURL(`/profile/${userID}`)
    }

  }, [userID])


  const fetchUserProfileData = async () => {

    const response = await fetch(`${SERVER_URL}user/get-profile-of/${userID}`, {
      method: 'POST',
      headers: {
        'auth-token': authToken,
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json()

    if (json.success) {
      setUserData(json.userProfile)
      setPartnerData(json.partner)
    }
  }


  // --------------------


  const [commentText, setCommentText] = useState("")

  const uploadComment = (e) => {
    e.preventDefault()
    setCommentText("")
    createNewComment(postID, commentText)

  }

  // ---------------------


  useEffect(() => {

    fetchPostDataById(postID)

    if (userID) {
      fetchUserProfileData()
      fetchLikeStatus()
    }

  }, [userID])


  return (
    <>
      <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-full'>

        <Header />

        <div className='bg-[#D9D9D9] dark:bg-[#1C1132] lg:h-[92vh] w-full overflow-y-auto flex justify-between py-4 px-2 sm:px-5 md:px-14 lg:px-12 xl:px-16'>

          <div className='bg-white dark:bg-[#231344] rounded-xl w-full flex flex-col lg:flex-row items-center shadow-lg'>

            <div className='h-full w-full rounded-t-xl lg:rounded-none lg:w-[65%] xl:w-[75%] bg-black lg:rounded-l-xl'>
              <div className='px-3 md:px-5 py-2 md:py-3 absolute'>
                <button onClick={e => {
                  history(-1)
                }} className='p-2 text-[#D9D9D9] rounded-full duration-200 hover:bg-white hover:shadow-lg hover:outline-2'>
                  <ArrowBackIcon />
                </button>
              </div>
              <div className='py-4'>

                <img className='h-[70vh] lg:h-[80vh] xl:h-[83vh] w-full object-contain rounded-md' src={postImageURL} alt="Image" />

              </div>
            </div>

            <div className='h-full w-full lg:w-[35%] xl:w-[25%] px-3 py-3 xl:py-6 flex flex-col gap-5 lg:gap-2 xl:gap-4'>

              <Link to={redirectURL} className='flex w-max self-start gap-2'>
                <Avatar className='my-auto' alt={name?.slice(0, 1)} src={profileURL} sx={{ width: 45, height: 45 }} />
                <div className='flex flex-col justify-center'>
                  <div className='flex gap-1'>
                    <div className='dark:text-white font-semibold text-sm'>{name}</div>
                    {
                      partnerData?.verificationType === "dev" ?
                        <Tooltip title="Developer" className="text-gray-400 my-auto">
                          <VerifiedIcon style={{ fontSize: 16 }} />
                        </Tooltip>
                        : partnerData?.verificationType === "celeb" ?
                          <Tooltip title="Public Figure" className="text-blue-400 my-auto">
                            <VerifiedIcon style={{ fontSize: 16 }} />
                          </Tooltip>
                          : partnerData?.verificationType === "org" ?
                            <Tooltip title="Organization" className="text-yellow-400 my-auto">
                              <VerifiedIcon style={{ fontSize: 16 }} />
                            </Tooltip>
                            : null
                    }
                  </div>
                  <div className=' text-slate-400 text-xs'>@{userName}</div>
                </div>
              </Link>

              <div className='dark:text-white w-full flex font-medium px-1 whitespace-pre-line'>
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

                <button onClick={handleLikeModalOpen} className='dark:text-white text-xs flex hover:underline duration-200'>Liked by {totalLikeData}</button>
                <Modal
                  open={likeModalOpen}
                  onClose={handleLikeModalClosed}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="flex justify-center items-center"
                >
                  <div className='py-3 px-3 md:p-4 h-max md:w-[70%] lg:px-5 lg:py-3 bg-white w-full dark:bg-[#231344] lg:w-[40%] rounded-lg'>
                    <div className='bg-white dark:bg-[#231344]'>
                      <div className='flex justify-between dark:text-white'>

                        <div className='flex items-center gap-1 py-3 lg:py-5'>

                          <div className='font-semibold text-lg'>Liked By</div>
                          <div className='text-red-600'><FavoriteIcon /></div>

                        </div>

                        <button onClick={handleLikeModalClosed} >

                          <CloseIcon />

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
                <input className='px-2 bg-transparent w-full focus:outline-none dark:text-white' type="text" placeholder='Write a comment...' />
                <button className=' text-[#573698] dark:text-white/70 rounded-full hover:scale-105 duration-200'>
                  <SendIcon style={{ fontSize: 30 }} />
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewPost
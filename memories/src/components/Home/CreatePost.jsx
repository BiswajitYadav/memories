import { Avatar, CircularProgress, IconButton, Modal, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MainContext from '../../context/MainContext';
import { useEffect } from 'react';
import { Close } from '@mui/icons-material';
import { CLOUDINARY_URL, CLOUD_NAME, UPLOAD_PRESET } from '../../services/cloudinary';
import { SERVER_URL } from '../../services/helper';

const CreatePost = (props) => {

    const context = useContext(MainContext)
    const { userProfileData, fetchAllPostHomePage, setNotification } = context;

    const [uploadStatus, setUploadStatus] = useState(false)

    const [caption, setCaption] = useState("")
    const [postType, setPostType] = useState("public")

    const [image, setImage] = useState(null)
    const [imgUrl, setImgUrl] = useState("")

    const { profileURL, name } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [buttonStatus, setButtonStatus] = useState(true)

    const removeImage = () => {
        setImage(null)
        setImgUrl(null)
    }


    const onImageInputChange = (e) => {
        setImage(e.target.files[0])
        setImgUrl(URL.createObjectURL(e.target.files[0]))
    }


    const handleUploadPost = async (e) => {

        e.preventDefault()

        if (image) {

            setUploadStatus(true)

            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", `${UPLOAD_PRESET}`)
            data.append("cloud_name", `${CLOUD_NAME}`)

            const imgUpload = await fetch(`${CLOUDINARY_URL}`, {
                method: 'POST',
                body: data
            });

            const jsonData = await imgUpload.json()

            if (jsonData.url) {

                const postUpload = await fetch(`${SERVER_URL}post/create`, {
                    method: 'POST',
                    headers: {
                        "auth-token": localStorage.getItem("auth-token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "postImageURL": jsonData.url, "postType": postType, "postCaption": caption })
                })

                const json = await postUpload.json()

                if (json.success) {
                    setNotification({ status: "true", message: "Posted", type: "info" })
                    setUploadStatus(false)
                    setCaption("")
                    setPostType("public")
                    setImage(null)
                    setImgUrl("")
                    handleClose()
                }

            } else {
                setUploadStatus(false)
                setImage(null)
                setImgUrl("")
                setNotification({ status: "true", message: "Heavy file upload less than 10MB", type: "error" })
            }

        } else {

            const postUpload = await fetch(`${SERVER_URL}post/create`, {
                method: 'POST',
                headers: {
                    "auth-token": localStorage.getItem("auth-token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "postType": postType, "postCaption": caption })
            })

            const json = await postUpload.json()

            if (json.success) {
                setNotification({ status: "true", message: "Posted", type: "info" })
                setUploadStatus(false)
                setCaption("")
                setPostType("public")
                handleClose()
            }

        }

    }


    useEffect(() => {
        if (image || caption) {
            setButtonStatus(true)
        } else {
            setButtonStatus(false)
        }
    }, [image, caption])


    return (

        <>
            <div className='flex bg-white dark:bg-[#231344] h-[15%] justify-center items-center rounded-md shadow-lg p-2 lg:p-3 gap-2'>

                <Link to="/myprofile">
                    <Avatar className='my-auto' alt="Travis Howard" src={profileURL} sx={{ width: 45, height: 45 }} />
                </Link>
                <div className='bg-transparent rounded-full flex items-center w-full'>

                    <button className='bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full dark:text-white/60 w-full px-3 py-1.5 lg:px-5 lg:py-2.5 text-[#B5B5B5] lg:text-lg ' onClick={handleOpen} >
                        Write Something to get Butterflies
                    </button>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="flex justify-center items-center"
                    >
                        <div className=' h-max max-h-max w-[90%] md:w-[70%] bg-white dark:bg-[#231344] lg:w-[40%] rounded-md'>

                            <div className='flex items-center py-2 px-5 border-b border-black/20 dark:border-white/40 '>
                                <div className='w-full font-bold text-lg dark:text-white'>Create Post</div>
                                <Tooltip title="Cancel">
                                    <IconButton onClick={() => {
                                        handleClose()
                                        setCaption("")
                                        setImage(null)
                                        setImgUrl("")
                                    }}>
                                        <Close className='dark:text-white' />
                                    </IconButton>
                                </Tooltip>
                            </div>

                            <form method='POST' onSubmit={handleUploadPost} className='flex flex-col gap-2 px-5 pb-5 pt-2'>

                                <div className='flex items-center gap-2'>
                                    <Avatar src={profileURL} alt={name?.slice(0, 1)} />
                                    <div className='flex flex-col'>
                                        <div className='font-semibold dark:text-white'>{name}</div>
                                        <select onChange={e => setPostType(e.target.value)} value={postType} name="postType" className='dark:bg-[#1C1132] bg-[#F1F1F1] dark:text-white rounded cursor-pointer text-sm px-1.5 w-max shadow-md py-1 border dark:border-[#33215A]'>
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>
                                </div>

                                <textarea onChange={e => setCaption(e.target.value)} value={caption} className=' w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] bg-[#F1F1F1] dark:text-white dark:border-[#33215A]' placeholder='Write something to post' cols="30" rows="2" maxLength={1000}>
                                </textarea>

                                <div className='text-sm opacity-50 dark:text-white'>{caption.length} / 1000</div>

                                <label htmlFor="dropzone-file" className="bg-[#F1F1F1] w-full rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]" >
                                    <input id="dropzone-file" onChange={onImageInputChange} type="file" accept='image/*' className="hidden" />
                                    <div className="relative rounded-full select-none flex flex-col gap-5">
                                        {
                                            imgUrl ?

                                                <img src={imgUrl} className='object-contain h-max max-h-72 rounded-md' alt="" />

                                                :
                                                <div className="flex flex-col py-10 rounded-2xl">
                                                    <CloudUploadIcon className='m-auto text-[#B5B5B5]' fontSize='large' />
                                                    <p className="m-auto text-sm font-semibold text-[#B5B5B5]">Click to select an image</p>
                                                </div>
                                        }
                                    </div>
                                </label>

                                <div className='flex flex-col gap-2'>
                                    {
                                        imgUrl ?
                                            <div onClick={removeImage} className="bg-[#FF0000] text-center rounded-md text-white py-1.5 cursor-pointer w-full">REMOVE IMAGE</div>
                                            : ""
                                    }

                                    <button disabled={!buttonStatus} type='submit' className={buttonStatus ? "bg-[#901EC7] text-center rounded-md text-white py-1.5" : "bg-slate-300 text-center cursor-not-allowed rounded-md text-black py-1.5"}>
                                        {
                                            uploadStatus ?
                                                <CircularProgress color="inherit" size={20} />
                                                :
                                                "POST"
                                        }
                                    </button>
                                </div>

                            </form>
                        </div>
                    </Modal>
                </div >
            </div >
        </>

    )
}

export default CreatePost
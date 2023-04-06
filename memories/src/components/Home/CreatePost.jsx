import { Avatar, Modal } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className='flex bg-white dark:bg-[#231344] h-[15%] justify-center items-center rounded-md shadow-lg p-2 lg:p-3 gap-2'>
                <Link to="/myprofile">
                    <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
                </Link>
                <div className='bg-transparent rounded-full flex items-center w-full'>
                    <button className='bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full dark:text-white w-full px-3 py-1.5 lg:px-5 lg:py-2.5 text-[#B5B5B5] lg:text-lg' onClick={handleOpen} >
                        Write Something to get Butterflies
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="flex justify-center items-center"
                    >
                        <div className='py-5 px-3 md:p-5 md:w-[70%] lg:p-10 bg-white w-full  lg:w-[40%] rounded-lg'>
                            <form className='flex flex-col'>
                                <label for="dropzone-file" className="bg-white w-full" >
                                    <div className="relative rounded-full select-none flex flex-col gap-5">
                                        <textarea className='px-5 rounded-full py-1.5 bg-[#D9D9D9]' placeholder='Write something to post' name="" id="" cols="30" rows="1"></textarea>
                                        <div className="flex flex-col py-10 rounded-2xl bg-[#D9D9D9]">
                                            <CloudUploadIcon className='m-auto text-[#B5B5B5]' fontSize='large' />
                                            <p className="m-auto text-sm font-semibold text-[#B5B5B5]">Click to select an image</p>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <button className="bg-[#FF0000] rounded-full text-white py-1.5">REMOVE IMAGE</button>
                                            <button className="bg-[#901EC7] rounded-full text-white py-1.5">POST</button>
                                        </div>
                                    </div>
                                    <input id="dropzone-file" type="file" accept='image/*' className="hidden" />
                                </label>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default CreatePost
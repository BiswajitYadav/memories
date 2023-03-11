import { Avatar, Modal } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className='hidden md:flex bg-white dark:bg-[#231344] h-[15%] justify-center items-center rounded-md shadow-lg p-3 gap-2'>
            <Link to="/myprofile">
                <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />
            </Link>
            <div className='bg-transparent rounded-full flex items-center w-full'>
                <button onClick={handleOpen} className='w-full rounded-full'>
                    <input className='p-2 bg-[#D9D9D9] dark:bg-[#1C1132] rounded-full dark:text-white w-full px-8 py-3 focus:outline-none' type="text" placeholder='Write Something to get Butterflies...' />
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="flex justify-center items-center"
                >
                    <div className='p-10 bg-white w-[40%]'>
                        <form className='flex flex-col'>
                            <label for="dropzone-file" className="bg-slate-200 w-full" >
                                <div className="relative rounded-full select-none flex">
                                    
                                    <PhotoCameraIcon className='m-auto' fontSize='large' />
                                </div>
                                <input id="dropzone-file" type="file" accept='image/*' className="hidden" />
                            </label>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default CreatePost
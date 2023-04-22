import { Avatar, Modal, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RenderUserProfile from '../RenderUserProfile';

const PostReportComponent = () => {

    const [postDeleteOpen, setPostDeleteOpen] = useState(false);
    const handlePostDeleteOpen = () => setPostDeleteOpen(true);
    const handlePostDeleteClose = () => setPostDeleteOpen(false);

    return (
        <>
            <div className='flex flex-col h-max py-3 rounded-md duration-300 cursor-default hover:bg-[#1C1132] hover:text-white'>
                <div className='flex w-full justify-around'>
                    <div className='flex gap-2'>
                        <Avatar className='my-auto' alt="Travis Howard" src="https://www.w3schools.com/howto/img_avatar.png " sx={{ width: 45, height: 45 }} />

                        <div className='flex flex-col justify-center'>
                            <div className='flex gap-1'>
                                <div className='font-semibold text-sm'>Rohit Kumar Pandit</div>
                                <Tooltip title="Developer" className="text-gray-400 my-auto">
                                    <VerifiedIcon style={{ fontSize: 16 }} />
                                </Tooltip>
                            </div>
                            <div className=' text-slate-400 text-xs'>Rohit64Bit</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='font-semibold -my-1.5'>User ID</div>
                        <div className='text-gray-400 text-sm'>wserc3w4ce4432874cdf</div>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='font-semibold -my-1.5'>Post ID</div>
                        <div className='text-gray-400 text-sm'>wserc3w4ce4432874cdf</div>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='font-semibold -my-1.5'>Likes</div>
                        <div className='text-gray-400 text-sm'>23424</div>
                    </div>
                    <div className='flex items-center gap-8'>
                        <button onClick={handlePostDeleteOpen}>
                            <DeleteIcon />
                        </button>
                        <Modal
                            open={postDeleteOpen}
                            onClose={handlePostDeleteClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            className="flex justify-center items-center"
                        >
                            <div className='py-3 px-2 md:px-3 md:p-4 h-[60%] bg-white w-[30%] rounded-md'>

                                <div className='bg-white'>

                                    <div className='flex flex-col h-[46vh] py-8'>

                                        <RenderUserProfile />
                                        <div className='pt-6 flex flex-col gap-2 items-center px-5'>
                                            <button className='w-full bg-slate-200 text-black hover:bg-[#1C1132] py-2 xl:py-3 duration-300 hover:text-white text-lg font-semibold rounded-lg'>DELETE POST</button>
                                            <button onClick={handlePostDeleteClose} className='w-full bg-slate-200 text-black hover:bg-[#1C1132] py-2 xl:py-3 duration-300 hover:text-white text-lg font-semibold rounded-lg'>Cancel</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <button>
                            <OpenInNewIcon />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostReportComponent
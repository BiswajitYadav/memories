import React, { useState } from 'react'
import logo from '../assets/image/memories_logo.png'
import { Link } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


const UploadProfileImage = () => {
    return (
        <>
            <div className="w-full h-max flex gap-3 lg:gap-5">
                <label for="dropzone-file" className="rounded-full" >
                    <div className="relative rounded-full select-none">
                        <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" alt="" className='w-32 rounded-full' />
                        <div className='inset-0 z-10 absolute h-full w-full bg-black bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-100 duration-300 text-white flex items-center rounded-full cursor-pointer'><PhotoCameraIcon className='m-auto' /></div>
                    </div>
                    <input id="dropzone-file" type="file" accept='image/*' className="hidden" />
                </label>
                <p className='text-xs lg:text-sm opacity-60 dark:text-white text-black flex-wrap h-full items-center flex '>NOTE: Click on the image to add Profile Picture</p>
            </div>
        </>
    )
}

const CreateProfileInfo = () => {
    return (
        <>
            <div className='h-screen bg-[#D9D9D9] dark:bg-[#1C1132] lg:flex px-5 md:px-10 xl:px-[8%] py-3'>
                <div className='lg:flex p-4 lg:flex-col my-auto lg:justify-center gap-2 lg:w-[50%] xl:w-[40%] cursor-default select-none h-full hidden '>
                    <img className='w-12 lg:w-16 text-center justify-center' src={logo} alt="logo" />
                    <div className='hidden lg:block justify-center dark:text-white lg:text-2xl font-semibold xl:text-3xl lg:font-bold'>Complete Your Profile</div>
                    <div className='hidden dark:text-white w-[70%] text-lg lg:block'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                </div>

                <div className='xl:w-[60%] lg:w-[40%] h-full duration-300 flex flex-col dark:text-white lg:flex-row lg:my-auto justify-center p-1 sm:p-3 lg:p-5'>
                    <div className='lg:hidden'>
                        <img className='w-12 lg:w-16 text-center justify-center' src={logo} alt="logo" />
                        <div className='justify-center dark:text-white font-semibold text-xl lg:text-3xl lg:font-bold'>Complete Your Profile</div>
                        <div className=' dark:text-white w-full lg:block text-xs'>We take care of your data with security as we have mentioned in our <Link className='underline font-semibold'> privacy policy.</Link></div>
                    </div>
                    <div className='flex flex-col h-full justify-center gap-8'>
                        <UploadProfileImage />
                        <div>
                            <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Date Of Birth</p>
                            <input type="date" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                        </div>
                        <div>
                            <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Gender</p>
                            <select className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'>
                                <option value="Male">Male</option>
                                <option value="Male">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <button className="bg-[#901EC7] py-2 font-bold text-xl text-white bg-gradient-to-bl from-[#573698] to-[#9013C9] rounded-3xl hover:scale-105 duration-300">CONFIRM</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProfileInfo
import React from 'react'
import Header from '../components/Header'
import SideBarNav from '../components/SideBarNav'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const UploadProfileImage = () => {
  return (
    <>
      <div className="w-full h-max flex justify-between gap-5">
        <label for="dropzone-file" className="rounded-full" >
          <div className="relative rounded-full select-none">
            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80" alt="" className='w-32 h-32 rounded-full' />
            <div className='inset-0 z-10 absolute h-full w-full bg-black bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-100 duration-300 text-white flex items-center rounded-full cursor-pointer'><PhotoCameraIcon className='m-auto' /></div>
          </div>
          <input id="dropzone-file" type="file" accept='image/*' className="hidden" />
        </label>
        <p className='text-xs opacity-60 dark:text-white lg:hidden flex-wrap w-[40%] '>NOTE: Click on the image to change the Profile Picture</p>
      </div>
    </>
  )
}

const EditProfile = () => {
  return (
    <>
      <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-screen'>
        <Header />
        <div className='bg-[#D9D9D9] dark:bg-[#1C1132] overflow-y-auto h-max lg:h-[92vh] w-screen flex justify-between gap-x-5 py-3 px-2 sm:px-5 md:px-9 md:py-5 lg:px-5 xl:px-16'>
          <div className='bg-white dark:bg-[#231344] dark:shadow-black rounded-xl w-full flex shadow-lg'>
            <SideBarNav />
            <div className='p-4 md:p-5 lg:py-2 xl:p-10 w-full h-full'>
              <UploadProfileImage />
              <form action="" className='py-5 lg:py-3 w-full lg:h-[60%] xl:h-[75%] flex flex-col lg:flex-row-reverse gap-4'>
                <div className='lg:w-[50%] flex flex-col gap-1 xl:gap-2'>
                  <div>
                    <p className='pl-2 md:pl-5 text-xs dark:text-white'>Email</p>
                    <div className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'>
                      test@farzi.com
                    </div>
                  </div>
                  <div>
                    <p className='pl-2 md:pl-5 text-xs dark:text-white'>User ID</p>
                    <div className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'>
                      test@farzi.com
                    </div>
                  </div>
                  <div className='px-1 py-3 flex-col gap-2 hidden'>
                    <div className='font-semibold dark:text-white'>Social Links</div>
                    <div className=' flex flex-col gap-3 py-1'>
                    <input type="text" placeholder='Instagram' className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                    <input type="text" placeholder='Facebook' className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                    <input type="text" placeholder='Github' className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                    <input type="text" placeholder='Discord' className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                    </div>
                  </div>
                </div>
                <div className='lg:w-[50%] flex flex-col gap-1 xl:gap-2'>
                  <div>
                    <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Name</p>
                    <input type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                  </div>
                  <div>
                    <p className='pl-2 lg:pl-5 text-xs dark:text-white'>User Name</p>
                    <input type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                  </div>
                  <div>
                    <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Bio</p>
                    <input type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                  </div>
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

                  <button className='bg-[#8948B8] w-full text-white py-2 my-4 hover:bg-[#8E2BC2] duration-200 font-semibold rounded-md'>UPDATE PROFILE</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile
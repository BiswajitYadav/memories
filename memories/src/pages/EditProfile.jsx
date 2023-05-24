import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import SideBarNav from '../components/SideBarNav'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MainContext from '../context/MainContext';
import { useNavigate } from 'react-router-dom';
import SampleProfileImage from '../assets/image/sample-profile.webp'
import { SERVER_URL } from '../services/helper';
import { CLOUDINARY_URL, CLOUD_NAME, UPLOAD_PRESET } from '../services/cloudinary';
import Compressor from 'compressorjs';
import { CircularProgress } from '@mui/material'

const EditProfile = () => {

  const context = useContext(MainContext)

  const navigate = useNavigate()

  const { setNotification, userProfileData, fetchSessionUserProfile } = context;

  const { _id, name, email, profileURL, gender, userName, DOB, bio } = userProfileData;

  const [editProfileLoader, setEditProfileLoader] = useState(false)
  
  const [uploadImageLoader, setUploadImageLoader] = useState(false)

  const [image, setImage] = useState(null)

  const [imgUrl, setImgUrl] = useState(profileURL || SampleProfileImage)

  const [credentials, setCredentials] = useState({
    name: name,
    userName: userName,
    bio: bio,
    DOB: DOB?.slice(0, 10),
    gender: gender
  })

  const [uploadedImageUrl, setUploadedImageUrl] = useState("")

  const onImageInputChange = async (e) => {
    setImage(e.target.files[0])
    setImgUrl(URL.createObjectURL(e.target.files[0]))
  }


  const handleChangeProfile = async () => {

    new Compressor(image, {
      quality: 0.6,
      success: (compressedResult) => {


        const data = new FormData()
        data.append("file", compressedResult)
        data.append("upload_preset", `${UPLOAD_PRESET}`)
        data.append("cloud_name", `${CLOUD_NAME}`)

        fetch(`${CLOUDINARY_URL}`, {
          method: 'POST',
          body: data
        }).then(res => res.json())
          .then(data => {

            if (data) {

              fetch(`${SERVER_URL}user/edit-user-profile`, {
                method: 'PUT',
                headers: {
                  'auth-token': localStorage.getItem("auth-token"),
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "profileURL": data.url
                })
              })
                .then(res => res.json())
                .then(json => {
                  if (json.success) {
                    fetchSessionUserProfile()
                    setImage(null)
                    setNotification({ status: "true", message: `${json.message}`, type: "success" })
                  } else {
                    setNotification({ status: "true", message: "Something went wrong", type: "error" });
                  }
                })
            }

          })
      }
    })

  }



  const onFormInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  const handleEditProfileSubmit = async (e) => {

    e.preventDefault()

    const mainData = {
      "name": credentials.name,
      "userName": credentials.userName,
      "bio": credentials.bio,
      "DOB": credentials.DOB,
      "gender": credentials.gender
    }

    const response = await fetch(`${SERVER_URL}user/edit-user-profile`, {
      method: 'PUT',
      headers: {
        'auth-token': localStorage.getItem("auth-token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mainData)
    })

    const json = await response.json()

    if (json.success) {
      fetchSessionUserProfile()
      setNotification({ status: "true", message: `${json.message}`, type: "success" })
    } else {
      setNotification({ status: "true", message: `${json.error}`, type: "error" });
    }

  }


  useEffect(() => {
  }, [image])

  return (
    <>
      <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-full'>

        <Header />

        <div className='bg-[#D9D9D9] dark:bg-[#1C1132] overflow-y-auto h-max lg:h-[92vh] w-full flex justify-between gap-x-5 py-3 px-2 sm:px-5 md:px-9 md:py-5 lg:px-5 xl:px-16'>

          <div className='bg-white dark:bg-[#231344] dark:shadow-black rounded-xl w-full flex shadow-lg'>

            <SideBarNav />

            <form onSubmit={handleEditProfileSubmit} method='POST' className='p-4 md:p-5 lg:py-2 xl:p-10 w-full h-full'>

              <div className="w-full h-max flex items-center gap-3 lg:gap-5">

                <label htmlFor="dropzone-file" className="rounded-full" >

                  <div className="relative rounded-full select-none">

                    <img src={imgUrl} alt="" className=' rounded-full object-cover w-28 h-28 md:w-32 md:h-32 lg:w-24 lg:h-24 xl:w-32 xl:h-32' />

                    <div className='inset-0 z-10 absolute h-full w-full bg-black bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-100 duration-300 text-white flex items-center rounded-full cursor-pointer'>

                      <PhotoCameraIcon className='m-auto' />

                    </div>

                  </div>

                  <input onChange={onImageInputChange} id="dropzone-file" type="file" accept='image/*' className="hidden" />

                </label>

                <div className='text-xs lg:text-sm dark:text-white text-black flex-col h-full flex w-[40%] '>

                  <div className='opacity-60'>
                    NOTE: Click on the image to add Profile Picture
                  </div>

                  {
                    image ?
                      <button className='bg-[#8948B8] w-max text-white py-2 px-4 my-4 hover:bg-[#8E2BC2] duration-200 font-semibold rounded-md' onClick={handleChangeProfile}>
                        UPLOAD IMAGE
                      </button>
                      :
                      ""
                  }

                </div>

              </div>

              <div className='py-5 lg:py-3 w-full lg:h-[60%] xl:h-[75%] flex flex-col lg:flex-row-reverse gap-4'>

                <div className='lg:w-[50%] flex flex-col gap-1 xl:gap-2'>

                  <div>
                    <p className='pl-2 md:pl-5 text-xs dark:text-white'>Email</p>
                    <div className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'>
                      {email}
                    </div>
                  </div>

                  <div>
                    <p className='pl-2 md:pl-5 text-xs dark:text-white'>User ID</p>
                    <div className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'>
                      {_id}
                    </div>
                  </div>

                  <div className='px-1 py-3 flex-col gap-2 flex'>
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
                    <input
                      type="text"
                      name='name'
                      value={credentials.name}
                      onChange={onFormInputChange}
                      className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'
                    />
                  </div>

                  <div>
                    <p className='pl-2 lg:pl-5 text-xs dark:text-white'>User Name</p>
                    <input
                      type="text"
                      name='userName'
                      value={credentials.userName}
                      onChange={onFormInputChange}
                      className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'
                    />
                  </div>
                  <div>
                    <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Bio</p>
                    <textarea
                      type="text"
                      name="bio"
                      value={credentials.bio}
                      onChange={onFormInputChange}
                      rows="1"
                      className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'
                    />
                  </div>

                  <div>
                    <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Date Of Birth</p>
                    <input
                      type="date"
                      name='DOB'
                      value={credentials.DOB}
                      onChange={onFormInputChange}
                      className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'
                    />
                  </div>

                  <div>
                    <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Gender</p>
                    <select
                      name='gender'
                      value={credentials?.gender}
                      onChange={onFormInputChange}
                      className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'
                    >
                      <option value="null">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  <button className='bg-[#8948B8] w-full text-white py-2 my-4 hover:bg-[#8E2BC2] duration-200 font-semibold rounded-md'>UPDATE PROFILE</button>
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile
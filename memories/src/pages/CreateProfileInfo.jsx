import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/image/memories_logo.png'
import { Link, useNavigate } from 'react-router-dom';
import SampleProfileImage from '../assets/image/sample-profile.webp'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { SERVER_URL } from '../services/helper';
import MainContext from '../context/MainContext';
import { CLOUDINARY_URL, CLOUD_NAME, UPLOAD_PRESET } from '../services/cloudinary';

const CreateProfileInfo = () => {

    const context = useContext(MainContext)

    const navigate = useNavigate()

    const { setNotification } = context;

    const [image, setImage] = useState(null)

    const [imgUrl, setImgUrl] = useState(SampleProfileImage)

    const [DOB, setDOB] = useState("")

    const [gender, setGender] = useState("")

    const onImageInputChange = (e) => {
        setImage(e.target.files[0])
        setImgUrl(URL.createObjectURL(e.target.files[0]))
    }


    const handleProfileSubmit = async (e) => {

        e.preventDefault()

        if (image) {

            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", `${UPLOAD_PRESET}`)
            data.append("cloud_name", `${CLOUD_NAME}`)

            const imgURL = await fetch(`${CLOUDINARY_URL}`, {
                method: 'POST',
                body: data
            })

            const json = await imgURL.json()

            if (json.url) {

                const mainData = {
                    "DOB": DOB,
                    "gender": gender,
                    "profileURL": json.url
                }

                const response = await fetch(`${SERVER_URL}user/edit-user-profile`, {
                    method: 'PUT',
                    headers: {
                        'auth-token': sessionStorage.getItem("auth-token"),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(mainData)
                })

                const data = await response.json()

                if (data.success) {
                    setNotification({ status: "true", message: `${data.message}`, type: "success" })
                    localStorage.setItem("auth-token", sessionStorage.getItem("auth-token"))
                    navigate('/')
                } else {
                    setNotification({ status: "true", message: `${data.error}`, type: "error" });
                }

            } else {
                setNotification({ status: "true", message: "Something went wrong", type: "error" });
            }

        } else {

            const mainData = {
                "DOB": DOB,
                "gender": gender
            }

            const response = await fetch(`${SERVER_URL}user/edit-user-profile`, {
                method: 'PUT',
                headers: {
                    'auth-token': sessionStorage.getItem("auth-token"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mainData)
            })

            const json = await response.json()

            if (json.success) {
                setNotification({ status: "true", message: `${json.message}`, type: "success" })
                localStorage.setItem("auth-token", sessionStorage.getItem("auth-token"))
                navigate('/')
            } else {
                setNotification({ status: "true", message: `${json.error}`, type: "error" });
            }

        }

    }

    useEffect(() => {
    }, [image])


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

                    <form method='POST' onSubmit={handleProfileSubmit} className='flex flex-col h-full justify-center gap-8'>
                        <div className="w-full h-max flex gap-3 lg:gap-5">
                            <label htmlFor="dropzone-file" className="rounded-full" >
                                <div className="relative rounded-full select-none">
                                    <img src={imgUrl} alt="" className='rounded-full object-cover w-28 h-28 md:w-32 md:h-32 lg:w-24 lg:h-24 xl:w-32 xl:h-32' />
                                    <div className='inset-0 z-10 absolute h-full w-full bg-black bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-100 duration-300 text-white flex items-center rounded-full cursor-pointer'><PhotoCameraIcon className='m-auto' /></div>
                                </div>
                                <input onChange={onImageInputChange} id="dropzone-file" type="file" accept='image/*' className="hidden" />
                            </label>
                            <p className='text-xs lg:text-sm opacity-60 dark:text-white text-black flex-wrap h-full items-center flex '>NOTE: Click on the image to add Profile Picture</p>
                        </div>
                        <div>
                            <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Date Of Birth</p>
                            <input value={DOB} onChange={e => setDOB(e.target.value)} type="date" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                        </div>
                        <div>
                            <p className='pl-2 lg:pl-5 text-xs dark:text-white'>Gender</p>
                            <select value={gender} onChange={e => setGender(e.target.value)} className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]'>
                                <option value="null">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <button type='submit' className="bg-[#901EC7] py-2 font-bold text-xl text-white bg-gradient-to-bl from-[#573698] to-[#9013C9] rounded-3xl hover:scale-105 duration-300">CONFIRM</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateProfileInfo
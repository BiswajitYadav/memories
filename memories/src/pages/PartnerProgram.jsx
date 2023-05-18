import React, { useEffect } from 'react'
import Header from '../components/Header'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import MainContext from '../context/MainContext';
import { useContext } from 'react';
import { SERVER_URL } from '../services/helper';
import { useNavigate } from 'react-router-dom';


const PartnerProgram = () => {

    const history = useNavigate()

    const authToken = localStorage.getItem('auth-token')

    const context = useContext(MainContext)

    const { setNotification, userProfileData } = context;

    const { _id, name, email, profileURL, gender, userName, DOB, bio } = userProfileData;

    const [validatePartner, setValidatePartner] = useState(Boolean)

    const [partnerFormStatus, setPartnerFormStatus] = useState(Boolean)

    const [checked, setChecked] = useState(false)

    const [formData, setFormData] = useState({

        userID: _id,
        businessName: "",
        businessType: "",
        ownerName: "",
        email: "",
        website: "",
        instaLink: "",
        facebookLink: "",
        githubLink: "",
        discordLink: "",
        youtubeLink: "",
        otherLink: ""

    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const fetchPartnerStatus = async () => {

        const response = await fetch(`${SERVER_URL}verification/fetch-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        });

        const json = await response.json()

        if (json.notFound) {

            setValidatePartner(json.notFound)

        } else {

            setPartnerFormStatus(json.pendingStatus)

        }

    }

    const handleFormSubmit = async (e) => {

        e.preventDefault()

        const response = await fetch(`${SERVER_URL}verification/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify(formData)
        });

        const json = await response.json()

        if (json.success) {
            fetchPartnerStatus()
            setNotification({ status: "true", message: `${json.message}`, type: "success" })
        } else {
            fetchPartnerStatus()
            setNotification({ status: "true", message: `${json.error}`, type: "error" })
        }

    }

    useEffect(() => {
        fetchPartnerStatus()
    }, [])

    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-screen'>
                <Header />
                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] lg:h-[92vh] w-screen flex justify-between gap-x-5 py-3 px-2 sm:px-5 md:px-9 md:py-5 lg:px-5 xl:px-16'>
                    <div className='bg-white dark:bg-[#231344] dark:text-white dark:shadow-black rounded-xl w-full h-full lg:flex flex-col shadow-lg overflow-y-auto p-5'>

                        <div className='text-xl hidden lg:block font-semibold'>
                            <IconButton onClick={e => {
                                history(-1)
                            }} className='dark:text-white'>
                                <ArrowBackIcon />
                            </IconButton>

                            {
                                partnerFormStatus ? "Profile Settings" : "Apply for Partnership Program by filling the form."
                            }

                        </div>

                        {
                            validatePartner ?

                                <div className='h-full w-full lg:px-5 xl:px-10 hidden lg:flex dark:text-white lg:flex-col xl:flex-row'>

                                    <div className='w-full xl:w-[30%] my-auto text-sm flex flex-col gap-1 px-3 cursor-default'>
                                        <div className='flex flex-col gap-1 '>
                                            Here are some perks of being a partner:

                                            <div>
                                                <span className='font-semibold'>1. Verified Badge:</span> You will receive a verified badge on your profile and your posts will receive an extra boost, which will help you stand out from the crowd.</div>
                                            <div>
                                                <span className='font-semibold'>2. Priority Support:</span> Your reports and problems will be prioritized by the moderators, so you can receive quick and efficient support whenever needed.</div>
                                            <div>
                                                <span className='font-semibold'>3. Direct Contact:</span> You can contact the developers directly whenever you need to.</div>
                                            <div>
                                                <span className='font-semibold'>4. Monetization Opportunities:</span> In the future, we may also monetize the content of our partners, so you can earn money through monetization as well.</div>
                                            <div>
                                                <span className='font-semibold'>5. Increased Exposure:</span> As a partner, your business will receive increased exposure and visibility on our website, which can help you reach a larger audience and grow your business.</div>
                                            <div>
                                                <span className='font-semibold'>6. Partnership Promotion:</span> We will actively promote your partnership with our website through various marketing channels, which can help you gain more exposure and reach new customers.</div>
                                            Overall, becoming a partner with our website can provide numerous benefits and opportunities for your business.</div>
                                    </div>

                                    <form method='POST' onSubmit={handleFormSubmit} className='w-full xl:w-[70%] my-auto flex flex-col h-max'>

                                        <div className="flex gap-5">

                                            <div className='w-[50%] flex flex-col gap-4 py-4'>

                                                <div className='font-semibold text-lg'>Business Info</div>

                                                <input onChange={onChange} name="businessName" value={formData.businessName} placeholder='Business Name' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' required />

                                                <input onChange={onChange} name="businessType" value={formData.businessType} placeholder='Business Type' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' required />

                                                <input onChange={onChange} name="ownerName" value={formData.ownerName} placeholder='Owner Name' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' required />

                                                <input onChange={onChange} name="email" value={formData.email} placeholder='Email' type="email" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' required />

                                                <input onChange={onChange} name="website" value={formData.website} placeholder='Website' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                            </div>

                                            <div className='w-[50%] flex flex-col gap-4 py-4'>

                                                <div className='font-semibold text-lg'>Social Links</div>

                                                <input onChange={onChange} name="instaLink" value={formData.instaLink} placeholder='Instagram' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                                <input onChange={onChange} name="facebookLink" value={formData.facebookLink} placeholder='Facebook' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                                <input onChange={onChange} name="githubLink" value={formData.githubLink} placeholder='Github' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                                <input onChange={onChange} name="discordLink" value={formData.discordLink} placeholder='Discord' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                                <input onChange={onChange} name="youtubeLink" value={formData.youtubeLink} placeholder='Youtube' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                                <input onChange={onChange} name="otherLink" value={formData.otherLink} placeholder='Others' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                            </div>

                                        </div>

                                        <div className='flex justify-end '>
                                            <div className='w-full py-1 px-2 flex gap-2'>

                                                <div className='flex items-start py-1.5'>

                                                    <input value={checked} onChange={e => setChecked(e.target.checked)} className='scale-110' type="checkbox" />

                                                </div>

                                                <div className='font-semibold'>By submitting this form, you hereby confirm that all of the above information is correct and that it follows our terms and conditions.</div>

                                            </div>
                                        </div>

                                        <div className='py-3'>

                                            <button type='submit' disabled={!checked} className={checked ? 'font-semibold bg-[#0038FF] py-2 w-full text-white rounded-md' : 'font-semibold bg-slate-300 py-2 w-full text-slate-500 rounded-md cursor-not-allowed'}>SUBMIT REQUEST</button>

                                        </div>

                                    </form>

                                </div>

                                :

                                partnerFormStatus ?

                                    <div className='hidden lg:flex flex-col items-start w-full h-full'>
                                        <div className='m-auto text-lg opacity-60 font-bold'>
                                            You have applied for partnership program.
                                        </div>
                                    </div>

                                    :

                                    <div className='h-full w-full lg:px-5 xl:px-10 hidden lg:flex dark:text-white lg:flex-col xl:flex-row'>

                                        <div className='w-full xl:w-[50%] my-auto flex flex-col gap-1 px-3 cursor-default'>

                                            <div className='flex flex-col gap-1 '>

                                                <div className='font-bold text-lg'>Analytics</div>

                                                <div className='flex flex-row justify-around xl:flex-col'>

                                                    <div className='flex flex-col gap-1'>
                                                        <div className='font-bold'>Engagement Score</div>
                                                        <div>12121</div>
                                                    </div>

                                                    <div className='flex flex-col gap-1'>
                                                        <div className='font-bold'>Posts</div>
                                                        <div>12121</div>
                                                    </div>

                                                    <div className='flex flex-col gap-1'>
                                                        <div className='font-bold'>Followers</div>
                                                        <div>12121</div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <form method='POST' onSubmit={handleFormSubmit} className='w-full xl:w-[50%] my-auto flex flex-col h-max'>

                                            <div className='w-full flex flex-col gap-4 py-4'>

                                                <div className='font-semibold text-lg'>Social Links</div>

                                                <input onChange={onChange} name="instaLink" value={formData.instaLink} placeholder='Instagram' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                                <input onChange={onChange} name="githubLink" value={formData.githubLink} placeholder='Github' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                                <input onChange={onChange} name="discordLink" value={formData.discordLink} placeholder='Discord' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                                <input onChange={onChange} name="youtubeLink" value={formData.youtubeLink} placeholder='Youtube' type="url" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />

                                            </div>

                                            <div className='py-3'>

                                                <button type='submit' className='font-semibold bg-[#0038FF] py-2 w-full text-white rounded-md'>SUBMIT REQUEST</button>

                                            </div>

                                        </form>

                                    </div>

                        }


                        <div className='flex flex-col items-start w-full h-full lg:hidden'>
                            <IconButton className='dark:text-white'>
                                <ArrowBackIcon />
                            </IconButton>
                            <div className='m-auto text-lg opacity-60 font-bold'>
                                Please visit desktop site to apply for partner program.
                            </div>
                        </div>
                    </div>

                </div >
            </div >
        </>
    )
}

export default PartnerProgram
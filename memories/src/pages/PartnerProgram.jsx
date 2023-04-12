import React from 'react'
import Header from '../components/Header'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';


const PartnerProgram = () => {
    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-screen'>
                <Header />
                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] lg:h-[92vh] w-screen flex justify-between gap-x-5 py-3 px-2 sm:px-5 md:px-9 md:py-5 lg:px-5 xl:px-16'>
                    <div className='bg-white dark:bg-[#231344] dark:text-white dark:shadow-black rounded-xl w-full h-full lg:flex flex-col shadow-lg overflow-y-auto p-5'>

                        <div className='text-xl hidden lg:block font-semibold'>
                            <IconButton className='dark:text-white'>
                                <ArrowBackIcon />
                            </IconButton>
                            Apply for Partnership Program by filling the form.
                        </div>

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

                            <form className='w-full xl:w-[70%] my-auto flex flex-col h-max'>
                                <div className="flex gap-5">
                                    <div className='w-[50%] flex flex-col gap-4 py-4'>
                                        <div className='font-semibold text-lg'>Business Info</div>
                                        <input placeholder='Business Name' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Business Type' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Owner Name' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Email' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Phone' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Website' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                    </div>
                                    <div className='w-[50%] flex flex-col gap-4 py-4'>
                                        <div className='font-semibold text-lg'>Social Links</div>
                                        <input placeholder='Instagram' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Facebook' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Github' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Discord' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Youtube' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                        <input placeholder='Others' type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' />
                                    </div>
                                </div>
                                <div className='flex justify-end '>
                                    <div className='w-full py-1 px-2 flex gap-2'>
                                        <div className='flex items-start py-1.5'>
                                            <input className='scale-110' type="checkbox" />
                                        </div>
                                        <div className='font-semibold'>By submitting this form, you hereby confirm that all of the above information is correct and that it follows our terms and conditions.</div>
                                    </div>
                                </div>
                                <div className='py-3'>
                                    <button className='font-semibold bg-[#0038FF] py-2 w-full text-white rounded-md'>SUBMIT REQUEST</button>
                                </div>

                            </form>

                        </div>
                        <div className='flex flex-col items-start w-full h-full lg:hidden'>
                            <IconButton className='dark:text-white'>
                                <ArrowBackIcon />
                            </IconButton>
                            <div className='m-auto text-lg opacity-60 font-bold'>
                                Please visit desktop site to apply for partner program.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PartnerProgram
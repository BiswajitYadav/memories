import React from 'react'
import Header from './../components/Header';


const NotificationElement = (props) => {
    return (
        <div className='hover:bg-white duration-300 ease-in-out text-black dark:text-white hover:dark:bg-slate-900 w-full p-5 rounded-lg hover:shadow-lg select-none'>
            <strong>Hello World</strong> started following you.
        </div>
    )
}

const Notification = () => {
    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>
                <Header />
                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-screen flex justify-between gap-x-5 py-4 px-2 sm:px-5 md:px-16'>
                    <div className='bg-white dark:bg-[#231344] rounded-xl w-full flex px-5 md:px-10 py-3 md:py-6 shadow-lg'>
                        <div className='bg-[#F1F1F1] dark:bg-[#1C1132] rounded border-[2px] border-[#D9D9D9] dark:border-[#33215A] w-[95%] sm:w-[85%] md:w-[60%] p-3 mx-auto overflow-y-auto'>
                            <NotificationElement />
                            <NotificationElement />
                            <NotificationElement />
                            <NotificationElement />
                            <NotificationElement />
                            <NotificationElement />
                            <NotificationElement />
                            <NotificationElement />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification
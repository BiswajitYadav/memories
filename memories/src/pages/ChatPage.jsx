import React from 'react'
import Header from '../components/Header'
import ChatSection from '../components/Chat/ChatSection'

const ChatPage = () => {
    return (
        <>
            <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen'>
                <Header />
                <div className='bg-[#D9D9D9] dark:bg-[#1C1132] h-[92vh] w-screen flex justify-between gap-x-5 py-4 px-2 sm:px-5 md:px-16'>
                    <ChatSection />
                </div>
            </div>
        </>
    )
}

export default ChatPage
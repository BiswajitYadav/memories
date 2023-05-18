import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import SideBarNav from '../components/SideBarNav'
import MainContext from '../context/MainContext'
import { SERVER_URL } from '../services/helper'

const HelpAndSupport = () => {

  const context = useContext(MainContext)

  const { setNotification } = context;

  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")

  const [loading, setLoading] = useState(false)

  const handleSupportSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    const response = await fetch(`${SERVER_URL}report/contact-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ "subject": subject, "description": description })
    })

    const json = await response.json()

    if (json.success) {
      setLoading(false)
      setNotification({ status: "true", message: `${json.message}`, type: "info" })
    } else {
      setLoading(false)
      setNotification({ status: "true", message: `${json.error}`, type: "error" })
    }

  }


  return (
    <>
      <div className='bg-[#D9D9D9] dark:bg-slate-900 h-screen w-screen'>
        <Header />
        <div className='bg-[#D9D9D9] dark:bg-[#1C1132] overflow-y-auto h-max lg:h-[92vh] w-screen flex justify-between gap-x-5 py-3 px-2 sm:px-5 md:px-9 md:py-5 lg:px-5 xl:px-16'>
          <div className='bg-white dark:bg-[#231344] dark:shadow-black rounded-xl w-full flex shadow-lg'>
            <SideBarNav />
            <div className='h-full w-full p-5 md:p-8 xl:p-10 '>
              <div className='text-lg font-semibold dark:text-white'>
                Contact Support
              </div>
              <div className='text-xs md:text-sm text-[#797979]'>Note : This report will be sent to the developers team along with your user-id for moderation.</div>

              <form method='POST' onSubmit={handleSupportSubmit} className='flex flex-col py-5 gap-4 lg:w-[50%]'>

                <input onChange={e => setSubject(e.target.value)} value={subject} type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' placeholder='Subject' required />

                <textarea onChange={e => setDescription(e.target.value)} value={description} type="text" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' placeholder='Describe your issue' cols='6' rows='6' required />

                <button type='submit' className='bg-[#8948B8] w-full text-white py-2 hover:bg-[#8E2BC2] duration-200 font-semibold rounded-md'>
                  {
                    loading ? "Sending..." : "SEND REPORT"
                  }
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpAndSupport
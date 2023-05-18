import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import SideBarNav from '../components/SideBarNav'
import { SERVER_URL } from '../services/helper'
import MainContext from '../context/MainContext'

const UpdatePassword = () => {

  const context = useContext(MainContext)

  const { setNotification } = context

  const [warning, setWarning] = useState(false)

  const [warningText, setWarningText] = useState("")

  const [credentials, setCredentials] = useState({
    "password": "",
    "newPassword": "",
    "repeatPassword": ""
  })

  const onFormInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()

    if (credentials.newPassword === credentials.repeatPassword) {
      setWarning(false)

      const response = await fetch(`${SERVER_URL}auth/user/change-password`, {
        method: 'POST',
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "password": credentials.password,
          "newPassword": credentials.repeatPassword
        })
      });

      const json = await response.json()

      if (json.success) {
        setCredentials({
          "password": "",
          "newPassword": "",
          "repeatPassword": ""
        })
        setNotification({ status: "true", message: `${json.message}`, type: "success" })
      } else {
        setWarning(true)
        setWarningText(`${json.error}`)
      }

    } else {
      setWarning(true)
      setWarningText("New Password doesn't match")
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
                Update Password
              </div>
              <div className='text-xs md:text-sm text-[#797979]'>Note : Update your password if you think somebody else knows your password.</div>
              <form method='POST' onSubmit={handlePasswordUpdate} className='flex flex-col py-5 gap-4 lg:w-[50%]'>

                <input onChange={onFormInputChange} value={credentials.password} name='password' type="password" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' placeholder='Current Password' required/>

                <input onChange={onFormInputChange} value={credentials.newPassword} name='newPassword' type="password" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' placeholder='New Password' required/>

                <input onChange={onFormInputChange} value={credentials.repeatPassword} name='repeatPassword' type="password" className='bg-[#F1F1F1] w-full px-4 py-2 rounded-md border-[2px] border-[#D9D9D9] dark:bg-[#1C1132] dark:text-white dark:border-[#33215A]' placeholder='Repeat Password' required/>

                <p className='text-xs text-[#797979]'>Always choose a strong password</p>

                {
                  warning ?
                    <p className='duration-300 text-red-500 flex justify-center cursor-default'>{warningText}</p>
                    : ""
                }

                <button className='bg-[#8948B8] w-full text-white py-2 hover:bg-[#8E2BC2] duration-200 font-semibold rounded-md'>UPDATE PASSWORD</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword
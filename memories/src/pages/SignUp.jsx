import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/image/memories_logo.png'
import MainContext from './../context/MainContext';
import { useEffect, useState } from 'react';
import { SERVER_URL } from './../services/helper';

function SignUp() {

  let navigate = useNavigate();

  const context = useContext(MainContext)
  const { setNotification } = context;

  useEffect(() => {

    if (localStorage.getItem("auth-token")) {
      navigate('/')
    }

  }, [])

  const localTheme = localStorage.getItem("theme")

  useEffect(() => {
    if (localTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    else {
      document.documentElement.classList.remove("dark");
    }
  }, [localTheme]);

  const [passMatch, setPassMatch] = useState(false)


  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault()

    if (password != repeatPassword != "") {

      setPassMatch(true)

    } else {
      setPassMatch(false)

      const response = await fetch(`${SERVER_URL}auth/user/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "email": email, "password": password, "userName": userName, "name": name })
      })

      const json = await response.json()

      if (json.success) {
        setNotification({ status: "true", message: "Account Created", type: "success" })
        sessionStorage.setItem("auth-token", json.authToken)
        navigate('/authenticate')
      } else {
        console.log(json);
        setNotification({ status: "true", message: `${json.error}`, type: "error" })
      }

    }

  }

  return (
    <>

      <div className='lg:h-screen bg-[#D9D9D9] dark:bg-[#1C1132] lg:flex lg:items-center lg:justify-around lg:px-52'>

        <div className='flex justify-between mx-5 pt-5 lg:flex-col lg:justify-center lg:w-1/4 lg:gap-y-3'>
          <div className='w-8 text-center justify-center lg:w-48'>
            <img className='' src={logo} alt="logo" />
          </div>
          <div className='justify-center hidden lg:block dark:text-white font-semibold lg:text-4xl lg:font-bold'>The Memories</div>
          <div className='justify-center lg:hidden dark:text-white font-semibold lg:text-4xl lg:font-bold'>SignUp</div>
          <div className='hidden dark:text-white lg:block lg:text-xl '>keep your memoires alive and enjoy every moment</div>
        </div>

        <form onSubmit={handleSignupFormSubmit} method='POST' className="flex flex-col h-screen justify-center p-5 rounded-lg lg:w-1/3 2xl:justify-center duration-300">

          <div className='hidden text-black dark:text-white text-2xl font-semibold lg:block lg:px-5 lg:py-3 lg:mb-4 '>SignUp</div>
          <input className="px-5 py-3 mb-4 bg-transparent border-black dark:text-white border dark:border-white rounded-3xl" type="text" name='fullName' value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required />
          <input className="px-5 py-3 mb-4 bg-transparent border-black dark:text-white border dark:border-white rounded-3xl" type="text" name='userName' pattern="^[^\s]+$" value={userName} onChange={e => setUserName(e.target.value)} placeholder="User Name" required />
          <input className="px-5 py-3 mb-4 bg-transparent border-black dark:text-white border dark:border-white rounded-3xl" type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input className="px-5 py-3 mb-4 bg-transparent border-black dark:text-white border dark:border-white rounded-3xl" type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <input className="px-5 py-3 mb-4 bg-transparent border-black dark:text-white border dark:border-white rounded-3xl" type="password" name='repeatPassword' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} placeholder="Repeat Password" required />

          {passMatch ? <p className='text-red-500 font-medium animate-pulse duration-300 mb-4'>Password match failed !</p> : ""}

          <button className="bg-[#901EC7] p-3 font-bold text-xl text-white bg-gradient-to-bl from-[#573698] to-[#9013C9] rounded-3xl hover:scale-105 duration-300">SIGNUP</button>
          <Link to="/" className='text-md dark:text-white mt-4 underline underline-offset-2 flex justify-center lg:no-underline lg:hover:underline duration-300'>Already Have an Account ?</Link>

        </form>

      </div>
    </>
  )
}

export default SignUp
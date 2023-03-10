import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Chat from "./pages/Chat"
import Community from "./pages/Community"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import Notification from './pages/Notification';
import MyProfile from './pages/MyProfile';
import TwoFA from "./pages/TwoFA"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import EditProfile from "./pages/EditProfile"
import UpdatePassword from "./pages/UpdatePassword"
import HelpAndSupport from "./pages/HelpAndSupport"
import TermsAndCondition from "./pages/TermsAndCondition"
import UserProfile from "./pages/UserProfile"


function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/home" element={<Home />}></Route>
        <Route path="/community" element={<Community />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/myprofile" element={<MyProfile />}></Route>
        <Route path="/chat" element={<Chat />}>
          <Route path=":chatId" element={<Chat />} />
        </Route>

        <Route path="/authenticate" element={<TwoFA />}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/updatepassword" element={<UpdatePassword />}></Route>

        <Route path="/editprofile" element={<EditProfile />}></Route>
        <Route path="/help" element={<HelpAndSupport />}></Route>
        <Route path="/t&c" element={<TermsAndCondition />}></Route>
        
        <Route path="/profile" element={<UserProfile />}></Route>
      </Routes>
    </>
  )
}

export default App

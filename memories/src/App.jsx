import { useEffect, useState, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import * as React from 'react';
import LoadingScreen from "./components/LoadingScreen";


// pages
const Chat = React.lazy(() => import('./pages/Chat'))
const Community = React.lazy(() => import('./pages/Community'))
const Home = React.lazy(() => import("./pages/Home"))
const LogIn = React.lazy(() => import("./pages/LogIn"))
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
import ChatPage from "./pages/ChatPage"
import CreateProfileInfo from "./pages/CreateProfileInfo"
import PartnerProgram from "./pages/PartnerProgram"
import ViewMyPost from "./pages/ViewMyPost"
import ViewPost from "./pages/ViewPost"
// ---------


function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/home" element={
          <Suspense fallback={<LoadingScreen />}>
            <Home />
          </Suspense>
        }></Route>
        <Route path="/community" element={<Community />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/myprofile" element={<MyProfile />}></Route>
        <Route path="/chat">
          <Route path="/chat" element={<Chat />} />
          <Route path=":chatId" element={<ChatPage />} />
        </Route>

        <Route path="/authenticate" element={<TwoFA />}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/updatepassword" element={<UpdatePassword />}></Route>

        <Route path="/editprofile" element={<EditProfile />}></Route>
        <Route path="/help" element={<HelpAndSupport />}></Route>
        <Route path="/t&c" element={<TermsAndCondition />}></Route>
        <Route path="/partnerprogram" element={<PartnerProgram />}></Route>

        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/createprofile" element={<CreateProfileInfo />}></Route>

        <Route path="/mypost/:postID" element={<ViewMyPost />}></Route>
        <Route path="/post/:postID" element={<ViewPost />}></Route>
      </Routes>
    </>
  )
}

export default App

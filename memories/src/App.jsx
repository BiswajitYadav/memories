import { useEffect, useState, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import * as React from 'react';
import LoadingScreen from "./components/LoadingScreen";
import LoadingScreenGeneral from "./components/LoadingScreenGeneral";
import MainState from './context/MainState'
import NotificationSnackbar from "./components/NotificationSnackbar";
import UserPrivateRoute from "./routes/UserPrivateRoute";
import ScrollToTop from "./components/ScrollToTop";

// pages
const Chat = React.lazy(() => import('./pages/Chat'))
const Community = React.lazy(() => import('./pages/Community'))
const Home = React.lazy(() => import("./pages/Home"))
const LogIn = React.lazy(() => import("./pages/LogIn"))
const SignUp = React.lazy(() => import("./pages/SignUp"))
const Notification = React.lazy(() => import('./pages/Notification'))
const MyProfile = React.lazy(() => import('./pages/MyProfile'))
const TwoFA = React.lazy(() => import("./pages/TwoFA"))
const ForgetPassword = React.lazy(() => import("./pages/ForgetPassword"))
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"))
const EditProfile = React.lazy(() => import("./pages/EditProfile"))
const UpdatePassword = React.lazy(() => import("./pages/UpdatePassword"))
const HelpAndSupport = React.lazy(() => import("./pages/HelpAndSupport"))
const TermsAndCondition = React.lazy(() => import("./pages/TermsAndCondition"))
const UserProfile = React.lazy(() => import("./pages/UserProfile"))
const ChatPage = React.lazy(() => import("./pages/ChatPage"))
const CreateProfileInfo = React.lazy(() => import("./pages/CreateProfileInfo"))
const PartnerProgram = React.lazy(() => import("./pages/PartnerProgram"))
const ViewPost = React.lazy(() => import("./pages/ViewPost"))



function App() {

  return (
    <>

      <MainState>

        <ScrollToTop />

        <Routes>


          <Route path="/" element={
            <Suspense fallback={<LoadingScreen />}>
              <UserPrivateRoute>
                <Home />
              </UserPrivateRoute>
            </Suspense>
          }></Route>

          <Route path="/login" element={
            <Suspense fallback={<LoadingScreenGeneral />}>
              <LogIn />
            </Suspense>
          }></Route>



          <Route path="/signup" element={
            <Suspense fallback={<LoadingScreenGeneral />}>
              <SignUp />
            </Suspense>
          }></Route>

          <Route path="/authenticate" element={
            <Suspense fallback={<LoadingScreenGeneral />}>
              <TwoFA />
            </Suspense>
          }></Route>

          <Route path="/forgetpassword" element={
            <Suspense fallback={<LoadingScreenGeneral />}>
              <ForgetPassword />
            </Suspense>
          }></Route>

          <Route path="/resetpassword" element={
            <Suspense fallback={<LoadingScreenGeneral />}>
              <ResetPassword />
            </Suspense>
          }></Route>

          <Route path="/updatepassword" element={
            <Suspense fallback={<LoadingScreenGeneral />}>
              <UpdatePassword />
            </Suspense>
          }></Route>



          <Route path="/community" element={
            <Suspense fallback={<LoadingScreen />}>
              <Community />
            </Suspense>
          }></Route>

          <Route path="/notification" element={
            <Suspense fallback={<LoadingScreen />}>
              <Notification />
            </Suspense>
          }></Route>

          <Route path="/myprofile" element={
            <Suspense fallback={<LoadingScreen />}>
              <MyProfile />
            </Suspense>
          }></Route>

          <Route path="/chat">

            <Route path="/chat" element={
              <Suspense fallback={<LoadingScreen />}>
                <Chat />
              </Suspense>
            } />

            <Route path=":chatId" element={
              <Suspense fallback={<LoadingScreen />}>
                <ChatPage />
              </Suspense>
            } />

          </Route>

          <Route path="/editprofile" element={
            <Suspense fallback={<LoadingScreen />}>
              <EditProfile />
            </Suspense>
          }></Route>

          <Route path="/help" element={
            <Suspense fallback={<LoadingScreen />}>
              <HelpAndSupport />
            </Suspense>
          }></Route>

          <Route path="/t&c" element={
            <Suspense fallback={<LoadingScreen />}>
              <TermsAndCondition />
            </Suspense>
          }></Route>

          <Route path="/partnerprogram" element={
            <Suspense fallback={<LoadingScreen />}>
              <PartnerProgram />
            </Suspense>
          }></Route>

          <Route path="/profile/:userID" element={
            <Suspense fallback={<LoadingScreen />}>
              <UserProfile />
            </Suspense>
          }></Route>

          <Route path="/createprofile" element={
            <Suspense fallback={<LoadingScreen />}>
              <CreateProfileInfo />
            </Suspense>
          }></Route>

          <Route path="/post/:postID" element={
            <Suspense fallback={<LoadingScreen />}>
              <ViewPost />
            </Suspense>
          }></Route>

        </Routes>

        <NotificationSnackbar />

      </MainState>

    </>
  )
}

export default App

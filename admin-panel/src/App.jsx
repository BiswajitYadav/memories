import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import MainState from "./Context/MainState"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import User from "./pages/User"
import Post from "./pages/Post"
import Partnership from "./pages/Partnership"
import HelpReport from "./pages/HelpReport"
import SupportReport from "./pages/SupportReport"

function App() {

  return (
    <>
      <MainState>
        <div className="w-screen h-screen flex">
          <div className="w-max"><Sidebar /></div>
          <div className="flex flex-col w-full h-full">
            <div className="w-full h-max"><Header/></div>
            <div className="w-full h-full">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/user" element={<User />}></Route>
                <Route path="/post" element={<Post />}></Route>
                <Route path="/partnership" element={<Partnership />}></Route>
                <Route path="/helpreport" element={<HelpReport />}></Route>
                <Route path="/supportreport" element={<SupportReport />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </MainState>

    </>
  )
}

export default App

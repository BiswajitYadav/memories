import { Route, Routes } from "react-router-dom"
import ThemeContext from "./Contexts/ThemeContext/ThemeContext"
import Chat from "./pages/Chat"
import Community from "./pages/Community"
import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"


function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/community" element={<Community />}></Route>
          <Route path="/chat" element={<Chat />}>
            <Route path=":chatId" element={<Chat />} />
          </Route>
        </Routes>
    </>
  )
}

export default App

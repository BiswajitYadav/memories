import { Route, Routes } from "react-router-dom"
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
    </Routes>  
    </>
  )
}

export default App

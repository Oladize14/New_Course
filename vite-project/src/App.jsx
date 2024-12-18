import { Route, Routes } from "react-router-dom"
import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/loginPage"
import HomePage from "./Pages/HomePage"

function App() {
 
 return (
   <>
   <h1 className="text-red-700">Hello world</h1>
   <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
   </Routes>
  </>
 )
}

export default App

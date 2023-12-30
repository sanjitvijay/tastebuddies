import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import TopNavbar from "./components/TopNavbar";
import BottomNavbar from "./components/BottomNavbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <Router>
      <TopNavbar/>
      <main className="mx-4 mt-4">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/review' element={<Review/>}/>
          <Route path='/profile' element={<SignIn/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
        </Routes>
      </main>
      <BottomNavbar/>
    </Router>
  )
}

export default App;

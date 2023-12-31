import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNavbar from "./components/TopNavbar";
import BottomNavbar from "./components/BottomNavbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import EditReview from "./pages/EditReview";


function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <TopNavbar/>
      <div className="mx-4 mt-20">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/review' element={<PrivateRoute/>}>
            <Route path='/review' element={<Review/>}/>
          </Route>
          <Route path='/profile' element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/edit-review/:reviewId' element={<EditReview/>}/>
        </Routes>
      </div>
      <BottomNavbar/>
    </Router>
    </>
  )
}

export default App;

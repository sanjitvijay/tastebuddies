import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import TopNavbar from "./components/TopNavbar";
import BottomNavbar from "./components/BottomNavbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
function App() {
  return (
    <Router>
      <TopNavbar/>
      <main className="container mx-auto px-3">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/review' element={<Review/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </main>
      <BottomNavbar/>
    </Router>
  )
}

export default App;

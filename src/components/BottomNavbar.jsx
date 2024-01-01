import { CiUser } from "react-icons/ci";
import { IoStarOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

function BottomNavbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (route)=> {
        if(route === location.pathname){
            return true
        }
        else return false
    }
    return (
        <div className="btm-nav btm-nav-lg shadow-inner bg-white fixed bottom-0 left-0 z-50">
            <button 
                className={isActive('/') ? 'active bg-white' : undefined}
                onClick={()=>navigate('/')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className="btm-nav-label">Home</span>
            </button>
            <button 
                className={isActive('/review') ? 'active bg-white' : undefined}
                onClick={()=>navigate('/review')}
            >
                <IoStarOutline className="h-5 w-5" strokeWidth={1}/>
                <span className="btm-nav-label">Review</span>
            </button>
            <button 
                className={isActive('/profile') ? 'active bg-white' : undefined}
                onClick={()=>navigate('/profile')}
            >
                <CiUser className="h-5 w-5" strokeWidth={1}/>
                <span className="btm-nav-label">Profile</span>
            </button>
        </div>
    )
}

export default BottomNavbar
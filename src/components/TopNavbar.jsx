import { useNavigate } from "react-router-dom";

function TopNavbar() {
    const navigate = useNavigate()

    return (
        <div className="navbar bg-base-100 shadow-md bg-white">
            <div className="navbar-start"></div>
                <div 
                    className="navbar-center prose cursor-pointer" 
                    onClick={()=>navigate('/')}
                >
                    <h1>
                        <span className="text-primary">Taste</span>
                        <span className="text-secondary">Buddies</span>
                    </h1>
                </div>
            <div className="navbar-end"></div>
      </div>
    )
}

export default TopNavbar
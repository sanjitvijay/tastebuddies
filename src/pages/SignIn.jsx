import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const navigate = useNavigate()

    const onChange = e => {
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.id]: e.target.value,
        }))
    }
    return (
        <div>
            <div className="prose">
                <h1>Welcome Back!</h1>
            </div>

            <form>
                 <div className="relative mt-4 mb-4"> 
                    <input 
                        type="text" 
                        className="input-border input-lg bg-white w-full pl-12 pr-4 py-3 rounded-full" 
                        placeholder="Enter your email" 
                        id='email'
                        value={email}
                        onChange={onChange}
                    /> 
                    <div className="absolute inset-y-0 left-0 pl-4  
                                flex items-center  
                                pointer-events-none"> 
                        <HiOutlineMail size={25} color='red' strokeWidth={2.5}/>
                    </div> 
                </div> 

                <div className="relative"> 
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        className="input-border input-lg bg-white w-full pl-12 pr-4 py-3 rounded-full" 
                        placeholder="Enter your password" 
                        id='password'
                        value={password}
                        onChange={onChange}
                    /> 
                    <div className="absolute inset-y-0 left-0 pl-4  
                                flex items-center  
                                pointer-events-none"> 
                        <CiLock size={25} color='red' strokeWidth={2}/>
                    </div> 
                    <div 
                        className="absolute inset-y-0 right-0 pr-5  
                                flex items-center"
                    > 
                        <button 
                            className="btn btn-ghost rounded-full"
                            onClick={()=>setShowPassword((prevState)=>!prevState)}
                        >
                            {showPassword ?
                             <MdOutlineVisibilityOff size={30}/>
                            : <MdOutlineVisibility size={30}/>}
                        </button>
                    </div> 
                </div> 
            </form>

            <div className="pr-4 pt-4 pb-10">
                <Link to="/forgot-password" className="text-right">
                        <p className="text-secondary">Forgot Password?</p>
                </Link>
            </div>      

            <button className="btn btn-secondary prose">
                    <h2 className="text-base-100">Sign In</h2>
            </button>  
                
            <div className="flex justify-center items-center mt-10">
                <button 
                    className="btn btn-ghost prose"
                    onClick={()=>navigate('/sign-up')}>
                    <h3>Sign Up Instead</h3>
                </button>
            </div>

        </div>
    )
}

export default SignIn
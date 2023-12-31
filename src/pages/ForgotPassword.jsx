import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import {toast} from 'react-toastify'
import { HiOutlineMail } from "react-icons/hi"
function ForgotPassword() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const onChange = e => {
        setEmail(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try{
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            navigate('/sign-in')  
        }catch(error){
            toast.error("Could not send reset email")
        }
        toast.success('Email was sent')
    }
    return (
        <div>
            <div className="prose">
                <h1>Forgot Password</h1>
            </div>

            <form
                onSubmit={onSubmit}
            >
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
                                flex items-center"> 
                        <HiOutlineMail size={25} color='red' strokeWidth={3}/>
                    </div> 
                </div> 

                <Link to="/forgot-password" className="text-right">
                        <p className="text-secondary">Sign In</p>
                </Link>

                <button 
                    type='submit'
                    className="btn btn-secondary prose mt-5">
                    <h2 className="text-base-100">Send Reset Link</h2>
                </button> 
            </form>
        </div>
    )
}

export default ForgotPassword
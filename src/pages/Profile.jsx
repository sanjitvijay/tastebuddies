import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
function Profile() {
    const auth = getAuth()
    const navigate = useNavigate()

    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = formData

    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    const onSubmit = async() => {
        try{
            if(auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
            }

            const userRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, {
                name
            })
        }catch(error){
            toast.error("Could not update profile details")
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.id]: e.target.value
        }))
    }

    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div className="prose">
                    <h1>My Profile</h1>
                </div>

                <button className="btn btn-secondary" onClick={onLogout}>
                    <span className="text-white">Logout</span>
                </button>
            </div>

            <div className="flex items-center">
                <div className="prose mr-5">
                    <strong>Personal Details</strong>
                </div>

                <button className="btn btn-ghost rounded-full" 
                    onClick={()=>{
                        changeDetails && onSubmit()
                        setChangeDetails((prevState)=>!prevState)
                    }}>
                    <span className="text-primary">
                        {changeDetails ? 'done' : 'change'}
                    </span>
                </button>
            </div>

            <div className="profileCard mt-5">
                <form>
                    <input
                        type='text'
                        id='name'
                        className={!changeDetails ? 'profileName' : 'profileNameActive'}
                        disabled={!changeDetails}
                        value={name}
                        onChange={onChange}
                    />

                    <input
                        type='text'
                        id='email'
                        className='profileEmail' 
                        disabled={true}
                        value={email}
                        onChange={onChange}
                    />
                </form>
            </div>
        </>

    )
}

export default Profile
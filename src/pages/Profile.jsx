import { useState, useEffect } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { updateDoc, doc, collection, query, getDocs, orderBy, where, deleteDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ReviewGrid from "../components/ReviewGrid"
import Spinner from "../components/Spinner"
 

function Profile() {
    const auth = getAuth()
    const navigate = useNavigate()

    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = formData

    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    useEffect(()=> {
        const fetchReviews = async () => {
            try{
                const reviewsRef = collection(db, "reviews")
                const q = query(reviewsRef, where("userRef", '==', auth.currentUser.uid), orderBy("timestamp", "desc"))
                const querySnap = await getDocs(q)

                const reviews = []

                querySnap.forEach((doc)=>{
                    return reviews.push({
                        id: doc.id, 
                        data: doc.data()
                    })
                })

                setReviews(reviews)
                setLoading(false)
            }catch(error){
                //toast.error("Could not fetch reviews")
                console.log(error)
            }
        }

        fetchReviews()
    }, [auth.currentUser.uid])

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

    const onDelete = async (reviewId) => {
        if(window.confirm("Are you sure you want to delete?")){
            try{
                await deleteDoc(doc(db, 'reviews', reviewId))
                const updatedReviews = reviews.filter(
                    (review) => review.id !== reviewId
                )
                setReviews(updatedReviews)
                toast.success('Successfully deleted listing')
            }catch(error){
                toast.error("Could not delete review")    
            }
        }
    }

    if(loading){
        return <Spinner/>
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
            
            {reviews.length !== 0 && (
                <>
                    <div className="prose mt-5 mb-5">
                        <h2>My Reviews</h2>
                    </div>

                    <ReviewGrid reviews={reviews} onDelete={onDelete}/>     
                </>
            )}
        </>

    )
}

export default Profile
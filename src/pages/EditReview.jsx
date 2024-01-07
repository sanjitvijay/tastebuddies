import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import {toast} from 'react-toastify'
import { serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

function EditReview() {
    const [formData, setFormData] = useState({
        description: '',
        name: '',
        rating: 0,
        placeName: '',
        placeType: 'restaurant',
        price: null, 
    })
    const [loading, setLoading] = useState(false)
    const [review, setReview]= useState(false)
    
    const {
        name,
        description,
        rating,
        placeName,
        placeType,
        price,
    } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const params = useParams()
    const isMounted = useRef(true)

    useEffect(() => {
        if (review && review.userRef !== auth.currentUser.uid) {
          toast.error('You can not edit this listing')
          navigate('/')
        }
    })

    useEffect(()=>{
        setLoading(true)
        const fetchListing = async () => {
            const docRef = doc(db, "reviews", params.reviewId)
            const docSnap = await getDoc(docRef)
            
            if(docSnap.exists()){
                setReview(docSnap.data())
                setFormData(({...docSnap.data()}))
                setLoading(false)
            }else {
                navigate('/')
                toast.error("Review does not exist")
            }
        }

        fetchListing()
    // eslint-disable-next-line
    },[params.reviewId, navigate])

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
        if (user) {
            setFormData({ ...formData, userRef: user.uid })
        } else {
            navigate('/sign-in')
        }
        })
    }

    return () => {
        isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    const onMutate = (e) => {
    
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0],
          }))
        }
    
        // Text/Booleans/Numbers
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
          }))
        }
    }

    const ratingChanged = (newRating) => {
        setFormData((prevState) => ({
            ...prevState, 
            rating: newRating
        }))
    }

    const onSubmit = async(e) => {
        e.preventDefault()

        setLoading(true)

        if(name.length === 0){
            setLoading(false)
            toast.error("Enter a name for the food")
        }

        if(description.length < 25){
            setLoading(false)
            toast.error("Write a longer description")
            return
        }

        if(rating === 0){
            setLoading(false)
            toast.error("Enter a rating")
            return
        }

        if(placeName.length === 0){
            setLoading(false)
            toast.error("Enter a restaurant/dining hall name")
        }

        if((price === null || isNaN(price))&& placeType === 'restaurant'){
            setLoading(false)
            toast.error("Enter a valid price")
        }

        const hasPrice = placeType === 'restaurant' ? true : false 

        const formDataCopy = {
            ...formData, 
            hasPrice,
            timestamp: serverTimestamp()
        }

        hasPrice === false && delete formDataCopy.price

       try{
            const docRef = doc(db, "reviews", params.reviewId)
            await updateDoc(docRef, formDataCopy)
            setLoading(false)
            toast.success("Review successfully updated!")
            navigate('/')
       }catch(error){
            setLoading(false)
            console.log(error)
            console.log(formDataCopy)
            toast.error("Unable to update review")
       }
    }

    if(loading){
        return <Spinner/>
    }



    return (
        <div className="flex flex-col h-screen">
            <div className="prose">
                <h1>Edit Review</h1>
            </div>
            <form 
                className="form-control pb-24"
                onSubmit={onSubmit}
            >
                <label className="prose label mt-1">
                    <h3>Name</h3>
                </label>
                <input 
                    className="input input-secondary bg-white w-full"
                    type="text"
                    id='name'
                    value={name}
                    onChange={onMutate}
                    maxLength='50'
                    placeholder="Max 50 characters"
                    required
                />

                <label className="prose label mt-1">
                    <h3>Description</h3>
                </label>
                <textarea 
                    className="textarea textarea-secondary bg-white w-full"
                    type="text"
                    id='description'
                    value={description}
                    onChange={onMutate}
                    minLength='10'
                    maxLength='500'
                    placeholder="Max 500 characters"
                    required
                />

                <label className="prose label mt-1">
                    <h3>Rating</h3>
                </label>
                <div className="card bg-white p-3 w-40">
                    <div className="ml-1">
                        <ReactStars
                            isHalf={true}
                            size={25}
                            value={rating}
                            onChange={ratingChanged}
                        />
                    </div>
                </div>

                <label className="prose label mt-1">
                    <h3>Place</h3>
                </label>
                <div className="join join-horizontal">
                    <button 
                        type='button'
                        className={`btn join-item text-white ${placeType === 'restaurant' ? "btn-primary shadow-xl" : "btn-secondary"}`}
                        id='placeType'
                        value='restaurant'
                        onClick={onMutate}
                    >
                        Restaurant
                    </button>

                    <button 
                        type='button'
                        className={`btn join-item text-white ${placeType === 'dining hall' ? "btn-primary shadow-xl" : "btn-secondary"}`}
                        id='placeType'
                        value='dining hall'
                        onClick={onMutate}
                    >
                        Dining Hall
                    </button>
                </div>

                <label className="prose label mt-1">
                    <h3>{placeType === 'restaurant' ? 'Restaurant' : 'Dining Hall'}</h3>
                </label>
                <input 
                    type='text'
                    className="input input-secondary bg-white w-full"
                    id="placeName"
                    value={placeName}
                    onChange={onMutate}
                    maxLength='50'
                    placeholder="Max 50 characters"
                />


                {placeType === "restaurant" && (
                    <>
                    <label className="prose label mt-1">
                        <h3>Price</h3>
                    </label>

                    <div className="flex items-center">
                        <strong className="text-xl mr-2">$</strong>
                        <input 
                            type="number"
                            className="input input-secondary bg-white w-20"
                            id='price'
                            value={price}
                            onChange={onMutate}
                        />
                    </div>
                    </>
                )}
          
                <div 
                    className="flex justify-center mt-5 px-5"
                    onClick={onSubmit}>
                    <button className="btn btn-primary text-white w-full">
                        Edit Review
                    </button>
                </div>
            </form>
        </div>

    )
}

export default EditReview
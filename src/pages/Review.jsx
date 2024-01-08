import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { useEffect, useState, useRef } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import {v4 as uuidv4} from 'uuid'
import {toast} from 'react-toastify'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

function Review() {
    const [formData, setFormData] = useState({
        description: '',
        name: '',
        rating: 0,
        placeName: '',
        placeType: 'restaurant',
        price: null, 
        image: null
    })
    const [loading, setLoading] = useState(false)
    
    const {
        name,
        description,
        rating,
        placeName,
        placeType,
        price,
        image
    } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

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
            return
        }

        if((price === null || isNaN(price))&& placeType === 'restaurant'){
            setLoading(false)
            toast.error("Enter a valid price")
            return 
        }



        const storeImage = async(image)=>{
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, image)
                
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                      const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      console.log('Upload is ' + progress + '% done')
                      switch (snapshot.state) {
                        case 'paused':
                          console.log('Upload is paused')
                          break
                        case 'running':
                          console.log('Upload is running')
                          break
                        default:
                          break
                      }
                    },
                    (error) => {
                      reject(error)
                    },
                    () => {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                      })
                    }
                  )
            })
        }

        const hasImage = image === null ? false : true
        const hasPrice = placeType === 'restaurant' ? true : false 

        let imageUrl

        if(hasImage){
            imageUrl = await storeImage(image).catch(()=>{
                setLoading(false)
                toast.error("Unable to upload image")
                return
            })
        }

        const formDataCopy = {
            ...formData,
            hasImage, 
            hasPrice,
            imageUrl,
            timestamp: serverTimestamp()
        }

        delete formDataCopy.image
        hasImage === false && delete formDataCopy.imageUrl
        hasPrice === false && delete formDataCopy.price

       try{
            await addDoc(collection(db, 'reviews'), formDataCopy)
            setLoading(false)
            toast.success("Review successfully posted!")
            navigate('/')
       }catch(error){
            setLoading(false)
            toast.error("Unable to post review")
       }
    }

    if(loading){
        return <Spinner/>
    }



    return (
        <div className="flex flex-col h-screen">
            <div className="prose">
                <h1>Write a Review</h1>
            </div>
            <form 
                className="form-control pb-24"
                onSubmit={onSubmit}
            >
                <label className="prose label mt-1">
                    <h3>Name of Food</h3>
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
                    maxLength='1000'
                    placeholder="Max 1000 characters"
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


                <div className="flex justify-start prose mt-1 ml-1">
                        
                    <h3>Image</h3>
                    <p className="mt-0.5 ml-1">(optional)</p>
                </div>

                <input 
                    type="file" 
                    className="file-input file-input-secondary w-full bg-white" 
                    id='images'
                    onChange={onMutate}
                    accept='.jpg,.png,.jpeg, .heic'
                />
                
                <div 
                    className="flex justify-center mt-5 px-5"
                    onClick={onSubmit}>
                    <button className="btn btn-primary text-white w-full">
                        Create Review!
                    </button>
                </div>
            </form>
        </div>

    )
}

export default Review
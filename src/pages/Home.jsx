import { useEffect, useState } from "react"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "../firebase.config"
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"
import ReviewGrid from '../components/ReviewGrid'

function Home() {

    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    //form states
    const [place, setPlace] = useState('')
    const [item, setItem]= useState('')



    useEffect(()=> {
        const fetchReviews = async () => {
            try{
                const reviewsRef = collection(db, "reviews")
                const q = query(reviewsRef, orderBy("timestamp", "desc"))
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
                toast.error("Could not fetch reviews")
            }
        }

        fetchReviews()
    }, [])

    const onChange = e => {
        if(e.target.id === 'place'){
            setPlace(e.target.value)
        }
        else{
            setItem(e.target.value)
        }
    }

    if(loading){
        return <Spinner/>
    }

    return (
        <>
        <div className="flex sm:justify-center items-center mb-4">
               

                <div className="join join-horizontal">
                    <input 
                        className="input input-bordered bg-white join-item focus:outline-none w-1/2"
                        placeholder="Place"
                        id='place'
                        value={place}
                        onChange={onChange}
                    />
                    <input 
                        className="input input-bordered bg-white join-item focus:outline-none  w-1/2"
                        placeholder="Item"
                        id='item'
                        value={item}
                        onChange={onChange}

                    />
                    <button className="btn btn-primary join-item text-white">
                        Clear
                    </button>
                </div>

                <div className="dropdown dropdown-bottom dropdown-end ml-4">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        Sort By
                    </div>
                    <ul tabindex="0" class="menu menu-sm dropdown-content z-[1] bg-white rounded-box w-32 ">
                        <li>
                            <button className="btn btn-sm btn-ghost text-neutral">
                                Date Posted
                            </button>
                        </li>

                        <li>
                            <button className="btn btn-sm btn-ghost text-neutral">
                                Rating
                            </button>
                        </li>
                    </ul>
                </div>
        </div>
    



        {/* <div className="pb-24">
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 500:2,  750: 3, 900: 4, 1280:5}}
            >
                <Masonry
                    gutter="1rem"
                >
                {reviews.map((review)=>(
                        <ReviewItem
                            review={review.data}
                            key={review.id}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div> */}

        <ReviewGrid reviews={reviews}/>
        
        </>

    )
}

export default Home
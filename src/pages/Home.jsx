import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "../firebase.config"
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"
import ReviewGrid from '../components/ReviewGrid'

function Home() {

    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    //form states
    const [item, setItem]= useState('')

    const algoliasearch = require('algoliasearch')

    // Connect and authenticate with your Algolia app
    const client = algoliasearch('E8NMS63GYJ', 'cb799472817a936c01d8d0c5cb86539c')

    // Create a new index and add a record
    const index = client.initIndex('reviews')

    

    useEffect(()=>{
        if(item === ''){
            console.log("hello")
            fetchReviewsWithFirestore()
        }
        else{
            console.log("hello")
            fetchReviewsWithAlgolia()
        }
        //eslint-disable-next-line
    },[item])

    const fetchReviewsWithAlgolia = async () => {
        const response = await index.search(item)
        const r = []
        response.hits.forEach((hit)=>{
            return r.push({
                data: hit,
                id: hit.objectID
            })
        })

        setReviews(r)
        setLoading(false)
    }



        const fetchReviewsWithFirestore = async () => {
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

    const onChange =  e => {
        setItem(e.target.value)
    }

    const onClear = () => {
        setItem('')
    }

    if(loading){
        return <Spinner/>
    }

    return (
        <>
        {/* <div className="flex justify-center items-center mb-4">
                <div className="join join-horizontal w-screen">
                    <input 
                        className="input input-bordered bg-white join-item focus:outline-none w-3/4"
                        placeholder="Search for Restaurant/Item"
                        id='item'
                        value={item}
                        onChange={onChange}

                    />
                    <button 
                        className="btn btn-primary join-item text-white w-1/4"
                        onClick={onClear}
                    >
                        Clear
                    </button>
                </div>
        </div> */}
    



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
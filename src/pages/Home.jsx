import ReviewItem from "../components/ReviewItem"
import { useEffect, useState } from "react"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "../firebase.config"
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"
function Home() {

    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])

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

    if(loading){
        return <Spinner/>
    }

    return (
        <div className="flex flex-col h-screen grid-flow-row justify-between">
            <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-24">
                {reviews.map((review)=>(
                    <ReviewItem 
                        review={review.data}
                        key={review.id}
                    />
                ))}
            </section>
        </div>       
    )
}

export default Home
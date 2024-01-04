import ReviewItem from "../components/ReviewItem"
import { useEffect, useState } from "react"
import { getDoc, doc, collection, orderBy, query, getDocs } from "firebase/firestore"
import { db } from "../firebase.config"
import {toast} from "react-toastify"
function Home() {
    const review1 = {
        description: "The quesadilla was very good. Definitely worth it for the price. ",
        hasPrice: true, 
        hasImage: false, 
        imageUrl: "https://gimmedelicious.com/wp-content/uploads/2018/05/Southwest-Veggie-Quesadillas_-2.jpg",
        name: "Veggie Quesadillia",
        placeName: "Bodega Bros",
        price: 12.25, 
        rating: 4.5, 
        userRef: "w9DYOh3cZYUxgMFDbaY1PM77kHY2"
    }

    const review2 = {
        description: "The quesadilla was very good. Definitely worth it for the price. ",
        hasPrice: true, 
        hasImage: true, 
        imageUrl: "https://gimmedelicious.com/wp-content/uploads/2018/05/Southwest-Veggie-Quesadillas_-2.jpg",
        name: "Veggie Quesadillia",
        placeName: "Bodega Bros",
        price: 12.25, 
        rating: 4.5, 
        userRef: "w9DYOh3cZYUxgMFDbaY1PM77kHY2"
    }

    const [loading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    useEffect(()=> {
        const fetchReviews = async () => {
            try{
                const reviewsRef = collection(db, "reviews")
                const q = query(reviewsRef)
                const querySnap = await getDocs(q)

                const reviews = []

                querySnap.forEach((doc)=>{
                    return reviews.push({
                        id: doc.id, 
                        data: doc.data()
                    })
                })

                setReviews(reviews)
                console.log(reviews)
            }catch(error){
                toast.error("Could not fetch reviews")
            }
        }

        fetchReviews()
    }, [])


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
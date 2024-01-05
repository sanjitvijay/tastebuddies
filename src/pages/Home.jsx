import ReviewItem from "../components/ReviewItem"
import { useEffect, useState } from "react"
import { collection, query, getDocs, orderBy } from "firebase/firestore"
import { db } from "../firebase.config"
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
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
        // <div className="flex flex-col h-screen">
        //     {/* <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-24"> */}
        //     <div className=" gap-4 pb-24 space-y-4 break-inside-avoid-column columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        //         {reviews.map((review)=>(
        //             <ReviewItem
        //                 review={review.data}
        //                 key={review.id}
        //             />
        //         ))}
        //     </div>
        // </div>  

        <div className="pb-24">
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
        </div>

    )
}

export default Home
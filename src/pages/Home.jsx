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

    const algoliasearch = require('algoliasearch')

    // Connect and authenticate with your Algolia app
    const client = algoliasearch('E8NMS63GYJ', 'cb799472817a936c01d8d0c5cb86539c')

    // Create a new index and add a record
    const index = client.initIndex('reviews')

    

    useEffect(()=>{
        const fetchReviews = async () => {
            const response = await index.search(item)
            const reviews = []
            response.hits.forEach((hit)=>{
                console.log(hit)
                return reviews.push({
                    data: hit,
                    id: hit.objectID
                })
            })

            setReviews(reviews)
        }

        fetchReviews()
        setLoading(false)
    },[item, place])


    // useEffect(()=> {
    //     const fetchReviews = async () => {
    //         try{
    //             const reviewsRef = collection(db, "reviews")
    //             const q = query(reviewsRef, orderBy("timestamp", "desc"))
    //             const querySnap = await getDocs(q)

    //             console.log(querySnap)

    //             const reviews = []

    //             querySnap.forEach((doc)=>{
    //                 return reviews.push({
    //                     id: doc.id, 
    //                     data: doc.data()
    //                 })
    //             })

    //             setReviews(reviews)
    //             setLoading(false)
    //         }catch(error){
    //             toast.error("Could not fetch reviews")
    //         }
    //     }

    //     fetchReviews()
    // }, [])

    const onChange = e => {
        if(e.target.id === 'place'){
            setPlace(e.target.value)
        }
        else{
            setItem(e.target.value)
        }
    }

    const onClear = () => {
        setPlace('')
        setItem('')
    }

    if(loading){
        return <Spinner/>
    }

    return (
        <>
        <div className="flex justify-center items-center mb-4">
                <div className="join join-horizontal">
                    <input 
                        className="input input-bordered bg-white join-item focus:outline-none w-96"
                        placeholder="Search for a Restaurant and Item"
                        id='item'
                        value={item}
                        onChange={onChange}

                    />
                    <button 
                        className="btn btn-primary join-item text-white"
                        onClick={onClear}
                    >
                        Clear
                    </button>
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
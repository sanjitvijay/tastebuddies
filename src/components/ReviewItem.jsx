import ReactStars from "react-rating-stars-component";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useEffect, useState } from "react";


function ReviewItem({review}) {
    const { hasPrice, hasImage, imageUrl, name, placeName, price, rating, userRef} = review
    const [username, setUsername] = useState('')

    useEffect(()=>{
        const fetchUsername = async () => {
            const docRef = doc(db, 'users', userRef)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setUsername(docSnap.data().name)
            }
        }

        fetchUsername()
    }, [userRef])
    

    return (
        <div className="card card-compact break-inside-avoid-column bg-white shadow-xl hover:card-bordered">
            <div className="card-body">
                <div className="flex items-center ">
                    <h2 className="font-bold text-xl">{username}</h2>
                </div>
                {hasImage && (
                    <img
                        alt="Listing 1"
                        className="object-cover w-full"
                        height="100"
                        src={imageUrl}
                        style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                        }}
                        width="100"
                    />
                )}

                <header>
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-xl text-secondary">{name}</h2> 
                        {hasPrice && (
                        <div className="badge badge-primary badge-lg text-white ml-1">
                            ${price}
                        </div>
                    )}
                    </div>
                    <h3 className="mt-1 pb-0">{placeName}</h3>
                </header>

                <div className="flex items-center justify-between">
                    <ReactStars
                        edit={false}
                        value={rating}
                        isHalf={true}
                        size={20}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReviewItem
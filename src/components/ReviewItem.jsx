import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
function ReviewItem({review}) {
    const navigate = useNavigate()
    const {description, hasPrice, imageUrls, name, place, price, rating} = review
    
    return (
        <div className="card card-compact bg-white shadow-xl hover:card-bordered">
            <div className="card-body">
                <div className="flex items-center ">
                    <h2 className="font-bold text-xl">Username 1</h2>
                </div>
                <img
                    alt="Listing 1"
                    className="object-cover w-full"
                    height="100"
                    src={imageUrls[0]}
                    style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                    }}
                    width="100"
              />
                <header>
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-xl text-secondary">{name}</h2>
                        {hasPrice && (
                            <div className="badge badge-primary badge-lg text-white">
                                ${price}
                            </div>
                        )}

                    </div>
                    <h3 className="mt-1 pb-0">{place.name}</h3>
                </header>
                <ReactStars
                    edit={false}
                    value={rating}
                    isHalf={true}
                    size={20}
                />
            </div>
        </div>
    )
}

export default ReviewItem
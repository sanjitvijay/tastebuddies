import React from 'react'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import ReviewItem from './ReviewItem'

function ReviewGrid({reviews, onDelete, onEdit}) {
    return (
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
                            id={review.id}
                            key={review.id}
                            onDelete={()=>onDelete(review.id)}
                            onEdit={()=>onEdit(review.id)}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}

export default ReviewGrid
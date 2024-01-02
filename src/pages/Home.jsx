import ReviewItem from "../components/ReviewItem"

function Home() {
    const review1 = {
        description: "The quesadilla was very good. Definitely worth it for the price. ",
        hasPrice: true, 
        hasImage: false, 
        imageUrls: ["https://gimmedelicious.com/wp-content/uploads/2018/05/Southwest-Veggie-Quesadillas_-2.jpg"],
        name: "Veggie Quesadillia",
        place: {
            address: "715 N University Ave, Ann Arbor, MI 48104",
            name: "Bodega Bros",
            type: "restaurant"
        },
        price: 12.25, 
        rating: 4.5, 
        username: "Sanjit Vijay"
    }

    const review2 = {
        description: "The quesadilla was very good. Definitely worth it for the price. ",
        hasPrice: true, 
        hasImage: true, 
        imageUrls: ["https://gimmedelicious.com/wp-content/uploads/2018/05/Southwest-Veggie-Quesadillas_-2.jpg"],
        name: "Veggie Quesadillia",
        place: {
            address: "715 N University Ave, Ann Arbor, MI 48104",
            name: "Bodega Bros",
            type: "restaurant"
        },
        price: 12.25, 
        rating: 4.5, 
        username: "Sanjit Vijay"
    }
    return (
        <div className="flex flex-col grid-flow-col h-screen justify-between">
            <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-24">
                <ReviewItem review={review2}/>
                <ReviewItem review={review1}/>
                <ReviewItem review={review2}/>
                <ReviewItem review={review1}/>

                <ReviewItem review={review2}/>
                <ReviewItem review={review1}/>
                <ReviewItem review={review2}/>
                <ReviewItem review={review1}/>
                
            </section>
        </div>       
    )
}

export default Home
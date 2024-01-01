import ReviewItem from "../components/ReviewItem"

function Home() {
    const review = {
        description: "The quesadilla was very good. Definitely worth it for the price. ",
        hasPrice: true, 
        imageUrls: ["https://gimmedelicious.com/wp-content/uploads/2018/05/Southwest-Veggie-Quesadillas_-2.jpg"],
        name: "veggie quesadillia",
        place: {
            address: "715 N University Ave, Ann Arbor, MI 48104",
            name: "bodega bros",
            type: "restaurant"
        },
        price: 12.25, 
        rating: 5, 
    }
    return (
        <div className>
             <div className="flex flex-col h-screen justify-between">
                <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-24">
                    <ReviewItem review={review}/>
                    <ReviewItem review={review}/>
                    <ReviewItem review={review}/>
                    <ReviewItem review={review}/>
                </section>
            </div>
        </div>
       
    )
}

export default Home
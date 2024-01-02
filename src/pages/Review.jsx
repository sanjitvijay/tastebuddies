import ReactStars from "react-rating-stars-component";

function Review() {
    return (
        <div className="flex flex-col h-screen">
            <div className="prose">
                <h1>Write a Review</h1>
            </div>
            <form className="form-control pb-24">
                <label className="prose label mt-1">
                    <h3>Name</h3>
                </label>
                <input className="input input-secondary bg-white w-96"/>

                <label className="prose label mt-1">
                    <h3>Description</h3>
                </label>
                <textarea className="textarea textarea-secondary bg-white w-96"/>

                <label className="prose label mt-1">
                    <h3>Rating</h3>
                </label>
                <div className="card bg-white p-3 w-40">
                    <div className="ml-1">
                        <ReactStars
                                isHalf={true}
                                size={25}
                                color2="#FB3640"
                        />
                    </div>
                </div>

                <label className="prose label mt-1">
                    <h3>Place</h3>
                </label>
                <div className="join join-horizontal">
                    <button className="btn btn-primary join-item text-white shadow-xl">Restaurant</button>
                    <button className="btn btn-secondary join-item text-white">Dining Hall</button>
                </div>

                <label className="prose label mt-1">
                    <h3>Restaurant/Dining Hall</h3>
                </label>
                <input className="input input-secondary bg-white w-96"/>

                <label className="prose label mt-1">
                    <h3>Price</h3>
                </label>

                <div className="flex items-center">
                    <strong className="text-xl mr-2">$</strong>
                    <input 
                        type="number"
                        className="input input-secondary bg-white w-20"
                    />
                </div>

                <div className="flex justify-start prose mt-1">
                        
                    <h3>Images</h3>
                    <p className="mt-0.5 ml-1">(optional)</p>
                </div>

                <input type="file" className="file-input file-input-secondary w-96" />
                
                <div className="flex justify-center mt-5 px-32">
                    <button className="btn btn-primary text-white w-full">
                        Create Review!
                    </button>
                </div>


            </form>
        </div>

    )
}

export default Review
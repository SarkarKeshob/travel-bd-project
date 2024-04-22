import { useContext } from "react";
import { TravelContext } from "../../Context/TravelDetailsContext/TravelDetailsContext";
import { useParams } from "react-router-dom";
import Map from "./Map/Map";

const BookHotel = () => {
    const { bookingData, travelDetails } = useContext(TravelContext);
    const id = useParams().id;
    const selectedPlace = travelDetails.filter(place => place.id == id);
    console.log(bookingData);
    return (
        <div className="text-black mt-10 p-10 bg-white grid md:grid-cols-2 md:gap-20">
            <div>
                <p>{selectedPlace[0]?.hotels?.length} stays available within  {bookingData.from}-{bookingData.to}</p>
                <h4 className="font-bold text-xl mt-4">Stay in {selectedPlace[0]?.name}</h4>
                <div className="mt-4 grid gap-5">
                    {selectedPlace[0]?.hotels.map((hotel, index) => <div key={index}>
                        <div className="card card-side bg-white opacity-90 shadow-2xl">
                            <figure><img src={hotel?.image} alt="Movie" /></figure>
                            <div className="card-body">
                                <h2 className="card-title font-bold">{hotel?.name}</h2>
                                <div className=" w-full flex gap-2 text-sm text-slate-700">
                                    <p >{hotel?.guests}guest </p>
                                    <p >{hotel?.bedrooms}bedrooms </p>
                                    <p >{hotel?.beds}beds </p>
                                    <p>{hotel?.baths}bath </p>
                                </div>
                                <div className="text-slate-700 text-sm">
                                    {hotel?.wifi ? <p>WIfi Available</p> : <p>No Wifi </p>}
                                    {hotel?.air_conditioning ? <p>Air Condition Available</p> : <p>No Air Condition </p>}
                                    {hotel?.kitchen ? <p >Kitchen Available</p> : <p>No Kitchen </p>}
                                    {hotel?.cancellation_flexibility ? <p >Cancellation Flexibility Available</p> : <p>No Cancellation Flexibilty</p>}


                                </div>
                                <div className="text-slate-700 text-sm">
                                    <p>Rating: {hotel?.rating} </p>
                                    <p>Price: <span className="text-black font-bold text-lg">{hotel?.price_per_night}</span> bdt/night</p>
                                </div>
                            </div>

                        </div>
                    </div>)}
                </div>


            </div>
            <div>
                <Map></Map>
            </div>

        </div>
    );
};

export default BookHotel;
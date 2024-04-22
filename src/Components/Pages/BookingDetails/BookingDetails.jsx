import { useContext} from "react";
import { TravelContext } from "../../Context/TravelDetailsContext/TravelDetailsContext";
import { useNavigate, useParams } from "react-router-dom";


const BookingDetails = () => {
    const {travelDetails,setBookingData} = useContext(TravelContext);
    const navigate=useNavigate();
    
    
    const id = useParams().id;
    const selectedPlace = travelDetails.filter(place => place.id == id);
    const date=new Date();
    const defaultDate=date.toISOString().substring(0,10);
    const handleBooking=e=>{
        e.preventDefault();
        const origin=e.target.origin.value;
        const destination =e.target.destination.value;
        const from=e.target.from.value;
        const to=e.target.to.value;
        setBookingData({origin,destination,from,to});
        navigate(`/bookHotels/${selectedPlace[0].id}`);
    }
    
    return (
        <div className="text-white mt-10 p-2 grid md:grid-cols-2 md:gap-20 gap-6">
            <div className="mt-8">
                {selectedPlace.length &&
                    <div className="md:w-full w-5/6 mx-auto">
                        <h1 className=" text-5xl md:text-7xl">{selectedPlace[0]?.name}</h1>
                        <p className="p-0 md:pl-2 mt-2 text-justify ">{selectedPlace[0]?.details}</p>
                    </div>
                }
            </div>
            <div className="px-5 md:px-14 py-10 bg-white mx-auto w-5/6 md:mx-14 rounded-lg">
                <form className="text-slate-500 text-sm grid gap-3" onSubmit={handleBooking}>
                    <div className="grid">
                        <label htmlFor="origin">Origin</label>
                        <input type="text" id="origin" name="origin" defaultValue={'Dhaka'} className="bg-slate-300 p-2 rounded-lg text-black font-bold" />
                    </div>
                    <div className="grid">
                        <label htmlFor="destination">Destination</label>
                        <input type="text" id="destination" name="destination" defaultValue={selectedPlace[0]?.name} className="bg-slate-300 p-2 rounded-lg text-black font-bold"/>
                    </div>
                    <div className="grid">
                        <label htmlFor="from">From</label>
                        <input type="date" name="from" id="from" defaultValue={defaultDate} className="bg-slate-300 p-2 rounded-lg text-black font-bold"/>
                    </div>
                    <div className="grid">
                        <label htmlFor="to">To</label>
                        <input type="date" defaultValue={defaultDate} name="to" id="to" className="bg-slate-300 p-2 rounded-lg text-black font-bold"/>
                    </div>
                    <button className="btn btn-warning w-full mt-8">Start Booking</button>
                </form>
            </div>
        </div>
    );
};

export default BookingDetails;
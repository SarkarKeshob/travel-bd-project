import { createContext, useEffect, useState } from "react";
export const TravelContext=createContext(null);
import PropTypes from 'prop-types';

const TravelDetailsContext = ({children}) => {
    const [travelDetails,setTravelDetails]=useState([]);
    const [bookingData,setBookingData]=useState({});
    useEffect(()=>{
        const  getTravelDetails=async()=>{
            const placesProm=await fetch('/travelDetails.json');
            const places=await placesProm.json();
            setTravelDetails(places);
        }
        getTravelDetails();
    },[])
    
    return (
        <div>
            <TravelContext.Provider value={{travelDetails,setBookingData,bookingData}}>
                {children}
            </TravelContext.Provider>
        </div>
    );
};

TravelDetailsContext.propTypes={
    children:PropTypes.node,
}
export default TravelDetailsContext;
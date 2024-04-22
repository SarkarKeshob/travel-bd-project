import { useContext} from "react";
import { TravelContext } from "../../../Context/TravelDetailsContext/TravelDetailsContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useEffect } from "react";

const LeftSideContent = () => {
    const {travelDetails}=useContext(TravelContext);
    const navigate=useNavigate();
    const placeId=useParams();
    const placeData=travelDetails.filter(placeItem=>placeItem.id==placeId?.id);
  useEffect(()=>{
    if(!(placeId?.id)){
        navigate('/1');
   }
  },[placeId?.id,navigate])
    return (
        <div className="text-white p-4 md:pr-14">
            {placeData.length&&
            <div>
                <h2 className="text-7xl">{placeData[0]?.name}</h2>
                <p className="text-sm my-7">{placeData[0]?.details?.slice(0,200)}.........</p>
                <Link to={`/bookingDetails/${placeData[0]?.id}`}>
                <button className="btn btn-warning mt-3">Booking <MdOutlineArrowRightAlt /></button>
                </Link>
            </div>
            
            }
            
        </div>
    );
};

export default LeftSideContent;
import { useContext } from "react";
import { TravelContext } from "../../../Context/TravelDetailsContext/TravelDetailsContext";
import { NavLink } from "react-router-dom";


const RightSideContent = () => {
    const {travelDetails} = useContext(TravelContext);
    return (
        <div className="grid md:grid-cols-2 gap-4 md:gap-16">
            {travelDetails.map(blog=><NavLink key={blog.id} to={`${blog.id}`} className={({isActive})=>isActive?'border-4 border-amber-400 rounded-2xl w-3/5 md:w-full mx-auto':'w-3/5 md:w-full mx-auto'}><div  className="card  bg-base-100 shadow-xl ">
                <figure><img src={blog.image}alt="Shoes" className="w-full h-56 md:h-64"/></figure>
                <div className="card-body">
                    <h2 className="card-title">{blog.name}</h2>
                </div>
            </div></NavLink>)}
        </div>
    );
};

export default RightSideContent;
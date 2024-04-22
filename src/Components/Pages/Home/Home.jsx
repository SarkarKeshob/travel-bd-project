import { Outlet } from "react-router-dom";
import RightSideContent from "./RightSideContent/RightSideContent";



const Home = () => {

    return (
        <div className="grid md:grid-cols-2 mt-10">
            <Outlet></Outlet>
            <RightSideContent></RightSideContent>
        </div>
    );
};

export default Home;
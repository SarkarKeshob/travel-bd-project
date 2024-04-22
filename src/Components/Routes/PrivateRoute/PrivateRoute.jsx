import { useContext } from "react";
import { UserAuthContext } from "../../Context/UserContext/UserContext";
import PropTypes from "prop-types"
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(UserAuthContext);
    const location=useLocation().pathname;
    
    if (isLoading) {
        return (
            <div className="mt-32 text-center">
                <span className="loading loading-lg loading-spinner text-warning"></span>
            </div>
        )
    }
    else {
        if (user) {
            return children;
        }
        else {
            return <Navigate state={location} to={'/login'}></Navigate>
        }
    }
};
PrivateRoute.propTypes = {
    children: PropTypes.node,
}
export default PrivateRoute;
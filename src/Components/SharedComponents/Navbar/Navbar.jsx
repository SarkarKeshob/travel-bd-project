import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserAuthContext } from "../../Context/UserContext/UserContext";
import { signOut } from "firebase/auth";
import auth from "../../../Firebase/firebase.config";

const Navbar = () => {
    const {user}=useContext(UserAuthContext);
    const navLinks = (<>
        <li> <NavLink to={'/news'} >News</NavLink> </li>
        <li> <NavLink to={'/destination'}>Destination</NavLink> </li>
        <li> <NavLink to={'/blog'}>Blog</NavLink> </li>
        <li> <NavLink to={'/contact'}>Contact</NavLink> </li>
    </>)
    return (
        <div>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-white">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-xl p-0"><img src="https://static.vecteezy.com/system/resources/previews/023/880/795/original/hand-drawn-sketch-of-suitcase-vintage-illustration-isolated-on-white-background-doodle-drawing-vector.jpg" alt="" className="w-full h-16 p-0" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex gap-10">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    <ul className="menu menu-horizontal px-1 gap-5 text-white">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                   {user?<button className="btn btn-warning" onClick={()=>{
                    signOut(auth)
                    .then()
                    .catch()
                   }}>Sign Out</button>:<Link className="btn btn-warning" to={'/login'}>Login</Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
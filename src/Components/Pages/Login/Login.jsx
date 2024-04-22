import { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../Context/UserContext/UserContext";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../../Firebase/firebase.config";

const Login = () => {
    const { logInUser, forgetPassword } = useContext(UserAuthContext);
    const navigate = useNavigate()
    const location = useLocation().state;
    const provider=new GoogleAuthProvider();
    const emailRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState('');
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        setErrorMessage('');
        setSuccess('');
        if (!email) {
            setErrorMessage('Please type an email to reset password')
        }
        else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email))) {
            setErrorMessage('Please type an valid email to reset Password')
        }
        else {
            forgetPassword(email)
                .then(() => {
                    setSuccess('A password reset email has been sent to your email. Please check.');
                })
                .catch(error => {
                    if (error) {
                        setErrorMessage('Email does not match .');
                    }
                })
        }
    }
    const handleLogin = e => {
        e.preventDefault();
        setErrorMessage('');
        setSuccess('');
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (password.length > 0 && email.length > 0) {
            logInUser(email, password)
                .then(result => {
                    const user = result.user;
                    if (user.emailVerified) {
                        e.target.reset();
                        { location ? navigate(location) : navigate('/1') }
                    }
                    else {
                        setErrorMessage('Please Verify Your Email To Log in ');
                    }
                })
                .catch(error => {
                    const message = error.message;
                    if (message) {
                        setErrorMessage('Invalid Email or Password!!!')
                    }
                })
        }
        else {
            setErrorMessage('The Password filed must be filled')
        }
        console.log(email, password)
    }
    return (
        <div className="hero min-h-screen mt-0">
            <div className="hero-content flex-col ">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white">Login now!</h1>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white p-6">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <input type="email" ref={emailRef} placeholder="Email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" name='password' className="input input-bordered" required />
                            <span className="ml-auto mr-4 -mt-8 text-lg" onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>

                        </div>
                        <div className="mt-3">
                            <label className="label">
                                <p className="label-text-alt link link-warning font-bold link-hover" onClick={handleForgetPassword}>Forgot password?</p>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-warning">Login</button>
                        </div>
                    </form>
                    <p className="text-center">Do not have an account ? <span><Link className="btn btn-link text-amber-500" to={'/register'}>Register Here</Link></span></p>
                    {errorMessage.length > 0 && <p className="text-red-600 text-sm p-2 text-center font-bold">{errorMessage}</p>}
                    {success.length > 0 && <p className="text-green-600 text-sm p-2 text-center font-bold">{success}</p>}

                </div>
                <div className="mt-3 border-t border-white w-full">
                    <h2 className="text-2xl text-center text-white my-4">Or</h2>
                    <button className="btn w-full btn-outline btn-warning" onClick={()=>{
                        signInWithPopup(auth,provider)
                        .then(result=>{
                            const user=result.user;
                            if(user){
                                { location ? navigate(location) : navigate('/1') }
                            }
                        })
                        .catch(()=>{
                            setErrorMessage('Invalid Email');
                        })
                    }}>Login With <FaGoogle></FaGoogle> </button>
                </div>
            </div>

        </div>
    );
};

export default Login;
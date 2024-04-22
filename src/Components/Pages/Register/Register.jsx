import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserAuthContext } from "../../Context/UserContext/UserContext";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { Link,} from "react-router-dom";

const Register = () => {
    const { signInUser } = useContext(UserAuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState('')
    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        setErrorMessage('');
        setSuccess('');
        const password = e.target.password.value;
        const confirmPassword = e.target.confirm_password.value;
        const firstName = e.target.first_name.value;
        const lastName = e.target.last_name.value;
        console.log(firstName, lastName);
        const isUpperCased = /[A-Z]/;
        const isLowerCased = /[a-z]/;
        const isNumbured = /[0-9]/;
        const isSpecialCharactered = /[!@#$%^&*()_+{}|:"<>?[\];',./`~]/;
        if (password.length > 0 && email.length > 0) {
            if (!(isUpperCased.test(password))) {
                setErrorMessage('Password must include an Uppercase character')
            }
            else if (!(isLowerCased.test(password))) {
                setErrorMessage('Password must include a Lower case character')
            }
            else if (!(isNumbured.test(password))) {
                setErrorMessage('Password must include a number ')
            }
            else if (!(isSpecialCharactered.test(password))) {
                setErrorMessage('Password must include a special character')
            }
            else if (password !== confirmPassword) {
                setErrorMessage('Password and confirm password does not match')
            }
            else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email))) {
                setErrorMessage('Invalid Email format . Type an valid email')
            }
            else {
                signInUser(email, password)
                    .then(result => {
                        const user = result.user;

                        updateProfile(user, {
                            displayName: firstName + ' ' + lastName,
                        })
                            .then(() => {

                            })
                            .catch(error => {
                                console.log(error.message);
                            })

                        sendEmailVerification(user)
                            .then(() => {
                                setSuccess('Account Created!!! Check your email for verification.')
                                
                            })
                            .catch()

                        e.target.reset();

                    })
                    .catch(error => {
                        if (error.message.length) {
                            setErrorMessage('Email already in use ')
                        }
                        else {
                            setErrorMessage('')
                        }
                    })
            }

        }



    }
    return (
        <div>
            <div className="hero mt-4">
                <div className="hero-content grid">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white">Register Here!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white p-6 md:px-10">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <input type="text" placeholder="First Name" name="first_name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <input type="text" placeholder="Last Name" name="last_name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control mb-4">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" name='password' className="input input-bordered" required />
                                <span className="ml-auto mr-4 -mt-8 text-lg" onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>

                            </div>
                            <div className="form-control">
                                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" name='confirm_password' className="input input-bordered" required />
                                <span className="ml-auto mr-4 -mt-8 text-lg" onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}>{showConfirmPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>

                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-warning">Register</button>
                            </div>
                        </form>
                        <p className="text-center">Already have an account?? <span><Link className="btn btn-link text-amber-500" to={'/login'}>Login</Link></span> </p>
                        {errorMessage.length > 0 && <p className="text-red-600 p-2 text-center font-bold">{errorMessage}</p>}
                        {success.length > 0 && <p className="text-green-600 p-2 text-center font-bold">{success}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
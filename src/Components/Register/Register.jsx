import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { BiShow, BiSolidHide } from "react-icons/bi";
import { Link } from "react-router-dom";



const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showpass, setShowpss] = useState(false);

    const handleShow = () => {
        setShowpss(!showpass);

    }
    
    
    const handleSubmit = e => {
        
        e.preventDefault();     
        setError('');
        setSuccess('');
        const userEmail = e.target.email.value;
        const userPassword = e.target.pass.value
        const checkbox = e.target.checkbox.checked
        if (userPassword.length < 6) {
            setError("Password should be at least 6 characters");
            return;
        }
        else if (!/[A-Z]/.test(userPassword)) {
            setError("Password should be one uppercase characters")
            return;
        }
        else if(!checkbox){
            setError("Click check box");
            return
        }
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then(result => {
                console.log(result.user);
                setSuccess("User created Successfully!")

                sendEmailVerification(result.user)
                .then(result=>{
                    setSuccess("check your email for email verify!")
                })
                .catch((error)=>{
                    setError("something went wrong!")
                })
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);

            })
    }
    return (
        <div className="max-w-[600px] px-6 md:px-0 mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center">Register Your Account</h2>
            <form onSubmit={handleSubmit} className="md:w-1/2 mx-auto space-y-3">
                <input type="email" className="bg-gray-200 px-2 py-3  outline-none rounded w-full" name="email" placeholder="Enter your Email" required />
                <div className="flex justify-center items-center bg-gray-200 ">
                    <input type={showpass ? "text" : "password"} className="bg-gray-200 px-2 py-3  outline-none rounded w-full" name="pass" placeholder="Enter your Password" required />
                    <div>
                        {showpass ? <BiSolidHide onClick={handleShow} className="text-2xl mr-2" /> : <BiShow onClick={handleShow} className="text-2xl mr-2" />}
                    </div>
                </div>
                <div>
                    <input type="checkbox" name="checkbox" id="chekb" />
                    <label className="text-gray-400 ml-2" htmlFor="chekb">Accpet Terms And Conditions</label>

                </div>
                <div className="flex justify-center">
                    <input type="submit" value={'Register'} className="btn btn-secondary" />
                </div>
                <p>Already have an account? <Link to={"/login"} className="text-pink-700 hover:underline ">Log In</Link></p>

            </form>
            {
                error && <p className="text-red-600">{error}</p>
            }
            {
                success && <p className="text-green-600">{success}</p>
            }
        </div>
    );
};

export default Register;
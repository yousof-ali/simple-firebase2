import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";


const Register = () => {
    const [error,setError]=useState('');
    const [success,setSuccess] = useState('')
    

    const handleSubmit = e =>{
        e.preventDefault();
        setError('');
        setSuccess('');
        const userEmail = e.target.email.value;
        const userPassword = e.target.pass.value
        if(userPassword.length<6){
            setError("Password should be at least 6 characters");
            return;
        }
        else if(!/[A-Z]/.test(userPassword)){
            setError("Password should be one uppercase characters")
            return;
        }
        createUserWithEmailAndPassword(auth,userEmail,userPassword)
        .then(result=>{
            console.log(result.user);
            setSuccess("User created Successfully!")
        })
        .catch((error)=>{
            console.log(error.message);
            setError(error.message);

        })
    }
    return (
        <div className="max-w-[600px] px-6 md:px-0 mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-center">Register Your Account</h2>
            <form onSubmit={handleSubmit} className="md:w-1/2 mx-auto space-y-3">
                <input type="email" className="bg-gray-200 px-2 py-3  outline-none rounded w-full" name="email" placeholder="Enter your Email" required/>
                <input type="password" className="bg-gray-200 px-2 py-3  outline-none rounded w-full" name="pass" placeholder="Enter your Password" required />
                <div className="flex justify-center">
                    <input type="submit" value={'Register'} className="btn btn-secondary" />
                </div>
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
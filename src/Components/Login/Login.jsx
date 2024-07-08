import { signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);


    const handleclik = e => {
        e.preventDefault()
        setError('');
        setSuccess("");
        const useremail = e.target.email.value;
        console.log(useremail);
        const userpass = e.target.pass.value;
        console.log(userpass);

        signInWithEmailAndPassword(auth, useremail, userpass)
            .then(result => {
                console.log(result.user);
                setSuccess("Successfully login !")
                e.target.email.value='';
                e.target.pass.value='';
            })
            .catch((error) => {
                const err = error.message;
                setError("Wrong email or password")
            })

    }
    const handleForgetPassword = ()=>{
        setError('');
        const foremail = emailRef.current.value;

        if(!foremail){
            setError("Email field is empty!")
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(foremail)){
            setError("Give a valied Mail !")
            return;
        }
        sendPasswordResetEmail(auth,foremail)
        .then(result =>{
            alert("check your mail")
        })
        .catch((error)=>{
            setError(error.message);
        })
    }
    return (
        <div className="max-w-[600px] mx-auto  space-y-6 px-6 md:px-0">
            <h2 className="text-4xl font-bold text-center">Log In</h2>
            <form onSubmit={handleclik} className="md:w-1/2 mx-auto space-y-3">
                <input ref={emailRef} type="email" className="bg-gray-200 px-2 py-3  outline-none rounded w-full" name="email" placeholder="Enter your Email" required />
                <input type="password" className="bg-gray-200 px-2 py-3  outline-none rounded w-full" name="pass" placeholder="Enter your Password" required />
                <a href="#" onClick={handleForgetPassword}>Forget Password?</a>
                <div className="flex justify-center">
                    <input type="submit" value={"login"} className="btn btn-secondary" />
                </div>
                <p>You are new in Hear? <Link className="text-pink-700" to={"/register"}>Register.</Link></p>
            </form>
            
            {
                error && <p className="text-red-600">{error}</p>
            }
            {
                success && <p className="text-green-600">{success}</p>
            }
        </div >
    );
};

export default Login;
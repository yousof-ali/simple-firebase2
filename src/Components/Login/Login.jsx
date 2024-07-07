import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


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
            })
            .catch((error) => {
                const err = error.message;
                setError("Wrong email or password")
            })

    }
    return (
        <div className="max-w-[600px] mx-auto  space-y-6 px-6 md:px-0">
            <h2 className="text-4xl font-bold text-center">Log In</h2>
            <form onSubmit={handleclik} className="md:w-1/2 mx-auto space-y-3">
                <input type="email" className="bg-gray-200 px-2 py-3  outline-none rounded w-full" name="email" placeholder="Enter your Email" required />
                <input type="password" className="bg-gray-200 px-2 py-3  outline-none rounded w-full" name="pass" placeholder="Enter your Email" required />
                <div className="flex justify-center">
                    <input type="submit" value={"login"} className="btn btn-secondary" />
                </div>
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
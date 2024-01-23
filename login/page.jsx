"use client"
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";



export default function Login(){
    const router = useRouter();
    const handleSubmit = (e) => {
        e.preventDefault();

        const {email, password} = e.target.elements;
            signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                window.alert("Login successfully");

                router.push("/");

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert(errorMessage);
            });

    }
    return (
        <div className="d-flex align-items-center justify-content-center" style={{"height": "100vh"}}> 
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" />
            </div>
        
            <button type="submit" className="btn btn-primary">Login</button>
            <div className="my-3">
                <a href={"/register"} className="my-3">
                    Don't have an account? Register
                </a>
            </div>
            </form>
         
        </div>
    )
}
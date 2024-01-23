"use client"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { ref, set } from 'firebase/database';
import { doc, setDoc } from 'firebase/firestore';


export default function Register(){
    const handleSubmit = (e) => {
        e.preventDefault();
            

            const {email, username, password} = e.target.elements;
            createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                window.alert("User Created Successfully");

                set(ref(db, 'users/' + user.uid), {
                    username: username.value,
                    email: email.value,
                    id: user.uid
                  });
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert(errorMessage);
                // ..
            });
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{"height": "100vh"}}> 
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="exampleInputUserName1" className="form-label">UserName</label>
                <input type="text" className="form-control" id="exampleInputUserName1" aria-describedby="emailHelp" name="username" />
               
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" />
            </div>
        
            <button type="submit" className="btn btn-primary">Register</button>
            <div className="my-3">
                <a href={"/login"} className="my-3">
                    Existing user? Login
                </a>
            </div>
            </form>
         
        </div>
    )
}
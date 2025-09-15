"use client"

import {useState} from "react"
import Link from "next/link"

const SignUp = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleFetch = async(e : any) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/auth/signup", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({name, email, password, confirmPassword})
            });
            if(!response.ok)
            {
                throw new Error("Error fetching");
            }
        }catch(err)
        {
            console.log(err);
        }
    }
    return(
        <div className="">
            <form className="flex flex-col justify-center items-center" onSubmit = {handleFetch}>
                <label>Sign-Up</label>
                <div className="flex flex-col items-center">
                    <label>Name</label>
                    <input type = "text" value = {name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" className="text-center"/>
                </div>
                <div className="flex flex-col items-center">
                    <label>Email</label>
                    <input type = "text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="text-center"/>
                </div>
                <div className="flex flex-col items-center">
                    <label>Password</label>
                    <input type = "text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" className="text-center"/>
                </div>
                <div className="flex flex-col items-center">
                    <label>ConfirmPassword</label>
                    <input type = "text" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Your password" className="text-center"/>
                </div>
                <button type="submit" className="cursor-pointer focus:ring-1">Submit</button>
                <div className="flex flex-row items-center gap-2">
                    <span>Already have an Account :-</span>
                    <Link href = "/signin" className="text-blue-400 hover:text-red-500">SignIn</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
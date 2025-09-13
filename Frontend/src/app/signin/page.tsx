"use client"

import {useState} from "react"
import { useAuthContext } from "@/context/authContext";

const SignIn = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthUser} = useAuthContext();

    const handleFetch = async(e : any)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/auth/signin",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({email, password}),
                credentials : "include"
            })
            if(!response.ok)
            {
                throw new Error("Cannot fetch");
            }
            const data = await response.json();
            console.log(data);
            console.log(data.user);
            setAuthUser(data.user);
        }catch(err)
        {
            console.log(err);
        }
    }
    return(
        <div>
            <form className="flex flex-col items-center" onSubmit = {handleFetch}>
                <div className="flex flex-col items-center">
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="text-center"/>
                </div>
                <div className="flex flex-col items-center">
                    <label>Password</label>
                    <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" className="text-center"/>
                </div>
                <button type="submit" className="cursor-pointer focus:ring-1">Submit</button>
            </form>
        </div>
    )
}

export default SignIn;
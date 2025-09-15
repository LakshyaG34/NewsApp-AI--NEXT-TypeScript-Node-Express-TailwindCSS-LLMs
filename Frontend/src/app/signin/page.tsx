"use client"

import {useState} from "react"
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthUser} = useAuthContext();
    const router = useRouter();

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
            setAuthUser(data.user);
            router.push("/");
        }catch(err)
        {
            console.log(err);
        }
    }
    return(
        <div>
            <form className="flex flex-col items-center gap-3" onSubmit = {handleFetch}>
                <div className="flex flex-col items-center gap-1">
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" className="text-center focus:outline-none focus:ring-1 focus:ring-pink-400 rounded-2xl transition duration-300 ease-in-out"/>
                </div>
                <div className="flex flex-col items-center">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" className="text-center focus:outline-none focus:ring-1 focus:ring-pink-400 rounded-2xl transition duration-300 ease-in-out"/>
                </div>
                <button type="submit" className="cursor-pointer focus:ring-2 focus:ring-pink-500 focus:bg-pink-500 rounded-xl hover:bg-pink-300 px-2 py-2">Submit</button>
                <div className="flex flex-row items-center gap-2">
                    <span>Don't have an Account:-</span>
                    <Link href = "/signup" className="text-blue-400 hover:text-red-500">SignUp</Link>
                </div>
            </form>
            
        </div>
    )
}

export default SignIn;
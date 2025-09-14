"use client"

import React from "react";
import Link from "next/link"
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";


const Navbar = () =>{
    const {authUser, setAuthUser} = useAuthContext();
    const router = useRouter();
    const handleLogout = async() =>{
    try{
        await fetch("http://localhost:5000/api/auth/logout",{
        method : "POST",
        credentials : "include"
        });
    }catch(err)
    {
        console.log("Error logging out", err);
    }finally{
        setAuthUser(null);
        router.push("/signin")
    }
}
    return(
        <div className="flex flex-row justify-between bg-black/60 px-4 py-6">
            <span className="text-xl font-bold animate-neonTextGlow">Nvb</span>
            <div className="flex flex-row gap-2">
                {!authUser ?

                    (<Link href="/signin" className="border border-white rounded-2xl px-1 py-1">LogIn</Link>)
                    :
                    (
                        <button className="border border-white rounded-2xl px-1 py-1 cursor-pointer" onClick = {handleLogout}>Logout</button>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;
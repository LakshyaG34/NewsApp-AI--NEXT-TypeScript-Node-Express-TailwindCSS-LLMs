import React from "react";
import Link from "next/link"

const Navbar = () =>{
    return(
        <div className="flex flex-row justify-between bg-black/60 px-4 py-6">
            <span className="text-xl font-bold">Nvb</span>
            <div className="flex flex-row gap-2">
                <Link href="#" className="border border-white rounded-2xl px-1 py-1">Log-In</Link>
                <Link href="#" className="border border-white rounded-2xl px-1 py-1">Logout</Link>
            </div>
        </div>
    )
}

export default Navbar;
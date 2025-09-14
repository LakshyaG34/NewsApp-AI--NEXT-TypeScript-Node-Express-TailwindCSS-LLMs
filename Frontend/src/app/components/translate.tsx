"use client"
import React, {useState} from "react";
import { LuSparkles } from "react-icons/lu";

interface propTypes{
    description : string;
}

const TranslateAI: React.FC<propTypes> = ({description}) =>{
    const [translatedTxt, setTranslatedTxt] = useState("");
    const [translatedLang, setTranslatedLang] = useState("");
    const handleFetch = async(e : React.FormEvent) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/ai",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({
                    text : description,
                    targetLen : translatedLang
                })
            })
            if(!response.ok)
            {
                throw new Error("cannot Fetch");
            }
            const data = await response.json();
            setTranslatedTxt(data.translated);
        }catch(err)
        {
            console.log(err);
        }
    }
    return(
        <div>
            <form onSubmit = {handleFetch}>
                <div className="flex flex-row gap-1">
                    <input value = {translatedLang} placeholder="Enter language" onChange={(e)=>setTranslatedLang(e.target.value)}/>
                    <button type = "submit" className="flex flex-row items-center cursor-pointer gap-2 border-2 rounded-xl px-1 hover:bg-white hover:text-black animate-fireGlow">
                        Translate
                        <LuSparkles className=""/>
                    </button>
                </div>
            </form>
            {
                translatedTxt && <p>Translated : {translatedTxt}</p>
            }
        </div>
    )
}

export default TranslateAI;
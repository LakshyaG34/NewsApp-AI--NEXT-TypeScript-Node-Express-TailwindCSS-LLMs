"use client"
import React, {useState} from "react";

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
                <input value = {translatedLang} placeholder="Enter language" onChange={(e)=>setTranslatedLang(e.target.value)}/>
                <button type = "submit" className="cursor-pointer">Translate</button>
            </form>
            {
                translatedTxt && <p>Translated : {translatedTxt}</p>
            }
        </div>
    )
}

export default TranslateAI;
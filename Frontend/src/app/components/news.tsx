"use client"

import {useState, useEffect} from "react";
import ItemCard from "./itemCard";

interface NewsItem{
    author : string;
    title : string;
    description : string;
    urlToImage : string;
    source : {
        id : string | null;
        name : string;
    };
}


const News = () =>{
    
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [country, setCountry] = useState<string>("us");
    const [category, setCategory] = useState<string>("technology");
    
    useEffect(()=>{
        const handleNews = async() : Promise<void> =>{
            try{
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/news?country=${country}&category=${category}`);
                if(!response.ok)
                {
                    throw new Error("Reponse is not OK");
                }
                const data = await response.json();
                console.log("articles", data.articles)
                setNews(data.articles);
            }catch(err)
            {
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        handleNews();
    }, [country, category]);
    if(loading)
    {
        return <p>Fetching News....</p>
    }

    // const category = []
    return( 
        <div className="mx-auto max-w-7xl mt-4">
            <div className="flex gap-4 mb-6">
                <select value={country} onChange = {(e)=>setCountry(e.target.value)}>
                    <option value = "us">US</option>
                    <option value = "in">India</option>
                </select>
                <select value={category} onChange = {(e)=>setCategory(e.target.value)}>
                    <option value = "technology">Tech</option>
                    <option value = "sports">Sports</option>
                    <option value = "entertainment">entertainment</option>
                    <option value = "general">general</option>
                    <option value = "business">business</option>
                    <option value = "science">science</option>
                    <option value = "health">health</option>
                </select>
            </div>
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
                    {loading ? (<p>Fetching News</p>) : news && news.length > 0 ? (
                        news.slice(0,6).map((item, idx: number) => (
                        <ItemCard
                            key={idx}
                            author={item.author}
                            title={item.title}
                            description={item.description}
                            image={item.urlToImage}
                            publisher = {item.source.name}
                        />
                        ))
                    ) : <p>No news Found</p>}
                </div>
        </div>
    )
}

export default News;
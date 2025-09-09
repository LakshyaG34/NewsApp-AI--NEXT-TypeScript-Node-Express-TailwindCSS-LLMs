"use client"

import {useState, useEffect} from "react";
import ItemCard from "./itemCard";

const News = () =>{
    
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(()=>{
        const handleNews = async() : Promise<void> =>{
            try{
                setLoading(true);
                const response = await fetch("http://localhost:4000/api/news");
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
    }, []);
    if(loading)
    {
        return <p>Fetching News....</p>
    }
    return( 
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mt-4 mx-auto max-w-7xl">
                {loading ? (<p>Fetching News</p>) : news && news.length > 0 ? (
                    news.slice(0,6).map((item: any, idx: number) => (
                    <ItemCard
                        key={idx}
                        author={item.author}
                        title={item.title}
                        description={item.description}
                        image={item.urlToImage}
                    />
                    ))
                ) : <p>No news Found</p>}
            </div>
    )
}

export default News;
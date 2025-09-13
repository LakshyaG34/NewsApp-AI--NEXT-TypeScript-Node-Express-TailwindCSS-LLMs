"use client"
import News from "./components/news";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {authUser, loading} = useAuthContext();
  const router = useRouter();     

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/signin");
    }
  }, [authUser, router, loading]);

  if (loading) {
    return <p>Loading...</p>; // prevent redirect flicker
  }
  return (
    <div>
      <News/>
    </div>
  );
}

"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {
    const { token } = useAuth() 
    const router = useRouter()

    useEffect(()=>{
        if (!token) router.push('/login')
    })
    return <p>cricri</p>
}

export default Page
// src/hooks/useRecommendation.ts
import { useState, useCallback } from "react"

export function useRecommendation(userAddress: string) {
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState<string>("")

    const run = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/delegate-recommendation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voterAddress: userAddress }),
            })
            const json = await res.json()
            if (!res.ok) {
                throw new Error(json.error || "Unknown error")
            }
            setText(json.recommendation)
        } catch (err: any) {
            console.error("Failed to fetch recommendation", err)
            setText("Failed to fetch recommendation.")
        } finally {
            setLoading(false)
        }
    }, [userAddress])

    return { loading, text, run }
}
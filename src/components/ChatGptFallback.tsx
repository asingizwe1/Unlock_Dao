// src/components/ChatGptFallback.tsx
import React from "react";
import { Button } from "@/components/ui/button";

export function ChatGptFallback({
    userAddress,
}: {
    userAddress: string;
}) {
    const prompt = encodeURIComponent(
        `Recommend 3 delegates among Ceci Sakura, _Cryptosmonitor, Jae Shin, happ3nxyz.eth delegates of the Unlock protocol for the user ${userAddress} in a DAO governance cote delegation basing on some of their recent DAO activity.`
    );

    // This URL is illustrative—adjust for your target chat service.
    const chatUrl = `https://chat.openai.com/?model=gpt-4&prompt=${prompt}`;

    return (
        <Button
            variant="outline"
            className="flex-1 bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
            title="Hover and click over white button to get AI recommendation"
            onClick={() => window.open(chatUrl, "_blank")}
        >
            Ask OpenAI for recommendation
        </Button>

    );
}
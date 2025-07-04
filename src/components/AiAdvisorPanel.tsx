// src/components/AiAdvisorPanel.tsx
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChatGptFallback } from "@/components/ChatGptFallback";
// import ONLY the local‐model hook
import { useLocalModelRecommendation as useRecommendation } from "@/hooks/useLocalModelRecommendation";

export function AiAdvisorPanel({ userAddress }: { userAddress: string }) {
    const { loading, text, run } = useRecommendation();

    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Left: Metrics Pane */}
            <Card className="bg-gray-900 text-white p-6 space-y-6 rounded-lg drop-shadow-lg">
                <CardHeader>
                    <h3 className="text-2xl font-semibold">AI Recommendation</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* … your metrics … */}
                </CardContent>


                <div className="flex space-x-4">
                    {/* Primary in-app AI button */}
                    <Button
                        onClick={() => run(userAddress)}
                        disabled={loading}
                        className="flex-1 bg-blue-600 hover:bg-blue-500"
                    >
                        {loading ? "Analyzing…" : "Run AI Advisor"}
                    </Button>

                    {/* External ChatGPT fallback */}
                    <ChatGptFallback userAddress={userAddress} />
                </div>
            </Card>

            {/* Right: Recommendation Pane */}
            <Card className="bg-white text-gray-800 p-6 space-y-4 rounded-lg border border-gray-200">
                <CardHeader>
                    <h3 className="text-2xl font-semibold">AI Delegate Recommendation</h3>
                </CardHeader>
                <CardContent>
                    {text ? (
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{text}</pre>
                    ) : (
                        <p className="text-gray-500">
                            Click “Run AI Advisor” to get your personalized recommendation.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
// src/components/TopPicks.tsx
import React from "react";

export function TopPicks({
    nodes,
}: {
    nodes: Array<{
        id: string;
        label: string;
        isUser?: boolean;
        score: number;
    }>;
}) {
    const picks = nodes
        .filter((n) => !n.isUser)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    return (
        <div className="p-4 bg-white/90 rounded shadow space-y-2">
            <h4 className="font-semibold">Top Delegates</h4>
            <ul className="space-y-2">
                {picks.map((n) => (
                    <li key={n.id} className="flex items-center">
                        <span
                            className="w-2 h-2 inline-block rounded-full mr-2"
                            style={{
                                background: n.score > 0.8 ? "#0066ff" : "#66ccff",
                            }}
                        />
                        <span className="flex-1">{n.label}</span>
                        <span className="font-mono text-sm">
                            {(n.score * 100).toFixed(0)}%
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
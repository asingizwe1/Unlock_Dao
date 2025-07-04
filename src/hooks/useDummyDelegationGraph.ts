// src/hooks/useDummyDelegationGraph.ts
import { primeStewards } from "@/data/primeStewards";

export function useDummyDelegationGraph(userAddress: string) {
    // Example: normalize vote counts to 0–1
    const votes = primeStewards.map((s) => parseVotes(s.votes));
    const maxVotes = Math.max(...votes);

    const nodes = [
        { id: userAddress, label: "You", isUser: true, score: 0 },
        ...primeStewards.map((s) => ({
            id: s.address,
            label: s.name,
            isUser: false,
            score: parseVotes(s.votes) / maxVotes,  // 1.0 = top steward
        })),
    ];

    const links = primeStewards.map((s) => ({
        source: userAddress,
        target: s.address,
        value: 1,
    }));

    return { nodes, links, loading: false };
}

function parseVotes(str: string) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ""));
    return str.endsWith("M") ? num * 1e6 : num * 1e3;
}
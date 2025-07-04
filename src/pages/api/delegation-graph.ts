// pages/api/delegation-graph.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { ethers, JsonRpcProvider, Interface } from "ethers";

// 1) Read your RPC endpoint from env
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;
if (!RPC_URL) {
    throw new Error("NEXT_PUBLIC_RPC_URL must be set");
}

const provider = new JsonRpcProvider(RPC_URL);

// 2) Point at your ERC20Votes token that emits DelegateChanged
const TOKEN_ADDRESS = "0xac27fa800955849d6d17cc8952ba9dd6eaa66187";

// 3) Event topic for DelegateChanged(address indexed delegator, address indexed from, address indexed to)
const EVENT_SIG = "DelegateChanged(address,address,address)";
const TOPIC0 = ethers.id(EVENT_SIG);

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // 4) Fetch logs from block 0→latest (you can window or cache this for speed)
        const latest = await provider.getBlockNumber();
        const logs = await provider.getLogs({
            address: TOKEN_ADDRESS,
            fromBlock: 0,
            toBlock: latest,
            topics: [TOPIC0],
        });

        // 5) Decode them
        const iface = new Interface([
            `event ${EVENT_SIG}`,
        ]);

        const addrSet = new Set<string>();
        const links = logs.map((log) => {
            const parsedLog = iface.parseLog(log);
            if (!parsedLog) {
                return null;
            }
            const { args } = parsedLog;
            const delegator = args[0] as string;
            const toDelegate = args[2] as string;

            addrSet.add(delegator);
            addrSet.add(toDelegate);

            return {
                source: delegator,
                target: toDelegate,
                value: 1, // flat weight; or call contract.getVotes(delegator)
            };
        });

        // 6) Build unique nodes array
        const nodes = Array.from(addrSet).map((addr) => ({
            id: addr,
            label: `${addr.slice(0, 6)}…${addr.slice(-4)}`,
        }));

        // 7) Return JSON
        res.status(200).json({ nodes, links });
    } catch (err: any) {
        console.error("Error in /api/delegation-graph:", err);
        res.status(500).json({ error: err.message });
    }
}
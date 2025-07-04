// pages/api/delegation-data.ts
import type { NextApiHandler } from "next";
import { ethers, id, Interface } from "ethers";

// 1) Configure your RPC endpoint in .env: 
//    NEXT_PUBLIC_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/yourKey
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;
if (!RPC_URL) throw new Error("Set NEXT_PUBLIC_RPC_URL in .env");

const provider = new ethers.JsonRpcProvider(RPC_URL);
const UP_TOKEN_ADDRESS = "0xac27fa800955849d6d17cc8952ba9dd6eaa66187";

// 2) Event signature for DelegateChanged
const EVENT_SIG = "DelegateChanged(address,address,address)";
const TOPIC0 = id(EVENT_SIG);

const handler: NextApiHandler = async (req, res) => {
    try {
        // 3) Determine block range (you can optimize this to windowed fetches)
        const latest = await provider.getBlockNumber();
        const fromBlock = 0;

        // 4) Fetch logs
        const logs = await provider.getLogs({
            address: UP_TOKEN_ADDRESS,
            fromBlock,
            toBlock: latest,
            topics: [TOPIC0],
        });

        // 5) Decode logs
        const iface = new Interface([
            `event ${EVENT_SIG}`,
        ]);

        // Gather unique addresses and build edges
        const addrSet = new Set<string>();
        const links: Array<{ source: string; target: string; value: number }> = [];

        for (const log of logs) {
            const parsed = iface.parseLog(log);
            if (!parsed) continue;
            const delegator = parsed.args[0] as string;
            const fromDelegate = parsed.args[1] as string;
            const toDelegate = parsed.args[2] as string;

            addrSet.add(delegator);
            addrSet.add(fromDelegate);
            addrSet.add(toDelegate);

            links.push({ source: delegator, target: toDelegate, value: 1 });
        }

        // 6) Turn the address set into nodes
        const nodes = Array.from(addrSet).map((addr) => ({
            id: addr,
            label: addr.slice(0, 6) + "…" + addr.slice(-4),
        }));

        return res.status(200).json({ nodes, links });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export default handler;
/*import type { NextApiRequest, NextApiResponse } from "next";
import { Contract, JsonRpcProvider, formatUnits, ZeroAddress } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const INFURA_KEY = process.env.INFURA_KEY!;
const provider = new JsonRpcProvider(`https://base-mainnet.infura.io/v3/${INFURA_KEY}`);

const governorAddress = "0x65bA0624403Fc5Ca2b20479e9F626eD4D78E0aD9";
const abi = [
    "function delegates(address) view returns (address)",
    "function getVotes(address account) view returns (uint256)",
];

// Replace this with a real list of token holders or voters
const addresses = [
    "0xD2BC5cb641aE6f7A880c3dD5Aee0450b5210BE23", // stellaachenbach.eth
    "0x38B826a4426A0D4d9b4377AC57C9Af0308281c5D", // Ceci Sakura
    "0x9dED35Aef86F3c826Ff8fe9240f9e7a9Fb2094e5", // _Cryptosmonitor
    "0xE215A2F256731B3dA911E01f9707d281936519fd", // Jae Shin
    "0x04d49D4479B45e019bB9789716fc302da8e601Be", // happ3nxyz.eth
    "0xCA7632327567796e51920F6b16373e92c7823854", // dannithomx.eth
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const contract = new Contract(governorAddress, abi, provider);
    const nodesMap = new Map();
    const links = [];

    for (const addr of addresses) {
        try {
            const delegate = await contract.delegates(addr);
            const votingPower = await contract.getVotes(addr);

            if (delegate && delegate !== ZeroAddress) {
                nodesMap.set(addr, { id: addr, group: "delegator" });
                nodesMap.set(delegate, { id: delegate, group: "delegate" });

                links.push({
                    source: addr,
                    target: delegate,
                    value: Number(formatUnits(votingPower, 18)),
                });
            }
        } catch (err) {
            console.error(`Error for ${addr}:`, err);
        }
    }

    const nodes = Array.from(nodesMap.values());
    res.status(200).json({ nodes, links });
}*/
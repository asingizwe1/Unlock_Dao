import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import axios from "axios";

const GRAPH_URL = "https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock";
const STEWARDS = [
    "0xD2BC5cb641aE6f7A880c3dD5Aee0450b5210BE23", // stellaachenbach.eth
    "0x38B826a4426A0D4d9b4377AC57C9Af0308281c5D", // Ceci Sakura
    "0x9dED35Aef86F3c826Ff8fe9240f9e7a9Fb2094e5", // _Cryptosmonitor
    "0xE215A2F256731B3dA911E01f9707d281936519fd", // Jae Shin
    "0x04d49D4479B45e019bB9789716fc302da8e601Be", // happ3nxyz.eth
    "0xCA7632327567796e51920F6b16373e92c7823854", // dannithomx.eth
];

async function queryGraph(query: string, variables = {}) {
    const res = await fetch(GRAPH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    return json.data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { user } = req.body;

        if (!user) {
            return res.status(400).json({ error: "Missing user address" });
        }

        console.log("🔍 Fetching user vote history for:", user);

        const userData = await queryGraph(
            `
      query($user: String!) {
        votes(where: { voter: $user }) {
          proposal { category }
          support
        }
      }
    `,
            { user: user.toLowerCase() }
        );

        const stewardStats: any = {};
        for (const addr of STEWARDS) {
            console.log("📊 Fetching steward votes for:", addr);
            const stats = await queryGraph(
                `
        query($steward: String!) {
          votes(where: { voter: $steward }) {
            proposal { category }
            support
          }
        }
      `,
                { steward: addr.toLowerCase() }
            );
            stewardStats[addr] = stats.votes;
        }

        const prompt = `
You are a Governance Advisor.
User vote history: ${JSON.stringify(userData.votes, null, 2)}
Steward vote stats: ${JSON.stringify(stewardStats, null, 2)}
Recommend the top 3 stewards with reasons.
`;

        console.log("🧠 Sending prompt to DeepSeek...");

        const response = await axios.post(
            "https://api.deepseek.com/chat/completions",
            {
                model: "deepseek-chat", // You can also try "deepseek-reasoner"
                messages: [{ role: "user", content: prompt }],
                stream: false,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                },
            }
        );

        const recommendation = response.data.choices[0].message?.content;
        console.log("✅ DeepSeek response received");

        res.status(200).json({ recommendation });
    } catch (err: any) {
        console.error("❌ API error:", err.response?.data || err.message);
        res.status(500).json({ error: "Failed to generate recommendation" });
    }
}
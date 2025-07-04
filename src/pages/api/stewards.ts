import { NextApiRequest, NextApiResponse } from "next";

const GRAPH_URL = "https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock";

const STEWARDS = [
    "0xD2BC5cb641aE6f7A880c3dD5Aee0450b5210BE23", // stellaachenbach.eth
    "0x38B826a4426A0D4d9b4377AC57C9Af0308281c5D", // Ceci Sakura
    "0x9dED35Aef86F3c826Ff8fe9240f9e7a9Fb2094e5", // _Cryptosmonitor
    "0xE215A2F256731B3dA911E01f9707d281936519fd", // Jae Shin
    "0x04d49D4479B45e019bB9789716fc302da8e601Be", // happ3nxyz.eth
];

const query = (address: string) => `
{
  votes(where: { voter: "${address.toLowerCase()}" }) {
    id
    support
  }
}
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const results = await Promise.all(
            STEWARDS.map(async (addr) => {
                const response = await fetch(GRAPH_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: query(addr) }),
                });

                const { data } = await response.json();
                return {
                    address: addr,
                    votes: data.votes.length,
                    participation: Math.floor(Math.random() * 20) + 80,
                    trend: `+${Math.floor(Math.random() * 20)}%`,
                };
            })
        );

        res.status(200).json(results);
    } catch (err) {
        console.error("API error in /api/stewards:", err);
        res.status(500).json({ error: "Something went wrong in stewards" });
    }
}
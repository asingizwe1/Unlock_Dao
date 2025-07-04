import { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import { PROPOSALS_QUERY } from "../lib/queries";

const SUBGRAPH_URL = "https://gateway.thegraph.com/api/subgraphs/id/9DNHi5TyZkxrAcnmmefRRTDHXDAwKQk7BifVY2FeTTFp";
//https://gateway.thegraph.com/api/subgraphs/id/7ziHxbouaMXhSzxf5nfTXLYYASajU9bTCcxWoTKEAkBe
interface ProposalsResponse {
    proposals: any[]; // Replace `any` with your actual proposal type if available
}

export function useProposals(first = 10, skip = 0) {
    const [proposals, setProposals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProposals() {
            try {
                setLoading(true);
                const client = new GraphQLClient(SUBGRAPH_URL);
                const { proposals }: ProposalsResponse = await client.request(PROPOSALS_QUERY, { first, skip });
                setProposals(proposals);
            } catch (error) {
                console.error("GraphQL fetch error:", error); // 👈 This will show if the query fails
            } finally {
                setLoading(false);
            }

        }
        fetchProposals();
    }, [first, skip]);

    return { proposals, loading };
}
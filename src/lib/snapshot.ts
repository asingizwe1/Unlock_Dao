import { GraphQLClient, gql } from "graphql-request";

const SNAPSHOT_API = "https://hub.snapshot.org/graphql";

const PROPOSALS_QUERY = gql`
  query {
    proposals(first: 5, where: { space_in: ["unlock-protocol.eth"] }, orderBy: "created", orderDirection: desc) {
      id
      title
      body
      start
      end
      state
      choices
      scores
      scores_total
    }
  }
`;

interface SnapshotProposal {
    id: string;
    title: string;
    body: string;
    start: number;
    end: number;
    state: string;
    choices: string[];
    scores: number[];
    scores_total: number;
}

interface ProposalsResponse {
    proposals: SnapshotProposal[];
}

export async function fetchSnapshotProposals(): Promise<SnapshotProposal[]> {
    const client = new GraphQLClient(SNAPSHOT_API);
    const data: ProposalsResponse = await client.request(PROPOSALS_QUERY);
    return data.proposals;
}
// lib/queries.ts
import { gql } from "graphql-request";

export const PROPOSALS_QUERY = gql`
  query Proposals($first: Int, $skip: Int) {
    proposals(first: $first, skip: $skip, orderBy: createdAt, orderDirection: desc) {
      id
      title
      description
      startBlock
      endBlock
      forVotes
      againstVotes
      quorumVotes
      state
      category
    }
  }
`;
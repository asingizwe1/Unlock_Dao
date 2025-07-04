// src/components/AnalyticsSection.tsx
import React from "react";
import { useWeb3React } from "@web3-react/core";
import DelegationGraph, { GraphNode, GraphLink } from "@/components/DelegationGraph"
import { TopPicks } from "@/components/TopPicks"

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDummyDelegationGraph } from "@/hooks/useDummyDelegationGraph";

export const AnalyticsSection: React.FC = () => {
  // grab the connected wallet address
  const { account } = useWeb3React();
  const userAddress = account || "";

  // use our dummy hook instead of fetching on‐chain data
  const { nodes, links, loading } = useDummyDelegationGraph(userAddress);

 return (

   <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 shadow-2xl">
      <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
        <CardTitle className="text-2xl font-serif italic text-gray-800">
          Delegation Network
        </CardTitle>
        <CardDescription className="text-gray-600 font-light text-lg">
          See how voting power flows through the DAO
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[500px] flex">
        {loading || nodes.length === 0 ? (
          <p className="text-center text-gray-500">Loading network…</p>
        ) : (
          <>
            {/* Graph takes 3/4 width */}
            <div className="w-3/4">
              <DelegationGraph nodes={nodes} links={links} />
            </div>

            {/* Top Picks sidebar takes 1/4 width */}
            <div className="w-1/4 pl-4">
              <TopPicks nodes={nodes as any} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
   )
;
};//
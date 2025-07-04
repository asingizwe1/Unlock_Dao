import React from "react";
import { useSnapshotProposals } from "@/hooks/useSnapshotProposals";
import {
  Card, CardHeader, CardTitle, CardContent, CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink } from "lucide-react";

export const ProposalsSection = () => {
  const { proposals, loading } = useSnapshotProposals();

  const getStatusColor = (state: string) => {
    switch (state.toLowerCase()) {
      case "active": return "bg-green-500";
      case "pending": return "bg-blue-500";
      case "closed": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading proposals…</p>;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {proposals.map((p) => (
          <Card key={p.id} className="hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-purple-300">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <Badge className={`${getStatusColor(p.state)} text-white font-light`}>
                    {p.state}
                  </Badge>
                  <CardTitle className="text-2xl font-serif italic text-gray-800">
                    {p.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-light text-lg leading-relaxed">
                    {p.body.slice(0, 200)}...
                  </CardDescription>
                </div>
                <a
                  href={`https://snapshot.org/#/unlock-protocol.eth/proposal/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="border-2 hover:border-purple-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Snapshot
                  </Button>
                </a>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                {p.choices.map((choice: string, index: number) => {
                  const score = p.scores?.[index] || 0;
                  const percent = p.scores_total > 0 ? (score / p.scores_total) * 100 : 0;

                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm text-gray-700">
                        <span>{choice}</span>
                        <span>{score.toFixed(0)} votes ({percent.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded">
                        <div
                          className="h-2 bg-purple-500 rounded"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 pt-2 border-t border-gray-200">
                <Clock className="w-4 h-4" />
                <span>Ends: {new Date(p.end * 1000).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
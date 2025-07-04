// src/components/DelegationGraph.tsx
import React from "react";
import ForceGraph2D from "react-force-graph-2d";

// ✅ Define your types here
export interface GraphNode {
    id: string;
    label: string;
    group?: string;
    score?: number;
    isUser?: boolean;
    x?: number;
    y?: number;
}

export interface GraphLink {
    source: string;
    target: string;
    value?: number;
}


interface DelegationGraphProps {
    nodes: GraphNode[];
    links: GraphLink[];
}

const DelegationGraph: React.FC<DelegationGraphProps> = ({ nodes, links }) => {
    return (
        <div className="relative h-full w-full">
            <ForceGraph2D
                graphData={{ nodes, links }}
                nodeCanvasObject={(node: GraphNode, ctx, globalScale) => {
                    const size = node.isUser ? 10 : 4 + (node.score || 0) * 16;
                    const color = node.isUser
                        ? "#444"
                        : (node.score || 0) > 0.8
                            ? "#0066ff"
                            : (node.score || 0) > 0.5
                                ? "#66ccff"
                                : "#cccccc";

                    ctx.beginPath();
                    ctx.arc(node.x || 0, node.y || 0, size / globalScale, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();

                    if (!node.isUser && (node.score || 0) > 0.8) {
                        ctx.strokeStyle = "rgba(0, 102, 255, 0.6)";
                        ctx.lineWidth = 2 / globalScale;
                        ctx.stroke();
                    }

                    ctx.font = `${12 / globalScale}px sans-serif`;
                    ctx.fillStyle = "#333";
                    ctx.fillText(node.label, (node.x || 0) + size, (node.y || 0) + size / 2);
                }}
                linkWidth={(link: GraphLink) => 1 + (link.value || 0)}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={1}
            />

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/80 p-2 rounded shadow-sm text-xs">
                <div>
                    <span className="inline-block w-3 h-3 bg-[#cccccc] mr-1 rounded-full" />
                    Low score
                </div>
                <div>
                    <span className="inline-block w-3 h-3 bg-[#66ccff] mr-1 rounded-full" />
                    Medium score
                </div>
                <div>
                    <span className="inline-block w-3 h-3 bg-[#0066ff] mr-1 rounded-full" />
                    Top picks
                </div>
            </div>
        </div>
    );
};

export default DelegationGraph;
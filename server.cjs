const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 8081;

app.get("/api/delegation-graph", async (req, res) => {
    const query = `
    {
      delegations(first: 1000) {
        delegator
        delegate
        amount
      }
    }
  `;

    try {
        const response = await fetch("https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });

        const { data } = await response.json();

        const nodesMap = new Map();
        const links = data.delegations.map((d) => {
            nodesMap.set(d.delegator, { id: d.delegator, group: "delegator" });
            nodesMap.set(d.delegate, { id: d.delegate, group: "delegate" });

            return {
                source: d.delegator,
                target: d.delegate,
                value: Number(d.amount),
            };
        });

        const nodes = Array.from(nodesMap.values());

        res.json({ nodes, links });
    } catch (err) {
        console.error("API error in /api/delegation-graph:", err); // 👈 Add this
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});
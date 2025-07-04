import { useState, useEffect } from "react";
import { fetchSnapshotProposals } from "../lib/snapshot";

export function useSnapshotProposals() {
    const [proposals, setProposals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            setLoading(true);
            const data = await fetchSnapshotProposals();
            setProposals(data);
            setLoading(false);
        }
        load();
    }, []);

    return { proposals, loading };
}
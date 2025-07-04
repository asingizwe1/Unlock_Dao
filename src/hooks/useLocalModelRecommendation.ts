// src/hooks/useLocalModelRecommendation.ts
import { useState, useCallback } from "react";
import { pipeline } from "@xenova/transformers";

export function useLocalModelRecommendation() {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");

    const run = useCallback(async (userAddress: string) => {
        setLoading(true);
        try {
            // Cast pipeline to any so TS won’t complain about our ONNX config
            const generator = (await (pipeline as any)(
                "text-generation",
                "/models/distilgpt2",
                {
                    model: "/models/distilgpt2/onnx/model.onnx",
                    framework: "onnx-wasm",
                }
            )) as (
                prompt: string,
                opts: { max_length: number; do_sample: boolean; top_k: number }
            ) => Promise<{ generated_text: string }[]>;

            const prompt = `Recommend 3 delegates for the user ${userAddress}.`;
            const output = await generator(prompt, {
                max_length: 100,
                do_sample: true,
                top_k: 50,
            });

            setText(output[0].generated_text.trim());
        } catch (err: any) {
            console.error("LLM pipeline error:", err);
            setText("Use white button instead, this feature requires Unlock protocal steward API access");
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, text, run };
}
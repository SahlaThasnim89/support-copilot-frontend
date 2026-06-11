import { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function LoadingState() {
    const [loaderColor] = useState("#908e8e");

    const steps = [
        { text: "Embedding your query..." },
        { text: "Searching past tickets..." },
        { text: "Generating reply with Gemini..." },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            {/* Left-align text container so rows align beautifully */}
            <div className="loading-steps" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {steps.map((s, i) => (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: "#2c2d2f",
                                borderRadius: "4px",
                                border: `2px solid ${loaderColor}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <BeatLoader
                                size={3}
                                margin={1}
                                color={loaderColor}
                            />
                        </div>
                        <span style={{ color: "#908e8e" }}>{s.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

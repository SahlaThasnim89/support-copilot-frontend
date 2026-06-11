export default function LoadingState() {
  const steps = [
    { icon: "🔍", text: "Embedding your query..." },
    { icon: "📂", text: "Searching past tickets..." },
    { icon: "🤖", text: "Generating reply with Gemini..." },
  ];

  return (
    <div className="card loading-card">
      <div className="loading-steps">
        {steps.map((s, i) => (
          <div key={i} className="loading-step" style={{ animationDelay: `${i * 0.4}s` }}>
            <span className="loading-icon">{s.icon}</span>
            <span>{s.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState } from "react";

export default function QueryInput({ onSubmit, loading }) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim() || loading) return;
    onSubmit(message.trim());
  }

  const examples = [
    "I was charged twice for my order",
    "My package hasn't arrived in 10 days",
    "I forgot my password and can't log in",
    "The app keeps crashing at checkout",
  ];

  return (
    <div className="card">
      <h2 className="card-title">Customer Query</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          placeholder="Type the customer's message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          disabled={loading}
        />
        <div className="row-between">
          <div className="examples">
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                className="example-chip"
                onClick={() => setMessage(ex)}
                disabled={loading}
              >
                {ex}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="btn-primary"
            disabled={!message.trim() || loading}
          >
            {loading ? "Thinking..." : "Get Suggestion →"}
          </button>
        </div>
      </form>
    </div>
  );
}
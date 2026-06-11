export default function SuggestedReply({ reply, onFeedback, feedback }) {
  return (
    <div className="card reply-card">
      <div className="row-between">
        <h2 className="card-title">💬 Suggested Reply</h2>
        <div className="feedback-row">
          <span className="feedback-label">Helpful?</span>
          <button
            className={`feedback-btn ${feedback === "up" ? "active-up" : ""}`}
            onClick={() => onFeedback(1)}
            disabled={!!feedback}
            title="Good suggestion"
          >
            👍
          </button>
          <button
            className={`feedback-btn ${feedback === "down" ? "active-down" : ""}`}
            onClick={() => onFeedback(-1)}
            disabled={!!feedback}
            title="Bad suggestion"
          >
            👎
          </button>
          {feedback && (
            <span className="feedback-thanks">
              {feedback === "up" ? "Thanks!" : "Got it, we'll improve"}
            </span>
          )}
        </div>
      </div>

      <div className="reply-box">
        <p>{reply}</p>
      </div>

      <button
        className="btn-copy"
        onClick={() => navigator.clipboard.writeText(reply)}
      >
        📋 Copy Reply
      </button>
    </div>
  );
}
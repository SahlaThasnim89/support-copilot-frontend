export default function Citations({ citations, retrievedCount }) {
  if (!citations || citations.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">📎 Retrieved Tickets</h2>
        <p className="muted">No similar past tickets found above the similarity threshold.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="row-between">
        <h2 className="card-title">📎 Retrieved Tickets (Citations)</h2>
        <span className="badge">{retrievedCount} found</span>
      </div>
      <p className="muted-sm">These past tickets were used to generate the reply above.</p>

      <div className="citations-list">
        {citations.map((c, i) => (
          <div key={c.ticket_id} className="citation-item">
            <div className="citation-header">
              <span className="citation-num">#{i + 1}</span>
              <span className="citation-id">Ticket {c.ticket_id.slice(0, 8)}…</span>
              {c.category && (
                <span className="category-tag">{c.category}</span>
              )}
              <span className="similarity-score">
                {Math.round(c.similarity_score * 100)}% match
              </span>
            </div>
            <p className="citation-snippet">{c.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
// src/api/copilot.js
// All API calls to the FastAPI backend

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * POST /suggest-reply
 * Main RAG call — returns suggested reply + citations
 */
export async function suggestReply(message) {
  const response = await fetch(`${BASE_URL}/suggest-reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to get suggestion");
  }

  return response.json();
  // returns: { suggested_reply, citations, retrieved_count, fallback_used }
}

/**
 * POST /feedback
 * Bonus: thumbs up/down on a suggestion
 */
export async function submitFeedback({ query, suggested_reply, ticket_ids, rating }) {
  const response = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, suggested_reply, ticket_ids, rating }),
  });
  return response.json();
}
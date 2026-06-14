const BASE_URL = import.meta.env.VITE_API_URL || "https://support-copilot-backend.onrender.com";


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


export async function streamSuggestReply(message, onToken, onDone, onError) {
  try {
    const response = await fetch(`${BASE_URL}/suggest-reply/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

      for (const line of lines) {
        try {
          const data = JSON.parse(line.replace('data: ', ''));
          if (data.token) {
            onToken(data.token);
          }
          if (data.done) {
            onDone(data.citations || [], data.retrieved_count || 0);
          }
          if (data.error) {
            onError(data.error);
          }
        } catch (e) {
          console.error('Parse error:', e);
        }
      }
    }
  } catch (error) {
    onError(error.message);
  }
}
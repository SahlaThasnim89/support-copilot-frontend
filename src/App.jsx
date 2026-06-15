// import { useState } from "react";
// import { suggestReply, submitFeedback, streamSuggestReply  } from "./api/copilot";
// import QueryInput from "./components/QueryInput";
// import SuggestedReply from "./components/SuggestedReply";
// import Citations from "./components/Citations";
// import LoadingState from "./components/LoadingState";
// import "./index.css";

// export default function App() {
//   const [result, setResult]     = useState(null);   // API response
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState(null);
//   const [query, setQuery]       = useState("");
//   const [feedback, setFeedback] = useState(null);   // "up" | "down" | null

//   async function handleSubmit(message) {
//     setLoading(true);
//     setError(null);
//     setResult(null);
//     setFeedback(null);
//     setQuery(message);

//     try {
//       const data = await suggestReply(message);
//       setResult(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleFeedback(rating) {
//     if (!result || feedback) return;
//     setFeedback(rating === 1 ? "up" : "down");
//     await submitFeedback({
//       query,
//       suggested_reply: result.suggested_reply,
//       ticket_ids: result.citations.map((c) => c.ticket_id),
//       rating,
//     });
//   }

//   return (
//     <div className="app">
//       <header className="header">
//         <div className="header-inner">
//           <span className="logo">🤖</span>
//           <div>
//             <h1>Support Copilot</h1>
//             <p>AI-powered reply suggestions based on past tickets</p>
//           </div>
//         </div>
//       </header>

//       <main className="main">
//         <QueryInput onSubmit={handleSubmit} loading={loading} />

//         {loading && <LoadingState />}

//         {error && (
//           <div className="error-box">
//             <span>⚠️</span> {error}
//           </div>
//         )}

//         {result && !loading && (
//           <div className="results">
//             {result.fallback_used && (
//               <div className="notice">
//                 ⚡ Using Groq (fallback) — Gemini was unavailable
//               </div>
//             )}

//             <SuggestedReply
//               reply={result.suggested_reply}
//               onFeedback={handleFeedback}
//               feedback={feedback}
//             />

//             <Citations
//               citations={result.citations}
//               retrievedCount={result.retrieved_count}
//             />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

import { useState } from "react";
import { submitFeedback, streamSuggestReply } from "./api/copilot";
import QueryInput from "./components/QueryInput";
import SuggestedReply from "./components/SuggestedReply";
import Citations from "./components/Citations";
import LoadingState from "./components/LoadingState";
import "./index.css";

export default function App() {
  const [reply, setReply] = useState("");
  const [citations, setCitations] = useState([]);
  const [retrievedCount, setRetrievedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState(null);

  async function handleSubmit(message) {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");
    setCitations([]);
    setError(null);
    setFeedback(null);
    setQuery(message);

    await streamSuggestReply(
      message,
      (token) => {
        setReply((prev) => prev + token);
      },
      (citations, retrievedCount) => {
        setCitations(citations);
        setRetrievedCount(retrievedCount);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }

  async function handleFeedback(rating) {
    if (!reply || feedback) return;
    setFeedback(rating === 1 ? "up" : "down");
    await submitFeedback({
      query,
      suggested_reply: reply,
      ticket_ids: citations.map((c) => c.ticket_id),
      rating,
    });
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="logo">🤖</span>
          <div>
            <h1>Support Copilot</h1>
            <p>AI-powered reply suggestions based on past tickets</p>
          </div>
        </div>
      </header>

      <main className="main">
        <QueryInput onSubmit={handleSubmit} loading={loading} />

        {loading && !reply && <LoadingState />}

        {error && (
          <div className="error-box">
            <span>⚠️</span> {error}
          </div>
        )}

        {reply && (
          <div className="results">
            <SuggestedReply
              reply={reply}
              onFeedback={handleFeedback}
              feedback={feedback}
            />
            {!loading && (
              <Citations
                citations={citations}
                retrievedCount={retrievedCount}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
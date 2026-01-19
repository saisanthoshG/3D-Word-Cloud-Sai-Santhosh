import { useState } from "react";
import { analyzeArticle } from "../api/analyze";
import WordCloud3D from "../components/WordCloud3D";

type Keyword = {
  word: string;
  weight: number;
};

export default function Analyze() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    try {
      setLoading(true);
      setError("");

      const data = await analyzeArticle(url);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>3D Word Cloud Analyzer</h2>

      <input
        type="text"
        placeholder="Paste article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "400px", marginRight: "10px" }}
      />

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 3D Word Cloud */}
      {result.length > 0 && (
        <div style={{ height: "600px", marginTop: 20 }}>
          <WordCloud3D words={result} />
        </div>
      )}
    </div>
  );
}

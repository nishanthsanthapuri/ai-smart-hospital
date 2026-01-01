import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";

export default function SymptomAnalyzer() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await api.post("/ai/symptom-analyze", {
        symptoms,
      });

      setResult(res.data);
    } catch (err) {
      setResult({
        condition: "Error",
        urgency: "N/A",
        department: "N/A",
        advice:
          err.response?.data?.error ||
          "Failed to analyze symptoms. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="AI Symptom Analyzer">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Describe your symptoms</h2>

        <textarea
          rows="4"
          className="w-full border p-2 rounded mb-4"
          placeholder="e.g. fever, headache, body pain..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>

        {result && (
          <div className="mt-6 border-t pt-4 space-y-2">
            <p>
              <strong>Possible Condition:</strong> {result.condition}
            </p>
            <p>
              <strong>Urgency Level:</strong> {result.urgency}
            </p>
            <p>
              <strong>Recommended Department:</strong> {result.department}
            </p>
            <p className="text-sm text-gray-600">⚠️ {result.advice}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

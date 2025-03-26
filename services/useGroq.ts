import { useEffect, useState } from "react";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY as string });

export const useGroq = (prompt: string, autoFetch = true) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchGroqResponse = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama3-70b-8192",
      });

      if (!response.choices || response.choices.length === 0) {
        throw new Error("No response from Groq API");
      }

      setData(response.choices[0].message?.content || "");
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchGroqResponse();
    }
  }, [prompt]);

  return { data, loading, error, refetch: fetchGroqResponse, reset };
};

export default useGroq;

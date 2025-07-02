import { useEffect, useState } from 'react';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function useFetch({
  url,
  options,
  onSuccess,
  onError,
  delayMs = 0,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate network delay
        await delay(delayMs);

        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Failed to fetch data');

        const result = await response.json();

        setData(result);
        onSuccess?.(result);
      } catch (err) {
        setError(err.message);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

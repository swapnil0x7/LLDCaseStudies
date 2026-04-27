import { useEffect, useRef, useState } from "react";
import "./autoComplete.css";

const CACHE_KEY = "auto-complete-v1";
const TTL = 5 * 60 * 1000; // 5 minutes

const AutoComplete = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const cache = useRef({});

  const hydrateCache = () => {
    const rawData = localStorage.getItem(CACHE_KEY);
    if (!rawData) return;
    const parsedData = JSON.parse(rawData);

    const freshData = {};
    for (let [key, entry] of Object.entries(parsedData)) {
      const isFresh = Date.now() - entry.timeStamp < TTL ? true : false;
      if (isFresh) freshData[key] = entry;
    }
    cache.current = freshData;
  };

  const fetchData = async (signal) => {
    const searchText = input.trim(" ");
    if (searchText === "") return;
    
    if (cache.current[searchText] && Date.now() - cache.current[searchText].timeStamp < TTL) {
      console.log("cache data: ");
      setResults(cache.current[searchText].data);
      return;
    }
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchText}`,
      { signal },
    );
    const json = await response.json();

    setResults(json?.recipes);
    cache.current[searchText] = { data: json?.recipes, timeStamp: Date.now() };

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache.current));
  };

  useEffect(() => {
    hydrateCache();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        await fetchData(controller.signal);
      } catch (err) {
        if (err.name !== "AbortError") throw err;
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };

    // fetchData();
  }, [input]);

  return (
    <div>
      <section>
        <div>AutoComplete</div>
        <input
          alt="search-bar"
          type="text"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </section>
      {showResults && (
        <div className="results-container">
          {results &&
            results.length > 0 &&
            results.map((result) => {
              return (
                <span className="result" key={result.id}>
                  {result.name}
                </span>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;

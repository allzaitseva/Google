/** @format */

import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const clearResults = () => {
    setResults([]);
    setQuery("");
  };
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const API_KEY = "AIzaSyD_-nnlgRZMKWgFCgZjYk_h8ajtMQTpJaA";
  const CX = "f0a9e8b0674534ad5";

  async function searchGoogle(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
      query
    )}`;
    const response = await axios.get(url);
    return response.data.items; // Array of results
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    try {
      const items = await searchGoogle(query);
      setResults(items || []);
    } catch {
      setResults([]);
    }
  };

  // Export
  const exportToTxt = () => {
    if (!results || results.length === 0) return;
    const txtContent = results.map((item, idx) =>
      `Result ${idx + 1}:\nTitle: ${item.title}\nLink: ${item.link}\nDescription: ${item.snippet}\n`
    ).join('\n---------------------\n');
    const blob = new Blob([txtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "results.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className='bg-gray-300 w-full h-276'>
        <div className='flex flex-col items-center py-5'>
          <form
            className='bg-white w-[700px] h-[50px] rounded-2xl flex items-center px-4 shadow-md'
            onSubmit={handleSearch}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-gray-400 mr-3'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z'
              />
            </svg>
            <input
              type='search'
              placeholder='Search Google'
              className='flex-1 outline-none text-black placeholder-gray-300 bg-transparent text-lg'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit' style={{ display: "none" }} tabIndex={-1}>
              Search
            </button>
          </form>
          <div className='w-[700px] mt-4'>
            {results && results.length > 0 ? (
              <>
                <ul>
                  {results.map((item, idx) => (
                    <li key={idx} className='bg-white p-2 mb-2 rounded-xl shadow'>
                      <a
                        href={item.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-800 underline'>
                        {item.title}
                      </a>
                      <p className='text-gray-600'>{item.snippet}</p>
                    </li>
                  ))}
                </ul>
                <div className='flex justify-center gap-4'>
                  <button
                    onClick={exportToTxt}
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer'>
                    Export in txt format
                  </button>
                  <button
                    onClick={clearResults}
                    className='px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer'>
                    Clear
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
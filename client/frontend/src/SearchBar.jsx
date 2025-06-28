import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }
    const timeout = setTimeout(() => {
      {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const url = `${baseUrl}/search?q=${encodeURIComponent(input)}`;
        console.log('Requesting URL:', url);
        axios.get(url)
          .then(res => {
            if (Array.isArray(res.data)) {
              setSuggestions(res.data);
            } else {
              console.error('Unexpected response data:', res.data);
              setSuggestions([]);
            }
            setHighlightedIndex(-1);
          })
          .catch(err => {
            console.error('Error fetching suggestions:', err);
            setSuggestions([]);
            setHighlightedIndex(-1);
          });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        setInput(suggestions[highlightedIndex]);
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const getHighlightedText = (text, highlight) => {
    const escapedHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <strong key={i} className="text-blue-400">{part}</strong> : part
    );
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="border p-3 rounded w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={
          highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
        }
      />
      <ul
        id="suggestions-list"
        className="suggestions-list border mt-1 rounded max-h-48 overflow-auto shadow-lg bg-gray-900 text-white"
        role="listbox"
        ref={suggestionsRef}
      >
        {suggestions.map((s, idx) => (
          <li
            key={idx}
            id={`suggestion-${idx}`}
            role="option"
            aria-selected={highlightedIndex === idx}
            className={`p-3 cursor-pointer ${
              highlightedIndex === idx ? 'bg-blue-700' : 'hover:bg-blue-800'
            }`}
            onMouseDown={() => handleSuggestionClick(s)}
          >
            {getHighlightedText(s, input)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

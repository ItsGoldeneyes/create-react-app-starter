import React, { useState } from 'react';
import './App.css';

function App() {
    const [query, setQuery] = useState('');
    const [link, setLink] = useState('');
  // Load current site link

    const createSearchLink = () => {
        const scryfallLink = `https://scryfall.com/search?q=${encodeURIComponent(query)}`;
        setLink(scryfallLink);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Let Me Scryfall That For You...</h1>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your search term"
                />
                <button onClick={createSearchLink}>Search</button>
                {link && (
                    <div style={{ marginTop: '20px' }}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            Click here to search "{query}" on Scryfall
                        </a>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
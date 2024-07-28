import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
    const [query, setQuery] = useState('');
    const [link, setLink] = useState('');
    const location = useLocation();

    const createSearchLink = () => {
        // const scryfallLink = `https://scryfall.com/search?q=${encodeURIComponent(query)}`;
        const searchLink =  `${location.pathname}search?q=${encodeURIComponent(query)}`;
        setLink(searchLink);
    };

    return (
        <div className="App">
            <header className="App-content">
                <h1 className="homepage-title"><strong>Scryfall</strong> is a powerful <strong>Magic: The Gathering</strong> card search</h1>
                <p className="homepage-subtitle">For those who know how to use it...</p>
                <form className="homepage-search" action="/search" acceptCharset="UTF-8" method="get">
                    <div className="search-container">
                        <svg focusable="false" aria-hidden="true" className="scryfall-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 460">
                            <image href="/scryfall-logo.svg" width="100%" height="100%" />
                        </svg>
                        <input type="text" name="q" placeholder="Search cards..." />
                    </div>
                    <button type="submit">Search</button>
                </form>
            </header>
        </div>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    var [searchTerm, setSearchTerm] = useState('Odric');
    var [lastSearchTerm, setLastSearchTerm] = useState('');
    var [topcardimages, settopcardImages] = useState([]);

    useEffect(() => {
        const queryAPI = async (query) => {
            const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
            const data = await response.json();
            return data;
        };

        const interval = setInterval(() => {
            if (searchTerm !== lastSearchTerm) {
                console.warn("search term: " + searchTerm);
                queryAPI(searchTerm).then((data) => {
                    if (data.data) {
                        const topcards = data.data.slice(0, 5);
                        const topcardimages = topcards.map((card, index) => {
                            if (card.image_uris) {
                                return (
                                    <div
                                        key={card.id}
                                        className="card-image-wrapper animate"
                                    >
                                        <img
                                            src={card.image_uris.png}
                                            alt={card.name}
                                            className="card-image"
                                        />
                                    </div>
                                );
                            }
                            return null;
                        });
                        settopcardImages(topcardimages);
                        console.log(topcards);

                    }
                });
            }
            lastSearchTerm = searchTerm;
        }, 1000);

        return () => clearInterval(interval);
    }, [searchTerm]);

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
                        <input type="text" class="search-container-input" ame="q" placeholder="Search cards..." onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <button type="submit">Search</button>
                </form>
                <a>Need a tutorial? Click here!</a>
                <div className="card-image-container">
                    {topcardimages}
                </div>
            </header>
        </div>
    );
}

export default App;

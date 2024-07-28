import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [top5CardImages, setTop5CardImages] = useState([]);

    const queryAPI = async (term) => {
        try {
            const response = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(term)}`);
            const data = await response.json();
            if (data.object === "list" && Array.isArray(data.data)) {
                return data;
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };

    useEffect(() => {
        if (searchTerm) {
            const interval = setInterval(() => {
                queryAPI(searchTerm).then((data) => {
                    if (data && data.data) {
                        const top5cards = data.data.slice(0, 5);
                        const top5cardimages = top5cards.map((card, index) => {
                            if (card.image_uris && card.image_uris.normal) {
                                const staggerClass = index % 2 === 0 ? 'stagger-up' : 'stagger-down';
                                return <img key={card.id} src={card.image_uris.normal} alt={card.name} className={`card-image ${staggerClass}`} />;
                            } else {
                                return null; // Skip cards without images
                            }
                        }).filter(Boolean); // Filter out null values
                        setTop5CardImages(top5cardimages);
                    } else {
                        setTop5CardImages([]); // Clear images if no data
                    }
                });
            }, 1000);

            return () => clearInterval(interval);
        }
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
                        <input type="text" name="q" placeholder="Search cards..." onChange={(e) => setSearchTerm(e.target.value)}/>
                        <button type="submit">Search</button>
                    </div>
                </form>
                <div className="card-container">{top5CardImages}</div>
            </header>
        </div>
    );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('Odric');
    const [top5cardimages, setTop5CardImages] = useState([]);

    useEffect(() => {
        const queryAPI = async (query) => {
            const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`);
            const data = await response.json();
            return data;
        };

        const interval = setInterval(() => {
            if (searchTerm) {
                queryAPI(searchTerm).then((data) => {
                    if (data.data) {
                        const top5cards = data.data.slice(0, 5);
                        const top5cardimages = top5cards.map((card) => {
                            if (card.image_uris) {
                                return <div class="card-image-wrapper"><img key={card.id} src={card.image_uris.png} alt={card.name} className="card-image" /></div> ;
                            }
                            return null;
                        });
                        setTop5CardImages(top5cardimages);
                    }
                });
            }
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
                        <input type="text" name="q" placeholder="Search cards..." onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <button type="submit">Search</button>
                </form>
                
                <div className="card-image-container">
                    {top5cardimages}
                </div>
            </header>
        </div>
    );
}

export default App;

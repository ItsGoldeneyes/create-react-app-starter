import React, { useState, useEffect } from 'react';
    import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('Odric');
    const [showResultBox, setShowResultBox] = useState(false);
    const [resultString, setResultString] = useState('');
    const [topcardimages, settopcardImages] = useState([]);
    var [lastSearchTerm, setLastSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting and reloading the page
        setShowResultBox(true); // Show the result box
        // setResultString to /search?q={searchTerm}
        setResultString(window.location.host+`/search?q=${searchTerm}`);
    };

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
            <div className="homepage">
                <div className="inner-flex">
                    <h1 className="homepage-title"><strong>Scryfall</strong> is powerful, but <strong>not everyone knows how to use it</strong></h1>
                    <p className="homepage-subtitle">Use this tool to spread your knowledge!</p>
                    <form className="homepage-search" onSubmit={handleSearchSubmit}>
                        <div className="search-container">
                            <svg focusable="false" aria-hidden="true" className="scryfall-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 460">
                                <image href="/scryfall-logo.svg" width="100%" height="100%" />
                            </svg>
                            <input
                                type="text"
                                className="search-container-input"
                                placeholder="Search cards..."
                                autoComplete="on"
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck="false"
                                maxLength="1024"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </form>
                    {showResultBox && (
                        <div className="result-container">
                            <input
                                type="text"
                                className="result-box"
                                value={resultString}
                                readOnly
                            />
                            <button className="copy-button" onClick={() => navigator.clipboard.writeText(resultString)}>
                                Copy
                            </button>
                        </div>
                    )}



                    <a>Need some tips? Click here!</a>

                    <div className="card-image-container">
                        {/* The original card-image-container code remains unchanged */}
                        {topcardimages}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

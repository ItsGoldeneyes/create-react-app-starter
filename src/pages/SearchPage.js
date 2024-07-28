import React from 'react';

function useQuery() {
    return new URLSearchParams(window.location.search);
}

function SearchPage() {
    let query = useQuery();

    console.log(query.get('q'));

    return (
        <div>
            <h1>Search</h1>
            <p>Query: {query.get('q')}</p>
        </div>
    );
}

export default SearchPage;
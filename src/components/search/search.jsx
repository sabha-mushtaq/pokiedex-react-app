
import React from "react";
import "./search.css";

function Search({ onSearch }) {
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        onSearch(query);
    };

    return (
        <div className="search-wrapper">
            <div className="pokemon-logo">Pokémon</div>
            <input
                id="pokemon-name-search"
                className="search-input"
                type="text"
                placeholder="Search for Pokémon..."
                onChange={handleSearch}
            />
        </div>
    );
}

export default Search;


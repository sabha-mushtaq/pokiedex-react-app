import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./pokedex.css";

function Pokedex({ searchQuery, setSearchQuery }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of Pokémon per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokemonList = async () => {
            setIsLoading(true); // Show loading spinner
            try {
                const offset = (currentPage - 1) * itemsPerPage; // Calculate offset
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`
                );
                setPokemonList(response.data.results);
                setIsLoading(false); // Hide loading spinner
            } catch (error) {
                console.error("Error fetching Pokémon list", error);
                setIsLoading(false);
            }
        };

        fetchPokemonList();
    }, [currentPage]); // Fetch Pokémon whenever currentPage changes

    const handlePokemonClick = (name) => {
        navigate(`/pokemon/${name}`); // Navigate to details page
    };

    // Filter Pokémon based on the search query
    const filteredPokemonList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="pokedex-wrapper">
            
            {isLoading ? (
                <div>Loading Pokémon...</div>
            ) : (
                <>
                    <div className="pokemon-list">
                        {filteredPokemonList.map((pokemon, index) => (
                            <div
                                key={pokemon.name}
                                className="pokemon-card"
                                onClick={() => handlePokemonClick(pokemon.name)}
                            >
                                <h2>{pokemon.name}</h2>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                                        (currentPage - 1) * itemsPerPage + index + 1
                                    }.png`}
                                    alt={pokemon.name}
                                    className="pokemon-image"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="pagination-controls">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            className="pagination-button"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Pokedex;




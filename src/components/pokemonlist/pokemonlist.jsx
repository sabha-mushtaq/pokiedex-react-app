import { useEffect, useState } from "react";
import axios from "axios";
import "./pokemonlist.css";
import { Link } from "react-router-dom";

function PokemonList({ searchQuery }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [displayedPokemonList, setDisplayedPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    async function downloadPokemons() {
        try {
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?offset=${
                    (currentPage - 1) * itemsPerPage
                }&limit=${itemsPerPage}`
            );
            const pokemonResults = response.data.results;
            const pokemonPromises = pokemonResults.map((pokemon) =>
                axios.get(pokemon.url)
            );
            const pokemonData = await axios.all(pokemonPromises);

            const res = pokemonData.map((pokedata) => {
                const pokemon = pokedata.data;
                return {
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world.front_default || "",
                    types: pokemon.types.map((type) => type.type.name),
                };
            });

            setPokemonList(res);
            setDisplayedPokemonList(res);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching Pokémon data", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (searchQuery) {
            const filtered = pokemonList.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(searchQuery)
            );
            setDisplayedPokemonList(filtered);
        } else {
            setDisplayedPokemonList(pokemonList);
        }
    }, [searchQuery, pokemonList]);

    useEffect(() => {
        setIsLoading(true);
        downloadPokemons();
    }, [currentPage]);

    return (
        <div className="pokemon-list-wrapper">
            <h1 className="title">Pokémon List :</h1>
            <div className="pokemon-container">
                {isLoading ? (
                    <div className="loading">Loading...</div>
                ) : displayedPokemonList.length > 0 ? (
                    displayedPokemonList.map((pokemon, index) => (
                        <div key={index} className="pokemon-card">
                            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className="pokemon-image"
                                />
                                <h2 className="pokemon-name">{pokemon.name}</h2>
                                <div className="pokemon-types">
                                    {pokemon.types.map((type, idx) => (
                                        <span key={idx} className={`type ${type}`}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="no-results">No Pokémon found.</div>
                )}
            </div>
            <div className="control-switch">
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
        </div>
    );
}

export default PokemonList;

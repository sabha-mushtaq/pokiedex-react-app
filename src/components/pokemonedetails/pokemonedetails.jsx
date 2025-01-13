import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./pokemonedetails.css";

function PokemonDetails() {
    const { id } = useParams(); 
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemonDetails() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const pokemon = response.data;
                setPokemonDetails({
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world.front_default || "",
                    types: pokemon.types.map((type) => type.type.name),
                    stats: pokemon.stats,
                    abilities: pokemon.abilities,
                    height: pokemon.height,
                    weight: pokemon.weight,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Pokémon details:", error);
                setIsLoading(false);
            }
        }

        fetchPokemonDetails();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!pokemonDetails) {
        return <div>Pokémon not found</div>;
    }

   
        return (
            <div className="pokemon-details-wrapper">
                <div className="pokemon-image">
                    <img src={pokemonDetails.image} alt={pokemonDetails.name} />
                </div>
                <div className="pokemon-details-content">
                    <h1>{pokemonDetails.name}</h1>
                    <div className="details-card">
                        <h2>Types</h2>
                        {pokemonDetails.types.map((type, idx) => (
                            <span key={idx} className={`type ${type}`}>
                                {type}
                            </span>
                        ))}
                    </div>
                    <div className="details-card">
                        <h2>Stats</h2>
                        {pokemonDetails.stats.map((stat, idx) => (
                            <div key={idx}>
                                <strong>{stat.stat.name}:</strong> {stat.base_stat}
                            </div>
                        ))}
                    </div>
                    <div className="details-card">
                        <h2>Abilities</h2>
                        {pokemonDetails.abilities.map((ability, idx) => (
                            <span key={idx}>{ability.ability.name}</span>
                        ))}
                    </div>
                    <div className="details-card">
                        <h2>Height</h2>
                        <p>{pokemonDetails.height} dm</p>
                    </div>
                    <div className="details-card">
                        <h2>Weight</h2>
                        <p>{pokemonDetails.weight} hectograms</p>
                    </div>
                </div>
            </div>
        );
}

export default PokemonDetails;


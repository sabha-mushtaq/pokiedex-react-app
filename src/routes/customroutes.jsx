import React from "react";
import { Routes, Route } from "react-router-dom";
import Pokedex from "../components/pokedex/pokedex";
import PokemonDetails from "../components/pokemonedetails/pokemonedetails";

function CustomRoutes({ searchQuery }) {
    return (
        <Routes>
            <Route path="/" element={<Pokedex searchQuery={searchQuery} />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
    );
}

export default CustomRoutes;



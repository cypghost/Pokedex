"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { Pokemon } from "@/types";
import PokemonCard from "@/components/PokemonCard";
import PokemonModal from "@/components/PokemonModal";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

const fetchPokemons = async (offset = 0, limit = 20) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Pokémons");
  }
  const data = await response.json();
  const pokemons = await Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );
  return pokemons;
};

export default function Pokedex() {
  const searchParams = useSearchParams();
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const initialSearch = searchParams?.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  const { data, isLoading, isError, refetch } = useQuery<Pokemon[]>(
    ["pokemons", offset],
    () => fetchPokemons(offset),
    {
      keepPreviousData: true,
    }
  );

  const filteredPokemons = data?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Pokédex
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full text-gray-800 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        {isLoading ? (
          <LoadingSkeleton />
        ) : isError ? (
          <ErrorMessage onRetry={refetch} />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredPokemons?.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={() => setSelectedPokemon(pokemon)}
                />
              ))}
            </motion.div>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setOffset((prev) => Math.max(0, prev - 20))}
                disabled={offset === 0}
                className="px-4 py-2 bg-indigo-500 text-white rounded-full disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setOffset((prev) => prev + 20)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-full"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Pokemon, PokemonDetails } from "@/types";
import Image from "next/image";

interface Props {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: Props) {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
      );
      const data = await response.json();
      setDetails(data);
    };
    fetchDetails();
  }, [pokemon.id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4 capitalize">
            {pokemon.name}
          </h2>
          <Image
            width={192}
            height={192}
            src={pokemon.sprites.front_default || "/placeholder.svg"}
            alt={pokemon.name}
            className="w-48 h-48 mx-auto"
          />
          {details && (
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-300">
                Height: {details.height / 10} m
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Weight: {details.weight / 10} kg
              </p>
              <h3 className="font-semibold text-gray-800 dark:text-white mt-2">
                Abilities:
              </h3>
              <ul className="list-disc list-inside">
                {details.abilities.map((ability) => (
                  <li
                    key={ability.ability.name}
                    className="text-gray-600 dark:text-gray-300 capitalize"
                  >
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
              <h3 className="font-semibold text-gray-800 dark:text-white mt-2">
                Stats:
              </h3>
              {details.stats.map((stat) => (
                <div key={stat.stat.name} className="mt-1">
                  <span className="text-gray-600 dark:text-gray-300 capitalize">
                    {stat.stat.name}:{" "}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={onClose}
            className="mt-6 w-full px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

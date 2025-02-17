import { motion } from "framer-motion";
import Image from "next/image";
import type { Pokemon } from "@/types";

interface Props {
  pokemon: Pokemon;
  onClick: () => void;
}

export default function PokemonCard({ pokemon, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 cursor-pointer"
    >
      <Image
        width={300}
        height={300}
        src={pokemon.sprites.front_default || "/placeholder.svg"}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mt-2 capitalize">
        {pokemon.name}
      </h2>
      <div className="flex justify-center mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-2 py-1 text-sm text-white bg-indigo-500 rounded-full mr-2"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

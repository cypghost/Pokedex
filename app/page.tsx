"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  const [search, setSearch] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Pokédex</h1>
        <p className="text-xl text-white mb-8">Explore the world of Pokémon with our interactive Pokédex!</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <Link
            href={`/pokedex${search ? `?search=${encodeURIComponent(search)}` : ""}`}
            className="w-full sm:w-auto px-6 py-2 bg-yellow-400 text-gray-800 rounded-full font-semibold hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            View Pokédex
          </Link>
        </div>
      </motion.div>
    </div>
  )
}


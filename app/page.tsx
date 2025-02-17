"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-300">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
              Pokédex
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
              Explore the vast world of Pokémon with our interactive Pokédex.
              Search, discover, and learn about your favorite Pokémon!
            </p>
          </motion.div>
        </header>

        <main>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto mb-16"
          >
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg mb-4"
            />
            <Link
              href={`/Explore${
                search ? `?search=${encodeURIComponent(search)}` : ""
              }`}
              className="w-full inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg text-center"
            >
              Explore Pokédex
            </Link>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {[
              { title: "700+", description: "Pokémon species" },
              { title: "18", description: "Pokémon types" },
              { title: "8", description: "Generations" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 shadow-lg"
              >
                <h2 className="text-4xl font-bold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-xl text-white">{item.description}</p>
              </div>
            ))}
          </motion.section>
        </main>

        <footer className="mt-16 text-center text-white">
          <p>&copy; 2025 Pokédex App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

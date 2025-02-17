export interface Pokemon {
  id: number
  name: string
  types: { type: { name: string } }[]
  sprites: { front_default: string }
}

export interface PokemonDetails extends Pokemon {
  height: number
  weight: number
  abilities: { ability: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
}


import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokeapiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  async getPokemon(pokemonIdOrName: string | number){
    try{
      const { data } = await axios.get(`${this.baseUrl}/${pokemonIdOrName}`);
      return{
        name: data.name,
        types: data.types.map((t) => t.type.name),
        sprite: data.sprites.front_default,
      };
    } catch {
      throw new NotFoundException('Pokémon não encontrado');
    }
  }
}

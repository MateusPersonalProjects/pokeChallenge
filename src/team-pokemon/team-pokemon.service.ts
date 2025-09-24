import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from '../teams/entities/team.entity';
import { AddPokemonDto } from './dto/add-pokemon.dto';
import { PokeapiService } from '../pokeapi/pokeapi.service';

@Injectable()
export class TeamPokemonService {
  constructor(
    @InjectRepository(TeamPokemon) private repo: Repository<TeamPokemon>,
    @InjectRepository(Team) private teamRepo: Repository<Team>,
    private pokeapi: PokeapiService,
  ) {}

  async addPokemon(teamId: number, dto: AddPokemonDto) {
    const team = await this.teamRepo.findOne({ where: { id: teamId }, relations: ['pokemons'] });
    if (!team) throw new NotFoundException('Team not found');

    if (team.pokemons.length >= 6)
      throw new BadRequestException('Team already has 6 Pokémon');

    // check if pokemon exist in the PokeApi
    await this.pokeapi.getPokemon(dto.pokemonIdOuNome);

    const tp = this.repo.create({ pokemonIdOuNome: dto.pokemonIdOuNome, team });
    return this.repo.save(tp);
  }

  async list(teamId: number) {
    const team = await this.teamRepo.findOne({
      where: { id: teamId },
      relations: ['pokemons'],
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // For each pokemon in the team, seek information on the PokéAPI
    const detailedPokemons = await Promise.all(
      team.pokemons.map(async (pokemon) => {
        const details = await this.pokeapi.getPokemon(pokemon.pokemonIdOuNome);
        return {
          id: pokemon.id,
          teamId: team.id,
          identifier: pokemon.pokemonIdOuNome,
          details,
        };
      }),
    );

    return detailedPokemons;
  }

  /*
  list(teamId: number){
    return this.repo.find({ where: { team: { id: teamId } } });
  }
  */

  async remove(teamPokemonId: number) {
    return this.repo.delete(teamPokemonId);
  }
}

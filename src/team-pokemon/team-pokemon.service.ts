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

/*
  not working :/

  async listWithDetails(teamId: number) {
    const pokemons = await this.repo.find({ where: { teamId } });

    // for each pokemon inside out database, search for them in the PokéAPI
    const detailed = await Promise.all(
      pokemons.map(async (p) => {
        const info = await this.pokeApi.getPokemon(p.pokemonIdOuNome);
        return{
          id: p.id,
          teamId: p.teamId,
          identifier: p.pokemonIdOuNome,
          details: info,
        };
      }),
    );

    return detailed;
  }
*/  
  list(teamId: number){
    return this.repo.find({ where: { team: { id: teamId } } });
  }

  async remove(teamPokemonId: number) {
    return this.repo.delete(teamPokemonId);
  }
}

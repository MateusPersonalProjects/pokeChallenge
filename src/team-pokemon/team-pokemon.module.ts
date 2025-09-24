import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamPokemonController } from './team-pokemon.controller';
import { TeamPokemonService } from './team-pokemon.service';
import { TeamPokemon } from './entities/team-pokemon.entity';
import { Team } from '../teams/entities/team.entity';
import { PokeapiModule } from '../pokeapi/pokeapi.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamPokemon, Team]), PokeapiModule],
  controllers: [TeamPokemonController],
  providers: [TeamPokemonService],
})
export class TeamPokemonModule {}

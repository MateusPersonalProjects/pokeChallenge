import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { TeamPokemonService } from './team-pokemon.service';
import { AddPokemonDto } from './dto/add-pokemon.dto';

@Controller('teams/:teamId/pokemons')
export class TeamPokemonController {
  constructor(private readonly service: TeamPokemonService) {}

  @Post()
  add(@Param('teamId') teamId: string, @Body() dto: AddPokemonDto) {
    return this.service.addPokemon(+teamId, dto);
  }

  @Get()
  list(@Param('teamId') teamId: string){
    return this.service.list(+teamId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}

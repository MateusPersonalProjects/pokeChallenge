import { IsNotEmpty, IsString } from 'class-validator';

export class AddPokemonDto {
  @IsNotEmpty()
  @IsString()
  pokemonIdOuNome: string;
}

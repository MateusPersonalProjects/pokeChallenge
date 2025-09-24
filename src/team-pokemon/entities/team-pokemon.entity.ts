import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity.ts';

@Entity()
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonIdOuNome: string;

  @ManyToOne(() => Team, team => team.pokemons, { onDelete: 'CASCADE' })
  team: Team;
}

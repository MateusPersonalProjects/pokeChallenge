import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class TeamPokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemonIdOuNome: string;

  @ManyToOne(() => Team, team => team.pokemons, { onDelete: 'CASCADE' })
  team: Team;
}

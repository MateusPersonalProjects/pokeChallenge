import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Trainer } from '../../trainers/entities/trainer.entity.ts';
import { TeamPokemon } from '../../team-pokemon/entities/team-pokemon.entity.ts';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeDoTime: string;

  @ManyToOne(() => Trainer, trainer => trainer.teams, { onDelete: 'CASCADE'})
  trainer: Trainer;

  @OneToMany(() => TeamPokemon, tp => tp.team)
  pokemons: TeamPokemon[];
}

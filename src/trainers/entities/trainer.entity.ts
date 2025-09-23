import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true})
  cidadeOrigem: string;

  @OneToMany(() => Team, team => team.trainer)
  teams: Team[];
}

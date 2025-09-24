import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity.ts';
import { Trainer } from '../trainers/entities/trainer.entity.ts';
import { CreateTeamDto } from './dto/create-team.dto.ts';
import { UpdateTeamDto } from './dto/update-team.dto.ts';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private repo: Repository<Team>,
    @InjectRepository(Trainer) private trainerRepo: Repository<Trainer>,
  ){}

  async create(dto: CreateTeamDto){
    const trainer = await this.trainerRepo.findOne({ where: { id: dto.trainerId } });
    if(!trainer) throw new NotFoundException('Trainer not found');
    const team = this.repo.create({ nomeDoTime: dto.nomeDoTime, trainer});
    return this.repo.save(team);
  }

  findAll() {
    return this.repo.find({ relations: ['trainer', 'pokemons'] });
  }

  findOne(id: number){
    return this.repo.findOne({ where: { id }, relations: ['trainer', 'pokemons'] });
  }

  async update(id: number, dto: UpdateTeamDto) {
    if (dto.trainerId){
      const trainer = await this.trainerRepo.findOne({ where: { id: dto.trainerId } });
      if (!trainer) throw new NotFoundException('Trainer not found');
      await this.repo.update(id, { nomeDoTime: dto.nomeDoTime, trainer });
    }
    else {
      await this.repo.update(id, { nomeDoTime: dto.nomeDoTime });
    }
    return this.findOne(id);
  }

  remove(id: number){
    return this.repo.delete(id);
  }
}

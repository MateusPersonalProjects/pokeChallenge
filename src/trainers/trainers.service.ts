import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity.ts';
import { CreateTrainerDto } from './dto/create-trainer.dto.ts';
import { UpdateTrainerDto } from './dto/update-trainer.dto.ts';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(Trainer)
    private repo: Repository<Trainer>,
  ) {}

  create(dto: CreateTrainerDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ relations: ['teams'] });
  }

  findOne(id: number){
    return this.repo.findOne({where: { id }, relations: ['teams']});
  }

  async update(id: number, dto: UpdateTrainerDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}

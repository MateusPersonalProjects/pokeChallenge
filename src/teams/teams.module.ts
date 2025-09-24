import { Module } from '@nestjs/common';
import {TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';
import { Trainer } from '../trainers/entities/trainer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Trainer])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}

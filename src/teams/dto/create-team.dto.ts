import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  nomeDoTime: string;

  @IsNotEmpty()
  @IsNumber()
  trainerId: number;
}

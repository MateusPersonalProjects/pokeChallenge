import { IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateTrainerDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  cidadeOrigem: string;
}

import { isNotEmpty, IsOptional, IsString} from 'class-validator';

export class CreateTrainerDto {
  @isNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  cidadeOrigem: String;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainerDto } from './create-trainer.dto.ts';

export class UpdateTrainerDtio extends PartialType(CreateTrainerDto) {}


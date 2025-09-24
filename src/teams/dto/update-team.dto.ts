import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto.ts'

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

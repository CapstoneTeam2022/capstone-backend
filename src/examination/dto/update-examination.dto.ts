import { PartialType } from '@nestjs/swagger';
import { ExaminationDto } from './create-examination.dto';

export class UpdateExaminationDto extends PartialType(ExaminationDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateDiseaseDto } from './create-disease.dto';

export class UpdateDiseaseDto extends PartialType(CreateDiseaseDto) {}

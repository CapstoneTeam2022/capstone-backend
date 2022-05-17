import { PartialType } from '@nestjs/swagger';
import { CreateMohEmployeeDto } from './create-moh-employee.dto';

export class UpdateMohEmployeeDto extends PartialType(CreateMohEmployeeDto) {}

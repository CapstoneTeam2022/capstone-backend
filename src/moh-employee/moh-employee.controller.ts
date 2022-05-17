import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MohEmployeeService } from './moh-employee.service';
import { CreateMohEmployeeDto } from './dto';
import { UpdateMohEmployeeDto } from './dto';

@Controller('moh-employee')
export class MohEmployeeController {
  constructor(private readonly mohEmployeeService: MohEmployeeService) {}

  @Post()
  create(@Body() createMohEmployeeDto: CreateMohEmployeeDto) {
    return this.mohEmployeeService.create(createMohEmployeeDto);
  }

  @Get()
  findAll() {
    return this.mohEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mohEmployeeService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMohEmployeeDto: UpdateMohEmployeeDto,
  // ) {
  //   return this.mohEmployeeService.update(+id, updateMohEmployeeDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mohEmployeeService.remove(+id);
  // }
}

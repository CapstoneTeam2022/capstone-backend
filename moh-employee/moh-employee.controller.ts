import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MohEmployeeService } from './moh-employee.service';
import { MohEmployeeDto } from './dto';

@Controller('mohEmployee')
export class MohEmployeeController {
  constructor(private readonly mohEmployeeService: MohEmployeeService) {}

  @Get()
  getAll() {
    return this.mohEmployeeService.getAllMohEmployees();
  }

  @Get(':id')
  getOneMohEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.mohEmployeeService.getMohEmployee(id);
  }

  @Post()
  addMohEmployee(@Body() body: MohEmployeeDto) {
    return this.mohEmployeeService.addMohEmployee(body);
  }

  @Delete(':id')
  deleteMohEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.mohEmployeeService.deleteMohEmployee(id);
  }
}

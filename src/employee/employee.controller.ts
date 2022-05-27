import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateUserWithRoleDto, UpdateUserDto, UserDto } from '../user/dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() userDto: CreateUserWithRoleDto) {
    return this.employeeService.create(userDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }


  @Put(':id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.employeeService.updateEmployee(id, body);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   return this.employeeService.update(+id, updateEmployeeDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeeService.remove(+id);
  // }
}

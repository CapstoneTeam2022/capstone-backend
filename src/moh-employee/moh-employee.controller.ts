import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { MohEmployeeService } from './moh-employee.service';
import { CreateMohEmployeeDto } from './dto';
import { FileUploadInterceptor } from '../interceptors/fileupload.interceptor';

@Controller('moh-employee')
export class MohEmployeeController {
  constructor(private readonly mohEmployeeService: MohEmployeeService) {}

  @Post()
  @UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  create(
    @Body() createMohEmployeeDto: CreateMohEmployeeDto,
    @UploadedFile() image,
  ) {
    if (!image) {
      throw new BadRequestException('The image is required');
    }
    return this.mohEmployeeService.create(createMohEmployeeDto, image.path);
  }

  @Get()
  findAll() {
    return this.mohEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mohEmployeeService.findOne(+id);
  }

  @Get('/number')
  getAllNum() {
    return this.mohEmployeeService.getNumOfMohEmployees();
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

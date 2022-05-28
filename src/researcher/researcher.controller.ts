import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { UpdateUserDto, UserDto } from '../user/dto';
import { ResearcherService } from './researcher.service';
import { FileUploadInterceptor } from '../interceptors/fileupload.interceptor';

@Controller('researcher')
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  @Get()
  getAll() {
    return this.researcherService.getAll();
  }

  @Get('/number')
  getAllNum() {
    return this.researcherService.getNumOfResearchers();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.researcherService.getById(id);
  }

  @Post()
  @UseInterceptors(FileUploadInterceptor('./upload/profileImages'))
  create(@Body() body: UserDto, @UploadedFile() image) {
    if (!image) {
      throw new BadRequestException('The image is required');
    }
    return this.researcherService.create(body, image.path);
  }

  @Put(':id')
  updateResearcher(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.researcherService.updateResearcher(id, body);
  }
}

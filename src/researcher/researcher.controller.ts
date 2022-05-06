import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from '../user/dto';
import { ResearcherService } from './researcher.service';

@Controller('researcher')
export class ResearcherController {
  constructor(private researcherService: ResearcherService) {}

  @Get()
  getAll() {
    return this.researcherService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.researcherService.getById(id);
  }

  @Post()
  create(@Body() body: UserDto) {
    return this.researcherService.create(body);
  }
}

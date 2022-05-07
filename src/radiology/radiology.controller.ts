import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RadiologyService } from './radiology.service';
import { RadiologyDto } from './dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';

@Controller('radiology')
export class RadiologyController {
  constructor(private radiologyService: RadiologyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.radiologyService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.radiologyService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: RadiologyDto) {
    return this.radiologyService.create(body);
  }
}

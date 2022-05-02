import { RadiologyService } from './radiology.service';

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('radiology')
export class RadiologyController {
  constructor(private readonly radiologyService: RadiologyService) {}
  @Post()
  create(@Body() body: any) {
    return this.radiologyService.addRadiology(body);
  }

  @Get()
  getAll() {
    return this.radiologyService.getAllRadiology();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.radiologyService.getRadiology(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { InvestigationRequestService } from './investigation-request.service';
import { InvestigationRequestDto } from './dto';

@Controller('investigation-request')
export class InvestigationRequestController {
  constructor(private service: InvestigationRequestService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.getInvestigationRequest(id);
  }

  @Get('/include/radiology')
  getAllWithRadiology() {
    return this.service.getAllWithRadiology();
  }

  @Post()
  create(@Body() body: InvestigationRequestDto) {
    return this.service.createInvestigationRequest(body);
  }
}

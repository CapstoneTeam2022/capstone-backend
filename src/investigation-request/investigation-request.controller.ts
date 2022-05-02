import { InvestigationRequestDto } from './dtos/create-invesigationRequest.dto';
import { InvestigationRequestService } from './investigation-request.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('investigation-request')
export class InvestigationRequestController {
  constructor(
    private readonly investigationRequestService: InvestigationRequestService,
  ) {}

  @Post()
  createInvesitgationReq(@Body() body: InvestigationRequestDto) {
    return this.investigationRequestService.addInvestigationRequest(body);
  }

  @Get()
  getAll() {
    return this.investigationRequestService.getAllInvestigationRequest();
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.investigationRequestService.getInvestigationRequest(id);
  }
}

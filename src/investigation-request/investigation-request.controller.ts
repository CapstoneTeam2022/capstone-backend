import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InvestigationRequestService } from './investigation-request.service';
import { InvestigationRequestDto } from './dto';
import { JwtAuthGuard } from 'src/user/auth/jwt-auth.guard';

@Controller('investigation-request')
export class InvestigationRequestController {
  constructor(private service: InvestigationRequestService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.service.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.getInvestigationRequest(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: InvestigationRequestDto) {
    return this.service.createInvestigationRequest(body);
  }
}

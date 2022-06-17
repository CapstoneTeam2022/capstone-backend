import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InvestigationRequestService } from './investigation-request.service';
import { InvestigationRequestDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from '../user/user.entity';

@UseGuards(JwtGuard)
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
  create(@Body() body: InvestigationRequestDto, @Req() req: Request) {
    const user = req.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }
    return this.service.createInvestigationRequest(body, user.id);
  }

  @Post('/patient/:id')
  getAllForPatient(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    if (!user) {
      console.error(`Authenticated user not found`);
      throw new InternalServerErrorException('Internal server error');
    }
    return this.service.getAllForPatient(id, user.id);
  }

  @Post('/decrease/count/:id')
  decreaseCount(@Param('id', ParseIntPipe) id: number) {
    return this.service.decreaseCount(id);
  }

  @Post('/doctor')
  getAllForDoctor(@Req() req: Request) {
    const user = req.user as User;
    if (!user) {
      console.error(`Authenticated user not found`);
      throw new InternalServerErrorException('Internal server error');
    }
    return this.service.getAllForDoctor(user.id);
  }
}

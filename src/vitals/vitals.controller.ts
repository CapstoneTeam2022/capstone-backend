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
import { VitalsService } from './vitals.service';
import { VitalsDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from '../user/user.entity';

@UseGuards(JwtGuard)
@Controller('vitals')
export class VitalsController {
  constructor(private vitalsService: VitalsService) {}

  @Get()
  getAll() {
    return this.vitalsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.vitalsService.getVital(id);
  }

  @Get('/patient/:id')
  getAllForPatient(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    if (!user) {
      console.error(`Authenticated user not found`);
      throw new InternalServerErrorException('Internal server error');
    }
    return this.vitalsService.getAllForPatient(id, user.id);
  }

  @Post()
  create(@Body() body: VitalsDto, @Req() req: Request) {
    const user = req.user as User;
    if (!user) {
      throw new InternalServerErrorException('Internal server error');
    }
    return this.vitalsService.createVital(body, user.id);
  }
}

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
import { JwtGuard, RolesGuard } from '../auth/guard';
import { Request } from 'express';
import { User } from '../user/user.entity';
import { Roles } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('vitals')
export class VitalsController {
  constructor(private vitalsService: VitalsService) {}

  @Get()
  getAll() {
    return this.vitalsService.getAll();
  }

  @Get('/patient')
  @UseGuards(RolesGuard)
  @Roles('Patient')
  getAllForPatient(@Req() req: Request) {
    const user = req.user as User;
    return this.vitalsService.getAllForPatient(user.id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.vitalsService.getVital(id);
  }

  @Get('/patient/:id')
  getAllForPatientInHospital(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    if (!user) {
      console.error(`Authenticated user not found`);
      throw new InternalServerErrorException('Internal server error');
    }
    return this.vitalsService.getAllForPatientInHospital(id, user.id);
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

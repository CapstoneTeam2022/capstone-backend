import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressDto } from './dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Get(':id')
  getSingleHealthCenter(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.service.getAddress(id);
  }

  @Post()
  create(@Body() body: AddressDto) {
    return this.service.saveAddress(body);
  }

  @Put(':id')
  updateHealthCenter(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AddressDto,
  ) {
    return this.service.updateAddress(id, body);
  }
}

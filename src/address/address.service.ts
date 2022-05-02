import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from './dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async saveAddress(body: AddressDto) {
    const address = this.addressRepository.create({ ...body });
    return this.addressRepository.save(address);
  }

  async getAddress(id: number) {
    const address = await this.addressRepository.findOne({
      where: {
        id,
      },
    });
    if (address) return address;

    throw new NotFoundException(`Address with id ${id} not found`);
  }
}

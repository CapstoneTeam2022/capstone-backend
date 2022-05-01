import { Injectable } from '@nestjs/common';
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

  async getAddress(id) {
    return this.addressRepository.findOne(id);
  }
  async saveAddress(body: AddressDto) {
    const address = this.addressRepository.create({ ...body });
    return this.addressRepository.save(address);
  }
}

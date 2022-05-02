import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { RoleService } from '../role/role.service';
import * as argon2 from 'argon2';
import { UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private addressService: AddressService,
    private roleService: RoleService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['address', 'role'] });
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['address', 'role'],
    });
    if (user) return user;

    throw new NotFoundException(`The user with id ${id} not found`);
  }

  async isEmailTaken(email) {
    const user = await this.userRepository.findOne({
      email,
    });
    return user !== undefined;
  }

  async addUser(userData: UserDto) {
    const { address, ...newUser } = userData;

    if (await this.isEmailTaken(newUser.email)) {
      throw new BadRequestException('The Email is Already in use');
    }

    const createdAddress = await this.addressService.saveAddress(address);

    // Hashing the password
    newUser.password = await argon2.hash(newUser.password);

    const user = this.userRepository.create({
      ...newUser,
      address: createdAddress,
    });

    return this.userRepository.save(user);
  }

  async updateUser(id: number, data: UpdateUserDto) {
    if (await this.isEmailTaken(data.email)) {
      throw new BadRequestException('The Email is Already in use');
    }
    this.getUser(id); //check if user exists
    return this.userRepository.save(data);
  }

  async deactivateUser(id: number) {
    const user = await this.getUser(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }
}

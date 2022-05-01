import { RoleService } from './../role/role.service';
import { AddressService } from './../address/address.service';
import { CreateUserDto } from './dtos';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    if (!user)
      throw new NotFoundException(`The User with this ${id} NOT FOUND !!!`);
    return user;
  }

  async isEmailTaken(email) {
    const user = await this.userRepository.findOne({
      email,
    });
    return user !== undefined;
  }

  async addUser(userData) {
    const { address, role, ...newUser } = userData;

    if (await this.isEmailTaken(newUser.email)) {
      throw new BadRequestException('The Email is Already used');
    }
    const createdRole = await this.roleService.addRole(role);

    const createdAddress = await this.addressService.saveAddress(
      userData.address,
    );

    const user = this.userRepository.create({
      ...newUser,
      role: createdRole,
      address: createdAddress,
      isActive: true,
    });

    return this.userRepository.save(user);
  }
}

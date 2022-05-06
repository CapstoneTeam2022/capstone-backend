import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { RoleService } from '../role/role.service';
import * as argon2 from 'argon2';
import { UpdateUserDto, UserDto } from './dto';
import { HealthCenterService } from '../health-center/health-center.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private addressService: AddressService,
    private roleService: RoleService,
    private healthCenterService: HealthCenterService,
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

  async addUser(userData: UserDto, roleName: string) {
    const { address, healthCenterId, ...newUser } = userData;

    if (await this.isEmailTaken(newUser.email)) {
      throw new BadRequestException('The Email is Already in use');
    }

    const role = await this.roleService.getRoleByName(roleName);
    const healthCenter = await this.healthCenterService.getOneHealthCenter(
      healthCenterId,
    );

    const createdAddress = await this.addressService.saveAddress(address);

    // Hashing the password
    newUser.password = await argon2.hash(newUser.password);

    const user = this.userRepository.create({
      ...newUser,
      address: createdAddress,
      role,
      healthCenter,
    });

    const createdUser = await this.userRepository.save(user);
    delete createdUser.password;
    return createdUser;
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

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  findAllByRole(roleId: number) {
    return this.userRepository.find({
      where: {
        role: {
          id: roleId,
        },
      },
    });
  }
}

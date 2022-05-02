import { Role } from './../role/role.entity';
import { RoleService } from './../role/role.service';
import { AddressService } from './../address/address.service';
import { CreateUserDto } from './dtos';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
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
    // Hashing the password

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const user = this.userRepository.create({
      ...newUser,
      role: createdRole,
      address: createdAddress,
      isActive: true,
    });

    return this.userRepository.save(user);
  }

  async updateUserInfo(id: number, userData) {
    const user = await this.getUser(id);

    if (userData.address) {
      const updatedAddress = await this.addressService.updateAddress(
        userData.address.id,
        userData.address,
      );
      user.address = updatedAddress;
    }

    user.name = userData.name || user.name;
    user.password = userData.password || user.password;
    user.isAdmin = userData.isAdmin || user.isAdmin;
    user.isResearcher = userData.isResearcher || user.isResearcher;
    user.phone = userData.phone || user.phone;
    console.log(
      'sdkfjskskdjf kjsdk jfskdjf ksdj ksdjfk sdjk fjksdf kdjf',
      userData.role,
    );

    const value = await this.roleService.addRole(userData.role);

    console.log(
      'sdkfjskskdjf kjsdk jfskdjf ksdj ksdjfk sdjk fjksdf kdjf',
      value,
    );

    user.age = userData.age || user.age;
    user.email = userData.email || user.email;

    return this.userRepository.save(user);
  }

  async disActiveUser(id: number) {
    const user = await this.getUser(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }
}

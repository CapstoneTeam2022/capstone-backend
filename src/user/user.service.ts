import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Between, DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { AddressService } from '../address/address.service';
import { RoleService } from '../role/role.service';
import * as argon2 from 'argon2';
import { UpdateUserDto, UserDto } from './dto';
import { HealthCenterService } from '../health-center/health-center.service';

interface Options {
  select: (keyof User)[];
}

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

  async getEmployeeCount() {
    return this.userRepository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.healthCenter', 'h')
      .leftJoinAndSelect('u.role', 'r')
      .where('r.name=:name', { name: 'Nurse' })
      .orWhere('r.name=:name', { name: 'Doctor' })
      .orWhere('r.name=:name', { name: 'Receptionist' })
      .orWhere('r.name=:name', { name: 'Hospital Admin' })
      .orWhere('r.name=:name', { name: 'Lab Expert' })
      .orWhere('r.name=:name', { name: 'Radiologist' })
      .orWhere('r.name=:name', { name: 'Employee' })
      .orWhere('r.name=:name', { name: 'Researcher' })
      .orWhere('r.name=:name', { name: 'MohEmployee' })
      .groupBy('h.id')
      .select(['count(h.id) as employees', 'h.id as id'])
      .getQuery();
  }
  //type Options = FindOneOptions<Entity>.select?: (keyof User)[];
  async getAllInDateRangeForRole(
    roleName: string,
    start: Date,
    end: Date,
    options?: Options,
  ) {
    await this.roleService.getRoleByName(roleName); // check that role exists
    console.log(roleName);
    // let select: (keyof User)[] | null = options.select;
    return this.userRepository.find({
      where: {
        createdAt: Between(start, end),
        role: {
          name: roleName,
        },
      },
      relations: ['role'],
      select: options?.select || null,
    });
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['address', 'role', 'healthCenter'],
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
    const password = await argon2.hash('12345678');

    const user = this.userRepository.create({
      ...newUser,
      address: createdAddress,
      role,
      password: password,
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

  async updateProfileImage(id: number, image: string) {
    const user = await this.getUser(id);
    user.image = image;
    return this.userRepository.save(user);
  }

  async deactivateUser(id: number) {
    const user = await this.getUser(id);
    user.isActive = false;
    return this.userRepository.save(user);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  findAllByRoleId(roleId: number) {
    return this.userRepository.find({
      where: {
        role: {
          id: roleId,
        },
      },
    });
  }

  findAllByRoleName(name: string) {
    return this.userRepository.find({
      where: {
        role: {
          name,
        },
      },
      relations: ['role', 'address'],
    });
  }

  findAllByRoles(...names: string[]) {
    return this.userRepository.find({
      //  where: [{ role: { name: '' } }],
      where: names.map((name) => ({ role: { name } })),
      relations: ['role'],
    });
  }

  async findEmployeeCountForHealthCenter(id: number) {
    await this.healthCenterService.getOneHealthCenter(id);
    const names = [
      'Doctor',
      'Nurse',
      'Receptionist',
      'Hospital Admin',
      'Lab Expert',
      'Radiologist',
    ];
    return this.userRepository.find({
      //  where: [{ role: { name: '' } }],
      where: {
        ...names.map((name) => ({ role: { name } })),
        healthCenter: {
          id,
        },
      },
      relations: ['role'],
    });
  }

  async findOneByRoleName(id: number, name: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
        role: {
          name,
        },
      },
      relations: ['role'],
    });
    if (user) return user;
    throw new NotFoundException(`${name} with id ${id} not found`);
  }
}
